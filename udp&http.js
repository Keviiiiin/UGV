var http = require('http');
var fs = require('fs');
var XMLWriter = require('xml-writer');

const url = require('url');
var server = http.createServer();
server.listen(8080, function () {
    console.log('请访问http://59.110.71.188:8080');
});
// ------------------
var dgram = require('dgram');
const { setInterval } = require('timers');
//创建 udp server
var udp_server = dgram.createSocket('udp4');
udp_server.bind(51234); // 绑定端口

// 监听端口
udp_server.on('listening', function () {
    console.log('udp server linstening 51234.');
})
// -----------------

// +++++++++++++++++全部路段拥堵信息+++++++++++++++++++
arrStack = {
    // 内部道路 12条
    // 1
    "6268700800": { "wayID": "626870080", "Name": "消防通道", "Direction": "0", "State": "0" },
    "6268700801": { "wayID": "626870080", "Name": "消防通道", "Direction": "1", "State": "0" },
    // 2
    "6268700820": { "wayID": "626870082", "Name": "园区北路", "Direction": "0", "State": "0" },
    "6268700821": { "wayID": "626870082", "Name": "园区北路", "Direction": "1", "State": "0" },
    // 3
    "6268700830": { "wayID": "626870083", "Name": "园区东路", "Direction": "0", "State": "0" },
    "6268700831": { "wayID": "626870083", "Name": "园区东路", "Direction": "1", "State": "0" },
    // 4
    "6268700840": { "wayID": "626870084", "Name": "园区南路", "Direction": "0", "State": "0" },
    "6268700841": { "wayID": "626870084", "Name": "园区南路", "Direction": "1", "State": "0" },
    // 5
    "6268700850": { "wayID": "626870085", "Name": "地下停车场入口", "Direction": "0", "State": "0" },
    "6268700851": { "wayID": "626870085", "Name": "地下停车场入口", "Direction": "1", "State": "0" },
    // 6
    "6268700810": { "wayID": "626870081", "Name": "园区南路", "Direction": "0", "State": "0" },
    "6268700811": { "wayID": "626870081", "Name": "园区南路", "Direction": "1", "State": "0" },
    // 7
    "6268700870": { "wayID": "626870087", "Name": "园区南路", "Direction": "0", "State": "0" },
    "6268700871": { "wayID": "626870087", "Name": "园区南路", "Direction": "1", "State": "0" },
    // 8
    "6268700860": { "wayID": "626870086", "Name": "内部道路出口", "Direction": "0", "State": "0" },
    // 9
    "6268700880": { "wayID": "626870088", "Name": "内部道路入口", "Direction": "0", "State": "0" },
    // 10
    "6268700890": { "wayID": "626870089", "Name": "园区西路", "Direction": "0", "State": "0" },
    "6268700891": { "wayID": "626870089", "Name": "园区西路", "Direction": "1", "State": "0" },
    // 11
    "6268700910": { "wayID": "626870091", "Name": "园区西路", "Direction": "0", "State": "0" },
    "6268700911": { "wayID": "626870091", "Name": "园区西路", "Direction": "1", "State": "0" },
    // 12
    "6268700920": { "wayID": "626870092", "Name": "园区中路", "Direction": "0", "State": "0" },
    "6268700921": { "wayID": "626870092", "Name": "园区中路", "Direction": "1", "State": "0" },
    // 云深路 4条
    // 1
    "6268700610": { "wayID": "626870061", "Name": "云深路", "Direction": "0", "State": "0" },
    "6268700611": { "wayID": "626870061", "Name": "云深路", "Direction": "1", "State": "0" },
    // // 2
    // "6268700590": { "wayID": "626870059", "Name": "云深路西段2", "Direction": "0", "State": "0" },
    // "6268700591": { "wayID": "626870059", "Name": "云深路西段2", "Direction": "1", "State": "0" },
    // 2
    "6268700930": { "wayID": "626870093", "Name": "云深路", "Direction": "0", "State": "0" },
    "6268700931": { "wayID": "626870093", "Name": "云深路", "Direction": "1", "State": "0" },
    // 3
    "6268700580": { "wayID": "626870058", "Name": "云深路", "Direction": "0", "State": "0" },
    "6268700581": { "wayID": "626870058", "Name": "云深路", "Direction": "1", "State": "0" },
    // 4
    "6268700570": { "wayID": "626870057", "Name": "云深路", "Direction": "0", "State": "0" },
    "6268700571": { "wayID": "626870057", "Name": "云深路", "Direction": "1", "State": "0" },
    //  五渠路 3条
    // 1
    "6268700380": { "wayID": "626870038", "Name": "五渠路", "Direction": "0", "State": "0" },
    "6268700381": { "wayID": "626870038", "Name": "五渠路", "Direction": "1", "State": "0" },
    // 2
    "6268700330": { "wayID": "626870033", "Name": "五渠路", "Direction": "0", "State": "0" },
    "6268700331": { "wayID": "626870033", "Name": "五渠路", "Direction": "1", "State": "0" },
    // 3
    "6268700400": { "wayID": "626870040", "Name": "五渠路", "Direction": "0", "State": "0" },
    "6268700401": { "wayID": "626870040", "Name": "五渠路", "Direction": "1", "State": "0" },
    // 渔乐路 3条
    // 1
    "6268700430": { "wayID": "626870043", "Name": "渔乐路", "Direction": "0", "State": "0" },
    "6268700431": { "wayID": "626870043", "Name": "渔乐路", "Direction": "1", "State": "0" },
    // 2
    "6268700500": { "wayID": "626870050", "Name": "渔乐路", "Direction": "0", "State": "0" },
    "6268700501": { "wayID": "626870050", "Name": "渔乐路", "Direction": "1", "State": "0" },
    // 3
    "6268700520": { "wayID": "626870052", "Name": "渔乐路", "Direction": "0", "State": "0" },
    "6268700521": { "wayID": "626870052", "Name": "渔乐路", "Direction": "1", "State": "0" },
    // 黄浦江路 1条
    // 1
    "6268701070": { "wayID": "626870107", "Name": "黄浦江路", "Direction": "0", "State": "0" },
    // 福茂路 4条
    // 1
    "6268700540": { "wayID": "626870054", "Name": "福茂路", "Direction": "0", "State": "0" },
    "6268700541": { "wayID": "626870054", "Name": "福茂路", "Direction": "1", "State": "0" },
    // 2
    "6268701030": { "wayID": "626870103", "Name": "福茂路", "Direction": "0", "State": "0" },
    "6268701031": { "wayID": "626870103", "Name": "福茂路", "Direction": "1", "State": "0" },
    // 3
    "6268700980": { "wayID": "626870098", "Name": "福茂路", "Direction": "0", "State": "0" },
    "6268700981": { "wayID": "626870098", "Name": "福茂路", "Direction": "1", "State": "0" },
    // 4
    "6268701020": { "wayID": "626870102", "Name": "福茂路", "Direction": "0", "State": "0" },
    "6268701021": { "wayID": "626870102", "Name": "福茂路", "Direction": "1", "State": "0" },
    // 福盛路 3条
    // 1
    "6268700320": { "wayID": "626870032", "Name": "福盛路", "Direction": "0", "State": "0" },
    "6268700321": { "wayID": "626870032", "Name": "福盛路", "Direction": "1", "State": "0" },
    // 2
    "6268701100": { "wayID": "626870110", "Name": "福盛路", "Direction": "0", "State": "0" },
    "6268701101": { "wayID": "626870110", "Name": "福盛路", "Direction": "1", "State": "0" },
    // 3
    "6268700270": { "wayID": "626870027", "Name": "福盛路", "Direction": "0", "State": "0" },
    "6268700271": { "wayID": "626870027", "Name": "福盛路", "Direction": "1", "State": "0" },
    // 福兴路 3条
    // 1
    "6268700250": { "wayID": "626870025", "Name": "福兴路", "Direction": "0", "State": "0" },
    "6268700251": { "wayID": "626870025", "Name": "福兴路", "Direction": "1", "State": "0" },
    // 2
    "6268700220": { "wayID": "626870022", "Name": "福兴路", "Direction": "0", "State": "0" },
    "6268700221": { "wayID": "626870022", "Name": "福兴路", "Direction": "1", "State": "0" },
    // 3
    "6268700210": { "wayID": "626870021", "Name": "福兴路", "Direction": "0", "State": "0" },
    "6268700211": { "wayID": "626870021", "Name": "福兴路", "Direction": "1", "State": "0" },
    // 湖山路 4条
    // 1
    "6268701160": { "wayID": "626870116", "Name": "湖山路", "Direction": "0", "State": "0" },
    // 2
    "6268701170": { "wayID": "626870117", "Name": "湖山路", "Direction": "0", "State": "0" },
    // 3
    "6268701200": { "wayID": "626870120", "Name": "湖山路", "Direction": "0", "State": "0" },
    // 4
    "6268701220": { "wayID": "626870122", "Name": "湖山路", "Direction": "0", "State": "0" }
}
// +++++++++++++++++全部路段拥堵信息+++++++++++++++++++


