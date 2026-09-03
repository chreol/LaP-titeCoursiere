import Link from "next/link";

const services = [
  { icon: "🧹", title: "Entretien & ménage", description: "Ménage de chambres, studios, appartements et maisons avec un service discret et soigné.", price: "À partir de 3 500 FCFA" },
  { icon: "👕", title: "Lessive & repassage", description: "Lavage du linge selon le volume et le type de vêtements, avec repassage si besoin.", price: "Sur devis" },
  { icon: "🍽️", title: "Vaisselle", description: "Vaisselle studio ou appartement pour remettre votre cuisine en ordre rapidement.", price: "À partir de 1 500 FCFA" },
  { icon: "🍲", title: "Cuisine & repas", description: "Préparation de repas simples et nourrissants pour alléger votre quotidien.", price: "À partir de 3 500 FCFA" },
  { icon: "🛒", title: "Courses & commissions", description: "Aide pour les achats du quotidien, courses locales et petites commissions pratiques.", price: "À partir de 2 000 FCFA" },
  { icon: "💇", title: "Coiffure enfants", description: "Coiffure simple et soignée pour que les enfants restent bien présentables.", price: "1 000 FCFA" },
  { icon: "🚐", title: "Transport", description: "Déplacement aller-retour pour un besoin ponctuel et pratique au quotidien.", price: "À partir de 1 000 FCFA" },
  { icon: "🛏️", title: "Autres services", description: "Couvertures, rideaux, draps et autres tâches selon vos besoins sur demande.", price: "À partir de 5 000 FCFA" },
];

const values = [
  { icon: "🤝", title: "Confiance", text: "Des interventions respectueuses, sérieuses et pensées pour votre tranquillité." },
  { icon: "🔒", title: "Discrétion", text: "Un accompagnement discret qui respecte l’intimité de votre domicile et de votre famille." },
  { icon: "✨", title: "Qualité", text: "Un service propre, soigneux et pensé pour vous faire gagner du temps au quotidien." },
  { icon: "⏱️", title: "Gain de temps", text: "Vous pouvez reprendre le contrôle de votre emploi du temps et profiter de vos proches." },
];

const zones = [
  "Tam-Tam",
  "Jouvence",
  "Simbock",
  "Mendong",
  "Rond-Point Express",
  "Acacia",
  "Damas",
  "Nsimeyong",
  "Terre Rouge",
];

const faqs = [
  {
    q: "Comment réserver un service ?",
    a: "Il suffit de nous contacter via WhatsApp ou SMS au 671 290 827 pour expliquer votre besoin. Nous vous répondrons rapidement et vous donnons le devis adapté.",
  },
  {
    q: "Quels sont les quartiers couverts à Yaoundé ?",
    a: "La P’tite Coursière intervient principalement dans les quartiers de Yaoundé comme Tam-Tam, Jouvence, Simbock, Mendong, Rond-Point Express, Acacia, Damas, Nsimeyong et Terre Rouge.",
  },
  {
    q: "Avez-vous des horaires flexibles ?",
    a: "Oui. Nous sommes disponibles 7 jours sur 7, de 7h à 18h, pour vous accompagner dans votre quotidien.",
  },
  {
    q: "Les tarifs sont-ils fixes ?",
    a: "Les tarifs indiqués sont des prix de départ. Le coût exact peut varier selon le besoin, le volume, le quartier et la durée de l’intervention.",
  },
];

const whatsappLink = "https://wa.me/237671290827?text=Bonjour%20La%20P%27tite%20Coursière%2C%20je%20souhaite%20réserver%20un%20service.";
const phoneLink = "tel:+237671290827";

export const metadata = {
  title: "La P’tite Coursière | Services d’aide ménagère à Yaoundé",
  description:
    "La P’tite Coursière propose des services d’aide ménagère, ménage, lessive, vaisselle, cuisine, courses et assistance à domicile à Yaoundé, Cameroun.",
};

