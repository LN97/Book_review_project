import React from 'react';
import styles from './style.module.css';

function Book({ bookProp, index, clickedBookEv }) {
  return (
    <li className={styles.book} key={index}>
      <h3 className={styles.title}>Title: {bookProp.title}</h3>
      <p className={styles.author}>Author: {bookProp.author}</p>
      <p className={styles.publishedYear}>Published Year: {bookProp.publishedYear}</p>
      <p className={styles.genre}>Genre: {bookProp.genre}</p>
      <div className={styles.readStatus} onClick={() => clickedBookEv(bookProp.id)}>
        {bookProp.hasRead ? 'read' : 'mark as read'}
      </div>
    </li>
  );
}

export default Book;