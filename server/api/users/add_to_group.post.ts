export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const user = await prisma.user.update({
      data: {
        groups: {
          connect: [{ id: +data.id }]
        }
      },
      where: {
        id: +data.user_id
      }
    })
    if (user) return user
  } catch (e) {
    console.log(e)
    return null
  }
})