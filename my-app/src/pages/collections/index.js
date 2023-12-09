import { useEffect, useState } from 'react';
import Book from '../../reusables/components/book';

import styles from './style.collection.module.css';
import { useAppContext } from '../../context';


export default function SavedBooks () {

  const [ books , setBooks ] = useState([]);
  const { user } = useAppContext();

  useEffect( ( ) => {

    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/savedby/${user.user._id }`);
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        console.log( data );
        setBooks(data);
      } 
      catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchBooks();

  }, [  ] );

  return (
    <div className={styles.collectionsPage}>

      <h2> Saved Books </h2>

      { books.map( ( book , index ) => 
          <Book bookProp={ book } key={ index } />
      )}
    </div>
  );
}
