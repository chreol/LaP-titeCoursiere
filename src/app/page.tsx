"use client";

import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import siteContent from '@/data/site-content.json';

const whatsappNumber = '237671290827';
const whatsapp = (message: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
const whatsappIcon = '/images/whatsapp.webp';
const adminStorageKey = 'lpc-admin-content-v1';

type AdminContent = {
  testimonials: { id: string; quote: string; author: string; location: string; rating?: number }[];
  images: { id: string; src: string; alt: string }[];
  videos: { id: string; title: string; url: string }[];
};

const emptyAdminContent: AdminContent = siteContent;

function parseAdminContent(value: string): AdminContent {
  try {
    const saved = JSON.parse(value || 'null');
    return { testimonials: Array.isArray(saved?.testimonials) ? saved.testimonials : [], images: Array.isArray(saved?.images) ? saved.images : [], videos: Array.isArray(saved?.videos) ? saved.videos : [] };
  } catch {
    return emptyAdminContent;
  }
}

function subscribeToAdminContent(onChange: () => void) {
  window.addEventListener('storage', onChange);
  return () => window.removeEventListener('storage', onChange);
}

function WhatsAppIcon() {
  return <Image src={whatsappIcon} alt="" width={20} height={20} className="whatsapp-icon" aria-hidden="true" />;
}

function videoEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.hostname.includes('youtu.be')) return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}`;
    if (url.hostname.includes('youtube.com')) return `https://www.youtube-nocookie.com/embed/${url.searchParams.get('v') || url.pathname.split('/').pop()}`;
    return value;
  } catch {
    return value;
  }
}

const services = [
  ['01', 'Ménage & entretien', 'Une maison nette, accueillante et entretenue avec soin.', 'À partir de 3 500 FCFA'],
  ['02', 'Lessive & repassage', 'Votre linge lavé, plié et repassé selon vos besoins.', 'Sur devis'],
  ['03', 'Vaisselle', 'Studio ou appartement, nous vous libérons de cette corvée.', 'À partir de 1 500 FCFA'],
  ['04', 'Cuisine & repas', 'Des repas pratiques pour alléger vos journées.', 'À partir de 3 500 FCFA'],
  ['05', 'Courses & commissions', 'Les petites courses du quotidien, simplement.', 'À partir de 2 000 FCFA'],
  ['06', 'Assistance quotidienne', 'Une présence fiable pour les tâches qui comptent.', 'Nous consulter'],
  ['07', 'Coiffure enfant', 'Une coiffure simple et soignée à domicile.', '1 000 FCFA'],
  ['08', 'Transport & autres', 'Draps, couvertures, rideaux et déplacements.', 'À partir de 1 000 FCFA'],
];

const prices = [
  ['Ménage de chambre', '3 500 FCFA'], ['Vaisselle studio', '1 500 FCFA'],
  ['Vaisselle appartement', '2 000 FCFA'], ['Courses', '2 000 FCFA'],
  ['Couvertures', '5 000 FCFA'], ['Coiffure enfant', '1 000 FCFA'],
  ['Repas · 6 plats', '3 500 FCFA'], ['Transport aller-retour', '1 000 FCFA'],
];

const zones = ['Tam-Tam', 'Jouvence', 'Simbock', 'Mendong', 'Rond-Point Express', 'Acacia', 'Damas', 'Nsimeyong', 'Terre Rouge'];

const trustPoints = [
  ['Confiance', 'Un service sérieux et respectueux de votre quotidien.'],
  ['Discrétion', 'Votre maison et votre tranquillité sont respectées.'],
  ['Qualité', 'Un travail soigné, avec une attention portée aux détails.'],
  ['Temps retrouvé', 'Nous prenons le relais pour vous laisser souffler.'],
];

const testimonials = [
  ['« Une maison plus légère, une semaine plus douce. »', 'Exemple de retour à valider · Yaoundé'],
  ['« La disponibilité et le soin font toute la différence. »', 'Exemple de retour à valider · Mendong'],
  ['« On gagne du temps sans perdre la tranquillité. »', 'Exemple de retour à valider · Simbock'],
];

