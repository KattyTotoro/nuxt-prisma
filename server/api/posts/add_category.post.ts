export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const post = await prisma.post.update({
      data: {
        categories: {
          connect: [{ id: +data.category_id }]
        }
      },
      where: {
        id: +data.id
      }
    })
    if (post) return post
  } catch (e) {
    console.log(e)
    return null
  }
})