# WebPack基本使用

> 什么是webpack
>

webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换（transform）、打包（bundle）或包裹（package）任何资源(resource or asset)。

webpack将所有模块捆绑在一起，使其运行

> 重要概念
>
- 入口:**entry**

  入口文件是一个js文件。默认值是 `./src/main.js`  webpack通过这个文件内的import，收集其他模块文件，在通过其他模块文件内的import语句，收集其他依赖，构建其内部 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/)最后将所有模块文件打包到一起，形成一个整体可运行的代码。

- 输出:**output**

  output属性告诉webpack在哪里输出它所创建的包,主要输出文件的默认是 `./dist/main.js`
  ，其他生成文件默认放置在 `./dist`文件夹中。

- 加载器:**loaders**

  webpack **只能理解 JavaScript 和 JSON 文件**，这是 webpack 开箱可用的自带能力。**loader**可以让 webpack 能够去处理其他类型的文件，并将它们转换为有效 [模块](https://webpack.docschina.org/concepts/modules)，以供应用程序使用，以及被添加到依赖图中。

    <aside>
    💡 webpack 的其中一个强大的特性就是能通过 `import`导入任何类型的模块（例如 `.css`文件）

    </aside>

- 插件:**plugins**

  `plugins` 选项用于以各种方式自定义 webpack 构建过程  [插件页面](https://webpack.docschina.org/plugins)

- 模式:**mode**

  webpack有两种工作方式：development（开发模式）和production（生产模式）。 主要的区别就是production模式下，产生的捆绑包（文件）更小，去掉了在运行下无关的注释，空格等等。这样可以加快用户加载代码的速度。
- > 初始化项目
>

```bash
mkdir webpack-study
cd webpack-study
npm init -y    //npm初始化
npm install webpack webpack-cli webpack-dev-server --dev-save //安装相关依赖
npx webpack
```

<aside>
💡 npx webpack默认找`./src` 的index.js文件

</aside>

> 配置webpack
>

在根目录创建**webpack.config.js**文件

1. 入口文件和出口文件

    ```jsx
    const path = require("path");
    module.exports = {
        // 将入口文件指定为main.js
        entry:'./src/main.js',
        // 将输出文件目录改为build/
        output:{
           //指定输出文件夹名
            path:path.resolve(__dirname,'build'),
            //指定输出文件名
            filename:'output.js'
        }
    };
    ```

    <aside>
    💡 **entry**字段可以用来修改入口文件，上面的代码将webpack入口文件改为`src/main.js`。**output**字段用于修改输出文件位置，我们将输出文件目录改为`build/`。将src目录下的`index.js`文件重命名为`main.js`

    </aside>

2. 自动生成html

   `[HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)`:该插件将为你生成一个 HTML5 文件， 在 body 中使用 `script`
     标签引入你所有 webpack 生成的 bundle

   安装`[HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)`

    ```bash
    npm install html-webpack-plugin --dev-save
    ```

   webpack.config.js中添加

    ```jsx
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    module.exports = {
        plugins: [
            new HtmlWebpackPlugin({
    							//指定html模版入口文件位置
                template: path.resolve(__dirname, "src", "index.html"),
    							//指定输出html文件名(他会自动为html文件添加script)
                filename: "output.html"
            })
        ]    
    }
    ```

   webpack在打包时以src/index.html为模版,在`build` 目录下生成`output.html`

   `index.html` 内容如下

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Hello World</title>
    </head>
    <body>
        <h1>Hello World</h1>
    </body>
    </html>
    ```

   `output.html` 内容如下

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Hello World</title>
    <!--多了这里    -->
    <script defer src="output.js"></script></head>
    <body>
        <h1>Hello World</h1>
    </body>
    </html>
    ```

3. 加载CSS需要两个loaders

   我们需要至少安装两个loaders

  - **css-loader**: 让我们可以使用import语句导入css文件。
  - **style-loader**: 把CSS插入到DOM中

   安装

   ```bash
    npm install css-loader style-loader --dev-save
   ```

   配置webpack.config.js
```javascript
 module.exports = {
        module: {
    				//rules对应不同的文件类型使用不同的loaders
            rules: [
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }
            ]
        }
    }
```
   

    <aside>
    💡 **注意：loaders的顺序很重要，webpack加载loaders的顺序是从右到左，所以下面的loaders配置是无效的：**`use: ["css-loader", "style-loader"]`

    </aside>

4. webpack本地服务

    ```javascript
    npm install webpack-dev-server --dev-save
    ```

   配置webpack.config.js

    ```jsx
    module.exports = {
        devServer: {
            static: {
           //启动的地址     
    				directory: path.join(__dirname, "build")
            },
            compress: true,
           //端口 
    				port: 9000,
    
        }
    }
    ```

   启动服务

    ```bash
    npx webpack serve
    ```


5.模式(mode)

`development`

`production` 打包后的文件会删除冗余的注释和空格用于部署到生产环境。

```bash
module.exports = {
    //开发模式
    mode:'development'
}
```

```bash
webpack --mode production
webpack --mode development
```