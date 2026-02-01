import { JSX } from "react";

type signInButtonProps = {
  providerFunction: () => Promise<void>;
  providerLogo?: JSX.Element;
  providerName: string;
};

export default function SignInButton({
  providerFunction,
  providerLogo,
  providerName,
}: signInButtonProps) {
  return (
    <>
      <button
        onClick={providerFunction}
        className="mt-2 hover:cursor-pointer w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        {providerLogo}
        <span className="text-base font-medium">
          Continue with {providerName}
        </span>
      </button>
    </>
  );
}
