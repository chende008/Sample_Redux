import * as types from '../actions/types';

const initState = {
    title: '',
    loading: true,
    canGoBack: false,
    url: 'https://www.baidu.com',
};

export default (state = initState, action) => {
    const {type, data} = action;
    switch (type) {
        case types.WEBVIEW_RELOAD_URL:
            return {...state, url: data};
        case types.WEBVIEW_RELOAD_INFO:
            return {...state, ...data};
        default:
            return state;

    }
}
