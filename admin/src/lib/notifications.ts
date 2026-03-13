// notifications.ts — Event bus cho in-app push notification
// Phát âm thanh + emit event cho component hiển thị toast

type Handler = (title: string, body: string) => void
const handlers: Handler[] = []

/** Đăng ký listener — trả về hàm unsubscribe */
export function onNotification(handler: Handler): () => void {
    handlers.push(handler)
    return () => {
        const idx = handlers.indexOf(handler)
        if (idx >= 0) handlers.splice(idx, 1)
    }
}

/** Phát notification event tới tất cả listener */
export function emitNotification(title: string, body: string) {
    handlers.forEach(h => h(title, body))
}

/** Phát tiếng "ting" bằng Web Audio API (không cần file mp3) */
export function playNotificationSound() {
    try {
        const ctx = new AudioContext()
        const now = ctx.currentTime

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(880, now)
        gain.gain.setValueAtTime(0.3, now)
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
        osc.connect(gain).connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.3)
    } catch {
        // AudioContext không hỗ trợ — bỏ qua
    }
}
