const locationBox = document.getElementById("locationBox");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const detectButton = document.getElementById("detectButton");

// Show popup when textbox is clicked
locationBox.addEventListener("click", () => {
  popup.classList.remove("d-none");

  // Get the position of the input box
  const rect = locationBox.getBoundingClientRect();

  // Position the popup directly below the input box
  const popupTop = rect.bottom + window.scrollY + 5; // 5px gap
  const popupLeft = rect.left + window.scrollX; // Account for page horizontal scroll

  // Position the popup
  popup.style.top = `${popupTop}px`;
  popup.style.left = `${popupLeft}px`;
});

// Detect location and update textbox
detectButton.addEventListener("click", () => {
  popupText.textContent = "Fetching your location...";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Reverse geocoding to fetch the address
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const address = data.display_name || "Location detected, but no address found.";
          locationBox.value = address;
        } catch (error) {
          locationBox.value = `Lat: ${latitude}, Lng: ${longitude}`;
        } finally {
          popup.classList.add("d-none"); // Hide popup
          popupText.textContent = "Do you want to detect your current location?";
        }
      },
      (error) => {
        alert("Error detecting location: " + error.message);
        popupText.textContent = "Do you want to detect your current location?";
        popup.classList.add("d-none");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
    popupText.textContent = "Do you want to detect your current location?";
    popup.classList.add("d-none");
  }
});

// Close popup if clicked outside
document.addEventListener("click", (e) => {
  if (!popup.contains(e.target) && e.target !== locationBox) {
    popup.classList.add("d-none");
    popupText.textContent = "Do you want to detect your current location?";
  }
});

const cartIcon = document.getElementById("cart-icon");
cartIcon.addEventListener("click", () => {
  cartIcon.classList.add("ringing");
  setTimeout(() => {
    cartIcon.classList.remove("ringing");
  }, 600); 
});



