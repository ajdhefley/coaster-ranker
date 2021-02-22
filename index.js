const express = require('express');
const winston = require('winston');
const requestPromise = require('request-promise');
const $ = require('cheerio');
const _ = require('underscore');

const PORT = 4200;
const LOGGER = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'stdout.log' })
    ]
});

let app = express();

app.use(express.static(`${__dirname}/client/dist`));

app.get('/rcdb/results/:input', (req, res) => {
    requestPromise(`https://rcdb.com/qs.htm?qs=${req.params.input}`)
        .then((html) => {
            let results = [];
            let promises = [];

            $('section', html).each((index, section) => {
                $(section).find('p').each((index, element) => {
                    let $links = $(element).find('a');
                    let $coasterLink = $($links[0]);
                    let $parkLink = $($links[1]);
                    let id = $coasterLink.attr('href').replace('/', '').replace('.htm', '');

                    let location = '';
                    for (let i = 2; i < $links.length; i++) {
                        location += $($links[i]).text();
                        if (i < $links.length - 1)
                            location += ', ';
                    }

                    promises.push(
                        requestPromise(`https://rcdb.com/${id}.htm`)
                            .then((html) => {
                                let imgSubUrl = $('#opfAnchor', html).attr('data-url');
                                let imgUrl = imgSubUrl ? 'https://rcdb.com' + imgSubUrl : null;

                                results.push({
                                    id: id,
                                    name: $coasterLink.text(),
                                    parkName: $parkLink.text(),
                                    location: location,
                                    imgUrl: imgUrl,
                                    avgRating: parseFloat(Math.random() * 9.9).toFixed(1),
                                    defunct: !html.includes('Operating</a> since')
                                });
                            })
                            .catch((err) => {
                                LOGGER.error(err);
                                res.send(err);
                                res.status(500);
                            })
                    );
                });
            });

            Promise.allSettled(promises).then(() => {
                // Remove duplicates.
                results = _.unique(results, false, (result) => result.id);

                // Remove models and elements and show only specific coasters.
                results = results.filter((result) => {
                    return result.parkName != '' && result.parkName != 'All Models';
                });

                // Remove coasters without an image.
                results = results.filter((result) => {
                    return result.imgUrl != null;
                });

                // Remove defunct coasters.
                results = results.filter((result) => {
                    return !result.defunct;
                });

                // Sort by average rating.
                results.sort((a, b) => {
                    if (a.avgRating < b.avgRating)
                        return 1;
                    if (a.avgRating > b.avgRating)
                        return -1;
                    else
                        return 0;
                });

                // Sort alphabetically.
                //results.sort((a, b) => a.name.localeCompare(b.name));

                res.json(results);
            });
        })
        .catch((err) => {
            LOGGER.error(err);
            res.send(err);
            res.status(500);
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
            LOGGER.error(err);
            res.send(err);
            res.status(500);
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

app.listen(PORT);

LOGGER.info(`Listening on port ${PORT}...`);