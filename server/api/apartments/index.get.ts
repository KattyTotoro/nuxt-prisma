export default defineEventHandler(async (event) => {
  try {
    const apartments = await prisma.apartments.findMany({
    })
    return apartments
  } catch(e) {
    console.log(e)
    return []
  }
})