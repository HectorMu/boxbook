const { prisma } = require('../prisma')
const jwt = require('jsonwebtoken')

const controller = {}

controller.ListOne = async (req, res) => {
  const { title } = req.params

  try {
    const book = await prisma.userBook.findFirst({
      where: {
        title,
        fk_user: req.user.id
      }
    })

    if (book) {
      return res.json({ status: true, book })
    }

    res.json({ status: false, statusText: 'No book found' })
  } catch (error) {
    console.error(error)
    res.json({
      status: false,
      statusText: 'Something went wrong, try again later'
    })
  }
}

controller.ListAll = async (req, res) => {
  try {
    const books = await prisma.userBook.findMany({
      where: { fk_user: req.user.id }
    })

    res.json(books)
  } catch (error) {
    console.error(error)
    res.json({
      status: false,
      statusText: 'Something went wrong, try again later'
    })
  }
}

controller.Save = async (req, res) => {
  const book = {
    ...req.body,
    fk_user: req.user.id
  }

  try {
    if (book.pagesReaded === 0) {
      delete book.pagesReaded
      await prisma.userBook.create({ data: book })

      const readUserBooks = await prisma.userBook.count({
        where: { fk_user: req.user.id, status: 'Read' }
      })

      await prisma.user.update({
        where: { id: req.user.id },
        data: { booksReaded: readUserBooks }
      })

      return res
        .status(200)
        .json({ status: true, statusText: 'Book added to catalog' })
    }

    if (book.pagesReaded > 0) {
      const pages = book.pagesReaded

      if (pages > book.pageCount) {
        return res.json({
          status: false,
          statusText: "This book doesn't have that number of pages"
        })
      }

      delete book.pagesReaded
      const createdBook = await prisma.userBook.create({ data: book })

      await prisma.userBookAdvance.create({
        data: {
          fk_user: req.user.id,
          fk_book: createdBook.id,
          pagesReaded: pages,
          commentary: ''
        }
      })
    }

    const readUserBooks = await prisma.userBook.count({
      where: { fk_user: req.user.id, status: 'Read' }
    })

    await prisma.user.update({
      where: { id: req.user.id },
      data: { booksReaded: readUserBooks }
    })

    res.status(200).json({ status: true, statusText: 'Book added to catalog' })
  } catch (error) {
    console.error(error)
    res.json({
      status: false,
      statusText: 'Something went wrong, try again later'
    })
  }
}

controller.getBookAdvance = async (req, res) => {
  const { id } = req.params

  try {
    const bookAdvance = await prisma.userBookAdvance.findFirst({
      where: {
        fk_user: req.user.id,
        fk_book: parseInt(id)
      },
      orderBy: { id: 'desc' }
    })

    if (!bookAdvance) {
      return res.json({ status: false, bookAdvance: 'No advance' })
    }

    res.json({ status: true, bookAdvance })
  } catch (error) {
    console.error(error)
    res.json({
      status: false,
      statusText: 'Something went wrong, try again later'
    })
  }
}

controller.getBookAdvancesHistory = async (req, res) => {
  const { id } = req.params

  try {
    const advances = await prisma.userBookAdvance.findMany({
      where: {
        fk_user: req.user.id,
        fk_book: parseInt(id)
      },
      orderBy: { id: 'desc' }
    })

    res.json(advances)
  } catch (error) {
    console.error(error)
    res.json({
      status: false,
      statusText: 'Something went wrong, try again later'
    })
  }
}

controller.checkIfAlreadyInUserCatalog = async (req, res) => {
  const { googleBookId } = req.params

  try {
    const book = await prisma.userBook.findFirst({
      where: {
        googleBookId,
        fk_user: req.user.id
      }
    })

    res.json(book || null)
  } catch (error) {
    console.error(error)
    res.json({
      status: false,
      statusText: 'Something went wrong, try again later'
    })
  }
}

controller.removeBookFromCatalog = async (req, res) => {
  const { id: bookId } = req.params

  try {
    const book = await prisma.userBook.findFirst({
      where: {
        googleBookId: bookId,
        fk_user: req.user.id
      }
    })

    if (!book) {
      return res.json({ status: false, statusText: 'Book not found' })
    }

    await prisma.userBookAdvance.deleteMany({
      where: {
        fk_book: book.id,
        fk_user: req.user.id
      }
    })

    await prisma.userBook.delete({
      where: { id: book.id }
    })

    const readUserBooks = await prisma.userBook.count({
      where: { fk_user: req.user.id, status: 'Read' }
    })

    await prisma.user.update({
      where: { id: req.user.id },
      data: { booksReaded: readUserBooks }
    })

    res.json({ status: true, statusText: 'Removed from catalog' })
  } catch (error) {
    console.error(error)
    res.json({
      status: false,
      statusText: 'Something went wrong, try again later'
    })
  }
}

controller.addBookAdvance = async (req, res) => {
  const bookAdvance = {
    ...req.body,
    fk_user: req.user.id
  }

  try {
    const book = await prisma.userBook.findFirst({
      where: { id: req.body.fk_book }
    })

    if (!book || req.body.pagesReaded > book.pageCount) {
      return res.json({
        status: false,
        statusText: "This book doesn't have that number of pages"
      })
    }

    if (book.status === 'Pending') {
      await prisma.userBook.update({
        where: { id: book.id },
        data: { status: 'Reading' }
      })
    }

    const lastAdvance = await prisma.userBookAdvance.findFirst({
      where: {
        fk_user: req.user.id,
        fk_book: req.body.fk_book
      },
      orderBy: { id: 'desc' }
    })

    if (lastAdvance && req.body.pagesReaded <= lastAdvance.pagesReaded) {
      return res.json({
        status: false,
        statusText: 'Provide a real page advance'
      })
    }

    await prisma.userBookAdvance.create({ data: bookAdvance })
    res.json({ status: true, statusText: 'Advance saved' })
  } catch (error) {
    console.error(error)
    res.json({
      status: false,
      statusText: 'Something went wrong, try again later'
    })
  }
}

controller.setBookStatusToRead = async (req, res) => {
  const { id, score, review } = req.body

  try {
    await prisma.userBook.update({
      where: { id },
      data: {
        score,
        status: 'Read',
        review
      }
    })

    const readUserBooks = await prisma.userBook.count({
      where: { fk_user: req.user.id, status: 'Read' }
    })

    await prisma.user.update({
      where: { id: req.user.id },
      data: { booksReaded: readUserBooks }
    })

    res.json({ status: true, statusText: 'Book finished! Keep it up!' })
  } catch (error) {
    console.error(error)
    res.json({
      status: false,
      statusText: 'Something went wrong, try again later'
    })
  }
}

controller.getBookReviews = async (req, res) => {
  const { title } = req.params

  try {
    const reviews = await prisma.userBook.findMany({
      where: { title },
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    })

    res.json(reviews)
  } catch (error) {
    console.error(error)
    res.json({
      status: false,
      statusText: 'Something went wrong, try again later'
    })
  }
}

controller.Update = async (req, res) => {
  // Placeholder for update method
}

controller.Delete = async (req, res) => {
  // Placeholder for delete method
}

module.exports = controller
