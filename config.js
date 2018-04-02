/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://bbs.liuyi.ac.cn';

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/api/socials/weapp/authorizations`,

    // 获取用户信息
    userUrl: `${host}/api/user`,

    // 保存用户信息
    userInfoUrl: `${host}/api/user/weapp`,

    // 刷新token和删除token
    refreshTokenUrl: `${host}/api/authorizations/current`,

    // 上传图片
    imageUrl: `${host}/api/images`,

    // 话题列表
    topicsUrl: `${host}/api/topics`,

    // 分类列表
    categoryUrl: `${host}/api/categories`,

    // 获取推荐资源
    linkUrl: `${host}/api/links`

  }
};

module.exports = config;