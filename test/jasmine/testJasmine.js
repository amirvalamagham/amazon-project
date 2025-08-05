import {cart} from '../../scripts/cart.js';

describe('Test Suite : CurrencyFix',()=>{
    it('works with normal numbers(convert cents into dollar)',()=>{
        expect(cart.currencyFix(4554)).toEqual('45.54');
    })
    it('works with 0',()=>{
        expect(cart.currencyFix(0)).toEqual('0.00');
    })
    it('rounding numbers',()=>{
        expect(cart.currencyFix(5000.4)).toEqual('50.00');
        expect(cart.currencyFix(2000.5)).toEqual('20.01');
    })
})
describe('Test Suite : addToCart',()=>{
    it('add new product to the cart',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        })
        cart.addToCart('a45cfa0a-66d6-4dc7-9475-e2b01595f7d7',1);
        expect(cart.cartItem.length).toEqual(1);
    })
    it('add existing item to the cart',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        })
        cart.addToCart('a45cfa0a-66d6-4dc7-9475-e2b01595f7d7',1);
        cart.addToCart('a45cfa0a-66d6-4dc7-9475-e2b01595f7d7',2);
        cart.addToCart('a45cfa0a-66d6-4dc7-9475-e2b01595f7d7',3);
        expect(cart.cartItem.length).toEqual(1);

    })
})