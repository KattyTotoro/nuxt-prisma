export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (id) {
      const group = await prisma.group.findUnique({
        where: {
          id: +id
        }  
      })
      if (group) return group
      return {error :'no group'}
    }
  } catch (e) {
    console.log(e)
    return null
  }
})