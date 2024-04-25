const { User } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers(noPage = 1, ukPage = 10, sort = { email: 1 }, search = {}) {
  const skip = (noPage - 1) * ukPage;
  const users = await User.find(search)
                          .sort(sort)
                          .skip(skip)
                          .limit(ukPage);

  const count = await User.countDocuments(search); // hitung pages
  const totalPages = Math.ceil(count / ukPage); // total pages
  const pageSebelum = noPage > 1;  // page sebelum apakah ada? true/false
  const pageSetelah = noPage < totalPages; // page sesudha apakah ada? true/false 

  return {
    page_number: noPage,
    page_size: ukPage,
    count: count,
    total_pages: totalPages,
    has_previous_page: pageSebelum,
    has_next_page: pageSetelah,
    data: users
  };
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
