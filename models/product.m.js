import db from './db.js';
const TABLE_NAME = 'products';

export default {
    // (Giữ nguyên các hàm all, one, add, allofCategory cũ...)
    all: async () => await db(TABLE_NAME).select('*'),
    one: async (id) => await db(TABLE_NAME).select('*').where({ id }).first(),
    allofCategory: async (category_id) => await db(TABLE_NAME).select('*').where({ category_id }),

    // === THÊM HÀM NÀY ===
    allWithPagination: async (page = 1, pageSize = 3) => {
        // Đảm bảo page và pageSize là số nguyên dương
        const safePage = Math.max(1, parseInt(page, 10) || 1);
        const safePageSize = Math.max(1, parseInt(pageSize, 10) || 3);
        
        // Tính offset
        const offset = (safePage - 1) * safePageSize;

        // Chạy song song 2 truy vấn: đếm tổng số và lấy dữ liệu trang hiện tại
        const totalAllProducts = db(TABLE_NAME).count('id as total').first();
        const paginatedProducts = db(TABLE_NAME).select('*')
            .orderBy('id', 'asc')
            .limit(safePageSize)
            .offset(offset);

        const [total, products] = await Promise.all([totalAllProducts, paginatedProducts]);

        return { 
            products, 
            safePage, 
            safePageSize, 
            total: parseInt(total.total) 
        };
    }
};