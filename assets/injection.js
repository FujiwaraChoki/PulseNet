document.addEventListener('DOMContentLoaded', () => {
    // Get all current parameters
    const params = new URLSearchParams(window.location.search);
    const responseObject = {};

    if (params.timezone === '1') {
        // Get the current timezone
        responseObject.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    if (params.date === '1') {
        // Get the current date
        responseObject.date = new Date().toLocaleDateString();
    }

    if (params.time === '1') {
        // Get the current time
        responseObject.time = new Date().toLocaleTimeString();
    }

    if (params.language === '1') {
        // Get the current language
        responseObject.language = navigator.language;
    }

    if (params.browser === '1') {
        // Get the current browser
        responseObject.browser = navigator.userAgent;
    }

    if (params.ip === '1') {
        // Get the current IP
        fetch('https://api.ipify.org?format=json')
            .then((response) => response.json())
            .then((data) => {
                responseObject.ip = data.ip;
            });
    }

    if (params.country === '1') {
        // Get current country
        responseObject.country = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[0];
    }

    if (params.plugins === '1') {
        // Get installed plugins
        responseObject.plugins = navigator.plugins;
    }

    if (params.os === '1') {
        // Get os version

        responseObject.os = navigator.platform;
    }

    if (params.resolution === '1') {
        // Get screen resolution
        responseObject.resolution = `${window.screen.width}x${window.screen.height}`;
    }

    if (params.cookies === '1') {
        // Get cookies
        responseObject.cookies = document.cookie;
    }

    // Send the data to the server
    fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseObject),
    });
});
