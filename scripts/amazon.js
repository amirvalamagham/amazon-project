import { cart } from './cart.js';
import { products, loadProducts } from '../data/products.js';
//variables
const productContainer = document.querySelector('.products-grid');
const cartQuanity = document.querySelector('.cart-quantity');


//get the users search and add it to url
const searchBarEl = document.querySelector('.search-bar');
const searchBut = document.querySelector('.search-button');
let userSearch = '';
searchBut.addEventListener('click', () => {
  userSearch = searchBarEl.value;
  window.location.href = `${window.location.href}?search=${userSearch}`;
})

// get products from backend by fetch
loadProducts().then(() => {
    if (window.location.href.includes('search')) {
    const url = new URL(window.location.href);
    const theUserSearch = url.searchParams.get('search');
    const clearSearch = theUserSearch.replace('%', ' ');
    const searchResult = products.filter((item) => {
     return item.name.includes(clearSearch);
    })
      let productHtml = '';
  searchResult.forEach((item) => {
    productHtml += `
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
              src="${item.getStars()}">
            <div class="product-rating-count link-primary">
              ${item.rating.count}
            </div>
          </div>

          <div class="product-price">
           ${item.getPrice()}
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
          ${item.extraInfo()}
          <div class="product-spacer"></div>

   
        </div>`;

  })
  productContainer.innerHTML = productHtml;
   
  }
  else{
      renderProducts();
  }
});








// get products from backend by promise and callback
// new Promise((resolve)=>{
//   loadProducts(()=>{
//     resolve();
//   })
// }).then(()=>{
//   renderProducts();
// })



function renderProducts() {
  //show products on page
  let productHtml = '';
  products.forEach((item) => {
    productHtml += `
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
              src="${item.getStars()}">
            <div class="product-rating-count link-primary">
              ${item.rating.count}
            </div>
          </div>

          <div class="product-price">
           ${item.getPrice()}
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
          ${item.extraInfo()}
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
  productContainer.innerHTML = productHtml;



  // pop up the added massage when the user click on add to cart
  function showMassage(productId) {
    const massage = document.querySelectorAll('.added-to-cart');
    massage.forEach((msg) => {
      let msgId = msg.dataset.massageAlert;
      if (msgId === productId) {
        msg.style.opacity = '1';
        setTimeout(() => {
          msg.style.opacity = '0';
        }, 1000)
      }
    })
  }

  //add event listeners and make add to cart interactive
  const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
  addToCartButtons.forEach((button) => {

    button.addEventListener('click', () => {
      //get the specific product id
      const productBeenSelectedId = button.dataset.id;
      //find the select value of product
      const theValueContainerBeenSelected = button.closest('.product-container');
      const quanitySelection = theValueContainerBeenSelected.querySelector('.select-quantity').value;
      cart.addToCart(productBeenSelectedId, quanitySelection);
      cart.updateQuantity();
      renderProducts();
      showMassage(productBeenSelectedId);

    })
  })
  cartQuanity.innerHTML = cart.updateQuantity();
}







