const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/social.controller");

router.get("/api/listall", verifyToken, controller.ListAll);

router.get(
  "/api/social/users/samelocation",
  verifyToken,
  controller.ListSameLocation
);

router.get("/api/social/listone/:id", verifyToken, controller.ListOne);
router.get("/api/social/catalog/:id", verifyToken, controller.ListCatalog);
router.post("/api/social/contact", verifyToken, controller.Contact);
router.post("/api/social/frienship", verifyToken, controller.GetFrienship);

router.post(
  "/api/social/new/commentary/:user_catalog",
  verifyToken,
  controller.SaveCatalogCommentary
);
router.get(
  "/api/social/getcommentaries/:user_catalog",
  verifyToken,
  controller.getCommentaries
);

router.get(
  "/api/social/getusercommentary/:user_catalog",
  verifyToken,
  controller.getUserCommentary
);

router.delete(
  "/api/catalog/commentary/remove/:id",
  verifyToken,
  controller.RemoveCommentary
);

router.post("/api/save", verifyToken, controller.Save);
router.delete("/api/delete/:idnote", verifyToken, controller.Delete);
router.put("/api/update/:idnote", verifyToken, controller.Update);

module.exports = router;
