/* =========================================================
   Dados de cada conta, guardados em localStorage.
   Todas as chaves são objetos indexados pelo e-mail.

   - "tj_resultados": { email: [ {trilha, pontuacao, data}, ... ] }  (histórico)
   - "tj_progresso":  { email: { trilha: [índices dos passos concluídos] } }
   - "tj_andamento":  { email: { indice, respostas } }  (quiz pela metade)
   - "tj_feedback":   [ { email, resultadoData, fezSentido, conhecia, data } ]
   ========================================================= */

function tjChave(email) { return String(email || "").trim().toLowerCase(); }

/* ---------- Resultados (histórico) ---------- */
function tjGetTodosResultados() {
  const todos = tjLer("tj_resultados", {});
  let mudou = false;
  Object.keys(todos).forEach((k) => {
    if (!Array.isArray(todos[k])) { todos[k] = [todos[k]]; mudou = true; } // migra formato antigo
  });
  if (mudou) tjGravar("tj_resultados", todos);
  return todos;
}

function tjGetHistorico(email) {
  return tjGetTodosResultados()[tjChave(email)] || [];
}

function tjGetResultado(email) {
  const h = tjGetHistorico(email);
  return h.length ? h[h.length - 1] : null;
}

function tjSalvarResultado(email, resultado) {
  const todos = tjGetTodosResultados();
  const k = tjChave(email);
  if (!todos[k]) todos[k] = [];
  todos[k].push(resultado);
  tjGravar("tj_resultados", todos);
}

/* ---------- Progresso do roadmap ---------- */
function tjGetProgresso(email, trilha) {
  const p = tjLer("tj_progresso", {});
  return (p[tjChave(email)] && p[tjChave(email)][trilha]) || [];
}

function tjAlternarPasso(email, trilha, indice) {
  const p = tjLer("tj_progresso", {});
  const k = tjChave(email);
  if (!p[k]) p[k] = {};
  const lista = p[k][trilha] || [];
  const pos = lista.indexOf(indice);
  if (pos >= 0) lista.splice(pos, 1); else lista.push(indice);
  p[k][trilha] = lista;
  tjGravar("tj_progresso", p);
  return lista;
}

/* ---------- Quiz em andamento ---------- */
function tjGetAndamento(email) {
  return tjLer("tj_andamento", {})[tjChave(email)] || null;
}

function tjSalvarAndamento(email, indice, respostas) {
  const a = tjLer("tj_andamento", {});
  a[tjChave(email)] = { indice, respostas };
  tjGravar("tj_andamento", a);
}

function tjLimparAndamento(email) {
  const a = tjLer("tj_andamento", {});
  delete a[tjChave(email)];
  tjGravar("tj_andamento", a);
}

/* ---------- Feedback ---------- */
function tjGetFeedbackTodos() { return tjLer("tj_feedback", []); }

function tjGetFeedback(email, resultadoData) {
  return tjGetFeedbackTodos().find(
    (f) => f.email === tjChave(email) && f.resultadoData === resultadoData
  ) || null;
}

function tjSalvarFeedback(email, resultadoData, fezSentido, conhecia) {
  const lista = tjGetFeedbackTodos();
  lista.push({
    email: tjChave(email),
    resultadoData,
    fezSentido,
    conhecia,
    data: new Date().toISOString()
  });
  tjGravar("tj_feedback", lista);
}

/* ---------- Exclusão de conta ---------- */
function tjApagarDadosUsuario(email) {
  const k = tjChave(email);
  ["tj_resultados", "tj_progresso", "tj_andamento"].forEach((chave) => {
    const obj = tjLer(chave, {});
    delete obj[k];
    tjGravar(chave, obj);
  });
  tjGravar("tj_feedback", tjGetFeedbackTodos().filter((f) => f.email !== k));
}
