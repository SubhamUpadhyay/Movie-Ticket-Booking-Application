const {body,validationResult} = require("express-validator");

const validateMovie = [
    body('name').trim().isLength({min:1,max:200}).withMessage("Movie name must be between 1-200 characters"),
    body('description').trim().isLength({min:10,max:1000}).withMessage("Description must be between 10-1000 characters"),
    body('casts').isArray({min:1}).withMessage("At least one cast member requried"),
    body('trailerUrl').isURL().withMessage("Valid trailer URL required"),
    body('language').isArray({min:1}).withMessage("At least one language required"),
    body('releaseDate').isISO8601().withMessage('valid date required (YYYY-MM-DD)'),
    body('director').trim().isLength({min:2,max:100}).withMessage("Director must be between 2-100 characters"),
    body('releasedStatus').isIn(['RELEASED',"UPCOMING","CANCELLED"]).withMessage('Status must be either RELEASED or UPCOMING or CANCELLED'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()});
        }
        next();
    }

];
module.exports = {validateMovie};