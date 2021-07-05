require("dotenv").config();
// write in hyper npx nodemon filename
// install express
const { request, response } = require("express");
const express = require("express");

const mongoose = require("mongoose");
// database
const database = require("./database");

// initialization
const booky = express();

// configure json
booky.use(express.json());

// establish database connection
mongoose
  .connect(process.env.MONGO_URL , {
    useNewUrlParser: true,
    useUnifiedopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
)
  .then(() => console.log("connection established!!!!!!!"));
/*
route: /
description: get all books
access: public
parameter:none  
methods:get
*/
booky.get("/", (request, response) => {
    return response.json({books: database.books });
});

/*
route: /:isbn
description: get specific book based in isbn
access: public
parameter:isbn
methods:get
*/
booky.get("/is/:isbn",(require,response) => {
    // get all the books data in (book) and return to getSpecificBook
    const getSpecificBook = database.books.filter (
        (book) => book.ISBN === require.params.isbn
    );
    // check the Fn getSpecificBook.length=0 then execute this fn
    if (getSpecificBook.length === 0 ) {
        return response.json({
            error: `No book found for the ISBN of ${req.params.isbn}`,
        });
    }
    // give the result
    return response.json({ book: getSpecificBook});
});

/*
route: /cate
description: get specific book based in category
access: public
parameter:category
methods:get
*/
booky.get("/cate/:category",(request, response) => {
    // filter is upper method which checks every array ele and the array goes in book/ "include" is used in array
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(request.params.category)
    );
    if (getSpecificBook.length === 0 ) {
        return response.json({
            error: `No book found for the category of ${request.params.category}`,
        });
    }
    // give the result
    return response.json({ book: getSpecificBook});
});

booky.get("/lang/:language",(require,response) => {
   
    const getSpecificBook = database.books.filter (
        (book) => book.language === require.params.language
    );
    // check the Fn getSpecificBook.length=0 then execute this fn
    if (getSpecificBook.length === 0 ) {
        return response.json({
            error: `No book found for the ISBN of ${req.params.language}`,
        });
    }
    // give the result
    return response.json({ book: getSpecificBook});
});
/*
route: /auth
description: get all author
access: public
parameter:None
methods:get
*/
booky.get("/auth",(request,response)=> {
    return response.json({authors : database.author})
})
/*
route: /auth/name
description: get specific author
access: public
parameter:author
methods:get
*/
booky.get("/auth/:name",(request,response) => {
    
    const getSpecificBook = database.author.filter(
        (author) => author.name === request.params.name
    )
    
    if (getSpecificBook.length === 0 ) {
        return response.json({
            error: `No book found for the author of ${request.params.name}`,
        });
    }
    // give the result
    return response.json({ book: getSpecificBook});
})
/*
route: /auth/book
description: get list of authors based on books
access: public
parameter:author
methods:get
*/
booky.get("/author/books/:isbn",(request, response) => {
    // filter is upper method which checks every array ele and the array goes in book/ "include" is used in array
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(request.params.isbn)
    );
    if (getSpecificAuthor.length === 0 ) {
        return response.json({
            error: `No author found for the book of ${request.params.isbn}`,
        });
    }
    // give the result
    return response.json({ author: getSpecificAuthor});
});
/*
route: /auth/book
description: get all publication
access: public
parameter:author
methods:get
*/
booky.get("/pub",(request,response) => {
    return response.json({publication : database.publication})
})
/*
route: /pub
description: get specific publication
access: public
parameter:pubname
methods:get
*/
booky.get("/pub/:pubname",(request,response) => {
    const getSpecificPub = database.publication.filter(
        (publication) => publication.name === request.params.pubname
    )
    if(getSpecificPub.length === 0)
    {
        return response.json({
            error :`no publication found for book of ${request.params.pubname}`
        });
    }
    return response.json({publication : getSpecificPub});
})
/*
route: /pub/books
description: get list of publication based on books
access: public
parameter:book
methods:get
*/
booky.get("/pub/books/:pub",(request, response) => {
    // filter is upper method which checks every array ele and the array goes in book/ "include" is used in array
    const getSpecificPub = database.publication.filter(
        (pub) => publication.books.includes(request.params.pub)
    );
    if (getSpecificPub.length === 0 ) {
        return response.json({
            error: `No publication found for the book of ${request.params.pub}`,
        });
    }
    // give the result
    return response.json({ publication: getSpecificPub});
});

