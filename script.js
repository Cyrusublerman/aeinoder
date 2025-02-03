const config = {
    targetBU: 16, // Base unit in pixels
    bodyFont: 'Syne Mono',
    maxContainerWidth: 1200, // Maximum container width
    minContainerWidth: 300,  // Minimum container width
    componentSizes: {
      h1: 6 / 1,
      h2: 6 / 2,
      h3: 6 / 3,
      h4: 6 / 4,
      h5: 6 / 5,
      h6: 6 / 6,
      p: 1,
    },
    fontWidthRatios: {
      'Rubik Mono One': 0.85,
      'Space Mono': 0.61,
      'Syne Mono': 0.55,
    },
  };
  
  function calculateBaseUnit(containerWidth) {
    return Math.min(containerWidth * 0.01, config.targetBU); // Base unit = 1% of container width, capped
  }
  
  function adjustTypography(baseUnit, containerWidth) {
    // Adjust typography dynamically
    Object.entries(config.componentSizes).forEach(([tag, multiplier]) => {
      document.querySelectorAll(tag).forEach((element) => {
        const fontFamily = window
          .getComputedStyle(element)
          .fontFamily.split(',')[0]
          .replace(/['"]/g, '');
        const fontRatio = config.fontWidthRatios[fontFamily] || 1;
  
        const fontSize = (baseUnit * multiplier) / fontRatio;
        element.style.fontSize = `${fontSize}px`;
        element.style.lineHeight = `${fontSize * 1.25}px`;
  
        // Add internal padding
        element.style.padding = `${baseUnit * 0.5}px`;
      });
    });
  
    // Adjust title
    const title = document.querySelector('.grid-title');
    if (title) {
      const titleFontSize = Math.min(containerWidth / title.textContent.length, baseUnit * 3);
      title.style.fontSize = `${titleFontSize}px`;
      title.style.lineHeight = `${titleFontSize * 1.1}px`;
      title.style.marginBottom = `${baseUnit}px`;
  
      // Align title edges with container edges
      title.style.width = `${containerWidth}px`;
      title.style.margin = '0 auto';
    }
  }
  
  function adjustModuleLayout(baseUnit, containerWidth) {
    const gutterWidth = baseUnit * 1.5; // Gutters = 1.5 BU
    const borderWidth = baseUnit * 0.2; // Borders = 0.2 BU
    const padding = baseUnit * 1; // Padding = 1 BU
    const fullWidth = containerWidth - 2 * borderWidth;
    const halfWidth = (fullWidth - gutterWidth) / 2;
  
    // Adjust grid container
    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
      gridContainer.style.maxWidth = `${config.maxContainerWidth}px`;
      gridContainer.style.minWidth = `${config.minContainerWidth}px`;
      gridContainer.style.margin = '0 auto';
      gridContainer.style.borderWidth = `${borderWidth}px`;
      gridContainer.style.padding = '0';
    }
  
    // Adjust modules
    document.querySelectorAll('.module').forEach((module) => {
      module.style.borderWidth = `${borderWidth}px`;
      module.style.marginTop = `-${borderWidth}px`;
      module.style.marginLeft = `-${borderWidth}px`;
      module.style.padding = `${padding}px`;
    });
  
    // Full-width modules
    document.querySelectorAll('.module--full-width').forEach((module) => {
      module.style.width = `${fullWidth}px`;
    });
  
    // Half-width modules
    document.querySelectorAll('.module--half-width').forEach((module, index) => {
      module.style.width = `${halfWidth}px`;
      module.style.display = 'inline-block'; // Use inline-block for proper alignment
      module.style.verticalAlign = 'top'; // Align modules vertically
      module.style.margin = `0 ${gutterWidth / 2}px`; // Add gutters symmetrically
    });
  
    // Adjust gallery items
    document.querySelectorAll('.gallery-item').forEach((item) => {
      item.style.borderWidth = `${borderWidth}px`;
      item.style.marginTop = `-${borderWidth}px`;
      item.style.marginLeft = `-${borderWidth}px`;
      item.style.padding = `${padding}px`;
    });
  
    // Adjust footer
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.padding = `${baseUnit * 1.5}px`;
      footer.style.borderTopWidth = `${borderWidth}px`;
    }
  }
  
  function adjustLayout() {
    const container = document.querySelector('.grid-container');
    if (!container) return;
  
    const containerWidth = Math.min(
      Math.max(container.offsetWidth, config.minContainerWidth),
      config.maxContainerWidth
    );
    const baseUnit = calculateBaseUnit(containerWidth);
  
    adjustModuleLayout(baseUnit, containerWidth);
    adjustTypography(baseUnit, containerWidth);
  }
  
  // Event listeners for layout adjustments
  window.addEventListener('resize', () => {
    clearTimeout(window.layoutResizeTimeout);
    window.layoutResizeTimeout = setTimeout(adjustLayout, 150);
  });
  document.addEventListener('DOMContentLoaded', adjustLayout);
  