const galleryImages = [
  ['Cozy Home Help, Made Easy La p\'tite Coursiere.webp', "Une aide chaleureuse pour votre maison"],
  ['ChatGPT Image Jul 30, 2026, 09_53_49 PM.webp', 'Une équipe au service de votre quotidien'],
  ['ChatGPT Image Aug 5, 2026, 04_34_53 AM.webp', 'Des services pensés pour vous'],
  ['ChatGPT Image Aug 5, 2026, 04_00_01 AM.webp', 'Le soin dans chaque détail'],
  ['La p\'tite Coursiere.webp', 'La P\'Tite Coursière à Yaoundé'],
  ['Le Dimanche est sacre La P\'tite coursiere reste disponible.webp', 'Disponible même le dimanche'],
  ['La P\'tite Coursiere pour vous !!.webp', 'Une présence proche de vous'],
  ['La proprete notre metier La petite coursiere Yaounde.webp', 'La propreté, notre métier'],
  ['Merci et agreable semaine a tous !!.webp', 'Une semaine plus sereine'],
  ["La P'tite Coursiere (2).webp", 'Notre équipe, à votre service'],
];

const baseLightboxImages = [
  ["LOGO La P'tite Coursiere Fond Transparent.webp", "Logo de La P'Tite Coursière"],
  ['La P’tite Coursière Services Wheel.webp', "Les services de La P'Tite Coursière"],
  ['La P’tite Coursière  Matinée en douceur.webp', "Une matinée accompagnée par La P'Tite Coursière"],
  ['Le rangement dans une chambre de la petite coursiere.webp', "Chambre rangée par La P'Tite Coursière"],
  ...galleryImages,
];

