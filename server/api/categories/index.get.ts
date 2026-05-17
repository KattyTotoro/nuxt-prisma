export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const page = Number(query.page) || 1
    const pageSize = Number(query.pageSize) || 10
    const skip = (page - 1) * pageSize

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        orderBy: { id: 'asc' },
        include: { posts: { select: { id: true } } },
        skip,
        take: pageSize
      }),
      prisma.category.count()
    ])

    return {
      data: categories,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    }
  } catch (e) {
    console.log(e)
    return { data: [], pagination: { page: 1, pageSize: 10, total: 0, totalPages: 0 } }
  }
})