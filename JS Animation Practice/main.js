const btn_previous = document.getElementById('btn_previous');
const btn_next = document.getElementById('btn_next');
const items = Array.from(document.querySelectorAll('.item'));

const animationConfig = {
    //properties:
    duration    : 1000,         //milliseconds.
    easing      : 'ease',  //the easing function (ease, linear, cubic_bezier(), etc).
    delay   : 0,               //milliseconds
    iterations: 1,
    direction: "normal",
    fill: "forwards",
}

const setKeyframesNext = function(index, gap) {
    
    let keyframes;

    switch (index) {
        case 0:
        case 1: //Lo corro para la derecha
            keyframes = [
                //Keyframes:
                {transform: `translateX(0)`},
                {transform: `translateX(calc(100% + ${gap}px))`},
            ];
            break;
        case 2: //Lo pongo al principio.
            keyframes = [
                //Keyframes:
                {transform: `translateX(0)`                         , opacity: '1'},
                {transform: `translateX(calc(100% + ${gap}px))`     , opacity: '0'},
                {transform: `translateX(calc(-300% - ${3 * gap}px))`, opacity: '0'},
                {transform: `translateX(calc(-200% - ${2 * gap}px))`, opacity: '1'},
            ];
            break;
    }

    return keyframes;
}

const setKeyframesPrevious = function(index, gap) {
    
    let keyframes;

    switch (index) {
        case 0: //Lo pongo al final.
            keyframes = [
                //Keyframes:
                {transform: `translateX(0)`                         , opacity: '1'},
                {transform: `translateX(calc(-100% - ${gap}px))`    , opacity: '0'},
                {transform: `translateX(calc(300% + ${3 * gap}px))` , opacity: '0'},
                {transform: `translateX(calc(200% + ${2 * gap}px))` , opacity: '1'},
            ];
            break;
        case 1:
        case 2: //Lo corro para la izquierda
            keyframes = [
                //Keyframes:
                {transform: `translateX(0)`},
                {transform: `translateX(calc(-100% - ${gap}px))`},
            ];
            break;
    }

    return keyframes;
}

const previousItem = function () {
    firstItem = items.shift();
    items.push(firstItem);
}

const nextItem = function () {
    lastItem = items.pop();
    items.unshift(lastItem);
}

const chkItems = function() {
    items.forEach( (item, index) => {
        //Item 0, order 0; etc.
        item.style.order = index
    })
}

const animationNext = function() {

    console.log('Inicio - ArrayInterno:');
    items.forEach((item, index) => console.log(`[${item.innerHTML}] - ${index}`));
    console.log('-------------');
    
    //En base a el orden de los items en el array, especifico la propiedad order.
    chkItems();
    
    //Hago la animación
    items.forEach( (item, index) => {
        const keyframes = setKeyframesNext(index, 20);
        item.animate(keyframes, animationConfig);
    })
    
    //Cambio los índices dentro de lo que es el array interno (NO CAMBIO LA PROPIEDAD ORDER)
    //Es una forma de actualizar las posiciones de los elementos.
    nextItem();
    
    console.log('-------------');
    console.log('Fin - ArrayInterno:')
    items.forEach((item, index) => console.log(`[${item.innerHTML}] - ${index}`))
    console.log('-------------');
    
}

/*
Lo que hace la animación es dejarme a los elementos posicionados para empezar con el siguiente orden.
Por ejemplo, en el caso de 'animationNext'
AL elemento 0, lo animo para que se posicione como el elemento 1 y al terminar la animación, hago que realmente
se convierta en el elemento 1. Cambio las posiciones del array.
Por lo tanto, en la siguiente animación, haré que este elemento 1, se posicione como si fuera el elemento 2 para luego
efectivamente convertirlo en ese elemento 2 y así sucesivamente. 
*/

const animationPrevious = function() {

    chkItems();

    items.forEach( (item, index) => {
        const keyframes = setKeyframesPrevious(index, 20);
        item.animate(keyframes, animationConfig);
    })
    
    previousItem();
}

btn_previous.addEventListener('click', animationPrevious);
btn_next    .addEventListener('click', animationNext);