export default function Home() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const adminSnapshot = useSyncExternalStore(subscribeToAdminContent, () => localStorage.getItem(adminStorageKey) || '', () => '');
  const adminContent = parseAdminContent(adminSnapshot);
  const touchStartX = useRef<number | null>(null);
  const customGalleryImages = adminContent.images.map(({ src, alt }) => [src, alt] as [string, string]);
  const allGalleryImages = [...galleryImages.map(([src, alt]) => [`/images/${src}`, alt] as [string, string]), ...customGalleryImages];
  const lightboxImages = [...baseLightboxImages.slice(0, 4).map(([src, alt]) => [`/images/${src}`, alt] as [string, string]), ...allGalleryImages];
  const allTestimonials = [...testimonials.map(([quote, source]) => [quote, source, 0] as [string, string, number]), ...adminContent.testimonials.map(({ quote, author, location, rating }) => [`« ${quote} »`, `${author} · ${location}`, rating || 0] as [string, string, number])];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setZoom(1);
  };
  const closeLightbox = () => setLightboxIndex(null);
  const moveLightbox = (direction: number) => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + direction + lightboxImages.length) % lightboxImages.length);
    setZoom(1);
  };
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0]?.clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) >= 48) moveLightbox(distance > 0 ? -1 : 1);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const direction = event.key === 'ArrowLeft' ? -1 : 1;
        setLightboxIndex((current) => current === null ? null : (current + direction + lightboxImages.length) % lightboxImages.length);
        setZoom(1);
      }
    };
    document.body.classList.add('lightbox-open');
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('lightbox-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, lightboxImages.length]);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#accueil" aria-label="La P'Tite Coursière, accueil">
          <Image src="/images/LOGO La P'tite Coursiere Fond Transparent.webp" alt="Logo La P'Tite Coursière" width={43} height={43} className="header-logo" priority />
          <span><strong>La P&apos;Tite Coursière</strong><small>Vous vivez. Nous nous occupons du reste.</small></span>
        </a>
        <button className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}><span aria-hidden="true">{menuOpen ? '×' : '☰'}</span><span className="sr-only">{menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span></button>
        <nav id="main-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Navigation principale">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#tarifs" onClick={() => setMenuOpen(false)}>Tarifs</a><a href="#zones" onClick={() => setMenuOpen(false)}>Zones</a><a href="#videos" onClick={() => setMenuOpen(false)}>Vidéos</a><a href="#temoignages" onClick={() => setMenuOpen(false)}>Témoignages</a>
        </nav>
        <a className="button button-small button-gold" href={whatsapp("Bonjour La P'Tite Coursière 👋🏾, je souhaite obtenir des informations sur vos services.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="accueil">
        <div className="hero-copy">
          <p className="kicker">YAOUNDÉ · UNE AIDE QUI ARRIVE AU BON MOMENT</p>
          <h1>Quand les tâches s&apos;accumulent,<br /><em>on vous aide à souffler.</em></h1>
          <div className="hero-story" aria-label="L&apos;histoire de La P&apos;Tite Coursière">
            <p><strong>Tout commence par une réalité :</strong> entre le travail, les enfants, le linge, les courses et les repas, les journées deviennent vite trop pleines.</p>
            <p><strong>Alors une idée est née à Yaoundé :</strong> créer une présence de proximité, fiable et humaine, capable de prendre le relais quand vous en avez besoin.</p>
            <p><strong>La P&apos;Tite Coursière est cette petite aide</strong> qui transforme une tâche en temps retrouvé, avec confiance, discrétion et soin.</p>
          </div>
          <div className="hero-actions">
            <a className="button button-gold" href={whatsapp("Bonjour La P'Tite Coursière 👋🏾, je souhaite obtenir des informations sur vos services.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Parler sur WhatsApp <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#services">Découvrir les services <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-meta"><span>Ouvert 7j/7</span><span>07h — 18h</span><span>Réponse rapide</span></div>
        </div>
        <div className="hero-art" aria-label="Espace réservé au visuel principal de La P'Tite Coursière">
          <button className="image-trigger hero-image-trigger" type="button" onClick={() => openLightbox(0)} aria-label="Agrandir le logo de La P'Tite Coursière"><Image className="hero-image hero-logo" src="/images/LOGO La P'tite Coursiere Fond Transparent.webp" alt="Logo La P'Tite Coursière" fill priority sizes="(max-width: 800px) 100vw, 50vw" /></button>
        </div>
      </section>

      <section className="emotional-section" aria-labelledby="emotional-title">
        <div className="emotional-inner">
          <div>
            <p className="kicker">VOUS N&apos;AVEZ PAS À TOUT PORTER</p>
            <h2 id="emotional-title">Un peu d&apos;aide peut<br /><em>changer toute une journée.</em></h2>
          </div>
          <div className="emotional-copy">
            <p>Quand le linge attend, que la vaisselle s&apos;accumule et que les courses repoussent le moment de souffler, ce n&apos;est pas un manque d&apos;organisation. C&apos;est simplement une journée déjà bien remplie.</p>
            <p><strong>La P&apos;Tite Coursière prend le relais avec respect</strong>, pour vous rendre du temps, du calme et l&apos;esprit plus léger.</p>
            <a className="button button-gold" href={whatsapp("Bonjour La P'Tite Coursière 👋🏾, ma journée est bien remplie et j'ai besoin d'un coup de main.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Retrouver du temps pour moi <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="emotional-steps" aria-label="Notre façon de vous aider"><div><span>01</span><strong>Vous nous écrivez</strong><p>Expliquez simplement ce dont vous avez besoin.</p></div><div><span>02</span><strong>Nous trouvons une solution</strong><p>Un échange clair, un service adapté à votre journée.</p></div><div><span>03</span><strong>Vous soufflez enfin</strong><p>Nous prenons le relais avec soin et discrétion.</p></div></div>
      </section>

      <section className="service-section" id="services">
        <div className="section-top"><div><p className="kicker">CE QUE NOUS FAISONS</p><h2>Tout ce qu&apos;il faut<br /><em>pour souffler.</em></h2></div><p className="section-lead">Une aide concrète, humaine et flexible pour les journées chargées et les maisons vivantes.</p></div>
        <div className="service-showcase"><div className="service-grid">{services.map(([number, title, description, price]) => <article className="service-item" key={title}><span className="service-number">{number}</span><h3>{title}</h3><p>{description}</p><strong>{price}</strong></article>)}</div><button className="image-trigger services-wheel-trigger" type="button" onClick={() => openLightbox(1)} aria-label="Agrandir la roue des services"><Image src="/images/La P’tite Coursière Services Wheel.webp" alt="Les services de La P'Tite Coursière" width={720} height={720} className="services-wheel" /></button></div>
      </section>

      <section className="price-section" id="tarifs">
        <div className="price-heading"><p className="kicker">DES PRIX SIMPLES</p><h2>Clairs dès<br /><em>le départ.</em></h2><p>Les tarifs peuvent varier selon le volume, le besoin ou la zone. Écrivez-nous pour un devis précis.</p><a className="button button-light" href={whatsapp("Bonjour 👋🏾, je souhaite avoir plus d'informations sur vos tarifs et vos services.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Demander un renseignement <span aria-hidden="true">↗</span></a></div>
        <div className="price-list">{prices.map(([name, price], index) => <div className="price-row" key={name}><span>0{index + 1}</span><p>{name}</p><strong>{price}</strong><a href={whatsapp(`Bonjour 👋🏾, je souhaite demander un devis pour le service suivant : ${name} (${price}).`)} target="_blank" rel="noreferrer" aria-label={`Demander un devis pour ${name}`}><WhatsAppIcon /> Demander un devis ↗</a></div>)}</div>
      </section>

      <section className="trust-section trust-photo-section">
        <div className="section-top"><div><p className="kicker">NOTRE PROMESSE</p><h2>Une présence<br /><em>qui rassure.</em></h2></div><p className="section-lead">Parce que laisser entrer quelqu&apos;un dans son quotidien demande plus qu&apos;une compétence : cela demande de la confiance.</p></div>
        <div className="trust-team"><Image src="/images/Chreol EMpire l’équipe.png" alt="L'équipe de Chreol Empire, à l'origine de La P'Tite Coursière" width={960} height={960} /><div><p className="kicker">DERRIÈRE LE SERVICE</p><h3>Une équipe qui s&apos;implique.</h3><p>La P&apos;Tite Coursière est portée par une équipe qui croit aux services de proximité, au respect et au travail bien fait. Nous veillons à ce que chaque demande soit accueillie avec attention, du premier message jusqu&apos;à la fin de l&apos;intervention.</p><strong>Un produit de CHREOL EMPIRE SARL.</strong></div></div>
        <div className="trust-grid">{trustPoints.map(([title, text], index) => <div className="trust-item" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      </section>

      <section className="zones-section" id="zones"><div className="zones-copy"><p className="kicker">LÀ OÙ NOUS SOMMES</p><h2>Yaoundé,<br /><em>avec vous.</em></h2><p>Vous êtes dans un quartier voisin ? Contactez-nous, nous vérifierons ensemble la disponibilité.</p><p className="zone-list-text"><strong>Quartiers desservis :</strong> {zones.join(' · ')}</p><a className="button button-gold" href={whatsapp("Bonjour La P'Tite Coursière 👋🏾, je suis dans un quartier voisin de Yaoundé et je souhaite connaître vos disponibilités.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Vérifier ma zone <span aria-hidden="true">↗</span></a></div><div className="zone-map"><iframe title="Localisation de La P'Tite Coursière à Yaoundé" src="https://www.google.com/maps?q=Yaound%C3%A9%2C%20Cameroun&output=embed" loading="lazy" /><div className="map-overlay-label">Yaoundé · Cameroun</div></div></section>

      <section className="video-section" id="videos"><div className="section-top"><div><p className="kicker">EN IMAGES</p><h2>Notre univers,<br /><em>en mouvement.</em></h2></div><p className="section-lead">Découvrez notre façon de prendre soin des maisons et des journées.</p></div><div className="video-grid"><iframe src="https://www.youtube-nocookie.com/embed/toDWlSwyXFM" title="Découvrez La P'Tite Coursière" loading="lazy" allowFullScreen /><iframe src="https://www.youtube-nocookie.com/embed/8cCSuJry_cg" title="Les services de La P'Tite Coursière" loading="lazy" allowFullScreen />{adminContent.videos.map((video) => <iframe key={video.id} src={videoEmbedUrl(video.url)} title={video.title} loading="lazy" allowFullScreen />)}</div></section>

      <section className="gallery-section" aria-labelledby="gallery-title"><div className="section-top"><div><p className="kicker">NOS RÉALISATIONS</p><h2 id="gallery-title">Des images<br /><em>qui parlent.</em></h2></div><p className="section-lead">Retrouvez trois visuels ici. Ouvrez une image puis balayez pour parcourir toute la galerie.</p></div><div className="gallery-grid">{allGalleryImages.slice(0, 3).map(([src, alt], index) => <figure key={`${src}-${index}`}><button className="image-trigger" type="button" onClick={() => openLightbox(index + 4)} aria-label={`Agrandir : ${alt}`}><Image src={src} alt={alt} width={700} height={700} loading="lazy" unoptimized={src.startsWith('data:')} /><span className="zoom-hint" aria-hidden="true">+</span></button><figcaption>{alt}</figcaption></figure>)}</div></section>

      <section className="final-cta"><p className="kicker">UN MESSAGE SUFFIT</p><h2>Et si vous vous<br /><em>libériez du reste ?</em></h2><p>Offrez-vous plus de temps pour vous et pour ceux qui comptent.</p><a className="button button-gold" href={whatsapp("Bonjour La P'Tite Coursière 👋🏾, j'ai besoin d'aide et je souhaite avoir plus d'informations sur vos services.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> J&apos;ai besoin d&apos;un coup de main <span aria-hidden="true">↗</span></a></section>

      <section className="testimonials-section" id="temoignages" aria-labelledby="testimonials-title"><div className="section-top"><div><p className="kicker">L&apos;EXPÉRIENCE AU QUOTIDIEN</p><h2 id="testimonials-title">Le confort<br /><em>se partage.</em></h2></div><p className="section-lead">Des mots simples sur ce que nos clientes recherchent : du temps, du soin et une présence fiable.</p></div><div className="testimonials-marquee"><div className="testimonials-track"><div className="testimonials-grid">{allTestimonials.map(([quote, source, rating]) => <figure className="testimonial" key={`${quote}-${source}`}><blockquote>{quote}</blockquote>{rating > 0 && <div className="testimonial-stars" aria-label={`${rating} étoiles sur 5`}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>}<figcaption>{source}</figcaption></figure>)}</div><div className="testimonials-grid" aria-hidden="true">{allTestimonials.map(([quote, source, rating]) => <figure className="testimonial" key={`duplicate-${quote}-${source}`}><blockquote>{quote}</blockquote>{rating > 0 && <div className="testimonial-stars">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>}<figcaption>{source}</figcaption></figure>)}</div></div></div><p className="testimonial-note">Avis présentés comme exemples éditoriaux, à remplacer par vos témoignages clients vérifiés.</p></section>

      <footer className="site-footer"><div className="wordmark"><Image src="/images/LOGO La P'tite Coursiere Fond Transparent.webp" alt="Logo La P'Tite Coursière" width={43} height={43} className="footer-logo" /><span><strong>La P&apos;Tite Coursière</strong><small>Un produit de CHREOL EMPIRE SARL</small></span></div><p><a className="footer-contact" href={whatsapp("Bonjour La P'Tite Coursière 👋🏾, je souhaite obtenir des informations sur vos services.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp · 671 290 827</a><br />Yaoundé, Cameroun</p><p>© {new Date().getFullYear()} La P&apos;Tite Coursière</p></footer>
      <a className="floating-whatsapp" href={whatsapp("Bonjour La P'Tite Coursière 👋🏾, j'ai besoin d'aide et je souhaite avoir plus d'informations sur vos services.")} target="_blank" rel="noreferrer" aria-label="Contacter La P'Tite Coursière sur WhatsApp"><WhatsAppIcon /><b>Besoin d&apos;aide ?</b></a>
      {lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Aperçu de l'image" onMouseDown={(event) => { if (event.target === event.currentTarget) closeLightbox(); }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}><button className="lightbox-close" type="button" onClick={closeLightbox} aria-label="Fermer l'aperçu">X</button><button className="lightbox-arrow lightbox-prev" type="button" onClick={() => moveLightbox(-1)} aria-label="Image précédente">‹</button><div className="lightbox-content"><Image src={lightboxImages[lightboxIndex][0]} alt={lightboxImages[lightboxIndex][1]} width={1400} height={1000} className="lightbox-image" style={{ transform: `scale(${zoom})` }} priority unoptimized={lightboxImages[lightboxIndex][0].startsWith('data:')} /><p>{lightboxImages[lightboxIndex][1]}</p></div><button className="lightbox-arrow lightbox-next" type="button" onClick={() => moveLightbox(1)} aria-label="Image suivante">›</button><div className="lightbox-controls"><button type="button" onClick={() => setZoom((current) => Math.max(.75, current - .25))} aria-label="Réduire le zoom">−</button><span>{Math.round(zoom * 100)}%</span><button type="button" onClick={() => setZoom((current) => Math.min(2.5, current + .25))} aria-label="Augmenter le zoom">+</button></div></div>}
    </main>
  );
}
