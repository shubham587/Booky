// intializing router
const Router = require("express").Router();

// initialize database
const BookModel = require("../../book");

/*
route: /
description: get all books
access: public
parameter:none  
methods:get
*/
Router.get("/",async (request, response) => {
    const getAllBooks = await BookModel.find();
    return response.json(getAllBooks);
});

/*
route: /:isbn
description: get specific book based in isbn
access: public
parameter:isbn
methods:get
*/
Router.get("/:isbn",async (request,response) => {
    // get all the books data in (book) and return to getSpecificBook
    
    const getSpecificBook =await  BookModel.findOne({ISBN : request.params.isbn});
    // const getSpecificBook = database.books.filter (
    //     (book) => book.ISBN === require.params.isbn
    // );
    // check the Fn getSpecificBook.length=0 then execute this fn
    
    if (!getSpecificBook) {
        return response.json({
            error: `No book found for the ISBN of ${request.params.isbn}`,
        });
    }
    // give the result
    return response.json({ book: getSpecificBook});
});

/*
route: /c
description: get specific book based in category
access: public
parameter:category
methods:get
*/
Router.get("/c/:category",async (request, response) => {
    // filter is upper method which checks every array ele and the array goes in book/ "include" is used in array
    // const getSpecificBook = database.books.filter(
    //     (book) => book.category.includes(request.params.category)
    // );
    const getSpecificBook = await BookModel.findOne({category : request.params.category});
    if (!getSpecificBook) {
        return response.json({
            error: `No book found for the category of ${request.params.category}`,
        });
    }
    // give the result
    return response.json({ book: getSpecificBook});
});

Router.get("/lang/:language",(require,response) => {
   
    const getSpecificBook = database.books.filter (
        (book) => book.language === require.params.language
    );
    // check the Fn getSpecificBook.length=0 then execute this fn
    if (getSpecificBook.length === 0 ) {
        return response.json({
            error: `No book found for the ISBN of ${request.params.language}`,
        });
    }
    // give the result
    return response.json({ book: getSpecificBook});
});
/*
route: /book/new
description: add new book
access: public
parameter:none
methods:post
*/
Router.post("/new",async(request, response) => {
    const {newBook} = request.body;
    
    BookModel.create(newBook)

    return response.json({message : "new Book is added"});
});
/*
route: /book/update/title
description: update book title
access: public
parameter:none
methods:put
*/
Router.put("/update/title/:isbn",async (request, response) => {
    // database.books.forEach((book) => {
    //         if(books.ISBN === parseInt(request.params.isbn))
    //         {
    //             books.title = request.body.newBookTitle;
    //             return;
    //         }
    // });

    const updatedTitle = await BookModel.findOneAndUpdate(
        {
            ISBN : request.params.isbn,
        },
        {
            title : request.body.bookTitle,
        },
        {
            // new : true,to get new data
        })
    return response.json({ books :updatedTitle});
});
/*
route: /book/update/author
description: update/add new author for book
access: public
parameter:none
methods:put
*/
Router.put("/update/author/:isbn",async(request,response) => {
    // update book database
    // database.books.forEach(
    //     (book) => {
    //         if(database.books.ISBN === request.params.isbn)
    //         {
    //             return book.author.push(parseInt(request.params.authorID));
    //         }
    //     });
    // // update author database
    // database.author.forEach(
    //     (author) => {
    //         if(author.id === request,params.authorID)
    //         {
    //             return author.books.push(parseInt(request.params.isbn));
    //         }
    //     });
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN : request.params.isbn,
        },
        {
            $addToSet : {
                author : request.body.newAuthor,
            },
        },
        {
            new :true,
        });
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id : request.params.newAuthor,
        },
        {
            $addToSet : {
                books : request.params.isbn,
            },
        },
        {
            new : true,
        })
    return request.json({books : updatedBook,author : updatedAuthor});
});
/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
Router.delete("/delete/:isbn", async (request, response) => {
    const updatedBookDatabase = await BookModel.findOneAndDelete({
      ISBN: request.params.isbn,
    });
  
    // const updatedBookDatabase = database.books.filter(
    //   (book) => book.ISBN !== request.params.isbn
    // );
  
    // database.books = updatedBookDatabase;
    return res.json({ books: updatedBookDatabase });
  });
/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/
Router.delete("/delete/author/:isbn/:authorId", async (request, response) => {
    // update the book database
  
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $pull: {
          authors: parseInt(req.params.authorId),
        },
      },
      { new: true }
    );
  
    // database.books.forEach((book) => {
    //   if (book.ISBN === request.params.isbn) {
    //     const newAuthorList = book.authors.filter(
    //       (author) => author !== parseInt(request.params.authorId)
    //     );
    //     book.authors = newAuthorList;
    //     return;
    //   }
    // });
    // update the author database
        const updatedAuthor = await AuthorModel.findOneAndUpdate(
            {
            id: parseInt(req.params.authorId),
            },
            {
            $pull: {
                books: req.params.isbn,
            },
            },
            { new: true }
        );
    // database.authors.forEach((author) => {
    //     if (author.id === parseInt(request.params.authorId)) {
    //     const newBooksList = author.books.filter(
    //         (book) => book !== request.params.isbn
    //     );

    //     author.books = newBooksList;
    //     return;
    //     }
    // });
    return res.json({
        message: "author was deleted!!!!!!😪",
        book: updatedBook,
        author: updatedAuthor});
});
module.exports = Router;