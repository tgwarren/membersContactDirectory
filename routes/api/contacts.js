const express = require('express');
const router = express.Router();
const contactsController = require('../../controllers/contactsController');
const validateContacts = require('../../middleware/validateContacts');


router.route('/')
    .get(contactsController.getAllContacts)
    .post(contactsController.createNewContact)
    .put(contactsController.updateContact)
    .delete(contactsController.deleteContact);

router.use(validateContacts);

router.route('/contacts/:id')
    .get(contactsController.getContact);

module.exports = router;