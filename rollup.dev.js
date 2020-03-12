const rollup = require('rollup');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const fse = require('fs-extra');
const chokidar = require('chokidar');
const postcss = require('postcss');
const postcssConfig = require('./postcss.config').plugins;
const browsersync = require('rollup-plugin-browsersync');

/**
 * [postcss编译函数]
 * @param  {[string]} v [css文件路径]
 * @return {[type]}   [void]
 */
const postcssBuild = async (v) => {
    try {
        let r = fs.readFileSync('./src/index.css', 'utf8');
        let distF = './dist/index.css'
        let result = await postcss(postcssConfig).process(r);
        await fse.outputFile(distF, result.css);
    } catch (err) {
        console.log(err);
    }
}


/**
 * [监听postcss更新]
 * @return {[type]} [void]
 */
const watchCss = () => {
    const watcher = chokidar.watch(['./src/**/*.css','./tailwind.config.js'], {
        persistent: true
    });
    watcher
        .on('add', path => {
            postcssBuild();
            console.log(`File ${path} has been added`)
        })
        .on('change', path => {
            postcssBuild();
            console.log(`File ${path}  has been changed`)
        });
}

//自动刷新

browsersync({
        server:'.',//设置可以跑本地server,默认找index.html
        files: `./**/*.css,./index.html`//css更新刚浏览器刷新
});

// 执行postcss编译
//postcssCompile();
postcssBuild();
// 监听postcss更新
watchCss();


