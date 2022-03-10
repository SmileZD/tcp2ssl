var net = require('net');
var tls = require('tls');
var os = require('os');
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));
var port = 8888;
var serverip = '127.0.0.1';
var serverport = 8899;
if(args.p){port=args.p}
if(args.ip){serverip=args.ip}
if(args.p2){serverport=args.p2}
function getLocalIp(){
	try{
    var map = [];  
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {  
        if(ifaces[dev][1].address.indexOf('192.168') != -1) {  
            return ifaces[dev][1].address;  
        }  
    }    
    return map;
	}catch(err){
		return '127.0.0.1'
	}
}
var server = net.createServer(function (client) {
    client.on('error', function (err) {
        try {
            ser.end();
            ser.destroy();
            client.end();
            client.destroy();
        } catch (err) {}
    })
    var ser = tls.connect({
        port: serverport,
        host: serverip,
        rejectUnauthorized: false
    }, function () {
        ser.on('data', function (data) {
            try {
                client.write(data)
            } catch (err) {}
        })

    })
        ser.on('error', function () {
            try {
                client.end();
                client.destroy();
            } catch (err) {}
        })
        client.on('data', function (data) {
            try {
                ser.write(data)
            } catch (err) {}
        })
})
server.on('error', function (err) {
    console.log('端口' + port + '被占用\n')
});
server.listen(port, '0.0.0.0', function () {
    console.log('当前本机使用127.0.0.1:' + port + '作为tcp地址\n中转到'+serverip+'的ssl端口'+serverport+'\n局域网电脑可以使用'+getLocalIp()+':'+port+'作为tcp地址');
});
