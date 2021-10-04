import movieDB from '../api/movieDB';
import { useEffect, useState } from 'react';
import { MovieFull } from '../interfaces/movieInterface';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}

export const useMovieDetails = (movieID: number) => {

    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });

    const getMovieDetails = async() => {

        const movieDetailsPromise =  movieDB.get<MovieFull>(`/${ movieID }`);
        const castsPromise =  movieDB.get<CreditsResponse>(`/${ movieID }/credits`);

        const [ movieDetailsResp, castResp ] = await Promise.all([movieDetailsPromise, castsPromise]);

        setState({
            isLoading: false,
            movieFull: movieDetailsResp.data,
            cast: castResp.data.cast
        });
    };

    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...state
    };

};
