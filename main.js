let localStream;
let remoteStream;
let peerConnection;
const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};
let init = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    // audio: true,
  });
  document.querySelector('#user-1').srcObject = localStream;
  createOffer();
};
let createOffer = async () => {
  peerConnection = new RTCPeerConnection(servers);
  remoteStream = new MediaStream();
  document.querySelector('#user-2');
  localStream?.getTracks?.()?.forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack();
    });
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      console.log('New ICE Candadite', event.cancelable);
    }
  };
  let offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  console.log('offer', offer);
};
init();
