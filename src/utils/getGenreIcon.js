const getGenreIcon = ( genre ) => {

    let icon;
    switch ( genre ) {
        case 'fantasy':
                icon = '🦄'
                break;
        case 'sci-fi':
                icon = '🚀'
                break;
        case 'historical':
                icon = '📜'
                break;
        case 'biography':
                icon = '👩'
                break;
        case 'comedy':
                icon = '🤣';
                break;
        case 'thriller':
                icon = '🕵️'
                break;
        case 'essay':
                icon = '🗣️'
                break;
        case 'others':
                icon = '🤷'
                break;
        default:
            break;
    }
    return icon;
};

export default getGenreIcon;
