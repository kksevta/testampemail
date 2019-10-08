import express from "express";
import { Request, Response, NextFunction } from "express";
import ejs from "ejs";
const testRouter = express.Router();
import request from "request";
import { sendRequest } from '../util/perform-request';
testRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    // const demo = ejs.render('pages/layout', { people: people });
    // res.send(demo)
    //https://andidittrich.de/2018/01/ejs-express-js-with-global-template-variables.html
    // ejs.renderFile('C:\\Users\\Kuldeep\\Desktop\\amp4email\\views\\pages\\layout.ejs', {}, {}, function (err, str) {
    //     // str => Rendered HTML string

    //     res.send('sads')
    // });
    // ejs.renderFile(__dirname + "/testing.ejs", function (err, data) {
    //     console.log(err || data);
    //     res.send(err || data);
    // });
    res.render("pages/layout");
});

testRouter.get("/getres", (req: Request, res: Response, next: NextFunction) => {
    // const demo = ejs.render('pages/layout', { people: people });
    // res.send(demo)
    //https://andidittrich.de/2018/01/ejs-express-js-with-global-template-variables.html
    // ejs.renderFile('C:\\Users\\Kuldeep\\Desktop\\amp4email\\views\\pages\\layout.ejs', {}, {}, function (err, str) {
    //     // str => Rendered HTML string

    //     res.send('sads')
    // });
    // ejs.renderFile(__dirname + "/testing.ejs", function (err, data) {
    //     console.log(err || data);
    //     res.send(err || data);
    // });
    // const cookie = request.cookie("_session_tid=8de0a6e01204a98c4e50bce76a0719466fddc8728e369076708220e77bf1da0b38c96bb0e1dd359815aa49c1aef3f5e5f23be32bb916ff4235e9a841efcf70acd0bcd70bc3e806775be2bcbfc3186b9648ea2694f4418ae924067b65da4774cf540b9e6664a315173b49a7cb0aef5491");

    // // var cookie = request.cookie('__SW=OsaEdUDnZhsrlLNNP2nFVqt5O0EPCJ8y; _device_id=f3d14fb5-682b-4d7b-b6dc-8d576b53e1a0; _session_tid=8de0a6e01204a98c4e50bce76a0719466fddc8728e369076708220e77bf1da0b38c96bb0e1dd359815aa49c1aef3f5e5f23be32bb916ff4235e9a841efcf70acd0bcd70bc3e806775be2bcbfc3186b9648ea2694f4418ae924067b65da4774cf540b9e6664a315173b49a7cb0aef5491; userLocation={%22lat%22:12.9282406%2C%22lng%22:77.6920646%2C%22address%22:%22Unnamed%20Road%2C%20Devarabisanahalli%2C%20Bellandur%2C%20Bengaluru%2C%20Karnataka%20560103%2C%20India%22%2C%22area%22:%22Bellandur%22%2C%22id%22:%22%22}; dadl=true; deliveryAddressId=; _sid=ipn05625-544d-4eb6-8be6-260a1ad826f0');

    // // Set the headers for the request
    // const headers = {
    //     "Content-Type": "application/json",
    //     "Cookie": cookie,
    //     // 'Sec-Fetch-Mode': 'cors',
    //     // 'Referer': 'https://www.swiggy.com/restaurants',
    //     // usecache: true,
    //     "User-Agent": "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Mobile Safari/537.36"
    // };
    // // Configure the request
    // const options = {
    //     url: "https://swiggy.com/mapi/order/ratings?order_id=52658542749&rating_type=restaurant",
    //     method: "GET",
    //     headers: headers
    // };

    // // Start the request
    // request(options, function (error, response, body) {
    //     if (!error && response.statusCode === 200) {
    //         // Print out the response body
    //         res.send({ status: 0, statusDsc: "success", data: body });
    //     } else {
    //         console.log(response);
    //         res.send({ status: 2, statusDsc: JSON.stringify(error) });
    //     }
    // });

    sendRequest('/order/ratings', 'GET', { order_id: 52658542749, rating_type: 'restaurant' }).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send(error)
    })
});

export { testRouter };