server.on('request', function (request, response) {

    var urls = request.url;
    console.log(request.url);

    var trafficInfo = {    // 单条拥堵信息
        "wayID": "",
        "Name": "",
        "Direction": "",
        "State": ""
    }

    if (urls == '/') {
        fs.readFile("./index.html", function (error, html_data) {
            response.setHeader('Content-Type', 'text/html;charset=utf-8');
            var newhtmls = '';
            newhtmls += html_data;
            newhtmls += '<div style="float: right; width:450px; height:700px; overflow-y:scroll;">';
            newhtmls += '<table class="table table-striped" width="450px" height="700px" >';
            newhtmls += '<tr><th>序号</th><th>Name</th><th>ID</th><th>Direction</th><th>State</th></tr>';
            var count = 0;
            for (key in arrStack) {
                count++;
                // if (arrStack[key] != undefined) {
                var state = arrStack[key].State;
                if (state == "1") {
                    newhtmls += '<tr class="warning"><td>';
                }
                else if (state == "2") {
                    newhtmls += '<tr class="danger"><td>';
                }
                else if (state == "0") {
                    newhtmls += '<tr><td>';
                }
                var strCount = String(count);
                newhtmls += strCount;
                newhtmls += '</td><td>';
                newhtmls += arrStack[key].Name;
                newhtmls += '</td><td>';
                newhtmls += arrStack[key].wayID;
                newhtmls += '</td><td>';
                newhtmls += arrStack[key].Direction;
                newhtmls += '</td><td>';
                newhtmls += state;
                newhtmls += '</td></tr>'
                // }
            }
            newhtmls += '</table>';
            newhtmls += '</div>';
            response.end(newhtmls);
            // response.end(html_data);

            // +++++++++++++写xml文件上+++++++++++++++++++++
            var xw = new XMLWriter;
            xw.startDocument('1.0', 'UTF-8');
            xw.startElement('car');

            for (key in arrStack) {
                var strWayID = arrStack[key].wayID;
                var strDirection = arrStack[key].Direction;
                var strState = arrStack[key].State;
                xw.startElement('way');
                xw.writeAttribute('id', strWayID);
                // xw.endAttribute();
                xw.writeAttribute('dir', strDirection);
                // xw.endAttribute();
                xw.writeAttribute('state', strState);
                xw.endAttribute();
                xw.endElement();
            }
            xw.endDocument()

            fs.writeFile("./testInfo.xml", xw.toString(), function (err) {
                console.log("更改一条拥堵信息");
            })
            // +++++++++++++写xml文件下+++++++++++++++++++++

        });


    }
    else if (urls.indexOf('js_form_action') > 0) {
        let result = url.parse(urls, true);
        if (result.query.id != '') {
            // trafficInfo['ID'] = result.query.id;
            trafficInfo['wayID'] = result.query.wayid.substring(0,9);
            // trafficInfo['Section'] = result.query.section;
            trafficInfo['Name'] = result.query.name;
            // trafficInfo['Timestamp'] = result.query.timestamp;
            trafficInfo['State'] = result.query.state;
            trafficInfo['Direction'] = result.query.wayid.charAt(10);
            // trafficInfo['Reason'] = result.query.reason;

            // 更改拥堵信息
            var strID = "";
            strID += trafficInfo['wayID'];
            strID += trafficInfo['Direction'];
            // arrStack[strID].state = trafficInfo['State'];
            arrStack[strID] = trafficInfo;
            console.log(strID);
            console.log(arrStack[strID]);
            // var addid = result.query.wayid;
            // arrStack[addid] = trafficInfo;
            // 打印信息数组对象
            // console.log(arrStack);

            // +++++++++++++写xml文件上+++++++++++++++++++++
            var xw = new XMLWriter;
            xw.startDocument('1.0', 'UTF-8');
            xw.startElement('car');

            for (key in arrStack) {
                var strWayID = arrStack[key].wayID;
                var strDirection = arrStack[key].Direction;
                var strState = arrStack[key].State;
                xw.startElement('way');
                xw.writeAttribute('id', strWayID);
                // xw.endAttribute();
                xw.writeAttribute('dir', strDirection);
                // xw.endAttribute();
                xw.writeAttribute('state', strState);
                xw.endAttribute();
                xw.endElement();
            }
            xw.endDocument()

            fs.writeFile("./testInfo.xml", xw.toString(), function (err) {
                console.log("更改一条拥堵信息");
            })
            // +++++++++++++写xml文件下+++++++++++++++++++++
            fs.readFile("./index.html", function (error, html_data) {
                response.setHeader('Content-Type', 'text/html;charset=utf-8');
                var newhtmls = '';
                newhtmls += html_data;
                newhtmls += '<div style="float: right; width:450px; height:700px; overflow-y:scroll;">';
                newhtmls += '<table class="table table-striped" width="450px" height="700px" >';
                newhtmls += '<tr><th>序号</th><th>Name</th><th>ID</th><th>Direction</th><th>State</th></tr>';
                var count = 0;
                for (key in arrStack) {
                    count++;
                    var state = arrStack[key].State;
                    if (state == "1") {
                        newhtmls += '<tr class="warning"><td>';
                    }
                    else if (state == "2") {
                        newhtmls += '<tr class="danger"><td>';
                    }
                    else if(state=="0"){
                        newhtmls += '<tr><td>';
                    }
                    var strCount = String(count);
                    newhtmls += strCount;
                    newhtmls += '</td><td>';
                    newhtmls += arrStack[key].Name;
                    newhtmls += '</td><td>';
                    newhtmls += arrStack[key].wayID;
                    newhtmls += '</td><td>';
                    newhtmls += arrStack[key].Direction;
                    newhtmls += '</td><td>';
                    newhtmls += state;
                    newhtmls += '</td></tr>';
                }
                newhtmls += '</table>';
                newhtmls += '</div>';
                response.end(newhtmls);
            });
        }
    }
    else {
        fs.readFile('.' + urls, function (error, data) {
            response.end(data);
        })
    }
});

