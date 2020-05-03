import * as types from './types';
import {dateFormat} from '../common/utils/DateUtils';
import {RNStorage} from '../common/storage/AppStorage';

export const getStr = (str) => ({type: types.STORAGE_GET_STR, value: str + dateFormat(new Date(), 'yyyy-MM-dd hh:mm')});

export const getJson = () => ({type: types.STORAGE_GET_JSON, value: JSON.stringify(RNStorage.json)});

export const raiseCount = (count) => ({type: types.STORAGE_UPDATE_COUNT, value: count + 1});
