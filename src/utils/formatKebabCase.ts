export const formatKebabCase = (str: string): string => {
  if (!str.length) return str;

  str = str[0].toUpperCase() + str.slice(1);
  for (let i = 1; i < str.length; i++) {
    if (str[i] === "-") {
      str = str.slice(0, i) + " " + str[i + 1].toUpperCase() + str.slice(i + 2);
    }
  }

  return str;
};
