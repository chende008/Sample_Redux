import * as types from './types';

export const addRandom = (number) => ({type: types.RANDOM_ADD, data: number});

export const delRandom = (randomList, index) => {
    return dispatch => {
        randomList.splice(index, 1);
        dispatch({type: types.RANDOM_DEL, data: randomList});
    };
};
