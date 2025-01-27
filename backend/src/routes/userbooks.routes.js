const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

const controller = require('../controllers/userbooks.controller')

router.get('/api/user/books/listone/:title', verifyToken, controller.ListOne)

router.get('/api/user/books/listall', verifyToken, controller.ListAll)

router.post('/api/user/books/save', verifyToken, controller.Save)

router.get(
  '/api/user/catalog/book/check/:googleBookId',
  verifyToken,
  controller.checkIfAlreadyInUserCatalog
)
router.delete(
  '/api/user/catalog/book/remove/:id',
  verifyToken,
  controller.removeBookFromCatalog
)

router.get(
  '/api/user/books/getadvance/:id',
  verifyToken,
  controller.getBookAdvance
)

router.get(
  '/api/user/books/advances/:id',
  verifyToken,
  controller.getBookAdvancesHistory
)

router.put(
  '/api/user/books/setread',
  verifyToken,
  controller.setBookStatusToRead
)

router.post(
  '/api/user/books/advance/save',
  verifyToken,
  controller.addBookAdvance
)

router.get(
  '/api/user/books/reviews/:title',
  verifyToken,
  controller.getBookReviews
)

router.delete('/api/user/books/delete/:id', verifyToken, controller.Delete)
router.put('/api/user/books/update/:id', verifyToken, controller.Update)

module.exports = router
