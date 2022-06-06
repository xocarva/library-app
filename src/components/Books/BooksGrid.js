import { Loading, Pagination } from '../../components';
import BookGridItem from './BooksGridItem';
import useFetch from '../../hooks/useFetch';
import { filterBooks } from '../../utils';
import { useEffect, useState } from 'react';
import CreateBook from './CreateBook';
import './BooksGrid.css';

const API_URL = process.env.REACT_APP_API_URL;

const BooksGrid = ({ searchValue, sortField, sortDir }) => {

    const { data, isLoading } = useFetch( API_URL + '/books' );

    const [ books, setBooks ] = useState ( [] );

    useEffect( () => {
        setBooks( filterBooks( data, searchValue ) );
    }, [ data, searchValue ]);

    const [ page, setPage ] = useState( 0 );
    const perPage = 7;
    const totalPages = Math.ceil( books?.length / perPage );

    if ( books && books.length > 0 && sortField ) {
        if (sortDir === 'asc') books.sort(( book1, book2 ) => book1[ sortField ] > book2[ sortField ] ? 1 : book1[ sortField ] < book2[ sortField ] ? -1 : 0 );
        else books.sort(( book1, book2) => book1[ sortField ] < book2[ sortField ] ? 1 : book1[ sortField ] > book2[ sortField ] ? -1 : 0 );
    }

    return (
        <>
            { isLoading && <Loading /> }

            { searchValue !=='' && books?.length < 1 && <p className='no-matches'>Your search doesn't match any field 😓</p> }

            <section className='book-card-grid'>
                {
                    books?.length > 0 &&
                    books?.slice( page * perPage, ( page + 1 ) * perPage ).map( ( book ) => {
                        return <BookGridItem key={ book.id } { ...book } setBooks={ setBooks } />
                        })
                }
                { !isLoading && <CreateBook setBooks={ setBooks } /> }
            </section>

            { !isLoading && books?.length > perPage && <Pagination page={ page } setPage={ setPage } totalPages={ totalPages } /> }

        </>
    );
};

export default BooksGrid;
