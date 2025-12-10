import db from './db.js';
const TABLE_NAME = 'users';

export default {
  // Lấy tất cả users
  all: async () => await db(TABLE_NAME).select('*'),

  // Tìm user theo ID
  oneById: async (id) => await db(TABLE_NAME).select('*').where({ id }).first(),

  // Tìm user theo Username (dùng cho đăng nhập)
  oneByUsername: async (username) => await db(TABLE_NAME).select('*').where({ username }).first(),

  // Thêm user mới (dùng cho đăng ký)
  add: async (newUser) => {
    const [id] = await db(TABLE_NAME).insert(newUser).returning('id');
    return id;
  }
};