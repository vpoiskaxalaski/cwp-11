let actors = require("../actors.json");
const valid = require("../validA.js");
const fs = require('fs');
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.deleteActor = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload))
	{
		let newActors = [];
		let head = [];
		let tail = [];
		let a;
		let flag = false;

		for (let i = 0; i < actors.length; i++)
		{
			if (actors[i].id === payload.id)
			{
				
				a=actors[i];
				flag = true;
				for (let j = i+1; j < actors.length; j++)
				{
					actors[j].id -= 1;
					tail.push(actors[j]);
				}
				break;
			}
			head.push(actors[i]);
		}
		if (flag) {
			newActors = head.concat(tail);
			cb(null, a);
			fs.writeFile("actors1.json", JSON.stringify(newActors), "utf8", () => {});
        }
        
		else
		{
			cb(ErrorObject);
		}
	}
	else
	{
		cb(ErrorObject);
	}
}
