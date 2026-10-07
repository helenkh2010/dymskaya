// Общий блок для всех страниц. Работает при открытии через file://.
(() => {
  const host = document.querySelector('[data-header]');
  if (host) host.innerHTML = "<header class=\"site-header\">\n  <nav class=\"navigation container\" aria-label=\"Основная навигация\">\n    <div class=\"nav-left\">\n      <a href=\"index.html\" aria-label=\"Дымская — главная\"><img class=\"logo\" src=\"images/logo.svg\" alt=\"Дымская\"></a>\n      <div class=\"menu\">\n        <a href=\"catalog.html\">Каталог</a>\n        <a href=\"about.html\">О нас</a>\n        <a href=\"custom.html\">Индивидуальный заказ</a>\n      </div>\n    </div>\n    <div class=\"nav-right\">\n      <a href=\"catalog.html#search\" aria-label=\"Поиск\"><img src=\"images/Icons/search.svg\" alt=\"\"></a>\n      <button type=\"button\" data-cart-open aria-label=\"Открыть корзину\"><img src=\"images/Icons/basket.svg\" alt=\"\"><span class=\"cart-count\" data-cart-count>0</span></button>\n      <button type=\"button\" data-profile aria-label=\"Личный кабинет\"><img src=\"images/Icons/profile.svg\" alt=\"\"></button>\n    </div>\n  </nav>\n</header>";
})();


