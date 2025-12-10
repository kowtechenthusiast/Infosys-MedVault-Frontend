import { memo } from "react";
import { ChevronRight } from "lucide-react";

const ProfileInput = memo(
  ({
    icon: Icon,
    label,
    name,
    type = "text",
    value,
    disabled,
    onChange,
    readOnly = false,
    options = [],
    placeholder = "",
  }) => {
    // Determine the base and focus/hover styles for the input/select
    const baseStyle =
      "w-full appearance-none px-4 py-3 rounded-2xl text-base shadow-inner";

    // Style when disabled or readOnly (locked look)
    const lockedStyle =
      "bg-slate-50 border border-slate-200 text-slate-500 cursor-not-allowed";

    // Style when enabled (interactive glass look)
    const activeStyle = `
      bg-white/80 border border-white/70 text-slate-800
      transition-all duration-300 ease-out
      hover:shadow-md hover:border-blue-300
      focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none
      shadow-[0_4px_10px_rgba(0,0,0,0.02)]
    `;

    const className = `${baseStyle} ${
      disabled || readOnly ? lockedStyle : activeStyle
    }`;

    return (
      <div className="w-full">
        <label className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-2 tracking-wider uppercase">
          {Icon && <Icon size={14} className="text-blue-500" />} {label}
        </label>

        {options.length > 0 ? (
          <div className="relative">
            <select
              name={name}
              value={value}
              disabled={disabled || readOnly}
              onChange={onChange}
              className={className}
            >
              <option value="" disabled>
                Select {label}
              </option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {/* Custom chevron for select box */}
            <ChevronRight
              size={18}
              className={`absolute right-4 top-3.5 rotate-90 transition-colors ${
                disabled || readOnly ? "text-slate-400" : "text-blue-500"
              }`}
            />
          </div>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            readOnly={readOnly}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
          />
        )}
      </div>
    );
  }
);

export default ProfileInput;
