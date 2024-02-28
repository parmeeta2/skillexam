import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <div className="footer-icons">
        <a href="https://twitter.com"><i className="fab fa-twitter fa-2x"></i></a>
        <a href="https://facebook.com"><i className="fab fa-facebook fa-2x"></i></a>
        <a href="https://youtube.com"><i className="fab fa-youtube fa-2x"></i></a>
        <a href="https://pinterest.com"><i className="fab fa-pinterest fa-2x"></i></a>
        <a href="https://linkedin.com"><i className="fab fa-linkedin fa-2x"></i></a>
      </div>

      <p className="mb-0">Copyright &copy; 2023 - All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
