// Dữ liệu danh mục
const categories = [
  { "id": 1, "title": "men's clothing" },
  { "id": 2, "title": "jewelery" },
  { "id": 3, "title": "electronics" },
  { "id": 4, "title": "women's clothing" }
];

const productsRaw = [
  { "id": 1, "title": "Fjallraven - Foldsack No. 1 Backpack", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category": "men's clothing", "image": "/imgs/p1.png", "rating": { "rate": 3.9, "count": 120 } },
  { "id": 2, "title": "Mens Casual Premium Slim Fit T-Shirts", "price": 22.3, "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.", "category": "men's clothing", "image": "/imgs/p2.png", "rating": { "rate": 4.1, "count": 259 } },
  { "id": 3, "title": "Mens Cotton Jacket", "price": 55.99, "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling.", "category": "men's clothing", "image": "/imgs/p3.png", "rating": { "rate": 4.7, "count": 500 } },
  { "id": 5, "title": "John Hardy Women's Naga Gold & Silver Bracelet", "price": 695, "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.", "category": "jewelery", "image": "/imgs/p4.png", "rating": { "rate": 4.6, "count": 400 } },
  { "id": 6, "title": "Solid Gold Petite Micropave", "price": 168, "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States.", "category": "jewelery", "image": "/imgs/p5.png", "rating": { "rate": 3.9, "count": 70 } },
  { "id": 9, "title": "WD 2TB Elements Portable External Hard Drive", "price": 64, "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity.", "category": "electronics", "image": "/imgs/p6.png", "rating": { "rate": 3.3, "count": 203 } },
  { "id": 15, "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket", "price": 56.99, "description": "Note:The Jackets is US standard size, Please choose size as your usual wear", "category": "women's clothing", "image": "/imgs/p7.png", "rating": { "rate": 2.6, "count": 235 } }
];

// Helper: Ánh xạ tên category (string) sang category_id (int)
const categoryMap = new Map(categories.map(c => [c.title, c.id]));

export async function seed(knex) {
  // Bọc tất cả trong một transaction
  await knex.transaction(async (trx) => {
    // Xóa theo thứ tự con -> cha (tránh lỗi FK)
    await trx('products').del();
    await trx('categories').del();

    // Chèn danh mục
    await trx('categories').insert(categories);

    // Xử lý và chèn sản phẩm
    const products = productsRaw.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      image_url: p.image, 
      rating_rate: p.rating?.rate ?? 0,
      rating_count: p.rating?.count ?? 0,
      category_id: categoryMap.get(p.category) 
    }));
    
    await trx('products').insert(products);

    await trx.raw(`SELECT setval(pg_get_serial_sequence('categories', 'id'), (SELECT MAX(id) FROM categories));`);
    await trx.raw(`SELECT setval(pg_get_serial_sequence('products', 'id'), (SELECT MAX(id) FROM products));`);
  });
};