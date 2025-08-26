export function sliceText(
  text: string,
  maxLength: number,
  addDots = true
): string {
  if (text.length <= maxLength) {
    return text;
  }
  if (!addDots) {
    return text.slice(0, maxLength);
  }

  return text.slice(0, maxLength) + "...";
}
