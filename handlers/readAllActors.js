let actors = require("../actors.json");
const fs = require('fs');

let compareField = "liked";
let compareOrder = "desc";

function compareCustom(a, b) {
	if (a[compareField] > b[compareField])
	{
		return compareOrder === "asc" ? 1 : -1;
	}
	if (a[compareField] < b[compareField])
	{
		return compareOrder === "asc" ? -1 : 1;
	}
}

module.exports.readAllActors = function(req, res, cb) {
	actors.sort(compareCustom);
	cb(null, actors);
};