import { getGenreIcon } from '../../utils';
import './BooksGridItem.css';

const API_URL = process.env.REACT_APP_API_URL;


const BooksGridItem = ({ id, title, author, genre, publisher, releaseYear, isbn, setBooks }) => {

        const handleDelete = async e => {
                const res = await fetch(API_URL + '/books/' + id, {
                    method: 'DELETE',
                })
                if ( res.ok ) {
                        setBooks(currentList => {
                                return currentList.filter( book => book.id !== id );
                        });
                };
        };

    return (
        <article className={ `book-card ${genre}` }>
            <span className='genre' title={ genre }>{ getGenreIcon( genre ) }</span>
            <h2 className={ `card-title` } title='book title'>{ title }</h2>
            <div className='card-body'>
                <div className='author-release'>
                    <span className='author' title='author'>✍ { author }</span>
                    <span className='release' title='release year'>📅 { releaseYear }</span>
                </div>
                <div className='publisher' title='publisher'>📚 { publisher }</div>
                <div className='isbn' title='isbn'>{ isbn }</div>
            </div>
            <div className='card-buttons'>
                    <span className='edit-button' title='edit'>✂️</span>
                    <span className='delete-button' title='delete' onClick={ handleDelete }>🗑️</span>
            </div>
        </article>
    );
};

export default BooksGridItem;
