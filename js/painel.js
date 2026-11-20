/* =========================================================
   Painel de resumo — Exclusivo para Administradores.
   ========================================================= */

(function () {
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

  function dadosReais() {
    const porUsuario = Object.values(tjGetTodosResultados());
    const ultimos = porUsuario.map((h) => h[h.length - 1]).filter(Boolean);
    const porTrilha = {
      frontend: 0,
      backend: 0,
      mobile: 0,
      dados: 0,
      seguranca: 0,
      cloud: 0,
      suporte: 0
    };
    ultimos.forEach((r) => { if (porTrilha[r.trilha] !== undefined) porTrilha[r.trilha]++; });

    const fezSentido = { sim: 0, parcial: 0, nao: 0 };
    const conhecia = { sim: 0, pouco: 0, nao: 0 };
    tjGetFeedbackTodos().forEach((f) => {
      if (fezSentido[f.fezSentido] !== undefined) fezSentido[f.fezSentido]++;
      if (conhecia[f.conhecia] !== undefined) conhecia[f.conhecia]++;
    });

    return {
      contas: tjGetUsuarios().length,
      tentativas: porUsuario.reduce((s, h) => s + h.length, 0),
      concluidos: ultimos.length,
      porTrilha, fezSentido, conhecia
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
    const d = usandoExemplo ? DADOS_EXEMPLO : dadosReais();

    const ordenadas = Object.entries(d.porTrilha).sort((a, b) => b[1] - a[1]);
    const maisComum = ordenadas[0][1] > 0 ? TRILHAS[ordenadas[0][0]].nome : "—";

    document.getElementById("painel-nota").textContent = usandoExemplo
      ? "Mostrando DADOS DE EXEMPLO, apenas para demonstração. Nada disso foi salvo."
      : "Mostrando os dados reais deste navegador. Com o banco na nuvem, este painel reunirá todos os alunos.";

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

  render();
})();