import ejs from "ejs";
export const getCompiledTemplate = (templatePath: string, templateData: any = {}) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, templateData, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};