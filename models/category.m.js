import db from './db.js';
const TABLE_NAME = 'categories';

export default {
 
  all: async () => {
    return await db(TABLE_NAME).select('*');
  },
  
  
};