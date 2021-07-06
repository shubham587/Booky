// intializing router
const Router = require("express").Router();

// initialize database
const PublicationModel = require("../../publication");

/*
route: /pub
description: get all publication
access: public
parameter:author
methods:get
*/
Router.get("/publication/pubname",async(request,response) => {
    // return response.json({publication : database.publication})
    const allPubName = await PublicationModel.find();
    return response.json(allPubName);
})
/*
route: /pub
description: get specific publication
access: public
parameter:pubname
methods:get
*/
Router.get("/:pubname",(request,response) => {
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
route: /books
description: get list of publication based on books
access: public
parameter:book
methods:get
*/
Router.get("/books/:pub",(request, response) => {
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
route: /publication/new
description: add new publication
access: public
parameter:none
methods:post
*/
Router.post("/new",async(request, response) => {
    const {newPublication} = request.body;
    // database.publication.push(newPublication);
    PublicationModel.create(newPublication);
    return response.json({ message : "new publication added" });
});


/*
Route           /publication/update/book
Description     update/add new book to a publication
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
Router.put("/update/book/:isbn", (request, response) => {
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
Route           /publication/delete/book
Description     delete a book from publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
Router.delete("/delete/book/:isbn/:pubId", (request, response) => {
    // update publication database
    database.publications.forEach((publication) => {
      if (publication.id === parseInt(request.params.pubId)) {
        const newBooksList = publication.books.filter(
          (book) => book !== request.params.isbn
        );
  
        publication.books = newBooksList;
        return;
      }
    });
  
    // update book database
    database.books.forEach((book) => {
      if (book.ISBN === request.params.isbn) {
        book.publication = 0; // no publication available
        return;
      }
    });
  
    return res.json({
      books: database.books,
      publications: database.publications,
    });
  });



module.exports = Router;