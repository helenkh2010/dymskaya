// Общие header.js, footer.js и style.css используются на всех страницах без сервера.
const products = [
  {id:'runa',name:'Дровница Руна',price:8500,category:'furniture',image:'runa.png',description:'Металлическая дровница с резным узором в стиле рун. Компактная и прочная конструкция позволяет аккуратно хранить дрова у печи или камина. Отлично вписывается в интерьер бани или террасы.'},
  {id:'volk',name:'Флюгер Волк',price:12000,category:'decor',image:'volk.png',description:'Флюгер с силуэтом волка для крыши дома или беседки. Выразительная деталь для загородного участка.'},
  {id:'ochag',name:'Печь Триумф',price:42000,category:'ovens',image:'ochag.png',description:'Металлическая печь с окошком для живого огня. Стоимость и комплектацию уточняйте при заказе.'}
];
// Демонстрационные параметры наличия и сроков: заменить перед публикацией.
products.push(
 {id:'stove',name:'Печь Очаг',price:24900,category:'ovens',image:'ochag.png',description:'Компактная печь с декоративными элементами ковки. Для загородной бани или беседки.'},
 {id:'skif',name:'Мангал Скиф',price:24900,category:'ovens',image:'ckif.png',description:'Кованый мангал ручной работы из стали 4 мм. Удобные ручки, декоративные элементы ковки.'},
 {id:'sever',name:'Стул Север',price:7500,category:'furniture',image:'sever.png',description:'Комбинация металла и дерева. Удобный и прочный, для террасы или бани.'},
 {id:'bereg',name:'Лавка Берег',price:15000,category:'furniture',image:'bereg.png',description:'Садовая лавка из металла и дерева. Долговечная, устойчивая и удобная.'},
 {id:'ornament',name:'Настенный орнамент',price:6500,category:'decor',image:'ornament.png',description:'Резной металлический элемент в стиле рунических узоров. Для дома или бани.'},
 {id:'kov',name:'Кованый фонарь',price:9000,category:'decor',image:'kov.png',description:'Металлический садовый фонарь с ручной ковкой. Атмосферный акцент для участка.'}
);
products.forEach(p=>{p.material=['sever','bereg'].includes(p.id)?'wood':'metal';p.availability=['runa','sever','ornament','volk'].includes(p.id)?'stock':'order';p.days=p.availability==='stock'?7:14;});
let favorites=[];
try {const saved=JSON.parse(localStorage.getItem('dymskaya-favorites')||'[]');if(Array.isArray(saved))favorites=saved.filter(id=>products.some(p=>p.id===id));}catch{}
const money = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
let cart = {};
try { const saved = JSON.parse(localStorage.getItem('dymskaya-cart') || '{}'); for(const p of products) if(Number.isInteger(saved?.[p.id]) && saved[p.id] > 0) cart[p.id] = Math.min(saved[p.id],99); } catch {}
const dialog = document.createElement('dialog');
dialog.innerHTML = '<button class="dialog-close" aria-label="Закрыть">×</button><div data-dialog-body></div>';
document.body.append(dialog);
dialog.querySelector('button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
function showDialog(html){dialog.querySelector('[data-dialog-body]').innerHTML=html;if(!dialog.open)dialog.showModal();}
let toastTimer;
function notify(message){let el=document.querySelector('.toast');if(!el){el=document.createElement('div');el.className='toast';el.setAttribute('role','status');document.body.append(el);}el.textContent=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.remove(),2500);}
function saveCart(){try{localStorage.setItem('dymskaya-cart',JSON.stringify(cart));}catch{}updateCount();}
function updateCount(){document.querySelectorAll('[data-cart-count]').forEach(el=>{el.textContent=Object.values(cart).reduce((a,b)=>a+b,0);});}
function showCart(){const chosen=products.filter(p=>cart[p.id]);showDialog('<h2>Корзина</h2>'+ (chosen.length?chosen.map(p=>`<div class="cart-row"><div>${p.name}<br>${cart[p.id]} × ${money(p.price)}</div><button data-remove="${p.id}" aria-label="Убрать одну единицу: ${p.name}">−</button></div>`).join('')+`<strong class="cart-total">Итого от ${money(chosen.reduce((sum,p)=>sum+p.price*cart[p.id],0))}</strong>`:'<p>В корзине пока пусто.</p>')+'<p class="notice">Учебная версия магазина: заказ и оплата не подключены. Цены «от» перенесены из макета.</p>');}
// header.js и footer.js выполняются раньше этого файла благодаря порядку defer-скриптов.
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('[data-header] .menu a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
});
updateCount();
const articleText={stove:['Как выбрать печь для бани','Уточни объём парной, тип топлива и требования производителя к монтажу. Подбирай мощность по инструкции конкретной печи. Монтаж и защиту горючих поверхностей доверь специалисту.'],grill:['5 причин заказать кованый мангал','Индивидуальные размеры, выбор оформления, прочная конструкция, удобная рабочая высота и возможность согласовать дополнительные полки. Перед заказом обсуди толщину металла, покрытие и условия ухода.'],garden:['Секреты жизни садовой мебели','Очищай поверхности мягкой тканью, регулярно проверяй покрытие и крепления. Деревянные детали нуждаются в подходящем защитном составе. Соблюдай рекомендации изготовителя и убирай мебель под укрытие на время длительного хранения.'],wood:['Как выбрать дровницу для бани','Заранее измерь место для дровницы и длину поленьев. Обрати внимание на устойчивость, вместимость и удобство уборки. Расстояние до печи выбирай по требованиям её производителя.']};
document.addEventListener('click',event=>{const target=event.target.closest('button,a');if(!target)return;
  if(target.hasAttribute('data-add')){const id=target.dataset.add;if(!products.some(p=>p.id===id))return;cart[id]=Math.min((cart[id]||0)+1,99);saveCart();notify('Изделие добавлено в корзину');}
  if(target.hasAttribute('data-cart-open'))showCart();
  if(target.hasAttribute('data-remove')){const id=target.dataset.remove;if(cart[id]>1)cart[id]--;else delete cart[id];saveCart();showCart();}
  if(target.hasAttribute('data-profile'))location.href='account.html';
  if(target.hasAttribute('data-privacy')){event.preventDefault();showDialog('<h2>О данных</h2><p>Эта учебная версия хранит состав корзины только в вашем браузере. Форма индивидуального заказа готовит письмо в почтовой программе и сама ничего не отправляет.</p><p>Перед запуском магазина здесь нужно разместить политику обработки данных продавца.</p>');}
  if(target.dataset.article){const [title,body]=articleText[target.dataset.article];showDialog(`<h2>${title}</h2><p>${body}</p>`);}
  if(target.dataset.feature){const p=products.find(p=>p.id===target.dataset.feature);document.querySelector('[data-feature-title]').textContent=p.name;document.querySelector('[data-feature-description]').textContent=p.description;document.querySelector('[data-feature-price]').textContent='от '+money(p.price);document.querySelector('[data-feature-add]').dataset.add=p.id;const image=document.querySelector('[data-feature-image]');image.src='images/'+p.image;image.alt=p.name;document.querySelectorAll('.mini-product').forEach(el=>el.classList.toggle('is-selected',el.contains(target)));}
});
const catalog=document.querySelector('[data-catalog]');
if(catalog){
 const category=document.querySelector('#category'),search=document.querySelector('#search');
 const availability=document.querySelector('#availability'),material=document.querySelector('#material'),leadTime=document.querySelector('#lead-time'),price=document.querySelector('#price');
 const groups=[['ovens','Мангалы и печи',['stove','skif']],['furniture','Мебель и дровницы',['sever','runa','bereg']],['decor','Флюгеры и декор',['ornament','volk','kov']]];
 const initial=new URLSearchParams(location.search).get('category');
 if([...category.options].some(o=>o.value===initial))category.value=initial;
 function render(){
  let total=0;
  document.querySelector('#price-value').textContent=money(Number(price.value));
  catalog.innerHTML=groups.map(([key,title,ids])=>{
   const list=ids.map(id=>products.find(p=>p.id===id)).filter(p=>(category.value==='all'||p.category===category.value)&&(availability.value==='all'||p.availability===availability.value)&&(material.value==='all'||p.material===material.value)&&(leadTime.value==='all'||p.days<=Number(leadTime.value))&&p.price<=Number(price.value)&&p.name.toLocaleLowerCase('ru').includes(search.value.trim().toLocaleLowerCase('ru')));
   total+=list.length;if(!list.length)return '';
   return `<section class="catalog-group"><h2 class="section-title" id="group-${key}">${title}</h2><div class="catalog-track" tabindex="0" role="region" aria-labelledby="group-${key}">${list.map(p=>`<article class="catalog-card">${p.id === 'kov' ? `<a href="product.html" aria-label="Подробнее: Кованый фонарь"><img src="images/${p.image}" alt="${p.name}" loading="lazy"></a>` : `<img src="images/${p.image}" alt="${p.name}" loading="lazy">`}<button class="favorite-button" data-favorite="${p.id}" aria-label="В избранное: ${p.name}" aria-pressed="${favorites.includes(p.id)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21 3.5 12.5C-3 5.5 6-2 12 6c6-8 15-.5 8.5 6.5Z"/></svg></button><h3>${p.name}</h3><p>${p.id==='runa'?'Металлическая дровница с резным узором. Вместимость до 20 поленьев.':p.description}</p><strong>от ${money(p.price)}</strong><button class="button" data-add="${p.id}">В корзину</button></article>`).join('')}</div></section>`;
  }).join('');
  document.querySelector('[data-empty]').hidden=total>0;
 }
 [category,availability,material,leadTime].forEach(el=>el.addEventListener('change',render));
 [search,price].forEach(el=>el.addEventListener('input',render));
 document.querySelector('[data-reset-filters]').addEventListener('click',()=>{document.querySelector('.catalog-filters').reset();render();});
 function revealSearch(){if(location.hash==='#search'){document.querySelector('.catalog-search').hidden=false;search.focus();}}
 window.addEventListener('hashchange',revealSearch);revealSearch();render();
 catalog.addEventListener('click',event=>{const button=event.target.closest('[data-favorite]');if(!button)return;const id=button.dataset.favorite;favorites=favorites.includes(id)?favorites.filter(value=>value!==id):[...favorites,id];try{localStorage.setItem('dymskaya-favorites',JSON.stringify(favorites));}catch{}button.setAttribute('aria-pressed',String(favorites.includes(id)));});
}
if(matchMedia('(prefers-reduced-motion: reduce)').matches){const video=document.querySelector('video');if(video){video.autoplay=false;video.pause();video.controls=true;}}







