import { FaEdit, FaSave } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { GrPowerReset } from 'react-icons/gr';
import { IoMdExit } from 'react-icons/io';
import { getGenreIcon } from '../../utils';
import './BooksGridItem.css';
import { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;


const BooksGridItem = ({ id, title, author, genre, publisher, releaseYear, isbn, setBooks }) => {

    const [ edit, setEdit ] = useState( false );

    const [ titleHolder, setTitleHolder ] = useState( title );
    const [ authorHolder, setAuthorHolder ] = useState( author );
    const [ genreHolder, setGenreHolder ] = useState( genre );
    const [ publisherHolder, setPublisherHolder ] = useState( publisher );
    const [ releaseHolder, setReleaseHolder ] = useState( releaseYear );
    const [ isbnHolder, setIsbnHolder ] = useState( isbn );


    const [ bookTitle, setBookTitle ] = useState('');
    const [ bookAuthor, setBookAuthor ] = useState('');
    const [ bookGenre, setBookGenre ] = useState('');
    const [ bookPublisher, setBookPublisher ] = useState('');
    const [ bookRelease, setBookRelease ] = useState('');
    const [ bookIsbn, setBookIsbn ] = useState('');



    const resetValues = () => {
        setBookTitle('');
        setBookAuthor('');
        setBookGenre('');
        setBookPublisher('');
        setBookRelease('');
        setBookIsbn('');
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        resetValues();
        setEdit( false );
    };

    const handleReset = () => resetValues();

    const handleBack = () => {
        resetValues();
        setEdit( false );
    };


    const handleDelete = async () => {

        if ( window.confirm('Delete book?') ) {
            const res = await fetch(API_URL + '/books/' + id, {
                method: 'DELETE',
                })
                if ( res.ok ) {
                        setBooks( currentList => {
                                return currentList.filter( book => book.id !== id );
                        });
                };
        }

    };

    return (
          <article className='book-card' tabIndex='0'>
            <section className={ `cover ${ genre }`}>
                <span className='genre' title={ genre }>{ getGenreIcon( genre ) }</span>
                <h2 className={ `book-title` } title='book title'>{ title } </h2>
                <span className='author' title='author'>{ author }</span>
            </section>
            <section className="details">
                { !edit ?
                    <>
                        <span className={ `book-title` } title='book title'>{ title }</span>
                        <span className='author' title='author'>Author: { author }</span>
                        <span className='genre' title='genre'>Genre: { genre }</span>
                        <span className='published' title='published'>Published by { publisher } on { releaseYear }</span>
                        <span className='isbn' title='isbn'>ISBN: { isbn }</span>
                    </>
                    :   <form className='edit-book-form' onSubmit={ handleSubmit }>
                            <input type='text' placeholder={ titleHolder } value={ bookTitle } onChange={ e => setBookTitle( e.target.value ) }></input>
                            <input type='text' placeholder={ authorHolder } value={ bookAuthor } onChange={ e => setBookAuthor( e.target.value )}></input>
                            <input type='text' placeholder={ genreHolder } value={ bookGenre } onChange={ e => setBookGenre( e.target.value )}></input>
                            <input type='text' placeholder={ publisherHolder } value={ bookPublisher } onChange={ e => setBookPublisher( e.target.value )}></input>
                            <input type='text' placeholder={ releaseHolder } value={ bookRelease } onChange={ e => setBookRelease( e.target.value )}></input>
                            <input type='text' placeholder={ isbnHolder } value={ bookIsbn } onChange={ e => setBookIsbn( e.target.value )}></input>
                            <div className='edit-buttons'>
                                <button type='submit' className='save-button' title='edit'><FaSave /></button>
                                <button type='reset' onClick={ handleReset }><GrPowerReset /></button>
                                <button onClick={ handleBack }><IoMdExit /></button>
                            </div>
                        </form>
                }

                <div className='card-buttons'>
                    { !edit &&
                        <>
                            <span className='edit-button' title='edit' onClick={ () => setEdit( prev => !prev )}><FaEdit /></span>
                            <span className='delete-button' title='delete' onClick={ handleDelete }><AiFillDelete /></span>
                        </>
                    }
                </div>
            </section>

          </article>
    );
};

export default BooksGridItem;
