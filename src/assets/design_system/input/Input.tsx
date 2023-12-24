import { useState, CSSProperties, ChangeEventHandler, useEffect } from "react";

import validationForm from "../../../utils/validateForm";

const Input = ({
  value,
  handler,
  label,
  id,
  name,
  icon,
  statusValidate
}: {
  value: string;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
  name: string;
  statusValidate: React.Dispatch<React.SetStateAction<boolean>>;
  icon?: string;
}) => {
  const [message, setMessage] = useState(false);
  // const styleClass = value === "" ? "" : validationForm(value, name)?.class;

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    handler(e);
    setMessage(true);
  };

  useEffect(() => {
    if (validationForm(value, name)?.errorStatus) {
      statusValidate(false);
    } else {
      statusValidate(true);
    }
  }, [value])

  const renderInput = () => {
    return (
      <label htmlFor={id} className="flex flex-col relative w-full">
        <span className="mb-2">{label}</span>

        <div className="relative mb-2">
          {icon ? (
            <img src={icon} alt="icon" className={`absolute w-3 h-3 bottom-1/2 translate-y-1/2 left-1`} />  
          ) : null}

          <input
            onChange={onInputChange}
            id={id}
            type="text"
            className={`rounded-lg w-full border-solid border outline-none py-3 px-4 box-border pl-5 transition-all hover:border-purple-600 hover:transition-all ${validationForm(value, name)?.classInput}`}
            placeholder={label}
            value={value}
            name={name}
          />
        </div>

        <div className={`absolute left-0 -bottom-4 text-xs ${validationForm(value, name)?.classLabel}`}>
          {value !== "" && message
            ? validationForm(value, name)?.message
            : null}
        </div>
      </label>
    );
  };

  return <div className="custom-input">{renderInput()}</div>;
};

export default Input;
