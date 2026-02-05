export default defineEventHandler(async (event) => {
  const data = await readBody(event)
  return `it's index post. it's get data ${Object.entries(data)}`
})