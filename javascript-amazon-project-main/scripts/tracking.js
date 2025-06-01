import { orders } from "../data/orderFromBackEnd.js";
import { loadProducts, products } from "../data/products.js";
console.log(orders);


//variables
const container = document.querySelector('.main');

// get order and product infos by the Url Parameters
const url = new URL(window.location.href);
const productIdInUrl = url.searchParams.get('productId');
const orderIdInUrl = url.searchParams.get('orderId');
let theOrder;
let theProduct;
orders.forEach(order => {
    if(order.id===orderIdInUrl){
        theOrder=order;
    }
});
theOrder.products.forEach((product)=>{
    if(product.productId===productIdInUrl){
       theProduct = product;
    }
})

//generate html with that product 
function renderPage(){
    let matched;
    products.forEach((item)=>{
        if(item.id===productIdInUrl){
            matched=item;
        }
    })
    let html = `<div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${new Date(theProduct.estimatedDeliveryTime).toDateString()}
        </div>

        <div class="product-info">
          ${matched.name}
        </div>

        <div class="product-info">
          Quantity: ${theProduct.quantity}
        </div>

        <img class="product-image" src="${matched.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>`;

     container.innerHTML=html;
}




async function loadTrackingPage() {
    await loadProducts();
    renderPage();
}

loadTrackingPage();