export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
];

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
                quantity : quantityValue
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