var uname = prompt("Your name:");
var websocket = new WebSocket("ws://068423ea62f8.ngrok.io/"+uname);
//var websocket = new WebSocket("wss://repl.it/join/zggruodk-arifsardar");
const chatMessages = document.querySelector('#mainChatBody');
const body = document.querySelector('#chatcordChat');
var chatInputText = document.getElementById("chatInputText");
var available_user = document.getElementById("chatUserStats");

chatMessages.scrollTop = chatMessages.scrollHeight;
//send greets message to the server
websocket.onopen = function(evt) { onOpen(evt) };
function onOpen(evt)
  {
    //websocket.onmessage = function(r){web = Json.parse(e.data);webid =data.webid}
    //websocket.send(JSON.stringify({username:uname,roomId:"15",message:"™™~π™™",time:"",msgType:"text"}));
}
//send message to the server
function sendData() {
  // Get text Message from dom
  let msg = document.getElementById("chatInputText").value;
  msg = msg.trim();
  document.getElementById("chatInputText").value = "";
  document.getElementById("chatInputText").focus();
  document.getElementById("chatInputText").style.height='18px';
  if (msg != ""){
    websocket.send(JSON.stringify({username:uname,roomId:"15",message:msg,time:"",msgType:"text"}));
  console.log("Message sent: " + msg)
  }
}

function InputFocus() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
    document.getElementById("emojiMain").style.display="none";
}
function InputBlur() {
    console.log("InputBlur")
    document.getElementById('mainChatBody').style.height="74vh";
}

