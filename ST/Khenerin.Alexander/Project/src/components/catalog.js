import CatalogItem from './catalogItem.js';
export default class Catalog {
    constructor(container, url, basket) {
        this.items = [];
        this.container = document.querySelector(container);
        this.url = url;
        this.basket = basket;
        this._init();
    }
    _init(basket) {
        this._get(this.url)
            .then(arr => {
                this.items = arr;
            })
            .finally(() => {
                this._render();
                this._handleActions();
            })
    }
    _get(url) {
        return fetch(url).then(d => d.json());
    }
    _fillCatalog() { //Инкапсуляция (условная для JS)
        this.items = getArrayOfObjects();
    }
    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += `<div class="col-10 offset-1 col-sm-6 offset-sm-0 col-md-4 col-lg-3 feturedItems ">
                            <div class="feturedItem">
                                <div class="feturedImgWrap">
                                    <div class="feturedBuy">
                                        <button
                                            name="add"
                                            data-id="${item.productId}"
                                            data-name="${item.productName}"
                                            data-price="${item.productPrice}"
                                            data-img="${item.productImg}"
                                        >
                                            <div><i class="fas fa-shopping-cart"></i> Add to Cart</div>
                                        </button>
                                    </div>
                                    <img class="feturedProduct" src="${item.productImg}" alt="product1">
                                </div>
                                <div>
                                    <div class="feturedBuySm d-flex flex-column justify-content-around align-items-center align-items-md-start">
                                        <div class="feturedItemName">${item.productName}</div>
                                        <div class="feturedItemPrice">$${item.productPrice}</div>
                                        <button 
                                            class="d-md-none"
                                            name="add"
                                            data-id="${item.productId}"
                                            data-name="${item.productName}"
                                            data-price="${item.productPrice}"
                                            data-img="${item.productImg}"
                                        >
                                            <i class="fas fa-shopping-cart"></i> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`
        });
        this.container.innerHTML = htmlStr;
    }
    _handleActions() {
        this.container.addEventListener('click', ev => {
            if (ev.target.name == 'add') {
                let dataset = ev.target.dataset;
                this.basket.add(this._createNewItem(dataset));
            }
        })
    }
    _createNewItem(dataset) {
        return {
            productId: dataset.id,
            productName: dataset.name,
            productImg: dataset.img,
            productPrice: +dataset.price,
            amount: 1
        }
    }
}

