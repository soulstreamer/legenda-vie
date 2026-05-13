import { Link } from 'react-router';
import LegalPage from '@/pages/LegalPage';

export default function PoliticaCookies() {
  return (
    <LegalPage title="Politica de Cookie-uri">
      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">1. Ce sunt cookie-urile</h2>
      <p>
        Cookie-urile sunt fișiere text de mici dimensiuni pe care un site web le
        stochează pe dispozitivul tău (computer, tabletă, telefon) atunci când
        îl vizitezi. Acestea permit site-ului să-ți rețină preferințele și să
        îți ofere o experiență de navigare personalizată.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">2. Tipuri de cookie-uri folosite</h2>
      <p className="mb-4">
        Folosim următoarele categorii de cookie-uri:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong className="text-white">Cookie-uri esențiale</strong> — necesare pentru funcționarea corectă a site-ului (de exemplu, menținerea coșului de cumpărături).</li>
        <li><strong className="text-white">Cookie-uri de performanță</strong> — ne ajută să înțelegem cum interacționează vizitatorii cu site-ul (pagini vizitate, timp petrecut, erori întâmpinate).</li>
        <li><strong className="text-white">Cookie-uri funcționale</strong> — rețin preferințele tale (limbă, regiune) pentru a oferi o experiență personalizată.</li>
      </ul>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">3. Cum poți controla cookie-urile</h2>
      <p>
        Poți seta browserul să blocheze sau să șteargă cookie-urile în orice moment.
        Majoritatea browserelor oferă opțiuni de gestionare a cookie-urilor în
        secțiunea de setări. Reține că blocarea cookie-urilor esențiale poate
        afecta funcționalitatea site-ului.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">4. Cookie-uri terțe</h2>
      <p>
        Unele pagini pot conține conținut încorporat de la terțe părți (de exemplu,
        hărți Google, videoclipuri YouTube). Aceste servicii pot seta propriile
        cookie-uri, asupra cărora nu avem control. Pentru mai multe informații,
        consultă politicile de confidențialitate ale acestor furnizori.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">5. Actualizări</h2>
      <p>
        Această politică poate fi actualizată periodic. Orice modificare va fi
        publicată pe această pagină. Pentru întrebări legate de cookie-uri,
        contactați-ne la <a href="mailto:comenzi@xplicit.ro" className="text-plum hover:underline">comenzi@xplicit.ro</a>.
      </p>

      <p className="mt-8">
        Pentru mai multe informații despre cum gestionăm datele tale personale,
        consultă <Link to="/confidentialitate" className="text-plum hover:underline">Politica de Confidențialitate</Link>.
      </p>
    </LegalPage>
  );
}
