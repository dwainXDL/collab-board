export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  ...rest
}) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}
