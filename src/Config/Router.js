const api = require('../Api/Aplication');

module.exports = function (router) {
    router.get('/authentication', api.authentication)
    
    router.get('/authorizationService' , api.authorizationService)
}