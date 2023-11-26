import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './style.module.css';

export default function BookPage() {
  const [book, setBook] = useState({});
  const [newReview, setNewReview] = useState({ comment: '', rating: 0 });

  const dummyBook = {
    bookId: '123456789',
    author: 'John Doe',
    title: 'Sample Book',
    first_publish_year: '2020',
    reviews: [
      {
        authorId: '987654321',
        authorName: 'Loris',
        comment: 'This is a great book!',
        rating: 4,
      },
      {
        authorId: '876543210',
        authorName: 'James',
        comment: 'I enjoyed reading this book.',
        rating: 5,
      },
    ],
  };

  let { bookid } = useParams();

  useEffect(() => {
    // fetch book from API.

         // set book in state.   
         setBook(dummyBook);
  }, []);

  const handleReviewSubmit = () => {
    // Assuming you have a function to handle adding a new review
    // You can replace this with your actual logic
    console.log("Adding review:", newReview);
    // Reset the form after submitting the review
    setNewReview({
      comment: '',
      rating: 0,
    });
  };

  return (
    <div className={styles.bookPageContainer}>
      <div className={styles.bookSection}>
        <h2 className={styles.bookTitle}>{book.title}</h2>
        <div className={styles.bookInfo}>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Published Year:</strong> {book.first_publish_year}
          </p>
        </div>
      </div>

      <div className={styles.reviewContainer}>
        <h3 className={styles.reviewTitle}>Reviews:</h3>
        <div>
          { book.reviews && book.reviews.length > 0 ? (
            <ul>
              {book.reviews.map((review, index) => (
                <li key={index} className={styles.reviewItem}>
                  <p className={styles.reviewAuthor}>
                    <strong>Author:</strong> {review.authorName }
                  </p>
                  <p>
                    <strong>Rating:</strong> {review.rating}
                  </p>
                  <p>
                    <strong>Comment:</strong> {review.comment}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews</p>
          )}
        </div>

        {/* New Review Section */}
        <div className={styles.addReviewContainer}>
          <h3 className={styles.addReviewTitle}>Add a Review:</h3>
          <div>
            <label>
              Comment:
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className={styles.reviewInput}
              />
            </label>
          </div>
          <div>
            <label>
              Rating:
              <input
                type="number" min={1} max={5}
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                className={styles.reviewInput}
              />
            </label>
          </div>
          <button onClick={handleReviewSubmit} className={styles.submitReviewButton}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
