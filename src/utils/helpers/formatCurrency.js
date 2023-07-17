export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en", {
    currencyDisplay: "narrowSymbol",
    style: "currency",
    currency: "GHS",
  }).format(amount);
