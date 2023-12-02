import { useEffect, useState } from 'react';
import Book from '../../reusables/components/book/index';
import styles from './style.module.css';
import Search from '../../reusables/components/search';

export default function DiscoverPage  () {
    let booksarray = [
      {
        title: "The Great Gatsby",
        author_name: "F. Scott Fitzgerald",
        first_publish_year: 1925,
        id: '12345',
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        first_publish_year: 1960,
        id: '23456'
      },
      {
        title: "1984",
        author_name: "George Orwell",
        first_publish_year: 1949,
        id: '45678',
      },
      {
        title: "Pride and Prejudice",
        autho_namer: "Jane Austen",
        first_publish_year: 1813,
        id: '6789',
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