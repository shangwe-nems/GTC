const express = require('express');
const router = express.Router();

const settingController = require('../controllers/settings');

const { auth } = require('../middleware/auth');

router.get('/', auth, settingController.get_all_settings);
router.post('/location', auth, settingController.create_location);
router.post('/weight', auth, settingController.create_weight_unit);
router.post('/length', auth, settingController.create_lenght_unit);
router.post('/seller', auth, settingController.create_seller);
router.post('/client', auth, settingController.create_client);
router.post('/percent', auth, settingController.create_percents);

router.patch('/location', auth, settingController.update_location);
router.patch('/seller', auth, settingController.update_seller);
router.patch('/client', auth, settingController.update_clients);
router.patch('/percent', auth, settingController.update_percents);

module.exports = router;