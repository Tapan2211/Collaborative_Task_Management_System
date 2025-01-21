import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Collaborative Task Manager. All Rights Reserved.</p>
                <p>
                    Made with ❤️ by <a href="https://github.com/Tapan2211" target="_blank" rel="noopener noreferrer">Tapan Ghataliya</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
