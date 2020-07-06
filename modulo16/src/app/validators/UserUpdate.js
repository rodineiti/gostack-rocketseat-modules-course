import * as Yup from "yup";

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      password_current: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("password_current", (password_current, field) =>
          password_current ? field.required() : field
        ),
      password_confirmation: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (error) {
    return response
      .status(422)
      .json({ error: "Validation fails", messages: error.inner });
  }
};
