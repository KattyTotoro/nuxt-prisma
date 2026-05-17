export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const id = data?.id
    delete data.id
    const apartment = await prisma.apartments.update({
      data,
      select: {
        id: true
      },
      where: {
        id
      }
    })
    return apartment
  } catch (e) {
    console.log(e)
    return null
  }
})