const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/user.controller");

router.get("/api/listall", verifyToken, controller.ListAll);
router.post("/api/user/checkgoal", verifyToken, controller.checkUserYearlyGoal);
router.post("/api/user/setgoal", verifyToken, controller.setYearlyGoal);

router.put("/api/user/editprofile", verifyToken, controller.editProfile);
router.get("/api/user/getprofile", verifyToken, controller.getProfile);
router.get("/api/user/getfriends", verifyToken, controller.getFriends);

router.get("/api/listone/:idnote", verifyToken, controller.ListOne);
router.post("/api/save", verifyToken, controller.Save);
router.delete("/api/delete/:idnote", verifyToken, controller.Delete);
router.put("/api/update/:idnote", verifyToken, controller.Update);

module.exports = router;
