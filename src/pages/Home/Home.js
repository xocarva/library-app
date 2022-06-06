import { useState } from "react";
import { BooksGrid, SearchBar, SortMenu } from "../../components";
import './Home.css';

const Home = () => {
    const [ searchValue, setSearchValue ] = useState ( '' );
    const [ sortField, setSortField ] = useState( 'title' );
    const [ sortDir, setSortDir ] = useState( 'asc' );

    return (
        <main className='main'>
            <SearchBar setSearchValue={ setSearchValue }/>
            <SortMenu sortField={ sortField } setSortField={ setSortField } sortDir={ sortDir } setSortDir={ setSortDir } />
            <BooksGrid searchValue={ searchValue } sortField={ sortField } sortDir={ sortDir }/>
        </main>
    );
};

export default Home;
