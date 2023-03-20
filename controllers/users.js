const User = require('../models/User')

exports.getUsers = (req, res, next) => {

}

exports.createUser = (req, res, next) => {
    
    const name = req.body.name
    const email = req.body.email
    const message = req.body.message
    
    const user = new User({    
        name: name, 
        email: email,
        message: message
    })
    user.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'User created successfully',
                post: result
            })
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500
            }
            next(err)
        })   
}

exports.getUser = (req, res, next) => {
    
}