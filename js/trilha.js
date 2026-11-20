/* Página de detalhes da área: salários, mercado, rotina, ferramentas e profissões */

(function () {
  const usuario = tjExigirLogin();
  if (!usuario) return;
  tjMontarTopbar();

  const chave = new URLSearchParams(window.location.search).get("t") || "frontend";
  const trilha = TRILHAS[chave];

  document.getElementById("pills").innerHTML = Object.entries(TRILHAS).map(([k, t]) => `
    <a class="pill${k === chave ? " ativa" : ""}" href="trilha.html?t=${k}" style="--cor: ${t.cor}"
       ${k === chave ? 'aria-current="page"' : ""}>${t.nome}</a>`).join("");

  const detalhe = document.getElementById("detalhe");

  if (!trilha) {
    document.title = "TechJovem — Áreas";
    detalhe.innerHTML = `
      <h1 style="font-size: 2rem;">Explore as áreas de TI</h1>
      <p style="margin-top: 0.8rem;">Escolha uma área acima para ver rotina, salários médios, ferramentas e profissões.</p>`;
    return;
  }

  document.title = `TechJovem — ${trilha.nome}`;
  document.documentElement.style.setProperty("--cor-trilha", trilha.cor);

  const resultado = tjGetResultado(usuario.email);
  const ehSua = resultado && resultado.trilha === chave;

  const chips = (lista) => `<div class="chips">${lista.map((i) => `<span class="chip">${i}</span>`).join("")}</div>`;

  detalhe.innerHTML = `
    <section class="painel trilha-hero-box">
      ${ehSua ? '<span class="selo">⭐ Sua área recomendada no quiz</span>' : ""}
      <div class="trilha-hero-cab">
        <span class="trilha-icone" style="--cor: ${trilha.cor}" aria-hidden="true">${trilha.icone}</span>
        <h1>${trilha.nome}</h1>
      </div>
      <p class="desc-area">${trilha.descricao}</p>

      <div class="mercado-badges">
        <span class="mercado-badge">📈 ${trilha.mercado.demanda}</span>
        <span class="mercado-badge">💻 ${trilha.mercado.modelo}</span>
      </div>
      <p style="margin: 0.85rem 0 0; font-size: 0.92rem;">${trilha.mercado.destaque}</p>
    </section>

    <section class="salarios-secao" aria-labelledby="t-salarios">
      <h2 id="t-salarios">💰 Média salarial no Brasil</h2>
      <p class="sub">Valores mensais estimados de acordo com a experiência profissional.</p>
      <div class="salarios-grid">
        <div class="painel salario-card">
          <div class="salario-nivel">Nível Júnior</div>
          <div class="salario-valor">${trilha.salario.junior}</div>
          <div class="salario-obs">Início de carreira / primeiras vagas</div>
        </div>
        <div class="painel salario-card">
          <div class="salario-nivel">Nível Pleno</div>
          <div class="salario-valor">${trilha.salario.pleno}</div>
          <div class="salario-obs">2 a 5 anos de experiência prática</div>
        </div>
        <div class="painel salario-card">
          <div class="salario-nivel">Nível Sênior</div>
          <div class="salario-valor">${trilha.salario.senior}</div>
          <div class="salario-obs">Especialista / liderança técnica</div>
        </div>
      </div>
    </section>

    <div class="detalhe-grid">
      <section class="painel" aria-labelledby="t-dia">
        <h2 id="t-dia">📋 No dia a dia</h2>
        <ul>${trilha.diaADia.map((i) => `<li>${i}</li>`).join("")}</ul>
      </section>
      <section class="painel" aria-labelledby="t-ferr">
        <h2 id="t-ferr">🛠️ Ferramentas e tecnologias</h2>
        ${chips(trilha.ferramentas)}
      </section>
      <section class="painel" aria-labelledby="t-prof">
        <h2 id="t-prof">💼 Cargos e profissões</h2>
        ${chips(trilha.profissoes)}
      </section>
      <section class="painel" aria-labelledby="t-soft">
        <h2 id="t-soft">🤝 Habilidades valorizadas</h2>
        ${chips(trilha.softSkills)}
      </section>
    </div>

    <div class="painel dica-pratica">
      <strong>🚀 Desafio rápido para experimentar hoje:</strong>
      <p>${trilha.primeiroPasso}</p>
    </div>

    <div class="acoes-resultado" style="justify-content: flex-start;">
      ${ehSua
        ? '<a href="resultado.html" class="btn btn-primary">Ver meu roadmap de estudos →</a>'
        : '<a href="quiz.html" class="btn btn-primary">Fazer o quiz e testar meu perfil →</a>'}
      <a href="home.html" class="btn btn-ghost">Voltar ao início</a>
    </div>`;
})();