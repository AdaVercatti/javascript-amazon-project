class Cart {
        cartItem;
        #localStorageKey;


        constructor (localStorageKey){
            this.#localStorageKey = localStorageKey;
            this.#loadLocalStorage();
        }


        #loadLocalStorage(){
        this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }
            ]
        };



        addToCart(productId,quantityValue){
            let matchingItem;
                this.cartItem.forEach((cartItem) => {
                    if(cartItem.productId === productId){
                        matchingItem = cartItem;
                    }
                });

                // 2. Either increase quantity OR add new item
                if(matchingItem){
                    matchingItem.quantity +=quantityValue;
                }
                else{
                    this.cartItem.push({
                        productId : productId,
                        quantity : quantityValue,
                        deliveryOptionId : '1'
                    });
                };

                this.saveCart();

        };


        deleteItem(productId){
            const newCart = [];
            this.cartItem.forEach((product) => {
                if(product.productId !== productId){
                    newCart.push(product);
                }
            })
            this.cartItem = newCart;
            this.saveCart();
        };



        saveCart(){
            localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItem))
        };


        updateQuantity(productId,newQuantity){
            this.cartItem.forEach((product) => {
                if(product.productId === productId){
                product.quantity = newQuantity;
                }
            });
            this.saveCart();
        };



        updateDeliveryOption(productId,deliveryOptionId){
            let matchingItem;
            this.cartItem.forEach((cartItem) => {
                if(cartItem.productId === productId){
                    matchingItem = cartItem;
                }
            });

            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveCart();
        }
}    


const cart = new Cart('cart-oop');
const CheckCart = new Cart('check-cart');


console.log(cart);
console.log(CheckCart)

    

 





    

    

    