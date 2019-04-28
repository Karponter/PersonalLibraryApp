class BookLibrary {
    constructor(libSize = 20) {
        this.generateBooks(libSize);
    }

    host = window.location.host;

    books = [];

    bookImages = [
        '/assets/images/0.jpg',
        '/assets/images/1.jpg',
        '/assets/images/2.jpg',
        '/assets/images/3.jpg',
        '/assets/images/4.jpg',
        '/assets/images/5.jpg',
        '/assets/images/6.jpg',
        '/assets/images/7.jpg',
        '/assets/images/8.jpg',
        '/assets/images/9.jpg'
    ];

    randomDate(start, end) {
        return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).getTime();
    }

    generateBooks(libSize) {
        this.books = [...Array(libSize)].map((element, index) => {
            return {
                id: index,
                name: `Book name ${index}`,
                author: `Author name ${String.fromCharCode(97 + index)}`,
                date: this.randomDate(new Date(1900), new Date()),
                read: (Math.random() > 0.5),
                rate: Math.trunc(Math.random() * 100),
                notes: 'Some book',
                imgUrl: 'http://' + this.host + this.bookImages[Math.trunc(Math.random() * (this.bookImages.length - 1))]
            }
        });
    }

    getBooks() {
        return this.books;
    }

    getBook(bookId) {
        return this.books.find(el => el.id === Number(bookId));
    }

    updateBook(book) {
        this.books.forEach((el, ind) => {
            if (el.id === book.id) {
                this.books[ind] = book;
                this.changeFunction();
            }
        });
    }

    addBook(book) {
        book.id = this.books.length;
        book.date = this.randomDate(new Date(1900), new Date());
        book.read = (Math.random() > 0.5);
        book.notes = 'Some book';
        this.books.push(book);
        this.changeFunction();
        return book;
    }

    doseBookExist(book) {
        return this.books.find(el => el.id === book.id);
    }

    getEmptyBook() {
        return {
            id: null,
            name: '',
            author: '',
            date: null,
            read: null,
            rate: null,
            notes: null,
            imgUrl: ''
        }
    }

    onLibraryChange(func) {
        this.changeFunction = func;
    }
}

export default BookLibrary;

