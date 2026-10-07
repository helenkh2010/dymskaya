(() => {
 const lantern=products.find(p=>p.id==='kov');
 document.querySelector('#lantern-price').textContent='от '+money(lantern.price);
 const photos=[['kov.png','Кованый фонарь вечером'],['kov_top.png','Кованый фонарь — вид сверху'],['kov_day.png','Кованый фонарь днём'],['kov_bot.png','Кованый фонарь — вид снизу']];
 document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{const index=Number(button.dataset.photo);const image=document.querySelector('#lantern-image');image.src='images/'+photos[index][0];image.alt=photos[index][1];document.querySelectorAll('[data-photo]').forEach(item=>item.setAttribute('aria-pressed',String(Number(item.dataset.photo)===index)));}));
 const heart=id=>`<button class="favorite-button" data-product-favorite="${id}" aria-label="В избранное: ${products.find(p=>p.id===id).name}" aria-pressed="${favorites.includes(id)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21 3.5 12.5C-3 5.5 6-2 12 6c6-8 15-.5 8.5 6.5Z"/></svg></button>`;
 document.querySelector('#product-related').innerHTML=['sever','ornament','volk','runa'].map(id=>{const p=products.find(p=>p.id===id);return `<article class="account-product"><img src="images/${p.image}" alt="${p.name}" loading="lazy">${heart(id)}<h3>${p.name}</h3><p>${p.description}</p><strong>от ${money(p.price)}</strong><button class="button" data-add="${id}">В корзину</button></article>`;}).join('');
 function updateFavorites(){document.querySelectorAll('[data-product-favorite]').forEach(button=>button.setAttribute('aria-pressed',String(favorites.includes(button.dataset.productFavorite))));}
 updateFavorites();
 document.addEventListener('click',event=>{const button=event.target.closest('[data-product-favorite]');if(!button)return;const id=button.dataset.productFavorite;favorites=favorites.includes(id)?favorites.filter(value=>value!==id):[...favorites,id];try{localStorage.setItem('dymskaya-favorites',JSON.stringify(favorites));}catch{}updateFavorites();});
 // Тексты отзывов для демонстрации макета.
 const reviews=[['Фонарь идеально подошёл к фасаду дома. Сделано качественно, выглядит очень стильно.','Сергей','Нижний Новгород','Ellipse 6.png'],['Красивые детали ковки и приятный свет. Отлично смотрится у входа в дом.','Андрей','Москва','Ellipse 4.png'],['Заказали фонарь для террасы. Очень понравилось качество исполнения.','Иван','Тверь','Ellipse 5.png']];
 let current=0;
 function renderReview(){const [body,name,city,avatar]=reviews[current];document.querySelector('#lantern-review').textContent=body;document.querySelector('#lantern-review-name').textContent=name;document.querySelector('#lantern-review-city').textContent=city;document.querySelector('#lantern-review-avatar').src='images/Icons/'+avatar;document.querySelector('#review-progress').style.marginLeft=(current*100/reviews.length)+'%';}
 document.querySelector('#previous-review').addEventListener('click',()=>{current=(current+reviews.length-1)%reviews.length;renderReview();});
 document.querySelector('#next-review').addEventListener('click',()=>{current=(current+1)%reviews.length;renderReview();});renderReview();
})();
