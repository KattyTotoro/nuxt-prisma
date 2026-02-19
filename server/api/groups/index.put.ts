export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const id = +data?.id
    delete data.id
    const group = await prisma.group.update({
      data,
      where: {
        id
      }
    })
    return group
  } catch (e) {
    console.log(e)
    return null
  }
})