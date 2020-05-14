import * as types from './types';

export const addRandom = (randomList, number) => {
    return dispatch => {
        randomList.push(number);
        dispatch({type: types.RANDOM_ADD, data: randomList});
    };
};

export const delRandom = (randomList, index) => {
    return dispatch => {
        randomList.splice(index, 1);
        dispatch({type: types.RANDOM_DEL, data: randomList});
    };
};
