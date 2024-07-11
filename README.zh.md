<div align="center"> 
  <img alt="Wendy Panel" width="300" height="300" src="./src/assets/images/wendy.png">
<br>

![GitHub](https://img.shields.io/github/license/dstgo/wendy-pro) ![Static Badge](https://img.shields.io/badge/vue-3-b) ![Static Badge](https://img.shields.io/badge/vite-5-blue)

<h1>Wendy Panel</h1>

</div>

[English](./README.md) | **简体中文**

<br/>

## 介绍

Wendy Panel是一个分布式饥荒管理面板，用于管理[饥荒联机版](https://store.steampowered.com/app/322330/_/) 的专用服务器集群，基于现代化的前端项目[vben](https://github.com/vbenjs/vue-vben-admin) ，它由Vue3、Vite5、ant-design-vue、Pinia、UnoCSS和Typescript等技术实现。通过Wendy Panel可以快速搭建饥荒服务器管理平台，并且非常方便地进行维护和管理，对于管理中小型服务器集群而言是绝佳的解决方案，也是一个完美契合饥荒的管理面板。

> TIP: 本项目仅支持Steam版本的饥荒服务器，对于其它平台比如WeGame版本的不考虑支持。

## 特性

- 国际化：默认支持中/英双语，也可自定义其它语言
- 主题：支持明亮/黑暗两种主题色
- 容器化：通过将饥荒服务器封装到docker容器中，可做到弹性控制服务器资源
- 分布式：分布式管理多个机器上的容器集群
- 可视化：通过丰富的可视化界面来管理服务器集群
- 开源：本项目由MIT协议开源，不限制任何商用行为

## 开发

如果你也想参与到项目的开发中，希望你具备以下几个条件：

- [nodejs](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Ant-Design-Vue](https://antdv.com/docs/vue/introduce-cn/) - 了解 AntDV 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - 了解 mockjs 基本使用
- [Vben](https://doc.vvbin.cn/) - 熟悉Vben Admin 前端框架

关于项目的更多其它内容，前往[Document | wendy panel](https://wendy.dstgo.cn)了解更多信息。

## 贡献

如果你想为本项目贡献代码，请参照下面的步骤，否则会被忽略。

1. Fork本仓库到你的账号
2. 在Fork的仓库中创建一个新的分支
3. 在新分支中提交代码修改（请确保通过Eslint，prettier检查）
4. 然后向本仓库发起Pull Request
5. 等待Pull Request

关于规范请见[contributing.md](.github/contributing.md) 和[commit-convention.md](.github/commit-convention.md)
