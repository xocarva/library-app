export const validateTitle = ( title ) => {

    const titleRegex = /^[0-9A-Za-zaáÁéÉíÍóÓúÚ\u00f1\u00d1\s]+$/;

    if( title?.length < 1 || title?.length >= 50 || !titleRegex.test( title ) ) {
        return false;

    } else return true;

};

export const validateAuthor = ( author ) => {

    const authorRegex = /^[A-Za-zaáÁéÉíÍóÓúÚ\u00f1\u00d1\s]+$/;

    if( author?.length < 2 || author?.length >= 50 || !authorRegex.test( author ) ) {
        return false;

    } else return true;

};

export const validatePublisher = ( publisher ) => {

    const publisherRegex = /^[A-Za-zaáÁéÉíÍóÓúÚ\u00f1\u00d1\s]+$/;

    if( publisher?.length < 2 || publisher?.length >= 50 || !publisherRegex.test( publisher ) ) {
        return false;

    } else return true;

};

export const validateRelease = ( releaseYear ) => {
    const currentYear = new Date().getFullYear();
    if( releaseYear < 1900 || releaseYear > currentYear ) {
        return false;

    } else return true;

};

export const validateIsbn = ( isbn ) => {

    const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

    if( !isbnRegex.test( isbn ) ) {
        return false;

    } else return true;

};
