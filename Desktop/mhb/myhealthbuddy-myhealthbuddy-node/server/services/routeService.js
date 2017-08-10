const apiService = require('services/apiService'),
    apiConfig = require('config/apiConfig'),
    logger = require('services/loggerService'),
    staticSiteController = require('controllers/staticSiteController');

module.exports = function(app) {
  staticSiteController( app );
};
