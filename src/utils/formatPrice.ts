const formatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

export const formatPrice = (price: number) => {
  return formatter.format(price);
};
