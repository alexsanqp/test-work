import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
import * as fs from 'fs';
import * as https from 'https';
import * as express from 'express';
import * as path from 'path';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

require('dotenv').config();

enableProdMode();

const app         = express();
const PORT        = process.env.PORT || 4000;
const DIST_FOLDER = path.join(process.cwd(), 'dist');

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

const credentials = {
    key               : process.env.SSL_KEY ? fs.readFileSync(process.env.SSL_KEY, 'utf8') : null,
    cert              : process.env.SSL_CERT ? fs.readFileSync(process.env.SSL_CERT, 'utf8') : null,
    ca                : process.env.SSL_CA ? fs.readFileSync(process.env.SSL_CA, 'utf8') : null,
    requestCert       : false,
    rejectUnauthorized: false,
};

const httpsServer = https.createServer(credentials, app);

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP),
    ],
}));

app.set('view engine', 'html');
app.set('views', path.join(DIST_FOLDER, 'browser'));

app.get('*.*', express.static(path.join(DIST_FOLDER, 'browser')));
app.get('*', (req, res) => {
    res.render('index', {req});
});

httpsServer.listen(<number>PORT, () => {
    console.log(`Listening on ${PORT} | ${process.env.NODE_ENV}`);
});
