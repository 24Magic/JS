**1.** 
**如何全局安装一个 node 应用?**

```npm install -g abc```

**2.**
**package.json 有什么作用?**

npm上发布包时，需要package.json中的信息来描述这个包,并提供包所需要的依赖
```
{
  "name":"mike-demo",  //包的名字
  "version":"1.0.0",  //版本号，每次更改必须更改
  "description": "",  //功能描述
  "main": "index.js",  //入口
  "bin": {
    "mikedemo": "./index.js"  //地址
  },
  "script": {
    "start": "echo start...",
    "build": "echo build...",
    "test": "echo\"Error: no test specifed\" && exit 1" //直接执行特定命令行
  },
  "author": "",  //作者
  "license": "ISC",  //版权
  "dependencies": {
    "webpack": "^2.4.1"
  }  //依赖
}
  
```
**3.**
**npm install --save app 与 npm install --save-dev app有什么区别?**

npm install --save app: 保存需要加载的依赖的信息到package.json里面,该模块使用时，该依赖被调用
```
"dependencies": {
  "app": "^0.0.0"
}
```
npm install --save-dev app: 开发测试时使用的依赖，当需要测试时，可以调用该依赖
```
"devDependencies": {
  "app": "^0.0.0"
}
``` 
**4.**
**nodule_modules的查找路径是怎样的?**

该模块的同级目录下查找nodule_modules  =>  if(没有) 向上一级查找  =>  if(没有) 再向上一级 ...=> 直到找到根目录下

**5.**
**npm3与 npm2相比有什么改进**

假设A,C依赖B，npm2会把两个不同版本的B各自放在A，C下面；npm3会把相同版本的B放在与A,C同一目录下，而把不同版本的B放在C下面

![npm2npm3.png](./src/imgs/npm2npm3.png)

**yarn和 npm 相比有什么优势?**

npm存在的缺陷：
- npm 安装包（packages）的速度不够快，拉取的 packages 可能版本不同
- npm 允许在安装 packages 时执行代码，这就埋下了安全隐患

Yarn的改进：

*yarn.lock 文件*
- npm 和 Yarn 都是通过 `package.json` 记录项目需要拉取的依赖模块，不过在使用时，往往 `package.json` 中模块的版本号不太会写得非常确切，通常是定个版本范围。事实上，npm在拉取依赖时，即使用的是相同的 `package.json`，在不同的设备上拉到的 packages 版本也会不一样，这就可能为项目引入 bug。

- Yarn 有一个锁定文件 (lock file) 记录了被确切安装上的模块的版本号。每次只要新增了一个模块，Yarn 就会默认创建（或更新）`yarn.lock` 这个文件，这样就保证了每次拉取同一个依赖时，使用的是同一个模块版本

- npm中其实也有个lock，但是需要每次执行`npm shrinkwrap`命令才会生成`npm-shrinkwrap.json`这个文件来记录模块版本

*并行安装*
- 在执行包的安装时，npm会按照队列依次进行安装；而yarn会同步进行任务，提高了性能，总之就是很快。

*更简洁的输出*
- npm 的输出信息比较冗长。在执行 `npm install <package>` 的时候，命令行里会不断地打印出所有被安装上的依赖。相比之下，Yarn 简洁太多：默认情况下，结合了 emoji （Windows 上 emoji 不可见）直观且直接地打印出必要的信息，也提供了一些命令供开发者查询额外的安装信息。

*yarn global*
- npm 的全局操作命令要加上` -g` 或者` --global` 参数，Yarn 的全局命令则需要加上 `global`。和 npm 类似，项目特定的依赖，就不需要全局安装了。

*yarn install*
- `npm install` 命令安装的是 `package.json` 中的依赖，如果开发者在 `package.json` 中添加了新的依赖，`npm install` 也一样安装。然而，`yarn install` 会优先安装 `yarn.lock` 中记录的依赖，没有这样的锁定文件时，才会去安装 `package.json` 中的依赖。

