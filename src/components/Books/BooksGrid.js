import { Loading } from '../../components';
import BookGridItem from './BooksGridItem';
import useFetch from '../../hooks/useFetch';
import { filterBooks } from '../../utils';
import { useEffect, useState } from 'react';
import './BooksGrid.css';


const API_URL = process.env.REACT_APP_API_URL;

const BooksGrid = ({ searchValue }) => {

    const { data, isLoading } = useFetch( API_URL + '/books' );

    const [ books, setBooks ] = useState ( [] );

    useEffect( () => {
        setBooks( filterBooks( data, searchValue ) );
    }, [ data, searchValue ]);

    return (
        <>
            { isLoading && <Loading /> }

            { searchValue !=='' && books?.length < 1 && <p className='no-matches'>No matches found 😓</p> }

            <section className='book-card-grid'>
                {
                    books?.length > 0 &&
                    books?.map( ( book ) => {
                        return <BookGridItem key={ book.id } { ...book } setBooks={ setBooks } />
                        })
                }

            </section>
        </>
    );
};

export default BooksGrid;
