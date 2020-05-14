import * as types from './types';

export const reloadPage = (url) => ({type: types.WEBVIEW_RELOAD_URL, data: url});

export const reloadInfo = (pageInfo) => {
    return ({type: types.WEBVIEW_RELOAD_INFO, data: pageInfo});
};
