import LegalPage from '@/pages/LegalPage';

export default function Anpc() {
  return (
    <LegalPage title="ANPC — Autoritatea Națională pentru Protecția Consumatorilor">
      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">Informații utile</h2>
      <p>
        Autoritatea Națională pentru Protecția Consumatorilor (ANPC) este instituția
        responsabilă cu protejarea drepturilor consumatorilor în România.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">Date de contact ANPC</h2>
      <div className="text-white space-y-2">
        <p>Adresă: Bd. Aviatorilor nr. 72, Sector 1, București, Cod poștal 011865</p>
        <p>Telefon: <a href="tel:+40213123485" className="text-plum hover:underline">021.312.34.85</a></p>
        <p>Linia consumatorului: <a href="tel:+0800280" className="text-plum hover:underline">0.800.280.280</a> (număr gratuit)</p>
        <p>Website: <a href="https://www.anpc.gov.ro" target="_blank" rel="noopener noreferrer" className="text-plum hover:underline">www.anpc.gov.ro</a></p>
        <p>Email: <a href="mailto:office@anpc.ro" className="text-plum hover:underline">office@anpc.ro</a></p>
      </div>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">Soluționarea alternativă a litigiilor (SAL)</h2>
      <p>
        Conform O.G. nr. 38/2015 privind soluționarea alternativă a litigiilor
        dintre consumatori și comercianți, consumatorii pot apela la entități
        SAL pentru soluționarea extrajudiciară a litigiilor.
      </p>

      <p className="mt-6">
        Pentru soluționarea alternativă a litigiilor, poți accesa platforma
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-plum hover:underline ml-1">
          Soluționarea Litigiilor Online (ODR)
        </a>
        , administrată de Comisia Europeană.
      </p>
    </LegalPage>
  );
}
