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

export const getInitials = (name: string): string => {
  const nameList: string[] = name.split(" ");
  let nameInitials: string = "";
  if (nameList.length > 1) {
    for (let i = 0; nameList.length; i++) {
      nameInitials += nameList[0].toUpperCase();
    }
  } else {
    return name[0].toUpperCase();
  }
  return nameInitials;
};
