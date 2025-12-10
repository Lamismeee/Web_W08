import { 
    getAllProductsAndCategories, 
    getPaginatedProductsAndCategories, 
    getAjaxPage, 
    postAjaxPage 
} from "../controllers/home.c.js";
import express from 'express';

const router = express.Router();

// Route AJAX (phải đặt trước route /:page để tránh nhầm lẫn)
router.get('/ajax', getAjaxPage);
router.post('/ajax', postAjaxPage);

// Route Trang chủ và Phân trang server-side
router.get('/', getAllProductsAndCategories);
router.get('/:page', getPaginatedProductsAndCategories);

export default router;