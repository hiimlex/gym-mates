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

export function email(value: string): string {
  // lowercase and remove spaces
  value = value.trim();
  value = value.replace(/\s/g, "");
  value = value.toLocaleLowerCase();
  return value;
}

export function maxLength(value: string, length: number): string {
  if (value.length > length) {
    value = value.slice(0, length);
  }
  return value;
}

export function getFirstName(fullName: string): string {
  return fullName.split(" ")[0] || fullName;
}

const Masks = {
  number,
  crewName,
  email,
  maxLength,
  getFirstName,
};

export default Masks;
