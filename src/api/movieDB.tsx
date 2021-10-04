import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        'api_key': '1a3238599376235654f46d5580306c76',
        'language': 'es-MX'
    }
});

export default movieDB;
