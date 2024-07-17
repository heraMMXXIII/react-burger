import { dataLoad } from '../../utils/ingerdients-loads';

export const LOAD_DATA_START = "LOAD_DATA_START";
export const LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS";
export const LOAD_DATA_ERROR = "LOAD_DATA_ERROR";

export function loadIngredientsAction() {
    return function(dispatch) {
        dispatch({ type: LOAD_DATA_START });
        dataLoad()
        .then(data => {
            dispatch({ type: LOAD_DATA_SUCCESS, data: data });
        })
        .catch(err => {
            dispatch({ type: LOAD_DATA_ERROR });
        });
    }
}