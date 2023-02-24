const storage = "Storage_local"
const FormAddBook = document.getElementById("inputBook");
const searchBook = document.getElementById("searchBook");

function CheckForStorage() {
    return typeof (Storage) !== "undefined"
}

FormAddBook.addEventListener("submit", function (event) {
    const judul = document.getElementById("inputBookTitle").value;
    const penulis = document.getElementById("inputBookAuthor").value;
    const tahun = document.getElementById("inputBookYear").value;
    const centang = document.getElementById("inputBookIsComplete").checked;


    const idBook = document.getElementById("inputBookTitle").name;
    if (idBook !== "") {
        const bukuData = GetBook();
        for (let index = 0; i < bukuData.length; index++) {
            if (bukuData[index].id === idBook) {
                bukuData[index].judul = judul;
                bukuData[index].penulis = penulis;
                bukuData[index].tahun = tahun;
                bukuData[index].centang = centang;
            }
        }
        localStorage.setItem(storage, JSON.stringify(bukuData));
        ResetAll();
        RenderBook(bukuData);
        return;
    }
    const id = JSON.parse(localStorage.getItem(storage)) === null ? 0 + Date.now() : JSON.parse(localStorage.getItem(storageKey)).length + Date.now();
    const newBook = {
        id: id,
        title: title,
        author: author,
        year: year,
        isComplete: isComplete,
    };

    GetBookList(newBook);

    const bookData = GetBookList();
    RenderBook(bookData);
});

function RenderBook(bukuData) {
    if (bukuData === null) {
        return;
    }
    const containerInComplete = document.getElementById("incompleteBookshelfList");
    const containerNotcomplete = document.getElementById("completeBookshelfList");

    containerInComplete.innerHTML = "";
    containerNotcomplete.innerHTML = "";
    for (let book of bukuData) {
        const id = book.id;
        const judul = book.judul;
        const penulis = book.penulis;
        const tahun = book.tahun;
        const centang = book.centang;


        let bookList = document.createElement("article");
        bookList.classList.add("book_item", "selected_item");
        bookList.innerHTML = "<h3 name= " + id + ">" + judul + "</h3>";
        bookList.innerHTML += "<p>Penulis: " + penulis + "</p>";
        bookList.innerHTML += "<p>Tahun: " + tahun + "</p>";

        let containerAksiItem = document.createElement("div");
        containerAksiItem.classList.add("action");
        //green button
        const greenButton = CreateGreenButton(book, function (event) {
            isCompleteBookHandler(event.target.parentElement.parentElement);

            const bookData = GetBookList();
            ResetAllForm();
            RenderBookList(bookData);
        });

        //red button
        const redButton = CreateRedButton(function (event) {
            DeleteAnItem(event.target.parentElement.parentElement);

            const bookData = GetBookList();
            ResetAllForm();
            RenderBookList(bookData);
        });
        containerAksiItem.appendChild(greenButton,redButton);
        bookList.appendChild(containerAksiItem);

        if (centang===false) {
            containerInComplete.appendChild(bookList);
            bookList.childNodes[0].addEventListener("click", function (event) {
                UpdateAnItem(event.target.parentElement);
            });
      
            continue;
          }
          containerInComplete.append(bookItem);

          bookItem.childNodes[0].addEventListener("click", function (event) {
            UpdateAnItem(event.target.parentElement);
          });
        }
      }
    //function untuk mengambil data dari local storage
    function CreateGreenButton(book, eventListener) {
        const isSelesai = book.isComplete ? "Belum selesai" : "Selesai";
        const greenButton = document.createElement("button");
        greenButton.classList.add("green");
        greenButton.innerText = isSelesai + " di Baca";
        greenButton.addEventListener("click", function (event) {
          eventListener(event);
        });
        return greenButton;
    }

    function CreateRedButton(eventListener) {
        const redButton = document.createElement("button");
        redButton.classList.add("red");
        redButton.innerText = "Hapus";
        redButton.addEventListener("click", function (event) {
          eventListener(event);
        });
        return redButton;
    }
    //function untuk mengambil data dari local storage
    function isCompleteBookHandler(itemElement) {
        const bookData = GetBookList();
        if (bookData.length === 0) {
          return;
        }
      
        const title = itemElement.childNodes[0].innerText;
        const titleNameAttribut = itemElement.childNodes[0].getAttribute("name");
        for (let index = 0; index < bookData.length; index++) {
          if (bookData[index].title === title && bookData[index].id == titleNameAttribut) {
            bookData[index].isComplete = !bookData[index].isComplete;
            break;
          }
        }
        localStorage.setItem(storage, JSON.stringify(bookData));
      }
      
      //Function untuk mencari buku
    //   function SearchBookList(title) {
    //     const bookData = GetBookList();
    //     if (bookData.length === 0) {
    //       return;
    //     }
    //     const bookList = [];
    //     for (let index = 0; index < bookData.length; index++) {
    //         const tempTitle = bookData[index].title.toLowerCase();
    //         const tempTitleTarget = title.toLowerCase();
    //         if (bookData[index].title.includes(title) || tempTitle.includes(tempTitleTarget)) {
    //           bookList.push(bookData[index]);
    //         }
    //       }
    //       return bookList;
    //     }
    

        //
        
