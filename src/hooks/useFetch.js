import { useEffect, useState } from 'react';

const useFetch = ( url, defaultValue = null ) => {

    const [ message, setMessage ] = useState( null );
    const [ data, setData ] = useState( defaultValue );
    const [ error, setError ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( false );

    useEffect(() => {

        const loadData = async () => {

            setIsLoading( true) ;
            const response = await fetch( url );
            const json = await response.json();


            if ( response && !response.ok ) {
                setError( json.error );
                setIsLoading( false );
                return;
            };

            setMessage( json.message );
            setData( json.data );
            setIsLoading( false );
        };

        loadData();

    }, [ url ] );

    return { message, data, error, isLoading };
};

export default useFetch;
