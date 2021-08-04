const path = require("path");
const resolve = dir => path.join(__dirname, dir);


// const express = require('express');

// const app = express();

// var camunda = require('camunda-bpmn-moddle/resources/camunda.json');

// var apiRoutes = express.Router();

// app.use('/api', apiRoutes);

module.exports = {
  // devServer: {
  //   before(app) {
  //     app.get('/api/camunda', (req, res) => {
  //       res.json({
  //         errno: req, // 这里是你的json内容
  //         data: camunda,
  //       });
  //     });
  //   },
  // },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.bpmn$/,
          use: 'raw-loader'
        }
      ]
    }
  },
  chainWebpack: config => {
    config.resolve.alias // 添加别名
      .set("@", resolve("src"))
      .set("src", resolve("src"));
    // config.module
    //   .rule('raw-loader')
    //   .test('/\.bpmn$/')
    //   .use('raw-loader')
    //   .loader('raw-loader')
    //   .tap(options => {
    //     // 修改它的选项...
    //     return options
    //   })
  }
};
