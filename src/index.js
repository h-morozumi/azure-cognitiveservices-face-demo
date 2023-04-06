'use strict';

require('./common.js');
const faceApi = require('./faceapi.js');
const speech = require('./text2speach.js');

const args = process.argv;
if(args.length < 3) {
    console.log("Please specify the mode. (faceapi or speech)");
    return;
}
const mode = args[2];
if(mode == "face") {
    faceApi.main();
} else if(mode == "speech") {
    speech.speech();
} else {
    console.log("Please specify the mode. (faceapi or speech)");
    return;
}

