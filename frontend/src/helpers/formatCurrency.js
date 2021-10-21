export const formatCurrency = (quanlity, locale, currency) => {
  if (quanlity === 0) {
    return quanlity.toLocaleString(locale, { style: "currency", currency: currency });
  }
  if (!quanlity) return;
  return quanlity.toLocaleString(locale, { style: "currency", currency: currency });
};
