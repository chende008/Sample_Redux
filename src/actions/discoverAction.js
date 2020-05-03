import {DISCOVER_QUERY} from './types';
import {RFHttp} from 'react-native-fast-app';
import {Api} from '../common/http/Api';
import {netWorkException} from '../common/utils/Utils';
import {showToast} from '../common/widgets/Loading';

export const queryDataList = (isPullDown, pageIndex, refreshList, dataList) => {
    return dispatch => {
        refreshList.refreshPreLoad(isPullDown);
        let params = {page: isPullDown ? 1 : pageIndex + 1};
        RFHttp().param(params)
            .url(Api.queryAnimations)
            .get((success, {results, last_page}, msg, code) => {
                refreshList.refreshLoaded(success, isPullDown, params.page >= last_page, netWorkException(code));
                if (success) {
                    dispatch({
                        type: DISCOVER_QUERY, value: {
                            pageIndex: params.page,
                            dataList: isPullDown ? results : [...dataList, ...results],
                        },
                    });
                } else {
                    showToast(msg);
                }
            });
    };
};
