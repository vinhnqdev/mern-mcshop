export const formatCurrency = (quanlity, locale, currency) => {
  return quanlity.toLocaleString(locale, { style: "currency", currency: currency });
};
