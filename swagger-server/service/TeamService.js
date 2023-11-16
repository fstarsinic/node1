'use strict';


/**
 * Add a new team
 * Add a new team
 *
 * body Team Create a new team in the league
 * returns team
 **/
exports.addteam = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Downpour",
  "id" : 10
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add a new team
 * Add a new team
 *
 * body Team Create a new team in the league
 * returns team
 **/
exports.addteam = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Downpour",
  "id" : 10
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes a team
 * delete a team
 *
 * teamId Long team id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteteam = function(teamId,api_key) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find team by ID
 * Returns a single team
 *
 * teamId Long ID of team to return
 * returns team
 **/
exports.getTeamById = function(teamId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Downpour",
  "id" : 10
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find team by Name
 * Returns a single team
 *
 * teamName String Name of team to return
 * returns List
 **/
exports.getTeamByName = function(teamName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "Downpour",
  "id" : 10
}, {
  "name" : "Downpour",
  "id" : 10
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find team by ID
 * Returns a single team
 *
 * teamId Long ID of team to return
 * returns team
 **/
exports.getTeamGameData = function(teamId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Downpour",
  "id" : 10
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find team by ID
 * Returns a single team
 *
 * teamId Long ID of team to return
 * returns team
 **/
exports.getteamById = function(teamId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Downpour",
  "id" : 10
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets all teams
 * Gets all teams
 *
 * returns List
 **/
exports.teamGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "Downpour",
  "id" : 10
}, {
  "name" : "Downpour",
  "id" : 10
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing team
 * Update an existing team by Id
 *
 * body Team Update an existent team in the game
 * returns team
 **/
exports.updateteam = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Downpour",
  "id" : 10
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing team
 * Update an existing team by Id
 *
 * body Team Update an existent team in the game
 * returns team
 **/
exports.updateteam = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Downpour",
  "id" : 10
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updates a team in the game with form data
 *
 * teamId Long ID of team that needs to be updated
 * name String Name of team that needs to be updated (optional)
 * status String Status of team that needs to be updated (optional)
 * no response value expected for this operation
 **/
exports.updateteamWithForm = function(teamId,name,status) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * uploads an image
 *
 * body Object  (optional)
 * additionalMetadata String Additional Metadata (optional)
 * teamId Long ID of team to update
 * returns ApiResponse
 **/
exports.uploadFile = function(body,additionalMetadata,teamId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "code" : 0,
  "type" : "type",
  "message" : "message"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

