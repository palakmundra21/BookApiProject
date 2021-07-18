const express=require("express");
//Database
const database=require("./database");
//Initialization
const booky=express();

//configuration
booky.use(express.json());

/* 
Route        =>   /
Discription  => get all books
Access       => Public
Parameter    => none
Methods      =>get
*/ 
booky.get("/",(req,res)=>{
    return res.json({books: database.books});
});
/* 
Route        =>   /
Discription  => get specific books based on isbn
Access       => Public
Parameter    => isbn
Methods      =>get
*/ 

booky.get("/is/:isbn",(req,res)=>
{
    const getSpecificBooks=database.books.filter((book)=>book.ISBN===req.params.isbn);
    if(getSpecificBooks.length===0)
    {
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});
    }
    else{
        return res.json({book:getSpecificBooks});
    }
});
/* 
Route        =>   /c
Discription  => get specific books based on category
Access       => Public
Parameter    => category
Methods      =>get
*/ 
booky.get("/c/:category",(req,res)=>
{
    const getSpecificBooks=database.books.filter((book)=>book.category.includes(req.params.category));
    if(getSpecificBooks.length===0)
    {
        return res.json({error: `No book found for the category of ${req.params.category}`});
    }
    else{
        return res.json({book:getSpecificBooks});
    }

});
/* 
Route        =>   /author
Discription  => get all authors
Access       => Public
Parameter    => NONE
Methods      =>get
*/ 
booky.get("/author",(req,res)=>{
    return res.json({authors:database.author});
});
/* 
Route        =>   /author/book
Discription  => get specific authors
Access       => Public
Parameter    =>isbn
Methods      =>get
*/ 
booky.get("/author/book/:isbn",(req,res)=>
{
    const getSpecificAuthor=database.author.filter((author)=>author.books.includes(req.params.isbn));
    if(getSpecificAuthor.length===0)
    {
        return res.json({error: `No Author found for the book of ${req.params.isbn}`});
    }
    else{
        return res.json({book:getSpecificAuthor});
    }

});
/* 
Route        =>   /publications
Discription  => get all publications
Access       => Public
Parameter    => NONE
Methods      =>get
*/ 
booky.get("/publications",(req,res)=>{
    return res.json({authors:database.publications});
});
/* 
Route        =>   /author/book
Discription  => get specific authors
Access       => Public
Parameter    =>isbn
Methods      =>get
*/ 
booky.get("/publications/book/:isbn",(req,res)=>
{
    const getSpecificPublications=database.publications.filter((publications)=>publications.books.includes(req.params.isbn));
    if(getSpecificPublications.length===0)
    {
        return res.json({error: `No publications found for the book of ${req.params.isbn}`});
    }
    else{
        return res.json({book:getSpecificPublications});
    }

});

/* 
Route        =>   /book/add
Discription  =>  add new book
Access       => Public
Parameter    =>NONE
Methods      =>POST
*/ 
booky.post("/book/add",(req,res)=>
{
const {newBook}=req.body;
database.books.push(newBook);
return res.json({books: database.books});
});

/* 
Route        =>   /author/add
Discription  =>  add new author
Access       => Public
Parameter    =>NONE
Methods      =>POST
*/ 
booky.post("/author/add",(req,res)=>
{
const {newAuthor}=req.body;
database.author.push(newAuthor);
return res.json({authors: database.author});
});

/* 
Route        =>   /publications/add
Discription  =>  add new publications
Access       => Public
Parameter    =>NONE
Methods      =>POST
*/ 
booky.post("/publications/add",(req,res)=>
{
const {newPublications}=req.body;
database.publications.push(newPublications);
return res.json({publications: database.publications});
});

/* 
Route        =>   /book/update/title/
Discription  =>  update book title
Access       => Public
Parameter    =>NONE
Methods      =>PUT
*/ 


booky.put("/book/update/title/:isbn",(req,res)=>
{
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn)
        {
         book.title=req.body.newBookTitle;
         return;
        }
    });
    return res.json({books:database.books});
});

/* 
Route        =>   /book/update/author/
Discription  =>  add/update author
Access       => Public
Parameter    =>NONE
Methods      =>PUT
*/ 
booky.put("/book/update/author/:isbn/:authorId",(req,res)=>
{
database.books.forEach((book)=>
{
if(book.ISBN===req.params.isbn)
{
return book.author.push(parseInt(req.params.authorId));
}
});

database.author.forEach((author)=>
{
if(author.id===parseInt(req.params.authorId))
{
return author.books.push(req.params.isbn);
}
});
return res.json({books:database.books,author:database.author});
});
/* 
Route        =>   /author/update/name/
Discription  =>  update auhtor name
Access       => Public
Parameter    =>NONE
Methods      =>PUT
*/
booky.put("/author/update/name/:authorName",(req,res)=>
{
    

});



booky.listen(1200,()=>console.log("Hey server is running"));
