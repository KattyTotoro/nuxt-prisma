export default defineEventHandler(async (event) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        categories: true
      }
    })
    return posts
  } catch(e) {
    console.log(e)
    return []
  }
})