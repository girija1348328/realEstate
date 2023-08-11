const Property =require("../models/Property.js") ;

const createProperty = async (req, res, next) => {
  const newProperty = new Property(req.body);

  try {
    const savedProperty = await newProperty.save();
    res.status(200).json(savedProperty);
  } catch (err) {
    next(err);
  }
};
const updateProperty = async (req, res, next) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProperty);
  } catch (err) {
    next(err);
  }
};
const deleteProperty = async (req, res, next) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json("Property has been deleted.");
  } catch (err) {
    next(err);
  }
};
const getProperty = async (req, res, next) => {
  try {
    const Property = await Property.findById(req.params.id);
    res.status(200).json(Property);
  } catch (err) {
    next(err);
  }
};
const getProperties = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const Propertys = await Property.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(Propertys);
  } catch (err) {
    next(err);
  }
};
const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Property.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
const countByType = async (req, res, next) => {
  try {
    const PropertyCount = await Property.countDocuments({ type: "Property" });
    const apartmentCount = await Property.countDocuments({ type: "apartment" });
    const resortCount = await Property.countDocuments({ type: "resort" });
    const villaCount = await Property.countDocuments({ type: "villa" });
    const cabinCount = await Property.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "Property", count: PropertyCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

 const getPropertyRooms = async (req, res, next) => {
  try {
    const Property = await Property.findById(req.params.id);
    const list = await Promise.all(
      Property.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};

module.exports = {createProperty,updateProperty,deleteProperty,getProperty,getProperties,countByCity,countByType,getPropertyRooms}