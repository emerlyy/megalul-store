import {
  useForm,
  type RegisterOptions,
  type SubmitHandler,
} from "react-hook-form";
import { useCart } from "../../store/cart/useCart";

import "./CheckoutForm.css";
import Title from "../ui/Title/Title";
import Input from "../ui/Input/Input";

interface FormInputs {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: number;
  city: string;
  country: string;
  emoneyNumber?: string;
  emoneyZip?: number;
}

interface FormInput {
  id: keyof FormInputs;
  label: string;
  placeholder: string;
  className?: string;
  validators: RegisterOptions<FormInputs, keyof FormInputs> | undefined;
}

const formBlocks: {
  title: string;
  inputs: FormInput[];
}[] = [
  {
    title: "Billing Details",
    inputs: [
      {
        id: "name",
        label: "Name",
        placeholder: "Alexei Ward",
        validators: {
          required: {
            value: true,
            message: "Required",
          },
          minLength: {
            value: 2,
            message: "Must contain at least 2 characters",
          },
        },
      },
      {
        id: "email",
        label: "Email Address",
        placeholder: "alexei@mail.com",
        validators: {
          required: {
            value: true,
            message: "Required",
          },
          pattern: {
            value:
              /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/,
            message: "Wrong format",
          },
        },
      },
      {
        id: "phone",
        label: "Phone Number",
        placeholder: "+1 202-555-0136",
        validators: {
          required: {
            value: true,
            message: "Required",
          },
          pattern: {
            value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
            message: "Wrong format",
          },
        },
      },
    ],
  },
  {
    title: "Shipping Info",
    inputs: [
      {
        id: "address",
        label: "Address",
        placeholder: "1137 Williams Avenue",
        className: "checkout-form__fullwidth",
        validators: {
          required: {
            value: true,
            message: "Required",
          },
        },
      },
      {
        id: "zipCode",
        label: "ZIP code",
        placeholder: "10001",
        validators: {
          required: {
            value: true,
            message: "Required",
          },
          pattern: {
            value: /(^\d{5}(?:[\s]?[-\s][\s]?\d{4})?$)/,
            message: "Wrong format",
          },
        },
      },
      {
        id: "city",
        label: "City",
        placeholder: "New York",
        validators: {
          required: {
            value: true,
            message: "Required",
          },
        },
      },
      {
        id: "country",
        label: "Country",
        placeholder: "United States",
        validators: {
          required: {
            value: true,
            message: "Required",
          },
        },
      },
    ],
  },
];

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = () => {};

  const { totalQuantity } = useCart();

  return (
    <>
      <form
        id="checkout-form"
        className="checkout-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title
          size="large"
          tag="h1"
          color="text-primary"
          className="checkout-form__title"
          weight="semibold"
        >
          CHECKOUT
        </Title>
        {formBlocks.map(({ title, inputs }) => (
          <CheckoutFormBlock key={title} title={title}>
            {inputs.map(({ id, label, placeholder, validators, className }) => (
              <Input
                disabled={!totalQuantity}
                errorMessage={errors[id]?.message}
                key={id}
                id={id}
                label={label}
                placeholder={placeholder}
                className={className}
                {...register(id, validators)}
              />
            ))}
          </CheckoutFormBlock>
        ))}
      </form>
    </>
  );
};

type CheckoutFormBlockProps = {
  title: string;
  children?: React.ReactNode;
};

const CheckoutFormBlock = ({ title, children }: CheckoutFormBlockProps) => {
  return (
    <>
      <Title
        tag="h3"
        size="small"
        color="primary"
        className="checkout-form__block-title"
      >
        {title}
      </Title>
      <div className="checkout-form-block">{children}</div>
    </>
  );
};

export default CheckoutForm;
