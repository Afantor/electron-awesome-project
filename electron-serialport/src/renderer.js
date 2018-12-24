// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialport = require('serialport')
const createTable = require('data-table')

serialport.list((err, ports) => {
  console.log('ports', ports);
  if (err) {
    document.getElementById('error').textContent = err.message
    return
  } else {
    document.getElementById('error').textContent = ''
  }

  if (ports.length === 0) {
    document.getElementById('error').textContent = 'No ports discovered'
  }

  const headers = Object.keys(ports[0])
  const table = createTable(headers)
  tableHTML = ''
  table.on('data', data => tableHTML += data)
  table.on('end', () => document.getElementById('ports').innerHTML = tableHTML)
  ports.forEach(port => table.write(port))
  table.end();
})

const port = new serialport('COM7',{
  baudRate:115200
});
port.on('open',function(){
    port.write('main screen turn on ',function(err){
        if(err){
            return console.log('Error on write: ' ,err.message);
        }
        console.log('message written');
    });
});

//打开错误将会发出一个错误事件
port.on('error',function(err){
    console.log('Error: ',err.message);
});

port.on('data',function(data){
    console.log('Data: ',data);
});