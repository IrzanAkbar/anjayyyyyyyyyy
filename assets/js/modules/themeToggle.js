// Di themeToggle.js
export function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isDark = !body.classList.contains('light-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Set tema awal
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.toggle('light-theme', savedTheme === 'light');
}