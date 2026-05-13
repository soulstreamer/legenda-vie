import { Link } from 'react-router';
import LegalPage from '@/pages/LegalPage';

export default function SolutionareaLitigiilor() {
  return (
    <LegalPage title="Soluționarea Litigiilor">
      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">1. Soluționarea Alternativă a Litigiilor (SAL)</h2>
      <p>
        În conformitate cu prevederile O.G. nr. 38/2015 privind soluționarea
        alternativă a litigiilor dintre consumatori și comercianți, XPLICIT APPAREL
        S.R.L își manifestă disponibilitatea de a soluționa pe cale amiabilă orice
        litigiu apărut în relația cu consumatorii.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">2. Procedura de reclamație</h2>
      <p>
        Pentru orice reclamație legată de produsele achiziționate, te rugăm să ne
        contactezi inițial la adresa de email
        <a href="mailto:comenzi@xplicit.ro" className="text-plum hover:underline ml-1">comenzi@xplicit.ro</a>.
        Vom răspunde în maximum 15 zile calendaristice de la primirea reclamației.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">3. Soluționarea online a litigiilor (ODR)</h2>
      <p>
        Conform Regulamentului (UE) nr. 524/2013 al Parlamentului European și al
        Consiliului, consumatorii au posibilitatea de a soluționa litigiile
        rezultate din contractele online prin intermediul platformei ODR
        (Online Dispute Resolution), administrată de Comisia Europeană.
      </p>
      <p className="mt-4">
        Platforma ODR este disponibilă la următoarea adresă:
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-plum hover:underline ml-1">
          ec.europa.eu/consumers/odr
        </a>
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">4. Autoritatea competentă</h2>
      <p>
        În cazul în care nu se ajunge la o soluționare amiabilă, litigiile vor fi
        soluționate de instanțele judecătorești competente din România.
        Consumatorii pot apela, de asemenea, la
        <Link to="/anpc" className="text-plum hover:underline ml-1">ANPC</Link>
        pentru asistență și informații suplimentare.
      </p>
    </LegalPage>
  );
}
