import { renderCheckoutHTML } from "./checkout/orderSummary.js";
import { renderOrderSummary } from "./checkout/paymentSummary.js";
import { loadProducts,loadProductsFetch } from "./data/products.js";
import { loadCart } from "./data/cart.js";
// import '../scripts/data/cart-class.js'
// import '../scripts/data/car.js'
// import '../scripts/data/backend-practice.js'



Promise.all([
    loadProductsFetch(),
    new Promise ((resolve)=>{
        loadCart(()=>{
            resolve('value1');
        })
    })
]).then((value)=>{
    console.log(value)
    renderCheckoutHTML();
    renderOrderSummary();
})


/*
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve();
    })
}).then(()=>{
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    })
}).then(()=>{
    console.log('rendered')
    renderCheckoutHTML();
    renderOrderSummary();
})

/*
loadProducts(()=>{
    renderCheckoutHTML();
    renderOrderSummary();
})

*/