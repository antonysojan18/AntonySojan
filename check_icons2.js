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
    "https://cdn.simpleicons.org/html5/E34F26",
    "https://cdn.simpleicons.org/css3/1572B6",
    "https://cdn.simpleicons.org/javascript/F7DF1E",
    "https://cdn.simpleicons.org/python/3776AB",
    "https://img.icons8.com/color/256/adobe-premiere-pro--v1.png",
    "https://img.icons8.com/color/256/adobe-after-effects--v1.png",
    "https://img.icons8.com/color/256/capcut.png",
    "https://img.icons8.com/color/256/davinci-resolve.png",
    "https://img.icons8.com/color/256/adobe-lightroom--v1.png",
    "https://img.icons8.com/color/256/adobe-photoshop--v1.png",
    "https://cdn.simpleicons.org/figma/F24E1E",
    "https://img.icons8.com/color/256/power-bi.png",
    "https://cdn.simpleicons.org/react/61DAFB",
    "https://img.icons8.com/color/256/visual-studio-code-2019.png",
    "https://cdn.simpleicons.org/cursor/808080",
];

Promise.all(urls.map(checkUrl)).then(results => {
    console.log(JSON.stringify(results, null, 2));
});
