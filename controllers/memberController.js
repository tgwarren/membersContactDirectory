const Member = require("../model/Member");

//Get all members
const getAllMembers = async (req, res) => {
  const members = await Member.find();
  if (!members) {
    return res.status(400).json({ message: "No Members found." });
  }
  res.json(members);
};

//Create a member
const createNewMember = async (req, res) => {
  if (
    !req.body.parentName ||
    !req.body.daughterName ||
    !req.body.phoneNumber ||
    !req.body.email
  ) {
    return res
      .status(400)
      .json({
        message:
          "Parent Name, Daughter Name, Phone Number, and Email are required",
      });
  }
  try {
    const result = await Member.create({
      parentName: req.body.parentName,
      daughterName: req.body.daughterName,
      address: req.body.address,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

//Update a member
const updateMember = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Id number is required." });
  }
  const member = await Member.findOne({ _id: req.body.id });

  if (!member) {
    return res
      .status(400)
      .json({ message: `Member Id # ${req.body.id} is not found.` });
  }

  if (req.body.parentName) member.parentName = req.body.parentName;
  if (req.body.daughterName) member.daughterName = req.body.daughterName;
  if (req.body.address) member.address = req.body.address;
  if (req.body.email) member.email = req.body.email;
  if (req.body.phoneNumber) member.phoneNumber = req.body.phoneNumber;

  const result = await member.save();

  res.json(result);
};

//Delete a member
const deleteMember = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Id number is required." });
  }
  const member = await Member.findOne({ _id: req.body.id });

  if (!member) {
    return res
      .status(400)
      .json({ message: `Member Id # ${req.body.id} is not found.` });
  }
  const result = member.deleteOne({ _id: req.body.id });

  res.json(result);
};

//Get a member
const getMember = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Member Id number required." });
  }

  const member = await Member.findOne({ _id: req.params.id }).exec();

  if (!member) {
    return res
      .status(204)
      .json({ message: `Member Id # ${req.params.id} is not found.` });
  }
  res.json(member);
};

module.exports = {
  getAllMembers,
  createNewMember,
  updateMember,
  deleteMember,
  getMember,
};
