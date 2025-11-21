import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"

const appID = 811326932
const serverSecret = "cd12c2f0e1969aa9551e570ac273210d"

export function generateKitToken(userId: string, roomId: string, userName?: string) {
  return ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, userId, userName || userId)
}

export function generateUserId() {
  return Math.floor(Math.random() * 10000) + ""
}
