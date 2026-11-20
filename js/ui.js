/* =========================================================
   Componentes de interface compartilhados entre as páginas.
   ========================================================= */

function tjMontarTopbar() {
  const el = document.getElementById("topbar");
  if (!el) return;

  const usuario = tjUsuarioAtual();
  const logado = !!usuario;
  const admin = tjEhAdmin(usuario);
  const pagina = window.location.pathname.split("/").pop();
  const link = (href, texto) => {
    const ativa = pagina === href;
    return `<a href="${href}" class="nav-link${ativa ? " ativa" : ""}"${ativa ? ' aria-current="page"' : ""}>${texto}</a>`;
  };

  el.innerHTML = `
    <header class="topbar">
      <a class="marca" href="${logado ? "home.html" : "login.html"}"><span class="ponto" aria-hidden="true">●</span> TechJovem</a>
      <nav class="nav" aria-label="Principal">
        ${logado ? link("home.html", "Início") + link("trilha.html", "Áreas") + link("perfil.html", "Perfil") + (admin ? link("painel.html", "Painel") : "") : ""}
        <button type="button" class="btn btn-ghost btn-sm" data-toggle-tema></button>
        ${logado ? '<button type="button" class="btn btn-ghost btn-sm" id="btn-sair">Sair</button>' : ""}
      </nav>
    </header>`;

  tjAtualizarBotaoTema();
  const sair = document.getElementById("btn-sair");
  if (sair) sair.addEventListener("click", tjLogout);
}

function tjMensagem(el, tipo, texto) {
  el.className = "form-msg " + tipo;
  el.textContent = texto;
}

function tjLimparMensagem(el) {
  el.className = "form-msg";
  el.textContent = "";
}

function tjFormatarData(iso, comHora) {
  const d = new Date(iso);
  if (isNaN(d)) return "";
  const opcoes = { day: "2-digit", month: "2-digit", year: "numeric" };
  if (comHora) { opcoes.hour = "2-digit"; opcoes.minute = "2-digit"; }
  return d.toLocaleString("pt-BR", opcoes);
}

document.addEventListener("click", (e) => {
  const botao = e.target.closest("[data-olho]");
  if (!botao) return;
  const campo = document.getElementById(botao.dataset.olho);
  if (!campo) return;
  const mostrar = campo.type === "password";
  campo.type = mostrar ? "text" : "password";
  botao.textContent = mostrar ? "Ocultar" : "Mostrar";
  botao.setAttribute("aria-label", mostrar ? "Ocultar senha" : "Mostrar senha");
});

document.addEventListener("input", (e) => {
  const campo = e.target;
  if (!campo.id) return;
  const medidor = document.querySelector(`[data-forca-de="${campo.id}"]`);
  if (!medidor) return;
  if (!campo.value) {
    medidor.removeAttribute("data-nivel");
    medidor.querySelector("small").textContent = "";
    return;
  }
  const f = tjForcaSenha(campo.value);
  medidor.setAttribute("data-nivel", f.nivel);
  medidor.querySelector("small").textContent = "Senha " + f.texto;
});