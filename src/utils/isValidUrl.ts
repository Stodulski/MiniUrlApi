const isValidUrl = (url: string): boolean => {
  try {
    const _ = new URL(url)
    console.log(_)
    return true
  } catch (_) {
    return false
  }
}

export default isValidUrl
