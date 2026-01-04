// Helper function to check if a product is non-vegetarian
const isNonVeg = (product) => {
  const nonVegKeywords = [
    'meat', 'chicken', 'beef', 'pork', 'mutton', 'lamb', 'fish', 
    'seafood', 'prawn', 'shrimp', 'crab', 'lobster', 'turkey', 
    'duck', 'bacon', 'sausage', 'ham', 'pepperoni', 'non-veg', 
    'non veg', 'nonveg'
  ];
  
  const searchText = `${product.title} ${product.category} ${product.description || ''}`.toLowerCase();
  
  return nonVegKeywords.some(keyword => searchText.includes(keyword));
};

// Helper function to convert price to Indian e-commerce format (299 to 19999)
const convertToIndianPrice = (originalPrice) => {
  // Normalize original price to a 0-1 range (assuming API prices range from ~1 to ~200)
  // Then map to our desired range: 299 to 19999
  const minOriginal = 1;
  const maxOriginal = 200;
  const minTarget = 299;
  const maxTarget = 19999;
  
  // Clamp original price to expected range
  const clampedPrice = Math.max(minOriginal, Math.min(maxOriginal, originalPrice));
  
  // Map to target range
  const normalized = (clampedPrice - minOriginal) / (maxOriginal - minOriginal);
  let inrPrice = minTarget + (normalized * (maxTarget - minTarget));
  
  // Round to common Indian price points based on price range
  if (inrPrice < 1000) {
    // For prices 299-999, round to nearest 99 (299, 399, 499, 599, 699, 799, 899, 999)
    return Math.max(299, Math.min(19999, Math.round(inrPrice / 100) * 100 - 1));
  } else if (inrPrice < 5000) {
    // For prices 1000-5000, round to 999, 1499, 1999, 2499, 2999, 3499, 3999, 4499, 4999
    return Math.max(299, Math.min(19999, Math.round(inrPrice / 500) * 500 - 1));
  } else if (inrPrice < 10000) {
    // For prices 5000-10000, round to 4999, 5999, 6999, 7999, 8999, 9999
    return Math.max(299, Math.min(19999, Math.round(inrPrice / 1000) * 1000 - 1));
  } else {
    // For prices 10000-19999, round to 9999, 10999, 11999, 12999, 13999, 14999, 15999, 16999, 17999, 18999, 19999
    return Math.max(299, Math.min(19999, Math.round(inrPrice / 1000) * 1000 - 1));
  }
};

// Fetch products from API
export const fetchProducts = async () => {
  try {
    // Try dummyjson.com first
    const response = await fetch('https://dummyjson.com/products?limit=20');
    if (response.ok) {
      const data = await response.json();
      // Transform data to match our needs and filter out non-veg products
      return data.products
        .map(product => ({
          id: product.id,
          title: product.title,
          price: convertToIndianPrice(product.price),
          category: product.category,
          stock: product.stock,
          image: product.thumbnail || product.images?.[0] || '',
          description: product.description
        }))
        .filter(product => !isNonVeg(product));
    }
  } catch (error) {
    console.error('Error fetching from dummyjson:', error);
  }

  // Fallback to fakestoreapi.com
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (response.ok) {
      const data = await response.json();
      // Transform data to match our needs and filter out non-veg products
      return data
        .slice(0, 20)
        .map(product => ({
          id: product.id,
          title: product.title,
          price: convertToIndianPrice(product.price),
          category: product.category,
          stock: Math.floor(Math.random() * 50) + 1, // fakestoreapi doesn't provide stock, so we generate it
          image: product.image || '',
          description: product.description
        }))
        .filter(product => !isNonVeg(product));
    }
  } catch (error) {
    console.error('Error fetching from fakestoreapi:', error);
  }

  // If both APIs fail, return empty array
  return [];
};

