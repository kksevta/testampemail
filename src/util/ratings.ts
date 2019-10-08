import { sendRequest } from './perform-request';

export const getRatingTemplateData = (orderID: number, sessionID: string) => {
    return new Promise((resolve, reject) => {
        sendRequest('/order/ratings', 'GET', { order_id: orderID, rating_type: 'restaurant' }, sessionID).then((response) => {
            response = JSON.parse(response)
            let ratingTemplateData: any = {};
            if (response && response.data) {
                ratingTemplateData.alreadyRated = !!response.data.already_rated;
                ratingTemplateData.restaurantName = response.data.restaurant_name;
            }
            resolve(ratingTemplateData)
        }).catch((error) => {
            reject(error)
        })
    })
}