// var arrIP = new Array();
var car1 = new Array();
var car2 = new Array();
var car3 = new Array();
var car4 = new Array();
var car5 = new Array();
var car6 = new Array();
var car7 = new Array();
var car8 = new Array();
var car9 = new Array();
var car10 = new Array();
var car11 = new Array();
var car12 = new Array();
var car13 = new Array();
var car14 = new Array();
var car15 = new Array();
var car16 = new Array();
var car17 = new Array();
var car18 = new Array();
var car19 = new Array();
var car20 = new Array();
var car21 = new Array();
var car22 = new Array();
var arrIP = {
    '1': car1,
    '2': car2,
    '3': car3,
    '4': car4,
    '5': car5,
    '6': car6,
    '7': car7,
    '8': car8,
    '9': car9,
    '10': car10,
    '11': car11,
    '12': car12,
    '13': car13,
    '14': car14,
    '15': car15,
    '16': car16,
    '17': car17,
    '18': car18,
    '19': car19,
    '20': car20,
    '21': car21,
    '22': car22
}
// -----------------------------------
//接收用户端的地址和端口
udp_server.on('message', function (msg, rinfo) {
    var strmsg = msg.toString();
    const buffer = Buffer.alloc(24);
    buffer.write(strmsg);
    console.log(buffer);
    var headBuf = Buffer.alloc(2);      // 报文头
    var timeBuf = Buffer.alloc(14);     // 时间
    var reserveBuf1 = Buffer.alloc(2);   // 保留
    var carID = Buffer.alloc(4);        // 车辆ID
    var reserveBuf2 = Buffer.alloc(2);   // 保留

    for (var i = 0; i < 2; i++) {
        headBuf[i] = buffer[i];
    }
    for (var i = 0; i < 14; i++) {
        timeBuf[i] = buffer[i + 2];
    }
    for (var i = 0; i < 2; i++) {
        reserveBuf1[i] = buffer[i + 16];
    }
    for (var i = 0; i < 4; i++) {
        carID[i] = buffer[i + 18];
    }
    for (var i = 0; i < 2; i++) {
        reserveBuf2[i] = buffer[i + 22];
    }
    if (headBuf.toString() == 'FC' && reserveBuf1.toString() == "  "
        && reserveBuf2.toString() == "  " && carID[3].toString() > '0' && carID[3].toString() <= '22') {
        var ip = rinfo.address;
        var port = rinfo.port;
        var carIDStr = carID[3].toString();

        if (arrIP[carIDStr].length < 5) {
            var i = 0;
            while (i < arrIP[carIDStr].length) {
                if (arrIP[carIDStr][i].ip == ip && arrIP[carIDStr][i].port == port) {
                    arrIP[carIDStr][i].time = 60;
                    break;
                }
            }
            if (i == arrIP[carIDStr].length) {
                var obj = {
                    'ip': ip,
                    'port': port,
                    'time': 60
                }
                arrIP[carIDStr].push(obj);
            }
        }
    }

})

