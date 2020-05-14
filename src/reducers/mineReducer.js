import * as types from '../actions/types';

export default (initState = '', action) => {
    let {type, data} = action;
    switch (type) {
        case types.MINE_MOVIES_LIST:
        case types.MINE_ANIMAL_LIST:
        case types.MINE_MEMBER_LIST:
        case types.MINE_CITY_LIST:
            return data;
        default:
            return initState;
    }
}
