import type { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  registration?: UseFormRegisterReturn;
  // error?: FieldError;
  error?: {
    message?: string;
  };
  isEditing?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, icon, registration, error, isEditing = true, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative">
        {icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>}

        {isEditing === false ? (
          <input
            {...registration}
            {...props}
            className={`
            block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset cursor-not-allowed 
            bg-gray-100
            ${error ? "ring-red-500" : "ring-gray-300"}
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
            ${error ? "focus:ring-red-600" : "focus:ring-red-600"}
            sm:text-sm sm:leading-6
            ${icon ? "pl-10" : "pl-3"}
          `}
            disabled
          />
        ) : (
          <input
            {...registration}
            {...props}
            className={`
            block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset 
            ${error ? "ring-red-500" : "ring-gray-300"}
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
            ${error ? "focus:ring-red-600" : "focus:ring-red-600"}
            sm:text-sm sm:leading-6
            ${icon ? "pl-10" : "pl-3"}
          `}
          />
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
    </div>
  );
};
export default InputField;
