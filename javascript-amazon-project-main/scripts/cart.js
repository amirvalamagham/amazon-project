
export const cart ={
  cartItem:JSON.parse(localStorage.getItem('cart')),
  checkIfCArtIsNull(){
    if (!this.cartItem) {
      this.cartItem =[{
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 1,
        deliveryOptionId: '1'
      },
      {
        productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
        quantity: 2,
        deliveryOptionId: '2'
      },
      {
        productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
        quantity: 3,
        deliveryOptionId: '3'
      }]
    }
  },
  addToCart(userProductId,userQuantity){
    let matchingItem;
    this.cartItem.forEach((Item) => {
      if (Item.productId === userProductId) {
        matchingItem = Item;
      }
    })
  
    if (matchingItem) {
      matchingItem.quantity += Number(userQuantity);
    }
    else {
      this.cartItem.push({
        productId: userProductId,
        quantity: Number(userQuantity),
        deliveryOptionId: '1'
      })
    }
    this.saveToLocalStorage();
  },
  currencyFix(number){
    return (Math.round(number) / 100).toFixed(2);
  },
  saveToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(this.cartItem));
  },
updateQuantity(){
  let allQuantity=0;
  cart.cartItem.forEach((item)=>{
    allQuantity=allQuantity+item.quantity;
  })
 return allQuantity;
}
}
// on load
cart.checkIfCArtIsNull();

// class Cart{
//   cartItem;
//   #localStorageKey;
//   constructor(input){
//     this.#localStorageKey=input;
//     cartItem=JSON.parse(#localStorage.getItem(input));
//   }
//   checkIfCArtIsNull(){
//     if (!this.cartItem) {
//       this.cartItem = {
//         id: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
//         quantity: 1,
//         deliveryOptionID: '1'
//       },
//       {
//         id: '54e0eccd-8f36-462b-b68a-8182611d9add',
//         quantity: 2,
//         deliveryOptionID: '2'
//       },
//       {
//         id: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
//         quantity: 3,
//         deliveryOptionID: '3'
//       }
//     }
//   };
//   addToCart(productId,userQuantity){
//     let matchingItem;
//     this.cartItem.forEach((Item) => {
//       if (Item.id === productId) {
//         matchingItem = Item;
//       }
//     })
  
//     if (matchingItem) {
//       matchingItem.quantity += Number(userQuantity);
//     }
//     else {
//       this.cartItem.push({
//         id: productId,
//         quantity: Number(userQuantity),
//         deliveryOptionID: '1'
//       })
//     }
//     this.saveToLocalStorage();
//   };
//   currencyFix(number){
//     return (Math.round(number) / 100).toFixed(2);
//   };
//   saveToLocalStorage(){
//     localStorage.setItem('cart', JSON.stringify(cart.cartItem));
//   }
// }
// export const cart = new Cart();