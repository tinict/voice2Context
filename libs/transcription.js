"use strict";

import Replicate from "replicate";
import 'dotenv/config';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export const transcription = async (audioUrl) => {
    try {
        const output = await replicate.run(
            "soykertje/whisper:20de0792d38812ce94a0ba8e699b3416cbdc75486ed660db12deeb1b28f35bb6",
            {
                input: {
                    audio: audioUrl,
                    model: "large-v2",
                    language: "af",
                    translate: false,
                    temperature: 0,
                    transcription: "plain text",
                    suppress_tokens: "-1",
                    word_timestamps: true,
                    logprob_threshold: -1,
                    no_speech_threshold: 0.6,
                    condition_on_previous_text: true,
                    compression_ratio_threshold: 2.4,
                    temperature_increment_on_fallback: 0.2
                }
            }
        );
        
        console.log(output);

        return output;
    } catch (err) {
        console.error(err);
    }
};