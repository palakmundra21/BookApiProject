const books=[
    {
        ISBN:"12345Books",
        title:"Getting started with mern",
        pubDate:"2021-07-02",
        language:"en",
        numPage:250,
        author:[1,2],
        publications:[1],
        category:["tech","thriller","programming"],
    },
];
const author=[
    {
        id:1,
        name:"Palak",
        books:["12345Books"],
    },
    {
        id:2,
        name:"Rahul",
        books:["12345Books"],
    }
];
const publications=[
    {
        id:1,
        name:"Writex",
        books:["12345Books"],
    },
];
module.exports={books,author,publications};//exporting data passing as object
