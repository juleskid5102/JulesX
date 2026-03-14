// ImageUpload — Single + Multi image upload → Cloudinary
// Flow: PNG/JPG → convert WebP (client) → upload via backend → Cloudinary URL
import { useRef, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { API_BASE } from '../config/site'

// ─── Helper: Convert image file to WebP Blob ────────────────────

async function convertToWebP(file: File, maxWidth = 1200, quality = 0.8): Promise<Blob> {
    try {
        const bitmap = await createImageBitmap(file)
        const scale = Math.min(1, maxWidth / bitmap.width)
        const w = Math.round(bitmap.width * scale)
        const h = Math.round(bitmap.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w; canvas.height = h
        canvas.getContext('2d')!.drawImage(bitmap, 0, 0, w, h)
        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => blob ? resolve(blob) : reject(new Error('toBlob failed')),
                'image/webp',
                quality,
            )
        })
    } catch {
        // Safari fallback — FileReader + Image
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                const img = new Image()
                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    let w = img.width, h = img.height
                    if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth }
                    canvas.width = w; canvas.height = h
                    canvas.getContext('2d')!.drawImage(img, 0, 0, w, h)
                    canvas.toBlob(
                        (blob) => blob ? resolve(blob) : reject(new Error('toBlob failed')),
                        'image/webp',
                        quality,
                    )
                }
                img.onerror = reject
                img.src = e.target?.result as string
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }
}

// ─── Helper: Upload WebP blob to Cloudinary via backend ─────────

async function uploadToCloudinary(
    blob: Blob,
    token: string,
    folder = 'julesstudio',
): Promise<{ url: string; publicId: string }> {
    const formData = new FormData()
    formData.append('file', blob, `img-${Date.now()}.webp`)
    formData.append('folder', folder)

    const res = await fetch(`${API_BASE}/api/admin/upload-image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
    })

    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Upload failed' }))
        throw new Error((err as any).error || 'Upload failed')
    }

    const data: any = await res.json()
    return { url: data.url, publicId: data.publicId }
}

// ═══════════════════════════════════════════════════════════════
// Single Image Upload
// ═══════════════════════════════════════════════════════════════

interface ImageUploadProps {
    /** Cloudinary URL (or empty) */
    value: string
    onChange: (url: string) => void
    label?: string
    folder?: string
    maxWidth?: number
    quality?: number
}

export function ImageUpload({
    value,
    onChange,
    label = 'Hình ảnh',
    folder = 'julesstudio',
    maxWidth = 1200,
    quality = 0.8,
}: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [dragOver, setDragOver] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const { getIdToken } = useAuth()

    const processFile = async (file: File) => {
        if (!file.type.startsWith('image/')) { setError('Chỉ chấp nhận file ảnh'); return }
        if (file.size > 10 * 1024 * 1024) { setError('Ảnh tối đa 10MB'); return }

        setError('')
        setUploading(true)
        try {
            const webpBlob = await convertToWebP(file, maxWidth, quality)
            const token = await getIdToken()
            if (!token) throw new Error('Chưa đăng nhập')
            const result = await uploadToCloudinary(webpBlob, token, folder)
            onChange(result.url)
        } catch (err: any) {
            setError(err.message || 'Upload thất bại')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">{label}</label>
            <div
                onClick={() => !uploading && inputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) processFile(f) }}
                className={`border-2 border-dashed p-4 text-center cursor-pointer transition-all min-h-[120px] flex flex-col items-center justify-center gap-2 ${
                    uploading ? 'border-primary/40 bg-primary/5 pointer-events-none' :
                    dragOver ? 'border-primary bg-primary/5' : 'border-[#f1f1f4] bg-slate-50/50'
                }`}
            >
                {uploading ? (
                    <>
                        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        <p className="text-xs text-slate-500">Đang tải lên...</p>
                    </>
                ) : value ? (
                    <div className="relative">
                        <img src={value} alt="Preview" className="max-w-[200px] max-h-[140px] object-cover rounded" />
                        <button type="button" onClick={e => { e.stopPropagation(); onChange('') }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white border-none w-5 h-5 cursor-pointer text-xs flex items-center justify-center rounded-full hover:bg-red-600 transition-colors">✕</button>
                    </div>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" />
                        </svg>
                        <p className="text-xs text-slate-500">Click hoặc kéo thả ảnh <span className="text-slate-400">(PNG, JPG → WebP)</span></p>
                    </>
                )}
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            <input ref={inputRef} type="file" accept="image/*"
                onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); e.target.value = '' }}
                className="hidden" />
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════
// Multi Image Upload
// ═══════════════════════════════════════════════════════════════

interface MultiImageUploadProps {
    /** Array of Cloudinary URLs */
    images: string[]
    onChange: (urls: string[]) => void
    label?: string
    folder?: string
    maxWidth?: number
    quality?: number
}

export function MultiImageUpload({
    images,
    onChange,
    label = 'Hình ảnh',
    folder = 'julesstudio',
    maxWidth = 1200,
    quality = 0.8,
}: MultiImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const { getIdToken } = useAuth()

    const processFiles = async (files: FileList) => {
        setError('')
        setUploading(true)
        try {
            const token = await getIdToken()
            if (!token) throw new Error('Chưa đăng nhập')

            const newUrls: string[] = []
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                if (!file || !file.type.startsWith('image/')) continue
                if (file.size > 10 * 1024 * 1024) { setError(`"${file.name}" vượt 10MB, bỏ qua.`); continue }

                const webpBlob = await convertToWebP(file, maxWidth, quality)
                const result = await uploadToCloudinary(webpBlob, token, folder)
                newUrls.push(result.url)
            }

            if (newUrls.length > 0) onChange([...images, ...newUrls])
        } catch (err: any) {
            setError(err.message || 'Upload thất bại')
        } finally {
            setUploading(false)
        }
    }

    const removeImage = (idx: number) => {
        onChange(images.filter((_, i) => i !== idx))
    }

    return (
        <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">{label}</label>
            <div className="flex flex-wrap gap-2 mb-2">
                {images.map((img, i) => (
                    <div key={i} className="relative w-[100px] h-[80px]">
                        <img src={img} alt="" className="w-full h-full object-cover rounded" />
                        <button type="button" onClick={() => removeImage(i)}
                            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white border-none w-5 h-5 cursor-pointer text-[11px] flex items-center justify-center rounded-full hover:bg-red-600 transition-colors">✕</button>
                    </div>
                ))}
                <div
                    onClick={() => !uploading && inputRef.current?.click()}
                    className={`w-[100px] h-[80px] border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-1 transition-colors ${
                        uploading ? 'border-primary/40 bg-primary/5' : 'border-[#f1f1f4] bg-slate-50/50 hover:border-primary/30'
                    }`}
                >
                    {uploading ? (
                        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                            <span className="text-[10px] text-slate-400">Thêm ảnh</span>
                        </>
                    )}
                </div>
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            <input ref={inputRef} type="file" accept="image/*" multiple
                onChange={e => { if (e.target.files?.length) processFiles(e.target.files); e.target.value = '' }}
                className="hidden" />
        </div>
    )
}
