import * as Yup from "yup";

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (error) {
    return response
      .status(422)
      .json({ error: "Validation fails", messages: error.inner });
  }
};
