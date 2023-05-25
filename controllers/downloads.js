const Stat = require('../models/Stat')

exports.getResume = (req, res, next) => {
    const file = `./data/prathamesh_patil_resume.pdf`
    res.download(file)

    Stat
        .find()
        .then(stats => {
            const newDownload = new Stat({
                resume_downloaded: true
            })

            newDownload.save()
                .then(result => {
                    res.status(201).json({
                        message: 'Resume Downloaded',
                        data: result
                    })
                })
                .catch(err => {
                    if(!err.statusCode){
                        err.statusCode = 500
                    }
                    next(err)
                })
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500
            }
            next(err)
        }) 
}