const db = require('../services/productQueries');

// Get all products
async function getAllProducts(req, res) {
    try {
        const products = await db.getAllProduct();
        res.json(products);
    } catch (error) {
        console.error('Failed to fetch products', error.message);
        res.status(500).send('Couldn\'t get products')
    }
}

// Create/insert new product
async function createProduct(req, res) {
    try {
        const { productName, sku, description, price, category, stockQuantity, unitOfMeasurement } = req.body;
        const response = await db.createProduct(productName, sku, description, price, category, stockQuantity, unitOfMeasurement);
        res.status(201).send('Successfully created new product');
    } catch (error) {
        console.error('Failed to create new product', error.message);
        res.status(500).send('Failed to create new product')
    }
}

// Find a product
async function findProduct(req, res) {
    try {
        const searchQuery = req.query.product;
        const response = await db.searchProduct(searchQuery);
        console.log(searchQuery)
        res.json(response);
    } catch (error) {
        console.error('There is no product that goes by that name', error.message);
        res.status(500).send('There is no product that goes by that name')
    }
}

// Delete all products
async function deleteAllProducts(req, res) {
    try {
        await db.deleteAllProducts();
        console.log('Successfully deleted all products');
        res.json({message: 'Products successfully deleted'});
    } catch (error) {
        console.error('Failed to delete products', error.message);
        res.status(500).send('Failed to delete all products');
    }
}

module.exports = { getAllProducts, createProduct, deleteAllProducts, findProduct }