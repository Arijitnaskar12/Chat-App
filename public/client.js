const socket= io();
let name1;
let textarea=document.getElementById("textarea");
console.log(textarea);
let messageArea=document.querySelector(".message__area");
do{
 name1=prompt("Please enter your name:")
}while(!name1)
textarea.addEventListener("keyup",(e)=>{
    if(e.key==='Enter')
    {
        showMessage(e.target.value);
        textarea.value=''; 
    }
})
function showMessage(message){
    let msg={
        user:name1,
        message:message
    }
    appendMessage(msg,'outgoing');
    scrollToBottom();
    // send message to server
    socket.emit('message',msg);
}
function appendMessage(msg,type)
{
let mainDiv=document.createElement("div");
let className=type;
mainDiv.classList.add(className,'message');
let markup=`
<h4>${msg.user}</h4>
<p>${msg.message}</p>
`
mainDiv.innerHTML=markup;
messageArea.appendChild(mainDiv);
}
// receive message
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrollToBottom();
});
function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}