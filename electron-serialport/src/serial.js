
window.$ = window.jQuery = require('./public/js/jquery.min.js');
let serialport = require('serialport');
let port = null;
var isConnect = false
// 串口列表
serialport.list((err, ports) => {
    for (let item of ports) {
        $('.com').append(`<option>${item.comName}</option>`)
    }
    console.log(ports);
});
// 点击打开串口
$('.btn-submit').click((data) => {
    let COM = $('select option:selected').text();
    let BaudRate = $('#BaudRate').val();
    let DataBits = $('#DataBits').val();
    let StopBits = $('#StopBits').val();
    let RTS = $('#RTSCheck').is(':checked');
    console.log(COM);
    console.log(BaudRate);
    isConnect = false;
    port = new serialport(COM, {
        baudRate: parseInt(BaudRate),
        dataBits: parseInt(DataBits),
        stopBits: parseInt(StopBits),
        autoOpen: false,
        rtscts: RTS
    });
    port.open(function (error) {
      if (error) {
        isConnect = false;
        console.log('failed to open serial: '+error);
      } 
      else {
        isConnect = true;
        console.log('open serial success: '+COM);
        console.log('isConnect: '+isConnect);
      }
    });
    if(!isConnect){
        $('.receive-windows').text(`打开串口: ${COM}, 波特率: ${BaudRate}`);
        $('.receive-windows').append('<br/>=======================================<br/>');
        console.log('isConnect: '+isConnect);
        //读取端口数据
        port.on('data', data => {
            console.log(`DATA: ${data}`);
            $('.receive-windows').append(data.toString());
        });        
    }
    else{
        $('.receive-windows').text(`打开串口: ${COM} 失败, 请检查设置参数`);
        $('.receive-windows').append('<br/>=======================================<br/>');        
        console.log('isConnect: '+isConnect);
    }

});
// 点击关闭串口
$('.btn-disconnect').click(() => {
    let COM = $('select option:selected').text();
    if (isConnect) {
        $('.receive-windows').text(`关闭串口: ${COM}`);
        port.close(function (error) {
            if (error) {
              isConnect = true;
              console.log('failed to close serial: '+error);
            } 
            else {
              isConnect = false;
              console.log('close serial success: '+COM);
              console.log('isConnect: '+isConnect);
            }
        });        
    };
    $('.input-send-data').val('');
});
// 点击发送信息
$('.btn-send').click(() => {
    var sendData = $('.input-send-data').val();
    if (port != {} && port != null) {
        console.log(`SendData: ${sendData}`);
        port.write(sendData,'ascii');
        port.write('\n','ascii');
        port.write('\r','ascii');
    }
});
// 清空信息
$('.btn-reset').click(() => {
    $('.input-send-data').val('');
    $('.receive-windows').text('');
})