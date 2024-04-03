"use client";
import { Button } from "@/common/components/button/button.components";
import InputComponent from "@/common/components/input/input.component";
import {
  RegisterFormValues,
  registerValidationSchema,
} from "@/lib/schemas/register";
import { Toastify } from "@/lib/toast";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import "../../../common/styles/styles.module.scss";

const Login = () => {
  const router = useRouter();
  const validateForm = (values: RegisterFormValues) => {
    try {
      registerValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const handleSubmit = async (
    values: Record<string, any>,
    { resetForm }: any
  ) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.status === 200) {
        router.replace("/");
      }
      Toastify.error(res?.error as string);
    } catch (error) {
      Toastify.error("Something went wrong");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light mt-20 lg:mt-14">
      <h1>Login</h1>
      <div className="w-[85%] lg:w-[40%]">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <div className="flex flex-col gap-5">
                  <InputComponent
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-[15px]"
                  />

                  <InputComponent
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password"
                    className="py-[15px]"
                  />
                </div>

                <Button
                  disabled={!formik.isValid}
                  className={`!mt-5 !disabled:cursor-not-allowed`}
                  // variant="primary"
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>

        <div className="text-right text-sm py-3">
          {"Don't have an account?"}
          <Link className="text-blue-500 pl-1" href="/auth/login">
            {"login"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
