exports.success = function (req, res, statusCode=200, message=''){
    
    res.status(statusCode).send({
        error:false,
        statusCode,
        body:message
    })
}

exports.error = function (req, res, statusCode=500, message='Internal Error!'){

    res.status(statusCode).send({
        error:true,
        statusCode,
        body:message
    })
}