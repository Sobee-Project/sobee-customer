export const countableText = (count: number = 1, singular: string, plural: string) => {
  return count <= 1 ? singular : plural
}
