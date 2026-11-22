/* =========================================================
   Dados de cada conta, guardados no Supabase.
   As leituras usam um cache carregado em tjCarregarDados()
   (feito por tjCarregarSessao), então as páginas continuam
   síncronas. As gravações atualizam o cache na hora e
   enviam ao banco em seguida.
   ========================================================= */

let tjCache = { resultados: [], progresso: {}, andamento: null, feedback: [] };

async function tjCarregarDados() {
  if (!tjSessao) return;
  const uid = tjSessao.id;

  const [res, prog, and, fb] = await Promise.all([
    tjDb.from("resultados").select("id, trilha, pontuacao, criado_em").eq("user_id", uid).order("criado_em"),
    tjDb.from("progresso").select("trilha, passos").eq("user_id", uid),
    tjDb.from("andamento").select("indice, respostas").eq("user_id", uid).maybeSingle(),
    tjDb.from("feedback").select("id, resultado_id, fez_sentido, conhecia, criado_em").eq("user_id", uid)
  ]);

  tjCache.resultados = (res.data || []).map((r) => ({
    id: r.id, trilha: r.trilha, pontuacao: r.pontuacao, data: r.criado_em
  }));

  tjCache.progresso = {};
  (prog.data || []).forEach((p) => { tjCache.progresso[p.trilha] = p.passos || []; });

  tjCache.andamento = and.data ? { indice: and.data.indice, respostas: and.data.respostas } : null;

  tjCache.feedback = (fb.data || []).map((f) => ({
    id: f.id, resultadoId: f.resultado_id, fezSentido: f.fez_sentido, conhecia: f.conhecia, data: f.criado_em
  }));
}

/* ---------- Resultados (histórico) ---------- */
function tjGetHistorico(email) { return tjCache.resultados; }

function tjGetResultado(email) {
  const h = tjCache.resultados;
  return h.length ? h[h.length - 1] : null;
}

async function tjSalvarResultado(email, resultado) {
  if (!tjSessao) return { ok: false };
  const { data, error } = await tjDb
    .from("resultados")
    .insert({ user_id: tjSessao.id, trilha: resultado.trilha, pontuacao: resultado.pontuacao })
    .select("id, trilha, pontuacao, criado_em")
    .single();
  if (error) return { ok: false };
  tjCache.resultados.push({ id: data.id, trilha: data.trilha, pontuacao: data.pontuacao, data: data.criado_em });
  return { ok: true };
}

/* ---------- Progresso do roadmap ---------- */
function tjGetProgresso(email, trilha) {
  return tjCache.progresso[trilha] || [];
}

async function tjAlternarPasso(email, trilha, indice) {
  const lista = [...(tjCache.progresso[trilha] || [])];
  const pos = lista.indexOf(indice);
  if (pos >= 0) lista.splice(pos, 1); else lista.push(indice);
  tjCache.progresso[trilha] = lista;

  if (tjSessao) {
    await tjDb.from("progresso").upsert(
      { user_id: tjSessao.id, trilha, passos: lista },
      { onConflict: "user_id,trilha" }
    );
  }
  return lista;
}

/* ---------- Quiz em andamento ---------- */
function tjGetAndamento(email) { return tjCache.andamento; }

async function tjSalvarAndamento(email, indice, respostas) {
  tjCache.andamento = { indice, respostas };
  if (tjSessao) {
    await tjDb.from("andamento").upsert(
      { user_id: tjSessao.id, indice, respostas, atualizado_em: new Date().toISOString() },
      { onConflict: "user_id" }
    );
  }
}

async function tjLimparAndamento(email) {
  tjCache.andamento = null;
  if (tjSessao) await tjDb.from("andamento").delete().eq("user_id", tjSessao.id);
}

/* ---------- Feedback ---------- */
/* O feedback é ligado ao resultado pela data, como antes */
function tjResultadoPorData(resultadoData) {
  return tjCache.resultados.find((r) => r.data === resultadoData) || null;
}

function tjGetFeedback(email, resultadoData) {
  const r = tjResultadoPorData(resultadoData);
  if (!r) return null;
  return tjCache.feedback.find((f) => f.resultadoId === r.id) || null;
}

async function tjSalvarFeedback(email, resultadoData, fezSentido, conhecia) {
  if (!tjSessao) return { ok: false };
  const r = tjResultadoPorData(resultadoData);
  const { data, error } = await tjDb
    .from("feedback")
    .insert({
      user_id: tjSessao.id,
      resultado_id: r ? r.id : null,
      fez_sentido: fezSentido,
      conhecia
    })
    .select("id, resultado_id, fez_sentido, conhecia, criado_em")
    .single();
  if (error) return { ok: false };
  tjCache.feedback.push({
    id: data.id, resultadoId: data.resultado_id,
    fezSentido: data.fez_sentido, conhecia: data.conhecia, data: data.criado_em
  });
  return { ok: true };
}

/* Os dados do usuário são apagados junto com a conta (ON DELETE CASCADE no banco) */
async function tjApagarDadosUsuario(email) {
  tjCache = { resultados: [], progresso: {}, andamento: null, feedback: [] };
}
