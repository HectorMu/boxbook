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

controller.checkIfAlreadyInUserCatalog = async (req, res) => {
  const { title } = req.body;
  const { id } = req.user;

  try {
    const results = await connection.query(
      "select * from userbooks where title = ? && fk_user = ?",
      [title, id]
    );

    if (results.length > 0) {
      return res.json({
        status: true,
        statusText: "Already on catalog",
        score: results[0].score,
      });
    }
    res.json({
      status: false,
      statusText: "Not in catalog",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      statusText: "Something wen't wrong, try again later",
    });
  }
};

controller.removeBookFromCatalog = async (req, res) => {
  const { title } = req.body;
  const { id } = req.user;

  try {
    await connection.query(
      "delete from userbooks where title = ? && fk_user = ?",
      [title, id]
    );
    res.json({
      status: true,
      statusText: "Removed from catalog",
    });
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
