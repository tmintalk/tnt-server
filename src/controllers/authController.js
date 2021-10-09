const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

module.exports = {
  join: async (req, res, next) => {
    const { email, password, nickname, thumbnailUrl } = req.body;
    
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        return res.status(409).send("이미 존재하는 이메일입니다.");
      }
      const hash = await bcrypt.hash(password, 12);
  
      const u = await User.create({
        email,
        nickname,
        password: hash,
        thumbnailUrl,
      });

      const payload = {
        id: u.id,
        email: u.email,
      };

      const token = await jwt.sign(payload, process.env.secretOrKey, { expiresIn: '1d' });
      
      return res.json({
        user: u,
        token: `Bearer ${token}`,
      })
    } catch (error) {
      console.error(error);
      return next(error);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const exUser = await User.findOne({ 
        where: { email }, 
      });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          const payload = {
            id: exUser.id,
            email: exUser.email,
          };

          jwt.sign(payload, process.env.secretOrKey, { expiresIn: '1d' }, (err, token) => {
            return res.json({
              user: exUser,
              token: `Bearer ${token}`,
            });
          });
        } else {
          return res.status(400).send("비밀번호가 일치하지 않습니다.");
        }
      } else {
        return res.status(400).send("가입되지 않은 회원입니다.");
      }
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  me: async (req, res, next) => {
    res.json(req.user);
  }
}