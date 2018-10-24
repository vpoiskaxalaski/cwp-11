let actors = require("../actors.json");
const valid = require("../validA.js");
const fs = require('fs');
const ErrorObject = { code: 400, message: 'Invalid request' };

module.exports.updateActor = function(req, res, payload, cb) {
	if (valid.valid(req.url, payload)) {
	
        let actorID = -1;

		for (let i = 0; i < actors.length; i++)
		{
			if (payload.id === actors[i].id)
			{
				actorID = i;
				if (payload.name !== undefined)
				{
					actors[i].name = payload.name;
				}
				if (payload.birth !== undefined)
				{
					actors[i].birth = payload.birth;
				}
				if (payload.films !== undefined)
				{
					actors[i].films = payload.films;
				}
				if (payload.liked !== undefined)
				{
					actors[i].liked = payload.liked;
				}
				if (payload.photo !== undefined)
				{
					actors[i].photo = payload.photo;
                }			
				break;
			}
		}
		if (actorID < 0)
		{
			cb(ErrorObject);
		}
		
		fs.writeFile("actors1.json", JSON.stringify(actors), "utf8", function () { });
		cb(null, actors[actorID]);
}
	else
	{
		cb(ErrorObject);
	}
}