//const User = require('../../models/users');
const validator = require('validator');
require('../../global_functions');
require('../../constant/global_constants');
const bcrypt = require('bcrypt');
const randam = require('../../utils/random');
const User = require('../../models/users');
const services = require('../../services/usercheck');
const UsersData = require('../../models/userData');
const { options } = require('../../routes/user');
//const EMAIL = require('./../../middlewares/email');


/**
 * Signup - singnUp Only user with phone number or
 * @params req.body;
 * @return promise
 */
 const signup = async (req, res) => {
    console.log("User side signup")
    let data = req.body;
    if (!data.name) {
        return badRequestError(res, "", "Please enter name");
    }

    let err, inserted_user;
    let checkPhoneExists = await services.checkSignupValidation(data,res);
    
        [err, inserted_user] = await to(User.query().insert(data).returning('*'));
        if (err) {
            return badRequestError(res, "", err.message);
        }
    
    res.setHeader('Content-Type', 'application/json');
    let response = {

        'id': inserted_user.id,
   
    }
    return okResponse(res, response, Message("Users register"));
}


/**
 * loginUser
 * @params req.body;
 * @return promise
 */

 const loginUser = async (req, res) => {
    let data = req.body;
    console.log('login user api');

    if (!data.password) {
        return badRequestError(res, "", Message("passwordRequired"));
    }
    
  let userData = await services.checkValidation(data,res)
   // console.log(userData);
    if(userData.auth_token){ 
    //set header auth 
    res.setHeader('Authorization', userData.auth_token);
    res.setHeader('access-control-expose-headers', 'authorization');

    //generate auth_token
    const updateToken = await User.query().skipUndefined().patchAndFetchById(userData.id, {
        token: userData.auth_token
    });
    //  console.log("devicetype" + JSON.stringify(devicetype));
    res.setHeader('Authorization', userData.auth_token);
    res.setHeader('access-control-expose-headers', 'authorization');
    
    let user = await User.query().select("id", "name", "email").where('email', data.email).first();
     delete user.token;
    return okResponse(res, user, "Login successfully !");
 }
}

const CompleteProfile = async (req, res) => {
  console.log(req.user,"djfg");
    let data = req.body;
    let id = parseInt(req.user.id)
    data.user_id = id
    console.log(data);

    //console.log(data, 'data'); return;
    let UsersUpdated = await UsersData.query().insertGraph(data).returning("id");

    if (!UsersUpdated) {
        return badRequestError(res, '', Message("someError"));
    }

    return okResponse(res, "", Message("Profile Complete Successfully"));
}

const updateProfile = async (req, res) => {
    console.log(req.user,"djfg");
      let data = req.body;
      let id = parseInt(data.id)
      data.id = id
      console.log(data);
  
      //console.log(data, 'data'); return;
      let UsersUpdated = await UsersData.query().upsertGraph(data).returning("id");
  
      if (!UsersUpdated) {
          return badRequestError(res, '', Message("someError"));
      }
  
      return okResponse(res, "", Message("ProfileUpdateSuccessfully"));
  }

  const getProfile = async (req, res) => {
    let [err, userData] = await to(User.query().select("name", "email")
    .where('id',req.user.id)
    .eager("[UsersData]")
    .modifyEager('UsersData', builder => {
        builder.select()
    }));
    if (!userData) {
        return errorResponse(res, "", Message("UserNotFond"));
    }
    if (err) {

        return badRequestError(res, "", Message("UserNotFond"))
    }
   
    return okResponse(res, userData, Message("UserData"));
  }



module.exports = {
    signup,
    loginUser,
    CompleteProfile,
    updateProfile,
    getProfile,
};