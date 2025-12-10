import categoryM from "../models/category.m.js";
import productM from "../models/product.m.js";

export const getAllProductsOfCategory = async (req, res) => {
    const categoryName = req.params.category;
    const categories = await categoryM.all();

    const currentCategory = categories.find(c => c.title === categoryName);

    let products = [];
    if (currentCategory) {
        currentCategory.current = true; 
      
        products = await productM.allofCategory(currentCategory.id);
    }
    
    res.render("product/products", { products, categories, category: categoryName });
};