import express from "express";
import { Request, Response, NextFunction } from "express";
import { sendAmpEmail } from "../util/mailer";
import { getCompiledTemplate } from "../util/template-renderer";
import { getTemplatePath } from "../util/secrets";
import { getRatingTemplateData } from '../util/ratings';
const emailRouter = express.Router();

emailRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Wiki home page");
});

emailRouter.post("/sendemail", async (req: Request, res: Response, next: NextFunction) => {
    const recieverEmail = req.body.email;
    const orderID = req.body.orderID;
    const sessionID = req.body.sessionID;
    if (!recieverEmail) {
        res.send("Email not Provided");
    } else {
        try {
            const ratingTemplateData: any = await getRatingTemplateData(orderID, sessionID);
            const templatePath = getTemplatePath('ratings');
            const ampTemplate = await getCompiledTemplate(templatePath, ratingTemplateData);
            const emailSubject = 'Welcome to Dynamic Feedback Email';
            sendAmpEmail(recieverEmail, ampTemplate, emailSubject).then(data => {
                res.json({
                    success: true,
                    response: {
                        envelope: data.envelope,
                        messageId: data.messageId
                    }
                });
            })
                .catch(error => {
                    res.json({
                        success: false,
                        message: error
                    });
                });
        }
        catch (err) {
            console.log(err)
            res.send('asd');
        }
    }
});

export { emailRouter };