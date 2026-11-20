/* =========================================================
   Página de resultado: área vencedora, ranking top 3,
   roadmap interativo, histórico e feedback.
   ========================================================= */

(function () {
  const usuario = tjExigirLogin();
  if (!usuario) return;
  tjMontarTopbar();

  const historico = tjGetHistorico(usuario.email);
  const dados = tjGetResultado(usuario.email);
  if (!dados || !TRILHAS[dados.trilha]) {
    window.location.href = "quiz.html";
    return;
  }

  const trilha = TRILHAS[dados.trilha];
  document.documentElement.style.setProperty("--cor-trilha", trilha.cor);

  document.getElementById("res-icone").innerHTML = trilha.icone;
  document.getElementById("res-nome-trilha").textContent = trilha.nome;
  document.getElementById("res-descricao").textContent = trilha.descricao;
  document.getElementById("res-saiba-mais").href = "trilha.html?t=" + dados.trilha;
  document.getElementById("cabecalho-impressao").textContent =
    `TechJovem — resultado de ${usuario.nome} em ${tjFormatarData(dados.data)}`;

  /* ---------- Ranking (top 3) ---------- */
  const entradas = Object.entries(dados.pontuacao).filter(([chave]) => TRILHAS[chave]);
  const somaPontos = entradas.reduce((s, [, p]) => s + p, 0) || 1;

  const bruto = entradas.map(([chave, pts]) => {
    const exato = (pts / somaPontos) * 100;
    return { chave, pts, pct: Math.floor(exato), resto: exato - Math.floor(exato) };
  });
  let faltam = 100 - bruto.reduce((s, b) => s + b.pct, 0);
  bruto.slice().sort((a, b) => b.resto - a.resto).forEach((b) => {
    if (faltam > 0 && b.pts > 0) { b.pct++; faltam--; }
  });
  bruto.sort((a, b) => b.pts - a.pts);

  const top = bruto.filter((b) => b.pts > 0).slice(0, 3);

  document.getElementById("ranking").innerHTML = top.map(({ chave, pct }, i) => {
    const t = TRILHAS[chave];
    return `
      <div class="rank-linha">
        <span class="rank-pos">${i + 1}º</span>
        <div>
          <a class="rank-nome" href="trilha.html?t=${chave}">${t.nome}</a>
          <div class="barra" style="--cor: ${t.cor}"><span style="width: ${pct}%"></span></div>
        </div>
        <span class="rank-pct">${pct}%</span>
      </div>`;
  }).join("");

  /* ---------- Roadmap com progresso ---------- */
  const elRoadmap = document.getElementById("roadmap");
  const total = trilha.roadmap.length;

  function atualizarProgresso() {
    const feitos = tjGetProgresso(usuario.email, dados.trilha).filter((i) => i < total);
    const pct = Math.round((feitos.length / total) * 100);
    document.getElementById("prog-texto").textContent =
      pct === 100 ? "🎉 Roadmap concluído! Parabéns!" : `${feitos.length} de ${total} passos concluídos`;
    document.getElementById("prog-pct").textContent = pct + "%";
    const barra = document.getElementById("prog-barra");
    barra.style.setProperty("--cor", trilha.cor);
    barra.setAttribute("aria-valuenow", pct);
    barra.firstElementChild.style.width = pct + "%";
    elRoadmap.querySelectorAll(".passo").forEach((el, i) => el.classList.toggle("concluido", feitos.includes(i)));
  }

  elRoadmap.innerHTML = trilha.roadmap.map((passo, i) => `
    <div class="passo">
      <div class="painel passo-card">
        <div class="n">Passo ${i + 1}</div>
        <h3>${passo.titulo}</h3>
        <p>${passo.descricao}</p>
        <a class="link-curso" href="${passo.link}" target="_blank" rel="noopener">${passo.linkTexto} ↗</a>
        <label class="check nao-imprimir">
          <input type="checkbox" data-passo="${i}" ${tjGetProgresso(usuario.email, dados.trilha).includes(i) ? "checked" : ""} />
          Já concluí este passo
        </label>
      </div>
    </div>`).join("");

  elRoadmap.addEventListener("change", (e) => {
    const caixa = e.target.closest("[data-passo]");
    if (!caixa) return;
    tjAlternarPasso(usuario.email, dados.trilha, parseInt(caixa.dataset.passo, 10));
    atualizarProgresso();
  });
  atualizarProgresso();

  /* ---------- Histórico ---------- */
  document.getElementById("hist-sub").textContent = historico.length === 1
    ? "Esta é a sua primeira tentativa. Refaça o quiz quando quiser para comparar."
    : `Você fez ${historico.length} tentativas. Veja como seu resultado evoluiu.`;

  document.getElementById("historico").innerHTML = historico.slice().reverse().map((h, i) => {
    const t = TRILHAS[h.trilha] || { nome: h.trilha, cor: "var(--accent)" };
    return `
      <li class="hist-item">
        <span class="quem"><span class="bolinha" style="--cor: ${t.cor}"></span>${t.nome}
          ${i === 0 ? '<span class="selo">Atual</span>' : ""}</span>
        <span class="hist-data">${tjFormatarData(h.data, true)}</span>
      </li>`;
  }).join("");

  /* ---------- Feedback ---------- */
  const elFeedback = document.getElementById("feedback");

  function pilulas(nome, opcoes) {
    return `<div class="radios">${opcoes.map(([valor, rotulo]) => `
      <label class="radio-pill"><input type="radio" name="${nome}" value="${valor}" /><span>${rotulo}</span></label>`).join("")}</div>`;
  }

  if (tjGetFeedback(usuario.email, dados.data)) {
    elFeedback.innerHTML = "<p style='margin:0'>✅ Obrigado pela sua opinião! Ela ajuda a melhorar o TechJovem.</p>";
  } else {
    elFeedback.innerHTML = `
      <form id="form-feedback">
        <fieldset>
          <legend>O resultado fez sentido para você?</legend>
          ${pilulas("fezSentido", [["sim", "Sim"], ["parcial", "Em parte"], ["nao", "Não"]])}
        </fieldset>
        <fieldset>
          <legend>Você já conhecia essa área de TI?</legend>
          ${pilulas("conhecia", [["sim", "Sim"], ["pouco", "Um pouco"], ["nao", "Não"]])}
        </fieldset>
        <button type="submit" class="btn btn-primary" id="btn-feedback" disabled>Enviar opinião</button>
      </form>`;

    const form = document.getElementById("form-feedback");
    const botao = document.getElementById("btn-feedback");
    form.addEventListener("change", () => {
      botao.disabled = !(form.fezSentido.value && form.conhecia.value);
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      tjSalvarFeedback(usuario.email, dados.data, form.fezSentido.value, form.conhecia.value);
      elFeedback.innerHTML = "<p style='margin:0'>✅ Obrigado pela sua opinião! Ela ajuda a melhorar o TechJovem.</p>";
    });
  }

  document.getElementById("btn-imprimir").addEventListener("click", () => window.print());
})();