export default function LaPtiteCoursierePage() {
  return (
    <main className="min-h-screen bg-[#120B18] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-300">
          <Link href="/services" className="transition hover:text-white">
              Accueil
          </Link>
          <span>›</span>
          <span className="text-white">La P’tite Coursière</span>
        </nav>

        <section className="overflow-hidden rounded-[32px] border border-[#C4A55D]/30 bg-[radial-gradient(circle_at_top_left,_rgba(196,165,93,0.2),_transparent_35%),linear-gradient(135deg,_#1B1023,_#120B18_55%)] shadow-[0_0_40px_rgba(196,165,93,0.08)]">
          <div className="grid items-center gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-12">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C4A55D]/40 bg-[#C4A55D]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F1D78A]">
                Une initiative de CHREOL EMPIRE
              </div>

              <h1 className="max-w-xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                La P’tite Coursière
              </h1>

              <p className="mt-4 max-w-xl text-lg text-zinc-300">
                Vous vivez. Nous nous occupons du reste.
              </p>

              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300">
                Des services de proximité pour alléger votre quotidien à Yaoundé : ménage, lessive, vaisselle, repas, courses et assistance à domicile, avec un service attentionné et discret.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-black text-[#07150D] shadow-lg shadow-[#25D366]/20 transition hover:scale-[1.01]"
                >
                  Réserver sur WhatsApp
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Voir nos services
                </a>
                  <a
                    href={phoneLink}
                    className="inline-flex items-center justify-center rounded-2xl border border-[#C4A55D]/40 px-6 py-3 text-sm font-bold text-[#F1D78A] transition hover:bg-[#C4A55D]/10"
                  >
                    Appeler le 671 290 827
                  </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">7 jours sur 7</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Yaoundé</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">7h – 18h</span>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-md rounded-[28px] border border-[#C4A55D]/30 bg-[#1A1320]/90 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-[#C4A55D]/20 blur-2xl" />
                <div className="absolute -right-5 bottom-10 h-24 w-24 rounded-full bg-[#7B3F98]/30 blur-2xl" />

                <div className="relative rounded-[24px] border border-white/10 bg-[#0E0A13] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#F5D98A,_#C4A55D)] text-xl font-black text-[#1E1727]">
                        LP
                      </div>
                      <div>
                        <p className="text-lg font-black">La P’tite Coursière</p>
                        <p className="text-xs text-zinc-400">Service de proximité</p>
                      </div>
                    </div>
                    <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-300">
                      Disponible
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-zinc-300">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Ménage</span>
                        <span className="text-[#F1D78A]">3 500 FCFA</span>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Repas</span>
                        <span className="text-[#F1D78A]">3 500 FCFA</span>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Courses</span>
                        <span className="text-[#F1D78A]">2 000 FCFA</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-[#C4A55D]/10 p-3 text-center text-sm text-[#F7E7B2]">
                    Confiance • Discrétion • Qualité
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-3xl">🧹</div>
            <h2 className="mt-4 text-xl font-black">Ménage</h2>
            <p className="mt-2 text-sm text-zinc-300">Un intérieur propre, respirant et bien entretenu.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-3xl">⚡</div>
            <h2 className="mt-4 text-xl font-black">Rapidité</h2>
            <p className="mt-2 text-sm text-zinc-300">Réponse rapide et service pensé pour votre confort.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-3xl">💬</div>
            <h2 className="mt-4 text-xl font-black">WhatsApp</h2>
            <p className="mt-2 text-sm text-zinc-300">Réservation simple en quelques échanges seulement.</p>
          </div>
        </section>

        <section id="services" className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F1D78A]">Nos services</p>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">Une aide au quotidien, pensée pour vous</h2>
            </div>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="hidden text-sm font-bold text-[#F1D78A] hover:text-[#F7E7B2] sm:inline-flex">
              Réserver maintenant
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <article key={service.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-[#C4A55D]/40 hover:bg-white/7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C4A55D]/15 text-2xl">{service.icon}</div>
                <h3 className="text-xl font-black">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{service.description}</p>
                <div className="mt-4 inline-flex rounded-full border border-[#C4A55D]/30 bg-[#C4A55D]/10 px-3 py-1.5 text-xs font-bold text-[#F1D78A]">
                  {service.price}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F1D78A]">Tarifs</p>
            <h2 className="mt-3 text-3xl font-black">Des prix clairs et accessibles</h2>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#120B18] px-4 py-3">
                <span>Ménage chambre</span>
                <span className="font-black text-[#F1D78A]">3 500 FCFA</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#120B18] px-4 py-3">
                <span>Vaisselle studio</span>
                <span className="font-black text-[#F1D78A]">1 500 FCFA</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#120B18] px-4 py-3">
                <span>Vaisselle appartement</span>
                <span className="font-black text-[#F1D78A]">2 000 FCFA</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#120B18] px-4 py-3">
                <span>Repas</span>
                <span className="font-black text-[#F1D78A]">3 500 FCFA</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#120B18] px-4 py-3">
                <span>Courses</span>
                <span className="font-black text-[#F1D78A]">2 000 FCFA</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#120B18] px-4 py-3">
                <span>Coiffure enfant</span>
                <span className="font-black text-[#F1D78A]">1 000 FCFA</span>
              </div>
            </div>
            <p className="mt-5 text-sm text-zinc-300">
              Certains tarifs peuvent varier selon le besoin et la distance. Contactez-nous pour un devis personnalisé.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#C4A55D]/30 bg-[linear-gradient(135deg,_rgba(196,165,93,0.12),_rgba(39,17,41,0.9))] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F1D78A]">Pourquoi nous choisir ?</p>
            <h2 className="mt-3 text-3xl font-black">Une marque pensée pour votre sérénité</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="rounded-2xl border border-white/10 bg-[#120B18]/60 p-4">
                  <div className="text-2xl">{value.icon}</div>
                  <h3 className="mt-3 text-lg font-black">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F1D78A]">Zones desservies</p>
          <h2 className="mt-3 text-3xl font-black">Nous intervenons dans les quartiers clés de Yaoundé</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {zones.map((zone) => (
              <span key={zone} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                {zone}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F1D78A]">Questions fréquentes</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-white/10 bg-[#120B18]/70 p-4">
                <h3 className="text-base font-black">{item.q}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-300">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[30px] border border-[#C4A55D]/30 bg-[linear-gradient(135deg,_rgba(196,165,93,0.2),_rgba(56,20,63,0.95))] p-6 text-center sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F1D78A]">Vous vivez. Nous nous occupons du reste.</p>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">Un appel, un message… et nous nous occupons du reste.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-200">
            Vous gagnez du temps, vous gardez votre sérénité et vous profitez davantage de votre famille et de vos moments personnels.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-[#25D366] px-7 py-3.5 text-sm font-black text-[#07150D] transition hover:scale-[1.01]"
            >
              Réserver sur WhatsApp
            </a>
            <a
              href="tel:+237671290827"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Appeler maintenant
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
