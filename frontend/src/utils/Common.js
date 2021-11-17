export const capitalizeText = (s) => s && s[0].toUpperCase() + s.slice(1);

export const formatShippingDate = (buyTime, shippingDays) => {
  const date = new Date(new Date(buyTime).getTime() + 3600 * 1000 * 24 * shippingDays);

  const formattedDate = date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "long",
  });

  return formattedDate;
};

export const formatReadableDate = (
  dateString,
  config = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  }
) => {
  const date = new Date(dateString).toLocaleString("vi-VN", config);

  return date;
};

export const formatCurrency = (quanlity, locale, currency) => {
  if (quanlity === 0) {
    return quanlity.toLocaleString(locale, { style: "currency", currency: currency });
  }
  if (!quanlity) return;
  return quanlity.toLocaleString(locale, { style: "currency", currency: currency });
};

export const getToken = () => {
  return localStorage.getItem("token");
};
