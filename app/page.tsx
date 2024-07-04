'use client' 
import MessageBoard from './_component/messageBoard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16" style={{ backgroundColor: '#E8E0C9' }}>
      <MessageBoard></MessageBoard>
    </main>
  );
}
