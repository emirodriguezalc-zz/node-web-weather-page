const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)
app.use(cors());

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
  res.render('index',
    {
      title: 'Index',
      name: 'Emilia Rodriguez Gimenez'
    })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Emilia Rodriguez Gimenez'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Emilia Rodriguez Gimenez'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Adress must be provided'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    error ? res.send({ error }) : forecast(latitude, longitude, (error, { temp, rainProb, realFeel } = {}) => {
      error ? res.send({ error }) : res.send({
        temp,
        rainProb,
        realFeel,
        location,
        address: req.query.address
      })
    });
  });
})

app.get('/help/*', (req, res) => {
  res.render('notFound', {
    title: '404 page',
    name: 'Emi',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('notFound', {
    title: '404 page',
    name: 'Emi',
    errorMessage: 'not Found'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
