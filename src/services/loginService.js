class LoginService {
  constructor(conn, registrationService) {
    this.conn = conn;
    this.registrationService = registrationService;
  }

  async authorizeUser(input) {
    const userInfo = await this.registrationService.containsUser(input);

    return new Promise((resolve, reject) => {
      if (userInfo.length) {
        if (userInfo[0].username === input.username && userInfo[0].password === input.password) {
          resolve({ userId: userInfo[0].id });
        } else {
          reject(new Error(false));
        }
      } else {
        reject(new Error(false));
      }
    });
  }
}

module.exports = LoginService;
