// const Token = require('../models/Token');

const validator = require('validator');
require('../global_functions');
require('../../src/constant/global_constants');
const bcrypt = require('bcrypt');
const randam = require('../utils/random');
const User = require('../models/users');
const jwt = require('jsonwebtoken');


/**
 * 
 * @param {*checksignupvalidation for signup} req 
 * @param {*} res 
 * @returns 
 */

 const checkSignupValidation = async (req, res) => {
    data = req;
   // console.log(data); 
    let user;
    let err, inserted_user;
        user = await checkEmail(data,res); 

      
        let checkEmailExists = await User.query().select('id').where('email', data.email).first();
         if(checkEmailExists){
            if(checkEmailExists.isEmailVerified==1){
                return badRequestError(res, "", Message('accountEmailExists'));
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
            data.id = checkEmailExists.id;

            [err, inserted_user] = await to(User.query().upsertGraph(data).returning('*'));
            if (err) {
            return badRequestError(res, "", err.message);
            }
        }

  //  console.log(user,'verified');
       return user;
    
}

/**
 * 
 * @param {*checkvalidation for login common} req 
 * @param {*} res 
 * @returns 
 */

 const checkValidation = async (req, res) => {
    data = req;
   // console.log('data'); 
    let user;
    if(data.email!='' && data.email!=undefined){
        user = await checkEmail(data,res); 
        if (!user) {
            return badRequestError(res, "", Message("emailNotExist"));
        }
    }
    //console.log(user);
   
    if(data.password){
    var com = await comparePassword(data.password,user.password,res)
    }
    if(com==true){ 
     user['auth_token'] = await getJWT(user.id);
     }
     return user;
    
}

/**
 * 
 * @param {*loginwithemail} req 
 * @param {*} res 
 * @returns 
 */
const checkEmail = async (req, res) => {
        data = req;
       // console.log('emaildata');
        
        if (!data.email) {

            return badRequestError(res, "", Message('emailRequired'));
        }

         //User Data fatch
         let user = await User.query().where('email', data.email).first();
         return user;
}

/**
 * 
 * @param {*checkPhone} req 
 * @param {*} res 
 * @returns 
 */


/**
 * 
 * @param {*comparepassword} req 
 * @param {*} res 
 * @returns 
 */

const comparePassword = async (newpassword, oldpassword,res) => {
    console.log('comparepassword');
    // Password compare
    let pass = await bcrypt.compare(newpassword, oldpassword);
    //console.log('pass',pass);
    if (pass==false) {
      //  console.log(pass);
        return badRequestError(res, "", Message("invalidPassword"));
    }
    return true;
}

/**
 * 
 * @param {*getjwt} req 
 * @param {*} res 
 * @returns 
 */

 const getJWT = async (req,res) => {
    console.log('getjwt');
    // Password compare
    return await jwt.sign({
        userId: req
      }, CONFIG.jwt_encryption);
   
}


module.exports = {
    checkValidation,
    checkSignupValidation,

   
}