// 每秒向ip列表中所有ip发送消息
setInterval(function () {
    for (key in arrIP) {
        var delArr = new Array();
        for (var i = 0; i < arrIP[key].length; ++i) {
            (arrIP[key][i].time)--;
            if (arrIP[key][i].time < 0) {
                delArr.push(arrIP[key][i]);
            }
        }
        for (var i = 0; i < delArr.length; i++) {
            arrIP[key].splice(delArr[i], 1);
        }
    }


    // 总共
    const allBuffer = Buffer.alloc(388);
    // 1.报文头 'FC'
    var strFC = 'FC';
    allBuffer.write(strFC, 0);

    // 2.时间戳 yyyymmddhhmmss
    var moment = require('moment');
    var now = moment().toDate();
    now = moment().format('YYYYMMDDHHmmss');
    allBuffer.write(now, 2);

    // 3.保留‘$’
    var str3 = '$';
    allBuffer.write(str3, 16);

    // 4.路段数量-37
    allBuffer.writeUInt8(37, 17);

    // 5.各路段
    var count = 0;
    for (key in arrStack) {
        var wayid = arrStack[key].wayID;
        wayid = Number(wayid);
        var stateInfo = arrStack[key].State;
        var direc = arrStack[key].Direction;
        if (stateInfo == '0') {
            stateInfo = 'G';
        }
        else if (stateInfo == '1') {
            stateInfo = 'Y';
        }
        else {
            stateInfo = 'R';
        }

        if (wayid == 626870086 || wayid == 626870088 ||
            wayid == 626870107 || wayid == 626870116 ||
            wayid == 626870117 || wayid == 626870120 ||
            wayid == 626870122) {

            allBuffer.writeBigInt64BE(BigInt(wayid), 18 + 10 * count);
            stateInfo += 'B';
            allBuffer.write(stateInfo, 18 + 10 * count + 8);
            count++;
            continue;
        }
        if (direc == '0') {
            allBuffer.writeBigInt64BE(BigInt(wayid), 18 + 10 * count);
            allBuffer.write(stateInfo, 18 + 10 * count + 8);
        } else {
            allBuffer.write(stateInfo, 18 + 10 * count + 9);
            count++;
        }
    }

    for (key in arrIP) {
        for (var i = 0; i < arrIP[key].length; ++i) {
            udp_server.send(allBuffer, 0, Buffer.byteLength(allBuffer), arrIP[key][i].port, arrIP[key][i].ip);
        }
    }

    // 写日志
    fs.writeFile('./log.txt', JSON.stringify(arrIP), function (err) {

    });


}, 1000);

//错误处理
udp_server.on('error', function (err) {
    console.log('some error on udp server.')
    udp_server.close();
})