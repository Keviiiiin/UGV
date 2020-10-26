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
// // 添加
// function addScript(url){
//     var script = document.createElement('script');
//     script.setAttribute('type','text/javascript');
//     script.setAttribute('src',url);
//     document.getElementsByTagName('head')[0].appendChild(script);
//    }

arrStack = {

}  // 拥堵信息对象

server.on('request', function (request, response) {

    var urls = request.url;
    console.log(request.url);

    var trafficInfo = {    // 单条拥堵信息
        // "ID": "",
        "wayID": "",
        "Section": "",
        "Name": "",
        // "Timestamp": "",
        "State": "",
        "Direction": "",
        "Reason": ""
    }

    if (urls == '/') {
        fs.readFile("./index.html", function (error, html_data) {
            response.setHeader('Content-Type', 'text/html;charset=utf-8');
            var newhtmls = '';
            newhtmls += html_data;
            newhtmls += '<div style="float: right;">';
            newhtmls += '<table border="1">';
            newhtmls += '<tr><th>wayID</th><th>Name</th><th>Reason</th></tr>'

            for (key in arrStack) {
                if (arrStack[key] != undefined) {
                    newhtmls += '<tr><td>';
                    // newhtmls += arrStack[key].ID;
                    // newhtmls += '</td><td>';
                    newhtmls += arrStack[key].wayID;
                    newhtmls += '</td><td>';
                    newhtmls += arrStack[key].Name;
                    newhtmls += '</td><td>';
                    newhtmls += arrStack[key].Reason;
                    newhtmls += '</td></tr>'
                }
            }
            newhtmls += '</table>';
            newhtmls += '</div>';
            response.end(newhtmls);
            // response.end(html_data);
        });


    }
    else if (urls.indexOf('js_form_action') > 0) {
        let result = url.parse(urls, true);
        if (result.query.id != '') {
            // trafficInfo['ID'] = result.query.id;
            trafficInfo['wayID'] = result.query.wayid;
            trafficInfo['Section'] = result.query.section;
            trafficInfo['Name'] = result.query.name;
            // trafficInfo['Timestamp'] = result.query.timestamp;
            trafficInfo['State'] = result.query.state;
            trafficInfo['Direction'] = result.query.direction;
            trafficInfo['Reason'] = result.query.reason;
            // 添加拥堵信息
            var addid = result.query.wayid;
            arrStack[addid] = trafficInfo;
            // 打印信息数组对象
            // console.log(arrStack);

            // +++++++++++++写xml文件上+++++++++++++++++++++
            var xw = new XMLWriter;
            xw.startDocument('1.0', 'UTF-8');
            xw.startElement('car');

            for (key in arrStack) {
                if (arrStack[key] != undefined) {
                    var strWayID = arrStack[key].wayID;
                    xw.startElement('way');
                    xw.writeAttribute('id', strWayID);
                    xw.endAttribute();
                    xw.endElement();
                }
            }
            xw.endDocument();

            fs.writeFile("./userInfo.xml", xw.toString(), function (err) {
                console.log("添加一条拥堵信息");
            })
            // +++++++++++++写xml文件下+++++++++++++++++++++
            fs.readFile("./index.html", function (error, html_data) {
                response.setHeader('Content-Type', 'text/html;charset=utf-8');
                var newhtmls = '';
                newhtmls += html_data;
                newhtmls += '<div style="float: right;">';
                newhtmls += '<table border="1">';
                newhtmls += '<tr><th>wayID</th><th>Name</th><th>Reason</th></tr>'

                for (key in arrStack) {
                    if (arrStack[key] != undefined) {
                        newhtmls += '<tr><td>';
                        // newhtmls += arrStack[key].ID;
                        // newhtmls += '</td><td>';
                        newhtmls += arrStack[key].wayID;
                        newhtmls += '</td><td>';
                        newhtmls += arrStack[key].Name;
                        newhtmls += '</td><td>';
                        newhtmls += arrStack[key].Reason;
                        newhtmls += '</td></tr>'
                    }
                }
                newhtmls += '</table>';
                newhtmls += '</div>';
                response.end(newhtmls);
            });
        }
    }
    else if (urls.indexOf('js_form2_action') > 0) {
        let result2 = url.parse(urls, true);

        if (result2.query.delId != '') {
            var delid = result2.query.delId;
            arrStack[delid] = undefined;

            // +++++++++++++写xml文件上+++++++++++++++++++++
            var xw = new XMLWriter;
            xw.startDocument('1.0', 'UTF-8');
            xw.startElement('car');

            for (key in arrStack) {
                if (arrStack[key] != undefined) {
                    var strWayID = arrStack[key].wayID;
                    xw.startElement('way');
                    xw.writeAttribute('id', strWayID);
                    xw.endAttribute();
                    xw.endElement();
                }
            }
            xw.endDocument();
            fs.writeFile("./userInfo.xml", xw.toString(), function (err) {
                console.log("添加一条拥堵信息");
            })
            // +++++++++++++写xml文件下+++++++++++++++++++++



            // 打印信息数组对象
            console.log(arrStack);

            fs.readFile("./index.html", function (error, html_data) {
                response.setHeader('Content-Type', 'text/html;charset=utf-8');
                var newhtmls = '';
                newhtmls += html_data;
                newhtmls += '<table border="1">';
                newhtmls += '<tr><th>wayID</th><th>Name</th><th>Reason</th></tr>'

                for (key in arrStack) {
                    if (arrStack[key] != undefined) {
                        newhtmls += '<tr><td>';
                        // newhtmls += arrStack[key].ID;
                        // newhtmls += '</td><td>';
                        newhtmls += arrStack[key].wayID;
                        newhtmls += '</td><td>';
                        newhtmls += arrStack[key].Name;
                        newhtmls += '</td><td>';
                        newhtmls += arrStack[key].Reason;
                        newhtmls += '</td></tr>'
                    }
                }
                newhtmls += '</table>';
                response.end(newhtmls);
            });
        }
    }
    // else if (urls == "filelist"){
    //     // response.setHeader('Content-Type', 'text/plain;charset=utf-8');
    //     // var str = JSON.stringify('hello');
    //     var str = 'hello';
    //     response.end(str);

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
        if (arrStack[key] != undefined) {
            var strmsg = JSON.stringify(arrStack[key]);
            udp_server.send(strmsg, 0, Buffer.byteLength(strmsg), rinfo.port, rinfo.address);
        }
    }
    console.log('udp server received data: ${strmsg} from ${' + rinfo.address + '}:${' + rinfo.port + '}')
})
//错误处理
udp_server.on('error', function (err) {
    console.log('some error on udp server.')
    udp_server.close();
})
// --------------------------