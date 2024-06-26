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

  const count = await User.countDocuments(search); // hitung jumlah data
  const totalPages = Math.ceil(count / ukPage); // total halaman
  const pageSebelum = noPage > 1; // apakah halaman sebelumnya ada? true/ false
  const pageSetelah = noPage < totalPages; // apakah halaman selanjutnya ada? true / false

  // Menyederhanakan setiap objek pengguna untuk hanya mengandung id, nama, dan email
  // karena code outputnya ada password
  const usersData = users.map(user => ({
    id: user._id,
    name: user.name,
    email: user.email
  }));

  return {
    page_number: noPage,
    page_size: ukPage,
    count: count,
    total_pages: totalPages,
    has_previous_page: pageSebelum,
    has_next_page: pageSetelah,
    data: usersData
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
