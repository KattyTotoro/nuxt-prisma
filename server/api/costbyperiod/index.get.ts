export default defineEventHandler(async (event) => {
  try {
    const costbyperiod = await prisma.costbyperiod.findMany({
    })
    return costbyperiod
  } catch(e) {
    console.log(e)
    return []
  }
})