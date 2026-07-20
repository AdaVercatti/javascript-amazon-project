import {addToCart,cart,loadLocalStorage,deleteItem,updateDeliveryOption} from '../../scripts/data/cart.js';

const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
describe('test suit: add to cart', ()=> {
    beforeEach(()=>{
        spyOn(Storage.prototype,'setItem');
        document.querySelector('.js-summary-container').innerHTML = `<div class="js-order-summary"></div>`
    })
    it('adds a existing item to the car', ()=>{
        spyOn(Storage.prototype,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
                quantity: 1,
                deliveryOptionId: '1'
            }
            ])
        });
        loadLocalStorage();
        addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53', 1);
        expect(cart.length).toEqual(1);
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
                quantity: 2,
                deliveryOptionId: '1'}]))
    });

    it ('adds a new item to the cart',()=>{
        spyOn(Storage.prototype,'getItem').and.callFake(() => {
            return JSON.stringify([]);
        })
        loadLocalStorage();
        addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53', 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
                quantity: 1,
                deliveryOptionId: '1'}]))
    });

    const productId1 = '8c9c52b5-5a19-4bcb-a5d1-158a74287c53';
    it ('remove from cart', ()=>{
        spyOn(Storage.prototype,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1'
            }])
        });

        loadLocalStorage();
        deleteItem(productId1);
        expect(cart.length).toEqual(0);
        expect(cart).not.toContain(productId1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
    });
    it ('update delivery options',()=>{
        spyOn(Storage.prototype,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId : productId1,
                quantity: 1,
                deliveryOptionId : '1'
            }])
        });
        loadLocalStorage();
        updateDeliveryOption(productId1,'2');
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].deliveryOptionId).toEqual('2');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart))
    })
});