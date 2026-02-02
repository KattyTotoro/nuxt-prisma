export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const category = await prisma.category.create({
      data
    })
    if (category) return category
  } catch (e) {
    console.log(e)
    return null
  }
})