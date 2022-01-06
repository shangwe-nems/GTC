const express = require('express');
const multer = require('multer');
const router = express.Router();

const userController = require('../controllers/users');

// import of the upload middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/users');
    },
    filename: function (req, file, cb) {
        cb(null, "_" + file.originalname.split(' ').join('-'));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const imgUpload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// import of the authorization middleware
const { auth } = require('../middleware/auth');

router.get('/permission', auth, userController.authentication);
router.delete('/permission/:id', auth, userController.delete_permission);
router.patch('/permission/:id', auth, userController.update_permission);
router.post('/permission', userController.create_permission); 
router.post('/auth', auth, userController.authentication);
router.post('/get-users', auth, userController.get_users);
router.post('/register', imgUpload.single('imgProfile'), userController.register);
router.post('/login', userController.login);
router.post('/logout', auth, userController.logout);


module.exports = router;