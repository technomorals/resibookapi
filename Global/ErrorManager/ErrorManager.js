const bodyParser = require('body-parser');
var ErrorModel = require('..//..//Model/ErrorModel.js')
class ErrorManager {
    constructor() {

    }

    async save(req, error, res){
        return new Promise(function(resolve, reject){
            // var _model = ErrorModel({
            //     req : req.url,
            //     body : JSON.stringify(req.body ?? {}),
            //     error : error.message ?? ''
            // }).save(req)
            return resolve({
                status : false,
                error : error.message ?? ''
            });
        })
    }

}

module.exports = new ErrorManager();
