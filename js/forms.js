// Country codes list matching React component
const countries = [
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

document.addEventListener("DOMContentLoaded", () => {
  initPhoneInputs();
  initFormSubmissions();
});

// Recreate the dynamic country code logic
function initPhoneInputs() {
  const container = document.getElementById("phone-container");
  if (!container) return;

  const select = container.querySelector(".country-select");
  const customCodeWrapper = container.querySelector(".custom-code-wrapper");
  const customCodeInput = container.querySelector(".custom-code-input");
  const phoneInput = container.querySelector(".phone-number-input");
  const errorText = document.querySelector(".phone-error-text");
  const hiddenInput = document.getElementById("phone-formatted");

  if (!select || !phoneInput) return;

  const getSelectedCountry = () => {
    return countries.find(c => c.name === select.value) || countries[countries.length - 1];
  };

  const updateFormattedValue = () => {
    const c = getSelectedCountry();
    const val = phoneInput.value;
    const digits = c.length > 0 ? val.replace(/\D/g, "") : val;
    
    // Check validation length
    if (c.length > 0 && digits.length > 0 && digits.length !== c.length) {
      phoneInput.classList.add("border-destructive/60", "focus:border-destructive");
      if (errorText) {
        errorText.textContent = `Must be exactly ${c.length} digits.`;
        errorText.classList.remove("hidden");
      }
    } else {
      phoneInput.classList.remove("border-destructive/60", "focus:border-destructive");
      if (errorText) errorText.classList.add("hidden");
    }

    // Set hidden output format
    if (hiddenInput) {
      if (c.name === "Other") {
        const customCode = customCodeInput ? customCodeInput.value.replace(/[^\d+]/g, "") : "";
        hiddenInput.value = customCode ? `${customCode} ${digits}` : digits;
      } else {
        hiddenInput.value = c.code ? `${c.code} ${digits}` : digits;
      }
    }
  };

  select.addEventListener("change", () => {
    const c = getSelectedCountry();
    
    // Toggle custom code field
    if (c.name === "Other") {
      customCodeWrapper.classList.remove("hidden");
      if (customCodeInput) customCodeInput.value = "+";
    } else {
      customCodeWrapper.classList.add("hidden");
    }

    // Set limits & placeholder
    if (c.length > 0) {
      phoneInput.maxLength = c.length;
      phoneInput.placeholder = c.placeholder;
    } else {
      phoneInput.removeAttribute("maxLength");
      phoneInput.placeholder = "Phone number";
    }

    // Remove letters if needed
    if (c.length > 0) {
      phoneInput.value = phoneInput.value.replace(/\D/g, "");
    }

    updateFormattedValue();
  });

  if (customCodeInput) {
    customCodeInput.addEventListener("input", () => {
      customCodeInput.value = customCodeInput.value.replace(/[^\d+]/g, "");
      updateFormattedValue();
    });
  }

  phoneInput.addEventListener("input", () => {
    const c = getSelectedCountry();
    if (c.length > 0) {
      phoneInput.value = phoneInput.value.replace(/\D/g, "");
    }
    updateFormattedValue();
  });

  // Focus label effects
  const floatLabel = (input, label) => {
    if (!input || !label) return;
    input.addEventListener("focus", () => {
      label.classList.remove("top-4", "text-sm", "text-muted-foreground");
      label.classList.add("top-2", "text-[11px]", "tracking-widest", "uppercase", "text-primary/80");
    });
    input.addEventListener("blur", () => {
      if (input.value.length === 0) {
        label.classList.remove("top-2", "text-[11px]", "tracking-widest", "uppercase", "text-primary/80");
        label.classList.add("top-4", "text-sm", "text-muted-foreground");
      }
    });
    // Check initial
    if (input.value.length > 0) {
      label.classList.remove("top-4", "text-sm", "text-muted-foreground");
      label.classList.add("top-2", "text-[11px]", "tracking-widest", "uppercase", "text-primary/80");
    }
  };

  const phoneLabel = container.querySelector("label[for='phone']");
  floatLabel(phoneInput, phoneLabel);

  if (customCodeInput) {
    const customCodeLabel = customCodeWrapper.querySelector("label");
    floatLabel(customCodeInput, customCodeLabel);
  }
}

// Form Submissions
function initFormSubmissions() {
  const forms = document.querySelectorAll("form[data-form-kind]");
  
  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const kind = form.getAttribute("data-form-kind");
      const submitBtn = form.querySelector("button[type='submit']");
      const errorContainer = form.querySelector(".form-error-container");
      const successOverlay = form.querySelector(".form-success-overlay");
      const formContent = form.querySelector(".form-content");

      // Verify formatted phone number length
      const phoneInput = form.querySelector(".phone-number-input");
      if (phoneInput) {
        const container = document.getElementById("phone-container");
        const select = container.querySelector(".country-select");
        const c = countries.find(item => item.name === select.value) || countries[countries.length - 1];
        const digits = phoneInput.value.replace(/\D/g, "");
        
        if (c.length > 0 && digits.length !== c.length) {
          alert(`Phone number must be exactly ${c.length} digits.`);
          phoneInput.focus();
          return;
        }
      }

      // Hide error
      if (errorContainer) {
        errorContainer.classList.add("hidden");
        errorContainer.textContent = "";
      }

      // Show sending state
      if (submitBtn) {
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="inline-flex items-center gap-2"><svg class="animate-spin h-4 w-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...</span>';
        submitBtn.dataset.originalText = originalText;
      }

      // Prepare payload
      const formData = new FormData(form);
      const payload = {
        kind: kind
      };

      formData.forEach((value, key) => {
        if (key !== "phone_raw") {
          payload[key] = value;
        }
      });

      // Override phone with formatted value if present
      const formattedPhone = document.getElementById("phone-formatted");
      if (formattedPhone) {
        payload["phone"] = formattedPhone.value;
      }

      // Local preview protocol warning
      if (window.location.protocol === "file:") {
        if (errorContainer) {
          errorContainer.innerHTML = "<strong>Local Preview Notice:</strong> Email submissions do not work when opening HTML files directly from your computer (file:// protocol). Please upload these files to your hosting server (Hostinger, GoDaddy, cPanel) or run a local server to test the form.";
          errorContainer.classList.remove("hidden");
        } else {
          alert("Email submissions do not work when opening HTML files directly from your computer (file:// protocol). Please upload these files to your hosting server.");
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtn.dataset.originalText;
        }
        return;
      }

      try {
        const response = await fetch("send-email.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        let result;
        try {
          result = await response.json();
        } catch (jsonErr) {
          throw new Error("Unable to parse email server response. Please make sure PHP is running on your server.");
        }

        if (response.ok && result.ok) {
          // Success state
          if (successOverlay && formContent) {
            formContent.classList.add("hidden");
            successOverlay.classList.remove("hidden");
            form.reset();
            
            // Re-sync phone
            const phoneInput = form.querySelector(".phone-number-input");
            if (phoneInput) phoneInput.value = "";
            const select = form.querySelector(".country-select");
            if (select) {
              select.value = countries[0].name;
              select.dispatchEvent(new Event("change"));
            }
          }
        } else {
          throw new Error((result && result.error) || "Unable to send. Please try again.");
        }
      } catch (err) {
        // Error state
        if (errorContainer) {
          errorContainer.textContent = err.message;
          errorContainer.classList.remove("hidden");
        } else {
          alert(`Error: ${err.message}`);
        }
      } finally {
        // Restore button state
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtn.dataset.originalText;
        }
      }
    });
  });

  // Handle send another click
  const retryBtns = document.querySelectorAll(".form-retry-btn");
  retryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const form = btn.closest("form");
      const successOverlay = form.querySelector(".form-success-overlay");
      const formContent = form.querySelector(".form-content");
      if (successOverlay && formContent) {
        successOverlay.classList.add("hidden");
        formContent.classList.remove("hidden");
      }
    });
  });
}
