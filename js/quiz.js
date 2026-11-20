/* =========================================================
   Quiz de 10 perguntas: navegação, salvamento automático
   e cálculo entre as 7 áreas de tecnologia.
   ========================================================= */

(function () {
  const usuario = tjExigirLogin();
  if (!usuario) return;
  tjMontarTopbar();

  const total = PERGUNTAS.length;
  let indice = 0;
  let respostas = new Array(total).fill(null);

  if (new URLSearchParams(window.location.search).get("novo")) {
    tjLimparAndamento(usuario.email);
  }

  const salvo = tjGetAndamento(usuario.email);
  if (salvo && Array.isArray(salvo.respostas) && salvo.respostas.length === total) {
    respostas = salvo.respostas;
    indice = Math.min(Math.max(salvo.indice || 0, 0), total - 1);
    const aviso = document.getElementById("aviso-retomada");
    document.getElementById("aviso-texto").textContent =
      `Você já tinha começado: retomamos na pergunta ${indice + 1} de ${total}.`;
    aviso.hidden = false;
  }

  const elContador = document.getElementById("quiz-contador");
  const elPct = document.getElementById("quiz-pct");
  const elPergunta = document.getElementById("quiz-pergunta");
  const elOpcoes = document.getElementById("quiz-opcoes");
  const elPath = document.getElementById("trilha-path");
  const btnAnterior = document.getElementById("btn-anterior");
  const btnProximo = document.getElementById("btn-proximo");

  function salvarAndamento() {
    if (respostas.some((r) => r !== null)) {
      tjSalvarAndamento(usuario.email, indice, respostas);
    }
  }

  function renderPath() {
    elPath.innerHTML = "";
    PERGUNTAS.forEach((_, i) => {
      const bola = document.createElement("div");
      bola.className = "no" + (i < indice ? " feito" : "") + (i === indice ? " atual" : "");
      elPath.appendChild(bola);
      if (i < total - 1) {
        const linha = document.createElement("div");
        linha.className = "linha" + (i < indice ? " feito" : "");
        elPath.appendChild(linha);
      }
    });
  }

  function atualizarBotoes() {
    btnAnterior.style.visibility = indice === 0 ? "hidden" : "visible";
    btnProximo.disabled = respostas[indice] === null;
    btnProximo.textContent = indice === total - 1 ? "Ver meu resultado →" : "Próxima →";
  }

  function selecionar(i) {
    respostas[indice] = i;
    elOpcoes.querySelectorAll(".opcao").forEach((b, k) => {
      b.classList.toggle("selecionada", k === i);
      b.setAttribute("aria-pressed", k === i);
    });
    atualizarBotoes();
    salvarAndamento();
  }

  function renderPergunta(moverFoco) {
    const p = PERGUNTAS[indice];
    elContador.textContent = `Pergunta ${indice + 1} de ${total}`;
    elPct.textContent = `${Math.round(((indice + 1) / total) * 100)}%`;
    elPergunta.textContent = p.pergunta;
    elOpcoes.innerHTML = "";

    p.opcoes.forEach((opcao, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "opcao" + (respostas[indice] === i ? " selecionada" : "");
      btn.setAttribute("aria-pressed", respostas[indice] === i);
      btn.innerHTML = `<span class="opcao-num">${i + 1}</span><span>${opcao.texto}</span>`;
      btn.addEventListener("click", () => selecionar(i));
      elOpcoes.appendChild(btn);
    });

    atualizarBotoes();
    renderPath();
    if (moverFoco) elPergunta.focus();
  }

  function calcularResultado() {
    const pontuacao = {
      frontend: 0,
      backend: 0,
      mobile: 0,
      dados: 0,
      seguranca: 0,
      cloud: 0,
      suporte: 0
    };

    respostas.forEach((escolha, i) => {
      Object.entries(PERGUNTAS[i].opcoes[escolha].pontos).forEach(([trilha, pts]) => {
        if (pontuacao[trilha] !== undefined) pontuacao[trilha] += pts;
      });
    });

    let vencedora = "frontend";
    let maior = -1;
    Object.entries(pontuacao).forEach(([trilha, pts]) => {
      if (pts > maior) { maior = pts; vencedora = trilha; }
    });

    tjSalvarResultado(usuario.email, {
      trilha: vencedora,
      pontuacao,
      data: new Date().toISOString()
    });
    tjLimparAndamento(usuario.email);
  }

  function avancar() {
    if (btnProximo.disabled) return;
    if (indice < total - 1) {
      indice++;
      salvarAndamento();
      renderPergunta(true);
    } else {
      calcularResultado();
      window.location.href = "resultado.html";
    }
  }

  function voltar() {
    if (indice === 0) return;
    indice--;
    salvarAndamento();
    renderPergunta(true);
  }

  btnProximo.addEventListener("click", avancar);
  btnAnterior.addEventListener("click", voltar);

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= PERGUNTAS[indice].opcoes.length) { selecionar(n - 1); return; }
    if (e.key === "ArrowRight") avancar();
    if (e.key === "ArrowLeft") voltar();
  });

  renderPergunta(false);
})();