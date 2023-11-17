'use strict';


/**
 * uploads a file
 * uploads a file. Will be expanded later.
 *
 * additionalMetadata String Additional Metadata (optional)
 * returns ApiResponse
 **/
exports.upload = function(additionalMetadata) {
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

