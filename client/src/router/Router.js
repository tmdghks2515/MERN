import React from 'react'
import Header from '../components/templates/Header'
import Footer from '../components/templates/Footer'
import AppNavBar from "../components/templates/AppNavBar";

const MyRouter = () => {
    return (
        <>
            <AppNavBar/>
            <Header/>
                <h1>Hello Body</h1>
            <Footer/>
        </>
    )
};

export default MyRouter