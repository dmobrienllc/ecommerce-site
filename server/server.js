const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log("MongoURL",db._connectionString);

const sess = {
  secret: 'Dpdi345id983ldiEI$50w',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create(
      {
          mongoUrl: db._connectionString
      })
};

app.use(session(sess));
app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 3001;
db.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
});
