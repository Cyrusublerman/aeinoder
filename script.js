// Utility function to load an HTML component into a target element
async function loadComponent(selector, url) {
    const container = document.querySelector(selector);
    if (container) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to load ${url}: ${response.statusText}`);
        }
        const html = await response.text();
        container.innerHTML = html;
      } catch (error) {
        console.error(error);
        container.innerHTML = `<p>Error loading component.</p>`;
      }
    }
  }
  
  // Load components once the DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    loadComponent("#header", "partials/header.html");
    loadComponent("#nav", "partials/nav.html");
    loadComponent("#footer", "partials/footer.html");
  });
  