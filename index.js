const express = require('express');
const app = express();
//films
const readAll = require("./handlers/readAllFilms.js").readAll;
const readFilm = require("./handlers/readFilm.js").readFilm;
const createFilm = require("./handlers/createFilm.js").createFilm;
const updateFilm = require("./handlers/updateFilm.js").updateFilm;
const deleteFilm = require("./handlers/deleteFilm.js").deleteFilm;
//actors
const readAllActors = require("./handlers/readAllActors.js").readAllActors;
const readActor = require("./handlers/readActor.js").readActor;
const createActor = require("./handlers/createActor.js").createActor;
const updateActor = require("./handlers/updateActor.js").updateActor;
const deleteActor = require("./handlers/deleteActor.js").deleteActor;

const images = require('./handlers/getImages');
const logger = require('./log/log');
//films
const childProcess = require('child_process');
let collections = [];

app.get('/api/films/readall', (req, res) =>
{
	console.log("readall");
	readAll(req, res, (err, result) =>
	{
		collections = result;
		res.send(JSON.stringify(result));
	});
});

app.get('/api/films/read/:id', (req, res) =>
{
	console.log("read: " + req.params.id);
	readFilm(req, res, req.params, (err, result) =>
	{
		if (err)
		{
			res.send(JSON.stringify(err));
		}
		else
		{
			res.send(JSON.stringify(result));
		}
	});
});

app.post('/api/films/create', (req, res) => {
	console.log("create");
	parseBodyJson(req, (err, payload) => {
		createFilm(req, res, payload, (err, result, col) =>
		{
			if (err)
			{
				res.send(JSON.stringify(err));
			}
			else
			{
				collections = col;
				res.send(JSON.stringify(result));
			}
		});
	});
});

app.post('/api/films/update', (req, res) => {
	parseBodyJson(req, (err, payload) => {
		updateFilm(req, res, payload, (err, result, col) =>
		{
			if (err)
			{
				res.send(JSON.stringify(err));
			}
			else
			{
				collections = col;
				res.send(JSON.stringify(result));
			}
		});
	});
});

app.post('/api/films/delete', (req, res) => {
	parseBodyJson(req, (err, payload) => {
		deleteFilm(req, res, payload, (err, result, col) =>
		{
			if (err)
			{
				res.send(JSON.stringify(err));
			}
			else
			{
				collections = col;
				res.send(JSON.stringify(result));
			}
		});
	});
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

//actors
app.get('/api/actors/readall', (req, res) =>
{
	console.log("readall");
	logger.log(`${req.url.toString()}\n`);
	readAllActors (req, res, (err, result) =>
	{
		res.send(JSON.stringify(result));
	});
});

app.get('/api/actors/read/:id', (req, res) =>
{
	logger.log(`${req.url.toString()}\n`);
	console.log("read: " + req.params.id);
	readActor(req, res, req.params, (err, result) =>
	{
		if (err)
		{
			res.send(JSON.stringify(err));
		}
		else
		{
			res.send(JSON.stringify(result));
		}
	});
});

app.post('/api/actors/create', (req, res) => {
	logger.log(`${req.url.toString()}\n`);
	console.log("create");
	parseBodyJson(req, (err, payload) => {
		createActor(req, res, payload, (err, result) =>
		{
			if (err)
			{
				res.send(JSON.stringify(err));
			}
			else
			{
				res.send(JSON.stringify(result));
			}
		});
	});
});

app.post('/api/actors/update', (req, res) => {
	logger.log(`${req.url.toString()}\n`);
	parseBodyJson(req, (err, payload) => {
		updateActor(req, res, payload, (err, result) =>
		{
			if (err)
			{
				res.send(JSON.stringify(err));
			}
			else
			{
				res.send(JSON.stringify(result));
			}
		});
	});
});

app.post('/api/actors/delete', (req, res) => {
	logger.log(`${req.url.toString()}\n`);
	parseBodyJson(req, (err, payload) => {
		deleteActor(req, res, payload, (err, result) =>
		{
			if (err)
			{
				res.send(JSON.stringify(err));
			}
			else
			{
				res.send(JSON.stringify(result));
			}
		});
	});
});

app.use('/images/actors', images);
app.use('/api', logger.router);

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
	setInterval(() =>
{
	childProcess.spawn("node", ["log/logger.js", JSON.stringify(collections)]);
}, 60000);
	
});

function parseBodyJson(req, cb) {
	let body = [];

	req.on('data', function(chunk) {
		body.push(chunk);
	}).on('end', function() {
		body = Buffer.concat(body).toString();
		console.log(body);
		if (body !== "")
		{
			let params = JSON.parse(body);
			cb(null, params);
		}
		else
		{
			cb(null, null);
		}
	});
}
