const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/userbooks.controller");

router.get("/api/user/books/listone/:title", verifyToken, controller.ListOne);

router.get("/api/user/books/listall", verifyToken, controller.ListAll);

router.post("/api/user/books/save", verifyToken, controller.Save);
router.post(
  "/api/user/catalog/book/check",
  verifyToken,
  controller.checkIfAlreadyInUserCatalog
);
router.post(
  "/api/user/catalog/book/remove",
  verifyToken,
  controller.removeBookFromCatalog
);

router.get(
  "/api/user/books/getadvance/:id",
  verifyToken,
  controller.getBookAdvance
);

router.delete("/api/user/books/delete/:id", verifyToken, controller.Delete);
router.put("/api/user/books/update/:id", verifyToken, controller.Update);

module.exports = router;
