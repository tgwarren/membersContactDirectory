const express = require('express');
const router = express.Router();
const membersController = require('../../controllers/memberController');


router.route('/')
    .get(membersController.getAllMembers)
    .post(membersController.createNewMember)
    .put(membersController.updateMember)
    .delete(membersController.deleteMember);



router.route('/:id')
    .get(membersController.getMember);

module.exports = router;