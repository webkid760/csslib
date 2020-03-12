const rollup = require('rollup');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const fse = require('fs-extra');
const chokidar = require('chokidar');
const postcss = require('postcss');
const postcssConfig = require('./postcss.config').plugins;
const browsersync = require('rollup-plugin-browsersync');

// glob配置
const globOpt = {
    cwd: '.',
    sync: true,
    matchBase: true
}

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
 * [遍历postcss文件执行编译]
 * @return {[type]} [void]
 */
// const postcssCompile = () => {
//     let pattern = '**/*.+(post.css)';
//     let cssFiles = glob.sync(pattern, {
//         ...globOpt,
//         realpath: true
//     });
//     console.log(`css文件：`, cssFiles)

//     cssFiles.map((v, k) => {
//         postcssBuild(v)
//     })
// }

/**
 * [监听postcss更新]
 * @return {[type]} [void]
 */
const watchCss = () => {
    const watcher = chokidar.watch('./src/**/*.css', {
        persistent: true
    });
    watcher
        .on('add', path => {
            postcssBuild();
            console.log(`File has been added`)
        })
        .on('change', path => {
            postcssBuild();
            console.log(`File has been changed`)
        });
}

//自动刷新

browsersync({
        files: `./**`
});

// 执行postcss编译
//postcssCompile();
postcssBuild();
// 监听postcss更新
watchCss();


