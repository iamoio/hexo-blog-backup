const path = require('path');
const cwd = 'C:/Users/Administrator/WorkBuddy/Claw/hexo-blog';
process.chdir(cwd); // 钉死进程 cwd，Hexo 内部用 process.cwd() 找 source/plugins
const Hexo = require('C:/Users/Administrator/WorkBuddy/Claw/hexo-blog/node_modules/hexo');
const hexo = new Hexo(cwd, { silent: false, debug: false });

hexo.init()
  .then(() => hexo.load())
  .then(() => {
    console.log('LOADED posts=' + hexo.locals.get('posts').length +
                ' pages=' + hexo.locals.get('pages').length);
    return hexo.call('clean', {});
  })
  .then(() => hexo.call('generate', {}))
  .then(() => {
    console.log('GENERATE DONE');
    return hexo.exit();
  })
  .catch((e) => {
    console.error('GENERATE ERROR:', e && e.stack ? e.stack : e);
    process.exit(1);
  });
