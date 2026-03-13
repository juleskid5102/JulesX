// useFCM — Đăng ký FCM + lắng nghe foreground notification
import { useEffect } from 'react'
import { getToken, onMessage } from 'firebase/messaging'
import { getMessagingInstance } from '../config/firebase'
import { useAuth } from './useAuth'
import { emitNotification, playNotificationSound } from '../lib/notifications'

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || ''

export function useFCM() {
    const { user } = useAuth()

    useEffect(() => {
        if (!user || !VAPID_KEY) return

        let cancelled = false

        const setup = async () => {
            try {
                const messaging = await getMessagingInstance()
                if (!messaging || cancelled) return

                const permission = await Notification.requestPermission()
                if (permission !== 'granted' || cancelled) return

                // Đăng ký SW + lấy token
                await getToken(messaging, {
                    vapidKey: VAPID_KEY,
                    serviceWorkerRegistration: await navigator.serviceWorker.register('/firebase-messaging-sw.js'),
                })

                // Lắng nghe foreground notification
                onMessage(messaging, (payload) => {
                    const title = payload.notification?.title || 'Thông báo mới'
                    const body = payload.notification?.body || ''

                    playNotificationSound()
                    emitNotification(title, body)

                    if (Notification.permission === 'granted') {
                        new Notification(title, { body, icon: '/favicon.svg' })
                    }
                })
            } catch (err) {
                console.warn('[FCM] Không thể đăng ký:', err)
            }
        }

        setup()

        return () => {
            cancelled = true
        }
    }, [user])
}
