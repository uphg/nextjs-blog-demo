const toJson = (value) => {
  return JSON.parse(JSON.stringify(value || null))
}

export default toJson