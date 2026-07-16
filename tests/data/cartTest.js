import {addToCart,cart,loadLocalStorage} from '../../scripts/data/cart.js';


describe('test suit: add to cart', ()=> {
    it('adds a existing item to the car', ()=>{
        spyOn(Storage.prototype,'setItem');
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
    });

    it ('adds a new item to the cart',()=>{
        spyOn (Storage.prototype,'setItem');
        spyOn(Storage.prototype,'getItem').and.callFake(() => {
            return JSON.stringify([]);
        })
        loadLocalStorage();
        addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53', 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
        expect(cart[0].quantity).toEqual(1);
    })
});