'use strict';

var utils = require('../utils/writer.js');
var Upload = require('../service/UploadService');

module.exports.upload = function upload (req, res, next, additionalMetadata) {
  Upload.upload(additionalMetadata)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
