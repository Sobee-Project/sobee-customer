export const convertToQuery = (key: string, value: string | string[] | number | number[] | boolean) => {
  if (Array.isArray(value)) {
    return value.map((v) => `${key}=${v}`).join("&")
  }
  return `${key}=${value}`
}
