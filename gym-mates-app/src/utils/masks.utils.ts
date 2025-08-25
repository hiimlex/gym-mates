export function number(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

export function crewName(value: string): string {
  // uppercase and remove special characters
  // trim to max 10 characters
  value = value.trim();
  if (value.length > 10) {
    value = value.slice(0, 10);
  }
  value = value.toLocaleUpperCase();
  value = value.replace(/[^a-zA-Z0-9\s]/g, "");
  return value;
}

const Masks = {
  number,
  crewName,
}

export default Masks;