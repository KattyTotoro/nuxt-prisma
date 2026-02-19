export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const group = await prisma.group.create({
      data
    })
    if (group) return group
  } catch (e) {
    console.log(e)
    return null
  }
})