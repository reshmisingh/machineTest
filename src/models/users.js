'use strict';
const Model = require('objection').Model;
const validator = require('validator');
const ValidationError = require('objection').ValidationError;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsersData = require('./userData');

class User extends Model {

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        id: { type: 'integer' },
        // name: { type: 'string', minLength: 2, maxLength: 255 },
        // email: { type: 'string', minLength: 1, maxLength: 255 },
        // phoneNo: { type: 'string', minLength: 10, maxLength: 15 },
        // deviceType: { type: 'string', minLength: 1, maxLength: 255 },
        // deviceToken: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  static get relationMappings() {
    return {
    }
  }
 
  async $beforeInsert() {
    await super.$beforeInsert();
    console.log('in before insert');
  if(this.email!='' && this.email!=undefined){
    let result = await this.constructor.query().skipUndefined().select('id').where('email', this.email)
      .first();
    if (result) {
      console.log('should be come here')
      throw new ValidationError({
        message: "Account with this email already exists!",
        type: "ModelValidation",
        data: {
          status: "error",
          code: 406,
          message: "Account already exists with this email!"
        }
      });
    }
  }
   
    this.password ? this.password = await bcrypt.hash(this.password, 10) : null;
  }

  async comparePassword(password) {
    if (!password) {
      return false;
    }
    let pass = await bcrypt.compare(password, this.password);
    return pass;
  }

  async getJWT() {
    return await jwt.sign({
      userId: this.id
    }, CONFIG.jwt_encryption);
  }

  static get relationMappings() {
     
    return {
      UsersData: {
        relation: Model.HasManyRelation,
        modelClass: UsersData,
        join: {
          from: 'users.id',
          to: 'users_data.user_id'
        }
      },
     

    
    }
  }
 
}

module.exports = User;
