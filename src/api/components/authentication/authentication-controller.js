const { date } = require('joi');
const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_ATTEMPT_WINDOW = 30 * 60 * 1000; // 30 menit dalam milidetik

const cobaLogin = {}; // objek untuk melacak login gagal
/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    // Periksa apakah email ini telah mencapai batas percobaan login
    if (cobaLogin[email] && cobaLogin[email].attempts >= MAX_LOGIN_ATTEMPTS) {
      const timeLeft = Math.ceil((LOGIN_ATTEMPT_WINDOW - (Date.now() - cobaLogin[email].lastAttempt)) / 1000 / 60); // Menit
      throw errorResponder(
        errorTypes.FORBIDDEN,
        'Too many failed login attempts'
      );
    }
    if(timeLeft = 0){
      console.log(`User ${email} bisa mencoba login kembali karena sudah lebih dari 30 menit sejak pengenaan limit. Attempt di-reset kembali ke 0`);
    }

    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
       // Update catatan percobaan login yang gagal
       if (!cobaLogin[email]) {
        cobaLogin[email] = { attempts: 1, lastAttempt: Date.now() };
      } else {
        cobaLogin[email].attempts++;
        cobaLogin[email].lastAttempt = Date.now();
      }
      console.log(`[${new Date().toISOString()}] User ${email} gagal login. Attempt = ${cobaLogin[email].attempts}`);
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    // Pengguna berhasil login, hapus catatan percobaan login yang terkait dengan email tersebut
    delete cobaLogin[email];
    console.log(`[${new Date().toISOString()}] User ${email} berhasil login`);
    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
