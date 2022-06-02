import { useState } from "react";
import { BooksGrid, SearchBar } from "../../components";
import './Home.css';

const Home = () => {
    const [ searchValue, setSearchValue ] = useState ( '' );

    return (
        <main className='main'>
            <SearchBar setSearchValue={ setSearchValue }/>
            <BooksGrid searchValue={ searchValue }/>
        </main>
    );
};

export default Home;
