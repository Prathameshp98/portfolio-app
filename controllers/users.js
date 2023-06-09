const User = require('../models/User')

exports.getUsers = (req, res, next) => {
    User
        .find()
        .then(users => {
            res.status(200).json({message: 'Users Fetched', users: users})
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500
            }
            next(err)
        }) 
}

exports.createUser = (req, res, next) => {
    
    const name = req.body.name
    const email = req.body.email
    const message = req.body.message

    const newUser = new User({    
        name: name, 
        email: email,
        message: { "message_1": message }

    })

    User
        .findOne({email: email})
        .then(result => {
            if(!result){
                newUser.save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            message: 'Form Submitted',
                            operation: 'User created successfully',
                            data: result
                        })
                    })
                    .catch(err => {
                        if(!err.statusCode){
                            err.statusCode = 500
                        }
                        next(err)
                    })
            } else {

                result.message.map((each, index) => {
                    if(each['message_' + (index+1)] === message){
                        res.status(302).json({ message: 'Duplicate Record', data: result})
                    }
                })

                let key = "message_" + (result.message.length + 1)
                let obj = {}
                obj[key] = message
                const updatedMessages = [...result.message, obj]

                User
                    .findOneAndUpdate({email: email}, {message: updatedMessages}, {returnOriginal: false})
                    .then(result => {
                        res.status(208).json({
                            message: "Form Submitted", 
                            operation: 'User updated successfully',
                            data: result
                        })
                    })
                    .catch(err => {
                        if(!err.statusCode){
                            err.statusCode = 500
                        }
                        next(err)
                    })
            }
           
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500
            }
            next(err)
        }) 
    
    
      
}

exports.getUser = (req, res, next) => {
    const userId = req.params.userId
    User
        .findById(userId)
        .then(user => {
            if(!user) {
                const error = new Error('Could not find user.')
                error.statusCode = 404
                throw error
            }
            res.status(200).json({ message: 'User Fetched', user: user})
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500
            }
            next(err)
        })
}