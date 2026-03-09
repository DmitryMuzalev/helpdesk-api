import Joi from 'joi';
import { Role } from '@prisma/client';

const userIdParamsSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

const createUserBodySchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(8).max(20).required(),
  fullName: Joi.string().min(2).max(80).trim().required(),
  role: Joi.string()
    .valid(...Object.values(Role))
    .required(),
  institutionId: Joi.string().uuid().allow(null),
});

const updateUserBodySchema = Joi.object({
  email: Joi.string().email().trim().lowercase(),
  password: Joi.string().min(8).max(20),
  fullName: Joi.string().min(2).max(80).trim(),
  role: Joi.string().valid(...Object.values(Role)),
  institutionId: Joi.string().uuid().allow(null),
  isActive: Joi.boolean(),
}).min(1);

export default {
  userIdParamsSchema,
  createUserBodySchema,
  updateUserBodySchema,
};
