import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { useAuth } from '../../hooks/useAuth'

/**
 * AdminSettings — Profile, Business, Notifications, Security
 * NOW WIRED to GET/PATCH /api/admin/settings + Firebase Auth
 */
export default function AdminSettings() {
  const api = useApi()
  const { user } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // Profile
  const [fullName, setFullName] = useState(user?.displayName || '')
  const [email] = useState(user?.email || '')
  const [phone, setPhone] = useState('')

  // Business
  const [companyName, setCompanyName] = useState('Jules Studio')
  const [taxId, setTaxId] = useState('')
  const [address, setAddress] = useState('TP. Hồ Chí Minh, Việt Nam')

  // Notifications
  const [notifLeads, setNotifLeads] = useState(true)
  const [notifOrders, setNotifOrders] = useState(true)
  const [notifWeekly, setNotifWeekly] = useState(false)
  const [notifMarketing, setNotifMarketing] = useState(false)

  // Security
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data: any = await api.get('/api/admin/settings', true)
        if (data) {
          setFullName(data.fullName || data.name || user?.displayName || '')
          setPhone(data.phone || '')
          setCompanyName(data.companyName || 'Jules Studio')
          setTaxId(data.taxId || '')
          setAddress(data.address || 'TP. Hồ Chí Minh, Việt Nam')
          setNotifLeads(data.notifLeads !== false)
          setNotifOrders(data.notifOrders !== false)
          setNotifWeekly(data.notifWeekly === true)
          setNotifMarketing(data.notifMarketing === true)
        }
      } catch {
        // Use defaults
      }
    }
    loadSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      await api.patch('/api/admin/settings', {
        fullName, phone, companyName, taxId, address,
        notifLeads, notifOrders, notifWeekly, notifMarketing,
      }, true)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Lưu thất bại')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <h2 className="text-4xl font-heading font-bold text-slate-900 uppercase tracking-tighter">Settings</h2>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
      )}
      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          Đã lưu thành công!
        </div>
      )}

      {/* Profile Settings */}
      <section className="border border-[#f1f1f4] p-8 space-y-6">
        <h3 className="font-heading text-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">person</span>
          Profile Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsField label="Full Name" value={fullName} onChange={setFullName} />
          <SettingsField label="Email" value={email} disabled />
          <SettingsField label="Role" value="Administrator" disabled />
          <SettingsField label="Phone" value={phone} onChange={setPhone} />
        </div>
      </section>

      {/* Business Info */}
      <section className="border border-[#f1f1f4] p-8 space-y-6">
        <h3 className="font-heading text-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">business</span>
          Business Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsField label="Company Name" value={companyName} onChange={setCompanyName} />
          <SettingsField label="Tax ID" value={taxId} onChange={setTaxId} />
          <div className="md:col-span-2">
            <SettingsField label="Address" value={address} onChange={setAddress} />
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="border border-[#f1f1f4] p-8 space-y-6">
        <h3 className="font-heading text-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">notifications</span>
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <ToggleRow label="New lead notifications" description="Get notified when a new lead comes in" checked={notifLeads} onChange={setNotifLeads} />
          <ToggleRow label="Order updates" description="Receive updates on order status changes" checked={notifOrders} onChange={setNotifOrders} />
          <ToggleRow label="Weekly reports" description="Get weekly summary reports via email" checked={notifWeekly} onChange={setNotifWeekly} />
          <ToggleRow label="Marketing emails" description="Receive marketing and promotional content" checked={notifMarketing} onChange={setNotifMarketing} />
        </div>
      </section>

      {/* Security */}
      <section className="border border-[#f1f1f4] p-8 space-y-6">
        <h3 className="font-heading text-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
          Security
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsField label="Current Password" value={currentPassword} onChange={setCurrentPassword} type="password" placeholder="••••••••" />
          <div />
          <SettingsField label="New Password" value={newPassword} onChange={setNewPassword} type="password" placeholder="Enter new password" />
          <SettingsField label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} type="password" placeholder="Confirm new password" />
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <button className="px-8 py-3 border border-slate-200 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

function SettingsField({ label, value, type = 'text', disabled, placeholder, onChange }: {
  label: string; value: string; type?: string; disabled?: boolean; placeholder?: string; onChange?: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">{label}</label>
      <input
        className={`w-full border border-[#f1f1f4] px-4 py-3 text-sm bg-transparent focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all ${disabled ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : ''}`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  )
}

function ToggleRow({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#f1f1f4] last:border-0">
      <div>
        <p className="text-sm font-bold text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-primary/20 peer-checked:bg-primary rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
      </label>
    </div>
  )
}
