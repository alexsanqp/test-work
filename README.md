# Angular gallery example with a server side rendering

[Demo](https://enkonix.pro-beauty.com.ua)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build with ssr

Run `npm run build:ssr`

## Server ssr

Create file `.env`

```txt
NODE_ENV=dev
PORT=443
SSL_KEY=./localssl/server.key
SSL_CERT=./localssl/server.pem
```

Run `npm run serve:ssr` and Navigate to `{protocol}://localhost:{port}/`

