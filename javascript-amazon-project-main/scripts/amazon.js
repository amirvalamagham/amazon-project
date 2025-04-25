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
            $${(item.priceCents/100).toFixed(2)}
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





//make add to cart button ineractive (add to cart array)
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
addToCartButtons.forEach((button)=>{
   
  button.addEventListener('click',()=>{
    const productBeenSelectedId = button.dataset.id;
    const theValueContainerBeenSelected = button.closest('.product-container');
    const quanitySelection = theValueContainerBeenSelected.querySelector('.select-quantity').value;
    

    let matchingItem;
    cart.forEach((item)=>{
      if(item.id===productBeenSelectedId){
        matchingItem=item;
      }
    })
    
      if(matchingItem){
        matchingItem.quantity+=Number(quanitySelection);
      }
      else{
        cart.push({
          id:productBeenSelectedId,
          quantity:Number(quanitySelection)
        })
      }
   
     




  //show the all cart quanity
    let allQuantity=0;
    cart.forEach((item)=>{
      allQuantity=allQuantity+item.quantity;
    })
    cartQuanity.innerHTML=allQuantity;
    console.log(cart);


    // show the added massage
        const massage = document.querySelectorAll('.added-to-cart');
        massage.forEach((msg)=>{
          let msgId = msg.dataset.massageAlert;
          if(msgId===productBeenSelectedId){
            msg.style.opacity='1';
            setTimeout(()=>{
              msg.style.opacity='0';
            },1000)
          }
          
          
        })


    })





})
