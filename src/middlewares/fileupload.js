const multer = require("multer");


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderModule = req.params.module;

        cb(null, "public/uploads/product");
    },
    filename: (req, file, cb) => {
        var filetype = "";
        if (file.mimetype === "image/gif") {
            filetype = "gif";
        }
        if (file.mimetype === "image/png") {
            filetype = "png";
        }
        if (file.mimetype === "image/jpeg") {
            filetype = "jpg";
        }
        cb(null, Date.now() + "." + filetype);
    }
});

var upload = multer({
    storage: storage
});

// const uploadS3 = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: "event365-1",
//         acl: 'public-read',
//         metadata: function (req, file, cb) {
//             console.log('metadata', file, cb);
//             cb(null, {fieldName: file.fieldname});
//         },
//         key: function (req, file, cb) {
//             console.log('key', file, cb)
//             var myStr = file.originalname;
//             var strArray = myStr.split(".");
//             console.log(strArray[1]);
//             cb(null, Date.now().toString()+'.'+strArray[1]);
//         }
//     })
// });

module.exports = {
    upload,
};
