export function queryBuilder(filters?: Object): string {
  if (
    !filters ||
    Object.keys(filters).length === 0 ||
    Object.values(filters).every((value) => value === undefined)
  ) {
    return "";
  }

  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      query.append(key, String(value));
    }
  }

  return query.toString();
}
