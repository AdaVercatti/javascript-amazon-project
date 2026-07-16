import {cart} from "../data/cart.js"
import {products} from "../data/products.js"
import { deliveryOptions } from "../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";


export function renderOrderSummary(){
    let totalItem = 0;
    let totalCostCent = 0;
    let totalShippingCostCent = 0;
    cart.forEach((product) => {
        totalItem += product.quantity;
        const productId = product.productId;
        const deliveryOptionId = product.deliveryOptionId;
        let matchingItem;
        let matchingItem2;
        products.forEach((product)=> {
            if(product.id === productId){
                matchingItem = product;
            }
        });
        deliveryOptions.forEach((deliveryOption) => {
            if(deliveryOption.id === deliveryOptionId){
                matchingItem2 = deliveryOption;
            }
        })
        totalCostCent += matchingItem.priceCents * product.quantity;
        totalShippingCostCent += matchingItem2.priceCents;
    });

    const totalBeforTaxCostCent = totalCostCent + totalShippingCostCent;
    const TaxCostCent = totalBeforTaxCostCent * 0.1;
    const orderTotalCostCent = totalBeforTaxCostCent + TaxCostCent;

    let HTML = `
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (${totalItem}):</div>
                <div class="payment-summary-money">$${formatCurrency(totalCostCent)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${formatCurrency(totalShippingCostCent)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatCurrency(totalBeforTaxCostCent)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatCurrency(TaxCostCent)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${formatCurrency(orderTotalCostCent)}</div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>
          `;

    document.querySelector('.js-payment-summary').innerHTML = HTML;
}