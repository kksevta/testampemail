import express from "express";
import { Request, Response, NextFunction } from "express";
import { sendRequest } from '../util/perform-request';

const ratingsRouter = express.Router();


ratingsRouter.use('/', function (req, res, next) {
    if (req.query.__amp_source_origin) {
        // let origin ='https://mail.google.com'
        // let sourceOrigin ='kuldeep.kumar.web@gmail.com';

        // let origin ='https://amp.gmail.dev'
        // let sourceOrigin ='amp@gmail.dev'; 

        let origin = req.headers['origin']
        let sourceOrigin = req.query['__amp_source_origin'];

        //https://amp.dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests/?format=websites
        if (req.headers['amp-same-origin'] === 'true') {
            origin = req.query.__amp_source_origin;
            sourceOrigin = origin;
        }

        // you can also validate that request came from Gmail using proxy assertion token
        // const proxyAssertionToken = req.get('Amp4Email-Proxy-Assertion');
        res.set({
            'Access-Control-Allow-Origin': origin,
            'AMP-Access-Control-Allow-Source-Origin': sourceOrigin,
            'Access-Control-Allow-Source-Origin': 'AMP-Access-Control-Allow-Source-Origin',
            'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin' + ', AMP-Access-Control-Allow-Source-Origin' + ', Access-Control-Allow-Source-Origin'
        });
    }
    next();
});


ratingsRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    const orderID = req.query.orderID;
    const sessionID = req.query.sessionID;
    sendRequest('/order/ratings', 'GET', { order_id: orderID, rating_type: 'restaurant' }, sessionID).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send(error)
    })
});


ratingsRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
    const ratings = req.body;

    // const ratings = {
    //     "comments": "test",
    //     "dispositions": [],
    //     "order_id": 52062350083,
    //     "ordered_items": [],
    //     "prevRating": 0,
    //     "rating": 5,
    //     "rating_type": "restaurant",
    //     "to_skip": 0,
    // }

    console.log(req.body);

    res.json({
        success: true,
        message: 'Thank you for your feedback.',
        ratings
    });
    // sendRequest('/order/ratings', 'POST', { order_id: 52658542749, rating_type: 'restaurant' }).then((data) => {
    //     res.send(data);
    // }).catch((error) => {
    //     res.send(error)
    // })
});

export { ratingsRouter };