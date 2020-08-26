import Http from '../utils/Http';

export function gatFormItem(data) {
    return new Promise((resolve, reject) => {
        Http.get('/api/vote/screen/form_item', data)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => reject(err));
    });
}

export function gatContentProcess(data) {
    let keys = Object.keys(data);
    let infor = {};
    keys.map((res) => {
        if (res === 'code') {
            infor['mobile'][res] = data[res];
        } else {
            infor[res] = { value: data[res] };
        }
    });
    return infor;
}

//获取链接指定参数值
export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return false;
}

//promise测试
export function promiseTest1() {
 return new Promise((resolve,reject)=>{
   setTimeout(()=>{console.log('test1')},1000)
 })
}

export function promiseTest2() {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{console.log('test2')},1000)
  })
}

