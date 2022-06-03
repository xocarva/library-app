import { Loading, Pagination } from '../../components';
import BookGridItem from './BooksGridItem';
import useFetch from '../../hooks/useFetch';
import { filterBooks } from '../../utils';
import { useEffect, useState } from 'react';
import CreateBook from './CreateBook';
import './BooksGrid.css';


const API_URL = process.env.REACT_APP_API_URL;

const BooksGrid = ({ searchValue }) => {

    const { data, isLoading } = useFetch( API_URL + '/books' );

    const [ books, setBooks ] = useState ( [] );

    useEffect( () => {
        setBooks( filterBooks( data, searchValue ) );
    }, [ data, searchValue ]);

    const [ page, setPage ] = useState( 0 );
    const perPage = 4;
    const totalPages = Math.ceil( books?.length / perPage );

    return (
        <>
            { isLoading && <Loading /> }
            { !isLoading && books?.length > 0 && <Pagination page={ page } setPage={ setPage } totalPages={ totalPages } /> }


            { searchValue !=='' && books?.length < 1 && <p className='no-matches'>Your search doesn't match any field 😓</p> }

            <section className='book-card-grid'>
                {
                    books?.length > 0 &&
                    books?.slice( page * perPage, ( page + 1 ) * perPage ).map( ( book ) => {
                        return <BookGridItem key={ book.id } { ...book } setBooks={ setBooks } />
                        })
                }
                <CreateBook setBooks={ setBooks } />
            </section>

        </>
    );
};

export default BooksGrid;
