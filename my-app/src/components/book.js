function Book({bookProp, index, clickedBookEv }){
    return (
        <li key={index}>
            <h3>Title: {bookProp.title}</h3>
            <p>Author: {bookProp.author}</p>
            <p>Published Year: {bookProp.publishedYear}</p>
            <p>Genre: {bookProp.genre}</p>
            <div onClick={ () => clickedBookEv(bookProp.id ) }>
                { bookProp.hasRead ? 'read' : 'mark as read' }
            </div>
         </li>
    )
}

export default Book;