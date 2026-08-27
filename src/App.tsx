import { type ChangeEvent, type FormEvent, useMemo, useState } from 'react'
import './App.css'

type Service = {
  icon: string
  title: string
  description: string
  price: string
}

type BookingForm = {
  name: string
  phone: string
  service: string
  quartier: string
  date: string
  details: string
}

const services: Service[] = [
  {
    icon: '🧹',
    title: 'Entretien & ménage',
    description: 'Ménage de chambres, studios, appartements et maisons.',
    price: 'À partir de 3 500 FCFA',
  },
  {
    icon: '🧺',
    title: 'Lessive & repassage',
    description: 'Lavage et repassage selon le volume et le type de linge.',
    price: 'Sur devis',
  },
  {
    icon: '🍽️',
    title: 'Vaisselle',
    description: 'Vaisselle studio ou appartement selon le besoin.',
    price: 'À partir de 1 500 FCFA',
  },
  {
    icon: '🍲',
    title: 'Cuisine & repas',
    description: 'Préparation de repas pratiques pour soutenir votre quotidien.',
    price: 'Repas à partir de 3 500 FCFA',
  },
  {
    icon: '🛒',
    title: 'Courses & commissions',
    description: 'Achat du quotidien et missions de proximité.',
    price: 'À partir de 2 000 FCFA',
  },
  {
    icon: '💇',
    title: 'Coiffure des enfants',
    description: 'Coiffure simple et soignée dans un cadre agréable.',
    price: '1 000 FCFA',
  },
  {
    icon: '🛏️',
    title: 'Autres services',
    description: 'Couvertures, draps, rideaux et entretien sur demande.',
    price: 'À partir de 5 000 FCFA',
  },
  {
    icon: '🚐',
    title: 'Transport',
    description: 'Déplacement aller-retour pour les besoins du quotidien.',
    price: 'À partir de 1 000 FCFA',
  },
]

const pricing = [
  { label: 'Ménage', amount: '3 500 FCFA', subtitle: 'À partir d’une chambre' },
  { label: 'Vaisselle', amount: '1 500 FCFA', subtitle: 'Studio' },
  { label: 'Vaisselle', amount: '2 000 FCFA', subtitle: 'Appartement' },
  { label: 'Courses', amount: '2 000 FCFA', subtitle: 'Petites commissions' },
  { label: 'Repas', amount: '3 500 FCFA', subtitle: '6 plats' },
  { label: 'Coiffure', amount: '1 000 FCFA', subtitle: 'Enfant' },
]

const values = [
  { icon: '🤝', title: 'Confiance', text: 'Un service sérieux et humain, pensé pour votre tranquillité.' },
  { icon: '🔒', title: 'Discrétion', text: 'Respect de votre cadre de vie et de vos habitudes.' },
  { icon: '✨', title: 'Qualité', text: 'Des interventions soignées et un souci du détail.' },
  { icon: '⏱️', title: 'Gain de temps', text: 'Plus de temps pour votre famille et vos priorités.' },
]

const zones = [
  'Tam-Tam',
  'Jouvence',
  'Simbock',
  'Mendong',
  'Rond-Point Express',
  'Acacia',
  'Damas',
  'Nsimeyong',
  'Terre Rouge',
]

const initialForm: BookingForm = {
  name: '',
  phone: '',
  service: 'Ménage',
  quartier: '',
  date: '',
  details: '',
}

