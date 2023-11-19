import { Link } from "react-router-dom";


function Header ( ) {

    const pageUrls = [
        { link: '/' , name: 'home '},
        { link: '/discover', name: 'discover' }
    ]

    return ( 
        <div>
            { pageUrls.map( ( pageUrl ) =>
                <Link to={ pageUrl.link }> { pageUrl.name }</Link>
            )}
        </div>
    )
}