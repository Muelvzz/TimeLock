import '../css/nav.css'

export default function Nav() {
    return (
        <>
            <nav>
                <ul className='left-nav' > 
                    <li><img src="\logo.png" alt="Image of a logo" /></li>
                </ul>
                <ul className="right-nav">
                    <li>About</li>
                    <li>Sign-in</li>
                    <li>Log-in</li>
                </ul>
            </nav>
        </>
    )
}