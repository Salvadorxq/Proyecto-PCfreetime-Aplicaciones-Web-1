(function () {
  const rawPath = window.location.pathname.replace(/\\/g, '/');

  const inAutenticacion = rawPath.includes('/Autenticacion/');
  const inPaginas = rawPath.includes('/Paginas/');

  let prefix = '';
  if (inAutenticacion || inPaginas) prefix = '../';
  window.navPrefix = prefix;

  window.navLinks = [
    { title: "Home", path: prefix + "index.html" },
    { title: "Login", path: prefix + "Autenticacion/login.html" },
    { title: "Registro", path: prefix + "Autenticacion/register.html" },
    { title: "Productos", path: prefix + "Paginas/category1.html" },
    { title: "Componentes", path: prefix + "Paginas/category2.html" },
    { title: "Periféricos", path: prefix + "Paginas/category3.html" },
    { title: "Carrito", path: prefix + "Carrito.html" }
  ];
})();