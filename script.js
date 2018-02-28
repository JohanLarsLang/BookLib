
document.getElementById("listBooks").onclick = function() {listAllBooks()};

function addBook() {

    let addTitle = document.getElementById("newTitle").value;
    let addAuthor = document.getElementById("newAuthor").value;

    if(addTitle == '' || addAuthor == '')
    {
    alert('Type a corret title and/or author!');
  }

    else
{
    let add = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=XHrmj&title=' +addTitle + '&author=' +addAuthor + ';';
    fetch(add)
  }
      listAllBooks();
}


//var title = "Utvandrarna";
//var author = "Wilhem Moberg";

  function createNode(element) {
      return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

/*
  const ul = document.getElementById('authors');
  const url = 'https://randomuser.me/api/?results=10';

  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    let authors = data.results;
    return authors.map(function(author) {
      let li = createNode('li'),
          // img = createNode('img'),
          span = createNode('span');
      //img.src = author.picture.medium;
      span.innerHTML = `${author.name.first} ${author.name.last}`;
      // append(li, img);
      append(li, span);
      append(ul, li);
    })
  })
  .catch(function(error) {
    console.log(error);
  });

  */
  const ul = document.getElementById('books');
  const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=XHrmj';

function listAllBooks()
{
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    let books = data.data;
    return books.map(function(book) {
      let li = createNode('li'),
          // img = createNode('img'),
          span = createNode('span');
      //img.src = author.picture.medium;
      span.innerHTML = `Title: ${book.title}, Author: ${book.author}`;
      // append(li, img);
      append(li, span);
      append(ul, li);
      message.innerHTML= `Status: ${data.status}`;
    })
})

  .catch(function(error) {
    console.log(error);
    message.innerHTML=error;
    });
}

/*
 let data = {
    title: 'Stiftelse triologin',
    author: 'Issac Asimov'
}
// The parameters we are gonna pass to the fetch function
let fetchData = {
    method: 'POST',
    body: data,
    headers: new Headers()
}
fetch(url, fetchData)
.then(function() {
    // Handle response you get from the server
});

*/
