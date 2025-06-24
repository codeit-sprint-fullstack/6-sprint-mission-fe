import React from "react";
import { FormHeaderProps } from "@/types/form";

export default function FormHeader({
  submitText,
  isFormValid,
  isLoading,
  title,
  isSubmitting,
}: FormHeaderProps & { title?: string; isSubmitting?: boolean }) {
  const defaultTitle = title || `${submitText}하기`;

  return (
    <div className="flex w-full justify-between gap-2.5">
      <span className="text-xl font-bold">{defaultTitle}</span>
      <button
        className={`w-20 rounded-lg px-5 py-2.5 text-white transition-all duration-300 ${
          isFormValid && !isLoading && !isSubmitting
            ? "cursor-pointer bg-[#3692ff]"
            : "cursor-not-allowed bg-[#9ca3af]"
        }`}
        disabled={!isFormValid || isLoading || isSubmitting}
        type="submit"
      >
        {isLoading || isSubmitting ? (
          <div className="flex justify-center items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        ) : (
          submitText
        )}
      </button>
    </div>
  );
}
