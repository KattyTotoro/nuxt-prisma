export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const id = data?.id
    delete data.id
    const costbyperiod = await prisma.costbyperiod.update({
      data,
      select: {
        id: true
      },
      where: {
        id
      }
    })
    return costbyperiod
  } catch (e) {
    console.log(e)
    return null
  }
})