function App() {
  const [form, setForm] = useState<BookingForm>(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const whatsappText = useMemo(() => {
    return [
      'Bonjour La P\'Tite Coursière, je souhaite reserver un service.',
      `Nom: ${form.name || 'Non renseigné'}`,
      `Téléphone: ${form.phone || 'Non renseigné'}`,
      `Service: ${form.service}`,
      `Quartier: ${form.quartier || 'Non renseigné'}`,
      `Date souhaitée: ${form.date || 'À préciser'}`,
      `Détails: ${form.details || 'Aucun détail supplémentaire'}`,
    ].join('\n')
  }, [form])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setSubmitted(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = `https://wa.me/237671290827?text=${encodeURIComponent(whatsappText)}`
    window.open(target, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <a href="#top" className="brand" aria-label="La P'Tite Coursière">
            <span className="brand-mark">LPC</span>
            <span className="brand-copy">
              <strong>La P&apos;Tite Coursière</strong>
              <small>Service de proximité</small>
            </span>
          </a>

          <nav className="nav" aria-label="Navigation principale">
            <a href="#services">Services</a>
            <a href="#tarifs">Tarifs</a>
            <a href="#zones">Zones</a>
            <a href="#reservation">Réservation</a>
          </nav>

          <a
            className="btn btn-primary nav-cta"
            href="https://wa.me/237671290827?text=Bonjour%20La%20P'Tite%20Coursière%2C%20je%20souhaite%20obtenir%20plus%20d'informations."
            target="_blank"
            rel="noreferrer"
          >
            Réserver sur WhatsApp
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-layout">
            <div className="hero-copy">
              <span className="eyebrow">Yaoundé, Cameroun</span>
              <h1>Votre confort, notre priorité.</h1>
              <p>
                La P&apos;Tite Coursière vous aide à gagner du temps, à retrouver du calme et à mieux
                profiter de votre famille grâce à des services d&apos;assistance, de ménage et d&apos;aide à
                domicile, réalisés avec sérieux, discrétion et bienveillance.
              </p>

              <div className="hero-actions">
                <a
                  className="btn btn-primary"
                  href="https://wa.me/237671290827?text=Bonjour%20La%20P'Tite%20Coursière%2C%20je%20souhaite%20réserver%20un%20service."
                  target="_blank"
                  rel="noreferrer"
                >
                  Réserver sur WhatsApp
                </a>
                <a className="btn btn-secondary" href="#services">
                  Découvrir nos services
                </a>
              </div>

              <ul className="hero-points" aria-label="Points clés">
                <li>7 jours sur 7</li>
                <li>De 7h à 18h</li>
                <li>Service de proximité</li>
              </ul>
            </div>

            <div className="hero-visual" aria-label="Illustration de service domestique">
              <div className="image-card">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
                  alt="Femme africaine souriante dans un intérieur lumineux"
                />
              </div>
              <div className="floating-badge">
                <span>✔</span>
                <div>
                  <strong>Service fiable</strong>
                  <small>Confiance & sérénité</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow eyebrow-alt">Nos services</span>
              <h2>Des solutions pensées pour votre quotidien</h2>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="icon" aria-hidden="true">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="price">{service.price}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tarifs" className="pricing">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow eyebrow-alt">Tarifs</span>
              <h2>Des prix clairs et adaptés à vos besoins</h2>
            </div>

            <div className="pricing-grid">
              {pricing.map((item) => (
                <div className={`pricing-card ${item.label === 'Ménage' ? 'highlight' : ''}`} key={item.label + item.amount}>
                  <h3>{item.label}</h3>
                  <p className="amount">{item.amount}</p>
                  <small>{item.subtitle}</small>
                </div>
              ))}
            </div>

            <p className="pricing-note">
              Certains tarifs peuvent varier selon le besoin, la distance et la complexité de la
              demande. Contactez-nous pour un devis personnalisé.
            </p>
          </div>
        </section>

        <section className="benefits">
          <div className="container benefits-layout">
            <div className="benefits-copy">
              <span className="eyebrow eyebrow-alt">Pourquoi nous choisir ?</span>
              <h2>Une aide de confiance pour mieux vivre votre quotidien</h2>
              <p>
                Nous mettons l&apos;accent sur la qualité, la discrétion et le confort de nos clients.
                Vous n&apos;achetez pas seulement un service, vous gagnez du temps, de la sérénité et
                une présence rassurante à vos côtés.
              </p>
            </div>

            <div className="benefit-list">
              {values.map((item) => (
                <div className="benefit-item" key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="zones" className="zones">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow eyebrow-alt">Zones desservies</span>
              <h2>Intervention à Yaoundé et ses environs</h2>
            </div>

            <div className="zones-wrap">
              <ul className="zone-list">
                {zones.map((zone) => (
                  <li key={zone}>{zone}</li>
                ))}
              </ul>

              <div className="zone-message">
                <p>
                  Les clients situés dans les quartiers voisins peuvent également nous contacter afin
                  de vérifier la disponibilité du service.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="reservation" className="reservation">
          <div className="container reservation-layout">
            <div className="reservation-copy">
              <span className="eyebrow eyebrow-alt">Réservation</span>
              <h2>Renseignez votre besoin et envoyez votre demande sur WhatsApp</h2>
              <p>
                Nous prenons en charge les tâches du quotidien pour vous faire gagner du temps et de
                la sérénité. Décrivez votre besoin et nous vous répondrons rapidement.
              </p>
            </div>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="field-row two-cols">
                <label>
                  <span>Nom</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                  />
                </label>

                <label>
                  <span>Téléphone</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="671 290 827"
                    required
                  />
                </label>
              </div>

              <div className="field-row two-cols">
                <label>
                  <span>Service</span>
                  <select name="service" value={form.service} onChange={handleChange}>
                    {services.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Quartier</span>
                  <input
                    type="text"
                    name="quartier"
                    value={form.quartier}
                    onChange={handleChange}
                    placeholder="Ex: Mendong"
                  />
                </label>
              </div>

              <label>
                <span>Date souhaitée</span>
                <input type="date" name="date" value={form.date} onChange={handleChange} />
              </label>

              <label>
                <span>Détails</span>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  placeholder="Précisez le besoin, le nombre de pièces, le volume, etc."
                  rows={5}
                />
              </label>

              <button type="submit" className="btn btn-primary submit-btn">
                Envoyer via WhatsApp
              </button>

              {submitted && <p className="success-message">Votre demande est prête à être envoyée sur WhatsApp.</p>}
            </form>
          </div>
        </section>

        <section className="cta-panel">
          <div className="container cta-panel-inner">
            <div>
              <span className="eyebrow">Un appel, un message…</span>
              <h2>Et nous nous occupons du reste !</h2>
            </div>
            <a
              className="btn btn-primary"
              href="https://wa.me/237671290827?text=Bonjour%20La%20P'Tite%20Coursière%2C%20je%20souhaite%20prendre%20rendez-vous."
              target="_blank"
              rel="noreferrer"
            >
              Réserver maintenant
            </a>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div className="container footer-grid">
          <div>
            <a href="#top" className="brand footer-brand" aria-label="La P&apos;Tite Coursière">
              <span className="brand-mark">LPC</span>
              <span className="brand-copy">
                <strong>La P&apos;Tite Coursière</strong>
                <small>Votre confort, notre priorité</small>
              </span>
            </a>
          </div>

          <div>
            <h3>Contact</h3>
            <ul>
              <li>WhatsApp / Appel / SMS : 671 290 827</li>
              <li>Disponible 7 jours sur 7</li>
              <li>De 7h à 18h</li>
            </ul>
          </div>

          <div>
            <h3>Réseaux</h3>
            <ul>
              <li>Facebook : La P&apos;Tite Coursière</li>
              <li>Yaoundé, Cameroun</li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>Une initiative de CHREOL EMPIRE</p>
          <p>© {new Date().getFullYear()} La P&apos;Tite Coursière</p>
        </div>
      </footer>
    </div>
  )
}

export default App
