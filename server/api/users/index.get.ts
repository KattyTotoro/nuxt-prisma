export default defineEventHandler(async (event) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
        groups: true
      },
    })
    return users
  } catch(e) {
    console.log(e)
    return []
  }
})