// Локальная демонстрация формы: без отправки данных и файлов.
const projectForm = document.querySelector('#project-form');
if (projectForm) {
  const fileInput = document.querySelector('#project-files');
  const fileList = document.querySelector('#attachment-list');
  const status = document.querySelector('#project-status');
  let selectedFiles = [];
  function renderAttachments() {
    fileList.replaceChildren();
    fileList.hidden = selectedFiles.length === 0;
    selectedFiles.forEach((file, index) => {
      const row = document.createElement('li');
      const label = document.createElement('span');
      label.textContent = file.name;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Убрать';
      remove.setAttribute('aria-label', 'Убрать файл ' + file.name);
      remove.addEventListener('click', () => {selectedFiles.splice(index, 1); renderAttachments();});
      row.append(label, remove);
      fileList.append(row);
    });
  }
  fileInput.addEventListener('change', () => {
    for (const file of fileInput.files) {
      if (!selectedFiles.some(item => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified)) selectedFiles.push(file);
    }
    fileInput.value = '';
    renderAttachments();
    status.textContent = '';
  });
  projectForm.addEventListener('input', () => {status.textContent = '';});
  projectForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!projectForm.reportValidity()) return;
    status.textContent = 'Поля заполнены. Заявка не отправлена: сервер ещё не подключён. Выбранные файлы остаются только на вашем компьютере.';
  });
}


const requestedProduct = new URLSearchParams(location.search).get('product');
if (document.querySelector('#project-product') && requestedProduct === 'kov') document.querySelector('#project-product').value = 'Кованый фонарь';
