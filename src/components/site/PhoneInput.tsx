import { useState, useEffect } from "react";

export const countries = [
  { name: "India", code: "+91", length: 10, placeholder: "9876543210" },
  { name: "United States", code: "+1", length: 10, placeholder: "2015550123" },
  { name: "United Kingdom", code: "+44", length: 10, placeholder: "7700900000" },
  { name: "Canada", code: "+1", length: 10, placeholder: "2015550123" },
  { name: "Australia", code: "+61", length: 9, placeholder: "400123456" },
  { name: "United Arab Emirates", code: "+971", length: 9, placeholder: "501234567" },
  { name: "Singapore", code: "+65", length: 8, placeholder: "81234567" },
  { name: "Saudi Arabia", code: "+966", length: 9, placeholder: "501234567" },
  { name: "Germany", code: "+49", length: 11, placeholder: "1701234567" },
  { name: "France", code: "+33", length: 9, placeholder: "612345678" },
  { name: "Other", code: "", length: 0, placeholder: "Phone number" }
];

export function PhoneInput({
  label,
  name,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  required?: boolean;
}) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [customCode, setCustomCode] = useState("");
  const [localNumber, setLocalNumber] = useState("");
  const [focused, setFocused] = useState(false);
  const [customCodeFocused, setCustomCodeFocused] = useState(false);

  // Sync internal state with external value
  useEffect(() => {
    if (!value) {
      setLocalNumber("");
      setCustomCode("");
      setSelectedCountry(countries[0]);
      return;
    }

    // Try to find if the value starts with one of our known country codes
    const sortedCountries = [...countries]
      .filter(c => c.code)
      .sort((a, b) => b.code.length - a.code.length);

    const matched = sortedCountries.find(c => value.startsWith(c.code));
    if (matched) {
      setSelectedCountry(matched);
      setCustomCode("");
      const local = value.substring(matched.code.length).trim();
      setLocalNumber(local);
    } else {
      // It must be "Other" or a custom code
      setSelectedCountry(countries.find(c => c.name === "Other") || countries[countries.length - 1]);
      
      // Parse custom country code vs local number (e.g. "+55 123456")
      const parts = value.trim().split(/\s+/);
      if (parts[0] && parts[0].startsWith("+")) {
        setCustomCode(parts[0]);
        setLocalNumber(parts.slice(1).join(" "));
      } else {
        setCustomCode("");
        setLocalNumber(value);
      }
    }
  }, [value]);

  const handleCountryChange = (countryName: string) => {
    const c = countries.find(item => item.name === countryName) || countries[countries.length - 1];
    setSelectedCountry(c);

    if (c.name === "Other") {
      setCustomCode("+");
      onChange(name, `+ ${localNumber}`);
    } else {
      setCustomCode("");
      onChange(name, c.code ? `${c.code} ${localNumber}` : localNumber);
    }
  };

  const handleCustomCodeChange = (val: string) => {
    // Only allow characters suitable for country code (e.g., +, numbers)
    const cleaned = val.replace(/[^\d+]/g, "");
    setCustomCode(cleaned);
    onChange(name, cleaned ? `${cleaned} ${localNumber}` : localNumber);
  };

  const handleNumberChange = (val: string) => {
    // If selected country has a fixed length, only allow digits
    const digitsOnly = selectedCountry.length > 0 ? val.replace(/\D/g, "") : val;
    setLocalNumber(digitsOnly);

    if (selectedCountry.name === "Other") {
      onChange(name, customCode ? `${customCode} ${digitsOnly}` : digitsOnly);
    } else {
      onChange(name, selectedCountry.code ? `${selectedCountry.code} ${digitsOnly}` : digitsOnly);
    }
  };

  const showCustomCodeInput = selectedCountry.name === "Other";
  const digits = localNumber.replace(/\D/g, "");
  const isInvalidLength = selectedCountry.length > 0 && digits.length > 0 && digits.length !== selectedCountry.length;
  
  const floating = focused || localNumber.length > 0;
  const customCodeFloating = customCodeFocused || customCode.length > 0;

  return (
    <div className="relative space-y-1 sm:col-span-1">
      <div className="flex gap-2">
        {/* Country Select */}
        <div className={`relative ${showCustomCodeInput ? "w-24" : "w-32"} shrink-0`}>
          <select
            value={selectedCountry.name}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full h-full bg-transparent border border-border rounded-2xl px-3 pt-5 pb-2 text-foreground focus:outline-none focus:border-primary appearance-none cursor-pointer text-sm bg-card"
          >
            {countries.map((c, i) => (
              <option key={`${c.name}-${i}`} value={c.name} className="bg-card">
                {c.name === "Other" ? "Other" : `${c.code} (${c.name.substring(0, 3)})`}
              </option>
            ))}
          </select>
          <label className="absolute left-3 top-2 text-[10px] tracking-widest uppercase text-primary/80 pointer-events-none">
            Country
          </label>
        </div>

        {/* Custom Country Code Input */}
        {showCustomCodeInput && (
          <div className="relative w-20 shrink-0">
            <input
              type="text"
              required={required}
              value={customCode}
              onChange={(e) => handleCustomCodeChange(e.target.value)}
              onFocus={() => setCustomCodeFocused(true)}
              onBlur={() => setCustomCodeFocused(false)}
              className="w-full h-full bg-transparent border border-border rounded-2xl px-3 pt-5 pb-2 text-foreground focus:outline-none focus:border-primary text-sm transition-all"
            />
            <label className={`absolute left-3 pointer-events-none transition-all ${customCodeFloating ? "top-2 text-[10px] tracking-widest uppercase text-primary/80" : "top-4 text-sm text-muted-foreground"}`}>
              Code
            </label>
          </div>
        )}

        {/* Local Phone Number Input */}
        <div className="relative flex-1">
          <input
            type="tel"
            required={required}
            value={localNumber}
            onChange={(e) => handleNumberChange(e.target.value)}
            placeholder={focused && selectedCountry.length > 0 ? selectedCountry.placeholder : ""}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            maxLength={selectedCountry.length > 0 ? selectedCountry.length : undefined}
            pattern={selectedCountry.length > 0 ? `\\d{${selectedCountry.length}}` : undefined}
            title={selectedCountry.length > 0 ? `Must be exactly ${selectedCountry.length} digits` : undefined}
            className={`w-full bg-transparent border ${
              isInvalidLength ? "border-destructive/60 focus:border-destructive" : "border-border focus:border-primary focus:glow-gold"
            } rounded-2xl px-4 pt-5 pb-2 text-foreground focus:outline-none transition-all`}
          />
          <label className={`absolute left-4 pointer-events-none transition-all ${floating ? "top-2 text-[11px] tracking-widest uppercase text-primary/80" : "top-4 text-sm text-muted-foreground"}`}>
            {label}{required && " *"}
          </label>
        </div>
      </div>

      {isInvalidLength && (
        <span className="text-[10px] text-destructive pl-2 block animate-fade-in">
          Must be exactly {selectedCountry.length} digits.
        </span>
      )}
    </div>
  );
}
