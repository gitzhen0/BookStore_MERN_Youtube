import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// add a new book
// url: POST http://localhost:5555/books
// sample:
// {
//   "title": "dsds",
//   "author": "dlajlskdjflkas",
//   "publishYear": 3232
// }
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for get all books from DB
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for get a book by id from DB
// url: GET http://localhost:5555/books/<BOOKIDHERE>
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// update book
// url: PUT http://localhost:5555/books/<BOOKIDHERE>
// request body: updated book info, example:
// {
//   "title": "dsds",
//   "author": "aaaaabbbbbb",
//   "publishYear": 3232
// }
router.put("/:id", async (req, resp) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return resp.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return resp.status(404).json({ message: "Book not found" });
    }
    return resp.status(200).send({ message: "Book updated successfully" });
  } catch (err) {
    console.log(err.message);
    resp.status(500).send({ message: err.message });
  }
});

//delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "book not found" });
    }

    return response.status(200).send({ message: "book deleted succesfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
