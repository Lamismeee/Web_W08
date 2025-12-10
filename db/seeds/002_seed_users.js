import bcrypt from 'bcryptjs';

const users = [
  {
    username: "un01",
    name: 'Nguyễn Huỳnh Chí Lâm',
    email: 'lamisme@example.com',
    password: bcrypt.hashSync('123', 10)
  },
  {
    username: 'un02',
    name: 'Rocks D. Xebec',
    email: 'rocks@example.com',
    password: bcrypt.hashSync('123', 10)
  }
];

export async function seed(knex) {
  await knex.transaction(async (trx) => {
    await trx('users').del();
    await trx('users').insert(users);
  });
}