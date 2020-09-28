import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};
export const purchaseBurgerStart = (ordrData) => {
    return dispatch =>  {
        axios.post('/orders.json', ordrData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data, ordrData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error))
            });
    }
};
