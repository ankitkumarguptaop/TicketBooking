const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** The API rejects malformed ids with 400; checking first lets a page show "not found" instead. */
export function isUuid(value: string): boolean {
  return uuidPattern.test(value);
}
