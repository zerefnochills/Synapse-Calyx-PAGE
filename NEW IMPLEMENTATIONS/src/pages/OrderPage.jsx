// ================================================
// OrderPage — converted from synapse-calyx-order.html
// src/pages/OrderPage.jsx
// ================================================

import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './OrderPage.module.css'

const STEPS = [
  { n: '01', title: 'Identification' },
  { n: '02', title: 'Professional Data' },
  { n: '03', title: 'Project Scope' },
  { n: '04', title: 'Investment & Timeline' },
  { n: '05', title: 'Vision & References' },
  { n: '06', title: 'Documents & Priority' },
  { n: '07', title: 'Review & Submit' },
]

const BUDGET_RANGES = [
  '$500–1,000', '$1,000–2,000', '$2,000–3,500', '$3,000–5,000', '$5,000–8,000',
  '$8,000–12,000', '$12,000–18,000', '$18,000–25,000', '$25,000–35,000', '$35,000–50,000', '$50,000+',
]

function ChoiceBtn({ label, selected, onClick, multi }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.choiceBtn} ${selected ? styles.choiceBtnSelected : ''}`}
    >
      {label}
    </button>
  )
}

function Field({ label, required, helper, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>
        {label} {required && <span>*</span>}
      </label>
      {children}
      {helper && <span className={styles.fieldHelper}>{helper}</span>}
    </div>
  )
}

export default function OrderPage() {
  const [step, setStep] = useState(1)
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submissionCode] = useState(
    () => `SC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`
  )

  // Form state
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', location: '',
    contactMethod: 'Email',
    company: '', industry: '', roleType: '', existingWebsite: '', position: '',
    projectType: [], projectTitle: '', objectiveStatement: '', targetAudience: '',
    budget: 30, timeline: 'Standard (1–2 months)',
    startDate: '', deadline: '', deadlineFixed: 'Flexible — Preferred',
    aestheticMoods: [], referenceUrls: '', competitorSites: '',
    visionStatement: '', thingsToAvoid: '',
    priority: 'Priority', additionalNotes: '',
    files: [],
  })

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const toggleMulti = (key, val) => {
    setForm((f) => {
      const arr = f[key]
      return {
        ...f,
        [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
      }
    })
  }

  const toggleSingle = (key, val) => update(key, val)

  const budgetLabel = BUDGET_RANGES[Math.min(Math.floor(form.budget / 10), BUDGET_RANGES.length - 1)]

  const next = () => { if (step < 7) setStep(step + 1); window.scrollTo({ top: 0 }) }
  const prev = () => { if (step > 1) setStep(step - 1); window.scrollTo({ top: 0 }) }

  const submit = () => {
    if (!agreed) { alert('Please agree to the terms before submitting.'); return }
    setSubmitted(true)
    window.scrollTo({ top: 0 })
    // In production: POST to your API here
    // fetch('/api/v1/submissions', { method: 'POST', body: JSON.stringify(form) })
  }

  return (
    <div className={styles.pageLayout}>

      {/* ---- SIDEBAR ---- */}
      <aside className={styles.sidebar}>
        <div>
          <h1 className={styles.sidebarTitle}>Initiate<br />Protocol</h1>
          <p className={styles.sidebarSub}>
            Provide the parameters for your objective. Our panel will analyze the
            data and architect the optimal trajectory for your vision.
          </p>
        </div>

        <div className={styles.progressWrapper}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${((step - 1) / STEPS.length) * 100}%` }}
            />
          </div>

          <div className={styles.progressSteps}>
            {STEPS.map((s, i) => {
              const sn = i + 1
              const isActive = sn === step
              const isDone = sn < step
              return (
                <div
                  key={s.n}
                  onClick={() => isDone && setStep(sn)}
                  className={`${styles.stepItem} ${isActive ? styles.stepActive : ''} ${isDone ? styles.stepDone : styles.stepInactive}`}
                >
                  <div className={styles.stepDot}>
                    {isDone ? '✓' : s.n}
                  </div>
                  <div>
                    <div className={styles.stepLabel}>Step {s.n}</div>
                    <div className={styles.stepTitle}>{s.title}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.sidebarNote}>
          <div className={styles.sidebarNoteLabel}>// Response SLA</div>
          <div className={styles.sidebarNoteText}>
            Our panel reviews all submissions within 24 hours. Complex architectures
            may require a discovery call before proposal.
          </div>
        </div>
      </aside>

      {/* ---- FORM ---- */}
      <main className={styles.formArea}>

        {submitted ? (
          /* SUCCESS */
          <div className={styles.successPanel}>
            <div className={styles.successIcon}>⚡</div>
            <h2 className={styles.successTitle}>Brief Received.</h2>
            <p className={styles.successSub}>
              Your submission has been transmitted to the Synapse Calyx panel.
              Our architects are analyzing your parameters. Expect contact within 24 hours.
            </p>
            <div className={styles.successId}>PROJECT #{submissionCode}</div>
            <div className={styles.successActions}>
              <Link to="/" className={styles.btnNext}>Return Home</Link>
              <Link to="/works" className={styles.btnPrev} style={{ padding: '14px 24px', border: '1px solid var(--border)' }}>
                View Our Works
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* STEP 1 */}
            {step === 1 && (
              <div className={styles.stepPanel}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepEyebrow}>// 01 — Identification</div>
                  <h2 className={styles.stepTitleLarge}>Who are you?</h2>
                  <p className={styles.stepDesc}>Basic contact information so our team can route your submission correctly.</p>
                </div>
                <div className={styles.formRow}>
                  <Field label="Full Name" required>
                    <input className={styles.input} placeholder="John Doe" value={form.fullName} onChange={e => update('fullName', e.target.value)} />
                  </Field>
                  <Field label="Email Address" required>
                    <input className={styles.input} type="email" placeholder="you@company.com" value={form.email} onChange={e => update('email', e.target.value)} />
                  </Field>
                </div>
                <div className={styles.formRow}>
                  <Field label="Phone Number">
                    <input className={styles.input} placeholder="+1 (000) 000-0000" value={form.phone} onChange={e => update('phone', e.target.value)} />
                  </Field>
                  <Field label="Location">
                    <input className={styles.input} placeholder="City, Country" value={form.location} onChange={e => update('location', e.target.value)} />
                  </Field>
                </div>
                <Field label="Preferred Contact Method">
                  <div className={styles.choiceGroup}>
                    {['Email', 'WhatsApp', 'Telegram', 'Video Call'].map(v => (
                      <ChoiceBtn key={v} label={v} selected={form.contactMethod === v} onClick={() => toggleSingle('contactMethod', v)} />
                    ))}
                  </div>
                </Field>
                <FormNav step={step} total={7} onNext={next} />
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className={styles.stepPanel}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepEyebrow}>// 02 — Professional Data</div>
                  <h2 className={styles.stepTitleLarge}>About your entity.</h2>
                  <p className={styles.stepDesc}>Understanding your organization's context helps us calibrate the right solution.</p>
                </div>
                <div className={styles.formRow}>
                  <Field label="Company / Organization">
                    <input className={styles.input} placeholder="Acme Corp" value={form.company} onChange={e => update('company', e.target.value)} />
                  </Field>
                  <Field label="Your Position / Role">
                    <input className={styles.input} placeholder="CEO, Product Manager..." value={form.position} onChange={e => update('position', e.target.value)} />
                  </Field>
                </div>
                <Field label="Industry / Sector" required>
                  <div className={styles.choiceGroup}>
                    {['Tech / SaaS', 'Fashion / Retail', 'Finance', 'Healthcare', 'Creative / Agency', 'Entertainment', 'Education', 'Other'].map(v => (
                      <ChoiceBtn key={v} label={v} selected={form.industry === v} onClick={() => toggleSingle('industry', v)} />
                    ))}
                  </div>
                </Field>
                <Field label="Role Type">
                  <div className={styles.choiceGroup}>
                    {['Business Owner', 'Freelancer', 'Content Creator', 'Agency', 'Startup Founder', 'Enterprise'].map(v => (
                      <ChoiceBtn key={v} label={v} selected={form.roleType === v} onClick={() => toggleSingle('roleType', v)} />
                    ))}
                  </div>
                </Field>
                <Field label="Website (if existing)" helper="Share your current digital presence so we can assess where you are.">
                  <input className={styles.input} placeholder="https://yoursite.com" value={form.existingWebsite} onChange={e => update('existingWebsite', e.target.value)} />
                </Field>
                <FormNav step={step} total={7} onNext={next} onPrev={prev} />
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className={styles.stepPanel}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepEyebrow}>// 03 — Project Scope</div>
                  <h2 className={styles.stepTitleLarge}>Define the objective.</h2>
                  <p className={styles.stepDesc}>What needs to be built, designed, automated, or evolved?</p>
                </div>
                <Field label="Project Type" required>
                  <div className={styles.choiceGroup}>
                    {['Web Platform / App', 'Brand Identity', 'UI / UX Design', 'AI Automation', 'Motion / Video', 'Full Stack System', 'Graphic Design', 'Custom Package'].map(v => (
                      <ChoiceBtn key={v} label={v} selected={form.projectType.includes(v)} onClick={() => toggleMulti('projectType', v)} />
                    ))}
                  </div>
                </Field>
                <Field label="Project Title / Codename">
                  <input className={styles.input} placeholder="Project Vanta, Operation Nova..." value={form.projectTitle} onChange={e => update('projectTitle', e.target.value)} />
                </Field>
                <Field label="Objective Statement" required>
                  <textarea className={styles.textarea} rows={5} placeholder="Describe what you're trying to achieve. What problem exists today? What should exist after this project?" value={form.objectiveStatement} onChange={e => update('objectiveStatement', e.target.value)} />
                </Field>
                <Field label="Target Audience">
                  <input className={styles.input} placeholder="Who will use or see this? Demographics, psychographics..." value={form.targetAudience} onChange={e => update('targetAudience', e.target.value)} />
                </Field>
                <FormNav step={step} total={7} onNext={next} onPrev={prev} />
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className={styles.stepPanel}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepEyebrow}>// 04 — Investment & Timeline</div>
                  <h2 className={styles.stepTitleLarge}>Resources &amp; constraints.</h2>
                  <p className={styles.stepDesc}>Budget and timeline allow us to scope the right architecture.</p>
                </div>
                <Field label="Budget Range (USD)" required>
                  <div className={styles.rangeLabels}>
                    <span>$500</span><span>$5K</span><span>$15K</span><span>$30K</span><span>$50K+</span>
                  </div>
                  <input type="range" className={styles.range} min="0" max="100" value={form.budget} onChange={e => update('budget', Number(e.target.value))} />
                  <div className={styles.rangeValue}>
                    {budgetLabel} <span>estimated range</span>
                  </div>
                </Field>
                <div className={styles.formDivider} data-label="// Timeline" />
                <Field label="Desired Timeline" required>
                  <div className={styles.choiceGroup}>
                    {['ASAP (< 2 weeks)', 'Standard (1–2 months)', 'Extended (2–4 months)', 'Long-term (4+ months)', 'Flexible'].map(v => (
                      <ChoiceBtn key={v} label={v} selected={form.timeline === v} onClick={() => toggleSingle('timeline', v)} />
                    ))}
                  </div>
                </Field>
                <div className={styles.formRow}>
                  <Field label="Ideal Start Date">
                    <input type="date" className={styles.input} value={form.startDate} onChange={e => update('startDate', e.target.value)} />
                  </Field>
                  <Field label="Hard Deadline (if any)">
                    <input type="date" className={styles.input} value={form.deadline} onChange={e => update('deadline', e.target.value)} />
                  </Field>
                </div>
                <Field label="Is this deadline fixed or flexible?">
                  <div className={styles.choiceGroup}>
                    {['Fixed — Non-negotiable', 'Flexible — Preferred'].map(v => (
                      <ChoiceBtn key={v} label={v} selected={form.deadlineFixed === v} onClick={() => toggleSingle('deadlineFixed', v)} />
                    ))}
                  </div>
                </Field>
                <FormNav step={step} total={7} onNext={next} onPrev={prev} />
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className={styles.stepPanel}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepEyebrow}>// 05 — Vision & References</div>
                  <h2 className={styles.stepTitleLarge}>Calibrate the aesthetic.</h2>
                  <p className={styles.stepDesc}>Share references and aesthetic direction.</p>
                </div>
                <Field label="Aesthetic Direction / Mood" helper="Multi-select allowed">
                  <div className={styles.choiceGroup}>
                    {['Minimal / Clean', 'Dark / Moody', 'Bold / Loud', 'Luxury / Premium', 'Futuristic / AI-native', 'Editorial / Magazine', 'Playful / Energetic', 'Corporate / Authoritative'].map(v => (
                      <ChoiceBtn key={v} label={v} selected={form.aestheticMoods.includes(v)} onClick={() => toggleMulti('aestheticMoods', v)} />
                    ))}
                  </div>
                </Field>
                <Field label="Reference URLs" helper="Paste URLs of sites or designs you admire. Comma-separated.">
                  <input className={styles.input} placeholder="https://site1.com, https://behance.net/..." value={form.referenceUrls} onChange={e => update('referenceUrls', e.target.value)} />
                </Field>
                <Field label="Competitor / Comparison Sites">
                  <input className={styles.input} placeholder="Sites you want to differentiate from" value={form.competitorSites} onChange={e => update('competitorSites', e.target.value)} />
                </Field>
                <Field label="Vision Statement">
                  <textarea className={styles.textarea} rows={5} placeholder="Describe the experience you want people to have. How should it make them feel?" value={form.visionStatement} onChange={e => update('visionStatement', e.target.value)} />
                </Field>
                <Field label="What to Avoid">
                  <textarea className={styles.textarea} rows={3} placeholder="Clichés, competitors, specific aesthetics you don't want..." value={form.thingsToAvoid} onChange={e => update('thingsToAvoid', e.target.value)} />
                </Field>
                <FormNav step={step} total={7} onNext={next} onPrev={prev} />
              </div>
            )}

            {/* STEP 6 */}
            {step === 6 && (
              <div className={styles.stepPanel}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepEyebrow}>// 06 — Documents & Priority</div>
                  <h2 className={styles.stepTitleLarge}>Upload assets &amp; set urgency.</h2>
                </div>
                <Field label="Upload Documents / Assets">
                  <label className={styles.fileZone}>
                    <input type="file" multiple className={styles.fileInput}
                      onChange={e => update('files', [...form.files, ...Array.from(e.target.files).map(f => f.name)])} />
                    <div className={styles.fileIcon}>⬆</div>
                    <div className={styles.fileText}>
                      <strong>Drop files here</strong> or click to browse<br />
                      PDF, DOC, PNG, JPG, ZIP — Max 50MB
                    </div>
                    {form.files.length > 0 && (
                      <div className={styles.fileList}>
                        {form.files.map((f, i) => (
                          <span key={i} className={styles.fileChip}>{f}</span>
                        ))}
                      </div>
                    )}
                  </label>
                </Field>
                <div className={styles.formDivider} data-label="// Priority Classification" />
                <Field label="Engagement Priority">
                  <div className={styles.priorityGrid}>
                    {[
                      { icon: '🔵', title: 'Standard', desc: 'Normal queue. Standard SLA.' },
                      { icon: '🟣', title: 'Priority', desc: 'Expedited review. 48hr response.' },
                      { icon: '🔴', title: 'Critical', desc: 'Emergency. Rush pricing applies.' },
                    ].map(p => (
                      <div
                        key={p.title}
                        onClick={() => toggleSingle('priority', p.title)}
                        className={`${styles.priorityCard} ${form.priority === p.title ? styles.priorityCardSelected : ''}`}
                      >
                        <div className={styles.priorityIcon}>{p.icon}</div>
                        <div className={styles.priorityTitle}>{p.title}</div>
                        <div className={styles.priorityDesc}>{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </Field>
                <Field label="Additional Notes">
                  <textarea className={styles.textarea} rows={4} placeholder="Anything else our team should know..." value={form.additionalNotes} onChange={e => update('additionalNotes', e.target.value)} />
                </Field>
                <FormNav step={step} total={7} onNext={next} onPrev={prev} nextLabel="Review Submission →" />
              </div>
            )}

            {/* STEP 7 */}
            {step === 7 && (
              <div className={styles.stepPanel}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepEyebrow}>// 07 — Final Review</div>
                  <h2 className={styles.stepTitleLarge}>Confirm &amp; transmit.</h2>
                  <p className={styles.stepDesc}>Review your submission below. Once transmitted, our panel responds within 24 hours.</p>
                </div>

                <div className={styles.reviewBox}>
                  <div className={styles.reviewLabel}>// Submission Preview</div>
                  <div className={styles.reviewGrid}>
                    <div>
                      <div className={styles.reviewKey}>Contact</div>
                      <div className={styles.reviewVal}>{form.fullName || '—'}</div>
                      <div className={styles.reviewSub}>{form.email || '—'}</div>
                    </div>
                    <div>
                      <div className={styles.reviewKey}>Company</div>
                      <div className={styles.reviewVal}>{form.company || '—'}</div>
                      <div className={styles.reviewSub}>{form.position || '—'}</div>
                    </div>
                    <div>
                      <div className={styles.reviewKey}>Project Type</div>
                      <div className={styles.reviewVal}>{form.projectType.join(', ') || '—'}</div>
                    </div>
                    <div>
                      <div className={styles.reviewKey}>Budget</div>
                      <div className={styles.reviewVal}>{budgetLabel}</div>
                    </div>
                    <div>
                      <div className={styles.reviewKey}>Timeline</div>
                      <div className={styles.reviewVal}>{form.timeline}</div>
                    </div>
                    <div>
                      <div className={styles.reviewKey}>Priority</div>
                      <div className={styles.reviewVal}>{form.priority}</div>
                    </div>
                  </div>
                </div>

                <div className={styles.nextStepsBox}>
                  <div className={styles.reviewLabel}>// What happens next</div>
                  <div className={styles.nextStepsText}>
                    1. Our panel receives your brief immediately<br />
                    2. Architecture review completed within 24 hours<br />
                    3. You receive a detailed proposal + discovery call invite<br />
                    4. Proposal includes: scope, timeline, investment, team assignment
                  </div>
                </div>

                <div className={styles.agreeRow}>
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <label htmlFor="agree" className={styles.agreeLabel}>
                    I understand that submitting this brief does not constitute a contract or payment obligation.
                    It initiates a consultation process. I authorize Synapse Calyx to contact me.
                  </label>
                </div>

                <div className={styles.formNav}>
                  <button type="button" className={styles.btnPrev} onClick={prev}>← Back</button>
                  <button
                    type="button"
                    className={`${styles.btnNext} ${styles.btnSubmit}`}
                    onClick={submit}
                  >
                    Transmit Brief ⚡
                  </button>
                  <span className={styles.stepCounter}>07 / 07</span>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

function FormNav({ step, total, onNext, onPrev, nextLabel = 'Continue →' }) {
  return (
    <div className={styles.formNav}>
      {onPrev && (
        <button type="button" className={styles.btnPrev} onClick={onPrev}>← Back</button>
      )}
      <button type="button" className={styles.btnNext} onClick={onNext}>
        {nextLabel}
      </button>
      <span className={styles.stepCounter}>{String(step).padStart(2, '0')} / {total}</span>
    </div>
  )
}
