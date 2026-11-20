/* =========================================================
   Tema claro/escuro. Carregue este arquivo no <head>
   para o tema ser aplicado antes da página aparecer.
   ========================================================= */

(function () {
  var tema = null;
  try { tema = localStorage.getItem("tj_tema"); } catch (e) { /* sem storage */ }
  if (!tema) {
    var prefereClaro = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    tema = prefereClaro ? "claro" : "escuro";
  }
  document.documentElement.setAttribute("data-tema", tema);
})();

function tjAtualizarBotaoTema() {
  var claro = document.documentElement.getAttribute("data-tema") === "claro";
  document.querySelectorAll("[data-toggle-tema]").forEach(function (b) {
    b.textContent = claro ? "🌙 Modo escuro" : "☀️ Modo claro";
  });
}

function tjAlternarTema() {
  var novo = document.documentElement.getAttribute("data-tema") === "claro" ? "escuro" : "claro";
  document.documentElement.setAttribute("data-tema", novo);
  try { localStorage.setItem("tj_tema", novo); } catch (e) { /* ignora */ }
  tjAtualizarBotaoTema();
}

document.addEventListener("click", function (e) {
  if (e.target.closest("[data-toggle-tema]")) tjAlternarTema();
});
document.addEventListener("DOMContentLoaded", tjAtualizarBotaoTema);
