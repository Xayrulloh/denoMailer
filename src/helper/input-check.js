export function IsExist(body) {
  if (!body) return false

  for (const value of Object.values(body)) {
    if (!value) return false
  }

  return true
}
