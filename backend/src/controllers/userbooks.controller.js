const connection = require("../database");
const jwt = require("jsonwebtoken");

const controller = {};

controller.ListOne = async (req, res) => {
  const { title } = req.params;
  const result = await connection.query(
    "select * from userbooks where title = ? && fk_user = ?",
    [title, req.user.id]
  );

  if (result.length > 0) {
    return res.json({ status: true, book: result[0] });
  }
  res.json({ status: false, statusText: "Not book found" });
};

controller.ListAll = async (req, res) => {
  const books = await connection.query(
    "select * from userbooks where fk_user = ?",
    [req.user.id]
  );
  res.json(books);
};

controller.Save = async (req, res) => {
  const book = {
    ...req.body,
    fk_user: req.user.id,
  };

  try {
    if (book.pagesReaded === 0) {
      delete book.pagesReaded;
      await connection.query("insert into userbooks set ?", [book]);

      ///updating the user readedBooks
      //Get the count of books
      const readedUserBooks = await connection.query(
        `select Count(*) as Count from userbooks where fk_user = ? && status ='Read'`,
        [req.user.id]
      );

      //extract the result
      const bookCount = readedUserBooks[0].Count;

      //updating the user readedBooks
      await connection.query("update users set booksReaded = ? where id = ?", [
        bookCount,
        req.user.id,
      ]);
      return res
        .status(200)
        .json({ status: true, statusText: "Book added to catalog" });
    }

    if (book.pagesReaded > 0) {
      const pages = book.pagesReaded;

      if (pages > book.pageCount) {
        return res.json({
          status: false,
          statusText: "This book doesn't have that number of pages",
        });
      }

      delete book.pagesReaded;
      await connection.query("insert into userbooks set ?", [book]);
      const getBook = await connection.query(
        "select * from userbooks where title = ? && fk_user = ?",
        [book.title, req.user.id]
      );

      const advance = {
        fk_user: req.user.id,
        fk_book: getBook[0].id,
        pagesReaded: pages,
        commentary: "",
      };

      await connection.query("insert into userbooksadvance set ?", [advance]);
    }

    ///updating the user readedBooks
    //Get the count of books
    const readedUserBooks = await connection.query(
      `select Count(*) as Count from userbooks where fk_user = ? && status ='Read'`,
      [req.user.id]
    );

    //extract the result
    const bookCount = readedUserBooks[0].Count;

    //updating the user readedBooks
    await connection.query("update users set booksReaded = ? where id = ?", [
      bookCount,
      req.user.id,
    ]);
    res.status(200).json({ status: true, statusText: "Book added to catalog" });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      statusText: "Something wen't wrong, try again later",
    });
  }
};

controller.getBookAdvance = async (req, res) => {
  const { id } = req.params;

  try {
    const results = await connection.query(
      "select * from userbooksadvance where fk_user = ? && fk_book = ? ORDER BY id DESC LIMIT 1",
      [req.user.id, id]
    );

    if (!results.length > 0) {
      return res.json({ status: false, bookAdvance: "Not advance" });
    }
    res.json({ status: true, bookAdvance: results[0] });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      statusText: "Something wen't wrong, try again later",
    });
  }
};

controller.getBookAdvancesHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await connection.query(
      "select * from userbooksadvance where fk_user = ? && fk_book = ? ORDER BY ID DESC",
      [req.user.id, id]
    );
    res.json(results);
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
        book: results[0],
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
    const book = await connection.query(
      "select * from userbooks where title = ? && fk_user = ?",
      [title, id]
    );
    await connection.query(
      "delete from userbooksadvance where fk_book = ? && fk_user = ?",
      [book[0].id, id]
    );
    await connection.query(
      "delete from userbooks where title = ? && fk_user = ?",
      [title, id]
    );

    //updating the user readedBooks
    //Get the count of books
    const readedUserBooks = await connection.query(
      `select Count(*) as Count from userbooks where fk_user = ? && status ='Read'`,
      [id]
    );
    //extract the result
    const bookCount = readedUserBooks[0].Count;

    //updating the user readedBooks
    await connection.query("update users set booksReaded = ? where id = ?", [
      bookCount,
      id,
    ]);

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

controller.addBookAdvance = async (req, res) => {
  const bookAdvance = {
    ...req.body,
    fk_user: req.user.id,
  };

  try {
    const getBook = await connection.query(
      "select * from userbooks where id = ?",
      [req.body.fk_book]
    );

    if (req.body.pagesReaded > getBook[0].pageCount) {
      return res.json({
        status: false,
        statusText: "This book don't have that number of pages",
      });
    }

    if (getBook[0].status === "Pending") {
      await connection.query(
        `update userbooks set status = 'Reading' where id = ?`,
        [getBook[0].id]
      );
    }

    const getLastAdvance = await connection.query(
      "select * from userbooksadvance where fk_user = ? && fk_book = ? ORDER BY id DESC LIMIT 1",
      [req.user.id, req.body.fk_book]
    );

    if (getLastAdvance.length > 0) {
      if (req.body.pagesReaded <= getLastAdvance[0].pagesReaded) {
        return res.json({
          status: false,
          statusText: "Provide a real page advance",
        });
      }
    }

    await connection.query("insert into userbooksadvance set ?", [bookAdvance]);
    res.json({
      status: true,
      statusText: "Advance saved",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      statusText: "Something wen't wrong, try again later",
    });
  }
};

controller.setBookStatusToRead = async (req, res) => {
  const { id, score, review } = req.body;

  const book = {
    score,
    status: "Read",
    review,
  };
  try {
    //Changuing the book status
    await connection.query(
      "update userbooks set ? where id = ? && fk_user = ? ",
      [book, id, req.user.id]
    );

    //updating the user readedBooks
    //Get the count of books
    const readedUserBooks = await connection.query(
      `select Count(*) as Count from userbooks where fk_user = ? && status ='Read'`,
      [req.user.id]
    );
    //extract the result
    const bookCount = readedUserBooks[0].Count;

    //updating the user readedBooks
    await connection.query("update users set booksReaded = ? where id = ?", [
      bookCount,
      req.user.id,
    ]);
    res.json({
      status: true,
      statusText: "Book finished! keep it up!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      statusText: "Something wen't wrong, try again later",
    });
  }
};

controller.getBookReviews = async (req, res) => {
  const { title } = req.params;
  try {
    const reviews = await connection.query(
      "SELECT b.id, b.title, b.fk_user, b.score, b.review, b.reviewDate, u.username from userbooks b, users u WHERE b.fk_user = u.id && title = ?;",
      [title]
    );
    res.json(reviews);
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
