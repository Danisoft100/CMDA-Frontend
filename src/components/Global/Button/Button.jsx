import { classNames } from "~/utilities/classNames";
import Loading from "../Loading/Loading";

const Button = ({
  children,
  label,
  loading,
  loadingText,
  type = "button",
  variant = "filled", // outlined, text
  large, // for larger size
  disabled,
  color = "primary", // primary, tertiary, secondary, error
  className,
  onClick = () => {},
}) => {
  const getColorStyles = () => {
    switch (color) {
      case "primary":
        return {
          filled: "bg-primary text-white hover:bg-primaryContainer",
          outlined: "bg-transparent text-primary border-2 border-primary hover:bg-onPrimary",
          text: "bg-tranparent text-primary hover:bg-onPrimary",
        };
      case "tertiary":
        // Define styles for tertiary color
        return {
          filled: "bg-tertiary text-white hover:bg-tertiaryContainer",
          outlined: "bg-transparent text-tertiary border-2 border-tertiary hover:bg-onTertiary",
          text: "bg-tranparent text-tertiary hover:bg-onTertiary",
        };
      case "secondary":
        // Define styles for secondary color
        return {
          filled: "bg-secondary text-white hover:bg-secondaryContainer",
          outlined: "bg-transparent text-secondary border-2 border-secondary hover:bg-onSecondary",
          text: "bg-tranparent text-secondary hover:bg-onSecondary",
        };
      case "error":
        // Define styles for error color
        return {
          filled: "bg-error text-white hover:bg-error",
          outlined: "bg-transparent text-error border-2 border-error hover:bg-error/20",
          text: "bg-tranparent text-error hover:bg-error/20",
        };
      default:
        // Default to primary color styles if an invalid color is provided
        return {
          filled: "bg-primary text-white hover:bg-primaryContainer",
          outlined: "bg-transparent text-primary border-2 border-primary hover:bg-onPrimary",
          text: "bg-tranparent text-primary hover:bg-onPrimary",
        };
    }
  };

  const colorStyles = getColorStyles();

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classNames(
        "inline-flex justify-center items-center gap-2.5 rounded-md font-medium py-4 px-8 text-sm",
        large ? "h-12" : "h-10",
        variant === "filled" && colorStyles.filled,
        variant === "outlined" && colorStyles.outlined,
        variant === "text" && colorStyles.text,
        "disabled:cursor-not-allowed",
        disabled && "bg-opacity-50",
        "focus:ring-4 focus:outline-none hover:bg-opacity-90 transition-all duration-150",
        color === "error"
          ? "focus:ring-error/20"
          : color === "secondary"
            ? "focus:ring-secondary/20"
            : color === "tertiary"
              ? "focus:ring-tertiary/20"
              : "focus:ring-primary/20",
        className
      )}
      onClick={onClick}
    >
      {loading ? <Loading height={20} width={20} /> : children || label}
      {loading && loadingText ? loadingText : null}
    </button>
  );
};

export default Button;
