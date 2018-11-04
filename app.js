/**
 * Głowny plik gdzie zaczyna się całe API znajdują się:
 * impoty, routery, kontrolery
 */

/** importy bibliotek */

const express = require('express');
const bodyParser = require('body-parser');

/** ustawienia dla aplikacji */
const app = express();

/** ustwaienie formatu application/json */
app.use(bodyParser.json());

/** ustawienie headerow pod CORS
 *  bardzo ważnych dla dzialania API */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

/** ustawienie routingu */
const authRoutes = require('./routes/authorisation');
/** ustawienie routingu /auth dla authRoutes */
app.use('/auth', authRoutes);


app.listen(8080);