# WebPack基本使用

> 什么是webpack
>

webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换（transform）、打包（bundle）或包裹（package）任何资源(resource or asset)。

webpack将所有模块捆绑在一起，使其运行

> 重要概念
>
- 入口:**entry**

  入口文件是一个js文件。默认值是 `./src/index.js`  webpack通过这个文件内的import，收集其他模块文件，在通过其他模块文件内的import语句，收集其他依赖，构建其内部 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/)最后将所有模块文件打包到一起，形成一个整体可运行的代码。

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