export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (id) {
      const category = await prisma.category.delete({
        where: {
          id: +id
        }
      })
      return category
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
})