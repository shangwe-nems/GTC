const express = require('express');
const router = express.Router();

const inventoryController = require('../controllers/inventory');

const {auth} = require('../middleware/auth');

const upload = require('../middleware/file_upload');


router.post(
    '/',
    auth,
    upload.fields([{name: "images", maxCount:5}, {name: "videos", maxCount: 2}]),
    inventoryController.identify_new_stone
);

router.patch( 
    '/:id',
    auth,
    upload.fields([{name: "images", maxCount:5},  {name: "videos", maxCount: 2}]),
    inventoryController.fill_stone_info
);

router.get(
    '/',
    auth,
    inventoryController.get_all_stones
);

router.get(
    '/:id',
    auth,
    inventoryController.get_a_stone
);

router.delete(
    '/:id',
    auth,
    inventoryController.delete_a_stone
);


module.exports = router;