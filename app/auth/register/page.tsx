"use client";
import { Button } from "@/common/components/button/button.components";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

import FormikController from "@/common/components/formik";
import {
  RegisterFormValues,
  registerValidationSchema,
} from "@/lib/schemas/register";
import { Toastify } from "@/lib/toast";
import { ZodError } from "zod";
import "../../../common/styles/styles.module.scss";

const SignUp = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    if (window && typeof window !== undefined) {
      router.replace("/auth/register");
    }
  }, []);

  const handleSubmit = async (
    values: RegisterFormValues,
    { resetForm }: any
  ) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ ...values }),
      });
      if (response?.status === 200) {
        Toastify.success("Passed");
        resetForm({});
      }
    } catch (error) {
      Toastify.error("failed");
    }
  };

  const validateForm = (values: RegisterFormValues) => {
    try {
      registerValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center !font-light mt-20 lg:mt-14">
      <h1 className="text-center">Registration</h1>
      <div className="w-[85%] lg:w-[40%]">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={validateForm}
          onSubmit={handleSubmit}
          validateOnChange
          validateOnMount
        >
          {(formik) => {
            return (
              <Form>
                <FormikController
                  control="input"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="py-[15px]"
                />

                <div className="flex flex-col gap-5">
                  <FormikController
                    control="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-[15px]"
                  />
                </div>

                <Button
                  disabled={!formik.isValid}
                  className={`!mt-5 !disabled:cursor-not-allowed`}
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

export default SignUp;
