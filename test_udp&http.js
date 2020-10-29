var http = require('http');
var fs = require('fs');
var XMLWriter = require('xml-writer');

const url = require('url');
var server = http.createServer();
server.listen(8000, function () {
    console.log(' 请访问http://39.105.201.210:8000');
});
// ------------------
var dgram = require('dgram');
//创建 udp server
var udp_server = dgram.createSocket('udp4');
udp_server.bind(41234); // 绑定端口

// 监听端口
udp_server.on('listening', function () {
    console.log('udp server linstening 41234.');
})
// -----------------

// +++++++++++++++++全部路段拥堵信息+++++++++++++++++++
arrStack = {
    // 内部道路
    // 1
    "6268700800": { "wayID": "626870080", "Name": "内部道路1", "Direction": "0", "State": "0" },
    "6268700801": { "wayID": "626870080", "Name": "内部道路1", "Direction": "1", "State": "0" },
    // 2
    "6268700820": { "wayID": "626870082", "Name": "内部道路2", "Direction": "0", "State": "0" },
    "6268700821": { "wayID": "626870082", "Name": "内部道路2", "Direction": "1", "State": "0" },
    // 3
    "6268700830": { "wayID": "626870083", "Name": "内部道路3", "Direction": "0", "State": "0" },
    "6268700831": { "wayID": "626870083", "Name": "内部道路3", "Direction": "1", "State": "0" },
    // 4
    "6268700850": { "wayID": "626870085", "Name": "内部道路4", "Direction": "0", "State": "0" },
    "6268700851": { "wayID": "626870085", "Name": "内部道路4", "Direction": "1", "State": "0" },
    // 5
    "6268700810": { "wayID": "626870081", "Name": "内部道路5", "Direction": "0", "State": "0" },
    "6268700811": { "wayID": "626870081", "Name": "内部道路5", "Direction": "1", "State": "0" },
    // 6
    "6268700870": { "wayID": "626870087", "Name": "内部道路6", "Direction": "0", "State": "0" },
    "6268700871": { "wayID": "626870087", "Name": "内部道路6", "Direction": "1", "State": "0" },
    // 7
    "6268700860": { "wayID": "626870086", "Name": "内部道路7", "Direction": "0", "State": "0" },
    // 8
    "6268700880": { "wayID": "626870088", "Name": "内部道路8", "Direction": "0", "State": "0" },
    // 9
    "6268700890": { "wayID": "626870089", "Name": "内部道路9", "Direction": "0", "State": "0" },
    "6268700891": { "wayID": "626870089", "Name": "内部道路9", "Direction": "1", "State": "0" },
    // 10
    "6268700910": { "wayID": "626870091", "Name": "内部道路10", "Direction": "0", "State": "0" },
    "6268700911": { "wayID": "626870091", "Name": "内部道路10", "Direction": "1", "State": "0" },
    // 11
    "6268700920": { "wayID": "626870092", "Name": "内部道路11", "Direction": "0", "State": "0" },
    "6268700921": { "wayID": "626870092", "Name": "内部道路11", "Direction": "1", "State": "0" },
    // 云深路
    // 1
    "6268700610": { "wayID": "626870061", "Name": "云深路西段1", "Direction": "0", "State": "0" },
    "6268700611": { "wayID": "626870061", "Name": "云深路西段1", "Direction": "1", "State": "0" },
    // 2
    "6268700590": { "wayID": "626870059", "Name": "云深路西段2", "Direction": "0", "State": "0" },
    "6268700591": { "wayID": "626870059", "Name": "云深路西段2", "Direction": "1", "State": "0" },
    // 3
    "6268700930": { "wayID": "626870093", "Name": "云深路西段3", "Direction": "0", "State": "0" },
    "6268700931": { "wayID": "626870093", "Name": "云深路西段3", "Direction": "1", "State": "0" },
    // 4
    "6268700580": { "wayID": "626870058", "Name": "云深路中段", "Direction": "0", "State": "0" },
    "6268700581": { "wayID": "626870058", "Name": "云深路中段", "Direction": "1", "State": "0" },
    // 5
    "6268700570": { "wayID": "626870057", "Name": "云深路东段", "Direction": "0", "State": "0" },
    "6268700571": { "wayID": "626870057", "Name": "云深路东段", "Direction": "1", "State": "0" },
    //  五渠路
    // 1
    "6268700380": { "wayID": "626870038", "Name": "五渠路西段", "Direction": "0", "State": "0" },
    "6268700381": { "wayID": "626870038", "Name": "五渠路西段", "Direction": "1", "State": "0" },
    // 2
    "6268700330": { "wayID": "626870033", "Name": "五渠路中段", "Direction": "0", "State": "0" },
    "6268700331": { "wayID": "626870033", "Name": "五渠路中段", "Direction": "1", "State": "0" },
    // 3
    "6268700400": { "wayID": "626870040", "Name": "五渠路东段", "Direction": "0", "State": "0" },
    "6268700401": { "wayID": "626870040", "Name": "五渠路东段", "Direction": "1", "State": "0" },
    // 渔乐路
    // 1
    "6268700430": { "wayID": "626870043", "Name": "渔乐路西段", "Direction": "0", "State": "0" },
    "6268700431": { "wayID": "626870043", "Name": "渔乐路西段", "Direction": "1", "State": "0" },
    // 2
    "6268700500": { "wayID": "626870050", "Name": "渔乐路中段", "Direction": "0", "State": "0" },
    "6268700501": { "wayID": "626870050", "Name": "渔乐路中段", "Direction": "1", "State": "0" },
    // 3
    "6268700520": { "wayID": "626870052", "Name": "渔乐路东段", "Direction": "0", "State": "0" },
    "6268700521": { "wayID": "626870052", "Name": "渔乐路东段", "Direction": "1", "State": "0" },
    // 黄浦江路
    // 1
    "6268701070": { "wayID": "626870107", "Name": "黄浦江路中段", "Direction": "0", "State": "0" },
    // 福茂路
    // 1
    "6268700540": { "wayID": "626870054", "Name": "福茂路中段", "Direction": "0", "State": "0" },
    "6268700541": { "wayID": "626870054", "Name": "福茂路中段", "Direction": "1", "State": "0" },
    // 2
    "6268701030": { "wayID": "626870103", "Name": "福茂路南1段", "Direction": "0", "State": "0" },
    "6268701031": { "wayID": "626870103", "Name": "福茂路南1段", "Direction": "1", "State": "0" },
    // 3
    "6268700980": { "wayID": "626870098", "Name": "福茂路南2段", "Direction": "0", "State": "0" },
    "6268700981": { "wayID": "626870098", "Name": "福茂路南2段", "Direction": "1", "State": "0" },
    // 4
    "6268701020": { "wayID": "626870102", "Name": "福茂路南3段", "Direction": "0", "State": "0" },
    "6268701021": { "wayID": "626870102", "Name": "福茂路南3段", "Direction": "1", "State": "0" },
    // 福盛路
    // 1
    "6268700320": { "wayID": "626870032", "Name": "福盛路北段", "Direction": "0", "State": "0" },
    "6268700321": { "wayID": "626870032", "Name": "福盛路北段", "Direction": "1", "State": "0" },
    // 2
    "6268701100": { "wayID": "626870110", "Name": "福盛路中段", "Direction": "0", "State": "0" },
    "6268701101": { "wayID": "626870110", "Name": "福盛路中段", "Direction": "1", "State": "0" },
    // 3
    "6268700270": { "wayID": "626870027", "Name": "福盛路南段", "Direction": "0", "State": "0" },
    "6268700271": { "wayID": "626870027", "Name": "福盛路南段", "Direction": "1", "State": "0" },
    // 福兴路
    // 1
    "6268700250": { "wayID": "626870025", "Name": "福兴路北段", "Direction": "0", "State": "0" },
    "6268700251": { "wayID": "626870025", "Name": "福兴路北段", "Direction": "1", "State": "0" },
    // 2
    "6268700220": { "wayID": "626870022", "Name": "福兴路中段", "Direction": "0", "State": "0" },
    "6268700221": { "wayID": "626870022", "Name": "福兴路中段", "Direction": "1", "State": "0" },
    // 3
    "6268700210": { "wayID": "626870021", "Name": "福兴路南段", "Direction": "0", "State": "0" },
    "6268700211": { "wayID": "626870021", "Name": "福兴路南段", "Direction": "1", "State": "0" },
    // 湖山路
    // 1
    "6268701160": { "wayID": "626870116", "Name": "湖山路北1段", "Direction": "0", "State": "0" },
    // 2
    "6268701170": { "wayID": "626870117", "Name": "湖山路北2段", "Direction": "0", "State": "0" },
    // 3
    "6268701200": { "wayID": "626870120", "Name": "湖山路中段", "Direction": "0", "State": "0" },
    // 4
    "6268701220": { "wayID": "626870122", "Name": "湖山路南段", "Direction": "0", "State": "0" }
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
            newhtmls += '<div style="float: right;" >';
            newhtmls += '<table border="1">';
            newhtmls += '<tr><th>ID</th><th>Name</th><th>Direction</th><th>State</th></tr>';

            for (key in arrStack) {
                // if (arrStack[key] != undefined) {
                newhtmls += '<tr><td>';
                newhtmls += arrStack[key].wayID;
                newhtmls += '</td><td>';
                newhtmls += arrStack[key].Name;
                newhtmls += '</td><td>';
                newhtmls += arrStack[key].Direction;
                newhtmls += '</td><td>';
                newhtmls += arrStack[key].State;
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
            trafficInfo['wayID'] = result.query.wayid;
            // trafficInfo['Section'] = result.query.section;
            trafficInfo['Name'] = result.query.name;
            // trafficInfo['Timestamp'] = result.query.timestamp;
            trafficInfo['State'] = result.query.state;
            trafficInfo['Direction'] = result.query.direction;
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
                newhtmls += '<div style="float: right;">';
                newhtmls += '<table border="1">';
                newhtmls += '<tr><th>ID</th><th>Name</th><th>Direction</th><th>State</th></tr>';

                for (key in arrStack) {
                    // if (arrStack[key] != undefined) {
                    newhtmls += '<tr><td>';
                    newhtmls += arrStack[key].wayID;
                    newhtmls += '</td><td>';
                    newhtmls += arrStack[key].Name;
                    newhtmls += '</td><td>';
                    newhtmls += arrStack[key].Direction;
                    newhtmls += '</td><td>';
                    newhtmls += arrStack[key].State;
                    newhtmls += '</td></tr>'
                    // }
                }
                newhtmls += '</table>';
                newhtmls += '</div>';
                response.end(newhtmls);
            });
        }
    }
    // else if (urls.indexOf('js_form2_action') > 0) {
    //     let result2 = url.parse(urls, true);

    //     if (result2.query.delId != '') {
    //         var delid = result2.query.delId;
    //         arrStack[delid] = undefined;

    //         // +++++++++++++写xml文件上+++++++++++++++++++++
    //         var xw = new XMLWriter;
    //         xw.startDocument('1.0', 'UTF-8');
    //         xw.startElement('car');

    //         for (key in arrStack) {
    //             if (arrStack[key] != undefined) {
    //                 var strWayID = arrStack[key].wayID;
    //                 xw.startElement('way');
    //                 xw.writeAttribute('id', strWayID);
    //                 xw.endAttribute();
    //                 xw.endElement();
    //             }
    //         }
    //         xw.endDocument();
    //         fs.writeFile("./testInfo.xml", xw.toString(), function (err) {
    //             console.log("添加一条拥堵信息");
    //         })
    //         // +++++++++++++写xml文件下+++++++++++++++++++++



    //         // 打印信息数组对象
    //         console.log(arrStack);

    //         fs.readFile("./index.html", function (error, html_data) {
    //             response.setHeader('Content-Type', 'text/html;charset=utf-8');
    //             var newhtmls = '';
    //             newhtmls += html_data;
    //             newhtmls += '<table border="1">';
    //             newhtmls += '<tr><th>wayID</th><th>Name</th><th>Reason</th></tr>'

    //             for (key in arrStack) {
    //                 if (arrStack[key] != undefined) {
    //                     newhtmls += '<tr><td>';
    //                     // newhtmls += arrStack[key].ID;
    //                     // newhtmls += '</td><td>';
    //                     newhtmls += arrStack[key].wayID;
    //                     newhtmls += '</td><td>';
    //                     newhtmls += arrStack[key].Name;
    //                     newhtmls += '</td><td>';
    //                     newhtmls += arrStack[key].Reason;
    //                     newhtmls += '</td></tr>'
    //                 }
    //             }
    //             newhtmls += '</table>';
    //             response.end(newhtmls);
    //         });
    //     }
    // }

    else {
        fs.readFile('.' + urls, function (error, data) {
            response.end(data);
        })
    }
});


// -----------------------------------
//接收用户端的地址和端口，发送消息
udp_server.on('message', function (msg, rinfo) {
    // 时间戳
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var strTime = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second;
    udp_server.send(strTime, 0, Buffer.byteLength(strTime), rinfo.port, rinfo.address);

    for (key in arrStack) {
        var strmsg = "";
        // if (arrStack[key] != undefined) {
        strmsg += JSON.stringify(arrStack[key].wayID);
        strmsg += "  ";
        strmsg += JSON.stringify(arrStack[key].Name);
        strmsg += "  ";
        strmsg += JSON.stringify(arrStack[key].Direction);
        strmsg += "  ";
        strmsg += JSON.stringify(arrStack[key].State);
        udp_server.send(strmsg, 0, Buffer.byteLength(strmsg), rinfo.port, rinfo.address);
        // }
    }
    console.log('udp server received data: ${strmsg} from ${' + rinfo.address + '}:${' + rinfo.port + '}')
})
//错误处理
udp_server.on('error', function (err) {
    console.log('some error on udp server.')
    udp_server.close();
})
// --------------------------