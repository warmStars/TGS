## 1. TS本地开发
# 首次启动需安装
npm install

# 启动开发服务器
npm run serve 

## 2. 打包
npm run build 

## 3. 目录规范说明

按照以下方式创建组件文件：{包?}/{模块}/{组件}/{操作?}
- 包 -   配合导航增加的一个分类。
- 模块 - 如 rbac、db、workflow 等独立功能模块，可以独立成系统。
- 组件 - 依赖于模块使用的业务实现，不能单独使用。
- 操作 - 如 增删改查，按照规定，有 del/add/update/status


### 目录结构
|-- dist                                     # 打包后文件夹            
|-- public                                   # 静态文件夹                                   
|   |-- favicon.ico                
|   |-- index.html                           #入口页面
|-- src                                      # 源码目录         
|   |--assets                                # 模块资源
|   |--components                            # vue公共组件
|   |--mock                                  # mock数据
|   |--views                         
|   |--App.vue                               # 页面入口文件
|   |--main.js                               # 入口文件，加载公共组件
|   |--router.js                             # 路由配置
|   |--store.js                              # 状态管理
|-- .env.pre-release                         # 预发布环境    
|-- .env.production                          # 生产环境       
|-- .env.test                                # 测试环境  
|-- vue.config.js                            # 配置文件 
|-- .eslintrc.js                             # ES-lint校验                   
|-- .gitignore                               # git忽略上传的文件格式   
|-- babel.config.js                          # babel语法编译                        
|-- package.json                             # 项目基本信息 
|-- postcss.config.js                        # CSS预处理器(此处默认启用autoprefixer)
## 4. 前端git分支规范

##### 1. 名字_dev  自己的主分支 例如 wy_dev  从dev分支拉出

#####  2. 名字_dev_子系统  某个子系统分支 例如 wy_dev_cmp 从dev分支拉出

#####  3. 名字_dev_jira号_日期  某个临时任务分支  wy_dev_jira2230_20181130  从common_dev分支拉出

#####  4. 名字_dev_hotfix_日期  线上紧急bug修改  wy_dev_hotfix_20181130  从common_dev分支拉出'

#####  5. 名字_dev_缩写任务描述_日期  特殊情况  wy_dev_commonStyleModify_20181130  从dev分支拉出'

#####  重点： 3， 4， 5 种情况， 任务上线后请记得删除分支；

## 5. Git提交规范

新需求： Add Jid 描述
Bug修复： Fix Jid 描述
改进/任务： Mod Jid 描述
JIRA无关的提交： OCT 描述

## 6.命名

文件和变量小驼峰命名 如：firstName 