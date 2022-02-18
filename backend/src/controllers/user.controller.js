const connection = require("../database");

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
controller.ListOne = async (req, res) => {};

controller.Save = async (req, res) => {};

controller.Update = async (req, res) => {};

controller.Delete = async (req, res) => {};

module.exports = controller;
