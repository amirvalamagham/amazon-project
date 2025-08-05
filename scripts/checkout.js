import { cart } from "./cart.js";
import { products,loadProducts } from "../data/products.js";
import { orders,saveOrderToLocalStorage } from "../data/orderFromBackEnd.js";
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@2.0.0-alpha.4/dist/esm/index.mjs';


//variables
const cartContainer = document.querySelector('.order-summary');
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
                  </span><br><br>
                  <span class="update-quantity-link link-primary" data-update="${item.productId}">
                    Update
                  </span>
                  <input class="quantity-input" style="width:30px; border-radius:5px;">
                  <span class="save-quantity-link link-primary" data-save="${item.productId}">Save</span>
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




// show items in header and payment
const checkOutHeader = document.querySelector('.return-to-home-link');
checkOutHeader.innerHTML=`${cart.updateQuantity()} items in the cart`;
const test = document.querySelector('.items');
test.innerHTML=`Items (${cart.updateQuantity()}) :`;




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

//make update button interactive
const updateButtons = document.querySelectorAll('.update-quantity-link');
updateButtons.forEach((updateBut)=>{
  const updateId = updateBut.dataset.update;
  const container = updateBut.closest('.cart-item-container');
  updateBut.addEventListener('click',()=>{
    container.classList.add('is-editing-quantity');
    console.log(container);
    console.log(updateId);
  })
})
const saveButtons = document.querySelectorAll('.save-quantity-link');
saveButtons.forEach((saveBut,i)=>{
  const productSaveId = saveBut.dataset.save;
  const container = saveBut.closest('.cart-item-container');
  const inputEl = Array.from(document.querySelectorAll('.quantity-input'));  
  saveBut.addEventListener('click',()=>{
      container.classList.remove('is-editing-quantity');
      const theValue = Number(inputEl[i].value);
      console.log(productSaveId);
      cart.cartItem.forEach((item)=>{
        if(item.productId===productSaveId){
          item.quantity=theValue;
        }
        cart.saveToLocalStorage();
        renderTheCheckOutPage();
      })
      
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
  try{
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
  orders.unshift(response);
  saveOrderToLocalStorage();
  window.location.href='orders.html';
  }
  catch(e){
    console.log(`در فرستادن سفارش به بک اند دچار میشکل شدیم دوباره امتحان کنید:${e}`);
  }

}

placeOrder.addEventListener('click',sendOrder);



//on load
loadPage();