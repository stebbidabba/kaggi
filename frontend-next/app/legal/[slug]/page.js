"use client";
import React from "react";
import { useI18n } from "../../../i18n";

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

// Cookies content component
function CookiesContent({ t, lang }) {
  return (
    <div className="prose prose-slate max-w-4xl mx-auto">
      <div className="text-slate-700 leading-7 space-y-6">
        {/* Introduction */}
        <p className="text-lg leading-relaxed">
          {t("cookies.content.intro")}
        </p>
        
        {/* What are cookies */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            {t("cookies.content.whatAre.title")}
          </h2>
          <p>
            {t("cookies.content.whatAre.text")}
          </p>
        </section>
        
        {/* How to manage */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            {t("cookies.content.howToManage.title")}
          </h2>
          <p className="mb-4">
            {t("cookies.content.howToManage.text")}
          </p>
          <p>
            {t("cookies.content.howToManage.link")}
          </p>
          <p className="font-medium">
            {t("cookies.content.howToManage.linkText")}
          </p>
        </section>
        
        {/* Types of cookies */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            {t("cookies.content.types.title")}
          </h2>
          
          {/* Necessary cookies */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-slate-800 mb-3">
              {t("cookies.content.types.necessary.title")}
            </h3>
            <p>
              {t("cookies.content.types.necessary.text")}
            </p>
          </div>
          
          {/* Analytics cookies */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-slate-800 mb-3">
              {t("cookies.content.types.analytics.title")}
            </h3>
            <p>
              {t("cookies.content.types.analytics.text")}
            </p>
          </div>
          
          {/* Marketing cookies */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-slate-800 mb-3">
              {t("cookies.content.types.marketing.title")}
            </h3>
            <p>
              {t("cookies.content.types.marketing.text")}
            </p>
          </div>
        </section>
        
        {/* Consent */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            {t("cookies.content.consent.title")}
          </h2>
          <p>
            {t("cookies.content.consent.text")}
          </p>
        </section>
      </div>
    </div>
  );
}

// Privacy content component
function PrivacyContent({ t, lang }) {
  if (lang === 'en') {
    return (
      <div className="prose prose-slate max-w-4xl mx-auto">
        <div className="text-slate-700 leading-7 space-y-6">
          <section>
            <p>Kaggi ehf., through the company's managing director, is the data controller for the processing and storage of personal information. This privacy statement contains the information you are entitled to when Kaggi collects information from our website (cf. Article 19 of Personal Data Protection Act No. 90/2018) and general information about how we work with personal information (cf. Article 18 of Personal Data Protection Act).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">What is personal information?</h2>
            <p>Personal information is all information that can be traced to you as an individual. Examples are name, address, phone number, email and social security number.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Collection of personal information on kaggi.is</h2>
            
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">What information do we collect?</h3>
              <p>It is optional to provide Kaggi with personal information, but in order for you to use our services, it is necessary that certain information is provided. For example, if you want to use Kaggi to sell a car, you need to give consent for us to collect and process information about you, your car and possibly other rightholders.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Lookups in public records</h3>
              <p>Kaggi retrieves information about cars through public records at the Road Administration when you provide the registration number. This way we can provide you with the right valuation and find information such as type, color and engine type.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Use of kaggi.is</h3>
              <p>To improve the service, we collect information about how you use kaggi.is, e.g. what device you use, what actions you perform and where you are located.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Customer service</h3>
              <p>When you contact Kaggi customer service (phone, email or chat), communications are recorded to better serve you.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Purpose of processing personal information</h2>
            <p>We use personal information primarily to provide the service you expect from us.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>We need your phone number, for example, to contact you about the car.</li>
              <li>We use information to speed up processes, such as automatic login and automatic form filling.</li>
              <li>We analyze data to ensure that content and advertisements are appropriate.</li>
              <li>Advertisers can see non-personally identifiable data (age, gender, region), but never personal information that identifies you.</li>
              <li>Kaggi's goal is to create a safe and trusted market for cars and prevent misuse or illegal activity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Sharing of information</h2>
            <p>Kaggi only shares personal information with partners when necessary to provide the service (e.g. service providers who handle car inspections).</p>
            <p>We may also need to share information with public authorities, e.g. due to payment orders or legal obligations.</p>
            
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Third parties that Kaggi may use:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Amazon Web Services (data storage)</li>
                <li>Google Analytics 4 (analytics)</li>
                <li>Microsoft Advertising</li>
                <li>Slack (internal communication)</li>
                <li>Mailchimp (email service)</li>
                <li>Asana (project management)</li>
                <li>Signicat (documents and electronic signature)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Rights of registered individuals</h2>
            <p>Everyone who has information registered with Kaggi has the right to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>get access to own data,</li>
              <li>request correction or deletion of incorrect or unsatisfactory information,</li>
              <li>request that processing be limited.</li>
            </ul>
            <p>Requests will be answered free of charge within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Cookies</h2>
            <p>We at Kaggi use cookies to improve your experience on kaggi.is.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>They help us remember who you are so you can stay logged in.</li>
              <li>They collect information such as which page you view, how long you are in and which browser you use.</li>
              <li>We use, among other things, Google Analytics and Microsoft Advertising to analyze usage and improve the service. No personally identifiable information about you is provided to these parties.</li>
            </ul>
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
          <p>Kaggi ehf., í gegnum framkvæmdastjóra félagsins, er ábyrgðaraðili fyrir meðferð og geymslu persónuupplýsinga. Þessi persónuverndaryfirlýsing inniheldur þær upplýsingar sem þú átt rétt á þegar Kaggi safnar upplýsingum af vefsíðu okkar (sbr. 19. gr. Persónuverndarlaga nr. 90/2018) og almennar upplýsingar um hvernig við vinnum með persónuupplýsingar (sbr. 18. gr. Persónuverndarlaga).</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Hvað eru persónuupplýsingar?</h2>
          <p>Persónuupplýsingar eru allar upplýsingar sem má rekja til þín sem einstaklings. Dæmi eru nafn, heimilisfang, símanúmer, netfang og kennitala.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Söfnun persónuupplýsinga á kaggi.is</h2>
          
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Hvaða upplýsingar söfnum við?</h3>
            <p>Það er valfrjálst að veita Kaggi persónuupplýsingar, en til þess að þú getir nýtt þér þjónustu okkar er nauðsynlegt að ákveðnar upplýsingar séu veittar. Til dæmis, ef þú vilt nota Kaggi til að selja bíl, þarftu að veita samþykki fyrir því að við söfnum og vinnum með upplýsingar um þig, bílinn þinn og hugsanlega aðra rétthafa.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Uppflettingar í opinberum skrám</h3>
            <p>Kaggi sækir upplýsingar um bíla í gegnum opinberar skrár hjá Vegagerðinni þegar þú gefur upp skráningarnúmer. Þannig getum við veitt þér rétt verðmat og fundið upplýsingar eins og tegund, lit og vélargerð.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Notkun á kaggi.is</h3>
            <p>Til að bæta þjónustuna söfnum við upplýsingum um hvernig þú notar kaggi.is, t.d. hvaða tæki þú notar, hvaða aðgerðir þú framkvæmir og hvar þú ert staðsettur.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Þjónustuver</h3>
            <p>Þegar þú hefur samband við þjónustuver Kaggi (síma, tölvupóst eða spjall) eru samskiptin skráð til að geta þjónustað þig betur.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Tilgangur með vinnslu persónuupplýsinga</h2>
          <p>Við notum persónuupplýsingar fyrst og fremst til að veita þá þjónustu sem þú býst við af okkur.</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Við þurfum t.d. símanúmer þitt til að hafa samband vegna bílsins.</li>
            <li>Við notum upplýsingar til að flýta fyrir ferlum, eins og sjálfvirka innskráningu og sjálfvirka útfyllingu eyðublaða.</li>
            <li>Við greinum gögn til að tryggja að innihald og auglýsingar séu sem viðeigandi.</li>
            <li>Auglýsendur geta séð ópersónugreinanleg gögn (aldur, kyn, svæði), en aldrei persónuupplýsingar sem auðkenna þig.</li>
            <li>Markmið Kaggi er að skapa öruggan og traustan markað fyrir bíla og koma í veg fyrir misnotkun eða ólögmæta starfsemi.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Deiling upplýsinga</h2>
          <p>Kaggi deilir aðeins persónuupplýsingum með samstarfsaðilum þegar það er nauðsynlegt til að veita þjónustuna (t.d. þjónustuaðilum sem sjá um skoðun bíla).</p>
          <p>Við gætum einnig þurft að deila upplýsingum með opinberum aðilum, t.d. vegna greiðslufyrirmæla eða lagalegra skyldna.</p>
          
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Þriðju aðilar sem Kaggi getur notað:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Amazon Web Services (gagnageymsla)</li>
              <li>Google Analytics 4 (greiningar)</li>
              <li>Microsoft Advertising</li>
              <li>Slack (innri samskipti)</li>
              <li>Mailchimp (tölvupóstþjónusta)</li>
              <li>Asana (verkefnastjórnun)</li>
              <li>Signicat (skjöl og rafræn undirritun)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Réttindi skráðra einstaklinga</h2>
          <p>Allir sem eiga upplýsingar skráðar hjá Kaggi eiga rétt á:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>að fá aðgang að eigin gögnum,</li>
            <li>að óska eftir leiðréttingu eða eyðingu rangra eða ófullnægjandi upplýsinga,</li>
            <li>að óska eftir því að vinnsla verði takmörkuð.</li>
          </ul>
          <p>Beiðnum verður svarað án endurgjalds innan 30 daga.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Vafrakökur (Cookies)</h2>
          <p>Við á Kaggi notum vafrakökur til að bæta upplifun þína á kaggi.is.</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Þær hjálpa okkur að muna hver þú ert svo þú getir verið áfram skráður inn.</li>
            <li>Þær safna upplýsingum eins og hvaða síðu þú skoðar, hversu lengi þú ert inni og hvaða vafra þú notar.</li>
            <li>Við notum m.a. Google Analytics og Microsoft Advertising til að greina notkun og bæta þjónustuna. Engar persónugreinanlegar upplýsingar um þig eru afhentar þessum aðilum.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
function TermsContent({ t, lang }) {
  if (lang === 'en') {
    return (
      <div className="prose prose-slate max-w-4xl mx-auto">
        <div className="text-slate-700 leading-7 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Definition of the service</h2>
            <p>Kaggi is a service for individuals or companies (hereinafter referred to as "car sellers") who want to sell their car quickly, easily and without risk through an auction on the car. All cars that are sold are inspected by an independent third party and sold at auction to professional car dealers. The car seller can choose to reject the highest bid after the auction and can then withdraw from the process at no cost.</p>
            
            <p>For car sellers, the service is free of charge. This means that the car seller never pays anything directly to Kaggi for the inspection or administration, even if the sale falls through. The exception is additional services that the seller orders specifically from Kaggi. The car dealer who buys the car pays a commission to Kaggi. The commission covers the cost of inspection, photography, advertising, administration, warranty after sale and bid collection. The commission ranges from ISK 50,000–200,000, depending on the value of the car.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Car dealers</h2>
            <p>Kaggi's service is not intended for car dealers who want to sell their own cars. Kaggi reserves the right to refuse car dealers to sell through the system. If a car dealer registers a car to a private individual or related party and then puts it up for sale through Kaggi, this is considered circumventing the provision.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Car seller's responsibility before selling through Kaggi</h2>
            
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Information obligation</h3>
              <p>The car seller has the obligation to provide correct information about the condition of the car. When registering, all defects or damages that affect the condition must be registered. If the seller fails to inform Kaggi about this, it can lead to liability for damages towards Kaggi and also towards the car dealer who buys the car. All information must be in writing.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Legal owner</h3>
              <p>The car seller needs to confirm that he/she is the registered owner of the car. If not, he/she must obtain written authorization from the owner before the auction takes place. When selling from an estate, it is necessary to submit a certificate of inheritance or other necessary documents.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Car ready for sale</h3>
              <p>The car must be delivered to Kaggi or partners in a condition that makes it ready for resale. Service book, two keys and both wheel sets (if applicable) should be included to get the highest price. If the service book is electronic, the seller must assist Kaggi in obtaining the information. The car must be in roadworthy condition according to Icelandic traffic laws.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Washing</h3>
              <p>The seller must wash the car so that the inspection can be carried out. If it is not possible to inspect the car due to dirty condition, Kaggi may charge the seller for washing. A rough wash is sufficient.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Other advertising</h3>
              <p>While the car is being inspected and the auction is in progress, the seller may not have the car for sale on other media (e.g. Bland or Facebook).</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Lien on car</h3>
              <p>The seller undertakes to pay off lien debts on the car before the sale to Kaggi takes place. If this is not done within 7 working days from the accepted offer, Kaggi has the right to void the purchase unilaterally.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Direct communication with car dealers</h3>
              <p>If car dealers contact the seller directly during or after the sale, the seller should let Kaggi know.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Liability and cancellations</h2>
            
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Car damage</h3>
              <p>If damage occurs to the car while it is with the testing party, and while the sales arrangement is in progress, Kaggi pays a deductible of up to ISK 100,000. However, Kaggi does not compensate for loss of bonus.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Cancellation</h3>
              <p>If the seller wants to cancel the service, this must be notified in writing to Kaggi by email at least 24 hours before delivery. If this is not done, the seller may be charged ISK 30,000 for costs.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Terms of use for pickup services at Kaggi</h2>
            
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">The service</h3>
              <p>Kaggi uses third parties to pick up cars. The car is picked up at an agreed location and time and then goes for inspection. All drivers have valid driving licenses and are certified by the service provider.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Car condition</h3>
              <p>The car must be in roadworthy condition with a valid inspection certificate. If the car does not meet the conditions, the driver may refuse to take it.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Insurance</h3>
              <p>The car is insured during transport.</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Cancellation</h3>
              <p>Cancellation must be received at least 24 hours before scheduled transport. If this is not done, Kaggi reserves the right to charge the seller for the cost.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Liability in case of cancelled or completed sale</h2>
            
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">If highest bid is rejected</h3>
              <p>If the seller rejects the highest bid, the car must be picked up within 3 days. Otherwise, rental fees may be charged (ISK 4,000 per day).</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">After acceptance of highest bid</h3>
              <p>The seller must accept the highest bid by 10 o'clock the next day. Kaggi may withdraw the offer if it is not accepted.</p>
              
              <p className="mt-3">Change of ownership and signing of contract must be completed within 2 working days. If delayed, Kaggi may void the purchase and charge storage fees. The seller is responsible for canceling road taxes and other contracts related to the car after sale.</p>
            </div>
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
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Skilgreining þjónustunnar</h2>
          <p>Kaggi er þjónusta fyrir einstaklinga eða fyrirtæki (hér eftir nefndir „bílsalar") sem vilja selja bílinn sinn hratt, auðveldlega og án áhættu í gegnum uppboð á bílnum. Allir bílar sem seldir eru fara í skoðun hjá óháðum þriðja aðila og seldir í uppboði til faglegra bílasala. Bílsalinn getur valið að hafna hæsta tilboði eftir uppboðið og getur þá dregið sig úr ferlinu án kostnaðar.</p>
          
          <p>Fyrir bílsala er þjónustan gjaldfrjáls. Það þýðir að bílsalinn greiðir aldrei neitt beint til Kaggi fyrir skoðunina eða umsýslu, jafnvel þótt salan falli niður. Undantekning eru aukathjónustur sem seljandi pantar sérstaklega hjá Kaggi. Sá bílasali sem kaupir bílinn greiðir þóknun til Kaggi. Þóknunin nær yfir kostnað við skoðun, myndatöku, auglýsingu, umsýslu, ábyrgð eftir sölu og tilboðsöflun. Þóknunin er á bilinu 50.000–200.000 kr., eftir verðmæti bílsins.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Bílasalar</h2>
          <p>Þjónusta Kaggi er ekki ætluð fyrir bílasala sem vilja selja eigin bíla. Kaggi áskilur sér rétt til að hafna því að bílasalar selji í gegnum kerfið. Ef bílasali skráir bíl á einkaaðila eða tengdan aðila og setur hann svo í sölu í gegnum Kaggi, telst það kringumflótta á ákvæðinu.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Ábyrgð bílasala áður en selt er í gegnum Kaggi</h2>
          
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Upplýsingaskylda</h3>
            <p>Bílsalinn hefur skyldu til að gefa réttar upplýsingar um ástand bílsins. Við skráningu þarf að skrá alla galla eða skemmdir sem hafa áhrif á ástandið. Ef seljandi lætur hjá líða að upplýsa Kaggi um slíkt getur það leitt til bótaskyldu gagnvart Kaggi og einnig gagnvart þeim bílasala sem kaupir bílinn. Allar upplýsingar þurfa að vera skriflegar.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Löglegur eigandi</h3>
            <p>Bílsalinn þarf að staðfesta að hann/hún sé skráður eigandi bílsins. Ef ekki, þarf hann/hún að afla skriflegs umboðs frá eiganda áður en uppboðið fer fram. Við sölu úr dánarbúi þarf að leggja fram erfðavottorð eða önnur nauðsynleg skjöl.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Bíll tilbúinn til sölu</h3>
            <p>Bíllinn þarf að vera afhentur Kaggi eða samstarfsaðila í ástandi sem gerir hann tilbúinn til endursölu. Þjónustubók, tveir lyklar og bæði hjólasett (ef við á) ættu að fylgja með til að fá sem hæsta verð. Ef þjónustubók er rafræn þarf seljandi aðstoða Kaggi við að sækja upplýsingarnar. Bíllinn þarf að vera í aksturshæfu ástandi samkvæmt íslenskum umferðarlögum.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Þvottur</h3>
            <p>Seljandi þarf að þvo bílinn þannig að hægt sé að framkvæma skoðunina. Ef ekki er hægt að skoða bílinn vegna skítugs ástands getur Kaggi rukkað seljanda fyrir þvottinn. Grófþvottur nægir.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Aðrar auglýsingar</h3>
            <p>Á meðan bíllinn er í skoðun og uppboðið í gangi má seljandi ekki hafa bílnum til sölu á öðrum miðlum (t.d. Bland eða Facebook).</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Veð í bíl</h3>
            <p>Seljandi skuldbindur sig til að greiða upp veðskuldir í bílnum áður en salan til Kaggi fer fram. Ef það er ekki gert innan 7 virkra daga frá samþykktu tilboði hefur Kaggi rétt til að ógilda kaupin einhliða.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Bein samskipti við bílasala</h3>
            <p>Ef bílasalar hafa samband við seljanda beint á meðan eða eftir söluna ber seljanda að láta Kaggi vita.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Ábyrgð og afpantanir</h2>
          
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Skaði á bíl</h3>
            <p>Ef tjón verður á bílnum meðan hann er hjá prófunaraðila, og á meðan sölufyrirkomulagið stendur yfir, greiðir Kaggi sjálfsábyrgð allt að 100.000 kr. Kaggi bætir þó ekki tap á bónus.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Afpöntun</h3>
            <p>Ef seljandi vill hætta við þjónustuna verður að tilkynna það skriflega til Kaggi með tölvupósti a.m.k. 24 klst. fyrir afhendingu. Sé það ekki gert getur seljandi verið rukkaður um 30.000 kr. fyrir kostnað.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Notkunarskilmálar fyrir sóttþjónustu hjá Kaggi</h2>
          
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Þjónustan</h3>
            <p>Kaggi nýtir þriðju aðila fyrir að sækja bíla. Bíllinn er sóttur á stað og tíma sem samið er um og fer síðan í skoðun. Allir ökumenn hafa gilt ökuréttindi og eru vottaðir af þjónustuaðila.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Ástand bíls</h3>
            <p>Bíllinn þarf að vera í aksturshæfu ástandi með gilt skoðunarvottorð. Ef bíllinn uppfyllir ekki skilyrðin getur ökumaður neitað að taka hann.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Tryggingar</h3>
            <p>Bíllinn er tryggður meðan á flutningi stendur.</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Afpöntun</h3>
            <p>Afpöntun þarf að berast a.m.k. 24 klst. fyrir áætlaðan flutning. Sé það ekki gert áskilur Kaggi sér rétt til að rukka seljanda um kostnaðinn.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Ábyrgð ef sala er afpöntuð eða lokið</h2>
          
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Ef hæsta boði er hafnað</h3>
            <p>Ef seljandi hafnar hæsta boði þarf að sækja bílinn innan 3 daga. Að öðrum kosti getur verið rukkað leiguverð (4.000 kr. á dag).</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Eftir samþykkt hæsta boðs</h3>
            <p>Seljandi þarf að samþykkja hæsta boð fyrir kl. 10 næsta dag. Kaggi getur afturkallað tilboðið ef það er ekki samþykkt.</p>
            
            <p className="mt-3">Eigendaskipti og undirritun samnings þurfa að vera kláruð innan 2 virkra daga. Ef það dregst getur Kaggi ógilt kaupin og rukkað geymslugjald. Seljandi ber ábyrgð á að segja upp veggjöldum og öðrum samningum sem tengjast bílnum eftir sölu.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function Legal({ params }){
  const { slug } = params;
  const { t, lang } = useI18n();
  const value = ["terms","privacy","cookies","open-book"].includes(slug) ? slug : "terms";
  
  const getPageTitle = () => {
    switch(slug) {
      case 'privacy':
        return lang === 'en' ? 'Privacy Policy' : 'Persónuverndarstefna';
      case 'cookies':
        return lang === 'en' ? 'Cookies' : 'Vafrakökur';
      case 'open-book':
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
      default:
        return lang === 'en' ? 'Terms' : 'Skilmálar';
    }
  };
  
  const renderContent = () => {
    switch(slug) {
      case 'privacy':
        return <PrivacyContent t={t} lang={lang} />;
      case 'cookies':
        return <CookiesContent t={t} lang={lang} />;
      case 'open-book':
        return <OpenBookContent t={t} lang={lang} />;
      default:
        return <TermsContent t={t} lang={lang} />;
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className={`text-3xl font-bold mb-8 ${slug === 'open-book' ? 'text-left' : 'text-center'}`}>{getPageTitle()}</h1>
      {renderContent()}
    </div>
  );
}