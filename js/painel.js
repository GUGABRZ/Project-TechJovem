/* =========================================================
   Painel de resumo — Exclusivo para Administradores.
   ========================================================= */

(async function () {
  await tjCarregarSessao();
  if (!tjExigirAdmin()) return;
  tjMontarTopbar();

  const DADOS_EXEMPLO = {
    contas: 48,
    tentativas: 64,
    concluidos: 45,
    porTrilha: {
      frontend: 11,
      backend: 9,
      mobile: 8,
      dados: 6,
      seguranca: 5,
      cloud: 3,
      suporte: 3
    },
    fezSentido: { sim: 36, parcial: 7, nao: 2 },
    conhecia: { sim: 14, pouco: 20, nao: 11 }
  };

  const DADOS_VAZIOS = {
    contas: 0, tentativas: 0, concluidos: 0,
    porTrilha: { frontend: 0, backend: 0, mobile: 0, dados: 0, seguranca: 0, cloud: 0, suporte: 0 },
    fezSentido: { sim: 0, parcial: 0, nao: 0 },
    conhecia: { sim: 0, pouco: 0, nao: 0 }
  };

  let dadosBanco = DADOS_VAZIOS;

  async function carregarDadosBanco() {
    const { data, error } = await tjDb.rpc("estatisticas_admin");
    if (error || !data) return DADOS_VAZIOS;
    return {
      contas: data.contas,
      tentativas: data.tentativas,
      concluidos: data.concluidos,
      porTrilha: { ...DADOS_VAZIOS.porTrilha, ...data.porTrilha },
      fezSentido: { ...DADOS_VAZIOS.fezSentido, ...data.fezSentido },
      conhecia: { ...DADOS_VAZIOS.conhecia, ...data.conhecia }
    };
  }

  const soma = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);
  const pct = (parte, todo) => (todo ? Math.round((parte / todo) * 100) : 0);

  function linhaBarra(rotulo, valor, todo, cor) {
    const p = pct(valor, todo);
    return `
      <div class="barra-linha">
        <div class="cab"><span>${rotulo}</span><span>${valor} (${p}%)</span></div>
        <div class="barra" style="--cor: ${cor}"><span style="width: ${p}%"></span></div>
      </div>`;
  }

  let usandoExemplo = false;

  function render() {
    const d = usandoExemplo ? DADOS_EXEMPLO : dadosBanco;

    const ordenadas = Object.entries(d.porTrilha).sort((a, b) => b[1] - a[1]);
    const maisComum = ordenadas[0][1] > 0 ? TRILHAS[ordenadas[0][0]].nome : "—";

    document.getElementById("painel-nota").textContent = usandoExemplo
      ? "Mostrando DADOS DE EXEMPLO, apenas para demonstração. Nada disso foi salvo."
      : "Mostrando os dados reais de todos os alunos, vindos do banco de dados.";

    const botao = document.getElementById("btn-exemplo");
    botao.textContent = usandoExemplo ? "Voltar aos dados reais" : "Ver com dados de exemplo";
    botao.setAttribute("aria-pressed", usandoExemplo);

    document.getElementById("stat-grid").innerHTML = [
      [d.contas, "contas criadas"],
      [d.concluidos, "alunos com quiz concluído"],
      [d.tentativas, "quizzes feitos no total"],
      [maisComum, "área mais recomendada"]
    ].map(([num, lbl]) => `
      <div class="painel stat-card"><div class="num" style="${String(num).length > 6 ? "font-size: 1.35rem;" : ""}">${num}</div><div class="lbl">${lbl}</div></div>`).join("");

    const totalTrilhas = soma(d.porTrilha);
    document.getElementById("barras-trilhas").innerHTML = totalTrilhas
      ? ordenadas.map(([k, v]) => linhaBarra(TRILHAS[k].nome, v, totalTrilhas, TRILHAS[k].cor)).join("")
      : "<p style='margin:0'>Ainda não há quizzes concluídos.</p>";

    const totalFeedback = soma(d.fezSentido);
    document.getElementById("barras-feedback").innerHTML = totalFeedback
      ? `<strong style="font-size:0.9rem">O resultado fez sentido?</strong>` +
        linhaBarra("Sim", d.fezSentido.sim, totalFeedback, "var(--trilha-dados)") +
        linhaBarra("Em parte", d.fezSentido.parcial, totalFeedback, "var(--trilha-suporte)") +
        linhaBarra("Não", d.fezSentido.nao, totalFeedback, "var(--trilha-seguranca)") +
        `<strong style="font-size:0.9rem; margin-top:0.6rem">Já conhecia a área?</strong>` +
        linhaBarra("Sim", d.conhecia.sim, totalFeedback, "var(--trilha-backend)") +
        linhaBarra("Um pouco", d.conhecia.pouco, totalFeedback, "var(--trilha-frontend)") +
        linhaBarra("Não", d.conhecia.nao, totalFeedback, "var(--accent-2)")
      : "<p style='margin:0'>Ainda não há opiniões enviadas.</p>";
  }

  document.getElementById("btn-exemplo").addEventListener("click", () => {
    usandoExemplo = !usandoExemplo;
    render();
  });

  dadosBanco = await carregarDadosBanco();
  render();
})();