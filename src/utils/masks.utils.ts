export function number(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

const Masks = {
  number,
}

export default Masks;