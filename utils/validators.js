const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().required().max(100),
  description: Joi.string().allow("").max(500),
  status: Joi.string().valid("pending", "in-progress", "done"),
});

const userSchema = Joi.object({
  username: Joi.string().required().min(3).max(30),
  password: Joi.string().required().min(8),
});

const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = { validateTask, validateUser };
