const connection = require("../database");

const controller = {};

controller.ListAll = async (req, res) => {
  try {
    const users = await connection.query("select * from users");
    res.json(users);
  } catch (error) {
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." });
  }
};

controller.ListCatalog = async (req, res) => {
  try {
    const catalog = await connection.query(
      "select * from userbooks where fk_user = ?",
      [req.params.id]
    );
    res.json(catalog);
  } catch (error) {
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." });
  }
};

controller.ListSameLocation = async (req, res) => {
  try {
    const FindCurrentUser = await connection.query(
      "select * from users where id = ?",
      [req.user.id]
    );
    const AllUsers = await connection.query(
      "select * from users where id != ?",
      req.user.id
    );

    const filterOnLocation = AllUsers.filter(
      (user) =>
        user.country === FindCurrentUser[0].country &&
        user.city === FindCurrentUser[0].city
    );

    const users = filterOnLocation.map(
      ({ id, username, fullname, email, booksReaded }) => ({
        id,
        username,
        fullname,
        email,
        booksReaded,
      })
    );
    res.json(users);
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." });
  }
};
controller.ListOne = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await connection.query("select * from users where id = ?", [
      id,
    ]);
    const FindedUser = results[0];

    const { fullname, username, email, booksReaded, country, city } =
      FindedUser;

    res.json({
      fullname,
      username,
      email,
      country,
      city,
      booksReaded,
    });
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({ status: false, statusText: "Something wen't wrong." });
  }
};

controller.Save = async (req, res) => {};

controller.Update = async (req, res) => {};

controller.Delete = async (req, res) => {};

module.exports = controller;
