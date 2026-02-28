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
    "https://cdn.simpleicons.org/css3/1572B6",
    "https://cdn.simpleicons.org/css/1572B6",
    "https://cdn.simpleicons.org/capcut/000000",
    "https://img.icons8.com/color/256/capcut.png",
];

Promise.all(urls.map(checkUrl)).then(results => {
    console.log(JSON.stringify(results, null, 2));
});
