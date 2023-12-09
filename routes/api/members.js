const express = require('express');
const router = express.Router();
const membersController = require('../../controllers/memberController');
const validateMembers = require('../../middleware/validateMembers');


router.route('/')
    .get(membersController.getAllMembers)
    .post(membersController.createNewMember)
    .put(membersController.updateMember)
    .delete(membersController.deleteMember);

router.use(validateMembers);

router.route('/members/:id')
    .get(membersController.getMember);

module.exports = router;