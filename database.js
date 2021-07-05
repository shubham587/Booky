let books = [
    {
      ISBN: "12345Book",
      title: "Getting started with MERN",
      pubDate: "2021-07-07",
      language: "en",
      numPage: 250,
      author: [1, 2],
      publications: [1],
      category: ["tech", "programming", "education", "thriller"],
    },
    {
      ISBN: "112Book",
      title: "Getting started with REST",
      pubDate: "2020-06-07",
      language: "en",
      numPage: 250,
      author: [1, 2],
      publications: [1,2],
      category: ["tech", "programming", "education", "thriller"],
    }
  ];
  
  let author = [
    {
      id: 1,
      name: "shubham",
      books: ["12345Book"],
    },
    { id: 2, 
      name: "Elon Musk", 
      books: ["12345Book"] },
  ];
  
  let publication = [
    {
      id: 1,
      name: "writex",
      books: ["12345Book"],
    },
    {
      id: 2,
      name: "indexx",
      books: ["12345Book","112Book"],
    }
  ];

   module.exports = { books, author, publication};