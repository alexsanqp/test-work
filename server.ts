import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
import * as fs from 'fs';
import * as https from 'https';
import * as express from 'express';
import { join } from 'path';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

enableProdMode();

const app         = express();
const PORT        = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

const credentials = {
    key               : null,
    cert              : null,
    ca                : null,
    requestCert       : false,
    rejectUnauthorized: false,
};

if (process.env.NODE_ENV === 'production') {
    credentials.key  = fs.readFileSync('/etc/letsencrypt/live/pro-beauty.com.ua/privkey.pem',
        'utf8'
    );
    credentials.cert = fs.readFileSync('/etc/letsencrypt/live/pro-beauty.com.ua/cert.pem',
        'utf8'
    );
    credentials.ca   = fs.readFileSync('/etc/letsencrypt/live/pro-beauty.com.ua/chain.pem',
        'utf8'
    );
}

const httpsServer = https.createServer(credentials, app);

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP),
    ],
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.get('/api/*', (req, res) => {
    res.status(404).send('data requests are not supported');
});
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));
app.get('*', (req, res) => {
    res.render('index', {req});
});

httpsServer.listen(PORT, () => {
    console.log(`Node server listening on ${PORT}`);
});

app.listen(4001, () => {
    console.log(`Node server listening on 4001`);
});