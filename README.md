Manufacturing Bureau
====================

Inside the root folder, run:

To install module dependencies:

```
npm install
```

To install front-end dependencies:

```
./node_modules/.bin/bower install
```

To build application:

```
./node_modules/.bin/gulp sass
```

To serve app folder at [http://localhost:8120/](http://localhost:8120/)

```
node admin-app-server-http.js
```

Alternatively, you can use another web server to serve the `/app` folder. Build step above puts all the necessary files to run a standalone SPA.
