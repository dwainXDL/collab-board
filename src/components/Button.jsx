export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  ...rest
}) {
  const variantStyles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

const baseStyles =
  "px-4 py-2 rounded-md font-medium text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";
const classes = '${baseStyles} ${variantStyles[variant]}${className ? " " + className : ""}'; 

  return (
    <button
      type={type}
      onClick={onClick}
      {...rest}
      className={classes}
    >
      {children}
    </button>
  );
}
