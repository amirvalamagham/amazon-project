export const orders = JSON.parse(localStorage.getItem('orders'))||[{
id:"25d8d6e1-14e3-48c3-beff-415e4600d686",
orderTime:"2025-05-29T15:31:56.968Z",
products:[{productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e', quantity: 1, estimatedDeliveryTime: '2025-06-05T15:31:56.958Z', variation: null}, {productId: '54e0eccd-8f36-462b-b68a-8182611d9add', quantity: 2, estimatedDeliveryTime: '2025-06-01T15:31:56.968Z', variation: null}, {productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d', quantity: 3, estimatedDeliveryTime: '2025-05-30T15:31:56.968Z', variation: null}, {productId: 'aad29d11-ea98-41ee-9285-b916638cac4a', quantity: 1, estimatedDeliveryTime: '2025-06-05T15:31:56.968Z', variation: null}],
totalCostCents: 16341
}];

// save orders into local storage
export function saveOrderToLocalStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}
