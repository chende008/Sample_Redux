import {RFHttp} from 'react-native-fast-app';
import {Api} from '../common/http/Api';
import {showLoading, showToast} from '../common/widgets/Loading';
import * as types from './types';

export const moviesList = () => { //返回标准的json的http请求
    return dispatch => {
        RFHttp().url(Api.btcPrice).formJson().loadingFunc((loading) => showLoading('请求中，请稍候...', loading)).get((success, json, msg) => {
            if (success) {
                showToast('请求成功');
                dispatch({type: types.MINE_MOVIES_LIST, value: JSON.stringify(json)});
            } else {
                showToast(msg);
            }
        });
    };
};

export const animalImageList = () => { //返回标准的json的http请求
    return dispatch => {
        RFHttp().url(Api.animalImageList).get((success, json, msg, code) => {
            if (success) {
                showToast('请求成功');
                dispatch({type: types.MINE_ANIMAL_LIST, value: JSON.stringify(json)});
            } else {
                showToast(msg);
            }
        });
    };
};

export const queryMemberList = () => { // 同步请求数据
    return async dispatch => {
        let {success, json, message, status} = await RFHttp().url(Api.queryMembers).loadingFunc((loading) => showLoading('请求中，请稍候...', loading)).execute('GET');
        if (!success) {
            showToast(message);
        }
        dispatch({type: types.MINE_MEMBER_LIST, value: JSON.stringify(json)});
    };
};

export const getCityList = () => { //查询各城市Mobile服务数量
    return dispatch => {
        RFHttp().url(Api.queryCitiesAmount)
            .contentType('text/xml; charset=utf-8')
            .loadingFunc((loading) => showLoading('请求中，请稍候...', loading))
            .pureText().get((success, data, msg) => {
            if (success) {
                dispatch({type: types.MINE_CITY_LIST, value: data});
            } else {
                showToast(msg);
            }
        });
    };
};
