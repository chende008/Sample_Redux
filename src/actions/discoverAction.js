import {DISCOVER_QUERY_ADD, DISCOVER_QUERY_RESET} from './types';
import {XHttp} from 'react-native-easy-app';
import {Api} from '../common/http/Api';
import {netWorkException} from '../common/utils/Utils';
import {showToast} from '../common/widgets/Loading';

export const queryDataList = (isPullDown, pageIndex, refreshList, dataList) => {
    return dispatch => {
        refreshList.refreshPreLoad(isPullDown);
        let params = {page: isPullDown ? 1 : pageIndex + 1};
        XHttp().param(params).url(Api.queryAnimations).get((success, {results, last_page}, msg, code) => {
            refreshList.refreshLoaded(success, isPullDown, params.page >= last_page, netWorkException(code));
            if (success) {
                dispatch({
                    type: isPullDown ? DISCOVER_QUERY_RESET : DISCOVER_QUERY_ADD,
                    data: {pageIndex: params.page, dataList: results},
                });
            } else {
                showToast(msg);
            }
        });
    };
};
