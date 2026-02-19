export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const group = await prisma.group.update({
      data: {
        users: {
          connect: [{ id: +data.user_id }]
        }
      },
      where: {
        id: +data.id
      }
    })
    if (group) return group
  } catch (e) {
    console.log(e)
    return null
  }
})