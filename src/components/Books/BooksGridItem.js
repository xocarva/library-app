import { FaEdit, FaSave } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { GrPowerReset } from 'react-icons/gr';
import { IoMdExit } from 'react-icons/io';
import { getGenreIcon } from '../../utils';
import { useState } from 'react';
import { validateAuthor, validateIsbn, validatePublisher, validateRelease, validateTitle } from '../../utils/validateData';
import './BooksGridItem.css';

const API_URL = process.env.REACT_APP_API_URL;

const BooksGridItem = ({ id, title, author, genre, publisher, releaseYear, isbn, setBooks }) => {

    const [ edit, setEdit ] = useState( false );

    const [ titleHolder, setTitleHolder ] = useState( title );
    const [ authorHolder, setAuthorHolder ] = useState( author );
    const [ publisherHolder, setPublisherHolder ] = useState( publisher );
    const [ releaseHolder, setReleaseHolder ] = useState( releaseYear );
    const [ isbnHolder, setIsbnHolder ] = useState( isbn );


    const [ bookTitle, setBookTitle ] = useState('');
    const [ bookAuthor, setBookAuthor ] = useState('');
    const [ bookGenre, setBookGenre ] = useState( genre );
    const [ bookPublisher, setBookPublisher ] = useState('');
    const [ bookRelease, setBookRelease ] = useState('');
    const [ bookIsbn, setBookIsbn ] = useState('');

    const [ error, setError]  = useState('');

    const resetValues = () => {
        setBookTitle('');
        setBookAuthor('');
        setBookGenre('');
        setBookPublisher('');
        setBookRelease('');
        setBookIsbn('');
        setError( '' );
    };

    const validateData = () => {
        if( bookTitle && !validateTitle( bookTitle ) ) {
            setError( 'Title must have between 1 and 40 letters' );
            document.getElementById( 'edit-title' ).focus();
            return false;
        }

        if( bookAuthor && !validateAuthor( bookAuthor ) ) {
            setError( 'Author must have between 1 and 40 letters' );
            document.getElementById( 'edit-author' ).focus();
            return false;
        }

        if( bookPublisher && !validatePublisher( bookPublisher ) ) {
            setError( 'Publisher must have between 2 and 40 letters' );
            document.getElementById( 'edit-publisher' ).focus();
            return false;
        }

        if( bookRelease && !validateRelease( bookRelease ) ) {
            setError( `Release year must be between 1900 and ${ new Date().getFullYear() }` );
            document.getElementById( 'edit-release' ).focus();
            return false;
        }

        if( bookIsbn && !validateIsbn( bookIsbn ) ) {
            setError( 'Invalid ISBN format' );
            document.getElementById( 'edit-isbn' ).focus();
            return false;
        }

        setError( '' );
        return true;
    };

    const handleSubmit = async ( e ) => {

        e.preventDefault();

        if( !validateData() ) return;

        if( bookTitle || bookAuthor || bookGenre || bookPublisher || bookRelease || bookIsbn ) {

            try {

                let body = {};
                if( bookTitle ) body.title = bookTitle;
                if( bookAuthor ) body.title = bookAuthor;
                if( bookGenre ) body.genre = bookGenre;
                if( bookPublisher ) body.publisher = bookPublisher;
                if( bookRelease ) body.releaseYear = bookRelease;
                if( bookIsbn ) body.isbn = bookIsbn;

                const res = await fetch( API_URL + `/books/${ id }`, {
                    method: 'PATCH',
                    headers: {
                        Accept:'application/json',
                            'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( body ),
                });

                if( res.ok ) {
                    const { data:book } = await res.json();

                    setTitleHolder( book.title );
                    setAuthorHolder( book.author );
                    setBookGenre( book.genre );
                    setPublisherHolder( book.publisher );
                    setReleaseHolder( book.releaseYear );
                    setIsbnHolder( book.isbn );

                    setBooks( currentList => {
                        return currentList.map( b => {
                            return b.id === id ? book : b;
                        });
                    });

                    resetValues();
                    setEdit( false );

                } else {
                    const { error } = await res.json();
                    setError( error );
                }
            } catch ( error ) {
                setError( error );
            }
        }

    };

    const handleReset = () => resetValues();

    const handleBack = () => {
        resetValues();
        setEdit( false );
    };

    const handleDelete = async () => {

        if ( window.confirm('Delete book?') ) {
            try {
                const res = await fetch(API_URL + '/books/' + id, {
                    method: 'DELETE',
                    })
                    if ( res.ok ) {
                            setBooks( currentList => {
                                    return currentList.filter( book => book.id !== id );
                            });
                    } else {
                        const { error } = res.json();
                        alert( error );
                    }
            } catch ( error ) {
                alert( error );
            }
        }
    };

    return (
          <article className='book-card' tabIndex='0'>
            <section className={ `cover ${ genre }`}>
                <span className='genre-tag' title={ genre }>{ getGenreIcon( genre ) }</span>
                <h2 className={ `book-title` } title='book title'>{ title } </h2>
                <span className='author' title='author'>{ author }</span>
            </section>
            <section className="details">
                { !edit ?
                    <>
                        <span className={ `book-title` } title='book title'>{ title }</span>
                        <span className='author' title='author'>Author: { author }</span>
                        <span className='genre' title='genre'>Genre: { genre }</span>
                        <span className='published' title='published'>Published by { publisher } in { releaseYear }</span>
                        <span className='isbn' title='isbn'>ISBN: { isbn }</span>
                    </>
                    :   <>
                            <form className='edit-book-form' onSubmit={ handleSubmit }>
                                <input id='edit-title' type='text' placeholder={ titleHolder } value={ bookTitle }
                                    onChange={ e => {
                                        setBookTitle( e.target.value );
                                        setError('');
                                    }}>
                                </input>
                                <input id='edit-author' type='text' placeholder={ authorHolder } value={ bookAuthor }
                                    onChange={ e => {
                                        setBookAuthor( e.target.value );
                                        setError('');
                                    }}>
                                </input>
                                <select name='genre' value={ bookGenre } onChange={ e => setBookGenre( e.target.value ) }>
                                    <option value='fantasy'>fantasy</option>
                                    <option value='sci-fi'>sci-fi</option>
                                    <option value='historical'>historical</option>
                                    <option value='romance'>romance</option>
                                    <option value='biography'>biography</option>
                                    <option value='comedy'>comedy</option>
                                    <option value='thriller'>thriller</option>
                                    <option value='essay'>essay</option>
                                    <option value='others'>others</option>
                                </select>
                                <input id='edit-publisher' type='text' placeholder={ publisherHolder } value={ bookPublisher }
                                    onChange={ e => {
                                        setBookPublisher( e.target.value );
                                        setError('');
                                    }}>
                                </input>
                                <input id='edit-release' type='number' placeholder={ releaseHolder } value={ bookRelease }
                                    onChange={ e => {
                                        setBookRelease( e.target.value );
                                        setError('');
                                    }}>
                                </input>
                                <input id='edit-isbn' type='text' placeholder={ isbnHolder } value={ bookIsbn }
                                    onChange={ e => {
                                        setBookIsbn( e.target.value );
                                        setError('');
                                    }}>
                                </input>
                                <div className='edit-buttons'>
                                    <button type='submit' className='save-button' title='save'><FaSave /></button>
                                    <button type='reset' title='reset' onClick={ handleReset }><GrPowerReset /></button>
                                    <button title='back' onClick={ handleBack }><IoMdExit /></button>
                                </div>
                            </form>
                            { error && <span className='edit-book-error'>{ error }</span> }
                        </>

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
