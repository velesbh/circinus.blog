import { format, parseISO } from 'date-fns'

export function formatDate(dateString: string): string {
  try { return format(parseISO(dateString), 'MMMM d, yyyy') } catch { return dateString }
}

export function formatDateShort(dateString: string): string {
  try { return format(parseISO(dateString), 'MMM d, yyyy') } catch { return dateString }
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '...'
}