// function GreenButtonHandler(parentElement) {
//     let book = isCompleteBookHandler(parentElement);
//     book.isComplete = !book.isComplete;
//   }
  
//   function GetBookList() {
//     if (CheckForStorage) {
//       return JSON.parse(localStorage.getItem(storageKey));
//     }
//     return [];
//   }
  
//   function DeleteAnItem(itemElement) {
//     const bookData = GetBookList();
//     if (bookData.length === 0) {
//       return;
//     }
  
//     const titleNameAttribut = itemElement.childNodes[0].getAttribute("name");
//     for (let index = 0; index < bookData.length; index++) {
//       if (bookData[index].id == titleNameAttribut) {
//         bookData.splice(index, 1);
//         break;
//       }
//     }
  
//     localStorage.setItem(storageKey, JSON.stringify(bookData));
//   }
  
//   function UpdateAnItem(itemElement) {
//     if (itemElement.id === "incompleteBookshelfList" || itemElement.id === "completeBookshelfList") {
//       return;
//     }
  
//     const bookData = GetBookList();
//     if (bookData.length === 0) {
//       return;
//     }
  
//     const title = itemElement.childNodes[0].innerText;
//     const author = itemElement.childNodes[1].innerText.slice(9, itemElement.childNodes[1].innerText.length);
//     const getYear = itemElement.childNodes[2].innerText.slice(7, itemElement.childNodes[2].innerText.length);
//     const year = parseInt(getYear);
  
//     const isComplete = itemElement.childNodes[3].childNodes[0].innerText.length === "Selesai di baca".length ? false : true;
  
//     const id = itemElement.childNodes[0].getAttribute("name");
//     document.getElementById("inputBookTitle").value = title;
//     document.getElementById("inputBookTitle").name = id;
//     document.getElementById("inputBookAuthor").value = author;
//     document.getElementById("inputBookYear").value = year;
//     document.getElementById("inputBookIsComplete").checked = isComplete;
  
//     for (let index = 0; index < bookData.length; index++) {
//       if (bookData[index].id == id) {
//         bookData[index].id = id;
//         bookData[index].title = title;
//         bookData[index].author = author;
//         bookData[index].year = year;
//         bookData[index].isComplete = isComplete;
//       }
//     }
//     localStorage.setItem(storageKey, JSON.stringify(bookData));
//   }
  
//   searchBook.addEventListener("submit", function (event) {
//     event.preventDefault();
//     const bookData = GetBookList();
//     if (bookData.length === 0) {
//       return;
//     }
  
//     const title = document.getElementById("searchBookTitle").value;
//     if (title === null) {
//       RenderBookList(bookData);
//       return;
//     }
//     const bookList = SearchBookList(title);
//     RenderBookList(bookList);
//   });
  
//   function ResetAllForm() {
//     document.getElementById("inputBookTitle").value = "";
//     document.getElementById("inputBookAuthor").value = "";
//     document.getElementById("inputBookYear").value = "";
//     document.getElementById("inputBookIsComplete").checked = false;
  
//     document.getElementById("searchBookTitle").value = "";
//   }
  
//   window.addEventListener("load", function () {
//     if (CheckForStorage) {
//       if (localStorage.getItem(storageKey) !== null) {
//         const bookData = GetBookList();
//         RenderBookList(bookData);
//       }
//     } else {
//       alert("Browser yang Anda gunakan tidak mendukung Web Storage");
//     }
//   });
  