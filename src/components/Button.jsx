export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  ...rest
}) {
  const classes = `btn btn-${variant}${className ? ` ${className}` : ""}`;

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
