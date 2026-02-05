export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const id = +data?.id
    delete data.id
    const category = await prisma.category.update({
      data,
      where: {
        id
      }
    })
    return category
  } catch (e) {
    console.log(e)
    return null
  }
})