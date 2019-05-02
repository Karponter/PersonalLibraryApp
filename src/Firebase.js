import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import FirebaseContext from './FirebaseContext';

const config = {
    apiKey: "AIzaSyAZ5hnqZv5FmjuKDBESHtJ8tpRGcW3xXSg",
    authDomain: "library-297d6.firebaseapp.com",
    databaseURL: "https://library-297d6.firebaseio.com",
    projectId: "library-297d6",
    storageBucket: "library-297d6.appspot.com",
    messagingSenderId: "737130218938"
};

const COLLECTION = 'books';

class Firebase {
    constructor() {
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.store = firebase.firestore();
        this.books = [];
        this.query = null;
    }

    createUser = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    };

    signIn = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);

    };

    signOut = () => {
        this.unsubscribe();
        return this.auth.signOut();
    };

    onUserStateChange = (func) => {
        this.auth.onAuthStateChanged(data => func(data));
    };

    addBook = (book) => {
        delete book.id;
        this.store.collection(COLLECTION).add(book)
            .catch(err => console.log(err));
    };

    updateBook = (book) => {
        const id = book.id;
        delete book.id;
        this.store.collection(COLLECTION).doc(id).update(book)
            .catch(err => console.log(err));
    };

    deleteBook = (bookId) => {
        this.store.collection(COLLECTION).doc(bookId).delete()
            .catch(err => console.log(err));
    };

    onBooksChange = (func) => {
        if (typeof this.func === 'function') {
            this.unsubscribe();
        }
        this.func = func;
        this.unsubscribe = this.store.collection(COLLECTION).onSnapshot((doc) => {
            let modified = false;
            doc.docChanges().forEach(el => {
                if (el.type === 'added' && !this.books.find(book => book.id === el.doc.id)) {
                    this.books.push({
                        ...el.doc.data(),
                        id: el.doc.id
                    });
                    modified = true;
                }
                if (el.type === 'modified') {
                    this.books = this.books.map(book => {
                        return book.id === el.doc.id
                            ? {
                                ...el.doc.data(),
                                id: el.doc.id
                            }
                            : book;
                    });
                }
                if (el.type === 'removed') {
                    this.books = this.books.filter(book => book.id !== el.doc.id);
                }
            });
            this.func(modified ? [...this.books] : this.books);
        }, (err) => {console.log(err.message)});
    };

}

export default Firebase;

export {FirebaseContext};