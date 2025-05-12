import {addToCart, cart, currencyFix} from '../../scripts/cart.js';

describe('Test Suite : CurrencyFix',()=>{
    it('works with normal numbers(convert cents into dollar)',()=>{
        expect(currencyFix(4554)).toEqual('45.54');
    })
    it('works with 0',()=>{
        expect(currencyFix(0)).toEqual('0.00');
    })
    it('rounding numbers',()=>{
        expect(currencyFix(5000.4)).toEqual('50.00');
        expect(currencyFix(2000.5)).toEqual('20.01');
    })
})
describe('Test Suite : addToCart',()=>{
    it('add new product to the cart',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        })
        addToCart('a45cfa0a-66d6-4dc7-9475-e2b01595f7d7',1);
        expect(cart.length).toEqual(1);
    })
    it('add existing item to the cart',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        })
        addToCart('a45cfa0a-66d6-4dc7-9475-e2b01595f7d7',1);
        addToCart('a45cfa0a-66d6-4dc7-9475-e2b01595f7d7',2);
        addToCart('a45cfa0a-66d6-4dc7-9475-e2b01595f7d7',3);
        expect(cart.length).toEqual(1);

    })
})