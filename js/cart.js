// Функция для добавления товара в корзину
function addToCart(itemId, itemName, itemPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = {
        id: itemId,
        name: itemName,
        price: itemPrice
    };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${itemName} добавлен в корзину`);
}

// Функция для перехода к корзине
function viewCart() {
    window.location.href = 'cart.html';
}

// Функция для возврата к покупкам
function goBack() {
    window.location.href = 'index.html';
}

// Функция для отображения товаров в корзине на странице cart.html
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = ''; // Очистить предыдущие элементы

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Корзина пуста</p>';
    } else {
        cart.forEach(item => {
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `
                <span class="tariff-info">
                    <span class="tariff-name">${item.name}</span>
                    <span class="tariff-price">${item.price}</span>
                </span>
                <button class="btn remove" onclick="removeFromCart('${item.id}')">Удалить</button>
            `;
            cartItemsElement.appendChild(itemDiv);
        });
    }
}

// Функция для удаления товара из корзины
function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Вызываем функцию displayCartItems, если это страница корзины
if (window.location.pathname.endsWith('cart.html')) {
    displayCartItems();
}


