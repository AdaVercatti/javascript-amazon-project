    export let cart;
    loadLocalStorage();

    export function loadLocalStorage(){
        cart = JSON.parse(localStorage.getItem('cart')) || [
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
    ];
    };

    export function addToCart(productId,quantityValue){
        let matchingItem;
            cart.forEach((cartItem) => {
                if(cartItem.productId === productId){
                    matchingItem = cartItem;
                }
            });

            // 2. Either increase quantity OR add new item
            if(matchingItem){
                matchingItem.quantity +=quantityValue;
            }
            else{
                cart.push({
                    productId : productId,
                    quantity : quantityValue,
                    deliveryOptionId : '1'
                });
            };

            saveCart();

    };

    export function deleteItem(productId){
        const newCart = [];
        cart.forEach((product) => {
            if(product.productId !== productId){
                newCart.push(product);
            }
        })
        cart = newCart;
        saveCart();
    }



    function saveCart (){
        localStorage.setItem('cart',JSON.stringify(cart))
    }

    export function updateQuantity(productId,newQuantity){
        cart.forEach((product) => {
            if(product.productId === productId){
            product.quantity = newQuantity;
            }
        });
        saveCart();
    }

    export function updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem;
        cart.forEach((cartItem) => {
            if(cartItem.productId === productId){
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;
        saveCart();
    }




    export function loadCart (fun){
        const xhr = new XMLHttpRequest();
    
        xhr.addEventListener('load',()=>{
            console.log('cart loaded')
            fun();
        });
    
    
        xhr.open('GET','https://supersimplebackend.dev/carts');
        xhr.send();
    
    }