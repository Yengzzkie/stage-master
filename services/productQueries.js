const prisma = require('../db/prismaClient');

// Get all products
async function getAllProductQuery() {
  return await prisma.product.findMany();
}

// Create one product 
async function createProductQuery(productData) {
  const { productName, SKU, description, quantity, price, shelfNumber, aisleId } = productData;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name: productName,
        sku: SKU,
        description: description,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        shelfNumber: parseInt(shelfNumber),
        aisleId: parseInt(aisleId)
      }
    });
    return newProduct; 
  } catch (error) {
    console.error('Failed to create product', error.message);
    throw error;
  }
}

module.exports = { getAllProductQuery, createProductQuery };
