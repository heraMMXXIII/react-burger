import { orderCreate } from '../../utils/order-create';

export const CREATE_ORDER_START = "CREATE_ORDER_START";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";
export const CLEAR_ORDER = "CLEAR_ORDER";

export function createOrderAction(ingredients) {
    return function(dispatch) {
        dispatch({ type: CREATE_ORDER_START });
        orderCreate(ingredients)
        .then(data => {
            dispatch({ type: CREATE_ORDER_SUCCESS, orderNumber: data });
        })
        .catch(err => {
            dispatch({ type: CREATE_ORDER_ERROR });
        });
    }
}