const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const helpers = require('./utils/helper')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  app.use(session(sess));

  const hbs = exphbs.create({ helpers });

  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/assets',express.static(path.join(__dirname, '/public/assets')))
  app.use(routes);
  
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });