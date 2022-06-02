import './SearchBar.css';

const SearchBar = ({ setSearchValue }) => {

    return (
        <div className="search-box-container">
            <input className="search-box" onChange={ e => setSearchValue( e.target.value ) }/>
            <span className='search-icon'>🔍</span>
        </div>
    );
};

export default SearchBar;
