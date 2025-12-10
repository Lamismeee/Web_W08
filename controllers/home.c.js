import categoryM from "../models/category.m.js";
import productM from "../models/product.m.js";

const pageSize = 3;

// 1. Trang Home mặc định (Giữ nguyên hoặc chuyển hướng)
export const getAllProductsAndCategories = async (req, res) => {
    res.redirect('/1'); // Chuyển hướng về trang 1
};

// 2. Server-side Paging Controller
export const getPaginatedProductsAndCategories = async (req, res) => {
    const { page } = req.params;
    const { products, total, safePage, safePageSize } = await productM.allWithPagination(page, pageSize);
    
    const totalPages = Math.ceil(total / safePageSize);
    const categories = await categoryM.all();

    res.render("product/productsWithPaging", {
        products,
        categories,
        totalPages,
        page: safePage,
        enablePrev: safePage > 1 && totalPages > 1,
        enableNext: safePage < totalPages && totalPages > 1
    });
};

// 3. AJAX Paging: Render khung trang (GET)
export const getAjaxPage = async (req, res) => {
    const categories = await categoryM.all();
    res.render("product/productsAjaxPaging", { categories });
};

// 4. AJAX Paging: Trả về JSON (POST)
export const postAjaxPage = async (req, res) => {
    const { page } = req.body;
    const { products, total, safePage, safePageSize } = await productM.allWithPagination(page, pageSize);
    
    const totalPages = Math.ceil(total / safePageSize);
    res.json({ products, totalPages, page: safePage });
};