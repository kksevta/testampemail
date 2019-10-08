import request from "request";
import rp, { RequestPromiseOptions } from 'request-promise';

const cookie = request.cookie("_session_tid=8de0a6e01204a98c4e50bce76a0719466fddc8728e369076708220e77bf1da0b38c96bb0e1dd359815aa49c1aef3f5e5f23be32bb916ff4235e9a841efcf70acd0bcd70bc3e806775be2bcbfc3186b9648ea2694f4418ae924067b65da4774cf540b9e6664a315173b49a7cb0aef5491");
// var cookie = request.cookie('__SW=OsaEdUDnZhsrlLNNP2nFVqt5O0EPCJ8y; _device_id=f3d14fb5-682b-4d7b-b6dc-8d576b53e1a0; _session_tid=8de0a6e01204a98c4e50bce76a0719466fddc8728e369076708220e77bf1da0b38c96bb0e1dd359815aa49c1aef3f5e5f23be32bb916ff4235e9a841efcf70acd0bcd70bc3e806775be2bcbfc3186b9648ea2694f4418ae924067b65da4774cf540b9e6664a315173b49a7cb0aef5491; userLocation={%22lat%22:12.9282406%2C%22lng%22:77.6920646%2C%22address%22:%22Unnamed%20Road%2C%20Devarabisanahalli%2C%20Bellandur%2C%20Bengaluru%2C%20Karnataka%20560103%2C%20India%22%2C%22area%22:%22Bellandur%22%2C%22id%22:%22%22}; dadl=true; deliveryAddressId=; _sid=ipn05625-544d-4eb6-8be6-260a1ad826f0');
const UserAgent = "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Mobile Safari/537.36"
const baseURL = 'https://swiggy.com/mapi';
type rpOptions = RequestPromiseOptions & { url: string }

const sendRequest = (endpoint: any, type: any, data: any, sessionID: any) => {

    const headers = {
        "Content-Type": "application/json",
        "Cookie": request.cookie("_session_tid=" + sessionID),
        // 'Sec-Fetch-Mode': 'cors',
        // 'Referer': 'https://www.swiggy.com/restaurants',
        // usecache: true,
        "User-Agent": UserAgent
    };
    let options: rpOptions = {
        url: baseURL + endpoint,
        method: type,
        headers: headers,
    };
    if (type === 'GET') {
        options.qs = data
    } else if (type === 'POST') {
        options.body = data
    }
    return rp(options)
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err
        });
}


export { sendRequest }