import { renderCheckoutHTML } from "../../scripts/checkout/orderSummary.js";
import { cart,loadLocalStorage } from "../../scripts/data/cart.js";
import { deliveryOptions } from "../../scripts/data/deliveryOptions.js";
import { loadProducts } from "../../scripts/data/products.js";


const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

describe ('test suit: displays an order summary', ()=>{

    beforeAll((done)=>{
        loadProducts(()=>{
            done();
        })
    })
    beforeEach(()=>{
        spyOn (Storage.prototype,'getItem').and.returnValue(JSON.stringify([
            {
                productId : productId1,
                quantity: 1,
                deliveryOptionId : '3'
            },
            {
                productId : productId2,
                quantity: 1,
                deliveryOptionId: '1'
            }
        ]));
        document.querySelector('.js-summary-container').innerHTML = `<div class="js-order-summary"></div>`
        loadLocalStorage();
        spyOn (Storage.prototype,'setItem');
        renderCheckoutHTML();
    });
    afterEach(()=>{
        document.querySelector('.js-summary-container').innerHTML = '';
    });

    it('carts products prices',()=>{
       expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toContain('$10.90')
    });
    
    it ('delivery option',()=>{
        expect(document.querySelector(`.js-delivery-option-${productId1}-${3}`).innerHTML).toContain('checked');
        expect(cart.length).toEqual(2);
                                                                          
    })
})