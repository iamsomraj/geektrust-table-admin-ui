interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button = ({ children, variant = 'primary', disabled, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md ${variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'}`}
    >
      {children}
    </button>
  );
};

export default Button;
