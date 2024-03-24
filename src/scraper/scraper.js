const puppeteer = require('puppeteer');
const https = require('https');
const fs = require('fs');

async function fetchWallpaperLinks(url) {
    const browser = await puppeteer.launch({
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
      });
    
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('figure.thumb');

    const images = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('figure.thumb img.lazyload'));
        return imgs.map(img => img.getAttribute('data-src'));
    });

    await browser.close();
    return images;
}

function convertThumbnailUrlToFullImageUrl(thumbnailUrls) {
    return thumbnailUrls.map(url => {
        // 提取图片ID
        const matches = url.match(/\/small\/(.+\/)?(.+)\.jpg$/);
        if (!matches) return url; // 如果不匹配，返回原URL
        const id = matches[2];
        return `https://w.wallhaven.cc/full/${id.substring(0, 2)}/wallhaven-${id}.jpg`;
    });
}

function downloadImage(url, path) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, response => {
            const fileStream = fs.createWriteStream(path);
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                resolve();
            });
        }).on('error', error => {
            // 在这里添加回调函数
            fs.unlink(path, (unlinkError) => {
                if (unlinkError) {
                    if (unlinkError.code === 'ENOENT') {
                        // 文件不存在，可以选择忽略或记录
                        console.log(`文件 ${path} 不存在，无需删除。`);
                    } else {
                        // 其他错误
                        console.error('无法删除部分下载的文件:', unlinkError);
                    }
                }
                reject(error); // 确保这里是reject原始的下载错误
            });            
        });
        req.setTimeout(10000, () => { // 10秒超时
            console.log('请求超时。');
            req.abort(); // 取消请求
            reject(new Error('Request timeout'));
        });
    });
}


module.exports = {
    fetchWallpaperLinks,
    convertThumbnailUrlToFullImageUrl,
    downloadImage
};

