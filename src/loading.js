const $ = require ("../node_modules/jquery");

const displayMessage = () => $("h1").html("Loading...");

module.exports = {displayMessage};