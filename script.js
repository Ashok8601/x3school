/**
 * Function to load an external HTML file content into a specific element.
 *
 * NOTE: When running on a server (e.g., Live Server), paths starting with /
 * (e.g., '/header.html') refer to the root of the server, making them
 * work regardless of the page's subfolder location.
 *
 * @param {string} url - The path to the HTML file (e.g., '/header.html').
 * @param {string} elementId - The ID of the element where the content should be loaded.
 */
function loadComponent(url, elementId) {
    // Check if the element exists on the page
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID '${elementId}' not found.`);
        return;
    }

    // Use the Fetch API to get the HTML content
    fetch(url)
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                // If using file://, this might show status 0.
                throw new Error(`HTTP error! status: ${response.status} for URL: ${url}`);
            }
            return response.text();
        })
        .then(data => {
            // Insert the fetched HTML content into the placeholder element
            element.innerHTML = data;
        })
        .catch(error => {
            console.error(`Error loading component from ${url}:`, error);
        });
}

// Load the header and footer components when the entire page is loaded
document.addEventListener('DOMContentLoaded', () => {
    // CRITICAL CHANGE: Use absolute paths (starting with '/')
    // This tells the browser to look for the file starting from the server's root directory.
    loadComponent('/header.html', 'header-placeholder');
    loadComponent('/footer.html', 'footer-placeholder');
});