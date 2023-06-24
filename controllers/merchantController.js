const User = require("../models/usersModel");
const Store = require("../models/merchantModel");

const merchantController = async (req, res) => {
  const { storename, officialemail, officialPhone, adress, owner, products } =
    req.body;
  let newstore = new Store({
    storename,
    officialemail,
    officialPhone,
    adress,
    owner,
    products,
  });
  newstore.save();
  await User.findOneAndUpdate(
    { _id: owner },
    { role:"merchant"},
    { new: true }
  );
  res.send(newstore);
};

module.exports = { merchantController };
/*const User = require("../models/usersModel");
const Store = require("../models/merchantModel");

const merchantController = (req, res) => {
  const { storename, officialemail, officialPhone, adress, owner, products } = req.body;

  const newStore = new Store({
    storename,
    officialemail,
    officialPhone,
    adress,
    owner,
    products
  });

  newStore.save()
    .then(savedStore => {
      // Handle successful store save
      res.status(200).json(savedStore);
    })
    .catch(error => {
      // Handle error while saving store
      res.status(500).json({ error: "Failed to save store" });
    });
};

module.exports = { merchantController };*/
