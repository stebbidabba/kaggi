"use client";
import React from "react";
import { useI18n } from "../../i18n";

// Open Book content component
function OpenBookContent({ t, lang }) {
  if (lang === 'en') {
    return (
      <div className="prose prose-slate max-w-4xl mx-auto">
        <div className="text-slate-700 leading-7 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Policy and responsibility</h2>
            <p>Kaggi ehf. wants to contribute to ensuring that our operations and the operations of our partners are conducted with respect for human rights and good working conditions. We strive to work with responsible suppliers and to ensure transparency in our operations.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Laws and regulations we build on</h2>
            <p>Icelandic privacy laws (e.g. Personal Data Protection Act No. 90/2018) guarantee individual rights regarding the processing of personal information.</p>
            <p>Iceland is a party to numerous international human rights agreements, e.g. the European Convention on Human Rights which has legal force in Iceland.</p>
            <p>Whistleblower protection laws have also been adopted, which ensure that those who report suspicions of abuse or violations receive protection.</p>
            <p>Equal pay and equality laws apply when companies have a certain number of employees.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Risk and responsibility assessment</h2>
            <p>Kaggi regularly conducts risk assessments to examine whether operations or partners may cause or contribute to violations of human rights or fair working conditions.</p>
            <p>If risks are found, appropriate preventive measures shall be implemented.</p>
            <p>We pay special attention to supply chains, suppliers' working conditions, payment and working hours, and whether anything is being abused.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Standards and commitments</h2>
            <p>To uphold our human rights policy, we do the following:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Requirement that suppliers and partners comply with Icelandic labor legislation and our code of conduct.</li>
              <li>Clear contractual provisions that include human rights clauses in projects with risk.</li>
              <li>Internal education and training for staff on human rights, equality and ethics.</li>
              <li>Control and monitoring of supply chains with the aim of preventing violations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Priority projects</h2>
            <p>As part of ongoing work, Kaggi will focus on the following:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Improve purchasing processes and supplier follow-up.</li>
              <li>Have clearer requirements regarding human rights in procurement and contracts.</li>
              <li>Better examine conditions in the supply chain that affect warehouse, manufacturing or distribution partners.</li>
              <li>Increase transparency and accountability in our operations as well as among partners.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Declaration</h2>
            <p>This document describes how Kaggi works on human rights and fair working conditions in accordance with Icelandic law and international standards. We commit to continuous review and progress.</p>
          </section>
        </div>
      </div>
    );
  }

  // Icelandic content (default)
  return (
    <div className="prose prose-slate max-w-4xl mx-auto">
      <div className="text-slate-700 leading-7 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Stefna og ábyrgð</h2>
          <p>Kaggi ehf. vill stuðla að því að starfsemi okkar og rekstur samstarfsaðila okkar fari fram með virðingu fyrir mannréttindum og góðum vinnuskilyrðum. Við leggjum okkur fram við að vinna með ábyrgum birgjum og að tryggja gagnsæi í rekstri okkar.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Lög og reglur sem við byggjum á</h2>
          <p>Íslensk lög um persónuvernd (t.d. Persónuverndarlög nr. 90/2018) tryggja réttindi einstaklinga varðandi meðferð persónuupplýsinga.</p>
          <p>Ísland er aðili að fjölmörgum alþjóðasamningum um mannréttindi, t.d. Mannréttindasáttmála Evrópu sem hefur lagagildi á Íslandi.</p>
          <p>Lög um vernd uppljóstrara (whistleblower laws) hafa einnig verið samþykkt, sem tryggja að þeir sem gefa upp grun um misnotkun eða brot fá vernd.</p>
          <p>Lög um jafna laun og jafnrétti gilt þegar fyrirtæki hafa ákveðinn fjölda starfsmanna.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Áhættu- og ábyrgðarmat</h2>
          <p>Kaggi vinnur reglulega áhættumat til að kanna hvort starfsemin eða samstarfsaðilar geti valdið eða stuðlað að brotum á mannréttindum eða sanngjörnum vinnuaðstæðum.</p>
          <p>Ef áhætta finnst skal vinna að viðeigandi fyrirbyggjandi aðgerðum.</p>
          <p>Sérstaklega horfum við á birgðakeðjur, vinnuaðstæður birgja, greiðslu- og vinnutíma, og hvort eitthvað sé misnotað.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Viðmið og skuldbindingar</h2>
          <p>Til að standa við stefnu okkar um mannréttindi gerum við eftirfarandi:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Krafan um að birgjar og samstarfsaðilar fylgi íslenskum vinnulöggjöf og okkar siðareglum.</li>
            <li>Skýrar samningsákvæðingar sem fela í sér mannréttindaskilmála í verkefnum með áhættu.</li>
            <li>Innri fræðsla og þjálfun fyrir starfsfólk um mannréttindi, jafnrétti og siðferði.</li>
            <li>Aðhald og eftirlit með birgðakeðjum með það að markmiði að koma í veg fyrir brot.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Áhersluverkefni</h2>
          <p>Sem liður í áframhaldandi vinnu mun Kaggi leggja áherslu á eftirfarandi:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Bæta innkaupaferla og eftirfylgni birgja.</li>
            <li>Hafa skýrari kröfur varðandi mannréttindi við innkaup og samninga.</li>
            <li>Kanna betur aðstæður í birgðakeðju sem snerta vöruhúsa-, framleiðslu- eða dreifingaraðila.</li>
            <li>Auka gagnsæi og ábyrgð í starfsemi okkar sem og hjá samstarfsaðilum.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Yfirlýsing</h2>
          <p>Þetta skjal lýsir hvernig Kaggi vinnur að mannréttindum og sanngjörnum vinnuskilyrðum samkvæmt íslenskum lögum og alþjóðlegum viðmiðum. Við skuldbindum okkur til stöðugrar endurskoðunar og framförum.</p>
        </section>
      </div>
    </div>
  );
}

export default function OpenBook(){
  const { t, lang } = useI18n();
  
  const getPageTitle = () => {
    return lang === 'en' ? (
      <>
        Information about Kaggi and operations regarding human rights<br />
        and fair working conditions
      </>
    ) : (
      <>
        Upplýsingar um Kaggi og starfsemi varðandi<br />
        mannréttindi og sanngjarnar vinnuaðstæður
      </>
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-left">{getPageTitle()}</h1>
      <OpenBookContent t={t} lang={lang} />
    </div>
  );
}