Project skeleton created for BTTH_Tuan07

Structure:
- assets/imgs: product images (p1.png, p2.png placeholders)
- controllers: controller placeholders
- db/migrations: migration file
- db/seeds: seed file
- models: model placeholders and DB wrapper
- routers: express routers
- views: handlebars layouts, partials, and product views

How to try:
1. npm install
2. npx knex migrate:latest --knexfile knexfile.js
3. npx knex seed:run --knexfile knexfile.js
4. npm start

(You may need to install knex CLI globally or use npx. The package.json lists recommended dependencies.)
