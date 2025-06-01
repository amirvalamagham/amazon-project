import { cart } from "./cart.js";
import { products,loadProducts } from "../data/products.js";
import { orders,saveOrderToLocalStorage } from "../data/orderFromBackEnd.js";
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@2.0.0-alpha.4/dist/esm/index.mjs';


//variables
const cartContainer = document.querySelector('.order-summary');
const checkOutHeader = document.querySelector('.return-to-home-link');
const placeOrder = document.querySelector('.button-primary');
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
  cart.cartItem.forEach((item) => {
    //get the all infos by id
    let matchedItems;
    let matchedDate;
    deliveryOptions.forEach((option)=>{
      if(option.deliveryId===item.deliveryOptionId){
        matchedDate=option;
      }
    })
    const today = dayjs();
    const addTheDay = today.add(matchedDate.deliveryTime,'days');
    const fromatTheDay = addTheDay.format('dddd MMMM D');
    const cartId = item.productId;
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
                ${matchedItems.getPrice()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-test="${item.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${generateDeliveryDates(item.productId,item)}
              </div>
            </div>
          </div>`


})
cartContainer.innerHTML=cartProductsHtml;




// update items in header
function updateQuantityInCheckOut(){
let all= 0;
cart.cartItem.forEach((item)=>{
  all +=item.quantity;
})
checkOutHeader.innerHTML=`${all} items in the cart`;
}

updateQuantityInCheckOut();


// make delete button interactive when pressing it delete the html on page and remove the product from the cart array
const dltButtons = document.querySelectorAll('.delete-quantity-link');
dltButtons.forEach((but)=>{
but.addEventListener('click',()=>{
  const dltId = but.dataset.test;
  cart.cartItem.forEach((items,index)=>{
    if(dltId===items.productId){
      cart.cartItem.splice(index,1);
    }
  })
  const container = but.closest('.cart-item-container');
  container.remove();
  cart.saveToLocalStorage();
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
    const theDatePrice = deliveryOption.priceCents===0?'FREE Shipping':'$'+cart.currencyFix(deliveryOption.priceCents)+' - Shipping';

    htmlDate+=`<div class="delivery-option" data-productId="${productId}" data-deliveryId="${deliveryOption.deliveryId}">
        <input type="radio" ${theCartIds.deliveryOptionId===deliveryOption.deliveryId?'checked':''}
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
  return htmlDate;
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
cart.cartItem.forEach((cartItem)=>{
  let matchedP;
  products.forEach((item)=>{
    if(item.id===cartItem.productId){
      matchedP=item;
    }
  
  })
  const all = cartItem.quantity*matchedP.priceCents;
  totalItemsCost+=all;
})
 cart.cartItem.forEach((item)=>{
  let matched;
  
  deliveryOptions.forEach((delivery)=>{
    if(delivery.deliveryId===item.deliveryOptionId){
      matched=delivery;
    }
  })
  totalShippingCost+= matched.priceCents;
 })
 const totalWithOutTax = totalItemsCost+totalShippingCost;
 const withTax= totalWithOutTax*0.1;
 const totalCost = withTax+totalWithOutTax;
document.querySelector('.product-cost').innerHTML=`$${cart.currencyFix(totalItemsCost)}`; 
document.querySelector('.product-shipping-cost').innerHTML=`$${cart.currencyFix(totalShippingCost)}`;
document.querySelector('.without-tax').innerHTML=`$${cart.currencyFix(totalWithOutTax)}`;
document.querySelector('.tax').innerHTML=`$${cart.currencyFix(withTax)}`;
document.querySelector('.all').innerHTML=`$${cart.currencyFix(totalCost)}`;
}

 // change the delivery time and id on cart page 
 function updateDeliveryTime(prId,newDeliveryOptionId){
  let matchedItems;
  cart.cartItem.forEach((item)=>{
    if(item.productId===prId){
      matchedItems=item;
     
    }
  })
  matchedItems.deliveryOptionId=newDeliveryOptionId;
  cart.saveToLocalStorage();
 }

// make function to get products and show on checkout page
// loadProducts().then(()=>{
//   renderTheCheckOutPage();
// })
async function loadPage(){
  await loadProducts();
  renderTheCheckOutPage();
}





//submit the order and send it to backend and get the response
async function sendOrder(){
  const message = await fetch('https://supersimplebackend.dev/orders',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      cart:cart.cartItem
    })
  })
  const response = await message.json();
  orders.push(response);
  saveOrderToLocalStorage();
  window.location.href='orders.html';
}

placeOrder.addEventListener('click',sendOrder);



//on load
loadPage();