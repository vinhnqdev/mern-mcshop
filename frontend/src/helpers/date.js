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