[参考地址](http://qianduan.guru/2016/11/09/yarn-vs-npm/)

**6.** 
**webpack是什么？**

市面上已经存在的模块管理和打包工具并不适合大型的项目，尤其单页面 Web 应用程序。最紧迫的原因是如何在一个大规模的代码库中，维护各种模块资源的分割和存放，维护它们之间的依赖关系，并且无缝的将它们整合到一起生成适合浏览器端请求加载的静态资源。

这些已有的模块化工具并不能很好的完成如下的目标：
将依赖树拆分成按需加载的块
初始化加载的耗时尽量少
各种静态资源都可以视作模块
将第三方库整合成模块的能力
可以自定义打包逻辑的能力
适合大项目，无论是单页还是多页的 Web 应用

**和其他同类型工具比有什么优势**

1.代码拆分

Webpack 有两种组织模块依赖的方式，同步和异步。异步依赖作为分割点，形成一个新的块。在优化了依赖树后，每一个异步区块都作为一个文件被打包。

2.Loader

Webpack 本身只能处理原生的 JavaScript 模块，但是 loader 转换器可以将各种类型的资源转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。

3.智能解析

Webpack 有一个智能解析器，几乎可以处理任何第三方库，无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件。甚至在加载依赖的时候，允许使用动态表达式 require("./templates/" + name + ".jade")。

4.插件系统

Webpack 还有一个功能丰富的插件系统。大多数内容功能都是基于这个插件系统运行的，还可以开发和使用开源的 Webpack 插件，来满足各式各样的需求。

5.快速运行

Webpack 使用异步 I/O 和多级缓存提高运行效率，这使得 Webpack 能够以令人难以置信的速度快速增量编译。

**7.**
**npm script是什么**

在package.json中存在scripts，可以执行自定义命令

下面是常用的自定义命令行：
```
{
  "scripts": {
    "css:scss": "app=node-sass npm run check; node-sass --output-style compressed -o dist/css src/scss",
    "css:autoprefixer": "app=postcss-cli npm run check; app=autoprefixer npm run check; postcss -u autoprefixer -r dist/css/*",
    "css:compress": "app=csso npm run check; csso in.css --output out.css",
    "css:less": "app=less npm run check; lessc --clean-css styles.less styles.min.css",

    "js:webpack": "app=webpack npm run check; webpack",
    "js:webpack:uncompress": "app=webpack npm run check; uglify=0 webpack",
    "js:lint": "app=eslint npm run check; && eslint src/js",
    "js:uglify": "app=uglifyjs npm run check; mkdir -p dist/js && uglifyjs src/js/*.js -m -o dist/js/app.js",

    "image:imagemin": "app=imagemin-cli npm run check; imagemin src/images dist/images -p",

    "server": "app=browser-sync npm run check; browser-sync start --server --files 'dist/css/*.css, dist/js/*.js'",

    "watch": "app=onchange npm run check; onchange 'src/js/*.js' -- npm run build:js",

    "watch:webpack": "onchange 'public/src/js/**/!(bundle.js)' -- npm run webpack:js",
    "watch:all": "app=parallelshell npm run check; parallelshell 'npm run css:autoprefixer' 'npm run js:init' ",

    "check": "[ -z \"$(app=$app node -p 'try{url=process.env.app+\"/package.json\"; require(url).version}catch(e){exports=\"\"}')\" ] && npm i -D $app || echo \"already installed $app\"; "
  }
}
```
**如何使用?**

```
//在npm中有默认命令名称的
npm test
//在npm中没有默认命令名称的
npm run css:scss
```
**8.** 
**使用 webpack 替换 入门-任务15中模块化使用的 requriejs**

[代码](https://github.com/24Magic/JS/tree/master/webpack2)

[demo](https://24magic.github.io/JS/webpack2/src/index.html)

**9.**
**gulp是什么?**
- 它是一款nodejs应用。
- 它是打造前端工作流的利器，打包、压缩、合并、git、远程操作...，
- 简单易用
- 无快不破
- 高质量的插件

**使用 gulp 实现图片压缩、CSS 压缩合并、JS 压缩合并**
```
 var gulp = require('gulp');

 //引入组件
 var minifycss = require('gulp-minify-css'), //css压缩
  uglify = require('gulp-uglify'), //js压缩
  concat = require('gulp-concat'), //合并文件

  rename = require('gulp-rename'), //重命名
  clean = require('gulp-clean'), //清空文件夹

  minhtml = require('gulp-htmlmin'), //html压缩
  jshint = require('gulp-jshint'), //js代码规范性检查
  imagemin = require('gulp-imagemin'); //图片压缩

 gulp.task('html', function(){

  return gulp.src('src/*.html')
    .pipe(minhtml({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
 });

 gulp.task('css', function(argument){

  gulp.src('src/*.css')
    .pipe(concat('merge.min.css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minfycss())
    .pipe(gulp.dest('dist/css/'))
 })

 gulp.task('js', function(argument){
  gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))

    .pipe(concat('merge.js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
 })

 gulp.task('img', function(argument){
  gulp.src('src/imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/imgs'))
 })

 gulp.task('clear', function(){
  gulp.src('dist/*', {read: false})
    .pipe(clean())
 })

 gulp.task('build', ['html', 'css', 'js', 'img '])

 //执行
 /*
 gulp html //html压缩
 gulp css //css压缩合并
 gulp js //js书写规范，压缩
 gulp img //img压缩
 gulp clear //清空文件夹
 gulp build //执行以上
 */
```
**10.** 
**开发一个 node 命令行天气应用用于查询用户当前所在城市的天气，发布到 npm 上去。可以通过如下方式安装使用(可使用api.jirengu.com里提供的查询天气接口)**

[npm地址](https://www.npmjs.com/package/mike-weather)