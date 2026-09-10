import { useState } from 'react'
import './App.css'

const initialProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  bio: 'Product designer who loves turning complex problems into simple, useful experiences.',
}

function App() {
  const [profile, setProfile] = useState(initialProfile)
  const [notifications, setNotifications] = useState(true)
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  const updateProfile = (event) => {
    const { name, value } = event.target
    setProfile((currentProfile) => ({ ...currentProfile, [name]: value }))
    setSaved(false)
  }

  const validate = () => {
    const nextErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!profile.name.trim()) {
      nextErrors.name = 'Please enter your name.'
    } else if (profile.name.trim().length < 2) {
      nextErrors.name = 'Your name must be at least 2 characters.'
    }
    if (!emailPattern.test(profile.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (profile.bio.length > 240) {
      nextErrors.bio = 'Your bio must be 240 characters or fewer.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validate()) setSaved(true)
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">N</span> Northstar</div>
        <nav aria-label="Settings navigation">
          <a className="nav-item" href="#overview"><span>⌂</span> Overview</a>
          <a className="nav-item active" href="#profile"><span>♙</span> Settings</a>
        </nav>
        <div className="sidebar-footer"><div className="avatar small">AM</div><div><strong>Alex Morgan</strong><small>Free plan</small></div><span>⋯</span></div>
      </aside>

      <section className="content" id="profile">
        <header className="page-header"><div><p className="eyebrow">ACCOUNT</p><h1>Settings</h1><p className="subtitle">Manage your profile and notification preferences.</p></div><div className="avatar">AM</div></header>

        <form className="settings-card" onSubmit={handleSubmit} noValidate>
          <div className="card-heading"><div><h2>Profile information</h2><p>Update your personal details and how others see you.</p></div><div className="avatar large">AM</div></div>
          <div className="form-grid">
            <div className="field"><label htmlFor="name">Full name</label><input id="name" name="name" value={profile.name} onChange={updateProfile} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <span className="error" id="name-error">{errors.name}</span>}</div>
            <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" value={profile.email} onChange={updateProfile} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <span className="error" id="email-error">{errors.email}</span>}</div>
          </div>
          <div className="field"><label htmlFor="bio">Bio <span className="optional">(optional)</span></label><textarea id="bio" name="bio" rows="4" maxLength="240" value={profile.bio} onChange={updateProfile} aria-invalid={Boolean(errors.bio)} aria-describedby="bio-hint" /><div className="field-hint" id="bio-hint"><span>{errors.bio || 'A brief description for your profile.'}</span><span>{profile.bio.length}/240</span></div></div>
          <div className="divider" />
          <div className="card-heading compact"><div><h2>Email notifications</h2><p>Receive updates and reminders in your inbox.</p></div><button type="button" className={`toggle ${notifications ? 'on' : ''}`} role="switch" aria-checked={notifications} onClick={() => setNotifications(!notifications)}><span /></button></div>
          <div className="form-actions">{saved && <span className="success" role="status">✓ Changes saved</span>}<button type="submit" className="save-button">Save changes</button></div>
        </form>
      </section>
    </main>
  )
}

export default App
