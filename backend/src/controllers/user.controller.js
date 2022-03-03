const connection = require("../database");
const helpers = require("../helpers/helpers");

const controller = {};

controller.checkUserYearlyGoal = async (req, res) => {
  try {
    const [user] = await connection.query(
      "select * from users where id = ?",
      req.user.id
    );
    if (user.yearlyGoal > 0) {
      return res.json({ status: true, statusText: "Has yearly goal" });
    }
    res.json({ status: false, statusText: "NotSetted" });
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." });
  }
};

controller.setYearlyGoal = async (req, res) => {
  const { goal } = req.body;
  console.log(goal);

  try {
    await connection.query("update users set yearlyGoal = ? where id = ?", [
      goal,
      req.user.id,
    ]);
    res.status(200).json({ status: true, statusText: "Goal setted" });
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." });
  }
};
controller.ListAll = async (req, res) => {
  const userData = req.user;
  console.log(userData);
  res.json({ Data: "Im the data" });
};

controller.editProfile = async (req, res) => {
  const data = req.body;
  const { id } = req.user;

  try {
    if (data.password) {
      data.password = await helpers.encryptPassword(data.password);
    }

    await connection.query("update users set ? where id = ? ", [data, id]);
    res.status(200).json({ status: true, statusText: "Profile edited!" });
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." });
  }
};

controller.getProfile = async (req, res) => {
  try {
    const results = await connection.query("select * from users where id = ?", [
      req.user.id,
    ]);
    const profile = results[0];
    res.json(profile);
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." });
  }
};

// controller.getContactMessages = async (req, res) => {
//   try {
//     const results = await connection.query(
//       "select * from VIEW_friendshipsender where user_second_id = ?",
//       [req.user.id]
//     );
//     res.json(results);
//   } catch (error) {
//     console.log(error);
//     res
//       .status(200)
//       .json({ status: false, statusText: "Something wen't wrong." });
//   }
// };

controller.getFriends = async (req, res) => {
  try {
    const friends = await connection.query(
      "SELECT * FROM view_receiverfriends  where receiver = ?",
      [req.user.id]
    );

    res.json(friends);
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." });
  }
};

controller.ListOne = async (req, res) => {};

controller.Save = async (req, res) => {};

controller.Update = async (req, res) => {};

controller.Delete = async (req, res) => {};

module.exports = controller;
