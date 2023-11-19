import { useEffect, useState } from 'react';
import Book from './components/book';

function Search() {
  const [ searchState , updateSearch ] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  //api to handle search
  const handleSearch = ( ) => {
    console.log(`fetching book ${ searchState}`);

    setLoading(true);

    fetch(`https://openlibrary.org/search.json?q=${searchState}`)
      .then((response) => response.json())
      .then((data) => {
        const trimmedResults = data.docs.slice(0, 5);
        setSearchResults( data.docs );

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect( () => {
      console.log('component has mounted / rendered');
  }, [  ] );

  return (
    <div>
        <input type='text' placeholder="search for a book / author or ..." 
        onChange={ ( element ) => updateSearch( element.target.value ) }
        />
        <button onClick={ handleSearch }> Search </button>

        {loading && <p>Loading...</p>}
      <ul>
        {searchResults.map((result) => (
          <li key={result.key}>
            <a href={`https://openlibrary.org${result.key}`} target="_blank" rel="noreferrer">
              {result.title}
            </a>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

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

  const ClikedBook = ( bookId ) => {
      console.log( bookId );
      let newBooksArray = [...books];
      newBooksArray.forEach( ( eachBookObj ) => {
          if ( eachBookObj.id === bookId ) {
            eachBookObj.hasRead = !eachBookObj.hasRead;
          }
      });
      changeBooks( newBooksArray );
  }

  useEffect(() => {
    // This code will run on mount // You can perform some side effects or updates here based on the new count value.
    changeBooks(booksarray);
  },[]);

return (
  <div>
    <h1>Book Reviews</h1>
    <Search />
    <ul>
      {books.map( (bookObject, index)=> (
         <Book bookProp={bookObject} index={index} clickedBookEv={ ClikedBook } />
      ) )}
    </ul>
  </div>

)

}