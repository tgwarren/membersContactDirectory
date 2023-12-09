const validateMembers = async (req, res, next) => {
    const parentName = req.body.parentName
    const daughterName = req.body.daughterName
    const email = req.body.email
    const phone = req.body.phone

    const nameRegex = /^[a-z ,.'-]+$/i
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const phoneRegex = /^[0-9]{10}$/
    

    if (
        nameRegex.test(parentName) &&
        nameRegex.test(daughterName) &&
        phoneRegex.test(phone) &&
        emailRegex.test(email)
    ) {
        next();
    } else {
        return res.status(400).json({ message: 'Please enter valid information' })
    };
};

module.exports = validateMembers;