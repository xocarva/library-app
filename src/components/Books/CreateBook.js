import { useState } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';
import { IoMdExit } from 'react-icons/io';
import { validateAuthor, validateIsbn, validatePublisher, validateRelease, validateTitle } from '../../utils/validateData';
import './CreateBook.css';

const API_URL = process.env.REACT_APP_API_URL;

const CreateBook = ({ setBooks }) => {

    const [ edit, setEdit ] = useState( false );
    const [ title, setTitle ] = useState('');
    const [ author, setAuthor ] = useState('');
    const [ genre, setGenre ] = useState('fantasy');
    const [ publisher, setPublisher ] = useState('');
    const [ release, setRelease ] = useState('');
    const [ isbn, setIsbn ] = useState('');
    const [ error, setError ] = useState('');


    const validateData = () => {
        if( title && !validateTitle( title ) ) {
            setError( 'Title must have between 1 and 50 letters' );
            document.getElementById( 'title' ).focus();
            return false;
        }

        if( author && !validateAuthor( author ) ) {
            setError( 'Author must have between 1 and 50 letters' );
            document.getElementById( 'author' ).focus();
            return false;
        }

        if( publisher && !validatePublisher( publisher ) ) {
            setError( 'Publisher must have between 2 and 50 letters' );
            document.getElementById( 'publisher' ).focus();
            return false;
        }

        if( release && !validateRelease( +release ) ) {
            setError( `Release year must be between 1900 and ${ new Date().getFullYear() }` );
            document.getElementById( 'release' ).focus();
            return false;
        }

        if( isbn && !validateIsbn( isbn ) ) {
            setError( 'Invalid ISBN format' );
            document.getElementById( 'isbn' ).focus();
            return false;
        }

        setError( '' );
        return true;
    };

    const resetValues = () => {
        setTitle('');
        setAuthor('');
        setGenre('fantasy');
        setPublisher('');
        setRelease('');
        setIsbn('');
        setError( '' );
    };

    const handleSubmit = async ( e ) => {

        e.preventDefault();

        if( !validateData() ) return;

        try {
            const body = {
                title,
                author,
                genre,
                publisher,
                releaseYear: release,
                isbn,
            };

            const res = await fetch( API_URL + '/books/', {
                method: 'POST',
                headers: {
                    Accept:'application/json',
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify( body ),
            });
            if( res.ok ) {
                const { data } = await res.json();

                setBooks( books => [ ...books, { ...body, id:data.bookId } ] );

                resetValues();
                setEdit( false );
                window.alert( `${ title } has been created.` );
            } else {
                const { error } = await res.json();
                setError( error );
            }
        } catch ( error ) {
            setError( error );
        }

    };

    const handleReset = () => resetValues();

    const handleBack = () => {
        resetValues();
        setEdit( false );
    };


    return (
        <article className='new-book'>
            {
                !edit ? <span className='new-book-button' title='add new book' onClick={() => setEdit( true )}><AiFillFileAdd /></span>
                :  <>
                    <form className='new-book-form' onSubmit={ handleSubmit }>
                        <input id='title' type='text' placeholder='title' value={ title }
                            onChange={ e => {
                                setTitle( e.target.value );
                                setError('');
                            }}>
                        </input>
                        <input id='author' type='text' placeholder='author' value={ author }
                            onChange={ e => {
                                setAuthor( e.target.value );
                                setError('');
                            }}>
                        </input>
                        <select name='genre' value={ genre } onChange={ e => setGenre( e.target.value ) }>
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
                        <input id='publisher' type='text' placeholder='publisher' value={ publisher }
                            onChange={ e => {
                                setPublisher( e.target.value );
                                setError('');
                            }}>
                        </input>
                        <input id='release' type='number' placeholder='release' value={ release }
                            onChange={ e => {
                                setRelease( e.target.value );
                                setError('');
                            }}>
                        </input>
                        <input id='isbn' type='text' placeholder='ISBN' value={ isbn }
                            onChange={ e => {
                                setIsbn( e.target.value );
                                setError('');
                            }}>
                        </input>
                        <div className='create-buttons'>
                            <button type='submit' className='save-button' title='save'><FaSave /></button>
                            <button type='reset' title='reset' onClick={ handleReset }><GrPowerReset /></button>
                            <button title='back' onClick={ handleBack }><IoMdExit /></button>
                        </div>
                        { error && <span className='new-book-error'>{ error }</span> }
                    </form>
                </>
            }
        </article>
    );
};

export default CreateBook;