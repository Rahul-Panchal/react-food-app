
export const fetchNewsRequest = () => {
    return {
        type: 'FETCH_NEWS_REQUEST'
    }
}

export const setNews = news => {
    return {
        type: 'FETCH_NEWS_SUCCESS',
        payload: news,
    };
};

export const fetchNewsFailure = error => {
    return {
        type: 'FETCH_COUNTRIES_FAILURE',
        payload: error
    }
}