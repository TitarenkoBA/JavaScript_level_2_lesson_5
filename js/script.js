'use strict';
// Фэйк АПИ
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue ({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        goods: [],
        imgCatalog: 'http://placehold.it/250x150',
        filteredGoods: [],
        basketGoods: [],
        searchLine: ''
    },
    methods: {
        getJson (url) {
            return fetch (url)
                .then (result => result.json ())
                .catch (error => {
                    console.log (error)
                })
        },
        addGood (good) {
            this.basketGoods.push(good);
        },
        delGood (good) {
            let id = good.id_product;
            this.basketGoods.forEach((good) => {
                if (id == good.id_product) {
                    this.basketGoods.splice(this.basketGoods.indexOf(good), 1);
                } 
            })
        },
        filterGoods (good) {
            this.filteredGoods = [];
            this.goods.map((good) => {
                if (good.product_name.toLowerCase().includes(this.searchLine.toLowerCase())) {
                    this.filteredGoods.push(good);
                } else if (this.searchLine == '') {
                    this.filteredGoods = this.goods;
                }
            })
        }
    },
    mounted () {
        this.getJson (`${API + this.catalogUrl}`)
            .then (data => {
                for (let el of data) {
                    this.goods.push (el)
                }
                this.filteredGoods = this.goods;
            });
        this.getJson (`getProducts.json`)
            .then (data => {
                for (let el of data) {
                    this.goods.push (el)
                }
            });
    }
});











//ОПТИМИЗАЦИЯ

// class List {
//     constructor (url, container) {
//         this.container = container;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this._init () 

//     }
//     _init () {
//         return false
//     }
//     getJson (url) {
//         console.log(this);
//         console.log(url);
//         return fetch(url ? url : `${API + this.url}`)
//             .then (result => result.json ())
//             .catch (error => {
//                 console.log (error)
//             })
//     }

//     handleData (data) {
//         this.goods = [...data];
//         this.render ()
//     }
//     sumPrice () {
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0)
//     }
//     render () {
//         const block = document.querySelector (this.container);
//         for (let product of this.goods) {
            
//             const prod = new lists[this.constructor.name] (product);
//             this.allProducts.push(prod);
//             block.insertAdjacentHTML ('beforeend', prod.render ())
//         }
//     }
// }

// class Item {
//     constructor(el, price) {
//         this.product_name = el.product_name;
//         this.price = el.price;
//         this.id_product = el.id_product
//     }
//     render() {
//         return `<div class="goods-item">
//                     <h5>${this.product_name}</h5>
//                     <p>${this.price} руб.</p>
//                     <button 
//                     class="addButton" 
//                     data-name="${this.product_name}" 
//                     data-name="${this.product_name}" 
//                     data-price="${this.price}"
//                     >Добавить</button>
//                     <button class="removeButton" 
//                     data-id="${this.id_product}" 
//                     >Удалить</button>
//                 </div>`;
//     }
// }

// class ProductsList extends List {
//     constructor (cart, url = '/catalogData.json', container ='.products') {
//         super (url, container);
//         this.cart = cart;
//         this.getJson ()
//             .then (data => this.handleData (data));
//     }
//     _init () {
//         document.querySelector (this.container).addEventListener ('click', evt => {
//             if (evt.target.classList.contains('addButton')) {
//                 this.cart.addProduct (evt.target)
//             }
//         })
//     }
// }


// class ProductItem extends Item {}

// class Cart extends List {
//     constructor (url = '/getBasket.json', container ='.basket') {
//         super (url, container);
//         this.getJson ()
//             .then (data => this.handleData (data.contents));
//     }
//     addProduct (element) {
//         this.getJson (`${API}/addToBasket.json`)
//             .then (data => {
//                 if (data.result) {
//                     let productId = + element.dataset['id'];
//                     let find = this.allProducts.find (product => product.id_product === productId);

//                     if (find) {
//                         find.quantity++;
//                         this._updateCart (find)
//                     } else {
//                         let product = {
//                             id_product : productId,
//                             price : + element.dataset['price'],
//                             product_name : + element.dataset['name'],
//                             quantity : 1
//                         };
//                         this.goods = [product];
//                         this.render ();
//                     }
//                 } else {
//                     console.log ('some error here')
//                 }
//             })
//     }
//     removeProduct (element) {
//         this.getJson (`${API}/deleteFromBasket.json`)
//             .then (data => {
//                 if (data.result) {
//                     let productId = + element.dataset['id'];
//                     let find = this.allProducts.find (product => product.id_product === productId);

//                     if (find.quantity > 1) {
//                         find.quantity --;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.indexOf(find), 1);
//                         document.querySelector (`.cart-item[data-id="${productId}]`).remove ()
//                     }
//                 } else {
//                     console.log ('some error here')
//                 }
//             })
//     }
//     _updateCart (product) {
//         let block = document.querySelector (`.cart-item[data-id="${productId}]`);
//         block.querySelector (`.product-quantity`).textContent = `Количество: ${product.quantity}`;
//         block.querySelector (`.product-price`).textContent = `${this.price * product.price} руб.`;
//     }
//     _init () {
//         document.querySelector ('.cart-button').addEventListener ('click', () => {
//             document.querySelector (this.container.classList.toggle('invisible'))
//         });
//         document.querySelector (this.container).addEventListener ('click', evt => {
//             if (evt.target.classList.contains ('del-btn')) {
//                 this.removeProduct (evt.target)
//             }
//         })
//     }
// };

// class CartItem extends Item{
//     constructor (el) {
//         super (el);
//         this.quantity = el.quantity;
//     }
//     render () {
//          return `<div class="cart-item" data-id="${this.id_product}">
//                     <h6>${this.product_name}</h6>
//                     <p class="product-price">${this.price} руб.</p>
//                     <p class="product-quantity">Количество: ${this.quantity}</p>
//                     <button class="del-btn" data-id="${this.id_product}"> &times; </button>
//                 </div>`;
//     }
// };

// let lists = {
//     ProductsList : ProductItem,
//     Cart : CartItem
// };

// let cart = new Cart ();
// let products = new ProductsList (cart);

