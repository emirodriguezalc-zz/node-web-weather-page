const request = require('request');
const chalk = require('chalk');

const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/876cd88106a13df6f0a54dc9527f8663/' + lat + ',' + long + '?units=si&lang=es';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('error1', undefined)
    } else if (body.error) {
      callback('error2', undefined)
    } else {
      callback(undefined, {
        temp: body.currently.temperature,
        rainProb: body.currently.precipProbability,
      })
    }
  })
}

module.exports = forecast;
