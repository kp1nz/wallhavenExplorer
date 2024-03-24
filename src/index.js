const {
    fetchWallpaperLinks,
    convertThumbnailUrlToFullImageUrl,
    downloadImage
} = require('./scraper/scraper');


const targetUrl = 'https://wallhaven.cc/search?categories=110&purity=100&atleast=2560x1080&sorting=hot&order=desc&ai_art_filter=1';

fetchWallpaperLinks(targetUrl)
    .then(links => {
        console.log('找到的图片链接:', links);
    })
    .catch(error => {
        console.error('发生错误:', error);
    });


// 示例：下载第一个图片作为示例
fetchWallpaperLinks(targetUrl)
.then(thumbnailUrls => {
    const fullImageUrls = convertThumbnailUrlToFullImageUrl(thumbnailUrls);
    console.log('原图链接:', fullImageUrls);
    // 下载第一张图片
    const imageUrl = fullImageUrls[0];
    const imageFilename = imageUrl.split('-').pop(); // 简单地使用图片ID作为文件名
    return downloadImage(imageUrl, `./images/${imageFilename}`);
})
.then(() => console.log('图片下载完成'))
.catch(error => console.error('发生错误:', error));
