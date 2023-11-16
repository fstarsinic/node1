'use strict';


/**
 * Create player
 * This can only be done by the logged in player.
 *
 * body Player Created player object (optional)
 * returns player
 **/
exports.createplayer = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "John",
  "lastName" : "James",
  "player_number" : "12",
  "name" : "theplayer",
  "id" : 10,
  "team_id" : 3,
  "captain" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create player
 * This can only be done by the logged in player.
 *
 * body Player Created player object (optional)
 * returns player
 **/
exports.createplayer = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "John",
  "lastName" : "James",
  "player_number" : "12",
  "name" : "theplayer",
  "id" : 10,
  "team_id" : 3,
  "captain" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Creates list of players with given input array
 * Creates list of players with given input array
 *
 * body List  (optional)
 * returns player
 **/
exports.createplayersWithListInput = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "John",
  "lastName" : "James",
  "player_number" : "12",
  "name" : "theplayer",
  "id" : 10,
  "team_id" : 3,
  "captain" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete player
 * This can only be done by the logged in player.
 *
 * id String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteplayer = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get player by player id
 *
 * id String The id that needs to be fetched. Use 1 for testing. 
 * returns player
 **/
exports.get_player_by_id = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "John",
  "lastName" : "James",
  "player_number" : "12",
  "name" : "theplayer",
  "id" : 10,
  "team_id" : 3,
  "captain" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs player into the system
 *
 * playername String The player name for login (optional)
 * password String The password for login in clear text (optional)
 * returns String
 **/
exports.loginplayer = function(playername,password) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs out current logged in player session
 *
 * no response value expected for this operation
 **/
exports.logoutplayer = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Gets all players
 *
 * returns player
 **/
exports.playerGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "John",
  "lastName" : "James",
  "player_number" : "12",
  "name" : "theplayer",
  "id" : 10,
  "team_id" : 3,
  "captain" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update player
 * This can only be done by the logged in player.
 *
 * body Player Update an existent player in the game (optional)
 * id String name that need to be deleted
 * no response value expected for this operation
 **/
exports.updateplayer = function(body,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update player
 * This can only be done by the logged in player.
 *
 * body Player Update an existent player in the game (optional)
 * id String name that need to be deleted
 * no response value expected for this operation
 **/
exports.updateplayer = function(body,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

