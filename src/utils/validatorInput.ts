import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import getValidationErros from "./getValidationError";
interface FormRefProps {
  current: FormHandles;
}
export const validator = async (
  formRef: FormRefProps,
  shape: object,
  data: object
) => {
  try {
    const scheme = Yup.object().shape(shape);

    await scheme.validate(data, { abortEarly: false });
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const errors = getValidationErros(err);
      let preErros = formRef.current?.getErrors();
      formRef.current?.setErrors({ ...preErros, ...errors });
    }
    throw "";
  }
};
