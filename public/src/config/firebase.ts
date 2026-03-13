// Firebase config for Jules Studio
// Reads from VITE_ env vars
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getMessaging, isSupported, type Messaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

// Messaging — lazy init, only when browser supports
let _messaging: Messaging | null = null
let _messagingChecked = false

export async function getMessagingInstance(): Promise<Messaging | null> {
  if (_messagingChecked) return _messaging
  _messagingChecked = true
  try {
    const supported = await isSupported()
    _messaging = supported ? getMessaging(app) : null
  } catch {
    _messaging = null
  }
  return _messaging
}

// For backwards compat — direct access (may be null until init)
export { _messaging as messaging }
