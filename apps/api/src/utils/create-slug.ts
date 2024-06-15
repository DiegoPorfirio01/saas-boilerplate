export function generateSlug(text: string): string {
  const normalizedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  const lowercasedText = normalizedText.toLowerCase()

  const hyphenatedText = lowercasedText.replace(/[^a-z0-9]+/g, '-')

  const slug = hyphenatedText.replace(/^[-]+|[-]+$/g, '')

  return slug
}
