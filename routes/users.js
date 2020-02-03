var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/pbtest',function (req,res,next) {
  //post 模拟PB请求
  console('router.post','************')
    const PBMessageResponse = proto.lookup('framework.PBMessageResponse')
    const resp = PBMessageResponse.encode({
        type: 1,
        messageData: '3213messageData21321',
        resultCode: 1,
        resultInfo: 'resultInfo'
    }).finish()
    res.end(resp)
});
module.exports = router;
