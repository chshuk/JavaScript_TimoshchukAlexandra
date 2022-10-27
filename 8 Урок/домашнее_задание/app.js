'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});



const cartWrap = document.querySelector('.cartIconWrap');
const cartIcon = cartWrap.querySelector('.cartIcon');
const basketPopup = document.querySelector('.basket');
const basketTotal = basketPopup.querySelector('.basketTotal');
cartIcon.addEventListener('click', () => {
    basketPopup.classList.toggle('hidden');
})
let productCount = 0;
let basketProducts = {};
const spanCount = cartWrap.querySelector('span');
spanCount.textContent = productCount;
const featuredItems = document.querySelectorAll('.featuredItem');
const spanTotal = basketTotal.querySelector('span');
function addToBasket(product) {
    productCount++;
    spanCount.textContent = productCount;
    let id = product.dataset.id;
    if (basketProducts[id]) {
        let countProd = basketProducts[id].count;
        basketProducts[id] = {
            nameProd: product.dataset.name, 
            price: product.dataset.price, 
            count: countProd + 1,
        };
    } else {
        basketProducts[id] = {
            nameProd: product.dataset.name,
            price: product.dataset.price,
            count: 1};
    };
    let totalPrice = 0;
    const basketProdOld = document.querySelectorAll('.basketRow');
    basketProdOld.forEach((el) => {
        if (!el.classList.contains('basketHeader')){
            el.remove();
        }
    });
    for (let i in basketProducts) {
            let name = basketProducts[i].nameProd;
            let price = basketProducts[i].price;
            let count = basketProducts[i].count;
            let prodDiv = document.createElement('div');
            prodDiv.classList.add('basketRow');
            prodDiv.innerHTML = `<div>${name}</div>
            <div>${price}</div>
            <div>${count}</div>
            <div>${price * count}</div>`
            totalPrice += price * count;
            basketTotal.before(prodDiv);
    }
    spanTotal.textContent = totalPrice;
}
featuredItems.forEach((elem) => {
    elem.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            addToBasket(elem);
        };
    })
});

