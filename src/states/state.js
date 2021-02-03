'use strict';

import { states } from './states';
import { statesObject } from '../contants/statesObject';

const currentState = (state) => {
    const content = document.querySelector('#root');
    content.innerHTML = '';

    console.log(state);

    if(state === statesObject.menu) content.appendChild(states.menu());
    if(state === statesObject.loader) content.appendChild(states.loader());
    if(state === statesObject.gamemode1) content.appendChild(states.gamemode1());
    if(state === statesObject.winTimeGm1) content.appendChild(states.winTimeGm1());
    if(state === statesObject.failTimeGm1) content.appendChild(states.failTimeGm1());

};

export {
    currentState
};