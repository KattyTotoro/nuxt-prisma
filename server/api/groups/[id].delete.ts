export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (id) {
      const group = await prisma.group.delete({
        where: {
          id: +id
        }
      })
      return group
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
})