import Audio2TextJS from 'audio2textjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const testSpeechToText = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const converter = new Audio2TextJS({
        outputJson: true,
        outputTxt: true
    });

    const inputFile = path.join(__dirname, '../src/storage/7b622fa2-296f-4856-8ac2-9ddf21c83445.mp3');
    const model = 'small'; 
    const language = 'auto';

    try {
        console.log(inputFile);
        const result = await converter.runWhisper(inputFile, model, language);
        console.log(result);
        if (result.success) return console.log('Whisper process result:', result.message);
    } catch (error) {
        console.error('Error running Whisper:', error);
    }
};