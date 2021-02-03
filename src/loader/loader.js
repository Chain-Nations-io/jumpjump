'use strict';

const loader = () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = `loader`
    return divElement;
};

export {
    loader
};