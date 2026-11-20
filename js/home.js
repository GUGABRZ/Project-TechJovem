/* Home: saudação, card interativo de status, CTAs e cartões das 7 áreas */

(function () {
  const usuario = tjExigirLogin();
  if (!usuario) return;

  tjMontarTopbar();
  document.getElementById("nome-usuario").textContent = usuario.nome.split(" ")[0];

  const cta = document.getElementById("hero-cta");
  const heroCard = document.getElementById("hero-card");
  const resultado = tjGetResultado(usuario.email);
  const andamento = tjGetAndamento(usuario.email);

  if (andamento) {
    cta.innerHTML = `
      <a href="quiz.html" class="btn btn-primary">Continuar o quiz →</a>
      <a href="quiz.html?novo=1" class="btn btn-ghost">Recomeçar do zero</a>
      ${resultado ? '<a href="resultado.html" class="btn btn-ghost">Ver meu último resultado</a>' : ""}`;

    const respondidas = andamento.respostas.filter((r) => r !== null).length;
    heroCard.innerHTML = `
      <span class="hc-label">Quiz em andamento</span>
      <h2>Você já respondeu ${respondidas} de 10 perguntas</h2>
      <p>Seu progresso está salvo automaticamente. Continue de onde parou para descobrir sua área ideal.</p>
      <div class="barra" style="margin-top: 1rem;"><span style="width: ${respondidas * 10}%"></span></div>`;
  } else if (resultado && TRILHAS[resultado.trilha]) {
    const t = TRILHAS[resultado.trilha];
    const feitos = tjGetProgresso(usuario.email, resultado.trilha).length;
    const totalPassos = t.roadmap.length;
    const pct = Math.round((feitos / totalPassos) * 100);

    cta.innerHTML = `
      <a href="resultado.html" class="btn btn-primary">Ver meu resultado e roadmap →</a>
      <a href="quiz.html?novo=1" class="btn btn-ghost">Refazer o quiz</a>`;

    heroCard.style.setProperty("--cor-card", t.cor);
    heroCard.innerHTML = `
      <span class="hc-label">Sua área recomendada</span>
      <h2 style="color: ${t.cor}">${t.nome}</h2>
      <p>${t.resumo}</p>
      <div style="margin-top: 1rem; font-size: 0.85rem; display: flex; justify-content: space-between;">
        <span>Progresso no roadmap</span><strong>${feitos}/${totalPassos} (${pct}%)</strong>
      </div>
      <div class="barra" style="margin-top: 0.45rem; --cor: ${t.cor}"><span style="width: ${pct}%"></span></div>`;
  } else {
    cta.innerHTML = `
      <a href="quiz.html" class="btn btn-primary">Descobrir minha área agora →</a>
      <span style="font-size: 0.88rem; color: var(--text-muted);">Leva cerca de 3 minutos</span>`;

    heroCard.innerHTML = `
      <span class="hc-label">O que você vai desbloquear</span>
      <h2>Seu mapa personalizado em TI</h2>
      <p>Ao finalizar as 10 perguntas rápidas, você recebe:</p>
      <div class="hc-lista">
        <span class="hc-tag">🎯 Ranking de compatibilidade</span>
        <span class="hc-tag">💰 Média salarial no Brasil</span>
        <span class="hc-tag">🛠️ Ferramentas e rotina</span>
        <span class="hc-tag">📚 Cursos gratuitos</span>
      </div>`;
  }

  const grid = document.getElementById("trilhas-grid");
  grid.innerHTML = Object.entries(TRILHAS).map(([chave, t]) => `
    <a class="trilha-mini" href="trilha.html?t=${chave}" style="--cor: ${t.cor}">
      <div>
        <div class="trilha-mini-topo">
          <span class="trilha-icone" aria-hidden="true">${t.icone}</span>
        </div>
        <h3>${t.nome}</h3>
        <p>${t.resumo}</p>
      </div>
      <span class="trilha-mini-link">Saiba mais sobre esta área →</span>
    </a>`).join("");
})();