let actors = require("../actors.json");
const valid = require("../validA.js");
const fs = require('fs');
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.createActor = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload)) {

    let idAct;
		actors.forEach((actor) => {
			idAct = actor.id;
        });
        payload.id = ++idAct;

		actors.push(payload);

		fs.writeFile("actors1.json", JSON.stringify(actors), "utf8", function () {});
		cb(null, payload);
	}
	else
	{
		cb(ErrorObject);
	}
};