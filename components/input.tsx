interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
}

const Input = ({ label, prepend, append, id, ...props }: InputProps) => {
  return (
    <div className='flex flex-col w-full'>
      {label && (
        <label
          htmlFor={id}
          className='mb-1 text-sm font-medium text-gray-700'
        >
          {label}
        </label>
      )}
      <div className='flex border px-2 rounded-md'>
        {prepend && <div className='flex items-center px-3 bg-gray-100 rounded-l-md'>{prepend}</div>}
        <input
          id={id}
          {...props}
          className='flex-1 px-3 py-2 rounded-none border-none focus-visible:outline-none'
        />
        {append && <div className='flex items-center px-3 bg-gray-100 rounded-r-md'>{append}</div>}
      </div>
    </div>
  );
};

export default Input;
