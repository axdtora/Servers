const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {
    let name = url.parse(req.url, true).query.name;
    if (name === undefined) {
        name = 'world';
    }
    if (name === 'burningbird') {
        const file = 'Lethat.png';
        fs.stat(file, function (err, stat) {
            if (err) {
                console.error(err);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("Sorry, Burningbird isn't around right now \n");
            } else {
                const img = fs.readFileSync(file);
                res.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Content-Length': stat.size
                });
                res.end(img, 'binary');
            }
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello ' + name + '\n');
    }
}).listen(8000);

console.log('Server running at port 8000');
