export const cart =JSON.parse(localStorage.getItem('cart'))|| [
    {
        id:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity:1,
        deliveryOptionID : '1'
    },
    {
        id:'54e0eccd-8f36-462b-b68a-8182611d9add',
        quantity:2,
        deliveryOptionID : '2'
    },
    {id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    quantity:3,
    deliveryOptionID : '3'
    }
];

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
        quantity:Number(userQuantity),
        deliveryOptionID:'1'
      })
    }
    saveToLocalStorage();
}

// make currency look correct convert to dollars and show two decimals
export function currencyFix(number){
    return (Math.round(number)/100).toFixed(2);
 }



 // save cart to local sotrage
 export function saveToLocalStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
 }




