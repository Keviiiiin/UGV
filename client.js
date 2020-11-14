var dgram = require('dgram');
var udp_client = dgram.createSocket('udp4');
udp_client.bind(2020);

// 接收消息
udp_client.on('message', function (msg, rinfo) {
    var strmsg = msg.toString();
    const buffer = Buffer.alloc(388);
    buffer.write(strmsg);
    // console.log(buffer.length);
    console.log("++++++++++++++++++一次读取开始++++++++++++++++++++++++");
    console.log(buffer);
    console.log('-----------下面读出Buffer报文中的内容-----------');
    var headBuf = Buffer.alloc(2);      // 报文头
    var timeBuf = Buffer.alloc(14);     // 时间
    var reserveBuf = Buffer.alloc(1);   // 保留
    var roadNumber = 0;                 // 路段数量
    var wayid = BigInt(0);              // 每条路的wayid
    // var roadBuf = Buffer.alloc(10);     // 每条路
    var stateBuf = Buffer.alloc(2);     // 每条路的状态
    for (var i = 0; i < 2; i++)
    {
        headBuf[i] = buffer[i];
    }
    for(var i = 0; i < 14; i++)
    {
        timeBuf[i] = buffer[i + 2];
    }
    for (var i = 0; i < 1; i++)
    {
        reserveBuf[i] = buffer[i + 16];
    }
    roadNumber = buffer.readUInt8(17);
    console.log(headBuf.toString());
    console.log(timeBuf.toString());
    console.log(reserveBuf.toString());
    console.log(roadNumber);
    for (var i = 0; i < roadNumber; i++)
    {
        wayid = buffer.readBigInt64BE(18+i*10);
        console.log(wayid);
        for (var j = 0; j < 2; j++)
        {
            stateBuf[j] = buffer[18+i*10+8+j];
        }
        console.log(stateBuf.toString());
    }
    console.log("++++++++++++++++++一次读取结束++++++++++++++++++++++++");

})





// //定时向服务器发送消息
// // console.log('-----------------');
// setInterval(function(){
    const sendBuffer = Buffer.alloc(24);
    



    // 1.报文头 'FC'
    var strFC = 'FC';
    sendBuffer.write(strFC, 0);
    // 2.格式化时间戳 yyyymmddhhmmss
    // var moment = require('moment');
    // var now = moment().toDate();
    // now = moment().format('YYYYMMDDHHmmss');
    var now = '20201109121845';
    sendBuffer.write(now, 2);
    // 3. 保留字
    var str3 = "  ";
    sendBuffer.write(str3, 16);
    // 4. 参赛车辆ID 1234567 
    sendBuffer.writeUInt32BE(22, 18);
    // 5. 保留字
    var str4 = "  ";
    sendBuffer.write(str4, 22);


    udp_client.send(sendBuffer, 0, sendBuffer.length, 51234, '59.110.71.188'); 
    // udp_client.send(sendBuffer, 0, sendBuffer.length, 51234, '127.0.0.1'); 
// },1000);
// },60000);




