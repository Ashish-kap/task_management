const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().trim().min(1).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title is required",
    "any.required": "Title is required",
    "string.max": "Title cannot exceed 100 characters",
  }),
  description: Joi.string().allow("").max(500).messages({
    "string.max": "Description cannot exceed 500 characters",
  }),
  status: Joi.string().valid("pending", "in-progress", "done").messages({
    "any.only": "Status must be one of: pending, in-progress, done",
  }),
});

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username cannot exceed 30 characters",
    "string.empty": "Username is required",
    "any.required": "Username is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((d) => d.message),
    });
  }
  next();
};

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((d) => d.message),
    });
  }
  next();
};

module.exports = { validateTask, validateUser };
