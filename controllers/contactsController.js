const Member = require('../model/Member');


//Get all contacts
const getAllContacts = async (req, res) => {
    const members = await Member.find();
    if (!members) { return res.status(400).json({ message: 'No Members found.' }) }
    res.json(members)
};

//Create a contact
const createNewContact = async (req, res) => {
    if (!req.body.name || !req.body.phone || !req.body.email) {
        return res
            .status(400)
            .json({ message: "Name, phone, and email are required" });
    }
    try {
        const result = await Member.create({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err)
    }
};

//Update a contact
const updateContact = async (req, res) => {
   if(!req.body.id){
    return res.status(400).json({message: 'Id number is required.'});
   }
   const member = await Member.findOne({_id: req.body.id})

    if (!contact) {
        return res
            .status(400)
            .json({ message: `Contact Id # ${req.body.id} is not found.` });
    }

    if (req.body.name) contact.name = req.body.name;
    if (req.body.phone) contact.phone = req.body.phone;
    if (req.body.email) contact.email = req.body.email;
    if (req.body.address) contact.address = req.body.address;
    
    const result = await member.save();

    res.json(result);
};

//Delete a contact
const deleteContact = async (req, res) => {
    if(!req.body.id){
        return res.status(400).json({message: 'Id number is required.'});
       }
       const member = await Member.findOne({_id: req.body.id})
    
        if (!contact) {
            return res
                .status(400)
                .json({ message: `Contact Id # ${req.body.id} is not found.` });
        }
    const result = member.deleteOne({_id: req.body.id});
        
    res.json(result);
};

//Get a contact
const getContact = async (req, res) => {
    if(!req.params.id){return res.status(400).json({message: 'Member Id number required.'})}
    const member = await Member.findOne({_id: req.params.id})
    if (!member) {
        return res
        .status(204)
        .json({ message: `Contact Id # ${req.params.id} is not found.` });
    }
    res.json(member);
};

module.exports = {
    getAllContacts,
    createNewContact,
    updateContact,
    deleteContact,
    getContact
}
