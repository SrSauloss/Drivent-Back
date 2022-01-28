import joi from "joi";

export default joi.object({
  date: joi.string().pattern(/[0-9]{4}-[0-9]{2}-[0-9]{2}/).required(),
});
