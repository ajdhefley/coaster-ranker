const express = require('express');
const requestPromise = require('request-promise');
const $ = require('cheerio');
const _ = require('underscore');

let app = express();

app.use(express.static(`${__dirname}/client/dist`));

app.get('/rcdb/results/:input', (req, res) => {
    requestPromise(`https://rcdb.com/qs.htm?qs=${req.params.input}`)
        .then((html) => {
            let results = [];

            $('section', html).each((index, section) => {
                $(section).find('p').each((index, element) => {
                    let $coasterLink = $($(element).find('a')[0]);
                    let $parkLink = $($(element).find('a')[1]);
                    let id = $coasterLink.attr('href').replace('/', '').replace('.htm', '');
                    results.push({ id: id, name: $coasterLink.text(), parkName: $parkLink.text() });
                });
            });

            results = _.unique(results, false, (result) => result.id);
            
            res.json(results);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

app.get('/rcdb/details/:id', (req, res) => {
    requestPromise(`https://rcdb.com/${req.params.id}.htm`)
        .then((html) => {
            let arrangementStr = $('section:nth-child(4) > table.stat-tbl > tbody > tr > td', html);
            let carCount = arrangementStr.charAt(arrangementStr.indexOf(' cars per train') - 1);
            let seatCount = arrangementStr.charAt(arrangementStr.indexOf('Riders are arranged ') + 1);
            let rowCount = arrangementStr.charAt(arrangementStr.indexOf(' rows for a total') - 1);
            res.end();
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/client/dist/index.html`);
});

app.get('/search', (req, res) => {
    res.sendFile(`${__dirname}/client/dist/index.html`);
});

app.get('/coaster', (req, res) => {
    res.sendFile(`${__dirname}/client/dist/index.html`);
});

app.listen(4200);