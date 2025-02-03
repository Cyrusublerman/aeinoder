// Configuration
const config = {
    targetBU: 16, // Base unit in pixels
    maxContainerWidth: 1200,
    minContainerWidth: 300,
    componentSizes: {
        h1: 6/1,
        h2: 6/2,
        h3: 6/3,
        h4: 6/4,
        h5: 6/5,
        h6: 6/6,
        p: 1
    },
    fontWidthRatios: {
        'Rubik Mono One': 0.85,
        'Space Mono': 0.61,
        'Syne Mono': 0.55
    }
};

// Calculate base unit based on container width
function calculateBaseUnit(containerWidth) {
    return Math.min(containerWidth * 0.01, config.targetBU);
}

// Adjust typography based on container size
function adjustTypography(baseUnit, containerWidth) {
    Object.entries(config.componentSizes).forEach(([tag, multiplier]) => {
        document.querySelectorAll(tag).forEach(element => {
            const fontFamily = window
                .getComputedStyle(element)
                .fontFamily
                .split(',')[0]
                .replace(/['\"]/g, '');
            const fontRatio = config.fontWidthRatios[fontFamily] || 1;
            
            const fontSize = baseUnit * multiplier / fontRatio;
            element.style.fontSize = `${fontSize}px`;
            element.style.lineHeight = `${fontSize * 1.25}px`;
        });
    });

    // Adjust title
    const title = document.querySelector('h1');
    if (title) {
        const titleFontSize = Math.min(containerWidth / title.textContent.length, baseUnit * 3);
        title.style.fontSize = `${titleFontSize}px`;
        title.style.lineHeight = `${titleFontSize * 1.1}px`;
        title.style.marginBottom = `${baseUnit}px`;
    }
}

// Adjust module layout based on container size
function adjustModuleLayout(baseUnit, containerWidth) {
    const gutterWidth = baseUnit * 1.5;
    const borderWidth = baseUnit * 0.2;
    const padding = baseUnit;
    
    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
        gridContainer.style.maxWidth = `${config.maxContainerWidth}px`;
        gridContainer.style.minWidth = `${config.minContainerWidth}px`;
        gridContainer.style.borderWidth = `${borderWidth}px`;
    }

    // Adjust modules
    document.querySelectorAll('.module').forEach(module => {
        module.style.borderWidth = `${borderWidth}px`;
        module.style.padding = `${padding}px`;
    });

    // Adjust gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.borderWidth = `${borderWidth}px`;
    });
}

// Main layout adjustment function
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

// Event listeners
window.addEventListener('resize', () => {
    clearTimeout(window.layoutResizeTimeout);
    window.layoutResizeTimeout = setTimeout(adjustLayout, 150);
});

document.addEventListener('DOMContentLoaded', adjustLayout);

// Navigation toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const details = document.querySelector('details');
    if (details) {
        const summary = details.querySelector('summary');
        if (summary) {
            summary.addEventListener('click', () => {
                const isOpen = details.hasAttribute('open');
                summary.textContent = isOpen ? '≡ Expand links' : '≡ Minimise links';
            });
        }
    }
});