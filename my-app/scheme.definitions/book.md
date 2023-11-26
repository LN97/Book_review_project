a Book must have 
    bookId: { type: String , required: true },
    author: { type: String , required: true },
    title: { type: String , required: true },
    first_publish_year: { type: String,  required: true },
    reviews: [ ReviewsSchema ]

each review will have 
    authorId: { type: ObjectId , required: true },
    comment: { type: String },
    rating: { type: Number , min: 0 , max: 5 }

