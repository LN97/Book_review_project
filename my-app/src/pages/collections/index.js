import { useEffect, useState } from 'react';
import Book from '../../reusables/components/book';

import styles from './style.collection.module.css';


const CollectionDetails = ({ collection = null }) => {

    useEffect( ( ) => {
        // fetch books using the books array
    }, [ collection ] );
  
    return (
      <div>
            { !collection ? 'collection not chosen' : (
                 <h3>{collection.name} </h3> 
            )}
      </div>
    );
  };
  

export default function CollectionsPage() {

  const [collections, setCollections] = useState([
    {
      userId: 'user123',
      name: 'Sci-Fi Collection',
      books: [
        { bookId: 'book1', hasRead: true },
        { bookId: 'book2', hasRead: false },
        { bookId: 'book3', hasRead: true },
      ],
    },
    {
      userId: 'user456',
      name: 'Mystery Collection',
      books: [
        { bookId: 'book4', hasRead: false },
        { bookId: 'book5', hasRead: true },
        { bookId: 'book6', hasRead: false },
      ],
    },
    // Add more fake data as needed
  ]);

  const [ collectionChosen , setCollection ] = useState(null);

  const handleCollectionClick = (collection) => {
        setCollection( collection )
  };

  return (
    <div className={styles.collectionsPage}>

      <h2>Collections you've collected </h2>

      <div>
            <ul className={styles.collectionList}>
                    {collections.map((collection, index) => (
                    <li key={index}>
                        <div
                        className={styles.collectionItem}
                        onClick={() => handleCollectionClick(collection)}
                        >
                        {collection.name}
                        </div>
                    </li>
                    ))}
            </ul>
      </div>

      <div>

            <CollectionDetails collection={ collectionChosen } />
      </div>
    </div>
  );
}
