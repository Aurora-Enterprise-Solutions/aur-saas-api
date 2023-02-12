export function jsonHelper(json: any): string {
  const data = typeof json === 'string' ? JSON.parse(json) : json

  function formatObject(obj: any, level: number): string {
    const indent = ' '.repeat(level * 2)
    const entries = Object.entries(obj).map(([ key, value ], index, arr) => {
      if (typeof value === 'object' && value !== null) {
        const innerObject = formatObject(value, level + 1)
        return `${indent}"${key}": {\n${innerObject}\n${indent}}${index !== arr.length - 1 ? ',' : ''}`
      }
      else {
        return `${indent}"${key}": ${JSON.stringify(value)}${index !== arr.length - 1 ? ',' : ''}`
      }
    })
    return entries.join('\n')
  }

  return `{\n${formatObject(data, 1)}\n}`
}

export default jsonHelper
