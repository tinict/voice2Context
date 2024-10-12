import express from "express";
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import { testSpeechToText } from "../../../libs/audio2TextJS.js";
import 'dotenv/config';

export const bootstrap = async () => {
    const port = process.env.port;

    const app = express();

    app.use(express.json());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(session({
        secret: "secret",
        saveUninitialized: false,
        resave: false
    }))

    app.use(cors());

    app.use(compression());

    app.use(
        helmet({
            crossOriginEmbedderPolicy: false,
            crossOriginResourcePolicy: false,
        })
    );

    app.use(morgan('dev'));

    const server = http.createServer(app);

    app.get('/', async (req, res) => {
        try {
            testSpeechToText();

            res.send('Hello world!')
        } catch (err) {
            console.error(err);
        }
    })

    server.listen(
        port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        }
    );
};
