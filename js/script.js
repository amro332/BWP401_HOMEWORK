document.addEventListener("DOMContentLoaded", function () {
  setupFeaturedCarousel();
  setupEventsFilters();
  setupContactFormValidation();
});

function setupFeaturedCarousel() {
  const carouselElement = document.querySelector("#featuredCarousel");
  if (!carouselElement) return;

  new bootstrap.Carousel(carouselElement, {
    interval: 3500,
    pause: "hover"
  });
}

function setupEventsFilters() {
  const page = document.body.dataset.page;
  if (page !== "events") return;

  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const locationFilter = document.getElementById("locationFilter");
  const dateFilter = document.getElementById("dateFilter");
  const clearButton = document.getElementById("clearFilters");
  const items = document.querySelectorAll(".event-item");
  const noResults = document.getElementById("noResults");

  function applyFilters() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedLocation = locationFilter.value;
    const selectedDate = dateFilter.value;

    let visibleCount = 0;

    items.forEach((item) => {
      const itemCategory = item.dataset.category;
      const itemDate = item.dataset.date;
      const itemTitle = item.dataset.title.toLowerCase();
      const itemLocation = item.dataset.location.toLowerCase();

      const matchSearch = !searchValue || itemTitle.includes(searchValue) || itemLocation.includes(searchValue);
      const matchCategory = selectedCategory === "all" || itemCategory === selectedCategory;
      const matchLocation = selectedLocation === "all" || item.dataset.location === selectedLocation;
      const matchDate = !selectedDate || itemDate === selectedDate;

      const shouldShow = matchSearch && matchCategory && matchLocation && matchDate;
      item.classList.toggle("d-none", !shouldShow);

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    noResults.classList.toggle("d-none", visibleCount > 0);
  }

  searchInput.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);
  locationFilter.addEventListener("change", applyFilters);
  dateFilter.addEventListener("change", applyFilters);

  clearButton.addEventListener("click", function () {
    searchInput.value = "";
    categoryFilter.value = "all";
    locationFilter.value = "all";
    dateFilter.value = "";
    applyFilters();
  });

  applyFilters();
}

function setupContactFormValidation() {
  const page = document.body.dataset.page;
  if (page !== "contact") return;

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const alertBox = document.getElementById("formAlert");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameValid = nameInput.value.trim().length >= 2;
    const emailValid = emailRegex.test(emailInput.value.trim());
    const messageValid = messageInput.value.trim().length >= 10;

    toggleInputValidation(nameInput, nameValid);
    toggleInputValidation(emailInput, emailValid);
    toggleInputValidation(messageInput, messageValid);

    if (nameValid && emailValid && messageValid) {
      alertBox.className = "alert alert-success";
      alertBox.textContent = "تم إرسال رسالتك بنجاح. شكرًا لتواصلك معنا.";
      alertBox.classList.remove("d-none");
      form.reset();
    } else {
      alertBox.className = "alert alert-danger";
      alertBox.textContent = "يوجد خطأ في البيانات. تأكد من تعبئة جميع الحقول بشكل صحيح.";
      alertBox.classList.remove("d-none");
    }
  });
}

function toggleInputValidation(input, isValid) {
  input.classList.toggle("is-valid", isValid);
  input.classList.toggle("is-invalid", !isValid);
}
