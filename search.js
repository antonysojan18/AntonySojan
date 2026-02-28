import https from 'https';

https.get('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/slugs.md', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const lines = data.split('\n');
        console.log("capcut", lines.find(l => l.toLowerCase().includes('capcut')));
        console.log("css", lines.find(l => l.toLowerCase().includes('css3')));
        console.log("premiere", lines.find(l => l.toLowerCase().includes('premiere')));
        console.log("davinci", lines.find(l => l.toLowerCase().includes('davinci')));
    });
});
