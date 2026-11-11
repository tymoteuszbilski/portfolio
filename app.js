// Envelope hover reveals email in neighbouring cell
const envelope = document.querySelector("#envelope");
const emailCell = document.querySelector(".email");

if (envelope && emailCell) {
  envelope.addEventListener("mouseenter", () => {
    emailCell.classList.add("visible");
  });

  envelope.addEventListener("mouseleave", () => {
    emailCell.classList.remove("visible");
  });

  envelope.addEventListener("focus", () => {
    emailCell.classList.add("visible");
  });

  envelope.addEventListener("blur", () => {
    emailCell.classList.remove("visible");
  });

  const email = emailCell.textContent.trim();

  envelope.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);

      emailCell.textContent = "C O P I E D";
      emailCell.classList.add("email-visible");

      setTimeout(() => {
        emailCell.textContent = email;
      }, 2000);
    } catch (error) {
      console.error("Could not copy email:", error);
    }
  });
}

const sections = [...document.querySelectorAll(".view")];
const gallerySections = sections.filter((section) =>
  section.classList.contains("gallery_slide"),
);
let currentIndex = 0;

function showSection(index) {
  currentIndex = Math.max(0, Math.min(index, sections.length - 1));
  sections.forEach((section, sectionIndex) => {
    section.classList.toggle("is-active", sectionIndex === currentIndex);
    section.classList.toggle("is-before", sectionIndex < currentIndex);
    section.setAttribute(
      "aria-hidden",
      sectionIndex === currentIndex ? "false" : "true",
    );
  });
}

document
  .querySelector(".open_gallery_button")
  ?.addEventListener("click", () => showSection(1));

gallerySections.forEach((section) => {
  section
    .querySelector(".gallery_button")
    ?.addEventListener("click", () => section.classList.toggle("expanded"));
  section
    .querySelector(".previous_button")
    ?.addEventListener("click", () =>
      showSection(Math.max(1, currentIndex - 1)),
    );
  section
    .querySelector(".next_button")
    ?.addEventListener("click", () =>
      showSection(Math.min(sections.length - 1, currentIndex + 1)),
    );
  section
    .querySelector(".menu_button")
    ?.addEventListener("click", () => showSection(0));
});

// Disable page scrolling by gestures and keys; horizontal image-carousel scrolling is preserved.
document.addEventListener(
  "wheel",
  (event) => {
    if (!event.target.closest(".items_carousel")) event.preventDefault();
  },
  { passive: false },
);
document.addEventListener(
  "touchmove",
  (event) => {
    if (!event.target.closest(".items_carousel")) event.preventDefault();
  },
  { passive: false },
);
document.addEventListener("keydown", (event) => {
  if (
    ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(
      event.key,
    )
  )
    event.preventDefault();
});

showSection(0);

// Add carousel arrow controls
gallerySections.forEach((section) => {
  const carousel = section.querySelector(".items_carousel");

  if (!carousel) return;

  // Create arrow buttons
  const previousArrow = section.querySelector("#carousel_button_previous");

  const nextArrow = section.querySelector("#carousel_button_next");

  // Move by one carousel tile
  function moveCarousel(direction) {
    carousel.scrollBy({
      left: direction * 400,
      behavior: "smooth",
    });
  }

  previousArrow.addEventListener("click", () => moveCarousel(-1));
  nextArrow.addEventListener("click", () => moveCarousel(1));
});
