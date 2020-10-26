var fs = require('fs');

var XMLWriter = require('xml-writer');
xw = new XMLWriter;

xw.startDocument('1.0', 'UTF-8');
xw.startElement('car');

for (var i = 0; i < 3; i++)
{
    xw.startElement('way');
    xw.writeAttribute('id', 'strmsg');
    xw.endAttribute();
    xw.endElement();
}

xw.endDocument();

fs.writeFile("./testInfo.xml", xw, function(err){
    console.log("添加一条拥堵信息");
})