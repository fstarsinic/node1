'use strict';

var utils = require('../utils/writer.js');
var Team = require('../service/TeamService');

module.exports.addteam = function addteam (req, res, next, body) {
  Team.addteam(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addteam = function addteam (req, res, next, body) {
  Team.addteam(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteteam = function deleteteam (req, res, next, teamId, api_key) {
  Team.deleteteam(teamId, api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTeamById = function getTeamById (req, res, next, teamId) {
  Team.getTeamById(teamId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTeamByName = function getTeamByName (req, res, next, teamName) {
  Team.getTeamByName(teamName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTeamGameData = function getTeamGameData (req, res, next, teamId) {
  Team.getTeamGameData(teamId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getteamById = function getteamById (req, res, next, teamId) {
  Team.getteamById(teamId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.teamGET = function teamGET (req, res, next) {
  Team.teamGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateteam = function updateteam (req, res, next, body) {
  Team.updateteam(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateteam = function updateteam (req, res, next, body) {
  Team.updateteam(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateteamWithForm = function updateteamWithForm (req, res, next, teamId, name, status) {
  Team.updateteamWithForm(teamId, name, status)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.uploadFile = function uploadFile (req, res, next, body, additionalMetadata, teamId) {
  Team.uploadFile(body, additionalMetadata, teamId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
