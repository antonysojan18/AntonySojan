import https from 'https';

const checkUrl = (url) => {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
        }).on('error', () => {
            resolve({ url, status: 'error' });
        });
    });
};

const urls = [
    'https://cdn.simpleicons.org/html5',
    'https://cdn.simpleicons.org/css3',
    'https://cdn.simpleicons.org/javascript',
    'https://cdn.simpleicons.org/python',
    'https://cdn.simpleicons.org/adobepremierepro',
    'https://cdn.simpleicons.org/adobeaftereffects',
    'https://cdn.simpleicons.org/capcut',
    'https://cdn.simpleicons.org/davinciresolve',
    'https://cdn.simpleicons.org/adobelightroom',
    'https://cdn.simpleicons.org/adobephotoshop',
    'https://cdn.simpleicons.org/figma',
    'https://cdn.simpleicons.org/powerbi',
    'https://cdn.simpleicons.org/react',
    'https://cdn.simpleicons.org/visualstudiocode',
    'https://cdn.simpleicons.org/cursor',
];

Promise.all(urls.map(checkUrl)).then(results => {
    console.log(JSON.stringify(results, null, 2));
});
