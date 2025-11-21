import VideoCall from "@/components/video-call"

interface RoomPageProps {
  params: Promise<{
    roomId: string
  }>
  searchParams: Promise<{
    name?: string
  }>
}

export default async function RoomPage({ params, searchParams }: RoomPageProps) {
  const { roomId } = await params
  const { name } = await searchParams

  return (
    <main className="w-full h-screen overflow-hidden bg-black">
      <VideoCall roomId={roomId} userName={name || "Guest"} />
    </main>
  )
}
