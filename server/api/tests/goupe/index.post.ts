export default defineEventHandler(async (event) => {
  const fD = await readMultipartFormData(event)
  return `it's group index post. FormData: ${fD}`
})