export default defineEventHandler(async (event) => {
  try {
    const groups = await prisma.group.findMany({
      orderBy: { id: 'asc' },
      include: {
        users: true
      }
    })
    return groups
  } catch (e) {
    console.log(e)
    return []
  }
})