export default defineEventHandler(async (event) => {
  const spred = getRouterParam(event, 'spred')
  return `it's group id get. id = ${spred}`
})