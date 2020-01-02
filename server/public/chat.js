const socket = io.connect('localhost:4000');
table = document.getElementById('table');

socket.on('newCard', (data) => {
    table.innerHTML += '<div class="card ' + data.color + ' ' + data.symbol  + ' ' + data.fill + ' ' + data.quantity + 
                        '" onClick = "console.log('+{data}+')"></div>';
});
