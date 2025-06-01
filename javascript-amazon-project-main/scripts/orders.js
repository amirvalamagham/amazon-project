import { cart } from "./cart.js";
import { orders } from "../data/orderFromBackEnd.js";
import { loadProducts, products } from "../data/products.js";


console.log(orders);

async function loadOrderPage(){
  await loadProducts();
  renderOrder();
}
loadOrderPage();

//variables
const orderContainer = document.querySelector('.orders-grid-vala');
const cartQuantity = document.querySelector('.cart-quantity');

// show cart quantity
cartQuantity.innerHTML=cart.updateQuantity();


// show all orders on page with orders details 
let orderHtml ='';
export function renderOrder(){

orders.forEach((order) =>{
  const orderTimeAsString = new Date(`${order.orderTime}`);
  const easyToReadTime = orderTimeAsString.toDateString(); 
  console.log(order.products);
    orderHtml+=`<div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${easyToReadTime}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${cart.currencyFix(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
           ${renderOrdersProdcuts(order.products,order.id)}
        </div>`
});
orderContainer.innerHTML=orderHtml;
}

function renderOrdersProdcuts(ordersProducts,orderId){
  let html='';
  let macthedItem;
    ordersProducts.forEach((product)=>{
      products.forEach((item)=>{
        if(item.id===product.productId){
          macthedItem=item;
        }
      })
      html+=`<div class="order-details-grid">
            <div class="product-image-container">
              <img src="${macthedItem.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${macthedItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: August 15
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?productId=${product.productId}&orderId=${orderId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>`
    })
    return html;
  
}