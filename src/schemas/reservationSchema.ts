import joi from "joi";

export default joi.object({
  ticketId: joi.number().required(),
});
