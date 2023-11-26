import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './search.module.css';

export default function Search() {
  const [searchState, updateSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // api to handle search
  const handleSearch = () => {
    console.log(`fetching book ${searchState}`);

    setLoading(true);

    fetch(`https://openlibrary.org/search.json?q=${searchState}`)
      .then((response) => response.json())
      .then((data) => {
        const trimmedResults = data.docs.slice(0, 3);
        console.log( trimmedResults )
        const yieldResults = trimmedResults.map(({ title, publisher, author_name, first_publish_year, _version_ }) => ({
          title,
          publisher,
          author_name,
          first_publish_year,
          bookId: _version_ 
        }));
        setSearchResults(yieldResults);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log('component has mounted / rendered');
  }, []);

  return (
    <div className={Styles.searchContainer}>
      <input
        className={Styles.searchInput}
        type="text"
        placeholder="Search for a book/author or..."
        onChange={(element) => updateSearch(element.target.value)}
      />
      <button className={Styles.searchButton} onClick={handleSearch}>
        Search
      </button>

      {loading && <p className={Styles.loadingMessage}>Loading...</p>}

      <ul className={Styles.resultsList}>
        {searchResults.map((book) => (
          <li key={book.title} className={Styles.resultItem}>
            <Link to={`/book/${book.bookId}`} className={Styles.resultLink}>
              {book.title} by {book.author_name}{' '}
              <span className={Styles.colorBox}>published in {book.first_publish_year}</span>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}
