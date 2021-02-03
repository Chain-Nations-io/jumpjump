'use strict';

// import WIN from '../../views/win.html';
// import FAIL from '../../views/fail.html';
import { game, win, fail} from './functions';

const gamemode1 = () => {
    const divElement = document.createElement('div');
    // divElement.innerHTML += `<div class='info-text score_map_1'></div>`;
    // divElement.innerHTML += `<div class='countdown-container'></div`;
    divElement.innerHTML += `<div id='gamemode1'></div>`;  
    game();
    return divElement;
}

const winTimeGm1 = () => {
    const divElement = document.createElement('div');
    // divElement.innerHTML = WIN;
    win(divElement);
    return divElement;
}

const failTimeGm1 = () => {
    const divElement = document.createElement('div');
    // divElement.innerHTML = FAIL;
    fail(divElement);
    return divElement;
}

export {
    gamemode1,
    winTimeGm1,
    failTimeGm1
}