export const summaryText = (text, min, max) => {
  if (text.length <= max) {
    return text;
  } else {
    return text.substr(min, max) + "...";
  }
};
