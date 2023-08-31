document.addEventListener('DOMContentLoaded', async () => {
    // Get all current parameters
    const params = new URLSearchParams(window.location.search);
    const responseObject = {};

    if (params.get('timezone') === '1') {
        // Get the current timezone
        responseObject.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    if (params.get('date') === '1') {
        // Get the current date
        responseObject.date = new Date().toLocaleDateString();
    }

    if (params.get('time') === '1') {
        // Get the current time
        responseObject.time = new Date().toLocaleTimeString();
    }

    if (params.get('language') === '1') {
        // Get the current language
        responseObject.language = navigator.language;
    }

    if (params.get('browser') === '1') {
        // Get the current browser
        responseObject.browser = navigator.userAgent;
    }

    if (params.get('ip') === '1') {
        // Get the current IP
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            responseObject.ip = data.ip;
        } catch (error) {
            console.error('Error fetching IP:', error);
        }
    }

    if (params.get('country') === '1') {
        // Get current country
        responseObject.country = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[0];
    }

    if (params.get('plugins') === '1') {
        // Get installed plugins
        responseObject.plugins = [...navigator.plugins].map(plugin => plugin.name);
    }

    if (params.get('os') === '1') {
        // Get os version
        responseObject.os = navigator.platform;
    }

    if (params.get('resolution') === '1') {
        // Get screen resolution
        responseObject.resolution = `${window.screen.width}x${window.screen.height}`;
    }

    if (params.get('cookies') === '1') {
        // Get cookies
        responseObject.cookies = document.cookie;
    }

    // Send the data to the server
    try {
        const serverResponse = await fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(responseObject),
        });
        console.log('Server response:', serverResponse);
    } catch (error) {
        console.error('Error sending data to server:', error);
    }
});
