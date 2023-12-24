import { ReactNode } from "react";
import Button from "../button/Button";

const Modal = ({
  title,
  children,
  buttonsText,
  disabled,
  handleNext,
  handlePrew,
}: {
  title: string;
  children: ReactNode;
  buttonsText: string[];
  disabled: boolean;
  handleNext: React.Dispatch<React.SetStateAction<number>>
  handlePrew: React.Dispatch<React.SetStateAction<number>>
}) => {
  

  const childrenRender = () => {
    if (Array.isArray(children)) {
      return children.map((item, i) => {
        
        return (
          <div className="mb-4" key={i}>
            {item}
          </div>
        );
      });
    } else {
      return (
          <div className="mb-4">
            {children}
          </div>
        );
      };
    }

  return (
    <div className="p-4 max-w-96 shadow">
      <div className="flex justify-between">
        <h2 className="mb-3 font-semibold ">{title}</h2>
        <span className={`cursor-pointer text-lg h-3 font-semibold`}>×</span>
      </div>

      <form>{childrenRender()}</form>

      <div className="flex justify-between">
        <div className="flex justify-between max-w-52 w-full ml-auto">
          <Button text={buttonsText[0]} type="text" handle={handlePrew} size="base" />
          <Button text={buttonsText[1]} type="prime" handle={handleNext} size="base" disabled={disabled}/>
        </div>
      </div>
    </div>
  );
};

export default Modal;
