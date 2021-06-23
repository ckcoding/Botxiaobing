/**
 * @author : CkCode
 * @Date : 2021-06-23 10:06:49
 * @LastEditTime : 2021-06-23 14:35:07
 * @FilePath : /wxbot/Users/ck/VSCode/nodejs/微软小冰/app.js
 */
/**
 * @author : CkCode
 * @Date : 2021-06-17 13:32:52
 * @LastEditTime : 2021-06-17 13:59:25
 * @FilePath : /wxbot/Users/ck/VSCode/nodejs/jd优惠券/ceshi.js
 */
 const axios = require('axios');
 const fs = require('fs')
 const Koa = require('koa')
 const app = new Koa();
 const cookie = JSON.parse(fs.readFileSync('./cookie.json','utf8')).cookie
 setInterval(()=>{ getCookie()},7200000) //每次2个小时刷新一次
function getdata(data){
    var data = `{"TraceId":"","PartnerName":"","SubPartnerId":"VirtualGF","Content":{"Text":"${data}","Metadata":{}}}`
  var config = {
        method: 'post',
        url: 'https://ux-plus.xiaoice.com/s_api/game/getresponse?workflow=AIBeingsGFChat',
        headers: { 
          'accept': ' */*', 
          'content-type': ' application/json;charset=UTF-8', 
          'cookie': cookie,
          'origin': ' https://ux-plus.xiaoice.com', 
          'referer': ' https://ux-plus.xiaoice.com/virtualgirlfriend?authcode=', 
          'user-agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36'
        },
        data : data
      };
  return axios(config).then(
        (res)=>{
            console.log(res.data[0]);
            
            return res.data[0].Content.Text
        }
        )
      .catch(function (error) {
        return "已读，不回"
      });
}
function getUrl(url){
    return config = {
        method: 'get',
        url: url,
        headers: { 
          'accept': ' */*', 
          'content-type': ' application/json;charset=UTF-8', 
          'cookie': cookie,
          'origin': ' https://ux-plus.xiaoice.com', 
          'referer': ' https://ux-plus.xiaoice.com/virtualgirlfriend?authcode=', 
          'user-agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36'
        }
      };
}
async function getCookie(){
    var url = 'https://ux-plus.xiaoice.com/virtualgirlfriend'
    var config =await getUrl(url)
    axios(config).then(console.log(1))
}
app.use(async ctx => {
    if(ctx.request.method == 'GET'){
        try{
            let postdata = ctx.query
            var text = postdata.text
            if(text == undefined || text == ''){
                var data = {
                    code:403,
                    msg:"拒绝",
                    data:{
                        "text":"大哥不是你这样用的，会把人家玩坏的,正确的使用方式是：http://xx.xx.xx.xx?text=你要说的话"
                    }
                }
            }else{
                var data = await getdata(text)
                var data = {
                code:200,
                msg:"成功",
                data:{
                    "text":data
                }
            }
            
        }
        ctx.body = data
        }catch{
            var data = {
                code:500,
                msg:"报错",
                data:{
                    "text":"人家不懂你在说什么，我要崩溃啦"
                }
            }
            ctx.body = data
        }
    }else{
        ctx.body = '请使用Get请求'
    }
})
app.listen(827)