import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Collaborative Task Manager. All Rights Reserved.</p>
                <p>
                    Made with ❤️ by <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer">Your Name</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
