import InputComponent from "@/common/components/input/input.component";
import { FC } from "react";

interface IFormikControlProps {
  control: "input" | "select" | "area";
  [key: string]: any;
}

const FormikController: FC<IFormikControlProps> = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <InputComponent {...rest} />;
    case "select":
      return "Select";
    default:
      return null;
  }
};

export default FormikController;
