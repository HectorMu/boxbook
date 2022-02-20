const connection = require("../database");
const jwt = require("jsonwebtoken");

const controller = {};

controller.ListAll = async (req, res) => {};

controller.Save = async (req, res) => {
  const book = {
    ...req.body,
    fk_user: req.user.id,
  };

  try {
    await connection.query("insert into userbooks set ?", [book]);
    res.status(200).json({ status: true, statusText: "Book added to catalog" });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      statusText: "Something wen't wrong, try again later",
    });
  }
};

controller.Update = async (req, res) => {};

controller.Delete = async (req, res) => {};

module.exports = controller;
