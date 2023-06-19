export const formatCurrency = (amount: string) => {
  // Could add conditional currency types based on locale or other regional indicators
  return `$${amount}`;
};
