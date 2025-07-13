// This function formats a price (in cents) into a US Dollar currency string.
// Example: 1999 => "$19.99"
export const formatAsDollars = (price: string | number): string => {
  // Convert the input (which may be a string or number in cents) to a number and divide by 100 to get dollars.
  // Then, format the result as a US Dollar currency string using the English (US) locale.
  // This ensures correct formatting with commas, two decimal places, and a dollar sign (e.g., $1,234.56).
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    // Set the formatting style to "currency"
    style: 'currency',
    // Specify the currency as US Dollars (USD)
    currency: 'USD',
  }).format(Number(price) / 100); // Format the number into a currency string

  // Return the formatted dollar amount as a string
  return dollarsAmount;
};
