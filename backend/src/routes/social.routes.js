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

router.post("/api/save", verifyToken, controller.Save);
router.delete("/api/delete/:idnote", verifyToken, controller.Delete);
router.put("/api/update/:idnote", verifyToken, controller.Update);

module.exports = router;
