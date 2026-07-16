import {cart, updateDeliveryOption, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deleteItem } from '../data/cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js'
import { renderOrderSummary } from './paymentSummary.js';


export function renderCheckoutHTML(){
    displayItems();
    let checkoutDisplayHTML = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let matchingItem;
        products.forEach((product) => {
            if( product.id === productId){
                matchingItem = product;
            }
        })

        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption;
        deliveryOptions.forEach((option) => {
          if(option.id === deliveryOptionId){
            deliveryOption = option;
          }
        });
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,'day');
        const format = deliveryDate.format('dddd, MMM D');

        checkoutDisplayHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
                <div class="delivery-date">
                  Delivery date: ${format}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingItem.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingItem.name}
                    </div>
                    <div class="product-price">
                      $${formatCurrency(matchingItem.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${matchingItem.id}">
                        Update
                      </span>
                      <input class="quantity-input js-quantity-input"> 
                      <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingItem.id}">Save</span>
                      <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingItem.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                      ${deliveryOptionsHTML(matchingItem,cartItem)}
                  </div>
                </div>
              </div>
        `
    })

    document.querySelector('.js-order-summary').innerHTML = checkoutDisplayHTML;

    document.querySelectorAll('.js-delete-quantity-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const productId  = link.dataset.productId;
          deleteItem(productId);  
          renderOrderSummary();
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.remove();
          displayItems();
        })
      })

    function displayItems (){
      let cartQuantity = 0;
      cart.forEach((item) => {
                cartQuantity += item.quantity;
      });
      document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
    }

    document.querySelectorAll('.js-update-quantity-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId;
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.add('is-editing-quantity')
        })
      })


    document.querySelectorAll('.js-save-quantity-link')
      .forEach((link) => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId;
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
          saveQuantity(productId, container);
        });
      });

    function saveQuantity(productId, container) {
      const quantityInput = container.querySelector('.js-quantity-input');
      const quantityLabel = container.querySelector('.js-quantity-label');
      const newQuantity = Number(quantityInput.value);

      container.classList.remove('is-editing-quantity');

      if (newQuantity > 0 && newQuantity < 1000) {
        updateQuantity(productId, newQuantity);
        quantityLabel.innerHTML = newQuantity;
      }

      displayItems();
      renderOrderSummary();
    }


    document.querySelectorAll('.js-quantity-input')
      .forEach((input) => {
        input.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            const container = input.closest('.cart-item-container');
            const productId = container.querySelector('.js-save-quantity-link').dataset.productId;
            saveQuantity(productId, container);
          }
        });
      });


    function deliveryOptionsHTML (matchingItem,cartItem){
      let HTML= '';
      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,'day');
        const format = deliveryDate.format('dddd, MMM D');
        const deliveryPrice = deliveryOption.priceCents ? `$${formatCurrency(deliveryOption.priceCents)} -` : 'FREE' ;
        const isChecked = cartItem.deliveryOptionId === deliveryOption.id;
        HTML += `
                    <div class="delivery-option js-delivery-option" data-option-id = "${deliveryOption.id}" data-product-id="${matchingItem.id}" >
                      <input type="radio"
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${format}
                        </div>
                        <div class="delivery-option-price">
                          ${deliveryPrice} Shipping
                        </div>
                      </div>
                    </div>`
      })
      return HTML;
    }

    document.querySelectorAll('.js-delivery-option')
      .forEach((option) => {
        option.addEventListener('click', () => {
          const deliveryOptionId = option.dataset.optionId;
          const productId = option.dataset.productId;
          updateDeliveryOption(productId,deliveryOptionId);
          renderCheckoutHTML();
          renderOrderSummary();
        })
      })
}      
