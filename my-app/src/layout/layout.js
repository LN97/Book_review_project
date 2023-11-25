
import Header from './header/header';
import './main.css'

export default function Layout ( { children } ) {
    return (
        <div>
            <Header />
            <main id="layout_main">
                        
                    { children }
                
            </main>
        </div>
        
    )
}