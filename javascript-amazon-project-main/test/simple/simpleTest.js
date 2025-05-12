import {currencyFix, addToCart ,cart} from '../../scripts/cart.js';

//format currency test
console.log('Test Suite : currencyFix ');
console.log('work with normal numbers(convert cents into dollars');
// firts
if(currencyFix(4535)==='45.35'){
    console.log('passed');
}
else{
    console.log('failed');
}
//second
if(currencyFix(2000)==='20.00'){
    console.log('passed');
}
else{
    console.log('failed');
}
//third
if(currencyFix(659874)==='6598.74'){
    console.log('passed');
}
else{
    console.log('failed');
}
//forth
if(currencyFix(659845484174455)==='6598454841744.55'){
    console.log('passed');
}
else{
    console.log('failed');
}
console.log('work with zero(convert cents into dollars');
if(currencyFix(0)==='0.00'){
    console.log('passed');
}
else{
    console.log('failed');
}
console.log('rounding the cents');
if(currencyFix(2000.5)==='20.01'){
    console.log('passed');
}
else{
    console.log('failed');
}

// add to cart test
console.log('Test Suite : addToCart ');
addToCart('ee1f7c56-f977-40a4-9642-12ba5072e2b0',1);
cart.filter((item) => {
    if(item.id==='ee1f7c56-f977-40a4-9642-12ba5072e2b0'){
        return console.log('passed');
    }
});