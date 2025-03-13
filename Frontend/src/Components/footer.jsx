import React from 'react'

function Footer() {
    return (<>
        <footer>
            <p>&copy; 2023 Your Company Name</p>
            <p>
                <a href="#">Privacy Policy</a> |
                <a href="#">Terms of Service</a>
            </p>
            <div className="social-icons">
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
        </footer>
    </>)
}


export default Footer