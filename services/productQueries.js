const prisma = require('../db/prismaClient');

// Get all products
async function getAllProduct() {
  return await prisma.product.findMany();
}

// Create one product 
async function createProduct(productData) {
  const { productName, SKU, description, quantity, price, shelfNumber, aisleId } = productData;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name: productName,
        sku: SKU,
        description: description,
        quantity: quantity,
        price: price,
        shelfNumber: shelfNumber,
        aisleId: aisleId
      }
    });
    return newProduct; 
  } catch (error) {
    console.error('Failed to create product', error.message);
    throw error;
  }
}

module.exports = { getAllProduct, createProduct };
