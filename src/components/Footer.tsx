import React from 'react';

const Footer = () => {

    return (
        <footer className="mt-auto p-2 bg-light d-flex flex-wrap justify-content-between">
            <div>Copyright text</div>
            <a
                href="https://www.cbr-xml-daily.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted text-decoration-none"
            >
                API для курсов ЦБ РФ
            </a>
        </footer>
    );
};

export default Footer;
