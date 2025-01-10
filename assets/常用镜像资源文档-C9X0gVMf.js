const n=`# 镜像源及配置

## 2023.10.18更新

\`\`\`
内网缓存站建设目的：
* 1. 二级缓存：建立二级缓存站172.21.44.57，避免一级代理站故障导致开发延期，备用方案可避免单点故障；
2. 基线控制：通过二级缓存，选择性的从一级缓存站下载稳定且长期支持的组件版本，避免引入开发期组件或者非稳定版本。
3. 平台一致性：建立统一的内部缓存，建立基线，向编译环境，开发环境，测试环境同步，保证平台一致性。
4. 受控同步：内部缓存站不需要实时性对外同步，一级缓存站用于开发测试及验证， 二级缓存站仅从一级缓存站获取通过验证的公共库和组件库，
\`\`\`
## ntp服务器

> 172.29.13.1                 内网服务器时间同步  
> 172.21.100.15                办公物理机时间同步       
\`\`\`
时间同步命令：    ntpdate 172.29.13.1
\`\`\`

## DNS服务器

> 用于内网服务器域名解析  
> 172.29.13.1

 ## maven镜像站

### maven-aliyun-public

> 类型：代理站点  
> 地址：http://172.21.44.57:8081/repository/maven-aliyun-public/   
> 上级代理：http://172.21.44.31:8000/repository/maven-aliyun-public/   
> 原始代理：https://maven.aliyun.com/repository/public

### maven-central
> 类型： 公司共有站  
> 地址： http://172.21.44.57:8081/repository/maven-central/  
> 上级代理： http://172.21.44.31:8000/repository/maven-public/

### maven-cbb

> 类型： 公司私有库  
> 地址： http://172.21.44.57:8081/repository/maven-cbb/  
> 上级代理： http://172.21.44.31:8000/repository/maven-releases/  

### maven-releases
> 类型： 部门私有库  
> 地址： http://172.21.44.57:8081/repository/maven-releases/

### maven-snapshots
> 类型： 部门私有库  
> 地址： http://172.21.44.57:8081/repository/maven-snapshots/ 

### maven-public

> 类型：组合库 
> 地址：http://172.21.44.57:8081/repository/maven-public/  
> 来源： maven-aliyun-public maven-central maven-cbb  maven-public maven-snapshots maven-releases

## golang镜像站

\`\`\`
#go proxy设置
#启用代理
go env -w GO111MODULE=on   
#设置go-mod代理为腾讯源(优先)
go env -w GOPROXY=http://172.21.44.57:8081/repository/go-tencent/,direct
#或
go env -w GOPROXY=http://172.21.44.31:8000/repository/go-tencent/,direct
#设置go-mod代理为七牛源
go env -w GOPROXY=http://172.21.44.57:8081/repository/goproxy/,direct
#设置go-mod代理为组合源
go env -w GOPROXY=http://172.21.44.57:8081/repository/go-public/,direct
#关闭私有组件库校验
go env -w GOSUMDB=off
\`\`\`
### go-tencent (优先选择)

> 类型：代理站点   
> 地址：http://172.21.44.57:8081/repository/go-tencent/  
> 上级代理：http://172.21.44.31:8000/repository/go-tencent/     
> 原始代理：https://mirrors.cloud.tencent.com/go/

### go-aliyun
> 类型：代理站点   
> 地址：http://172.21.44.57:8081/repository/go-aliyun/  
> 上级代理：http://172.21.44.31:8000/repository/go-aliyun/     
> 原始代理：https://mirrors.aliyun.com/goproxy/

### go-goproxy
> 类型：代理站点七牛    
> 地址：http://172.21.44.57:8081/repository/goproxy/  
> 上级代理：http://172.21.44.31:8000/repository/goproxy/   
> 原始代理：https://goproxy.cn


### go-public
> 类型：集合站  
> 地址：http://172.21.44.57:8081/repository/go-public/ 
> 上级代理：http://172.21.44.31:8000/repository/go-public/ 

## npm镜像站

### 本地私有verdaccio站(部门私有npm包发布于此，优先使用这个)

> 地址：http://172.21.44.57:4873/  
> 代理源：http://registry.npmmirror.com

### 本地代理站（仅做npmmirror缓存）

> 地址：http://172.21.44.57:8081/repository/npm-taobao/  
> 代理源：http://registry.npmmirror.com

### 本地缓存站（包含npmmirror缓存和私有库verdaccio站）
> 地址：http://172.21.44.57:8081/repository/npm-public/

## 操作系统版本说明

\`\`\`
目前开发过程中使用到的系统主要由ubuntu（项目运行环境）apline(容器编译环境) debian（容器编译环境）
基于安全性考虑，目前仅对官方提供长期支持的稳定版本系统建立镜像缓存，建立操作系统基线
\`\`\`

| 操作系统 | 版本号 |  发布时间  | 官方支持时间 | 用途           | 是否稳定版本（LTS） |
| :------- | -----: | :--------: | ------------ | -------------- | ------------------- |
| ubuntu   |   2204 | 2022年4月  | 2027年4月    | 项目运行系统   | LTS版本             |
| ubuntu   |   2004 | 2020年4月  | 2025年4月    | 项目运行系统   | LTS版本             |
| debian   |     12 | 2023年6月  | 2028年6月    | CI容器系统版本 | 稳定版本            |
| debian   |     11 | 2021年8月  | 2026年8月    | CI容器系统版本 | 稳定版本            |
| alpine   |   3.17 | 2022年11月 | 2024年11月   | CI容器系统版本 | 稳定版本            |

## ubuntu镜像站



###   ubuntu2004

\`\`\`txt
# 清华源
deb http://172.21.44.57:8081/repository/ubuntu-tsinghua/ focal main restricted universe multiverse
deb http://172.21.44.57:8081/repository/ubuntu-tsinghua/ focal-updates main restricted universe multiverse
deb http://172.21.44.57:8081/repository/ubuntu-tsinghua/ focal-backports main restricted universe multiverse
deb http://172.21.44.57:8081/repository/ubuntu-tsinghua/ focal-security main restricted universe multiverse
\`\`\`
### ubuntu2204
\`\`\`txt
#tsinghua
deb http://172.21.44.57:8081/repository/ubuntu-tsinghua/ jammy main restricted universe multiverse
deb http://172.21.44.57:8081/repository/ubuntu-tsinghua/ jammy-updates main restricted universe multiverse
deb http://172.21.44.57:8081/repository/ubuntu-tsinghua/ jammy-backports main restricted universe multiverse
deb http://172.21.44.57:8081/repository/ubuntu-tsinghua/ jammy-security main restricted universe multiverse
\`\`\`
## debian镜像站

### debian12
\`\`\`
sed -i 's#deb.debian.org#172.21.44.57:8081/repository/debian-tsinghua#g' /etc/apt/sources.list.d/debian.sources
sed -i 's#security.debian.org#172.21.44.57:8081/repository/debian-tsinghua-security#g' /etc/apt/sources.list.d/debian.sources
\`\`\`
### debian11及以下

\`\`\`
sed -i 's#http://deb.debian.org/debian#http://172.21.44.57:8081/repository/debian-tsinghua#g' /etc/apt/sources.list
sed -i 's#security.debian.org#172.21.44.57:8081/repository/debian-tsinghua-security#g' /etc/apt/sources.list
\`\`\`

## alpine

\`\`\`
sed -i 's#https://dl-cdn.alpinelinux.org#http://172.21.44.57:10000/alpine-mirror/#g' /etc/apk/repositories
\`\`\`

## CentOS 7

\`\`\`sh
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \\
         -e 's|^#baseurl=http://mirror.centos.org/centos|baseurl=http://172.21.44.31:8000/repository/centos-tsinghua|g' \\
         -i.bak \\
         /etc/yum.repos.d/CentOS-*.repo
\`\`\`

## CentOS 8

\`\`\`sh
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \\
         -e 's|^#baseurl=http://mirror.centos.org/$contentdir|baseurl=http://172.21.44.31:8000/repository/centos-tsinghua|g' \\
         -i.bak \\
         /etc/yum.repos.d/CentOS-*.repo
\`\`\`

## Alpine

\`\`\`
sed -i 's/https:\\/\\/dl-cdn.alpinelinux.org/http:\\/\\/172.21.44.57:10000\\/alpine-mirror/g' /etc/apk/repositories
\`\`\`

## npm

\`\`\`sh
npm -g config set registry http://172.21.44.57:4873/
\`\`\`

或在项目根目录创建\`.npmrc\`文件,内容如下

\`\`\`txt
registry=http://172.21.44.57:4873/
\`\`\`

**注意：切换源之前删除package-lock.json文件**

## yarn 1.x

\`\`\`sh
yarn config set registry http://172.21.44.57:4873/ --global
\`\`\`

或在项目根目录创建\`.yarnrc\`文件，添加如下内容

\`\`\`txt
registry "http://172.21.44.57:4873"
\`\`\`

**注意：切换源之前删除yarn-lock.json文件**

## yarn2

参见官方文档.

## pnpm

\`\`\`sh
pnpm -g config set registry http://172.21.44.57:4873/
\`\`\`

**注意：切换源之前删除pnpm-lock.json文件**`;export{n as default};
