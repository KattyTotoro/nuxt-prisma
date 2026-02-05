export default defineEventHandler(async (event) => {
  try {
    const category = await prisma.category.findMany({
      orderBy:{id:'asc'}
    })
    return category
  } catch(e) {
    console.log(e)
    return []
  }
})