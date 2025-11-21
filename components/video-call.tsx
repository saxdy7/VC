"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import dynamic from "next/dynamic"

interface VideoCallProps {
  roomId: string
  userName: string
}

export default function VideoCall({ roomId, userName }: VideoCallProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isJoining, setIsJoining] = useState(true)

  useEffect(() => {
    let zp: any = null

    const initMeeting = async () => {
      if (!containerRef.current) return
      if (typeof window === 'undefined') return

      try {
        const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt")
        const { generateKitToken, generateUserId } = await import("@/lib/zegocloud")
        
        const userId = generateUserId()
        const kitToken = generateKitToken(userId, roomId, userName)

        // Create instance object from Kit Token
        zp = ZegoUIKitPrebuilt.create(kitToken)

        // Start the call
        zp.joinRoom({
          container: containerRef.current,
          sharedLinks: [
            {
              name: "Copy Link",
              url: window.location.href,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          turnOnCameraWhenJoining: false,
          turnOnMicrophoneWhenJoining: false,
          showPreJoinView: false,
          showScreenSharingButton: true,
          showTextChat: true,
          showUserList: true,
          maxUsers: 50,
          layout: "Grid",
          showLayoutButton: true,
          onLeaveRoom: () => {
            router.push("/ended")
          },
        })

        setIsJoining(false)
      } catch (error) {
        console.error("Failed to join room:", error)
        setIsJoining(false)
      }
    }

    initMeeting()

    return () => {
      if (zp) {
        zp.destroy()
      }
    }
  }, [roomId, userName, router])

  return (
    <div className="w-full h-screen bg-background relative">
      {isJoining && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-50">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Joining meeting...</p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-full"
      />
    </div>
  )
}
