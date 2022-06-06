import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import './SortMenu.css';

const SortMenu = ({ sortField, setSortField, sortDir, setSortDir }) => {

    return (
        <div className="sort-menu">
            <span>Sort by:</span>
            <select className='sort-select' name='sort-select' value={ sortField } onChange={ e => setSortField( e.target.value ) }>
                <option value='title'>title</option>
                <option value='author'>author</option>
                <option value='genre'>genre</option>
                <option value='publisher'>publisher</option>
                <option value='releaseYear'>release year</option>
                <option value='isbn'>isbn</option>
            </select>
            <div className='sort-dir'>
                <AiOutlineArrowUp className= { sortDir === 'asc' ? 'sort-dir-icons selected' : 'sort-dir-icons' } title='asc' onClick={ () => setSortDir( 'asc' )} />
                <AiOutlineArrowDown className={  sortDir === 'desc' ? 'sort-dir-icons selected' : 'sort-dir-icons' } title='desc' onClick={ () => setSortDir( 'desc' )} />
            </div>
        </div>
    );
};

export default SortMenu;
