'use client';

import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export default function VideoCallPage() {
  const [roomId, setRoomId] = useState('');
  const [inCall, setInCall] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000', {
      auth: { token: localStorage.getItem('token') }
    });

    socketRef.current.on('offer', handleOffer);
    socketRef.current.on('answer', handleAnswer);
    socketRef.current.on('ice-candidate', handleIceCandidate);
    socketRef.current.on('user-joined', () => console.log('User joined'));

    return () => socketRef.current.disconnect();
  }, []);

  const joinRoom = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;

    peerConnectionRef.current = new RTCPeerConnection();
    stream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit('ice-candidate', { candidate: event.candidate, roomId });
      }
    };

    peerConnectionRef.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    socketRef.current.emit('join-room', roomId);
    setInCall(true);
  };

  const createOffer = async () => {
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socketRef.current.emit('offer', { offer, roomId });
  };

  const handleOffer = async (data) => {
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    socketRef.current.emit('answer', { answer, roomId: data.roomId });
  };

  const handleAnswer = (data) => {
    peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
  };

  const handleIceCandidate = (data) => {
    peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Video Calling</h1>
      {!inCall ? (
        <div>
          <input placeholder="Room ID" value={roomId} onChange={e => setRoomId(e.target.value)} className="mr-2 p-2 border" />
          <button onClick={joinRoom} className="p-2 bg-blue-500 text-white">Join Room</button>
        </div>
      ) : (
        <div>
          <video ref={localVideoRef} autoPlay muted className="w-1/2"></video>
          <video ref={remoteVideoRef} autoPlay className="w-1/2"></video>
          <button onClick={createOffer} className="mt-2 p-2 bg-green-500 text-white">Start Call</button>
        </div>
      )}
    </div>
  );
}