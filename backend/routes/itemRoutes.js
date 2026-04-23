const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/itemController');

router.post('/',auth,ctrl.createItem);
router.get('/',ctrl.getItems);
router.get('/search',ctrl.searchItem);
router.get('/:id',ctrl.getItemById);
router.put('/:id',auth,ctrl.updateItem);
router.delete('/:id',auth,ctrl.deleteItem);

module.exports = router;