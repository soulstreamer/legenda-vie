import { Link } from 'react-router';
import LegalPage from '@/pages/LegalPage';

export default function Confidentialitate() {
  return (
    <LegalPage title="Confidențialitate">
      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">1. Ce date colectăm</h2>
      <p>
        Colectăm datele personale pe care ni le furnizați în mod voluntar atunci când plasați o comandă,
        vă abonați la newsletter sau ne contactați prin formularul de contact. Acestea pot include:
        numele, adresa de email, adresa de livrare, numărul de telefon.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">2. Cum folosim datele</h2>
      <p>
        Folosim datele dumneavoastră pentru a procesa comenzi, a vă livra produsele comandate,
        a vă răspunde la întrebări și a vă trimite oferte personalizate (cu acordul dumneavoastră).
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">3. Stocarea datelor</h2>
      <p>
        Datele dumneavoastră sunt stocate pe servere sigure, localizate în Uniunea Europeană.
        Păstrăm datele atât timp cât este necesar pentru îndeplinirea scopurilor pentru care au fost colectate.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">4. Drepturile dumneavoastră</h2>
      <p>
        Conform GDPR, aveți dreptul de a accesa, rectifica, șterge sau restricționa prelucrarea datelor
        dumneavoastră personale. Pentru a exercita aceste drepturi, ne puteți contacta la adresa de email
        <a href="mailto:comenzi@xplicit.ro" className="text-plum hover:underline ml-1">comenzi@xplicit.ro</a>.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">5. Cookie-uri</h2>
      <p>
        Site-ul nostru utilizează cookie-uri pentru a îmbunătăți experiența de navigare.
        Pentru mai multe detalii, consultați <Link to="/politica-cookies" className="text-plum hover:underline">Politica de Cookie-uri</Link>.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">6. Contact</h2>
      <p>
        Pentru orice întrebare legată de confidențialitate, ne puteți contacta la:
      </p>
      <p className="text-white">
        XPLICIT APPAREL S.R.L<br />
        Email: <a href="mailto:comenzi@xplicit.ro" className="text-plum hover:underline">comenzi@xplicit.ro</a><br />
        Telefon: <a href="tel:+0751306600" className="text-plum hover:underline">0751 306 600</a>
      </p>
    </LegalPage>
  );
}
