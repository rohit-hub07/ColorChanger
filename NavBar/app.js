function colorChanger() {
  const createBtn = document.getElementById("create");
  const displayBtn = document.getElementById("btns");
  const dropDowns = document.getElementById("dropdown");
  const hexInput = document.getElementById("hexInput");

  // Helper function to validate hex codes (3 or 6 digits)
  function isValidHex(color) {
    return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
  }

  // Helper function to determine text color (black or white) based on background brightness
  function getContrastColor(hex) {
    if (!hex.startsWith("#")) return "white";
    hex = hex.substring(1);
    if (hex.length === 3) {
      // Expand shorthand (e.g., "abc" becomes "aabbcc")
      hex = hex.split("").map(function(c) { return c + c; }).join("");
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "black" : "white";
  }

  // Main event listener for the Create button
  createBtn.addEventListener("click", function () {
    let value = dropDowns.value.trim();
    const hexValue = hexInput.value.trim();

    // Use the hex input if it's valid, otherwise use the dropdown value
    if (isValidHex(hexValue)) {
      value = hexValue;
    } else if (!value) {
      alert("Please select a color or enter a valid hex code.");
      return;
    }

    const button = document.createElement("button");
    button.innerText = value.startsWith("#")
      ? value.toUpperCase()
      : dropDowns.options[dropDowns.selectedIndex].text;
    button.style.backgroundColor = value;
    button.style.color = getContrastColor(value);
    button.style.border = "none";
    button.style.padding = "8px 12px";
    button.style.margin = "5px";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.transition = "0.3s";

    displayBtn.appendChild(button);

    button.addEventListener("click", function () {
      document.body.style.backgroundColor = value;
    });

    // Clear the hex input after button creation
    hexInput.value = "";
  });
}

// Initialize the colorChanger module once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  colorChanger();
});
