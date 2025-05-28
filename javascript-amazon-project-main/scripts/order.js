export const orders = JSON.parse(localStorage.getItem('orders'))||[];
const orderContainer = document.querySelector('.orders-grid');




// save orders into local storage
export function saveOrderToLocalStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}

