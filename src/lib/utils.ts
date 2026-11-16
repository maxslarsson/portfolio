export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
}

export function readingTime(markdown = "") {
  const words = markdown.split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}
