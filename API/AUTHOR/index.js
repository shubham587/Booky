// initalizing router
const Router = require("express").Router();

// initializiing database
const AuthorModel = require("../../author");

/*
route: /auth
description: get all author
access: public
parameter:None
methods:get
*/
Router.get("/",(request,response)=> {
    return response.json({authors : database.author})
})
/*
route: /auth/name
description: get specific author
access: public
parameter:author
methods:get
*/
Router.get("/:name",async (request, response) => {
    // filter is upper method which checks every array ele and the array goes in book/ "include" is used in array
    // const getSpecificBook = database.books.filter(
    //     (book) => book.category.includes(request.params.category)
    // );
    const getSpecificBook = await AuthorModel.findOne({name : request.params.name});
    if (!getSpecificBook) {
        return response.json({
            error: `No book found for the name of ${request.params.name}`,
        });
    }
    // give the result
    return response.json({ author: getSpecificBook});
});
/*
route: /auth/book
description: get list of authors based on books
access: public
parameter:author
methods:get
*/
Router.get("/books/:isbn",(request, response) => {
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
route: /new
description: add new author
access: public
parameter:none
methods:post
*/
Router.post("/new",async(request, response) => {
    const {newAuthor} = request.body;
    AuthorModel.create(newAuthor)
    return response.json({ message : "new Author is added"});
});
module.exports = Router;