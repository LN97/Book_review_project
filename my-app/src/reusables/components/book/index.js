import React from 'react';
import styles from './style.module.css';
import {Link} from 'react-router-dom'

function Book({ bookProp, index, clickedBookEv }) {
  return (
    <li className={styles.book} key={index}>
      <h3 className={styles.title}>Title: {bookProp.title}</h3>
      <p className={styles.author}>Author: {bookProp.author_name }</p>
      <p className={styles.publishedYear}>Published Year: {bookProp.first_publish_year}</p>
      <Link to={ `/book/${bookProp.bookId}`}> See book </Link>
    </li>
  );
}

export default Book;