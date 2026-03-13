// FCMProvider — Wrapper component cho useFCM hook
// Đặt bên trong AuthProvider nhưng render-less
import { useFCM } from '../hooks/useFCM'

export function FCMProvider() {
    useFCM()
    return null
}
