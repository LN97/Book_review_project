import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import styles from './style.module.css';
import axios from 'axios';
import { useAppContext } from '../../context';

function ReviewBook ( { bookId , triggerRefresh } )  {
  const { user } = useAppContext();
  const [newReview, setNewReview] = useState({ comment: '', rating: 0 });

  const handleReviewSubmit = () => {
    console.log("Adding review:", newReview , user );
    // send review to book using user id.
    axios.post(`http://localhost:5000/api/reviews/${ bookId }`,{
       newReview, user: {  username: user.user.username , _id: user.user._id }
    })
    .then(  res => {
      console.log( res.data );
      triggerRefresh();
    })
    .catch( err => console.log( err.response.data ));

    // Reset the form after submitting the review
    setNewReview({
      comment: '',
      rating: 0,
    });
  };

  return (
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
  )
}

export default function BookPage() {
  let { state } = useLocation();
  const { user } = useAppContext();
  const [book, setBook] = useState({});
  const [refreshCounter, setRefreshCounter] = useState(0);

  const refreshReviews = () => {
    // Increment the counter to trigger the useEffect
    setRefreshCounter((prevCounter) => prevCounter + 1);
  };


  useEffect(() => {
    // fetch book from API.
          console.log( state  )
          axios.post(`http://localhost:5000/api/books/${state.bookId}` , state )
               .then( ( res ) => {
                   setBook( res.data );
               })
               .catch( err => console.log( err ) );
         // set book in state.   
  }, [ refreshCounter ] );


  return (
    <div className={styles.bookPageContainer}>
      <div className={styles.bookSection}>
        <h2 className={styles.bookTitle}>{book.title}</h2>
        <div className={styles.bookInfo}>
          <p>
            <strong>Author:</strong> {book.author_name }
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
                    <strong>Author:</strong> {review.reviewerName }
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

        { user ? (
          <ReviewBook bookId={ state.bookId } triggerRefresh={ refreshReviews }/>
        ) : (
          <p> You must be signed in to leave a comment </p>
        )}    

      </div>
    </div>
  );
}
