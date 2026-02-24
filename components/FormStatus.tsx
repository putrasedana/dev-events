"use client";

type FormStatusProps = {
  type: "success" | "error" | "loading" | null;
  message?: string;
};

const FormStatus = ({ type, message }: FormStatusProps) => {
  if (!type) return null;

  const baseStyles = "mt-4 p-3 rounded-md text-sm font-medium transition-all duration-300";

  const styles = {
    success: "text-green-700 border border-green-700",
    error: "text-red-700 border border-red-700",
    loading: "text-blue-700 border border-blue-700",
  };

  return <div className={`${baseStyles} ${styles[type]}`}>{message}</div>;
};

export default FormStatus;
