// Получаем объект WebApp
let tg = window.Telegram.WebApp;

// Функция для отображения товаров в корзине
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    let cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = ''; // Очистить предыдущие элементы

    if (cart.tariff) {
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <span class="tariff-info">
                <span class="tariff-name">${cart.tariff}</span>
                <span class="tariff-price">${cart.price}</span>
            </span>
        `;
        cartItemsElement.appendChild(itemDiv);
    } else {
        cartItemsElement.innerHTML = '<p>Корзина пуста</p>';
    }
}

// Функция для возврата к покупкам
function goBack() {
    window.location.href = 'index.html';
}

// Функция для отправки данных в бот при нажатии на кнопку "Мин. кнопка"
function sendToBot() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        let data = {
            item_id: cart.item_id,
            tariff: cart.tariff,
            price: cart.price,
            payment_type: cart.payment_type
        };
        tg.sendData(JSON.stringify(data));
    }
}

// Настройка кнопки mainButton
tg.MainButton.setText("Отправить в бот");
tg.MainButton.show();

tg.onEvent('mainButtonClicked', () => {
    sendToBot();
    // Можно добавить опциональное действие после отправки данных
    alert('Данные отправлены в бот!');
});

// Вызываем функцию displayCartItems, если это страница корзины
if (window.location.pathname.endsWith('cart.html')) {
    displayCartItems();
}
