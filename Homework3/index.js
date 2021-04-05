const Express = require('express');

const Middlewares = require('./middleware');

const Router = require('./routers/routing');

const App = Express();

App.use(Express.json());

App.use(Middlewares.blockDeleteMethod);

App.use(Middlewares.dateValidator);

App.use(Middlewares.logRequest);

App.all('/', Router.All);

App.use(Middlewares.errorHandler);

App.listen(process.env.LISTEN_PORT || 8080);
