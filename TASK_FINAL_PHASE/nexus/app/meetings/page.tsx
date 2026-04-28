'use client';

import { useState, useEffect } from 'react';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState([]);
  const [title, setTitle] = useState('');
  const [participants, setParticipants] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/meetings', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setMeetings(data);
  };

  const scheduleMeeting = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/meetings/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, participants: participants.split(','), scheduledAt, duration })
    });
    if (res.ok) {
      fetchMeetings();
      setTitle(''); setParticipants(''); setScheduledAt(''); setDuration(60);
    } else {
      alert('Conflict or error');
    }
  };

  const respondToMeeting = async (id, status) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/meetings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    fetchMeetings();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Meeting Scheduler</h1>
      <div className="mb-4">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="mr-2 p-2 border" />
        <input placeholder="Participants (comma separated IDs)" value={participants} onChange={e => setParticipants(e.target.value)} className="mr-2 p-2 border" />
        <input type="datetime-local" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} className="mr-2 p-2 border" />
        <input type="number" placeholder="Duration (min)" value={duration} onChange={e => setDuration(e.target.value)} className="mr-2 p-2 border" />
        <button onClick={scheduleMeeting} className="p-2 bg-blue-500 text-white">Schedule</button>
      </div>
      <ul>
        {meetings.map(m => (
          <li key={m._id} className="mb-2 p-2 border">
            {m.title} - {new Date(m.scheduledAt).toLocaleString()} - Status: {m.status}
            {m.status === 'scheduled' && (
              <div>
                <button onClick={() => respondToMeeting(m._id, 'accepted')} className="mr-2 p-1 bg-green-500 text-white">Accept</button>
                <button onClick={() => respondToMeeting(m._id, 'rejected')} className="p-1 bg-red-500 text-white">Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}