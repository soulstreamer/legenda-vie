import LegalPage from '@/pages/LegalPage';

export default function LivrareSiRetur() {
  return (
    <LegalPage title="Livrare și Retur">
      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">1. Zona de livrare</h2>
      <p>
        Efectuăm livrări pe întreg teritoriul României, prin intermediul curierului rapid.
        În funcție de adresa de livrare, termenul de livrare este de 2-5 zile lucrătoare
        pentru comenziile plasate înainte de ora 14:00.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">2. Costurile de livrare</h2>
      <p>
        Taxa de livrare este calculată automat la finalizarea comenzii, în funcție de
        greutatea coletului și destinație. Pentru comenzi peste 300 lei, transportul este gratuit.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">3. Termenul de retur</h2>
      <p>
        Ai la dispoziție 14 zile calendaristice de la primirea coletului pentru a returna
        produsele fără a oferi un motiv, conform O.G. nr. 34/2014 privind drepturile consumatorilor.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">4. Condiții de retur</h2>
      <p>
        Produsele returnate trebuie să fie în aceeași stare în care au fost primite,
        nedeteriorate, nepurate și în ambalajul original. Costul returnării este în
        sarcina clientului, cu excepția cazurilor în care produsul prezintă defecte de fabricație.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">5. Rambursarea contravalorii</h2>
      <p>
        Rambursarea se face în maximum 14 zile de la data primirii coletului returnat,
        prin același mijloc de plată utilizat la comandă. În cazul produselor defecte,
        rambursarea include și costul transportului de retur.
      </p>

      <h2 className="font-grotesk font-medium text-white text-xl mt-10 mb-4">6. Contact pentru retururi</h2>
      <p>
        Pentru a iniția un retur, te rugăm să ne contactezi la adresa de email
        <a href="mailto:comenzi@xplicit.ro" className="text-plum hover:underline ml-1">comenzi@xplicit.ro</a>
        specificând numărul comenzii și motivul returnării.
      </p>
    </LegalPage>
  );
}
