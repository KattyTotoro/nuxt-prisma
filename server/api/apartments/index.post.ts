export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const apartment = await prisma.apartments.create({
      data,
      select: {
        id: true
      }
    })
    if (apartment) return apartment
  } catch (e) {
    console.log(e)
    return null
  }
})