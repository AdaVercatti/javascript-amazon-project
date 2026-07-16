import { renderCheckoutHTML } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../scripts/data/cart.js";
import { deliveryOptions } from "../../scripts/data/deliveryOptions.js";

const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

describe ('test suit: displays an order summary', ()=>{
    beforeEach(()=>{
        spyOn (Storage.prototype,'getItem').and.returnValue(JSON.stringify([
            {
                productId : productId1,
                quantity: 1,
                deliveryOptionId : '1'
            },
            {
                productId : productId2,
                quantity: 1,
                deliveryOptionId: '1'
            }
        ]));
        spyOn (Storage.prototype,'setItem');
        document.querySelector('.js-summary-container').innerHTML = `<div class="js-order-summary"></div>`
        renderCheckoutHTML();
    });

    it('carts products',()=>{
       document.querySelector('.js-summary-container').innerHTML = '';
    });
})