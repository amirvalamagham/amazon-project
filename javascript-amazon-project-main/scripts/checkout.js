import { cart,currencyFix,saveToLocalStorage } from "./cart.js";
import { products } from "../data/products.js";
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@2.0.0-alpha.4/dist/esm/index.mjs';
//variables
const cartContainer = document.querySelector('.order-summary');

const deliveryOptions = [
  {
    deliveryId : '1',
    deliveryTime : 7,
    priceCents : 0
  },
  {
    deliveryId : '2',
    deliveryTime : 3,
    priceCents : 499
  },
  {
    deliveryId : '3',
    deliveryTime : 1,
    priceCents : 999
  }
];
// generate html by reading products in the cart
function renderTheCheckOutPage(){
let cartProductsHtml = '';
  cart.forEach((cartItem) => {
    //get the all infos by id
    let matchedItems;
    let matchedDate;
    deliveryOptions.forEach((option)=>{
      if(option.deliveryId===cartItem.deliveryOptionID){
        matchedDate=option;
      }
    })
    const today = dayjs();
    const addTheDay = today.add(matchedDate.deliveryTime,'days');
    const fromatTheDay = addTheDay.format('dddd MMMM D');
    const cartId = cartItem.id;
    products.forEach((product) => {
        if (product.id === cartId) {
            matchedItems = product;
        }
    })
    cartProductsHtml+=`<div class="cart-item-container">
            <div class="delivery-date">
              ${fromatTheDay}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchedItems.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchedItems.name}
                </div>
                <div class="product-price">
                $${currencyFix(matchedItems.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-test="${cartItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${generateDeliveryDates(cartItem.id,cartItem)}
              </div>
            </div>
          </div>`


})
cartContainer.innerHTML=cartProductsHtml;



// make delete button interactive when pressing it delete the html on page and remove the product from the cart array
const dltButtons = document.querySelectorAll('.delete-quantity-link');
dltButtons.forEach((but)=>{
but.addEventListener('click',()=>{
  const dltId = but.dataset.test;
  cart.forEach((items,index)=>{
    if(dltId===items.id){
      cart.splice(index,1);
      console.log(cart);
    }
  })
  const container = but.closest('.cart-item-container');
  container.remove();
  saveToLocalStorage();
  console.log(cart);
  renderTheCheckOutPage();
})
})



// make a function to show delivery days in forward to today's date
function generateDeliveryDates(productId,theCartIds){
  let htmlDate='';
  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const addTheDay = today.add(deliveryOption.deliveryTime,'days');
    const fromatTheDay = addTheDay.format('dddd MMMM D');
    const theDatePrice = deliveryOption.priceCents===0?'FREE Shipping':'$'+currencyFix(deliveryOption.priceCents)+' - Shipping';

    htmlDate+=`<div class="delivery-option" data-productId="${productId}" data-deliveryId="${deliveryOption.deliveryId}">
        <input type="radio" ${theCartIds.deliveryOptionID===deliveryOption.deliveryId?'checked':''}
          class="delivery-option-input"
          name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">
            ${fromatTheDay}
          </div>
          <div class="delivery-option-price">
            ${theDatePrice}
          </div>
        </div>
      </div>`
  })
  return htmlDate
}





const checkedOptions = document.querySelectorAll('.delivery-option');
checkedOptions.forEach((element)=>{
  element.addEventListener('click',()=>{
    console.log('click');
    const{productid,deliveryid}=element.dataset;
    console.log(productid,deliveryid);
    updateDeliveryTime(productid,deliveryid);
    renderTheCheckOutPage();
  })
})


//calculate all the costs in checkout page
let totalShippingCost = 0;
let totalItemsCost = 0;
const tax = 0.1;
cart.forEach((cartItem)=>{
  let matchedP;
  products.forEach((item)=>{
    if(item.id===cartItem.id){
      matchedP=item;
    }
  
  })
  const all = cartItem.quantity*matchedP.priceCents;
  totalItemsCost+=all;
})
 cart.forEach((item)=>{
  let matched;
  
  deliveryOptions.forEach((delivery)=>{
    if(delivery.deliveryId===item.deliveryOptionID){
      matched=delivery;
    }
  })
  
  totalShippingCost+= matched.priceCents;
 })

 const totalWithOutTax = totalItemsCost+totalShippingCost;
 const withTax= totalWithOutTax*0.1;
 const totalCost = withTax+totalWithOutTax;

const productCostEl = document.querySelector('.product-cost').innerHTML=`$${currencyFix(totalItemsCost)}`; 
const productShippingCostEl = document.querySelector('.product-shipping-cost').innerHTML=`$${currencyFix(totalShippingCost)}`;
const beforeTaxAllEl= document.querySelector('.without-tax').innerHTML=`$${currencyFix(totalWithOutTax)}`;
const taxEl= document.querySelector('.tax').innerHTML=`$${currencyFix(withTax)}`;
const totalCostsWithTax= document.querySelector('.all').innerHTML=`$${currencyFix(totalCost)}`;
}

 // change the delivery time and id on cart page 
 function updateDeliveryTime(productId,newDeliveryOptionId){
  let matchedItems;
  cart.forEach((item)=>{
    if(item.id===productId){
      matchedItems=item;
     
    }

  })
  matchedItems.deliveryOptionID=newDeliveryOptionId;
  saveToLocalStorage();
 }





 


//on load
renderTheCheckOutPage();

