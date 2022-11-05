const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messinput = document.getElementById('textInp');
const messagecontainer = document.querySelector('.container');

var audio = new Audio('tone.mp3');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    append(`You: ${messinput.value}`,'right');
    socket.emit('send',messinput.value);
    messinput.value = '';
})
const append = (message,position)=>{
        const messelement = document.createElement('div');
        messelement.innerText = message;
        messelement.classList.add('message');
        messelement.classList.add('oval');
        messelement.classList.add(position);
        if(position=='left'){
            audio.play();
        }
        messagecontainer.append(messelement);
}
const appends = (message)=>{
    const messelement = document.createElement('div');
    messelement.innerText = message;
    messelement.classList.add('center');
    messagecontainer.append(messelement);
}

const name1 = prompt("Enter your name to join chat");
socket.emit('new-user-joined', name1);

socket.on('userjoined',name=>{
    appends(`Server: ${name} joined the chat`,'right');
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
})
socket.on('left',data=>{
    appends(`Server: ${data} left the chat`,'left');
})