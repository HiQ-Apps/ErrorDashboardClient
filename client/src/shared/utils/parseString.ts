export const formatHeader = (key: string): string => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getFirstLetterCaps = (text?: string) => {
  if (!text) return "";
  return text[0].toUpperCase();
};

export const getInitials = (name: string) => {
  return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`.toUpperCase();
};
