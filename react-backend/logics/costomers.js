const Customer = require("../database/costomers.db");

exports.addCostomer = function (req, res) {
  const {name, email, phone, city, state, country, organizationId, jobProfile, additionalInfo} = req.body;
  console.log(req.body);
  console.log(req.file.path);

  Customer.create({
    id: req.body.id,
    organizationId: req.body.organizationId,
    imageUrl: req.file.path,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    jobProfile: req.body.jobProfile,
    additionalInfo: req.body.additionalInfo,
  })
    .then(() => {
      // Process the data, save to database, etc.
      res.json({
        message: "Customer data processed successfully",
        success: true,
        data: {
          name,
          email,
          phone,
          city,
          state,
          country,
          organizationId,
          jobProfile,
          additionalInfo,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "Data Not submitted",
        success: false,
      });
    });
};

exports.updateCostomer = function (req, res) {
  const {name, email, phone, city, state, country, organizationId, jobProfile, additionalInfo} = req.body;

  Customer.update(
    {
      id: req.body.id,
      organizationId: req.body.organizationId,
      imageUrl: req.file.path,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      jobProfile: req.body.jobProfile,
      additionalInfo: req.body.additionalInfo,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then(() => {
      // Process the data, save to database, etc.
      res.json({
        message: "Customer data processed successfully",
        success: true,
        data: {
          name,
          email,
          phone,
          city,
          state,
          country,
          organizationId,
          jobProfile,
          additionalInfo,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "Data Not submitted",
        success: false,
      });
    });
};

exports.deleteCostomer = function (req, res) {
  const id = req.params.id
  Customer.findByPk(id)
    .then((customer) => {
      console.log(customer);
      if (customer) {
        customer.destroy();
        res.json({message: "Customer deleted"});
      } else {
        res.status(404).json({error: "Customer not found"});
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "Data Not submitted",
        success: false,
      });
    });
};

exports.fetchCostomer = async function (req, res) {
  Customer.findAll()
    .then((data) => {
      const dataValues = data.map((data) => data.dataValues);
      res.json({
        success: true,
        data: dataValues,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        data: err.message,
      });
    });
};

exports.fetchCostomerById = function (req, res) {
  const customerId = req.params.id;
  Customer.findAll({where: {id: customerId}})
    .then((data) => {
      const dataValues = data.map((data) => data.dataValues);
      console.log(dataValues);
      res.json({
        success: true,
        data: dataValues,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        data: err.message,
      });
    });
};

// try {
//   const customers = await Customer.findAll();
//   const customerData = customers.map(customer => customer.dataValues);
//   res.json(customerData);
// } catch (error) {
//   console.error('Error fetching customer data:', error);
//   res.status(500).json({ message: 'Error fetching customer data' });
// }