/*
route: /book/new
description: add new book
access: public
parameter:none
methods:get
*/
booky.post("/book/new",(request, response) => {
    const {newBook} = request.body;
    database.books.push(newBook);
    return response.json({ books : database.books });
});
/*
route: /author/new
description: add new author
access: public
parameter:none
methods:get
*/
booky.post("/author/new",(request, response) => {
    const {newAuthor} = request.body;
    database.author.push(newAuthor);
    return response.json({ author : database.author });
});
/*
route: /publication/new
description: add new publication
access: public
parameter:none
methods:get
*/
booky.post("/publication/new",(request, response) => {
    const {newPublication} = request.body;
    database.publication.push(newPublication);
    return response.json({ publication : database.publication });
});
/*
route: /book/update/title
description: update book title
access: public
parameter:none
methods:get
*/
booky.put("/book/update/title/:isbn",(request, response) => {
    database.books.forEach((book) => {
            if(books.ISBN === parseInt(request.params.isbn))
            {
                books.title = request.body.newBookTitle;
                return;
            }
    });
        return response.json({ books :database.books});
});
/*
route: /book/update/author
description: update/add new author for book
access: public
parameter:none
methods:get
*/
booky.put("/book/update/author/:isbn/:authorID",(request,response) => {
    // update book database
    database.books.forEach(
        (book) => {
            if(database.books.ISBN === request.params.isbn)
            {
                return book.author.push(parseInt(request.params.authorID));
            }
        });
    // update author database
    database.author.forEach(
        (author) => {
            if(author.id === request,params.authorID)
            {
                return author.books.push(parseInt(request.params.isbn));
            }
        });
    return request.json({books : database.books,author : database.author});
});
/*
Route           /publication/update/book
Description     update/add new book to a publication
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
booky.put("/publication/update/book/:isbn", (request, response) => {
    // update the publication database
    database.publication.forEach((publication) => {
      if (publication.id === request.body.pubId) {
        return publication.books.push(request.params.isbn);
      }
    });
  
    // update the book database
    database.books.forEach((book) => {
      if (book.ISBN === request.params.isbn) {
        book.publication = request.body.pubId;
        return;
      }
    });
  
    return response.json({
      books: database.books,
      publications: database.publication,
      message: "Successfully updated publication",
    });
  });


/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
booky.delete("/book/delete/:isbn", async (req, res) => {
    // const updatedBookDatabase = await BookModel.findOneAndDelete({
    //   ISBN: req.params.isbn,
    // });
  
    const updatedBookDatabase = database.books.filter(
      (book) => book.ISBN !== req.params.isbn
    );
  
    database.books = updatedBookDatabase;
    return res.json({ books: updatedBookDatabase });
  });
  
/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", async (req, res) => {
    // update the book database
  
    // const updatedBook = await BookModel.findOneAndUpdate(
    //   {
    //     ISBN: req.params.isbn,
    //   },
    //   {
    //     $pull: {
    //       authors: parseInt(req.params.authorId),
    //     },
    //   },
    //   { new: true }
    // );
  
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        const newAuthorList = book.authors.filter(
          (author) => author !== parseInt(req.params.authorId)
        );
        book.authors = newAuthorList;
        return;
      }
    });
    // update the author database
//   const updatedAuthor = await AuthorModel.findOneAndUpdate(
//     {
//       id: parseInt(req.params.authorId),
//     },
//     {
//       $pull: {
//         books: req.params.isbn,
//       },
//     },
//     { new: true }
//   );
    database.authors.forEach((author) => {
        if (author.id === parseInt(req.params.authorId)) {
        const newBooksList = author.books.filter(
            (book) => book !== req.params.isbn
        );

        author.books = newBooksList;
        return;
        }
    });
    return res.json({
        message: "author was deleted!!!!!!😪",
        book: updatedBook,
        author: updatedAuthor});
});

/*
Route           /publication/delete/book
Description     delete a book from publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
    // update publication database
    database.publications.forEach((publication) => {
      if (publication.id === parseInt(req.params.pubId)) {
        const newBooksList = publication.books.filter(
          (book) => book !== req.params.isbn
        );
  
        publication.books = newBooksList;
        return;
      }
    });
  
    // update book database
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        book.publication = 0; // no publication available
        return;
      }
    });
  
    return res.json({
      books: database.books,
      publications: database.publications,
    });
  });
  

booky.listen(3000,() => console.log("it is working"));