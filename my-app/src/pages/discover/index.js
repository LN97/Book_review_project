import { useEffect, useState } from 'react';
import Book from '../../reusables/components/book/index';
import styles from './style.module.css';
import Search from '../../reusables/components/search';

export default function DiscoverPage  () {
    let booksarray = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publishedYear: 1925,
        genre: "Fiction",
        id: '12345',
        hasRead: true
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publishedYear: 1960,
        genre: "Fiction",
        id: '23456',
        hasRead: false
      },
      {
        title: "1984",
        author: "George Orwell",
        publishedYear: 1949,
        genre: "Science Fiction",
        id: '45678',
        hasRead: false
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        publishedYear: 1813,
        genre: "Classic",
        id: '6789',
        hasRead: false
      }
    ];
    const [books, changeBooks] = useState([]); 

    //   const ClikedBook = ( bookId ) => {
    //       console.log( bookId );
    //       let newBooksArray = [...books];
    //       newBooksArray.forEach( ( eachBookObj ) => {
    //           if ( eachBookObj.id === bookId ) {
    //             eachBookObj.hasRead = !eachBookObj.hasRead;
    //           }
    //       });
    //       changeBooks( newBooksArray );
    //   }

      useEffect(() => {
        // This code will run on mount // You can perform some side effects or updates here based on the new count value.
        changeBooks(booksarray);
      },[]);

    return (
      <div className={styles.discoverPage}>
        <h1 className={styles.title}>Book Reviews</h1>
  
        <Search />
  
        <h2 className={styles.booksTitle}>Some books you may like?</h2>
  
        <div className={styles.booksContainer}>
          {books.map((bookObject, index) => (
            <div
              key={index}
              className={styles.bookItem}
            >
                <Book
                  key={index}
                  bookProp={bookObject}
                  index={index}
                />
            </div>
          ))}
        </div>
      </div>
    );
}