const customersSchema = {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    createDate: {
      type: Date,
      default: Date.now
    }
};

module.exports = customersSchema;