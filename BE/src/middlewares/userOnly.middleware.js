const Exception = require("../exceptions");

function userOnly(req, res, next) {
  try {
    if (!req.userId)
      throw new Exception(401, "로그인한 유저만 사용 가능한 기능입니다");

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = userOnly;