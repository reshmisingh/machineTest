'use strict';
const Model = require('objection').Model;
const validator = require('validator');
const Users = require('./users');

class UserData extends Model {

    static get tableName() {
      return 'users_data';
    }
  
    static get jsonSchema() {
      return {
        type: 'object',
        required: [], 
  
        properties: {
          id: { type: 'integer' },
        }
      }
    }
  
    static get relationMappings() {
     
      return {
        UsersDataget: {
          relation: Model.HasManyRelation,
          modelClass: Users,
          join: {
            from: 'users_data.user_id',
            to: 'users.id'
          }
        },
       

      
      }
    }
  }

module.exports = UserData;
