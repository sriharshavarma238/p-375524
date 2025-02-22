
export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    // Add a temporary highlight animation class
    section.classList.add('highlight-section');
    
    section.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });

    // Remove the highlight class after animation completes
    setTimeout(() => {
      section.classList.remove('highlight-section');
    }, 2000);
  }
};
