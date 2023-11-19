import { useSearchParams , useParams } from "react-router-dom";
import { useState  } from 'react';
export default function BookPage ( ) {

    let [searchParams, setSearchParams] = useSearchParams();
    let [query, setQuery] = useState(
      searchParams.get("name")
    );

    console.log( query )

    let { bookid } = useParams();

    return (
        <div>
            Single book : { bookid }
        </div>
    )
}