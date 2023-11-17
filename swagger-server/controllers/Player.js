'use strict';

var utils = require('../utils/writer.js');
var Player = require('../service/PlayerService');

module.exports.createplayer = function createplayer (req, res, next, body) {
  Player.createplayer(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createplayer = function createplayer (req, res, next, body) {
  Player.createplayer(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createplayersWithListInput = function createplayersWithListInput (req, res, next, body) {
  Player.createplayersWithListInput(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteplayer = function deleteplayer (req, res, next, id) {
  Player.deleteplayer(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_player_by_id = function get_player_by_id (req, res, next, id) {
  Player.get_player_by_id(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.loginplayer = function loginplayer (req, res, next, playername, password) {
  Player.loginplayer(playername, password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logoutplayer = function logoutplayer (req, res, next) {
  Player.logoutplayer()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.playerGET = function playerGET (req, res, next) {
  Player.playerGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateplayer = function updateplayer (req, res, next, body, id) {
  Player.updateplayer(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateplayer = function updateplayer (req, res, next, body, id) {
  Player.updateplayer(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
