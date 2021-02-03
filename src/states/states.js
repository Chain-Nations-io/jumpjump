'use strict';

import { menu } from '../menu/menu';
import { loader } from '../loader/loader';
import { gamemode1, winTimeGm1, failTimeGm1} from '../routers/gamemode1/export';

const states = {
    menu,
    loader,
    gamemode1,
    winTimeGm1,
    failTimeGm1
};

export{
    states
};