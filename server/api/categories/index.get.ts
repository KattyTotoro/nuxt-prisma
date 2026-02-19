export default defineEventHandler(async (event) => {
  try {
    const category = await prisma.category.findMany({
      orderBy:{id:'asc'},
      include: {posts:{select:{id:true}}}
    })
    return category
  } catch(e) {
    console.log(e)
    return []
  }
})