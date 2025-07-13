// Response format for a list of products from the API
export type ProductsResponse = {
  data: Product[]; // Array of products
  meta: ProductsMeta; // Additional metadata such as filters and pagination
};

// Represents a single product with all its attributes
export type Product = {
  id: number; // Unique product ID
  attributes: {
    category: string; // Product category (e.g., "chairs", "tables")
    company: string; // Product brand or company (e.g., "Ikea", "Modenza")
    createdAt: string; // Timestamp when the product was created
    description: string; // Full product description
    featured: boolean; // Whether the product is featured
    image: string; // URL of the product image
    price: string; // Price as string (e.g., "49.99")
    publishedAt: string; // Timestamp when the product was published
    shipping: boolean; // Whether the product qualifies for free or fast shipping
    title: string; // Product title or name
    updatedAt: string; // Timestamp when the product was last updated
    colors: string[]; // Available color options for the product
  };
};

// Metadata for products including filters and pagination info
export type ProductsMeta = {
  categories: string[]; // List of all available categories for filtering
  companies: string[]; // List of all companies/brands for filtering
  pagination: Pagination; // Pagination details
};

// Details related to pagination
export type Pagination = {
  page: number; // Current page number
  pageCount: number; // Total number of pages
  pageSize: number; // Number of products per page
  total: number; // Total number of products across all pages
};

// Query parameters used to fetch/filter products from the API
export type Params = {
  search?: string; // Text to search in product titles/descriptions
  category?: string; // Selected category for filtering
  company?: string; // Selected company for filtering
  order?: string; // Sorting order (e.g., "asc", "desc")
  price?: string; // Maximum price or price range
  shipping?: string; // Whether to filter only items with shipping = true
  page?: number; // Current page number (for pagination)
};

// Combines product response with the query parameters used to fetch it
export type ProductsResponseWithParams = ProductsResponse & { params: Params };

// Response format for a single product (e.g., when fetching /products/:id)
export type SingleProductResponse = {
  data: Product; // Single product object
  meta: {}; // Currently empty metadata (can be extended later)
};

// Represents a single item in the shopping cart
export type CartItem = {
  cartID: string; // Unique identifier for this item in the cart (could be a combination of productID + color, etc.)
  productID: number; // ID of the original product
  image: string; // URL of the product image
  title: string; // Product name/title
  price: string; // Price as a string (e.g., "19.99" or formatted string with currency)
  amount: number; // Quantity of this product in the cart
  productColor: string; // Selected color of the product
  company: string; // Brand or manufacturer of the product
};

// Represents the overall cart state
export type CartState = {
  cartItems: CartItem[]; // Array of all items currently in the cart
  numItemsInCart: number; // Total quantity of items in the cart (sum of all item amounts)
  cartTotal: number; // Total price of all items before tax and shipping
  shipping: number; // Shipping cost
  tax: number; // Tax amount (e.g., VAT or sales tax)
  orderTotal: number; // Final total including cartTotal + tax + shipping
};

// Defines the shape of a Checkout object used for order details
export type Checkout = {
  name: string; // A field holding the customer's name
  address: string; // The shipping or billing address
  chargeTotal: number; // The total charge amount as a number
  orderTotal: string; // The total order amount as a string (interesting it's a string, not a number)
  cartItems: CartItem[]; // An array of items in the cart, each of type CartItem
  numItemsInCart: number; // The number of items in the cart
};

// Type representing a single order object from the server
export type Order = {
  id: number; // Unique identifier for the order
  attributes: {
    address: string; // Shipping address for the order
    cartItems: CartItem[]; // Array of items included in the order (CartItem is defined elsewhere)
    createdAt: string; // Date/time the order was created (ISO string)
    name: string; // Name of the customer who placed the order
    numItemsInCart: number; // Total number of items in the order
    orderTotal: string; // Total price of the order (stored as a string, possibly due to currency formatting)
    publishedAt: string; // Timestamp when the order was published (used in CMS like Strapi)
    updatedAt: string; // Timestamp when the order was last updated
  };
};

// Type representing metadata returned with the list of orders (like pagination)
export type OrdersMeta = {
  pagination: Pagination; // Pagination info — another type that includes page, pageSize, total, etc.
};

// Type representing the full response from the server when fetching orders
export type OrdersResponse = {
  data: Order[]; // Array of order objects
  meta: OrdersMeta; // Additional metadata (e.g., pagination info)
};
