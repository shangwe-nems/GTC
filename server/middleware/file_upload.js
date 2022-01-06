const multer = require('multer');
const fs = require('fs');

// storage settings
const storage = multer.diskStorage({
	destination: (req, file, cb) => {

		const new_path = './uploads/storage/'.concat(req.body.stone_Id,'/');
		console.log("This is the upload folder => ", new_path);
		try {
			if (!fs.existsSync(new_path)) {
				fs.mkdirSync(new_path, { recursive: true }, err => {
					if (err) console.log("Directory Creation Error :", err);
					console.log("Created Successfully: ", new_path);
				});
			} else {
				console.error("Directory already exists");
			}
		} catch (err) {
			console.log(err);
		}
		cb(
            null,
            new_path
		);
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname.split(" ").join("-"));
	}
});

// uploading file
const upload = multer({
	storage: storage
});

module.exports = upload;
