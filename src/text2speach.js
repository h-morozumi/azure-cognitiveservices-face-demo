"use strict";

const sdk = require("microsoft-cognitiveservices-speech-sdk");
const { v4: uuid } = require('uuid');
const audioFile = uuid() + ".wav";

// This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
const audioConfig = sdk.AudioConfig.fromAudioFileOutput('output/' + audioFile);

// The language of the voice that speaks.
speechConfig.speechSynthesisLanguage = "ja-JP";
speechConfig.speechSynthesisVoiceName = "ja-JP-NanamiNeural";

const text = `
こんにちは。私の名前は七海です。どうぞよろしくー！
少し自己紹介をさせてください。私は、東京都出身です。
好きな食べ物はリンゴです。好きなスポーツはサッカーです。
好きなアニメは「ワンピース」です。好きなゲームは「ポケモン」です。
`;

exports.speech = async function() {

    // Create the speech synthesizer.
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(text, (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                console.log("synthesis finished.");
            } else {
                console.error("Speech synthesis canceled, " + result.errorDetails + "\nDid you set the speech resource key and region values?");
            }
            synthesizer.close();
            synthesizer = null;
        });
    console.log("Now synthesizing to: " + audioFile);

}
