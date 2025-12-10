export async function up(knex) {
  // Bảng cha trước: categories
  await knex.schema.createTable('categories', (t) => {
    t.increments('id').primary(); 
    t.string('title', 120).notNullable().unique();
  });

  // Bảng con: products
  await knex.schema.createTable('products', (t) => {
    t.increments('id').primary();
    t.string('title', 255).notNullable();
    t.decimal('price', 10, 2).notNullable();
    t.text('description').notNullable();
    // Đổi tên trường cho khớp với dữ liệu JSON gốc
    t.string('image_url').notNullable();
    t.decimal('rating_rate', 3, 1).notNullable();
    t.integer('rating_count').notNullable();
    
    // FK đến categories
    t.integer('category_id')
      .notNullable()
      .references('id')
      .inTable('categories')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT'); // Ngăn xóa danh mục nếu còn sản phẩm

    // Index
    t.index(['category_id'], 'idx_products_category');
  });
}

export async function down(knex) {
  // Xóa theo thứ tự ngược lại (con trước, cha sau)
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('categories');
}