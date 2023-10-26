const data = {
    contacts: require("../model/contacts.json"),
    setContacts: function (data) {
        this.contacts = data;
    },
}

//Get all contacts
const getAllContacts = (req, res) => {
    res.json(data.contacts);
}

//Create a contact
const createNewContact = (req, res) => {
    const newContact = {
        id: data.contacts?.length
            ? data.contacts[data.contacts.length - 1].id + 1
            : 1,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
    };
    if (!newContact.name || !newContact.phone || !newContact.email) {
        return res
            .status(400)
            .json({ 'message': "Name, phone, and email are required" });
    }
    data.setContacts([...data.contacts, newContact]);
    res.status(201).json(data.contacts);
}

//Update a contact
const updateContact = (req, res) => {
    const contact = data.contacts.find(
        cont => cont.id === parseInt(req.body.id)
    );
    if (!contact) {
        return res
            .status(400)
            .json({ 'message': `Contact Id ${req.body.id} is not found.` });
    }
    if (req.body.name) contact.name = req.body.name;
    if (req.body.phone) contact.phone = req.body.phone;
    if (req.body.email) contact.email = req.body.email;
    if (req.body.address) contact.address = req.body.address;
    const filteredArray = data.contacts.filter(
        cont => cont.id !== parseInt(req.body.id)
    );
    const unsortedArray = [...filteredArray, contact];
    data.setContacts(
        unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0)
    );
    res.json(data.contacts);
}

//Delete a contact
const deleteContact = (req, res) => {
    const contact = data.contacts.find(
        cont => cont.id === parseInt(req.body.id)
    );
    if (!contact) {
        return res
            .status(400)
            .json({ 'message': `Contact ID ${req.body.id} is not found.` });
    };
    const filteredArray = data.contacts.filter(
        cont => cont.id === parseInt(req.body.id)
    );
    data.setContacts([...filteredArray]);
    res.json(data.contacts);
}

//Get a contact
const getContact = (req, res) => {
    const contact = data.contacts.find(
        cont => cont.id === parseInt(req.params.id)
    );
    if (!contact) {
        return res.status(400).json({ message: `Contact ID ${req.params.id} is not found.` });
    }
    res.json(contact);
}

module.exports = {
    getAllContacts,
    createNewContact,
    updateContact,
    deleteContact,
    getContact
}
