export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (id) {
      const category = await prisma.category.findUnique({
        where: {
          id: +id
        }  
      })
      if (category) return category
      return {error :'no category'}
    }
  } catch (e) {
    console.log(e)
    return null
  }
})