// receive message from the server
websocket.onmessage = function (event) {
      //data = JSON.parse(event.data);
  data = JSON.parse(event.data);
      console.log(data);
      available_user.innerText = data.available_user + " Users Online";
      if(data.msgType == "videoCall"){
          videoCallOthersRender(data.message);
      }else{
          addmessage();
      }
  navigator.push("hello")
  chatMessages.scrollTop = chatMessages.scrollHeight;
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

  //<div class="othersChat">
	  //<h5 class="chatVictim"><b>Rohit</b></h5>
	  //<div class="chatMessage"><p>Hello Arif!!!How are you..are you doing great!</p></div>
	  //<p class="chatTime">12:31 AM</p>
  //</div>

function addmessage(){
  if (data.username == uname){
    chatclass = "myChat";
    chatuname = "You";
  } else {
    chatclass = "othersChat";
    chatuname = data.username;
  }
  if (data.username == "ChatCord"){
    chatclass = "botchat";
    chatuname = data.username;
  }
  const div = document.createElement('div');
  div.classList.add(chatclass);

  const h5 = document.createElement('h5');
  h5.classList.add('chatVictim');

  const b = document.createElement('b');
  b.innerText = chatuname;

  h5.appendChild(b);

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chatMessage');

  if (data.msgType == "text"){
  const getmessage = document.createElement('p');
  getmessage.innerText = data.message;

  messageDiv.appendChild(getmessage);
  }
  if (data.msgType == "img"){
  const getmessage = document.createElement('img');
  getmessage.setAttribute("src",data.message);
  
  download = document.createElement("a");
  download.setAttribute("href",data.message);
  download.setAttribute("download",data.imgname);
  download.innerText="download";

  messageDiv.appendChild(getmessage);
  messageDiv.appendChild(download);
  }
  if (data.msgType == "video"){
  const getmessage = document.createElement('p');
  getmessage.innerText = data.message;
  download = document.createElement('');

  messageDiv.appendChild(getmessage);
  }

  const chattime = document.createElement('p');
  chattime.classList.add('chatTime');
  chattime.innerText = data.time;

  div.appendChild(h5);
  div.appendChild(messageDiv);
  div.appendChild(chattime);
  document.querySelector('#mainChatBody').appendChild(div)

}





//Textarea resizing
function expandTextarea(id) {
    document.getElementById(id).addEventListener('keyup', function() {
        this.style.overflow = 'auto';
        this.style.height = 0;
        this.style.height = this.scrollHeight + 'px';
        $('body').scrollTop = '100px';//body.scrollHeight;
    }, false);
}
expandTextarea('chatInputText');




function getImageBtn(){
    document.getElementById("get-image").click();
}
// Get Image from the dom
var imagebase64 = "";  
function encodeImageFileAsURL(element) {
    // Get file name
        var imgPath = document.getElementById('get-image').value;
    if (imgPath) {
        var startIndex = (imgPath.indexOf('\\') >= 0 ? imgPath.lastIndexOf('\\') : imgPath.lastIndexOf('/'));
        var imgname = imgPath.substring(startIndex);
        if (imgname.indexOf('\\') === 0 || imgname.indexOf('/') === 0) {
            imgname = imgname.substring(1);
        }
    }
    //Get file
    var file = element.files[0];  
    var reader = new FileReader();  
    reader.onloadend = function() {  
        imagebase64 = reader.result;  
        console.log(imagebase64);
        websocket.send(JSON.stringify({username:uname,roomId:"15",message:imagebase64,time:"",msgType:"img", imgname:imgname}));
    }  
    reader.readAsDataURL(file);  
    chatMessages.scrollTop = chatMessages.scrollHeight;
}  

function emojiBtn(){
    document.getElementById("chatInputText").blur();
    document.getElementById("emojiMain").style.display="block";
    document.getElementById("emoji").style.display="none";
    document.getElementById("keyboardBtn").style.display="inline";
    document.getElementById("mainChatBody").style.height="34vh";
}

// Video Chat Section
var videoCallVideoFace = "environment";
var videoCallVideo = { facingMode: { exact: videoCallVideoFace }};
var videoCallMic = false;

function videoCallVideoFaceChange(){
    console.log("Video Call Video Face Change");
    if(videoCallVideoFace == "user"){
        videoCallVideoFace = "environment";
        console.log("video face changed to environment");
        videoCallVideoOn();
    }else{
        videoCallVideoFace = "user";
        console.log("video face changed to user");
        videoCallVideoOn();
    }
}
function videoCallVideoOn(){
    console.log("videoCallVideoOn")
    videoCallVideo = { facingMode: { exact: videoCallVideoFace }};
    VideoChatStart();
}
function videoCallVideoOff(){
    console.log("videoCallVideoOff")
    videoCallVideo = false;
    VideoChatStart();
}
function videoCallMicOn(){
    console.log("videoCallMicOn")
    videoCallMic = true;
    VideoChatStart();
}
function videoCallMicOff(){
    console.log("videoCallMicOff")
    videoCallMic = false;
    VideoChatStart();
}
function VideoChatStart(){
    console.log("video chat started");
    document.getElementById("chatcordChat").style.display="none";
    document.getElementById("chatcordVideo").style.display="block";
    
    var constraints = {
        //video: { facingMode: { exact: "environment" } },
        //video: false,
        video: videoCallVideo,
        audio: videoCallMic,
};

const myVideo = document.querySelector("video#myVideo");
const othersVideo = document.querySelector("video#othersVideo");

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  myVideo.srcObject = stream;
  websocket.send(JSON.stringify({username:uname,roomId:"15",message:stream.trim(),time:"",msgType:"videoCall"}));
  console.log(stream);
});
}
function videoCallOthersRender(renderStream){
  othersVideo.srcObject = data.message;
}
//VideoChatStart();
function myVideoClicked(){
    console.log("myVideoClicked")
    document.getElementById('myVideo').classList.add('myVideoClicked')
    document.getElementById('myVideo').classList.remove('myVideo')
    document.getElementById('othersVideo').classList.add('othersVideo')
    document.getElementById('othersVideo').classList.remove('othersVideoClicked')
}
function othersVideoClicked(){
    console.log("othersVideoClicked")
    document.getElementById('myVideo').classList.add('myVideo')
    document.getElementById('myVideo').classList.remove('myVideoClicked')
    document.getElementById('othersVideo').classList.add('othersVideoClicked')
    document.getElementById('othersVideo').classList.remove('othersVideo')
}


