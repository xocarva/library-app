const filterBooks = ( books, searchValue ) => {

    if ( !searchValue ) return books;

    const filteredBooks = books?.filter( b => {
        let match = false;
        if ( b.author.toLowerCase().includes( searchValue.toLowerCase() )) match = true;
        if ( b.title.toLowerCase().includes( searchValue.toLowerCase() )) match = true;
        if ( b.genre.toLowerCase().includes( searchValue.toLowerCase() )) match = true;
        if ( b.publisher.toLowerCase().includes( searchValue.toLowerCase() )) match = true;
        if ( b.releaseYear.toString().startsWith( searchValue )) match = true;
        if ( b.isbn.startsWith( searchValue )) match = true;
        return match
    });

    return filteredBooks;
};

export default filterBooks;