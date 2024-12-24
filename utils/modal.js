// Select the modal element and the text paragraph inside it
const modal = document.getElementById("modal");
const modalText = modal.querySelector("p");

// Function to show the modal with specified text
const showModal = (text) => {
  modalText.innerText = text; // Set the text of the modal
  modal.style.display = "flex"; // Display the modal using flexbox for centering
};

// Function to hide the modal
const removeModal = () => {
  modal.style.display = "none"; // Set display to none to hide the modal
};

// Export the functions for use in other modules
export { showModal, removeModal };
