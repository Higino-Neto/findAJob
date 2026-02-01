type JobInputProps = {
    children: React.ReactNode;
    placeholder?: string;
    name: string;
    required?: boolean;
}

export default function JobInput({children, placeholder, name, required}: JobInputProps) {
  return (
    <div className="flex flex-col mb-6">
      <label>{ children }</label>
      <input
        placeholder={placeholder ?? undefined}
        type="text"
        name={name}
        id={name}
        required={required ?? true}
        className="block mt-1 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 px-3 p-2"
      />
    </div>
  );
}
