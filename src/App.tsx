import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => (
    <div className="container w-50 min-vw-sm-100">
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Main />
            <Footer />
        </div>
    </div>
);

export default App;
