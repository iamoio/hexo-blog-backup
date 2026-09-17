// Hexo 即刻短文后台 API 脚本
// 放置在 themes/solitude/scripts/helper/brevity_admin.js

hexo.extend.helper.register('brevity_admin_api', function() {
    // 这个 helper 用于在后台页面中注入必要的配置
    return {
        siteUrl: this.config.url,
        dataFile: '/_data/brevity.json'
    };
});

// Hexo 事件钩子：在生成前读取 brevity.json
hexo.extend.filter.register('before_generate', function() {
    const fs = require('fs');
    const path = require('path');
    
    const dataFile = path.join(hexo.base_dir, 'source', '_data', 'brevity.json');
    
    if (fs.existsSync(dataFile)) {
        try {
            const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
            // 存储到 hexo 全局变量，供模板使用
            hexo.locals.set('brevityData', data);
        } catch (e) {
            console.error('Failed to parse brevity.json:', e.message);
        }
    }
});
