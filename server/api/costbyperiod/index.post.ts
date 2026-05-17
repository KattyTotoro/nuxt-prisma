export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const costbyperiod = await prisma.costbyperiod.create({
      data,
      select: {
        id: true
      }
    })
    if (costbyperiod) return costbyperiod
  } catch (e) {
    console.log(e)
    return null
  }
})