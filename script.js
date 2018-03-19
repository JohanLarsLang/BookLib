console.log('Scriptet startar...');

window.addEventListener('load', function(){
createOptionList()

const urlRequest = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
const urlSelect = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=';
const defaultKey = 'XHrmj';
const regKeyBookIdNewInput = new RegExp('^((?!(0))[0-9]{4})$');
const regKeyBookId = new RegExp('^((?!(0))[0-9]{5})$');
const regKeyBookIdInput = new RegExp('^((?!(0))[0-9]{6})$');

let btnNewKey = document.getElementById('newKey');

btnNewKey.addEventListener('click', function(event){
  console.log('btnNewKey clicked');

  document.getElementById('newTitle').style.visibility='hidden';
  document.getElementById('newAuthor').style.visibility='hidden';
  document.getElementById('selectId').style.visibility='hidden';
  document.getElementById('searchTitle').style.visibility='hidden';
  document.getElementById('viewBooks').style.visibility='hidden';
  document.getElementById('viewBooksAuthor').style.visibility='hidden';
  document.getElementById('sortTitle').style.visibility='hidden';
  document.getElementById('sortAuthor').style.visibility='hidden';
  document.getElementById('outputKey').style.visibility='visible';
  document.getElementById('inputBookLibName').style.visibility='visible';
  statusMessage.innerText = '';
  let booklist = document.getElementById('booklist');
  booklist.innerHTML = '';
  selectedBookLibName.innerText = '';
  header.innerText = '';
  requestNewKey();
});

let outputKey = document.getElementById('outputKey');
let btnStoreBookLibName = document.getElementById('storeBookLib');

let statusMessage = document.getElementById('statusMessage');
let btnViewBooks = document.getElementById('viewBooks');
let btnViewBooksAuthor = document.getElementById('viewBooksAuthor');
let btnSortTitle = document.getElementById('sortTitle');
let btnSortAuthor = document.getElementById('sortAuthor')
let btnAddBook = document.getElementById('addBook');
let header = document.getElementById('header');
let keySelection = document.getElementById("mySelect");
let selectBookLib = document.getElementById("selectBookLib");

document.getElementById('outputKey').style.visibility='hidden';
document.getElementById('inputBookLibName').style.visibility='hidden';
document.getElementById('storeBookLib').style.visibility='hidden';
document.getElementById('deleteBook').style.visibility='hidden';
document.getElementById('confirmDelete').style.visibility='hidden';
document.getElementById('modifyBook').style.visibility='hidden';

document.getElementById('newTitle').style.visibility='hidden';
document.getElementById('newAuthor').style.visibility='hidden';
document.getElementById('selectId').style.visibility='hidden';
document.getElementById('searchTitle').style.visibility='hidden';
document.getElementById('viewBooks').style.visibility='hidden';
document.getElementById('viewBooksAuthor').style.visibility='hidden';
document.getElementById('sortTitle').style.visibility='hidden';
document.getElementById('sortAuthor').style.visibility='hidden';

//searchTitleAuthor

document.getElementById('searchTitle').value = 'Search Book Title, Author';

searchTitle.addEventListener('click', function (event)
{
  console.log(`key event, type=${event.type},key=${event.key}`);

      if(searchTitle.value === 'Search Book Title, Author')
      {
      document.getElementById('searchTitle').value = '';
      }
});

searchTitle.addEventListener('keypress', function (event)
{
  console.log(`key event, type=${event.type},key=${event.key}`);
  statusMessage.innerText = '';
  header.innerText = '';
  booklist.innerHTML = '';

  search()
});

searchTitle.addEventListener('keydown', function (event)
{
    let key = event.key; // const {key} = event; ES6+
    console.log('Event type: ' + event.type + 'Key: ' + event.key + ' Event keyCode: ' + event.keyCode + ' Event cahrCode: ' + event.echarCode + ' Event which: ' + event.eWhich);

     if (key === "Backspace")
     {
       let str = searchTitle.value;
       var strLength = str.replace(/\s/g, "").length;
       console.log('Str: ' + str + ' Length: ' + strLength);

       if(strLength === 0 )
       {
           document.getElementById('searchTitle').value = 'Search Book Title, Author ';
       }

       statusMessage.innerText = '';
       header.innerText = '';
       booklist.innerHTML = '';

       search()

     }
});



  function search()
  {
    let selected = selectBookLib.value;
    let bookLibName = selected.substr(0, selected .indexOf(':'));
    let bookLibKey = selected.split(': ')[1];
    console.log('BookLibName: ' + bookLibName + ' BookLibKey: ' + bookLibKey)
    let request = urlSelect + bookLibKey;

    fetch(request).then(
        function (response) {
          // Examine the text in the response
            response.json().then(function (data) {
              console.log(data.data);

              statusMessage.innerText = 'Status message: Search Books, Title - Author, was ' + data.status + ' after: ' + counter + ' request';
              header.innerHTML = `<strong>Title, Author</strong>`;

              if(data.status != 'success' && counter < 10)
              {
                counter++;
                search()
               }

              else if (data.status === "success")
              {
                counter = 1;

                let allbooks = data.data;
                    console.log(allbooks);

                 let allBooksData = allbooks.map(book => '"<em>' + book.title + '"</em> ' + book.author + ' --BookId: ' + book.id);

                 console.log(allBooksData);
                 let sortBooks = allBooksData.sort();
                console.log(sortBooks);

                let bookstr = searchTitle.value;
                let text = "<ul>";
                for (i = 0; i < sortBooks.length; i++)
                {
                  let str = sortBooks[i];
                  console.log('Include: ' + str.includes(bookstr));
                  let check = str.includes(bookstr);
                  if (check === true )
                  {
                        text += "<li>" + sortBooks[i] + "</li>";
                  }
                }
                text += "</ul>";
                console.log(text);
                let booklist = document.getElementById('booklist');
                booklist.innerHTML = text;

                }
                else {

                }
            });
        }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
  }


//inputBookLibName
document.getElementById('inputBookLibName').value = 'Enter new BookLib name';


inputBookLibName.addEventListener('click', function (event)
{
  console.log(`key event, type=${event.type},key=${event.key}`);

      if(inputBookLibName.value === 'Enter new BookLib name')
      {
      document.getElementById('inputBookLibName').value = '';
      }
});

inputBookLibName.addEventListener('keypress', function (event)
{
  console.log(`key event, type=${event.type},key=${event.key}`);
 let str = inputBookLibName.value;
 var strLength = str.replace(/\s/g, "").length;
 console.log('Str: ' + str + ' Length: ' + strLength);

  if(strLength < 2)
  {
      document.getElementById('storeBookLib').style.visibility='hidden';
   }
   else
   {
       document.getElementById('storeBookLib').style.visibility='visible';
    }
 });

inputBookLibName.addEventListener('keydown', function (event)
{
    let evtType = event.type;
    let key = event.key; // const {key} = event; ES6+
    let eWhich = event.which;
    let echarCode = event.charCode;
    let ekeyCode = event.keyCode;

    console.log('Event type: ' + evtType + 'Key: ' + key + ' Event keyCode: ' + ekeyCode + ' Event cahrCode: ' + echarCode + ' Event which: ' + eWhich);

     if (key === "Backspace")
     {
       let str = inputBookLibName.value;
       var strLength = str.replace(/\s/g, "").length;
       console.log('Str: ' + str + ' Length: ' + strLength);

       if(strLength === 3 )
       {
           document.getElementById('storeBookLib').style.visibility='hidden';
       }
      else if(strLength === 0 )
       {
           document.getElementById('inputBookLibName').value = 'Enter BookLib name ';
       }

     }
});

 function keyEventShowStore(event){
   console.log(`key event, type=${event.type},key=${event.key}`);
   if ((inputBookLibName.value !='') && (outputKey.value !=''))
   {
     document.getElementById('storeBookLib').style.visibility='visible';
   }
   else if ((inputBookLibName.value ==='') || (outputKey.vaule ===''))
   {
     document.getElementById('storeBookLib').style.visibility='hidden';
   }
 }

btnStoreBookLibName .addEventListener('click', function(event){
  console.log('btnStoreBookLibName  click');

  document.getElementById('newTitle').style.visibility='hidden';
  document.getElementById('newAuthor').style.visibility='hidden';
  document.getElementById('selectId').style.visibility='hidden';
  document.getElementById('confirmDelete').style.visibility='hidden';
  document.getElementById('viewBooks').style.visibility='hidden';
  document.getElementById('viewBooksAuthor').style.visibility='hidden';

  let bookLibs = localStorage.getItem('allBookLib');
  bookLibs += ', ' + inputBookLibName.value + ': ' + outputKey.value;
  localStorage.setItem('allBookLib', bookLibs);
  bookLibs = localStorage.getItem('allBookLib');
  console.log('bookLibs: ' + bookLibs);
  document.getElementById('storeBookLib').style.visibility='hidden';
  document.getElementById('outputKey').value = '';
  document.getElementById('inputBookLibName').value = '';

  createOptionList()
  });

function createOptionList(){
  document.getElementById("selectBookLib").innerText = "";
  let bookLibs = localStorage.getItem('allBookLib');
  console.log('allBookLib: ' + bookLibs);

  if (bookLibs === null)
   {
    let bookLibs = 'myBooks' + ': ' + 'XHrmj';
    localStorage.setItem('allBookLib', bookLibs);
    }
  console.log('allBookLib: ' + bookLibs);
  let bookArray = bookLibs.split(',');
  console.log('Data: ' + bookArray + 'Lenght: ' + bookArray.length)

  let lista = document.getElementById('selectBookLib');
  lista.innerHTML = '<option disabled="disabled" selected="selected" style="font-size=16">Select BookLib: </option>';

  for (let i=0; i < bookArray.length; i++)
  {
    let option =  document.createElement('option'); //skap ett HTML- element
    option.innerText = bookArray[i];
    lista.appendChild(option);
  }
}

//selectBookLib
selectBookLib.addEventListener('change', event => {
  console.log('input change, value: ' + event.target.value);
  document.getElementById('viewBooks').style.visibility='visible';
  document.getElementById('viewBooksAuthor').style.visibility='visible';
  let selectedBookLibName = document.getElementById("selectedBookLibName");
  let selected = selectBookLib.value;
  let bookLibName = selected.substr(0, selected .indexOf(':'));
  let bookLibKey = selected.split(': ')[1];
  console.log('BookLibName: ' + bookLibName + ' BookLibKey: ' + bookLibKey)
  selectedBookLibName.innerHTML = 'BookLib: '  + bookLibName;

  booklist.innerHTML = '';
  listAllBooks()

  document.getElementById('newTitle').style.visibility='visible';
  document.getElementById('newAuthor').style.visibility='visible';
  document.getElementById('selectId').style.visibility='visible';
  document.getElementById('viewBooks').style.visibility='visible';
  document.getElementById('viewBooksAuthor').style.visibility='visible';
  document.getElementById('sortTitle').style.visibility='visible';
  document.getElementById('sortAuthor').style.visibility='visible';
  document.getElementById('searchTitle').style.visibility='visible';

});


let counter = 1;

function requestNewKey()
{
  fetch(urlRequest)
  .then(function(response)
  {
    console.log('Resonse: ' + response);
    return response.json(); // också ett promise
  }) //response
    .then(function(data)
    {
      // data är ett objekt som innehåller serverns svar
      console.log('Status: ' + data.status);
      console.log('Key: ' + data.key);

      statusMessage.innerText = 'Status message: Request new API-Key was ' + data.status + ' after: ' + counter +  ' request';
      document.getElementById('outputKey').value = data.key;

      if(data.status != 'success' && counter < 11)
      {
        counter++;
        requestNewKey()
       }
      else if (data.status == 'success')
      {
        counter = 1;
      }
    }) //data
  .catch(function(message)
  {
  // hantera eventuella fel
  console.log('Message: ' + message);
  });  //catch
}

function listAllBooks()
{
  document.getElementById('outputKey').style.visibility='hidden';
  document.getElementById('inputBookLibName').style.visibility='hidden';
  let booklist = document.getElementById('booklist');

  let selected = selectBookLib.value;
  let bookLibName = selected.substr(0, selected .indexOf(':'));
  let bookLibKey = selected.split(': ')[1];
  console.log('BookLibName: ' + bookLibName + ' BookLibKey: ' + bookLibKey)
  let finalUrlSelect = urlSelect + bookLibKey;

  fetch(finalUrlSelect)
  .then((resp) => resp.json())
  .then(function(data)
  {
    console.log('Status: ' + data.status);

    statusMessage.innerText = 'Status message: List books, Title - Author, was ' + data.status + ' after: ' + counter + ' request';
    header.innerHTML = `<strong>Title, Author</strong>`;

    if(data.status != 'success' && counter < 10)
    {
      counter++;
      listAllBooks()
     }

    else if (data.status == 'success')
    {
      counter = 1;

      let allbooks = data.data;
      console.log(allbooks);

       let allBooksData = allbooks.map(book => '"<em>' + book.title + '"</em>, by: ' + book.author + ' --BookId: ' + book.id);

       console.log(allBooksData);

      let text = "<ol>";
      for (i = 0; i < allBooksData.length; i++) {
      text += "<li>" + allBooksData[i] + "</li>";
      }
      text += "</ol>";
      console.log(text);
      let booklist = document.getElementById('booklist');
      booklist.innerHTML = text;

/*
      let books = data.data;
      let lista = '';
      let arrayList = '';

      return books.map(function(book)
      {
          const li =  document.createElement('li');  //Varför kan inte denna ligga utanför?
          li.innerHTML = `<em>${book.title}</em>, by: ${book.author} -- Book Id: ${book.id}`;
          booklist.appendChild(li);
      }) //map

      */
    } // else if
  }) //data
  .catch(function(error)
  {
    console.log(error);
  }); //catch
}

function listAllBooksAuthor()
{
  document.getElementById('outputKey').style.visibility='hidden';
  document.getElementById('inputBookLibName').style.visibility='hidden';
  let booklist = document.getElementById('booklist');

  let selected = selectBookLib.value;
  let bookLibName = selected.substr(0, selected .indexOf(':'));
  let bookLibKey = selected.split(': ')[1];
  console.log('BookLibName: ' + bookLibName + ' BookLibKey: ' + bookLibKey)
  let finalUrlSelect = urlSelect + bookLibKey;

  fetch(finalUrlSelect)
  .then((resp) => resp.json())
  .then(function(data)
  {
    console.log('Status: ' + data.status);

    statusMessage.innerText = 'Status message: List books, Author, Title was ' + data.status + ' after: ' + counter + ' request';
    header.innerHTML = `<strong>Title, Author</strong>`;

    if(data.status != 'success' && counter < 10)
    {
      counter++;
      listAllBooksAuthor()
     }

    else if (data.status == 'success')
    {
      counter = 1;

      let allbooks = data.data;
      console.log(allbooks);

       let allBooksData = allbooks.map(book => book.author + ' "<em>' + book.author + '</em>" --BookId: ' + book.id);

       console.log(allBooksData);

      let text = "<ol>";
      for (i = 0; i < allBooksData.length; i++) {
      text += "<li>" + allBooksData[i] + "</li>";
      }
      text += "</ol>";
      console.log(text);
      let booklist = document.getElementById('booklist');
      booklist.innerHTML = text;
    /*
      let books = data.data;
      let lista = '';
      let arrayList = '';

      return books.map(function(book)
      {
          const li =  document.createElement('li');  //Varför kan inte denna ligga utanför?
          li.innerHTML = `${book.author} <em>${book.title}</em> -- Book Id: ${book.id}`;
          booklist.appendChild(li);
      }) //map
      */
    } // else if
  }) //data
  .catch(function(error)
  {
    console.log(error);
  }); //catch
}

function listAllBooksSort()
{
document.getElementById('outputKey').style.visibility='hidden';
document.getElementById('inputBookLibName').style.visibility='hidden';

let selected = selectBookLib.value;
let bookLibName = selected.substr(0, selected .indexOf(':'));
let bookLibKey = selected.split(': ')[1];
console.log('BookLibName: ' + bookLibName + ' BookLibKey: ' + bookLibKey)
let finalUrlSelect = urlSelect + bookLibKey;

fetch(finalUrlSelect)
.then((resp) => resp.json())
.then(function(data)
{
  console.log('Status: ' + data.status);

  statusMessage.innerText = 'Status message: List books, Author - Title, was ' + data.status + ' after: ' + counter + ' request';
  header.innerHTML = `<strong>Author, Title</strong>`;

  if(data.status != 'success' && counter < 10)
  {
    counter++;
    listAllBooksSort()
   }

  else if (data.status == 'success')
  {
    counter = 1;

    let books = data.data;
    books = books.sort();
    let lista = '';
    let arrayList = '';

    return books.map(function(book)
    {
        const li =  document.createElement('li');  //Varför kan inte denna ligga utanför?
        li.innerHTML = `<em>${book.title}</em>, by: ${book.author} -- Book Id: ${book.id}`;
        booklist.appendChild(li);
    }) //map
  } // else if
}) //data
.catch(function(error)
{
  console.log(error);
}); //catch
}

// addBook
document.getElementById('addBook').style.visibility='hidden';
document.getElementById('newTitle').value = 'Enter new book title';

newTitle.addEventListener('click', function (event)
{
  console.log(`key event, type=${event.type},key=${event.key}`);

      if(newTitle.value === 'Enter new book title')
      {
      document.getElementById('newTitle').value = '';
      }
});

newTitle.addEventListener('keypress', function (event)
{
  console.log(`key event, type=${event.type},key=${event.key}`);
 let strTitle = newTitle.value;
 var strLengthTitle = strTitle.replace(/\s/g, "").length;
 console.log('Str: ' + strTitle + ' Length: ' + strLengthTitle);

 let strAuthor = newAuthor.value;
 var strLengthAuthor = strAuthor.replace(/\s/g, "").length;

  let strBookId = selectId.value;
  let myArray = regKeyBookId.exec(strBookId);
  console.log('Test: ' + myArray)

  if((strLengthTitle < 1) && (strLengthAuthor < 2))
  {
      document.getElementById('addBook').style.visibility='hidden';
   }
   else if((strLengthTitle >= 0) && (strLengthAuthor >= 2) && (strAuthor != 'Enter new author name'))
   {
       document.getElementById('addBook').style.visibility='visible';

       if(myArray != null)
       {
       document.getElementById('modifyBook').style.visibility='visible';
       }
   }
 });

newTitle.addEventListener('keydown', function (event)
{
    let key = event.key; // const {key} = event; ES6+
    console.log('Event type: ' + event.type + 'Key: ' + event.key + ' Event keyCode: ' + event.keyCode + ' Event cahrCode: ' + event.echarCode + ' Event which: ' + event.eWhich);

     if (key === "Backspace")
     {
       let str = newTitle.value;
       var strLength = str.replace(/\s/g, "").length;
       console.log('Str: ' + str + ' Length: ' + strLength);

       if(strLength === 1 )
       {
           document.getElementById('addBook').style.visibility='hidden';
           document.getElementById('modifyBook').style.visibility='hidden';
       }
      else if(strLength === 0 )
       {
           document.getElementById('newTitle').value = 'Enter new book title ';
       }

     }
});

document.getElementById('newAuthor').value = 'Enter new author name';

newAuthor.addEventListener('click', function (event)
{
  console.log(`key event, type=${event.type},key=${event.key}`);

      if(newAuthor.value === 'Enter new author name')
      {
      document.getElementById('newAuthor').value = '';
      }
});

newAuthor.addEventListener('keypress', function (event)
{
  console.log(`key event, type=${event.type},key=${event.key}`);
 let strTitle = newTitle.value;
 var strLengthTitle = strTitle.replace(/\s/g, "").length;
 console.log('Str: ' + strTitle + ' Length: ' + strLengthTitle);

 let strAuthor = newAuthor.value;
 var strLengthAuthor = strAuthor.replace(/\s/g, "").length;

  let strBookId = selectId.value;
  let myArray = regKeyBookId.exec(strBookId);
  console.log('Test: ' + myArray)

  if((strLengthTitle < 1) && (strLengthAuthor < 2))
  {
      document.getElementById('addBook').style.visibility='hidden';
   }
   else if((strLengthTitle >= 0) && (strLengthAuthor >= 1) && (strTitle != 'Enter new book title'))
   {
       document.getElementById('addBook').style.visibility='visible';

       if(myArray != null)
       {
       document.getElementById('modifyBook').style.visibility='visible';
       }
   }
 });


newAuthor.addEventListener('keydown', function (event)
{
    let key = event.key; // const {key} = event; ES6+
    console.log('Event type: ' + event.type + 'Key: ' + event.key + ' Event keyCode: ' + event.keyCode + ' Event cahrCode: ' + event.echarCode + ' Event which: ' + event.eWhich);

     if (key === "Backspace")
     {
       let str = newAuthor.value;
       var strLength = str.replace(/\s/g, "").length;
       console.log('Str: ' + str + ' Length: ' + strLength);

       if(strLength === 2 )
       {
           document.getElementById('addBook').style.visibility='hidden';
           document.getElementById('modifyBook').style.visibility='hidden';
       }
      else if(strLength === 0 )
       {
           document.getElementById('newAuthor').value = 'Enter new author name ';
       }

     }
});

btnAddBook.addEventListener('click', function(event){
  console.log('btnAddBook clicked');
  addBook()
});

function addBook()
{
    document.getElementById('outputKey').style.visibility='hidden';
    document.getElementById('inputBookLibName').style.visibility='hidden';

    let addTitle = document.getElementById("newTitle").value;
    let addAuthor = document.getElementById("newAuthor").value;
    let selected = selectBookLib.value;
    let bookLibName = selected.substr(0, selected .indexOf(':'));
    let bookLibKey = selected.split(': ')[1];
    console.log('BookLibName: ' + bookLibName + ' BookLibKey: ' + bookLibKey)

    //let addUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=XHrmj&title="' +addTitle + '"&author="' +addAuthor + '";';
    let addUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=';
    let finalUrlAdd = addUrl + bookLibKey + '&title=' +addTitle + '&author=' +addAuthor + ';';
    console.log('finalUrlAdd: ' +finalUrlAdd);

    if (addTitle != 'Enter new author name' && addAuthor != 'Enter new author name')
    {
          fetch(finalUrlAdd)
          .then(function(response)
          {
              console.log('Resonse: ' + response);
              return response.json(); // också ett promise
          }) //response
          .then(function(data)
          {
          // data är ett objekt som innehåller serverns svar
             console.log('Status: ' + data.status);
             console.log('Id: ' + data.id);
            statusMessage.innerText = 'Status message: Add book was ' + data.status + ' id: ' + data.id + ' after: ' + counter + ' request';

            if(data.status != 'success' && counter < 10)
            {
              counter++;
              addBook()
            }
            else if (data.status == 'success')
            {
              counter = 1;
              document.getElementById('newAuthor').value = 'Enter new author name';
              document.getElementById('newTitle').value = 'Enter new book title';
            }
          }) //data
          .catch(function(message)
          {
          // hantera eventuella fel
          console.log('Message: ' + message);
          });  //catch
    }

    else
    {
        document.getElementById('newAuthor').value = 'Enter new author name';
        document.getElementById('newTitle').value = 'Enter new book title';
    }

    let booklist = document.getElementById('booklist');
    booklist.innerHTML = '';
    //listAllBooks()

    document.getElementById('addBook').style.visibility='hidden';
    document.getElementById('modifyBook').style.visibility='hidden';
    document.getElementById('deleteBook').style.visibility='hidden';
    document.getElementById('confirmDelete').style.visibility='hidden';

}

  //selectId (BookId)
  let selectId = document.getElementById("selectId");
  document.getElementById('selectId').value = 'Enter BookId';

  selectId.addEventListener('click', function (event)
  {
    console.log(`key event, type=${event.type},key=${event.key}`);

        if(selectId.value === 'Enter BookId')
        {
        document.getElementById('selectId').value = '';
        }

        let strBookId = selectId.value;
        let myArray = regKeyBookId.exec(strBookId);
        console.log('Test: ' + myArray)

        if(myArray === null)
        {
         document.getElementById('deleteBook').style.visibility='hidden';
         document.getElementById('confirmDelete').style.visibility='hidden';
        }

        if(myArray != null)
        {
             document.getElementById('deleteBook').style.visibility='visible';
             document.getElementById('confirmDelete').style.visibility='visible';
             document.getElementById("confirmDelete").checked = false;
        }
});

selectId.addEventListener('mousemove', function (event)
{
  console.log(`key event, type=${event.type},key=${event.key}`);

      let strBookId = selectId.value;
      let myArray = regKeyBookId.exec(strBookId);
      console.log('Test: ' + myArray)

      if(myArray === null)
      {
       document.getElementById('deleteBook').style.visibility='hidden';
       document.getElementById('confirmDelete').style.visibility='hidden';
      }

      if(myArray != null)
      {
           document.getElementById('deleteBook').style.visibility='visible';
           document.getElementById('confirmDelete').style.visibility='visible';
           document.getElementById("confirmDelete").checked = false;
      }
});

  selectId.addEventListener('keydown', function (event)
  {
       let key = event.key;

       if (key === "Backspace")
       {
         let str = selectId.value;
         var strLength = str.replace(/\s/g, "").length;
         console.log('Str: ' + str + ' Length: ' + strLength);

         let strBookId = selectId.value;
         let myArray = regKeyBookIdInput.exec(strBookId);
         console.log('Test: ' + myArray)

         if(myArray === null)
         {
          document.getElementById('deleteBook').style.visibility='hidden';
          document.getElementById('confirmDelete').style.visibility='hidden';
         }

         if(myArray != null)
         {
              document.getElementById('deleteBook').style.visibility='visible';
              document.getElementById('confirmDelete').style.visibility='visible';
              document.getElementById("confirmDelete").checked = false;
         }

         if(strLength === 0 )
         {
             document.getElementById('selectId').value = 'Enter BookId ';
         }
       }
  });


  selectId.addEventListener('keypress', function (event)
  {
    console.log(`key event, type=${event.type},key=${event.key}`);
    let strBookId = selectId.value;
    let myArray = regKeyBookIdNewInput.exec(strBookId);
    console.log('Test: ' + myArray)
    var strLength = strBookId.replace(/\s/g, "").length;
    console.log('Str: ' + strBookId + ' Length: ' + strLength);

    if(strLength > 4 )
    {
      document.getElementById('deleteBook').style.visibility='hidden';
      document.getElementById('confirmDelete').style.visibility='hidden';
    }

    if(myArray != null)
    {
     document.getElementById('deleteBook').style.visibility='visible';
     document.getElementById('confirmDelete').style.visibility='visible';
     document.getElementById("confirmDelete").checked = false;
     }
   });

  //modifyBook
  document.getElementById("modifyBook").onclick = function() {modifyBook()};

  function modifyBook()
  {
     document.getElementById('outputKey').style.visibility='hidden';
     document.getElementById('inputBookLibName').style.visibility='hidden';

      let addTitle = document.getElementById("newTitle").value;
      let addAuthor = document.getElementById("newAuthor").value;
      let selectedIdValue = document.getElementById("selectId").value;
      let selected = selectBookLib.value;
      let bookLibName = selected.substr(0, selected .indexOf(':'));
      let bookLibKey = selected.split(': ')[1];
      console.log('BookLibName: ' + bookLibName + ' BookLibKey: ' + bookLibKey)

      let modifyUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=';
      let finalUrlModify= modifyUrl + bookLibKey + '&id=' + selectedIdValue + '&title=' +addTitle + '&author=' +addAuthor + ';';
      console.log('finalUrlModify: ' +finalUrlModify);

      fetch(finalUrlModify)
      .then(function(response)
      {
          console.log('Resonse: ' + response);
          return response.json(); // också ett promise
      }) //response
      .then(function(data)
      {
      // data är ett objekt som innehåller serverns svar
         console.log('Status: ' + data.status);
         //console.log('Id: ' + data.id);
        statusMessage.innerText = 'Status message: Modify book was ' + data.status + ' after: ' + counter + ' request';

        if(data.status != 'success' && counter < 10)
        {
          counter++;
          modifyBook()
        }
        else if (data.status == 'success')
        {
          counter = 1;
          document.getElementById('selectId').value = 'Enter BookId';
          document.getElementById('newAuthor').value = 'Enter new author name';
          document.getElementById('newTitle').value = 'Enter new book title';
        }
      }) //data
      .catch(function(message)
      {
      // hantera eventuella fel
      console.log('Message: ' + message);
      });  //catch

      let booklist = document.getElementById('booklist');
      header.innerText = '';
      booklist.innerHTML = '';

      document.getElementById('addBook').style.visibility='hidden';
      document.getElementById('modifyBook').style.visibility='hidden';
      document.getElementById('deleteBook').style.visibility='hidden';
      document.getElementById('confirmDelete').style.visibility='hidden';
}

//deleteBook
  document.getElementById("deleteBook").onclick = function() {deleteBook()};


  function deleteBook()
  {
    statusMessage.innerHTML = '';
    let confirmDelete = document.getElementById("confirmDelete").checked;
    console.log('Confirm: ' + confirmDelete)
    if (confirmDelete === false)
    {
      statusMessage.innerHTML = '<strong>Plese confirm to delete</strong>'
    }
    else if (confirmDelete === true)
    {
      console.log('Confirm: ' + confirmDelete)
      document.getElementById('outputKey').style.visibility='hidden';
      document.getElementById('inputBookLibName').style.visibility='hidden';

       let selected = selectBookLib.value;
       let selectedIdValue = document.getElementById("selectId").value;
       let bookLibName = selected.substr(0, selected .indexOf(':'));
       let bookLibKey = selected.split(': ')[1];
       console.log('BookLibName: ' + bookLibName + ' BookLibKey: ' + bookLibKey)

       let deleteUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=';
       let finalUrlDelete= deleteUrl + bookLibKey + '&id=' + selectedIdValue + ';';
       console.log('finalUrlDelete: ' +finalUrlDelete);

        fetch(finalUrlDelete)
        .then(function(response)
        {
            console.log('Resonse: ' + response);
            return response.json(); // också ett promise
        }) //response
        .then(function(data)
        {
        // data är ett objekt som innehåller serverns svar
           console.log('Status: ' + data.status + ' Counter: ' + counter);
           statusMessage.innerText = 'Status message: Delete book was ' + data.status + ' after: ' + counter + ' request';

          if(data.status != 'success' && counter < 10)
          {
            counter++;
            deleteBook()
          }

          else if(data.status != 'success' && counter === 10)
          {
            console.log('Status: ' + data.status);
            statusMessage.innerText = 'Status message: Delete book was ' + data.status + ' after: ' + counter + ' request';

          }

          else if (data.status == 'success')
          {
            counter = 1;
            let booklist = document.getElementById('booklist');
            header.innerText = '';
            booklist.innerHTML = '';

          }
        }) //data
        .catch(function(message)
        {
        // hantera eventuella fel
        console.log('Message: ' + message);
        });  //catch

        document.getElementById('deleteBook').style.visibility='hidden';
        document.getElementById('confirmDelete').style.visibility='hidden';
        document.getElementById('selectId').value = 'Enter BookId';
        //document.getElementById("confirmDelete").checked = false;

      } //if
}

btnViewBooks.addEventListener('click', function(event){
  console.log('btnViewBooks clicked');
  let booklist = document.getElementById('booklist');
  booklist.innerHTML = '';
  listAllBooks()
});

btnViewBooksAuthor.addEventListener('click', function(event){
  console.log('btnViewBooksAuthor clicked');
  booklist.innerHTML = '';
  header.innerText = '';
  listAllBooksAuthor()
});

btnSortTitle.addEventListener('click', function(event){
  console.log('btnSortTitle clicked');
  booklist.innerHTML = '';
  sortDataTitle()
});

btnSortAuthor.addEventListener('click', function(event){
  console.log('btnSortAuthor clicked');
  booklist.innerHTML = '';
  sortDataAuthor()
});


function sortDataAuthor()
{
  document.getElementById('outputKey').style.visibility='hidden';
  document.getElementById('inputBookLibName').style.visibility='hidden';
  let booklist = document.getElementById('booklist');

  let selected = selectBookLib.value;
  let bookLibName = selected.substr(0, selected .indexOf(':'));
  let bookLibKey = selected.split(': ')[1];
  console.log('BookLibName: ' + bookLibName + ' BookLibKey: ' + bookLibKey)
  let request = urlSelect + bookLibKey;

  fetch(request).then(
        function (response) {
          // Examine the text in the response
            response.json().then(function (data) {
              console.log(data.data);

              statusMessage.innerText = 'Status message: Sort books, Author - Title, was ' + data.status + ' after: ' + counter + ' request';
              header.innerHTML = `<strong>Author, Title</strong>`;

              if(data.status != 'success' && counter < 10)
              {
                counter++;
                sortDataAuthor()
               }

              else if (data.status === "success")
              {
                counter = 1;

                  let allbooks = data.data;
                  console.log(allbooks);

                 let allBooksData = allbooks.map(book => book.author + ' "<em>' + book.title + '</em>"' + ' --BookId: ' + book.id);

                console.log(allBooksData);
                 let sortBooks = allBooksData.sort();
                 console.log(sortBooks);

                let text = "<ul>";
                for (i = 0; i < sortBooks.length; i++) {
                text += "<li>" + sortBooks[i] + "</li>";
                }
                text += "</ul>";
                console.log(text);
                let booklist = document.getElementById('booklist');
                booklist.innerHTML = text;

                }
                else {

                }
            });
        }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

function sortDataTitle()
{
  document.getElementById('outputKey').style.visibility='hidden';
  document.getElementById('inputBookLibName').style.visibility='hidden';
  let booklist = document.getElementById('booklist');

  let selected = selectBookLib.value;
  let bookLibName = selected.substr(0, selected .indexOf(':'));
  let bookLibKey = selected.split(': ')[1];
  console.log('BookLibName: ' + bookLibName + ' BookLibKey: ' + bookLibKey)
  let request = urlSelect + bookLibKey;

  fetch(request).then(
        function (response) {
          // Examine the text in the response
            response.json().then(function (data) {
              console.log(data.data);

              statusMessage.innerText = 'Status message: Sort books, Title - Author, was ' + data.status + ' after: ' + counter + ' request';
              header.innerHTML = `<strong>Title, Author</strong>`;

              if(data.status != 'success' && counter < 10)
              {
                counter++;
                sortDataTitle()
               }

              else if (data.status === "success")
              {
                counter = 1;

                let allbooks = data.data;
                    console.log(allbooks);

                 let allBooksData = allbooks.map(book => '"<em>' + book.title + '"</em> ' + book.author + ' --BookId: ' + book.id);

                 console.log(allBooksData);
                 let sortBooks = allBooksData.sort();
                 console.log(sortBooks);

                let text = "<ul>";
                for (i = 0; i < sortBooks.length; i++) {
                text += "<li>" + sortBooks[i] + "</li>";
                }
                text += "</ul>";
                console.log(text);
                let booklist = document.getElementById('booklist');
                booklist.innerHTML = text;

                }
                else {

                }
            });
        }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

}); //Window load

console.log('Scriptet slutar...');
