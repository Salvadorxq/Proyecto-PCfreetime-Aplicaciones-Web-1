(function () {

  let navEl = document.getElementById('main-nav');
  if (!navEl) {
    navEl = document.createElement('nav');
    navEl.id = 'main-nav';
    document.body.prepend(navEl);
  }

  const links = window.navLinks || [];
  const prefix = window.navPrefix || "";

  let html = "";
  links.forEach(link => {
    html += `<a href="${link.path}">${link.title}</a>\n`;
  });

  html += `<img src="${prefix}assets/images/logo.png" alt="Logo de la tienda" id="logo">`;

  html += `<a href="#" id="logout-link" title="Cerrar sesión">Logout 🛑</a>`;

  navEl.innerHTML = html;

  const logout = document.getElementById("logout-link");
  if (logout) {
    logout.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("¿Estás seguro de que querés cerrar sesión?")) {
        window.location.href = prefix + "Autenticacion/login.html";
      }
    });
  }
})();