document.addEventListener('DOMContentLoaded', () => {
    // Get the current URL
    const url = window.location.href;
    // Get the current timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Get the current date
    const date = new Date().toLocaleDateString();
    // Get the current time
    const time = new Date().toLocaleTimeString();
    // Get the current language
    const language = navigator.language;
    // Get the current browser
    const browser = navigator.userAgent;
    // Get current country
    const country = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[0];
    // Get installed plugins
    const plugins = navigator.plugins;
    // Get os version
    const os = navigator.platform;
    // Get screen resolution
    const resolution = `${window.screen.width}x${window.screen.height}`;
    // Get the current IP
    fetch('https://api.ipify.org?format=json')
        .then((response) => response.json())
        .then((data) => {
            // Send the data to the server
            fetch('https://localhost:3000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url,
                    timezone,
                    date,
                    time,
                    language,
                    browser,
                    ip: data.ip,
                    country,
                    plugins,
                    os,
                    resolution,
                }),
            });
        });
});
