export const cart = [];

// add products to cart array
export function addToCart(productId,userQuantity){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(cartItem.id===productId){
      matchingItem=cartItem;
    }
  })
  
    if(matchingItem){
      matchingItem.quantity+=Number(userQuantity);
    }
    else{
      cart.push({
        id:productId,
        quantity:Number(userQuantity)
      })
    }
}