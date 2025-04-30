import {cart,addToCart} from './cart.js';
import { products } from '../data/products.js';
import { currencyFix } from './cart.js';
//variables
const productContainer = document.querySelector('.products-grid');
const cartQuanity = document.querySelector('.cart-quantity');



//show products on page
let productHtml='';
products.forEach((item)=>{
productHtml+=`
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${item.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${item.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${item.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${item.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${currencyFix(item.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="select-quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart" data-massage-alert=${item.id}>
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-id="${item.id}">
            Add to Cart
          </button>
        </div>`;

})
productContainer.innerHTML=productHtml;




 //show the all cart quanities
function updateQuantity(){
  let allQuantity=0;
  cart.forEach((item)=>{
    allQuantity=allQuantity+item.quantity;
  })
  cartQuanity.innerHTML=allQuantity;
  console.log(cart);
}


// pop up the added massage when the user click on add to cart
function showMassage(productId){
  const massage = document.querySelectorAll('.added-to-cart');
  massage.forEach((msg)=>{
    let msgId = msg.dataset.massageAlert;
    if(msgId===productId){
      msg.style.opacity='1';
      setTimeout(()=>{
        msg.style.opacity='0';
      },1000)
    }
  })
}

//add event listeners
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
addToCartButtons.forEach((button)=>{
   
  button.addEventListener('click',()=>{
    //get the specific product id
    const productBeenSelectedId = button.dataset.id;
    //find the select value of product
    const theValueContainerBeenSelected = button.closest('.product-container');
    const quanitySelection = theValueContainerBeenSelected.querySelector('.select-quantity').value;
    addToCart(productBeenSelectedId,quanitySelection);
    updateQuantity();
    showMassage(productBeenSelectedId);
    })
})
