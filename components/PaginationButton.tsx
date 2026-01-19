type PaginationButtonProps = {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export function PaginationButton({
  disabled,
  onClick,
  children,
}: PaginationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      
      className={`shadow-lg w-full border text-start bg-white p-4 rounded-lg ${disabled ? `border-gray-200 text-gray-500 hover:cursor-no-drop` : `border-gray-300 hover:cursor-pointer transition-all duration-500`}`}
    >
      {children}
    </button>
  );
}
