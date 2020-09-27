const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
    // 针对antd实现按需打包，根据import来打包（babel-plugin-import）
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,// 自动打包相关样式
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            // @primary-color → 变量名 所以这个就是修改样式变量。
            // 本质是修改了less文件中的源码
            modifyVars: { '@primary-color': '#1DA57A' },
        },
    }),
)