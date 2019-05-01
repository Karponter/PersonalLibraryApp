export function getEmptyBook() {
    return {
        id: null,
        name: '',
        author: '',
        date: null,
        read: null,
        rate: 0,
        notes: null,
        imgUrl: ''
    }
}

function randomDate(start, end) {
    return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).getTime();
}

export function makeBookRandom(book) {
    book.date = randomDate(new Date(1900), new Date());
    book.read = (Math.random() > 0.5);
    book.notes = 'Some book';
    return book;
}


