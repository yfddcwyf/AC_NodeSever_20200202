// 页面中使用protoApi
const api = require('../lib/protolib/protoApi')

const req = {
    limit: 20,
    offset: 0
}
api.getStudentList(req).then((res) => {
    console.log(res)
}).catch(() => {
    // ...
    console.log('catch ***')
})