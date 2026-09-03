'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';

type Testimonial = { id: string; quote: string; author: string; location: string };
type ImageItem = { id: string; src: string; alt: string };
type VideoItem = { id: string; title: string; url: string };
type ContentStore = { testimonials: Testimonial[]; images: ImageItem[]; videos: VideoItem[] };

const storageKey = 'lpc-admin-content-v1';
const emptyContent: ContentStore = { testimonials: [], images: [], videos: [] };

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadContent(): ContentStore {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    return {
      testimonials: Array.isArray(saved?.testimonials) ? saved.testimonials : [],
      images: Array.isArray(saved?.images) ? saved.images : [],
      videos: Array.isArray(saved?.videos) ? saved.videos : [],
    };
  } catch {
    return emptyContent;
  }
}

export default function AdminPage() {
  const [content, setContent] = useState<ContentStore>(() => loadContent());
  const [notice, setNotice] = useState('');
  const [testimonial, setTestimonial] = useState({ quote: '', author: '', location: 'Yaoundé' });
  const [image, setImage] = useState({ src: '', alt: '' });
  const [video, setVideo] = useState({ title: '', url: '' });

  const saveContent = (next: ContentStore, message: string) => {
    setContent(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2600);
  };

  const addTestimonial = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!testimonial.quote.trim() || !testimonial.author.trim()) return;
    saveContent({ ...content, testimonials: [...content.testimonials, { id: createId(), quote: testimonial.quote.trim(), author: testimonial.author.trim(), location: testimonial.location.trim() }] }, 'Témoignage ajouté.');
    setTestimonial({ quote: '', author: '', location: 'Yaoundé' });
  };

  const addImage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image.src.trim() || !image.alt.trim()) return;
    saveContent({ ...content, images: [...content.images, { id: createId(), src: image.src.trim(), alt: image.alt.trim() }] }, 'Image ajoutée.');
    setImage({ src: '', alt: '' });
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage((current) => ({ ...current, src: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const addVideo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!video.title.trim() || !video.url.trim()) return;
    saveContent({ ...content, videos: [...content.videos, { id: createId(), title: video.title.trim(), url: video.url.trim() }] }, 'Vidéo ajoutée.');
    setVideo({ title: '', url: '' });
  };

  const removeItem = (type: keyof ContentStore, id: string) => {
    const next = { ...content, [type]: content[type].filter((item) => item.id !== id) } as ContentStore;
    saveContent(next, 'Élément supprimé.');
  };

  const exportContent = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'la-ptite-coursiere-contenu.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importContent = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(String(reader.result));
        const next: ContentStore = {
          testimonials: Array.isArray(imported.testimonials) ? imported.testimonials : [],
          images: Array.isArray(imported.images) ? imported.images : [],
          videos: Array.isArray(imported.videos) ? imported.videos : [],
        };
        saveContent(next, 'Contenu importé.');
      } catch {
        setNotice('Fichier JSON invalide.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div>
            <p className="kicker">ESPACE DE GESTION</p>
            <h1>Le contenu de<br /><em>La P&apos;Tite Coursière.</em></h1>
            <p className="admin-intro">Ajoutez des témoignages, des images et des vidéos sans modifier le code.</p>
          </div>
          <Link className="button button-gold" href="/">Voir le site <span aria-hidden="true">↗</span></Link>
        </header>

        <div className="admin-notice" role="status" aria-live="polite">{notice}</div>

        <section className="admin-tools" aria-label="Sauvegarde du contenu">
          <div><strong>Contenu local</strong><span>Les ajouts sont visibles sur ce navigateur.</span></div>
          <div className="admin-tool-actions"><button className="admin-button" type="button" onClick={exportContent}>Exporter JSON</button><label className="admin-button admin-file-button">Importer JSON<input type="file" accept="application/json" onChange={importContent} /></label></div>
        </section>

        <div className="admin-grid">
          <section className="admin-card">
            <div className="admin-card-heading"><span className="admin-index">01</span><div><p className="kicker">PAROLE CLIENT</p><h2>Ajouter un témoignage</h2></div></div>
            <form className="admin-form" onSubmit={addTestimonial}>
              <label>Appréciation<textarea value={testimonial.quote} onChange={(event) => setTestimonial({ ...testimonial, quote: event.target.value })} placeholder="Ce que votre client souhaite partager..." required /></label>
              <label>Nom ou prénom<input value={testimonial.author} onChange={(event) => setTestimonial({ ...testimonial, author: event.target.value })} placeholder="Ex. Sandrine" required /></label>
              <label>Quartier<input value={testimonial.location} onChange={(event) => setTestimonial({ ...testimonial, location: event.target.value })} placeholder="Yaoundé" /></label>
              <button className="admin-submit" type="submit">Publier le témoignage</button>
            </form>
            <div className="admin-list">{content.testimonials.map((item) => <div className="admin-list-item" key={item.id}><div><strong>« {item.quote} »</strong><span>{item.author} · {item.location}</span></div><button type="button" onClick={() => removeItem('testimonials', item.id)} aria-label={`Supprimer le témoignage de ${item.author}`}>Supprimer</button></div>)}</div>
          </section>

          <section className="admin-card">
            <div className="admin-card-heading"><span className="admin-index">02</span><div><p className="kicker">IMAGE</p><h2>Ajouter un visuel</h2></div></div>
            <form className="admin-form" onSubmit={addImage}>
              <label>Adresse de l&apos;image<input value={image.src.startsWith('data:') ? '' : image.src} onChange={(event) => setImage({ ...image, src: event.target.value })} placeholder="https://... ou /images/..." /></label>
              <label>Ou charger depuis l&apos;ordinateur<input type="file" accept="image/*" onChange={handleImageUpload} /></label>
              <label>Description de l&apos;image<input value={image.alt} onChange={(event) => setImage({ ...image, alt: event.target.value })} placeholder="Une intervention soignée" required /></label>
              {image.src && <Image className="admin-image-preview" src={image.src} alt="Aperçu du nouveau visuel" width={720} height={360} unoptimized />}
              <button className="admin-submit" type="submit">Ajouter à la galerie</button>
            </form>
            <div className="admin-list">{content.images.map((item) => <div className="admin-list-item" key={item.id}><div className="admin-media-row"><Image src={item.src} alt="" width={44} height={44} unoptimized /><span>{item.alt}</span></div><button type="button" onClick={() => removeItem('images', item.id)} aria-label={`Supprimer ${item.alt}`}>Supprimer</button></div>)}</div>
          </section>

          <section className="admin-card">
            <div className="admin-card-heading"><span className="admin-index">03</span><div><p className="kicker">EN IMAGES</p><h2>Ajouter une vidéo</h2></div></div>
            <form className="admin-form" onSubmit={addVideo}>
              <label>Titre de la vidéo<input value={video.title} onChange={(event) => setVideo({ ...video, title: event.target.value })} placeholder="Notre dernière intervention" required /></label>
              <label>Lien YouTube ou vidéo<input type="url" value={video.url} onChange={(event) => setVideo({ ...video, url: event.target.value })} placeholder="https://www.youtube.com/watch?v=..." required /></label>
              <button className="admin-submit" type="submit">Ajouter la vidéo</button>
            </form>
            <div className="admin-list">{content.videos.map((item) => <div className="admin-list-item" key={item.id}><div><strong>{item.title}</strong><span>{item.url}</span></div><button type="button" onClick={() => removeItem('videos', item.id)} aria-label={`Supprimer ${item.title}`}>Supprimer</button></div>)}</div>
          </section>
        </div>

        <p className="admin-footnote">Cette version stocke les contenus dans le navigateur. Pour une administration accessible à plusieurs appareils et protégée par mot de passe, une base de données et une authentification devront être connectées.</p>
      </div>
    </main>
  );
}
