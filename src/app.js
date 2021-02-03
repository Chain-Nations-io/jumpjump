'use strict';

import "bootstrap/dist/css/bootstrap.min.css";
import { currentState } from './states/state';
import { statesObject } from './contants/statesObject';
// import { Stats } from 'stats.js';

// var stats = new Stats();
// stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild( stats.dom );

// // function animate() {

// // 	stats.begin();

// // 	// monitored code goes here

// // 	stats.end();

// // 	requestAnimationFrame( animate );

// // }

// // requestAnimationFrame( animate );

currentState(statesObject.gamemode1);