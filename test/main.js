// 官方连接：https://socket.io/
var io = require('socket.io')(8078);

console.log('server start');

io.on('connection', function (socket) {
    console.log('client connection');

    //触发客户端注册的自定义事件
    //socket.emit('ClientListener', { ClientListenerState: 'connecting~~!' });

    socket.emit('ClientListener', { State: '1' });//状态为1  完成连接
    //注册
    socket.on('Register', function (data, callback) {
        console.log('收到客户端注册请求  uid:' + data['uid'] + '__pwd:' + data['pwd']);
        //db  查找是否已经存在
        var isRegister = select('uid','123');
        console.log("**********",isRegister);
        if(isRegister != null && isRegister){
            //已注册帐号
            console.log('已注册帐号');
            callback({ msg: 0 }); //0 已经注册
        }
        if(isRegister != null && !isRegister){
            //未注册帐号
            console.log('未注册帐号');
            add(data['uid'],data['pwd'].toString(),100)
            callback({ msg: 1 });//1 注册成功
        }

    });

    //登录  callback 执行回调
    socket.on('Lgoin', function (data, callback) {
        console.log('收到客户端登录请求  uid:' + data['uid']+'__pwd:'+data['pwd']);
        callback({ abc: 123 });
    });


    //断开连接会发送
    socket.on('disconnect', function () {
        console.log('client disconnected');
    });

});

//引入数据库
var mysql=require('mysql');

//实现本地链接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mytestsql'
})


// 查找
function select(s,value) {
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting:' + err.stack)
            return null;
        }
    })

    connection.query('SELECT '+s+' FROM user', function (error, results, fields) {
        if (error) {
            console.log('error!!!');
            return null;
        };
        if(results == null){
            console.log('The results is null');
            return null;
        }
        console.log('The select results is:', results);
        for(i=0 ;i<results.length;i++){
            console.log(i, results[i]);

            if(results[i].uid == value){
                console.log('*/////////true');

                return true;
            }
        }
        console.log('*/////////false');

        return false;
    });
    connection.end();
}
//添加
function add(_uid,_pwd,_safecode) {
    var additem = {
        uid: _uid,
        pwd: _pwd,
        safecode: _safecode,
    };
    var query = connection.query("INSERT INTO user SET ?", additem, function (error, results, fields) {
        if (error) throw error;
    })
    console.log(query.sql); //INSERT INTO posts 'id'=1, 'title'='Hello MySQL'
}

//修改
function updeate() {
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting:' + err.stack);
        }
        console.log('connected as id ' + connection.threadId);
    });

    connection.query('UPDATE demo SET name=?where id?', ['update', 1], function (error, results, fields) {
        if (error) throw error;
        console.log('changed:' + results.changeRows + 'rows');
    });

    connection.end();

}
//删除
function deletes() {
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting:' + err.stack);
            return;
        }
        connection.query('DELETE FROM demo SET where id=?', [ 1], function (error, results, fields) {
            if (error) throw error;
            console.log('deleted:' + results.affectedRows + 'rows');
        });
        console.log('connected as id ' + connection.threadId);
        connection.end();

    });

}