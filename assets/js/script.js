'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

//Silk background
const canvas = document.getElementById('silkCanvas');
        const ctx = canvas.getContext('2d');

        let animationFrameId = null;
        let time = 0; // Global time for animation

        // Configuration mirroring original shader uniforms' default values
        const config = {
            speed: 15,             // uSpeed from original code
            scale: 1.0,           // uScale from original code
            baseColor: { r: 123, g: 116, b: 129 }, // #7B7481 (uColor) from original, converted to RGB
            noiseIntensity: 1.5,  // uNoiseIntensity from original code - increased slightly for more visible static
            rotationAngle: 0      // uRotation from original code (in radians)
        };

        // --- Shader-like Helper Functions (Directly Translated from GLSL) ---

        /**
         * Converts hex color string to RGB object {r, g, b}.
         * Canvas uses 0-255 per channel.
         * @param {string} hex - Hex color string (e.g., "#RRGGBB").
         * @returns {object} RGB object.
         */
        function hexToRGB(hex) {
            hex = hex.replace("#", "");
            return {
                r: parseInt(hex.slice(0, 2), 16),
                g: parseInt(hex.slice(2, 4), 16),
                b: parseInt(hex.slice(4, 6), 16)
            };
        }

        /**
         * Replicates GLSL's fract() function.
         * @param {number} x - The number.
         * @returns {number} The fractional part of x.
         */
        function fract(x) {
            return x - Math.floor(x);
        }

        /**
         * A deterministic pseudo-random number generator based on coordinates.
         * This creates a more "static-like" noise pattern than the original shader's sinusoidal noise,
         * while remaining fixed per pixel across frames.
         * @param {number} x - X component of gl_FragCoord.xy (pixel x-coordinate).
         * @param {number} y - Y component of gl_FragCoord.xy (pixel y-coordinate).
         * @returns {number} A float value between 0 and 1.
         */
        function glslNoise(x, y) {
            // Use a large prime number and a fractional part to create a unique seed for each pixel
            // This is a common technique for deterministic "random" noise in shaders/canvas.
            const seed = (x * 12345.6789 + y * 98765.4321);
            return fract(Math.sin(seed) * 43758.5453); // Standard fractional part of sine for noise
        }

        /**
         * Replicates the GLSL rotateUvs function.
         * @param {number} uvX - X component of the UV coordinate (expected 0-1, but scaled from shader).
         * @param {number} uvY - Y component of the UV coordinate (expected 0-1, but scaled from shader).
         * @param {number} angle - Rotation angle in radians.
         * @returns {object} New {x, y} coordinates.
         */
        function rotateUvs(uvX, uvY, angle) {
            // Translate UVs so rotation happens around the center (0.5, 0.5)
            const translatedUvX = uvX - 0.5;
            const translatedUvY = uvY - 0.5;

            const c = Math.cos(angle);
            const s = Math.sin(angle);

            const rotatedX = translatedUvX * c - translatedUvY * s;
            const rotatedY = translatedUvX * s + translatedUvY * c;

            // Translate UVs back
            return { x: rotatedX + 0.5, y: rotatedY + 0.5 };
        }

        // --- Canvas and Animation Logic ---

        /**
         * Initializes or resizes the canvas to fill the window.
         */
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // When resizing, the next animation frame will redraw the content correctly.
        }

        /**
         * Main animation loop that draws the silk effect by directly manipulating pixels.
         */
        function animate() {
            animationFrameId = requestAnimationFrame(animate);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data; // This is a Uint8ClampedArray for [R, G, B, A, R, G, B, A, ...]

            // Update global time. The original uTime updated by 0.1 * delta.
            // Assuming delta is approx 1/60s (for 60fps), 0.1 * (1/60) = 0.001666...
            time += 0.00166; // Matches the approximate increment from the React/Three.js version

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const pixelIndex = (y * canvas.width + x) * 4;

                    // vUv from shader (normalized coordinates 0-1)
                    const normalizedX = x / canvas.width;
                    const normalizedY = y / canvas.height;

                    // 1. Apply uScale to vUv: `uv * uScale`
                    let uv_scaled_initial = {
                        x: normalizedX * config.scale,
                        y: normalizedY * config.scale
                    };

                    // 2. Apply uRotation using rotateUvs function: `rotateUvs(vUv * uScale, uRotation)`
                    let uv_rotated = rotateUvs(uv_scaled_initial.x, uv_scaled_initial.y, config.rotationAngle);

                    // 3. `tex = uv * uScale` (The original shader applies scale twice)
                    // Ensure the second scale is applied to the results of rotation
                    let tex = {
                        x: uv_rotated.x * config.scale,
                        y: uv_rotated.y * config.scale
                    };

                    // tOffset = uSpeed * uTime
                    const tOffset = config.speed * time;

                    // tex.y += 0.03 * sin(8.0 * tex.x - tOffset);
                    const modifiedTexY = tex.y + 0.03 * Math.sin(8.0 * tex.x - tOffset);

                    // pattern calculation
                    const patternTermA = 5.0 * (tex.x + modifiedTexY + Math.cos(3.0 * tex.x + 5.0 * modifiedTexY) + 0.02 * tOffset);
                    const patternTermB = Math.sin(20.0 * (tex.x + modifiedTexY - 0.1 * tOffset));
                    const pattern = 0.6 + 0.4 * Math.sin(patternTermA + patternTermB);

                    // rnd = noise(gl_FragCoord.xy)
                    // gl_FragCoord.xy are pixel coordinates, so pass x, y directly
                    const rnd = glslNoise(x, y);

                    // col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
                    // The subtraction term is `rnd / 15.0 * uNoiseIntensity`.
                    // This result is then subtracted from the color components (0-1 range).
                    // To apply this to 0-255 RGB values, we multiply by 255.
                    const noiseSubtractionNormalized = (rnd / 15.0) * config.noiseIntensity;
                    const noiseSubtractionPixels = noiseSubtractionNormalized * 255;

                    // Calculate final RGB values
                    let finalR = config.baseColor.r * pattern - noiseSubtractionPixels;
                    let finalG = config.baseColor.g * pattern - noiseSubtractionPixels;
                    let finalB = config.baseColor.b * pattern - noiseSubtractionPixels;

                    // Clamp values to 0-255 (important for ImageData)
                    pixels[pixelIndex] = Math.min(255, Math.max(0, finalR));     // Red
                    pixels[pixelIndex + 1] = Math.min(255, Math.max(0, finalG)); // Green
                    pixels[pixelIndex + 2] = Math.min(255, Math.max(0, finalB)); // Blue
                    pixels[pixelIndex + 3] = 255;    // Alpha (fully opaque)
                }
            }

            ctx.putImageData(imageData, 0, 0);
        }

        // --- Event Listeners and Initial Setup ---

        // Initial setup on window load
        window.onload = function() {
            resizeCanvas(); // Set initial canvas size
            animate();      // Start the animation loop
        };

        // Handle canvas resizing on window resize
        window.addEventListener('resize', () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId); // Stop current animation frame
            }
            resizeCanvas(); // Resize canvas
            animate();      // Restart animation with new dimensions
        });