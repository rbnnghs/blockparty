import CopyIcon from "../Icons/CopyIcon";

export default function CopyTextField({ value, placeholder, hidden }: { value: string | null, placeholder: string, hidden?: boolean }) {
  return (
    <div className="flex gap-4 w-full items-center relative">
      <p className="py-2 px-4 text-sm grow border border-black border-opacity-10 rounded-lg focus:outline-none text-stone-400 bg-stone-50">
        {(hidden ? value?.replaceAll(/./g, "•") : value) ?? placeholder}
      </p>
      <button 
        className="absolute right-2 cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-200"
        onClick={() => navigator.clipboard.writeText(value ?? "")}
      >
        <CopyIcon size={20}/>
      </button>
    </div>
  )
}