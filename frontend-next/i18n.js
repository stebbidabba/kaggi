"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS } from "./mock";

export const translations = {
  is: {
    common: {
      brand: "Kaggi",
      start: "Byrjaðu",
      licensePlate: "Bílnúmer", 
      mileage: "Kílómetrastaða",
      consent: "Ég samþykki skilmála",
      verifyingVehicle: "Staðfesti bílnúmer...",
      vehicleFound: "Bíll fannst. Halda áfram.",
      vehicleNotFound: "Við fundum ekki þennan bíl. Athugaðu númerið eða sláðu inn upplýsingar handvirkt.",
      apiUnavailable: "Tókst ekki að staðfesta núna. Reyndu aftur síðar.",
      smsVerify: {
        headerLine1: "Við höfum sent 6 stafa kóða á símanúmerið",
        useCodeText: "Notaðu kóðann til að fá aðgang að mínu svæði.",
        continueButton: "Halda áfram",
        verifyingText: "Staðfesti...",
        resendText: "Fékkstu ekki kóðann? Senda aftur",
        resendingText: "Sendi aftur...",
        errorAllDigits: "Vinsamlegast sláðu inn alla 6 stafi",
        errorWrongCode: "Rangur kóði. Reyndu aftur.",
        errorGeneral: "Villa kom upp. Reyndu aftur."
      },
      inPartnership: "Í samstarfi við",
      heroTitle: "Seldu bílinn þinn í dag",
      heroSub: "Fjöldi bílasala keppir um að bjóða þér besta verðið. Selt hratt, öruggt og einfalt.",
      processTitle: "Seldu bílinn þinn",
      processSubtitle: "Kaggi er einfalt, öruggt og algjörlega skuldbindingarfrjálst. Þú hefur fulla stjórn á söluferli.",
      revolutionarySection: {
        title: "Nýstárleg leið til að selja bílinn þinn",
        subtitle: "Við gerum bílasölu einfaldari en nokkru sinni fyrr, þú setur bílinn inn einu sinni, færð mörg tilboð og velur besta kostinn. Engin gjöld, engin fyrirhöfn!"
      },
      advantagesTitle: "Tryggt og einfalt",
      faqTitle: "Við hjálpum þér alla leið",
      seeMore: "Sjá fleiri spurningar",
      seeDeliveryMap: "Sjá kort yfir afhendingarstaði",
      phoneTooltip: "Þú getur hringt í okkur mán - sun frá 09-17",
      received: "Við höfum móttekið bílinn – boð verða birt innan skamms.",
      formTitle: "Komdu í gang með einfalt bílasöluferli",
      formSubtitle: "Það hefur aldrei verið einfaldara að selja bíl. Skildu bílinn þinn eftir og við förum\nmeð restina.",
      nav: {
        sell: "Seldu bílinn þinn",
        dealers: "Bílasalar",
        faq: "Spurt og svarað",
        about: "Um Kaggi",
        contact: "Hafðu samband",
        myPage: "Mín síða",
        dealerPortal: "Bílasalarportal",
        company: "Fyrirtæki"
      },
      back: "Til baka",
      continue: "Halda áfram",
      footer: {
        shortcuts: "Flýtileiðir",
        contact: "Hafðu samband", 
        rights: "© 2025",
        contactUs: "Hafðu samband",
        chat: "Spjall",
        openingHours: "Mán - sun frá 09-17",
        links: {
          faq: "Spurt og svarað",
          about: "Um Kaggi",
          dealers: "Fyrir bílasala",
          terms: "Skilmálar",
          privacy: "Persónuvernd",
          cookies: "Vafrakökur",
          openbook: "Opin bókhald"
        }
      }
    },
    cookies: {
      title: "Vafrakökur",
      content: {
        intro: "Við viljum að þér líði örugg þegar þú notar vefsíðu Kaggi. Til að veita þér betri þjónustu notum við vafrakökur til að geyma ekki-viðkvæmar upplýsingar um val þín og hvernig þú notar síðuna.",
        whatAre: {
          title: "Hvað eru vafrakökur?",
          text: "Vafrakökur eru litlar textaskrár sem vefsíður vista á tölvunni þinni eða tæki. Þær gera notkun þína þægilegri og persónulegri, til dæmis með því að muna innskráningarstillingar eða mæla umferð á síðunni. Sumar vafrakökur eru nauðsynlegar fyrir virkni síðunnar, en aðrar notum við aðeins með þínu samþykki."
        },
        howToManage: {
          title: "Hvernig stjórna ég vafrakökum?",
          text: "Flestir vafrar (Google Chrome, Firefox, Safari, Edge o.fl.) samþykkja vafrakökur sjálfgefið. Þú getur breytt stillingunum í vafranum þínum ef þú vilt hafna eða eyða vafrakökum. Athugaðu að ef þú hafnar öllum vafrakökum gæti síðann ekki virkað sem skyldi.",
          link: "Hér er góð leiðbeining frá Persónuvernd um hvernig hægt er að stjórna vafrakökum:",
          linkText: "👉 Persónuvernd – Vafrakökur"
        },
        types: {
          title: "Hvers konar vafrakökur notum við?",
          necessary: {
            title: "Nauðsynlegar kökur",
            text: "Þessar kökur eru nauðsynlegar fyrir virkni vefsíðunnar og ekki er hægt að slökkva á þeim í kerfinu okkar. Þær eru yfirleitt aðeins settar þegar þú framkvæmir aðgerðir eins og að skrá þig inn eða fylla út eyðublöð."
          },
          analytics: {
            title: "Tölfræði- og greiningarkökur",
            text: "Þessar kökur hjálpa okkur að skilja hvernig gestir nota síðuna, svo við getum bætt upplifunina. Þær safna upplýsingum í nafnlausri mynd, t.d. um fjölda heimsókna og hvaða síður eru vinsælastar."
          },
          marketing: {
            title: "Markaðskökur",
            text: "Þessar kökur eru notaðar til að sýna þér viðeigandi auglýsingar og mæla árangur markaðsherferða. Þær gætu komið frá okkur eða samstarfsaðilum okkar eins og Google eða Facebook."
          }
        },
        consent: {
          title: "Samþykki þitt",
          text: "Þegar þú heimsækir síðuna í fyrsta sinn birtist tilkynning um vafrakökur. Með því að samþykkja þær gefur þú leyfi fyrir notkun þeirra í samræmi við þessa stefnu. Þú getur alltaf afturkallað samþykki þitt eða breytt stillingum."
        }
      }
    },
    wizard: {
      step1: {
        title: "Tengiliðaupplýsingar",
        subtitle: "Um bílinn",
        formTitle: "Fullkomið skráningu og fáðu verðmat fyrir bílinn þinn"
      },
      step2: {
        title: "Um bílinn",
        subtitle: "Segðu okkur meira um ástand og staðsetningu bílsins",
        formTitle: "Við þurfum bara aðeins meiri upplýsingar",
        info: {
          title: "Næstu skref",
          description: "Eftir að þú hefur sent inn upplýsingarnar þínar munum við:",
          point1: "Hafa samband við þig innan 24 tíma",
          point2: "Skipuleggja ókeypis skoðun á bílnum",
          point3: "Gefa þér verðmat byggð á ástandi bílsins"
        },
        questions: {
          damage: {
            title: "Hefur bíllinn þekkta galla, vantar hluti eða hefur sýnilega skemmdir?",
            description: "Með sýnilegum skemmdum er átt við dælur, ryð, steinsprungur eða ripur sem þú þekkir til."
          },
          repairs: {
            title: "Hefur verið gert stærri viðgerðir?",
            description: "Vinsamlegast segðu frá ef bíllinn hefur verið gervigerður, endurnýjaður eða fengið aðrar stórar breytingar eftir árekstur."
          },
          other: {
            title: "Eru einhverjar aðrar mikilvægar upplýsingar um bílinn?",
            description: "T.d. um ástand bílsins eða auka búnað."
          },
          ownership: {
            title: "Selur þú með umboði, forsjáumboði eða fyrir dánarbú?",
            description: "Eigandi bílsins getur undirritað sölusamning sjálfur, veldu nei."
          }
        },
        yes: "Já",
        no: "Nei",
        ownershipTypes: {
          title: "Hvaða sölumáti á við um þig?",
          estate: "Dánarbú",
          powerOfAttorney: "Umboð",
          helpingSell: "Ég hjálpa einhverjum að selja bílinn sinn, en þau þurfa að skrifa undir samninginn sjálf"
        },
        placeholders: {
          damage: "Lýstu göllum, vöntun hluta eða sýnilegum skemmdum sem þú veist af",
          repairs: "Lýstu viðgerðum eða breytingum sem hafa verið gerðar",
          other: "Lýstu öðrum upplýsingum um bílinn",
          ownership: "Lýstu sérstökum eignarhaldsamböndum"
        }
      },
      step3: {
        title: "Verðmat",
        subtitle: "Yfirfarðu upplýsingarnar þínar og sendu inn",
        formTitle: "Fullkomna skráningu og fáðu verðmat fyrir bílinn þinn",
        mainHeading: "Bíllinn var þá skráður",
        confirmationText: "Við höfum sent staðfestingu í tölvupóst þinn.",
        priceEstimate: {
          heading: "Sjáðu verðmat",
          description: "Við höfum selt yfir 80.000 bíla - sjáðu hvað við metum að bíllinn þinn gæti fengið í uppboðsrúndu hjá Nettbil!",
          noDataText: "Stundum höfum við ekki næg sögugögn til að gefa þér verðmat. Í því tilfelli mun ráðgjafi hafa samband við þig með verðmat.",
          loginButton: "Skráðu þig inn og sjáðu verðmat þitt"
        },
        whatNext: {
          heading: "Hvað gerist næst?",
          step1: {
            title: "1. Pantaðu ókeypis prufuakstur á bílnum",
            description: "Þú pantar ókeypis próf hjá Víking Kontroll eða NAF í gegnum My Page. Ef þú vilt ekki gera það sjálfur munum við hafa samband við þig innan nokkurra daga."
          },
          step2: {
            title: "2. uppboðsrúnda",
            description: "Afhendu bílinn þinn í prófunarstöðina. Eftir prófunina verður bíllinn settur upp í uppboð fyrir söluaðila okkar."
          },
          step3: {
            title: "3. Bíllinn er seldur og peningar eru á reikningnum",
            description: "Ef þú samþykkir hæsta tilboð færðu peningana á reikninginn þinn innan nokkurra daga. Ef þú ert ekki sátt(ur) við tilboðið geturðu hafnað því og sótt bílinn þinn."
          }
        },
        footer: {
          company: "Nettbil AS © 2025",
          shortcuts: {
            title: "Shortcuts",
            carTips: "Car tips",
            qa: "Questions and answers", 
            aboutNettbil: "About Nettbil",
            forDealer: "For dealer"
          },
          contact: {
            title: "Get in touch",
            contactUs: "Contact us",
            chat: "Chat",
            facebook: "Facebook"
          }
        },
        success: {
          title: "Upplýsingar mótteknar!",
          description: "Við höfum móttekið upplýsingarnar þínar og munum hafa samband fljótlega."
        },
        summary: {
          title: "Samantekt",
          contact: "Tengiliður:",
          phone: "Sími:",
          email: "Tölvupóstur:",
          location: "Staðsetning:"
        },
        nextSteps: {
          title: "Næstu skref:",
          step1: "Við munum hafa samband innan 24 tíma",
          step2: "Við skipuleggjum ókeypis skoðun á bílnum þínum",
          step3: "Þú færð verðmat byggð á ástandi bílsins"
        },
        terms: {
          prefix: "Ég samþykki",
          link: "skilmála og kjör",
          suffix: "og að Kaggi má hafa samband við mig varðandi sölu bílsins míns."
        },
        newsletter: "Já, ég vil gerast áskrifandi að fréttabréfi Kaggi."
      },
      firstName: "Fornafn",
      lastName: "Eftirnafn", 
      countryCode: "Landsnúmer",
      phoneNumber: "Símanúmer",
      email: "Tölvupóstur",
      postalCode: "Póstnúmer",
      postalCodePlaceholder: "Póstnúmer",
      city: "Staður",
      submit: "Skrá bílinn",
      footer: {
        security: "Þessi síða er vernduð af reCAPTCHA og persónuverndarstefnu Google og þjónustuskilmálum gilda."
      }
    },
    process: {
      step1: { title: "Segðu okkur frá bílnum þínum", desc: "Við gefum þér verðmat og skipuleggjum ókeypis og óbindandi skoðun á bílnum." },
      step2: { title: "Afhendu bílinn", desc: "Eða láttu okkur sækja hann. Við prufukeyrum og tökum myndir af bílnum, setjum hann síðan upp í uppboð." },
      step3: { title: "Samþykktu hæsta boð", desc: "Peningarnir verða á reikningnum þínum innan nokkurra daga og við tökum ábyrgð á öllum kvörtunum." },
      step4: { title: "Bíll seldur og peningar á reikning", desc: "Bíllinn þinn er seldur sama dag og þú færð peninga á reikninginn þinn stuttu síðar." }
    },
    advantages: {
      free: { title: "Kostnaðarlaust", desc: "Engin gjöld fyrir að skrá bílinn þinn hjá okkur." },
      easy: { title: "Óbindandi tilboð", desc: "Þú ákveður hvort þú vilt samþykkja hæsta boð." },
      fast: { title: "Seldu bílinn þinn hratt", desc: "Eftir uppboðsrúndu er bíllinn þinn seldur á 1 degi ef þú samþykkir hæsta boð." },
      safe: { title: "Losum þig við ábyrgð á kröfum", desc: "Við tökum ábyrgð þegar bíllinn er seldur." },
      soldCount: { title: "Staðfestir kaupendur", desc: "Allir bjóðendur eru auðkenndir og fjárhagsstaðfestir áður en boð telja." },
      nationwide: { title: "Þjónusta um allt land", desc: "Við dekka alla Ísland." }
    },
    about: {
      title: "Um okkur",
      content: {
        paragraph1: "Kaggi var stofnað árið 2025 með þá sýn að gera bílasölu einfaldari og þægilegri fyrir alla. Við viljum bjóða upp á lausn þar sem margir bílasalar geta boðið í sama bíl á sama tíma, þannig fær eigandinn sanngjarnt verð án fyrirhafnar.",
        paragraph2: "Við sjáum um ferlið frá upphafi til enda og gerum bílasöluna að straumlínulagaðri og stresslausri upplifun.",
        paragraph3: "Þótt Kaggi sé nýtt fyrirtæki er markmið okkar skýrt: að byggja upp traust, gera viðskiptin gagnsæ og hjálpa bíleigendum að selja bílinn sinn á öruggan og skilvirkan hátt.",
        paragraph4: "Við hlökkum til að vaxa með viðskiptavinum okkar og gera bílasölu á Íslandi einfaldari en nokkru sinni fyrr."
      },
      contact: {
        title: "Hafðu samband",
        address: "Reykjavík, Ísland",
        phone: "354 787 7887",
        email: "kaggi@kaggi.is",
        hours: "Mánudaga - föstudaga: 09:00 - 17:00"
      }
    },
    dealers: {
      hero: {
        title: "Bjóðaðu í bíla með ástandsskýrslu",
        subtitle: "Keyptu bíla til endursölu. Fáðu tækifæri til að kaupa metna bíla með ástandsskýrslu fyrir aðlaðandi verð."
      },
      collaboration: "Í samstarfi við",
      createAccount: "Búa til ókeypis endursöluaðgang",
      login: "Skrá inn",
      benefits: {
        auction: "Ókeypis aðgangur að uppboðsvettvangi",
        newCars: "Að meðaltali 134 nýir bílar í boði á hverjum degi",
        selection: "Fjölbreytt úrval bíla með ástandsskýrslu"
      },
      highestBid: "Hæsta boð",
      stats: {
        carsBidding: "Bílar hingað til í boðlotu",
        newCarsDaily: "Nýir bílar á boðlotu alla daga",
        carsComing: "Bílar koma næstu daga"
      },
      examples: {
        title: "Dæmi um bíla",
        placeholder: "Bíladæmi verða tengd síðar"
      },
      seeAllCars: "Búa til ókeypis aðgang til að sjá alla bílana",
      requiresLicense: "Krefst endursöluleyfi og aðgangs að autosys",
      contact: {
        title: "Viltu tala við einn af sölustjórum okkar?",
        customerService: "Þjónustuver",
        email: "Tölvupóstur",
        hours: "Opnunartímar",
        schedule: "Mánudaga - föstudaga: 08:00 - 17:00"
      }
    },
    myPage: {
      title: "Farðu á mína síðu",
      subtitle: "Athugaðu söluferlið þitt á minni síðu",
      licensePlate: "Skráningarnúmer bílsins",
      email: "Tölvupósturinn þinn",
      seeMyPage: "Sjá mína síðu",
      sellQuestion: "Viltu selja bílinn þinn með Kaggi?",
      registerCar: "Skráðu bílinn þinn",
      dealerQuestion: "Ertu bílasali?",
      dealerLogin: "Skráðu þig inn hér.",
      recaptcha: {
        text: "Þessi síða er vernduð af reCAPTCHA og",
        privacy: "persónuverndarstefnu Google",
        and: "og",
        terms: "þjónustuskilmálum",
        apply: "gilda."
      }
    },
    dealerLogin: {
      title: "Innskráning fyrir bílasala",
      subtitle: "Ef þú ert bílasali, skráðu þig inn hér.",
      email: "Netfangið þitt",
      password: "Lykilorðið þitt",
      loginButton: "Skrá inn sem bílasali",
      forgotPassword: "Gleymt lykilorð?",
      register: "Nýskráning",
      sellWithNettbil: "Viltu selja bílinn þinn með Kaggi?",
      goToMyPage: "Farðu á mína síðu.",
      recaptcha: {
        text: "Þessi síða er vernduð af reCAPTCHA og",
        privacy: "persónuverndarstefnu Google",
        and: "og",
        terms: "þjónustuskilmálum",
        apply: "gilda."
      }
    },
    dealerRegistration: {
      title: "Búa til reikning",
      subtitle: "Sláðu inn netfang og búðu til lykilorð",
      email: "Netfang",
      password: "Lykilorð", 
      repeatPassword: "Endurtaktu lykilorð",
      passwordStrength: "Lykilorð styrka",
      tooWeak: "Of veikt",
      medium: "Miðlungs",
      strong: "Sterkt",
      requirements: {
        title: "Kröfur lykilorða:",
        length: "Að minnsta kosti 12 stafir",
        strength: "Miðlungs eða sterkt lykilorð",
        lowercase: "Að minnsta kosti 1 lítill stafur",
        uppercase: "Að minnsta kosti 1 stór stafur", 
        number: "Að minnsta kosti 1 tala",
        symbol: "Að minnsta kosti 1 tákn (!\"#$%&'()*+,-./:;<=?@[]^_`{|}~)"
      },
      termsAccept: "Ég samþykki",
      termsLink: "skilmála",
      termsText: "fyrir notkun þjónustunnar",
      nextButton: "Næsta",
      recaptcha: {
        text: "Þessi síða er vernduð af reCAPTCHA og",
        privacy: "persónuverndarstefnu Google",
        and: "og", 
        terms: "skilmálum",
        apply: "gilda"
      }
    },
    dealerContactInfo: {
      title: "Tengiliðaupplýsingar",
      subtitle: "Fylltu inn nafn og upplýsingar um söluaðila",
      firstName: "Fornafn",
      surname: "Eftirnafn",
      organizationNumber: "Fyrirtækjakennitala",
      dealerName: "Nafn söluaðila",
      mobileNumber: "Farsímanúmer",
      streetAddress: "Heimilisfang",
      postalCode: "Póstnúmer",
      city: "Borg",
      nextButton: "Næsta",
      recaptcha: {
        text: "Þessi síða er vernduð af reCAPTCHA og",
        privacy: "persónuverndarstefnu Google",
        and: "og", 
        terms: "skilmálum",
        apply: "gilda"
      }
    },
    company: {
      hero: {
        headline: "Kaggi hjálpar þér að fá besta verðið frá bílasölu. Hratt, einfalt og öruggt.",
      },
      title: "Um fyrirtækið",
      subtitle: "Kynntu þér sögu okkar og gildi",
      story: {
        title: "Okkar saga",
        content: "Kaggi var stofnað árið 2017 með einfalt markmið - að gera bílasölu auðveldari og gagnsælli fyrir alla. Síðan þá höfum við hjálpað þúsundum Íslendinga að selja bílana sína á fljótlegan og öruggan hátt."
      },
      mission: {
        title: "Okkar hlutverk",
        content: "Við trúum því að allir eigi skilið sanngjarnt verð fyrir bílinn sinn. Því bjóðum við upp á gagnsætt ferli þar sem margir söluaðilar keppa um að bjóða þér besta verðið."
      },
      values: {
        title: "Okkar gildi",
        trust: "Traust - Við byggjum á gagnkvæmu trausti",
        transparency: "Gagnsæi - Ekkert falið, allt ljóst",
        service: "Þjónusta - Þú kemur alltaf í fyrsta sæti"
      },
      stats: {
        title: "Tölur sem tala",
        cars: "85.031+ seldir bílar",
        dealers: "100+ söluaðilar",
        satisfaction: "4.7/5 í einkunn",
        years: "7+ ára reynsla"
      }
    },
    tips: {
      hero: {
        title: "Upplýsingar og ráðgjöf fyrir bíleigendur",
        subtitle: "Þú sem bíleigandi getur fundið okkar bestu ráðgjöf hér."
      },
      categories: {
        sellCar: {
          title: "Selja bíl",
          desc: "Lestu okkar greinar um að selja bíl"
        },
        maintenance: {
          title: "Viðhald",
          desc: "Ráðgjöf og ábendingar til viðhalds á bílnum þínum"
        },
        stories: {
          title: "Viðskiptavinasögur",
          desc: "Lestu okkar viðskiptavinasögur"
        }
      },
      latestArticles: {
        title: "Nýjustu greinarnar"
      },
      articles: {
        article1: {
          title: "Hvernig selja bíl til útlanda? Þetta þarftu að vita",
          desc: "Veltirðu fyrir þér að selja bílinn þinn til útlanda? Kannski hefur þú heyrt að bílar geta verið meira virði utan fyrir Ísland eða fengið tillögur frá útlendum kaupendum? Í þessari grein förum við yfir hvað þú þarft að vita áður en þú gengur í það að selja bílinn þinn erlendis, hvílík fell...",
          category: "Selja bíl"
        },
        article2: {
          title: "Kæruréttarábyrgð við sölu á bíl: Hvað þýðir það og hvernig forðast þú vandræði?",
          desc: "Vissirðu að þú sem einkasala getur staðið frammi fyrir kæruréttarábyrgð í allt að tvö ár eftir að þú hefur selt bílinn þinn? Það þýðir að kaupandinn getur komið með kröfur til þín, jafnvel löngu eftir söluna. Í þessari leiðbeiningu förum við yfir hvað kæruréttarábyrgð felur í sér, hvernig hún getur haft áhrif á þig og hvað þú getur gert til að forðast áhættuna...",
          category: "Selja bíl"
        },
        article3: {
          title: "Hvað er ástandsskýrsla og hvers vegna þarftu eina þegar þú ætlar að selja bílinn?",
          desc: "Að meta ástand bílsins nákvæmlega getur verið yfirgnæfandi. Netbíll hefur því gert það einfalt fyrir þig. Við gefum út ítarlega og óháða ástandsskýrslu hjá einum af okkar samstarfsaðilum, NAF eða Viking Kontroll. Ástandsskýrslan gefur okkur, þér og mögulegum kaupendum tæmandi mynd af ástandi bílsins, og myndar grunnlag fyrir réttláta og opna verðlagningu, þar sem allar upplýsingar um bílinn eru aðgengilegar.",
          category: "Selja bíl"
        }
      },
      customerStories: {
        title: "Viðskiptavinasögur"
      },
      stories: {
        story1: {
          title: "Lars seldi bílinn frá sófanum sínum í Bærum",
          desc: "Að selja bíl getur verið bæði einfalt og áhrifaríkt – hvort sem þú hefur nýjan bíl í huga eða bara vilt losna við bílinn. Og gevinst? Langt yfir væntingar, segir Lars frá Bærum sem nýlega seldi bílinn sinn með Netbíl."
        },
        story2: {
          title: "Við deildum bíl í sjónvarpsþættinum Best in Show",
          desc: "Hvað gerist þegar húmor, uppákomur og bíll renna saman? Við fengum svar þegar við deildum flottan Peugeot 3008 í sjónvarpsþættinum Best in Show, þar sem Else Kåss Furuseth fylgdi landsmönnum í gegnum skemmtilegustu stundirnar."
        },
        story3: {
          title: "Nina: - Gott tilboð, spurðu þig bara",
          desc: "Nina afhenti gamla bílnum sínum hjá NAF á morguninn. Seinna á deginum fékk hún tilboð í bílinn, og nokkrum dögum síðar voru peningarnir á kontónum. - Netbíll var fullkomið fyrir mig, segir Nina."
        }
      },
      cta: {
        title: "Byrjaðu með einfalt bílasöluferli",
        subtitle: "Það hefur aldrei verið einfaldara að selja bíl. Afhentu bílinn og við gerum restina.",
        licensePlate: "Bílnúmer",
        mileage: "Kílómetrastaða",
        button: "Byrjaðu"
      },
      breadcrumb: {
        tips: "Bíltips"
      },
      articleDetails: {
        sellAbroad: {
          title: "Hvernig selja bíl til útlanda? Þetta þarftu að vita",
          category: "Selja bíl",
          intro: "Veltirðu fyrir þér að selja bílinn þinn til útlanda? Kannski hefur þú heyrt að bílar geta verið meira virði utan fyrir Ísland eða fengið tillögur frá útlendum kaupendum? Í þessari grein förum við yfir hvað þú þarft að vita áður en þú gengur í það að selja bílinn þinn erlendis, hvílík fellgruver þú þarft að forðast og hvernig þú getur náð bestu verði sem eksportbíll við að selja í gegnum Kaggi.",
          canSell: {
            title: "Má maður selja bíl til útlanda?",
            content: "Já, það er full heimild að selja bíl til útlanda, annaðhvort einstaklingskaup eða í gegnum fagaðila. Þú getur til dæmis selt beint til kaupanda í útlöndum eða notað Kaggi til að ná til bílasala á Íslandi sem sérhæfa sig í útflutningi. Þessir salar sjá um regluverk, skjöl og flutning svo þú þurfir ekki að hugsa um það sjálfur."
          },
          netbilNetwork: {
            title: "Kaggi - net bílasala og útflutningsaðila",
            content: "Þegar þú selur bílinn þinn með Kaggi er hann boðinn út í stafrænu uppboði til yfir 2000 bílasala um allt land. Margir þessara sala sérhæfa sig í útflutningi og kaupa bíla sem þeir hyggjast selja áfram til kaupenda erlendis. Þetta þýðir að þú færð fleiri raunveruleg tilboð, líka frá þeim sem vita nákvæmlega hvað bíllinn þinn er virði á erlendum mörkuðum."
          },
          directSales: {
            title: "Bein sala til útlanda - kostir og gallar",
            intro: "Ef þú vilt selja bílinn þinn beint til einkaaðila erlendis er það líka möguleiki. Það krefur þó miklu meira af þér sem seljanda:",
            advantages: {
              title: "Kostir við að selja bíl til útlanda",
              point1: "Þú getur fengið betra verð, sérstaklega ef bíllinn er eftirsóttur í heimalandi kaupandans",
              point2: "Þú hefur fulla stjórn á sölunni"
            },
            disadvantages: {
              title: "Gallar við að selja bíl til útlanda",
              point1: "Þú verður að sjá um öll útflutningsskjöl og flutninga sjálfur",
              point2: "Þú verður að senda söluskýrslu en bíllinn á ekki að vera skráður á Íslandi og þetta krefur aukavinnu",
              point3: "Þú getur orðið ábyrgur fyrir göllum eða kvörtunum, sérstaklega ef þú hefur ekki tilgreint alla galla greinilega",
              point4: "Flóknari greiðslulausnir fyrir greiðslur til erlendra ríkja"
            },
            conclusion: "Ef þú selur bílinn þinn með Kaggi þurfir þú ekki að hugsa um þetta allt saman - við tökum við öllu. Við sjáum um uppboðið, samninginn, millifærslu láns (ef það er í gildi) og sendum söluskýrsluna fyrir þig. Allt sem þú þarft að gera er að skrifa undir samninginn. Peningarnir berast á reikninginn þinn innan nokkurra virkra daga."
          },
          popularCars: {
            title: "Hvaða bílar eru vinsælastir á útflutningsmarkaði?",
            intro: "Þrjár tegundir bíla eru sérstaklega eftirsóttar hjá útflutningsaðilum: eldri rafbílar, öflugir jeppar og notuð Tesla.",
            tesla: {
              title: "Tesla með ókeypis hleðslu.",
              content: "Sum eldri Tesla módel hafa lífstíðar ókeypis aðgang að Tesla Supercharger netinu sem gerir það mögulegt að hlaða ókeypis á hleðslustöðvum þeirra um allan heim. Þetta tilboð er ekki lengur í boði fyrir nýja bíla og gerir þessi eldri Tesla módel mjög eftirsótt þar sem þessi fríðindi standa. Í mörgum löndum, sérstaklega í Austur-Evrópu, er þetta gríðarlega mikilvægt."
            },
            oldElectric: {
              content: "Rafbílar sem uppfylla ekki lengur kröfur ES-samþykkis á Íslandi. Sum eldri rafbíla módel uppfylla ekki lengur kröfurnar fyrir ES-samþykki á Íslandi en geta samt verið eftirsótt í öðrum löndum. Í Austur-Evrópu er mikill markaður fyrir þessa bíla þar sem þeir eru enn leyfilegir í rekstri og ódýrir í viðhaldi."
            },
            suv: {
              content: "Öflugir jeppar og pick-upar. Bílar eins og Toyota Land Cruiser, Mitsubishi Pajero og Toyota Hilux eru vinsælir í löndum með erfiðar aðstæður eins og Úkraína og nálæg lönd. Þessir bílar eru þekktir fyrir ending og góða eiginleika á erfiðum vegum og eru oft eftirsóttir af hjálparsamtökum, jarðyrkjumönnum og byggingarfyrirtækjum. Þessir bílar eru mjög eftirsóttir í vinnu á Úkraínu vegna núverandi stöðu þar."
            }
          },
          currency: {
            title: "Gengi krónunnar hefur líka áhrif á útflutningsmarkaðinn",
            content: "Þegar íslenska krónan er veik verða bílar keyptir á Íslandi ódýrari fyrir kaupendur erlendis. Til dæmis eru 100 danskar krónur núna virði um 160 íslenskar - sem gerir íslenska notaða bíla mun eftirsóttari fyrir útflutning til Danmerkur. Hið sama sést á tímum þegar evran stendur sterkt gagnvart krónunni þar sem sala bíla til Þýskalands, Spánar og annarra landa sem nota evrur verður mun hagstæðari."
          },
          exportTaxes: {
            title: "Útflutningsgjöld og skattar - hvað þarf að passa uppá?",
            intro: "Í flestum tilvikum eru engin sérstök útflutningsgjöld þegar þú selur bíl frá Íslandi. En hér eru nokkur atriði sem þú þarft að vita:",
            point1: "Ef þú selur sem einstaklingur gilda engin moms- eða útflutningsgjöld",
            point2: "Ef þú rekur fyrirtæki með kaup og sölu sem aðalstarfsemi þarftu að tilkynna söluna til Skattsins",
            point3: "Við útflutning þarf engin moms- eða útflutningsgjöld en kaupandinn í útlöndunum gæti þurft að greiða innflutningsgjöld í sínu landi/innflutningslandi",
            point4: "Flutningskostnaður þarf yfirleitt að vera greiddur af kaupanda en þetta ætti að vera útskýrt fyrirfram",
            recommendation: "Til að forðast misskilning og tryggja að þú verðir ekki ábyrgur efnahagslega í kjölfarið mælum við með að nota faglega þjónustu eins og Kaggi."
          },
          whyNetbil: {
            title: "Hvers vegna að velja Kaggi?",
            intro: "Með Kaggi losnar þú við allt það flókna sem fylgir bílasölu. Þú þarft ekki að taka myndir, skrifa auglýsingar eða semja um verð - þú losnar við allt það og nærð samt hámarksverði fyrir bílinn. Allt sem þú þarft að gera er að skrá þig inn og bíða niðurstöðu. Peningarnir koma á reikninginn þinn innan nokkurra virkra daga.",
            point1: "Faglegir söluaðilar (og útflytjendur) bjóða í bílinn þinn. Þetta leiðir til samkeppni og getur hækkað verðið",
            point2: "Þú getur fylgst með uppboðinu í rauntíma og ákveður sjálfur hvort þú vilt samþykkja hæsta tilboð",
            point3: "Það er ókeypis og óskuldbindandi að selja bíl með Kaggi. Þú borgar ekkert af eigin vasa",
            point4: "Við sækjum söluskjöl, samning og millifærslu láns ef þú hefur það",
            point5: "Við tökum við kæruábyrgðinni þannig að þú þarft ekki að hugsa um það"
          },
          cta: {
            button: "Fá verðmat núna"
          }
        },
        liability: {
          title: "Reklamasjonsansvar ved salg av bil: Hva betyr det og hvordan unngår du det?",
          category: "Selja bíl",
          intro: "Vissir þú að þú sem einkasala getur staðið frammi fyrir reklamasjonsábyrgð í allt að tvö ár eftir að þú hefur selt bílinn þinn? Þetta þýðir að kaupandinn getur komið með kröfur til þín, jafnvel löngu eftir söluna.",
          introDetail: "Í þessum leiðbeiningum förum við yfir hvað reklamasjonsábyrgð felur í sér, hvernig hún getur haft áhrif á þig og hvað þú getur gert til að forðast áhættuna. Við útskýrum einnig hvernig við tökum við ábyrgðinni svo þú getur selt bílinn þinn trygt og áhyggjulaust.",
          whatIs: {
            title: "Hvað er reklamasjonsábyrgð?",
            content1: "Þegar þú selur bíl sem einkaaðili er salan stjórna af Kjöplögum. Lögin gefa kaupanda rétt til að kvarta ef bíllinn hefur galla sem ekki voru upplýstir við söluna. Þetta gildir jafnvel þótt seljandi hafi verið heiðarlegur og ekki vitað um gallann.",
            content2: "Samkvæmt Kjöplögum § 27 og § 32 varar reklamasjonsábyrgðin í 1 ár frá afhendingardegi. Þetta þýðir að kaupandi getur haft samband við þig í langan tíma eftir söluna og í versta falli getur þú þurft að greiða fyrir viðgerðir eða mögulega til og með kaupa bílinn til baka."
          },
          vsRights: {
            title: "Reklamasjonsábyrgð vs. reklamasjonsréttur",
            content: "Þetta eru tvær hliðar á sama verkefni. Reklamasjonsréttur er rétturinn sem kaupandi hefur til að kvarta yfir bílnum ef hann reynist gallaður, á meðan reklamasjonsábyrgð er skuldbindingin sem seljandi hefur til að laga þessa galla eða mögulega greiða skaðabætur."
          },
          vsWarranty: {
            title: "Hvað er munurinn á reklamasjonsábyrgð og ábyrgð?",
            content1: "Ábyrgð er samningur milli seljanda og kaupanda og hún er ekki lögbundin. Ábyrgð getur haft ákveðin skilyrði í samningnum sem eru betri en reklamasjonsrétturinn. Ábyrgðin getur veitt þér rétt til viðgerðar, skipti eða peningaendurgreiðslu, umfram það sem er lögbundið.",
            content2: "Það er mikilvægt að kanna ábyrgðarskilmálana áður en þú kaupir. Það er oft eitthvað sem gildir fyrir fagaðila eða fyrirtæki og er venjulega ekki innifalið í sölu milli tveggja einkaaðila.",
            content3: "Nýja forbrukerkönnlögin tóku gildi 1. janúar 2024 með uppfærðum ákvæðum. Lestu meira um lögin á vef Forbrukarráðsins."
          },
          examples: {
            title: "Dæmi um reklamasjonsábyrgð",
            intro: "Hér eru nokkur dæmi um venjulega galla og kvartanir sem kaupendur geta komið með:",
            point1: "Bilaðar vélahlutir sem koma í ljós stuttu eftir kaupin",
            point2: "Falinn ryð eða eldri árekstrarskemmdir",
            point3: "Rafeindavandamál sem ekki komu í ljós við skoðun",
            point4: "Galli sem seljandi vissi ekki um en kaupandi telur að hann ætti að hafa vitað",
            conclusion: "Málið er: þú þarft ekki endilega að hafa gert eitthvað rangt. Áhættan liggur hjá þér sem seljanda."
          },
          buyerRights: {
            title: "Hvað getur kaupandinn krafist?",
            intro: "Ef það kemst í ljós að bíllinn sem þú seldir hefur galla getur kaupandinn notað reklamasjonsrétt sinn til að kvarta. Þetta getur falið í sér:",
            point1: "Viðgerð",
            point2: "Verðlækkun",
            point3: "Skipti",
            point4: "Heill kaupverðsendurgreiðsla",
            conclusion: "Ef þú selur í gegnum Kaggi höfum við þá ábyrgð á bílnum svo þú þarft ekki að hafa áhyggjur af þessu. Við gerum grunnskoðun á bílnum og tökum á okkur ábyrgðina á að kaupandi bílsins fái rétta upplýsingar um ástand hans og hvað það kostar að laga hugsanlega galla. Þetta þýðir að við getum tekið við reklamasjonsábyrgðinni fyrir þig og þú losnar við að þurfa að hugsa um þetta!"
          },
          sellerImpact: {
            title: "Hvernig hefur reklamasjonsábyrgðin áhrif á þig sem seljanda?",
            risk1: {
              title: "Efnahagsleg áhætta.",
              content: "Ef kaupandi kemur með kvörtun og fær medhold í henni gætirðu þurft að greiða hluta eða allan kostnaðinn við viðgerðir eða í versta falli endurgreiða alla kaupverðið."
            },
            risk2: {
              title: "Tímasóun og stress.",
              content: "Þú getur þurft að eiga í samskiptum við kaupanda, svara spurningum, ræða um tæknilegar nákvæmni eða mæta í Forbrukarráð eða fyrir dómstólum. Allt þetta tekur tíma og orku."
            },
            risk3: {
              title: "Óvissuþáttur í söluferli.",
              content: "Margir enda með að verðleggja bílinn lægra eða verða taugaveiklir í söluferlinu vegna þess að þeir óttast kvartanir síðar. Þetta getur gert söluferlið erfiðara og þú getur misst af betri verði."
            }
          },
          limitLiability: {
            title: "Hvað geturðu gert til að takmarka ábyrgðina?",
            intro: "Þú getur aldrei losað þig alveg við reklamasjonsábyrgð þegar þú selur einkaaðila en þú getur dregið úr áhættunni með því að:",
            point1: "Vera heiðarlegur og opinn um ástand bílsins",
            point2: "Skrifa nákvæman kaupsamning þar sem þú skráir alla þekkta galla",
            point3: "Biðja um undirskrift á ástandsskýrslu, til dæmis frá NAF eða Viking Kontroll",
            point4: "Skrá allt niður í skriflegri mynd, þar á meðal afhendingu, samninga og viðskipti"
          },
          kaggiSolution: {
            title: "Einfalda lausnin: Seldu með Kaggi – við tökum reklamasjonsábyrgðina",
            intro: "Þegar þú selur bílinn þinn með Kaggi tökum við að okkur alla söluferlið. Þetta þýðir að:",
            point1: "Þú losnar við alla ábyrgð eftir söluna - þar á meðal reklamasjonsábyrgðina",
            point2: "Við störfum sem faglegir seljendur og höfum beina samskipti við kaupandann",
            point3: "Þú færð peningana þína hratt og örugglegt, venjulega 1-2 dögum eftir að samningur er undirritaður",
            conclusion: "Þetta gefur þér algjöra öryggistilfinningu borið saman við einkasölu. Þú þarft ekki að óttast símtöl frá kaupendum eða lagalegar deilur."
          },
          priceImpact: {
            title: "Hvað þýðir þetta fyrir verðið á bílnum?",
            intro: "Að losna við reklamasjonsábyrgð er dýrmætt - bæði í krónur talið og hvað varðar hugarró. En það hefur einnig jákvæð áhrif á verðið:",
            point1: "Þegar bíllinn er seldur í gegnum Kaggi er hann prófaður í heild sinni af NAF eða Viking Kontroll",
            point2: "Söluaðilar sem bjóða í bílinn þinn vita hvað þeir eru að fá - og þora að bjóða hærra",
            point3: "Þú færð stafrænt uppboð hjá yfir 2000 söluaðilum sem keppa um að gefa þér besta verðið",
            conclusion: "Með öðrum orðum: þú færð sanngjarnt verð fyrir bílinn þinn án þess að þurfa að taka áhættu."
          },
          cta: {
            button: "Fá verðmat núna"
          }
        },
        conditionReport: {
          title: "Hvað er ástandsskýrsla og hvers vegna þarftu eina þegar þú ætlar að selja bílinn?",
          category: "Selja bíl", 
          intro: "Að meta raunverulegt ástand bílsins og verðmæti getur fundist svolítið yfirvofandi. Hvað er bíllinn í raun virði? Er eitthvað að sem þú veist ekki um? Og hvað þarf maður raunverulega að upplýsa kaupandann um?",
          introDetail: "Einmitt því höfum við í Kaggi gert þetta einfalt fyrir þig, svo þú þurfir ekki að hugsa um það. Við framkvæmum ítarlega og óháða prófun hjá einum af samstarfsaðilum okkar, NAF eða Viking Kontroll. Ástandsskýrslan gefur okkur, þér og söluaðilum skýra mynd af ástandi bílsins og myndar grunninn að sanngjarnri og opinni tilboðslotu þar sem allar upplýsingar um bílinn eru aðgengilegar.",
          whatIs: {
            title: "Hvað er ástandsskýrsla?",
            content: "Ástandsskýrsla er tæknileg og sjónræn yfirferð bílsins þíns, framkvæmd af fagmanni. Við vinnum með óháðu þriðju aðilunum NAF og Viking Kontroll til að fá hlutlægt mat á bílnum. Tilgangurinn er að skjalfesta raunverulegt ástand bílsins - bæði jákvætt og neikvætt.",
            coversTitle: "Skýrslan nær yfir meðal annars:",
            covers: {
              bodywork: {
                title: "Bílskrokk og lakk.",
                content: "Bulgur, rispur, steinspraut, ryð og skemmdir á dyrum, skjöldum, húdd og þaki eru kannaðar."
              },
              lights: {
                title: "Ljós og rafbúnaður.",
                content: "Framljós, bakljós, stefnuljós, bremsljós, auk virkni rafglugga, spegla og annars rafbúnaðar eru prófuð."
              },
              wheels: {
                title: "Hjól og dekk.",
                content: "Ástand dekk, slit, myndardýpt og hugsanlegar skemmdir á felgum eru skjalfestar."
              },
              brakes: {
                title: "Hemlar.",
                content: "Athugun á hemlablokka, -diskum, -rörum og -slöngum, auk virkni handhemla."
              },
              engine: {
                title: "Vél og drifkerfi.",
                content: "Sjónrænt og virkni mat á vél, gírkassa, mismunarkerfi, ása og hugsanlega leka eru skjalfestar."
              },
              battery: {
                title: "Rafhlöðupróf.",
                content: "Við framkvæmum kerfiskönnun á bílnum þar sem hugsanlegir villukóðar á rafhlöðu eða rafmótori koma í ljós."
              },
              chassis: {
                title: "Undirstellning og hjólupphengi.",
                content: "Athugun á höggdempum, gornum, búningu og almennt ástand hjólupphengis og botnramma er skjalfest."
              },
              steering: {
                title: "Stýring.",
                content: "Eftirlit með stýrisstjórn, stýri, stýristöng og tengiarma."
              },
              climate: {
                title: "Hita- og loftræstikerfi.",
                content: "Athugun á hitunarbúnaði, loftconditioning, viftum og afísingu."
              },
              diagnosis: {
                title: "Greiningarpróf og villukóðar.",
                content: "Rafræn athugun á gagnakerfum bílsins og skráðir villukóðar með greiningarverkfærum."
              }
            }
          },
          whyNeeded: {
            title: "Hvers vegna þarftu ástandsskýrslu?",
            content1: "Allir bílar sem seldir eru með Kaggi eru keyptir af faglegum bílasölum. Bílasalar meta bíla öðruvísi en einkaaðilar og líta sérstaklega á þætti sem hafa áhrif á endursölu. Þess vegna verða auglýsingarnar sem settar eru út að vera nákvæmari og tæknilegar en dæmigerðar einkaaðilaauglýsingar á til dæmis Bland.is.",
            content2: "Forvitinn um hvenær þú ættir að selja bílinn þinn?"
          },
          vsEuControl: {
            title: "Hver er munurinn á ástandsskýrslu og ESB-eftirliti?", 
            content1: "Þessar prófanir eru öðruvísi en til dæmis ESB-viðurkenning og bera þess merki að allt við bílinn verður að vera prófað svo söluaðilar séu nægilega upplýstir um ástand bílsins. Ástandsskýrslan á að vera hlutlæg grunnur fyrir tilboðsrúnduna.",
            content2: "Söluaðilar líta ekki á auglýsingarnar með sömu augum og einkaaðilar og þurfa myndir af til dæmis rispum og göllum á móti fallegum, uppsettum myndum af bílnum eins og dæmigerð bílaauglýsing hefur. Ástandsskýrslan leggur grunninn að tilboðsrúndu sem við keyrum fyrir þig."
          },
          importance: {
            title: "Hvers vegna er ástandsskýrslan svo mikilvæg:",
            safety: {
              title: "Öryggi fyrir báða aðila.",
              content: "Þegar ytri, óháður aðili hefur farið yfir bílinn vita bæði þú og söluaðilar hvað þið eruð með að gera. Engar óvæntar uppákomur."
            },
            price: {
              title: "Raunhæfara verð.",
              content: "Góð skýrsla fjarlægir óvissu hjá kaupendum. Því skýrari skjölin eru, því öruggari eru söluaðilarnir og því hærra geta þeir boðið."
            },
            risk: {
              title: "Minni áhætta eftir sölu.",
              content: "Það getur verið erfitt að vita hvaða ástand bíllinn þinn er í. Þegar maður hefur farið í gegnum ástandsskýrslu gefur það þér innsýn í verðmæti bílsins og hvað gæti hugsanlega verið grundvöllur fyrir kvörtunum í kjölfar sölunnar. Selur þú með Kaggi þarftu ekki að hugsa um reklamasjonsábyrgðina - við tökum við henni."
            },
            note: "Vissirðu að bíllinn stendur á prófunarmiðstöðinni meðan tilboðsrúndan stendur yfir? Þetta gerum við til að tryggja að ástand bílsins í tilboðsrúndu sé nákvæmlega það sama og í ástandsskýrslunni."
          },
          beforeTest: {
            title: "Hvað verður þú að gera áður en bíllinn fer í próf?",
            intro: "Áður en þú getur skilað lyklunum verður þú að ganga úr skugga um að þetta sé til staðar:",
            keys: "Allir lyklar skulu afhentir saman",
            tollDevice: "Bombabrík skal tekin úr bílnum", 
            extraWheels: "Aukahjólasett skulu liggja í bílnum",
            hatShelf: "Ef þú ert með hattuhillu skal hún liggja í bílnum",
            serviceBook: "Þjónustubók skal liggja í farþegasætinu",
            papers: "Öll pappír sem eru ekki í þjónustubókinni ertu sem eigandi ábyrgur fyrir að taka mynd af og senda á netfang kaggi@kaggi.is",
            reminder: "Mundu: bíllinn skal vera tilbúinn til prófs þegar þú afhendir hann/hann er sóttur",
            conclusion: "Ófullkomin afhending getur seinkað ferlinu og gefið minni áhuga í tilboðsrúndu. Snyrtilegur fyrsti áhrif skipta máli fyrir söluna: afhentu bílinn hreinn og presentable. Mundu að þetta getur verið síðast þegar þú sérð bílinn - eftir prófun er hann settur út í tilboðsrúndu og þú færð beschjed þegar tilboð fara að berast."
          },
          cost: {
            title: "Hvað kostar ástandsskýrsla?",
            content: "Í stuttu máli? Ekkert. Þegar þú selur bílinn með Kaggi dekka við bæði ástandsskýrslu, ljósmyndun og auglýsingar bílsins þíns. Þú borgar ekkert úr eigin vasa, jafnvel þótt þú veljir að selja ekki."
          },
          canBuy: {
            title: "Get ég keypt ástandsskýrsluna?",
            content: "Já, það getur þú. Ástandsskýrslan kostar 30.000 krónur og er fínt verkfæri til að nota ef þú vilt selja bílinn í einkaeigu. Ef þú hafnar eftir tilboðsrúnduna getur þú keypt ástandsskýrsluna til að nota við einkasölu. Þá hefur þú og hugsanlegir kaupendur mjög ítarlegt yfirlit yfir ástand bílsins og þú færð upplýst um alla þætti bílsins í samræmi við upplýsingaskyldu."
          },
          disclosureObligation: {
            title: "Hvað er upplýsingaskylda við bílasölu?",
            content1: "Upplýsingaskylda þýðir að þú sem seljandi hefur ábyrgð á að veita heiðarlegar og réttar upplýsingar um bílinn sem þú selur - sérstaklega um galla eða galla sem þú veist um. Þetta á við hvort sem þú selur bílinn í einkaeigu eða í gegnum Kaggi.",
            content2: "Munurinn er sá að þegar bíllinn er prófaður í gegnum óháðan aðila eins og NAF eða Viking Kontroll verða mikið af þessum upplýsingum skjalfestar fyrir þig. Það gerir það auðveldara að uppfylla upplýsingaskyldu á sama tíma og það gefur öryggi bæði fyrir þig og þann sem íhugar að kaupa bílinn þinn. Þegar þú selur notaðan bíl ertu löglega skuldbundinn til að veita heiðarlegar og fullkomnar upplýsingar um ástand og sögu bílsins - eins vel og þú þekkir það. Það snýst ekki um að vita allt eins og bílvirkur heldur um að halda ekki eftir upplýsingum sem þú þekkir sem geta verið mikilvægar fyrir ástand bílsins og mikilvægt fyrir kaupandann að vita um."
          },
          holdingBackInfo: {
            title: "Hvað gerist ef maður heldur eftir upplýsingum við bílasölu?",
            content1: "Þegar þú selur bíl eru tvö hlutir sem þú verður að taka tillit til; upplýsingaskylda og reklamasjonsábyrgð.",
            content2: "Ef þú viðheldur ekki upplýsingaskyldu við sölu bíla getur það fengið afleiðingar í allt að tvö ár eftir söluna. Heldur þú eftir upplýsingum og það kemur síðar í ljós að bíllinn hefur galla sem þú hefðir átt að segja frá getur það fengið afleiðingar í formi reklamasjonsábyrgðar eins og til dæmis:",
            consequence1: "Kaupandi getur átt rétt á að riftir kaupunum",
            consequence2: "Kaupandi getur krafist verðlækkunar",
            consequence3: "Þú getur orðið skaðabætaskyldur",
            conclusion: "Þetta leysir þig ekki undan reklamasjonsábyrgð en þeir hanga þétt saman. Því betri og heiðarlegri upplýsingar sem þú gefur fyrir söluna, því minni áhætta er fyrir reklamasjon í kjölfarið. Selur þú með Kaggi sleppur þú að hugsa um reklamasjonsábyrgðina - við tökum hana!"
          },
          howItWorks: {
            title: "Hvernig fer ástandsskýrslan fram þegar þú selur með Kaggi?",
            content1: "Eftir að þú hefur skráð bílinn þinn á Kaggi.is getur þú bókað próf hjá NAF eða Viking Kontroll. Þetta getur þú gert sjálfur eða þú getur fengið hjálp frá einum af okkar viðskiptavinaráðgjöfum. Þá er bara að afhenda bílinn á prófunarmiðstöðinni daginn fyrir próf og setja lyklana í lyklakassann fyrir utan."
          },
          pickup: {
            title: "Við getum sótt bílinn heim til þín - algjörlega ókeypis",
            content: "Býrðu í einni af stóru borgum Íslands eða svæðunum í kring getum við sótt bílinn heim til þín svo þú þurfir ekki að afhenda hann sjálfur. Í Stór-Reykjavík, Akureyri, og öðrum stórum bæjum bjóðum við ókeypis söfnun bílsins.",
            howItWorks: "Svona virkar það:",
            step1: "Pantaðu söfnun þegar þú bókar tíma eða talar við viðskiptavinaráðgjafa",
            step2: "Við semjum um tíma fyrir söfnun",
            step3: "Bíllinn er fluttur á prófunarmiðstöðina á öruggan og faglegan hátt. Þegar við flytjum bílinn fyrir þig er hann tryggður hjá okkur",
            step4: "Bíllinn er afhentur til prófs og þú getur fylgst með tilboðsrúndu úr símanum þínum"
          },
          whyNeeded: {
            title: "Why do you need a condition report?",
            content1: "All cars sold with Kaggi are bought by professional car dealers. Car dealers evaluate cars differently than private individuals and look especially at factors that affect resale. Therefore, the ads that are posted must be more detailed and technical than typical private ads on for example Bland.is.",
            content2: "Wondering when you should sell your car?"
          },
          vsEuControl: {
            title: "What is the difference between a condition report and EU control?",
            content1: "These tests are different than for example EU approval and bear the mark that everything about the car must be tested so that dealers are sufficiently informed about the car's condition. The condition report should be an objective basis for the bidding round.",
            content2: "Dealers don't look at ads with the same eyes as private individuals and need pictures of for example scratches and defects versus nice, staged pictures of the car like a typical car ad has. The condition report lays the foundation for the bidding round we run for you."
          },
          importance: {
            title: "Why the condition report is so important:",
            safety: {
              title: "Safety for both parties.",
              content: "When an external, independent actor has gone over the car, both you and the dealers know what you are dealing with. No surprises."
            },
            price: {
              title: "More realistic price.",
              content: "A good report removes uncertainty among buyers. The clearer the documentation, the safer the dealers are, and the higher they can bid."
            },
            risk: {
              title: "Less risk after sale.",
              content: "It can be difficult to know what condition your car is in. When you have gone through a condition report, it gives you insight into the car's value and what could potentially be grounds for complaints following the sale. If you sell with Kaggi, you don't need to think about the complaint liability - we take care of it."
            },
            note: "Did you know that the car stands at the test center while the bidding round is ongoing? We do this to ensure that the car's condition during the bidding round is exactly the same as in the condition report."
          },
          beforeTest: {
            title: "What must you do before the car goes for testing?",
            intro: "Before you can hand over the keys, you must ensure that this is in place:",
            keys: "All keys must be delivered together",
            tollDevice: "Toll device must be removed from the car",
            extraWheels: "Extra wheel set must be in the car", 
            hatShelf: "If you have a hat shelf, it should be in the car",
            serviceBook: "Service book should be in the passenger seat",
            papers: "All papers that are not in the service book, you as owner are responsible for photographing and sending by email to kaggi@kaggi.is",
            reminder: "Remember: the car should be ready for testing when you deliver it/it is picked up",
            conclusion: "An incomplete delivery can delay the process and give less interest in the bidding round. A neat first impression matters for the sale: deliver the car clean and presentable. Remember that this may be the last time you see the car - after testing it is put up for bidding, and you will be notified when bids start coming in."
          },
          cost: {
            title: "What does a condition report cost?",
            content: "In short? Nothing. When you sell the car with Kaggi, we cover both condition report, photography and advertising of your car. You pay nothing out of your own pocket, even if you choose not to sell."
          },
          canBuy: {
            title: "Can I buy the condition report?",
            content: "Yes, you can. The condition report costs 30,000 ISK and is a nice tool to use if you want to sell the car privately. If you decline after the bidding round, you can buy the condition report to use for private sale. Then you and potential buyers have a very thorough overview of the car's condition and you get informed about all factors of the car in accordance with disclosure obligations."
          },
          disclosureObligation: {
            title: "What is disclosure obligation in car sales?",
            content1: "Disclosure obligation means that you as a seller have responsibility to give honest and correct information about the car you are selling - especially about defects or flaws you know about. This applies whether you sell the car privately or through Kaggi.",
            content2: "The difference is that when the car is tested through an independent party like NAF or Viking Kontroll, much of this information becomes documented for you. It makes it easier to fulfill disclosure obligations while giving security for both you and whoever is considering buying your car. When you sell a used car, you are legally obligated to give honest and complete information about the car's condition and history - as well as you know it. It's not about knowing everything like a car mechanic, but about not holding back information you know that may be important for the car's condition and important for the buyer to know about."
          },
          holdingBackInfo: {
            title: "What happens if you hold back information in car sales?",
            content1: "When you sell a car there are two things you must consider; disclosure obligation and complaint liability.",
            content2: "If you do not maintain disclosure obligation when selling cars, it can have consequences for up to two years after the sale. If you hold back information and it later turns out that the car has a defect you should have told about, it can have consequences in the form of complaint liability such as:",
            consequence1: "Buyer may have the right to cancel the purchase",
            consequence2: "Buyer may demand price reduction", 
            consequence3: "You may become liable for damages",
            conclusion: "This does not exempt you from complaint liability, but they are closely connected. The better and more honest information you give before the sale, the less risk there is for complaints afterwards. If you sell with Kaggi, you avoid thinking about complaint liability - we take it!"
          },
          howItWorks: {
            title: "How does the condition report work when you sell with Kaggi?",
            content1: "After you have registered your car on Kaggi.is, you can book a test at NAF or Viking Kontroll. You can do this yourself or you can get help from one of our customer advisors. Then you just deliver the car to the test center the day before testing and put the keys in the key box outside."
          },
          pickup: {
            title: "We can pick up the car at your home - completely free",
            content: "If you live in one of the big cities in Iceland or the areas around, we can pick up the car at your home so you don't have to deliver it yourself. In Greater Reykjavik, Akureyri, and other large towns we offer free car pickup.",
            howItWorks: "This is how it works:",
            step1: "Order pickup when you book time or talk to customer advisor",
            step2: "We arrange time for pickup",
            step3: "The car is transported to the test center safely and professionally. When we transport the car for you, it is covered by our insurance",
            step4: "The car is delivered for testing and you can follow the bidding round from your phone"
          },
          whyNeeded: {
            title: "Why do you need a condition report?",
            content1: "All cars sold with Kaggi are bought by professional car dealers. Car dealers evaluate cars differently than private individuals and look especially at factors that affect resale. Therefore, the ads that are posted must be more detailed and technical than typical private ads on for example Bland.is.",
            content2: "Wondering when you should sell your car?"
          },
          vsEuControl: {
            title: "What is the difference between a condition report and EU control?",
            content1: "These tests are different than for example EU approval and bear the mark that everything about the car must be tested so that dealers are sufficiently informed about the car's condition. The condition report should be an objective basis for the bidding round.",
            content2: "Dealers don't look at ads with the same eyes as private individuals and need pictures of for example scratches and defects versus nice, staged pictures of the car like a typical car ad has. The condition report lays the foundation for the bidding round we run for you."
          },
          importance: {
            title: "Why the condition report is so important:",
            safety: {
              title: "Safety for both parties.",
              content: "When an external, independent actor has gone over the car, both you and the dealers know what you are dealing with. No surprises."
            },
            price: {
              title: "More realistic price.",
              content: "A good report removes uncertainty among buyers. The clearer the documentation, the safer the dealers are, and the higher they can bid."
            },
            risk: {
              title: "Less risk after sale.",
              content: "It can be difficult to know what condition your car is in. When you have gone through a condition report, it gives you insight into the car's value and what could potentially be grounds for complaints following the sale. If you sell with Kaggi, you don't need to think about the complaint liability - we take care of it."
            },
            note: "Did you know that the car stands at the test center while the bidding round is ongoing? We do this to ensure that the car's condition during the bidding round is exactly the same as in the condition report."
          },
          beforeTest: {
            title: "What must you do before the car goes for testing?",
            intro: "Before you can hand over the keys, you must ensure that this is in place:",
            keys: "All keys must be delivered together",
            tollDevice: "Toll device must be removed from the car",
            extraWheels: "Extra wheel set must be in the car", 
            hatShelf: "If you have a hat shelf, it should be in the car",
            serviceBook: "Service book should be in the passenger seat",
            papers: "All papers that are not in the service book, you as owner are responsible for photographing and sending by email to kaggi@kaggi.is",
            reminder: "Remember: the car should be ready for testing when you deliver it/it is picked up",
            conclusion: "An incomplete delivery can delay the process and give less interest in the bidding round. A neat first impression matters for the sale: deliver the car clean and presentable. Remember that this may be the last time you see the car - after testing it is put up for bidding, and you will be notified when bids start coming in."
          },
          cost: {
            title: "What does a condition report cost?",
            content: "In short? Nothing. When you sell the car with Kaggi, we cover both condition report, photography and advertising of your car. You pay nothing out of your own pocket, even if you choose not to sell."
          },
          canBuy: {
            title: "Can I buy the condition report?",
            content: "Yes, you can. The condition report costs 30,000 ISK and is a nice tool to use if you want to sell the car privately. If you decline after the bidding round, you can buy the condition report to use for private sale. Then you and potential buyers have a very thorough overview of the car's condition and you get informed about all factors of the car in accordance with disclosure obligations."
          },
          disclosureObligation: {
            title: "What is disclosure obligation in car sales?",
            content1: "Disclosure obligation means that you as a seller have responsibility to give honest and correct information about the car you are selling - especially about defects or flaws you know about. This applies whether you sell the car privately or through Kaggi.",
            content2: "The difference is that when the car is tested through an independent party like NAF or Viking Kontroll, much of this information becomes documented for you. It makes it easier to fulfill disclosure obligations while giving security for both you and whoever is considering buying your car. When you sell a used car, you are legally obligated to give honest and complete information about the car's condition and history - as well as you know it. It's not about knowing everything like a car mechanic, but about not holding back information you know that may be important for the car's condition and important for the buyer to know about."
          },
          holdingBackInfo: {
            title: "What happens if you hold back information in car sales?",
            content1: "When you sell a car there are two things you must consider; disclosure obligation and complaint liability.",
            content2: "If you do not maintain disclosure obligation when selling cars, it can have consequences for up to two years after the sale. If you hold back information and it later turns out that the car has a defect you should have told about, it can have consequences in the form of complaint liability such as:",
            consequence1: "Buyer may have the right to cancel the purchase",
            consequence2: "Buyer may demand price reduction", 
            consequence3: "You may become liable for damages",
            conclusion: "This does not exempt you from complaint liability, but they are closely connected. The better and more honest information you give before the sale, the less risk there is for complaints afterwards. If you sell with Kaggi, you avoid thinking about complaint liability - we take it!"
          },
          howItWorks: {
            title: "How does the condition report work when you sell with Kaggi?",
            content1: "After you have registered your car on Kaggi.is, you can book a test at NAF or Viking Kontroll. You can do this yourself or you can get help from one of our customer advisors. Then you just deliver the car to the test center the day before testing and put the keys in the key box outside."
          },
          pickup: {
            title: "We can pick up the car at your home - completely free",
            content: "If you live in one of the big cities in Iceland or the areas around, we can pick up the car at your home so you don't have to deliver it yourself. In Greater Reykjavik, Akureyri, and other large towns we offer free car pickup.",
            howItWorks: "This is how it works:",
            step1: "Order pickup when you book time or talk to customer advisor",
            step2: "We arrange time for pickup",
            step3: "The car is transported to the test center safely and professionally. When we transport the car for you, it is covered by our insurance",
            step4: "The car is delivered for testing and you can follow the bidding round from your phone"
          },
          whyNeeded: {
            title: "Hvers vegna þarftu ástandsskýrslu?",
            content1: "Allir bílar sem seldir eru með Kaggi eru keyptir af faglegum bílasölum. Bílasalar meta bíla öðruvísi en einkaaðilar og líta sérstaklega á þætti sem hafa áhrif á endursölu. Þess vegna verða auglýsingarnar sem settar eru út að vera nákvæmari og tæknilegar en dæmigerðar einkaaðilaauglýsingar á til dæmis Bland.is.",
            content2: "Forvitinn um hvenær þú ættir að selja bílinn þinn?"
          },
          vsEuControl: {
            title: "Hver er munurinn á ástandsskýrslu og ESB-eftirliti?", 
            content1: "Þessar prófanir eru öðruvísi en til dæmis ESB-viðurkenning og bera þess merki að allt við bílinn verður að vera prófað svo söluaðilar séu nægilega upplýstir um ástand bílsins. Ástandsskýrslan á að vera hlutlæg grunnur fyrir tilboðsrúnduna.",
            content2: "Söluaðilar líta ekki á auglýsingarnar með sömu augum og einkaaðilar og þurfa myndir af til dæmis rispum og göllum á móti fallegum, uppsettum myndum af bílnum eins og dæmigerð bílaauglýsing hefur. Ástandsskýrslan leggur grunninn að tilboðsrúndu sem við keyrum fyrir þig."
          },
          importance: {
            title: "Hvers vegna er ástandsskýrslan svo mikilvæg:",
            safety: {
              title: "Öryggi fyrir báða aðila.",
              content: "Þegar ytri, óháður aðili hefur farið yfir bílinn vita bæði þú og söluaðilar hvað þið eruð með að gera. Engar óvæntar uppákomur."
            },
            price: {
              title: "Raunhæfara verð.",
              content: "Góð skýrsla fjarlægir óvissu hjá kaupendum. Því skýrari skjölin eru, því öruggari eru söluaðilarnir og því hærra geta þeir boðið."
            },
            risk: {
              title: "Minni áhætta eftir sölu.",
              content: "Það getur verið erfitt að vita hvaða ástand bíllinn þinn er í. Þegar maður hefur farið í gegnum ástandsskýrslu gefur það þér innsýn í verðmæti bílsins og hvað gæti hugsanlega verið grundvöllur fyrir kvörtunum í kjölfar sölunnar. Selur þú með Kaggi þarftu ekki að hugsa um reklamasjonsábyrgðina - við tökum við henni."
            },
            note: "Vissirðu að bíllinn stendur á prófunarmiðstöðinni meðan tilboðsrúndan stendur yfir? Þetta gerum við til að tryggja að ástand bílsins í tilboðsrúndu sé nákvæmlega það sama og í ástandsskýrslunni."
          },
          beforeTest: {
            title: "Hvað verður þú að gera áður en bíllinn fer í próf?",
            intro: "Áður en þú getur skilað lyklunum verður þú að ganga úr skugga um að þetta sé til staðar:",
            keys: "Allir lyklar skulu afhentir saman",
            tollDevice: "Bombabrík skal tekin úr bílnum", 
            extraWheels: "Aukahjólasett skulu liggja í bílnum",
            hatShelf: "Ef þú ert með hattuhillu skal hún liggja í bílnum",
            serviceBook: "Þjónustubók skal liggja í farþegasætinu",
            papers: "Öll pappír sem eru ekki í þjónustubókinni ertu sem eigandi ábyrgur fyrir að taka mynd af og senda á netfang kaggi@kaggi.is",
            reminder: "Mundu: bíllinn skal vera tilbúinn til prófs þegar þú afhendir hann/hann er sóttur",
            conclusion: "Ófullkomin afhending getur seinkað ferlinu og gefið minni áhuga í tilboðsrúndu. Snyrtilegur fyrsti áhrif skipta máli fyrir söluna: afhentu bílinn hreinn og presentable. Mundu að þetta getur verið síðast þegar þú sérð bílinn - eftir prófun er hann settur út í tilboðsrúndu og þú færð beschjed þegar tilboð fara að berast."
          },
          cost: {
            title: "Hvað kostar ástandsskýrsla?",
            content: "Í stuttu máli? Ekkert. Þegar þú selur bílinn með Kaggi dekka við bæði ástandsskýrslu, ljósmyndun og auglýsingar bílsins þíns. Þú borgar ekkert úr eigin vasa, jafnvel þótt þú veljir að selja ekki."
          },
          canBuy: {
            title: "Get ég keypt ástandsskýrsluna?",
            content: "Já, það getur þú. Ástandsskýrslan kostar 30.000 krónur og er fínt verkfæri til að nota ef þú vilt selja bílinn í einkaeigu. Ef þú hafnar eftir tilboðsrúnduna getur þú keypt ástandsskýrsluna til að nota við einkasölu. Þá hefur þú og hugsanlegir kaupendur mjög ítarlegt yfirlit yfir ástand bílsins og þú færð upplýst um alla þætti bílsins í samræmi við upplýsingaskyldu."
          },
          disclosureObligation: {
            title: "Hvað er upplýsingaskylda við bílasölu?",
            content1: "Upplýsingaskylda þýðir að þú sem seljandi hefur ábyrgð á að veita heiðarlegar og réttar upplýsingar um bílinn sem þú selur - sérstaklega um galla eða galla sem þú veist um. Þetta á við hvort sem þú selur bílinn í einkaeigu eða í gegnum Kaggi.",
            content2: "Munurinn er sá að þegar bíllinn er prófaður í gegnum óháðan aðila eins og NAF eða Viking Kontroll verða mikið af þessum upplýsingum skjalfestar fyrir þig. Það gerir það auðveldara að uppfylla upplýsingaskyldu á sama tíma og það gefur öryggi bæði fyrir þig og þann sem íhugar að kaupa bílinn þinn. Þegar þú selur notaðan bíl ertu löglega skuldbundinn til að veita heiðarlegar og fullkomnar upplýsingar um ástand og sögu bílsins - eins vel og þú þekkir það. Það snýst ekki um að vita allt eins og bílvirkur heldur um að halda ekki eftir upplýsingum sem þú þekkir sem geta verið mikilvægar fyrir ástand bílsins og mikilvægt fyrir kaupandann að vita um."
          },
          holdingBackInfo: {
            title: "Hvað gerist ef maður heldur eftir upplýsingum við bílasölu?",
            content1: "Þegar þú selur bíl eru tvö hlutir sem þú verður að taka tillit til; upplýsingaskylda og reklamasjonsábyrgð.",
            content2: "Ef þú viðheldur ekki upplýsingaskyldu við sölu bíla getur það fengið afleiðingar í allt að tvö ár eftir söluna. Heldur þú eftir upplýsingum og það kemur síðar í ljós að bíllinn hefur galla sem þú hefðir átt að segja frá getur það fengið afleiðingar í formi reklamasjonsábyrgðar eins og til dæmis:",
            consequence1: "Kaupandi getur átt rétt á að riftir kaupunum",
            consequence2: "Kaupandi getur krafist verðlækkunar",
            consequence3: "Þú getur orðið skaðabætaskyldur",
            conclusion: "Þetta leysir þig ekki undan reklamasjonsábyrgð en þeir hanga þétt saman. Því betri og heiðarlegri upplýsingar sem þú gefur fyrir söluna, því minni áhætta er fyrir reklamasjon í kjölfarið. Selur þú með Kaggi sleppur þú að hugsa um reklamasjonsábyrgðina - við tökum hana!"
          },
          howItWorks: {
            title: "Hvernig fer ástandsskýrslan fram þegar þú selur með Kaggi?",
            content1: "Eftir að þú hefur skráð bílinn þinn á Kaggi.is getur þú bókað próf hjá NAF eða Viking Kontroll. Þetta getur þú gert sjálfur eða þú getur fengið hjálp frá einum af okkar viðskiptavinaráðgjöfum. Þá er bara að afhenda bílinn á prófunarmiðstöðinni daginn fyrir próf og setja lyklana í lyklakassann fyrir utan."
          },
          pickup: {
            title: "Við getum sótt bílinn heim til þín - algjörlega ókeypis",
            content: "Býrðu í einni af stóru borgum Íslands eða svæðunum í kring getum við sótt bílinn heim til þín svo þú þurfir ekki að afhenda hann sjálfur. Í Stór-Reykjavík, Akureyri, og öðrum stórum bæjum bjóðum við ókeypis söfnun bílsins.",
            howItWorks: "Svona virkar það:",
            step1: "Pantaðu söfnun þegar þú bókar tíma eða talar við viðskiptavinaráðgjafa",
            step2: "Við semjum um tíma fyrir söfnun",
            step3: "Bíllinn er fluttur á prófunarmiðstöðina á öruggan og faglegan hátt. Þegar við flytjum bílinn fyrir þig er hann tryggður hjá okkur",
            step4: "Bíllinn er afhentur til prófs og þú getur fylgst með tilboðsrúndu úr símanum þínum"
          },
          cta: {
            button: "Fá verðmat núna"
          }
        }
      }
    },
    tips: {
      hero: {
        title: "Info and tips for car owners",
        subtitle: "You as a car owner can find our best tips here."
      },
      categories: {
        sellCar: {
          title: "Sell car",
          desc: "Read our articles about selling cars"
        },
        maintenance: {
          title: "Maintenance",
          desc: "Tips and advice for maintaining your car"
        },
        stories: {
          title: "Customer stories",
          desc: "Read our customer stories"
        }
      },
      latestArticles: {
        title: "Latest articles"
      },
      articles: {
        article1: {
          title: "How to sell a car abroad? This is what you need to know",
          desc: "Are you considering selling your car abroad? Maybe you've heard that cars can be worth more outside Iceland or received offers from foreign buyers? In this article, we go through what you need to know before you start selling your car internationally, what pitfalls...",
          category: "Sell car"
        },
        article2: {
          title: "Liability for complaints when selling a car: What does it mean and how do you avoid trouble?",
          desc: "Did you know that as a private seller you can face liability for complaints for up to two years after you have sold your car? This means that the buyer can make claims against you, even long after the sale. In this guide, we go through what liability for complaints means, how it can affect you and what you can do to avoid the risk...",
          category: "Sell car"
        },
        article3: {
          title: "What is a condition report and why do you need one when you're going to sell your car?",
          desc: "Accurately assessing the condition of the car can be overwhelming. Netbil has therefore made it simple for you. We issue a detailed and independent condition report at one of our partners, NAF or Viking Kontroll. The condition report gives us, you and potential buyers a comprehensive picture of the car's condition, and forms the basis for fair and transparent pricing, where all information about the car is accessible.",
          category: "Sell car"
        }
      },
      customerStories: {
        title: "Customer stories"
      },
      stories: {
        story1: {
          title: "Lars sold the car from his sofa in Bærum",
          desc: "Selling a car can be both simple and effective - whether you have a new car in mind or just want to get rid of the car. And the profit? Far above expectations, says Lars from Bærum who recently sold his car with Netbil."
        },
        story2: {
          title: "We shared a car on the TV show Best in Show",
          desc: "What happens when humor, surprises and a car come together? We got the answer when we shared a nice Peugeot 3008 on the TV show Best in Show, where Else Kåss Furuseth accompanied the countrymen through the most entertaining moments."
        },
        story3: {
          title: "Nina: - Good offer, just ask yourself",
          desc: "Nina delivered her old car to NAF in the morning. Later that day she received an offer on the car, and a few days later the money was in the account. - Netbil was perfect for me, says Nina."
        }
      },
      cta: {
        title: "Get started with simple car sales",
        subtitle: "It has never been easier to sell a car. Deliver the car and we'll do the rest.",
        licensePlate: "License plate",
        mileage: "Mileage",
        button: "Get started"
      },
      breadcrumb: {
        tips: "Car tips"
      },
      articleDetails: {
        sellAbroad: {
          title: "How to sell a car abroad? This is what you need to know",
          category: "Sell car",
          intro: "Are you considering selling your car abroad? Maybe you've heard that cars can be worth more outside Iceland or received offers from foreign buyers? In this article, we go through what you need to know before you start selling your car internationally, what pitfalls you should avoid and how you can get the best price as an export car by selling through Kaggi.",
          canSell: {
            title: "Can you sell a car abroad?",
            content: "Yes, it is perfectly legal to sell a car abroad, either to private individuals or through professionals. You can for example sell directly to a buyer abroad or use Kaggi to reach Icelandic car dealers who specialize in export. These dealers handle regulations, documentation and logistics, so you don't have to worry about it yourself."
          },
          netbilNetwork: {
            title: "Kaggi - network of dealers and exporters",
            content: "When you sell your car with Kaggi, it is offered in a digital auction to over 2000 car dealers throughout the country. Many of these dealers specialize in export and buy cars that they plan to sell onwards to buyers abroad. This means you get more actual offers, including from those who know exactly what your car is worth in foreign markets."
          },
          directSales: {
            title: "Direct sales abroad - advantages and disadvantages",
            intro: "If you want to sell your car directly to private buyers abroad, that's also an option. However, it requires much more from you as a seller:",
            advantages: {
              title: "Advantages of selling car abroad",
              point1: "You can potentially get a better price, especially if the car is sought after in the buyer's home country",
              point2: "You have full control over the sale"
            },
            disadvantages: {
              title: "Disadvantages of selling car abroad",
              point1: "You have to arrange export papers and transport yourself",
              point2: "You have to send sale notification, but the car should not be registered in Iceland and this requires extra documentation",
              point3: "You can become liable for defects or complaints, especially if you have not specified all defects clearly",
              point4: "More complicated payment solutions for payments to foreign countries"
            },
            conclusion: "If you sell your car with Kaggi, you don't have to think about all this - we take care of everything. We handle the auction, contract, loan transfer (if applicable) and send the sale notification for you. All you need to do is sign the contract. The money arrives in your account within a few business days."
          },
          popularCars: {
            title: "What cars are most popular in the export market?",
            intro: "Three types of cars are particularly sought after by exporters: older electric cars, powerful SUVs and used Teslas.",
            tesla: {
              title: "Tesla with free charging.",
              content: "Some older Tesla models have lifetime free access to Tesla's Supercharger network, which makes it possible to charge for free at their charging stations around the world. This offer is no longer available for new cars and makes these older Tesla models very sought after as this benefit remains. In many countries, especially in Eastern Europe, this is extremely important."
            },
            oldElectric: {
              content: "Electric cars that no longer meet EU approval requirements in Iceland. Some older electric car models no longer meet the requirements for EU approval in Iceland but can still be sought after in other countries. In Eastern Europe there is a large market for these cars as they are still legal to operate and cheap to maintain."
            },
            suv: {
              content: "Powerful SUVs and pickups. Cars like Toyota Land Cruiser, Mitsubishi Pajero and Toyota Hilux are popular in countries with difficult conditions like Ukraine and neighboring countries. These cars are known for durability and good off-road capabilities and are often sought after by humanitarian organizations, farmers and construction companies. These cars are especially in demand for work in Ukraine due to the current situation in the region."
            }
          },
          currency: {
            title: "The exchange rate also affects the export market",
            content: "When the Icelandic krona is weak, cars bought in Iceland become cheaper for foreign buyers. For example, 100 Danish kroner are now worth about 160 Icelandic kroner - which makes Icelandic used cars much more attractive for export to Denmark. The same is seen in times when the euro is strong against the krona, where car sales to Germany, Spain and other countries using euros become much more favorable."
          },
          exportTaxes: {
            title: "Export duties and taxes - what do you need to watch out for?",
            intro: "In most cases there are no special export duties when selling a car from Iceland. But here are some things you need to know:",
            point1: "If you sell as a private person, no VAT or export duties apply",
            point2: "If you run a business with buying and selling as main activity, you must report the sale to the Tax Authority",
            point3: "For export, no VAT or export duties are required, but the buyer abroad may have to pay import duties in their country/import country",
            point4: "Transport costs usually need to be paid by the buyer, but this should be clarified in advance",
            recommendation: "To avoid misunderstandings and ensure you don't become financially liable afterwards, we recommend using professional services like Kaggi."
          },
          whyNetbil: {
            title: "Why choose Kaggi?",
            intro: "With Kaggi you avoid all the complicated stuff that comes with car sales. You don't need to take photos, write ads or negotiate prices - you avoid all that and still get maximum price for your car. All you need to do is register and wait for results. The money comes to your account within a few business days.",
            point1: "Professional dealers (and exporters) bid on your car. This leads to competition and can drive up the price",
            point2: "You can follow the auction in real time and decide yourself whether you want to accept the highest bid",
            point3: "It is free and non-binding to sell a car with Kaggi. You pay nothing out of your own pocket",
            point4: "We handle sale documents, contract and loan transfer if you have it",
            point5: "We take over the complaint liability so you don't have to think about it"
          },
          cta: {
            button: "Get price estimate now"
          }
        },
        liability: {
          title: "Liability for complaints when selling a car: What does it mean and how do you avoid it?",
          category: "Sell car",
          intro: "Did you know that as a private seller you can face liability for complaints for up to two years after selling your car? This means that the buyer can make claims against you, even long after the sale.",
          introDetail: "In this guide we go through what liability for complaints means, how it can affect you and what you can do to avoid the risk. We also explain how we take over the liability so you can sell your car safely and without worry.",
          whatIs: {
            title: "What is liability for complaints?",
            content1: "When you sell a car as a private individual, the sale is governed by the Sale of Goods Act. The law gives the buyer the right to complain if the car has defects that were not disclosed at the time of sale. This applies even if the seller was honest and did not know about the defect.",
            content2: "According to the Sale of Goods Act §27 and §32, the liability for complaints lasts for 1 year from the delivery date. This means that the buyer can contact you for a long time after the sale and in the worst case you may have to pay for repairs or possibly even buy the car back."
          },
          vsRights: {
            title: "Liability for complaints vs. right to complain",
            content: "These are two sides of the same issue. The right to complain is the right the buyer has to complain about the car if it proves to be defective, while liability for complaints is the seller's obligation to fix these defects or possibly pay compensation."
          },
          vsWarranty: {
            title: "What is the difference between liability for complaints and warranty?",
            content1: "A warranty is an agreement between seller and buyer and it is not legally required. A warranty can have specific conditions in the agreement that are better than the complaint rights. The warranty can give you the right to repair, exchange or money back, beyond what is legally required.",
            content2: "It is important to examine the warranty conditions before you buy. This is often something that applies to professionals or companies and is usually not included in sales between two private parties.",
            content3: "New consumer protection laws took effect on January 1, 2024 with updated provisions. Read more about the laws on the Consumer Council website."
          },
          examples: {
            title: "Examples of liability for complaints",
            intro: "Here are some examples of common defects and complaints that buyers can make:",
            point1: "Engine failures that appear shortly after purchase",
            point2: "Hidden rust or previous collision damage",
            point3: "Electrical problems that were not discovered during inspection",
            point4: "Defects that the seller did not know about but the buyer believes they should have known",
            conclusion: "The point is: you don't necessarily have to have done anything wrong. The risk lies with you as the seller."
          },
          buyerRights: {
            title: "What can the buyer demand?",
            intro: "If it turns out that the car you sold has defects, the buyer can use their right to complain. This can include:",
            point1: "Repair",
            point2: "Price reduction",
            point3: "Exchange",
            point4: "Full purchase price refund",
            conclusion: "If you sell through Kaggi, we take responsibility for the car so you don't have to worry about this. We do a basic inspection of the car and take responsibility for ensuring that the buyer gets correct information about its condition and what it costs to fix any defects. This means we can take over the liability for complaints for you and you don't have to think about it!"
          },
          sellerImpact: {
            title: "How does liability for complaints affect you as a seller?",
            risk1: {
              title: "Financial risk.",
              content: "If the buyer complains and gets their claim upheld, you may have to pay part or all of the cost of repairs or in the worst case refund the entire purchase price."
            },
            risk2: {
              title: "Time waste and stress.",
              content: "You may need to communicate with the buyer, answer questions, discuss technical details or appear before the Consumer Council or courts. All this takes time and energy."
            },
            risk3: {
              title: "Uncertainty factor in sales process.",
              content: "Many end up pricing the car lower or becoming nervous in the sales process because they fear complaints later. This can make the sales process more difficult and you may miss out on a better price."
            }
          },
          limitLiability: {
            title: "What can you do to limit liability?",
            intro: "You can never completely avoid liability for complaints when selling to private parties, but you can reduce the risk by:",
            point1: "Being honest and open about the car's condition",
            point2: "Writing a detailed purchase agreement where you record all known defects",
            point3: "Asking for a signature on a condition report, for example from NAF or Viking Kontroll", 
            point4: "Documenting everything in writing, including delivery, contracts and transactions"
          },
          kaggiSolution: {
            title: "The simple solution: Sell with Kaggi – we take the liability for complaints",
            intro: "When you sell your car with Kaggi, we take over the entire sales process. This means that:",
            point1: "You are freed from all liability after the sale - including liability for complaints",
            point2: "We work as professional sellers and have direct communication with the buyer",
            point3: "You get your money quickly and safely, usually 1-2 days after the contract is signed",
            conclusion: "This gives you complete peace of mind compared to private sales. You don't have to fear phone calls from buyers or legal disputes."
          },
          priceImpact: {
            title: "What does this mean for the car's price?",
            intro: "Getting rid of liability for complaints is valuable - both in monetary terms and in terms of peace of mind. But it also has positive effects on the price:",
            point1: "When the car is sold through Kaggi, it is thoroughly tested by NAF or Viking Kontroll",
            point2: "Dealers bidding on your car know what they are getting - and dare to bid higher",
            point3: "You get a digital auction with over 2000 dealers competing to give you the best price",
            conclusion: "In other words: you get a fair price for your car without having to take risks."
          },
          cta: {
            button: "Get price estimate now"
          }
        },
        conditionReport: {
          title: "What is a condition report and why do you need one when you're going to sell your car?",
          category: "Sell car",
          intro: "Assessing the actual condition and value of the car can feel a bit overwhelming. What is the car actually worth? Is there something wrong that you don't know about? And what do you actually need to inform the buyer about?",
          introDetail: "That's exactly why we at Kaggi have made this simple for you, so you don't have to think about it. We conduct a thorough and independent test at one of our partners, NAF or Viking Kontroll. The condition report gives us, you and the dealers a clear picture of the car's condition and forms the basis for a fair and open bidding round where all information about the car is available.",
          whatIs: {
            title: "What is a condition report?",
            content: "A condition report is a technical and visual review of your car, performed by a professional. We work with the independent third parties NAF and Viking Kontroll to get an objective assessment of the car. The purpose is to document the actual condition of the car - both good and bad.",
            coversTitle: "The report covers among other things:",
            covers: {
              bodywork: {
                title: "Body and paint.",
                content: "Dents, scratches, stone chips, rust, and damage to doors, fenders, hood and roof are examined."
              },
              lights: {
                title: "Lights and electrical equipment.", 
                content: "Headlights, taillights, turn signals, brake lights, as well as function of electric windows, mirrors and other electrical equipment are tested."
              },
              wheels: {
                title: "Wheels and tires.",
                content: "Condition of tires, wear, tread depth and any damage to rims are documented."
              },
              brakes: {
                title: "Brakes.",
                content: "Check of brake pads, discs, pipes and hoses, as well as handbrake function."
              },
              engine: {
                title: "Engine and drivetrain.",
                content: "Visual and functional assessment of engine, gearbox, differential, axles and any leaks are documented."
              },
              battery: {
                title: "Battery test.",
                content: "We perform a system scan of the car where any error codes on battery or electric motor will appear."
              },
              chassis: {
                title: "Chassis and suspension.",
                content: "Check of shock absorbers, springs, bushings and general condition of suspension and subframe are documented."
              },
              steering: {
                title: "Steering.",
                content: "Control of power steering, steering wheel, tie rod and tie rod ends."
              },
              climate: {
                title: "Heating and air conditioning.",
                content: "Check of heater, air conditioning, fans and defroster."
              },
              diagnosis: {
                title: "Diagnostic test and error codes.",
                content: "Electronic check of the car's data systems and registered error codes via diagnostic tools."
              }
            }
          },
          cta: {
            button: "Get price estimate now"
          }
        },
        conditionReport: {
          title: "What is a condition report and why do you need one when you're going to sell your car?",
          category: "Sell car",
          intro: "Assessing the actual condition and value of the car can feel a bit overwhelming. What is the car actually worth? Is there something wrong that you don't know about? And what do you actually need to inform the buyer about?",
          introDetail: "That's exactly why we at Kaggi have made this simple for you, so you don't have to think about it. We conduct a thorough and independent test at one of our partners, NAF or Viking Kontroll. The condition report gives us, you and the dealers a clear picture of the car's condition and forms the basis for a fair and open bidding round where all information about the car is available.",
          cta: {
            button: "Get price estimate now"
          }
        }
      }
    },
    faq: {
      q1: { q: "Hvað get ég búist við að fá fyrir bílinn minn hjá Kaggi?", a: "Ef þú selur í gegnum okkur fer verðið fram í uppboði þar sem bílasalar geta boðið í bílinn þinn. Þú sem viðskiptavinur færð það verð sem hæstbjóðandi býður. Þannig mótast verðið á bílnum þínum á markaðsforsendum.\n\nMeð því að hafa marga bílasala frá mismunandi svæðum um landið eykst líkurnar á að finna þann sem getur selt bílinn þinn best. Til dæmis getur áhugi á jeppa verið meiri á landsbyggðinni en í borginni. Til samanburðar færðu aðeins eitt tilboð ef þú ferð í innbyttu hjá einum söluaðila." },
      q2: { q: "Hvað verður endanlegt verð?", a: "Endanlegt verð er hæsta tilboðið ef þú velur að samþykkja það. Við viljum að þú fáir besta mögulega verð fyrir bílinn þinn, en það er ástand bílsins og markaðurinn (bílasalarnir sem bjóða í bílinn) sem ákvarða hvað bíllinn þinn er virði." },
      q3: { q: "Er Kaggi ókeypis?", a: "Það er ókeypis að skrá sig á Kaggi og þú þarft ekki að borga fyrir þjónustuna ef þú velur að selja ekki bílinn eftir uppboðsrúnduna. Það er því ókeypis og án skuldbindinga að taka þátt í uppboðsrúndu á Kaggi.\n\nEf þú samþykkir tilboðið sem þú færð fyrir bílinn þinn greiðir þú sem seljandi ekkert út úr eigin vasa, en Kaggi tekur framlegð sem er dregin frá hæsta tilboði frá sölumanni sem vinnur uppboðsrúnduna. Framlegðin er breytileg frá 30.000 til 160.000 kr eftir virði bílsins. Framlegðin nær til kostnaðar okkar fyrir prófun, myndir, auglýsingar, stjórnsýslu, tilboðsöflun og ábyrgð vegna kvartana eftir sölu. Verðið sem þú sem seljandi sérð í uppboðsrúndunni er verðið sem þú færð greitt fyrir bílinn." },
      q4: { q: "Hvað er verðmatið fyrir bílinn byggt á?", a: "Við gerum verðmat út frá sölutölfræði sambærilegra bíla sem hafa selst hjá okkur ásamt mati frá reyndum ráðgjöfum okkar. Verðmatið byggir á því að þjónustubók hafi verið fylgt og að bíllinn sé í góðu ástandi miðað við aldur. Verðmatið gildir fyrir sölu til bílasala og er því yfirleitt eitthvað lægra en ef þú selur sjálfur (t.d. á Bland).\n\nKosturinn við að nota okkur er að þú getur selt bílinn fljótt, þú berð ekki ábyrgð á mögulegum kröfum eftir söluna og margir bílasalar hafa möguleika á að bjóða í bílinn þinn." },
      q5: { q: "Hvað ef mér finnst verðmatið frá Kaggi of lágt?", a: "Hver bíll er einstakur hvað varðar ástand, kílómetrafjölda o.fl. Verðmatið okkar er yfirleitt nálægt því verði sem þú færð að lokum fyrir bílinn, en endanlegt verð er ákveðið í uppboði þar sem bílasalar á vettvangi okkar bjóða í bílinn.\n\nEf þú ert með allt aðra verðvæntingu en verðmatið okkar gefur til kynna mælum við með að selja bílinn sjálfur (t.d. á Bland). Mundu þó að virði bílsins lækkar yfir tíma." },
      q6: { q: "Get ég notað prófunarskýrsluna ef ég vel að selja ekki?", a: "Þú getur keypt prófunina af okkur fyrir 30.000 krónur og getur síðan notað hana eins mikið og þú vilt." },
      q7: { q: "Fæ ég betra verð við innbyrðisskipti?", a: "Þegar þú velur innbyrðisskipti ertu bundinn við að kaupa bíl frá söluaðilanum sem þú skipti inn hjá. Þú færð oft tilboð byggt á hagnaðinum af bílnum sem þú vilt kaupa og það getur verið mikill munur. Hjá Kaggi geta allir bílasalar á okkar vettvangi boðið í bílinn þinn, sem eykur verulega líkurnar á að þú fáir gott verð fyrir bílinn án þess að skuldbinda þig til að kaupa nýjan bíl." },
      q8: { q: "Hvað ef ég fæ ekki það verð sem ég vil í uppboðsrúndunni?", a: "Ef þú færð ekki það verð sem þú vilt skaltu bara sækja bílinn aftur á prófunarstöðina. Þú greiðir ekkert, þar sem þjónustan okkar er ókeypis og án skuldbindinga." },
      q9: { q: "Getur borgað sig að bíða með að selja bílinn?", a: "Einfalt svar er nei. Bíll tapar virði á hverjum degi og þú gætir líka þurft að borga fyrir lán og tryggingar. Auðvitað eru sumir bílar árstíðabundnari en aðrir (til dæmis getur markaður fyrir breytanlegan bíl verið betri í maí en í október), en almenna reglan er sú að bíllinn tapar virði á hverjum degi. Tillaga okkar er því sú að þegar þú hefur ákveðið að selja bílinn þinn skaltu gera það eins fljótt og auðið er." },
      q10: { q: "Get ég fengið meira fyrir bílinn ef ég sel hann sjálfur?", a: "Já, þú færð líklega meira fyrir bílinn ef þú selur hann sjálfur (t.d. á Bland). Þá þarftu hins vegar að sjá um alla söluna sjálfur og bera ábyrgð á mögulegum kvörtunum eftir viðskiptin (tveggja ára kvörtunarréttur vegna galla sem geta komið í ljós). Einnig er vert að hafa í huga að einkasala getur tekið tíma og það er ekki víst að endanlegt verð verði það sem þú bjóst við." },
      q11: { q: "Bíllinn minn er með veð, get ég samt selt hann á Kaggi?", a: "Hægt er að selja bíl með veði á Kaggi. Ef veðin eru hærri en söluverðið geturðu samið við bankann um endurfjármögnun lánsins, eða þú getur greitt mismuninn sjálfur. Við veitum upplýsingar og ráðgjöf um þetta í söluferlinu." },
      q12: { q: "Hversu hratt þarf ég að ákveða hvort ég vil selja?", a: "Þú hefur venjulega 24-48 klukkustundir til að ákveða þig eftir að uppboðsrúndunni lýkur." },
      q13: { q: "Getið þið afhent bílinn minn á prófunarstöðina ókeypis?", a: "Við bjóðum upp á ókeypis heimtingu á sumum svæðum til að gera bílasöluna þína enn auðveldari. Athugaðu að bíllinn verður að vera í öruggu ástandi til aksturs." },
      q14: { q: "Hvað gerist með samning og ábyrgð eftir sölu?", a: "Við sjáum um samninga og endurskráningu og tökum á okkur alla ábyrgð á bílnum eftir sölu. Þú berð því enga ábyrgð á bílnum eftir að þú hefur selt með Kaggi." },
      q15: { q: "Ég erfði bíl, hvað geri ég?", a: "Við viljum gera þetta ferli eins auðvelt og mögulegt er fyrir þig. Til að byrja þurfum við fyrst afrit af erfðaskírteini og umboð frá öllum sem eru skráðir á erfðaskírteinið. Eftir það er hægt að selja bílinn hratt og auðveldlega með Kaggi." }
    },
    homeFaq: {
      q1: { q: "Hvaða verð get ég búist við?", a: "Ef þú selur með Kaggi er verðið ákveðið í uppboðsrúndu þar sem bílasalar á okkar vettvangi geta boðið í bílinn þinn. Verðið sem þú sem viðskiptavinur færð er verðið sem hæstbjóðandi söluaðilinn býður." },
      q2: { q: "Er Kaggi ókeypis?", a: "Það er ókeypis að skrá sig á Kaggi og þú þarft ekki að borga fyrir þjónustuna ef þú velur að selja ekki bílinn eftir uppboðsrúnduna. Það er því ókeypis og án skuldbindinga að taka þátt í uppboðsrúndu á Kaggi.\n\nEf þú samþykkir tilboðið sem þú færð fyrir bílinn þinn greiðir þú sem seljandi ekkert út úr eigin vasa, en Kaggi tekur framlegð sem er dregin frá hæsta tilboði frá sölumanni sem vinnur uppboðsrúnduna. Framlegðin er breytileg frá 30.000 til 160.000 kr eftir virði bílsins. Framlegðin nær til kostnaðar okkar fyrir prófun, myndir, auglýsingar, stjórnsýslu, tilboðsöflun og ábyrgð vegna kvartana eftir sölu. Verðið sem þú sem seljandi sérð í uppboðsrúndunni er verðið sem þú færð greitt fyrir bílinn." },
      q3: { q: "Get ég notað skoðunarskýrslu ef ég sel ekki?", a: "Þú getur keypt prófunina af okkur fyrir 30.000 krónur og getur síðan notað hana eins mikið og þú vilt." },
      q4: { q: "Fæ ég betra verð með innbyrðis skipti?", a: "Þegar þú velur innbyrðisskipti ertu bundinn við að kaupa bíl frá söluaðilanum sem þú skipti inn hjá. Þú færð oft tilboð byggt á hagnaðinum af bílnum sem þú vilt kaupa og það getur verið mikill munur. Hjá Kaggi munu allir bílasalar á okkar vettvangi geta boðið í bílinn þinn, sem eykur verulega möguleikann á því að þú fáir gott verð fyrir bílinn án þess að skuldbinda þig til að kaupa nýjan bíl." },
      q5: { q: "Get ég skilað bílnum á skoðunarstöð?", a: "Við bjóðum upp á ókeypis heimtingu í sumum svæðum til að gera sölu bílsins þíns enn auðveldari. Athugaðu að bíllinn verður að vera í öruggu ástandi þannig að ökumaðurinn geti örugglega keyrt hann á næstu prófunarstöð." },
      q6: { q: "Hvað ef ég á bíl með veði?", a: "Hægt er að selja bíl með veði á Kaggi. Ef veðin eru hærri en söluverðið geturðu samið við bankann um endurfjármögnun lánsins, eða þú getur greitt mismuninn sjálfur. Við veitum upplýsingar og ráðgjöf um þetta í söluferlinu." }
    },
    company: {
      subtitle: "FYRIRTÆKI FYRIR BÍLASÖLU",
      title: {
        line1: "Kaggi hjálpar þér að fá",
        line2: "besta verðið frá sölumanni.",
        line3: "Hratt, einfalt og öruggt."
      },
      description: {
        line1: "Skildu eftir þínar tengiliðaupplýsingar og einn af okkar",
        line2: "ráðgjöfum mun hafa samband við þig til að ræða og skipuleggja söluna."
      },
      contactButton: "Hafðu samband við mig",
      features: {
        sellMore: {
          title: "Seldu fleiri bíla",
          description: "Ráðgjafi Kaggi mun hjálpa þér að skipuleggja söluna, og við getum útvegað flutninga á bílnum ef þörf er á."
        },
        lessTime: {
          title: "Eyðu litlum tíma og fyrirhöfn",
          description: "Kaggi hjálpar þér með söluna, frá A til Ö. Þú getur eytt meiri tíma í þitt fyrirtæki og minni tíma í að selja bíla."
        },
        bestPrice: {
          title: "Besta verð frá sölumanni",
          description: "Kaggi leyfir sölumönnum að bjóða í bílinn þinn, byggt á óháðri prófun frá NAF eða Viking Kontroll. Fyrirtækið þitt fær besta verðið frá sölumanni."
        }
      },
      processTitle: "Kaggi tryggir skjóta og einfalda sölu fyrir fyrirtækið þitt",
      steps: {
        step1: {
          title: "Ráðgjafi mun hafa samband við þig",
          description: {
            line1: "Þú færð áætlun sem er sniðin að þínum þörfum og áætlað",
            line2: "verð á hvern bíl."
          }
        },
        step2: {
          title: {
            line1: "Prófanir eru gerðar hjá NAF eða Viking",
            line2: "Kontroll"
          },
          description: {
            line1: "Hægt er að koma með bílinn á prófunarstöð, eða Kaggi getur",
            line2: "útvegað flutninga ef þörf er á. Kaggi getur einnig pantað bílaþvott",
            line3: "við afhendingu."
          }
        },
        step3: {
          title: "Uppboðsrúnda",
          description: {
            line1: "Bíllinn þinn er auglýstur til meira en 2.000 sölumanna sem eru",
            line2: "að keppa um að kaupa hann. Hvort þeir fá að kaupa hann er upp á þig."
          }
        },
        step4: {
          title: "Bíll seldur og peningar á reikning",
          description: {
            line1: "Bíllinn þinn er seldur sama dag og þú færð peninga á",
            line2: "reikninginn þinn stuttu síðar."
          }
        }
      },
      form: {
        title: "Fylltu út tengiliðaupplýsingarnar þínar",
        subtitle: "Fylltu út eyðublaðið og einn af okkar ráðgjöfum mun hafa samband við þig fljótlega.",
        name: "Nafn",
        mobile: "Farsímanúmer",
        email: "Netfang",
        company: "Fyrirtækisnafn",
        consentTitle: "Við þurfum samþykki þitt.",
        consent: "Ég leyfi Kaggi AS að geyma og vinna úr upplýsingum mínum og að hafa samband við mig í tengslum við sölu á bílum.",
        newsletter: "Ég vil fá upplýsingar og fréttir í tölvupósti frá Kaggi",
        submitButton: "Hafðu samband við mig"
      }
    },
    contact: {
      hero: {
        title: "Hafðu samband",
        description: "Við erum hér til að svara öllum spurningum sem þú gætir haft um að selja bíl."
      },
      simple: {
        contactBy: "Hafðu samband við okkur í tölvupósti á",
        phone: "símanum",
        orChat: "eða í spjallinu neðst í hægra horninu.",
        hours: "Þú getur hringt í okkur Mán - Sun frá 09-17"
      },
      cta: {
        button: "Opna spjall"
      }
    },
    carValuation: {
      tabs: {
        overview: "Yfirlit",
        testReport: "Prófunarskýrsla",
        biddingRound: "Uppboðsrúnda"
      },
      loading: "Hleður bílaupplýsingum...",
      logout: "Skrá út",
      nextStep: {
        title: "Næsta skref",
        description: "Ráðgjafi mun hafa samband við þig eins fljótt og auðið er.",
        details: "Ef þú vilt komast fyrr af stað með söluna geturðu bókað ókeypis uppboðsrúndu hér. Eftir uppboðsrúnduna velurðu hvort þú samþykkir hæsta tilboðið eða ekki.",
        startAuction: "Byrja uppboð"
      },
      testReportPlaceholder: "Prófunarskýrsla verður tiltæk eftir skoðun",
      biddingRound: {
        biddingPlaceholder: "Uppboðsrúnda byrjar eftir skoðun",
        notStarted: "Bíllinn er ekki á uppboðsrúndu ennþá",
        description: "Ef þú heldur áfram söluferlinu og afhendir bílinn til ókeypis prófunar, getur þú fylgst með uppboðsrúndunni hér þegar hún byrjar.",
        faqs: [
          {
            question: "Hvernig virkar uppboðsrúnda hjá Kaggi?",
            answer: "Þegar bíllinn hefur verið prófaður byrjar uppboðsrúnda þar sem bílasalar geta lagt fram tilboð. Þú getur fylgst með tilbođunum í rauntíma og valið hvort þú vilt samþykkja hæsta tilboðið."
          },
          {
            question: "Hvenær byrjar uppboðsrúndan?",
            answer: "Uppboðsrúndan byrjar sjálfkrafa eftir að prófun bílsins er lokið og prófunarskýrsla hefur verið útbúin."
          },
          {
            question: "Þarf ég að selja bílinn ef ég fæ tilboð?",
            answer: "Nei, þú ert ekki skuldbundinn til að samþykkja neitt tilboð. Þú getur hafnað öllum tilboðum og dregið þig út úr söluferlinu hvenær sem er án nokkurs kostnaðar."
          }
        ]
      },
      testReport: {
        noReport: "Engin prófunarskýrsla ennþá",
        description: "Allir bílar sem seldir eru í gegnum Kaggi verða að vera prófaðir hjá NAF eða Viking Kontroll. Eftir prófunina finnur þú prófunarskýrsluna þína í þessum flipa.",
        faqs: [
          {
            question: "Hvað er prófun?",
            answer: "Prófun er ítarleg tæknileg skoðun á bílnum þínum sem NAF eða Viking Kontroll framkvæmir. Prófunin nær yfir öll mikilvæg kerfi í bílnum."
          },
          {
            question: "Hvað gerist þegar ég bóka prófun?",
            answer: "Þegar þú bókar prófun færðu staðfestingu og getur valið tíma og stað sem hentar þér best hjá prófunarfélögum okkar."
          },
          {
            question: "Kostar eitthvað að prófa bílinn?",
            answer: "Prófunin er innifalin í söluferli og kostar þig ekkert aukalega. Við stöndum straum af öllum prófunarkostnaði."
          },
          {
            question: "Hvað þarf ég að gera áður en bíllinn er afhentur til prófunar?",
            answer: "Gakktu úr skugga um að bíllinn sé hreinn, að allar persónulegar eigur hafi verið fjarlægðar og að þú hafir alla lykla og pappíra með þér."
          },
          {
            question: "Þarf ég að afhenda bílinn á prófunarmiðstöðinni sjálfur?",
            answer: "Þú getur annað hvort afhentt bílinn sjálfur eða við getum útvegað sótt. Við bjóðum upp á sveigjanleg úrlausnir sem henta þinni stöðu."
          }
        ]
      },
      whySell: {
        title: "Af hverju selja með Kaggi?",
        benefits: {
          safe: {
            title: "Kaggi er öruggt og ekki bindandi",
            description: "þú getur dregið þig út úr söluferlinu hvenær sem er."
          },
          fullService: {
            title: "Við sjáum um allt söluferlið",
            description: "allt sem þú þarft að gera er að koma með bílinn í prufumiðstöð."
          },
          noLiability: {
            title: "Slepptu ábyrgðinni fyrir kvartanir",
            description: "við tökum ábyrgð þegar bíllinn er seldur!"
          }
        }
      },
      faq: {
        title: "Algengar spurningar",
        questions: {
          howLong: {
            question: "Hvað tekur langan tíma að selja með Kaggi?",
            answer: "Kaggi selur bílinn fyrir þig á aðeins 3 dögum. Þú skráir bílinn þinn og velur þægilegan tíma til að afhenda hann til skoðunar. Þegar bíllinn er afhentur sjáum við um allt – við prófum hann, tökum myndir og setjum hann til sölu þar sem traustir kaupendur geta lagt fram tilboð. Eftir uppboðsrúnduna færðu hæsta tilboðið og ákveður hvort þú samþykkir eða hafnar því. Ef þú samþykkir verður greiðslan millifærð á reikninginn þinn innan nokkurra daga. Ef þú hafnar geturðu sótt bílinn þinn sama dag, alveg ókeypis."
          },
          cost: {
            question: "Kostar eitthvað að selja bílinn þinn með Kaggi?",
            answer: "Nei, það kostar ekkert að selja bílinn þinn með Kaggi. Við græðum á því að taka innborgun frá kaupanda bílsins á milli 30.000 og 160.000 íslenskar krónur, eftir virði bílsins. Þetta nær einnig yfir kostnaðinn við prófun, myndir, auglýsingar og alla söfnun. Innborgunin er þegar dregin frá þegar þú sérð tilboðið – þannig að verðið sem þú sérð er verðið sem þú færð."
          },
          liability: {
            question: "Er ég ábyrgur fyrir kvörtunum þegar ég sel með Kaggi?",
            answer: "Nei, þú ert ekki ábyrgur fyrir kvörtunum þegar þú selur með Kaggi. Kaggi tekur áhættuna og ábyrgðina fyrir kvartanir fyrir þig. Þegar þú selur í einkaeigu ertu venjulega ábyrgur í tvö ár, en með Kaggi tökum við yfir áhættuna, svo þú getur selt bílinn örugglega og áhyggjulaust."
          },
          price: {
            question: "Hvað get ég búist við að fá fyrir bílinn minn hjá Kaggi?",
            answer: "Þegar þú selur bílinn þinn með Kaggi er verðið ákveðið í gegnum opna uppboðsrúndu, svo þú færð tilboð sem endurspeglar raunverulegt markaðsvirði á Íslandi. Söluaðilar um allt land geta lagt fram tilboð, sem eykur líkurnar á að finna réttan kaupanda fyrir bílinn þinn – hvort sem það er lítill borgarbíll eða jeppi sem er í mikilli eftirspurn á landsbyggðinni. Ólíkt hefðbundnum innkaupum, þar sem þú færð aðeins eitt tilboð, býr Kaggi til raunverulega samkeppni fyrir bílinn þinn – sem gefur þér tækifæri til að fá betra verð."
          },
          loan: {
            question: "Get ég selt bílinn minn með Kaggi þótt ég sé með lán á honum?",
            answer: "Já, þú getur það. Þegar þú selur með Kaggi hjálpum við þér með allt ferlið, jafnvel þótt bíllinn sé með veð. Lánið verður greitt upp áður en þú færð restina af peningunum."
          }
        }
      }
    },
    dealerDashboard: {
      sidebar: {
        activeAuctions: "Virk uppboð",
        comingCars: "Væntanlegir bílar",
        myBids: "Mín tilboð",
        favorites: "Uppáhaldsbílar",
        myPurchases: "Mín kaup",
        faq: "Algengar spurningar"
      },
      logout: "Skrá út",
      search: {
        placeholder: "Leita...",
        allStatuses: "Allar stöður",
        activeAuction: "Virkt uppboð", 
        pending: "Í bið",
        sold: "Selt"
      },
      empty: {
        noCars: "Engir bílar fundust",
        noBids: "Engin tilboð fundust",
        noFavorites: "Engir uppáhaldsbílar",
        tryChangingFilters: "Reyndu að breyta leitarskilyrðum"
      },
      actions: {
        bidOnCar: "Bjóða í bíl",
        openAuction: "Opna uppboð",
        addedToFavorites: "Bætt við uppáhald",
        removedFromFavorites: "Fjarlægt úr uppáhaldi",
        backToList: "Til baka í lista"
      },
      auctionDetail: {
        imageGallery: "Myndasafn",
        images: "myndir",
        seller: "Seljandi",
        bidHistory: "Boðsaga",
        highestBid: "Hæsta boð",
        timeRemaining: "Lýkur",
        placeBid: "Leggja inn tilboð",
        autoBid: "Sjálfvirkt tilboð", 
        whatIsAutoBid: "Hvað er sjálfvirkt tilboð?",
        bidAmount: "Upphæð",
        bidAmountPlaceholder: "Sláðu inn tilboð...",
        minimumBid: "lágmark",
        suggestion: "Tillaga",
        noBidsYet: "Engin boð enn",
        status: {
          outbid: "Útboðið",
          active: "Virkt uppboð",
          pending: "Í bið",
          sold: "Selt"
        },
        carDetails: {
          regNumber: "Reg. nr.",
          year: "Árgerð", 
          vin: "VIN",
          volume: "Volum",
          mileage: "Keyrsla",
          fuel: "Eldsneyti",
          transmission: "Gírkassi",
          equipment: "Búnaður",
          name: "Nafn",
          email: "Netfang"
        }
      },
      faq: {
        title: "Algengar spurningar",
        questions: [
          {
            question: "Hvernig virkar uppboðsferlið?",
            answer: "Uppboðsferlið er einfalt. Þegar bíll er settur í uppboð geta bílasalar lagt inn tilboð..."
          },
          {
            question: "Hvað kostar að taka þátt í uppboðum?",
            answer: "Það kostar ekkert að taka þátt í uppboðum. Þú borgar aðeins ef þú vinnur uppboðið..."
          },
          {
            question: "Hvernig get ég séð mínar kaup?",
            answer: "Þú getur séð öll þín kaup í \"Mín kaup\" hlutanum í vinstri valmyndinni..."
          }
        ]
      }
    }
  },
  en: {
    common: {
      brand: "Kaggi",
      start: "Get started",
      licensePlate: "License plate",
      mileage: "Mileage",
      consent: "I accept terms and conditions",
      verifyingVehicle: "Verifying vehicle...",
      vehicleFound: "Vehicle found. Continue.",
      vehicleNotFound: "We could not find this vehicle. Please check the number or enter information manually.",
      apiUnavailable: "Could not verify right now. Please try again later.",
      smsVerify: {
        headerLine1: "We have sent a 6 digit code to",
        useCodeText: "Use the code to access my page.",
        continueButton: "Continue",
        verifyingText: "Verifying...",
        resendText: "Didn't get the code? Get code via email",
        resendingText: "Resending...",
        errorAllDigits: "Please enter all 6 digits",
        errorWrongCode: "Wrong code. Try again.",
        errorGeneral: "An error occurred. Try again."
      },
      inPartnership: "In partnership with",
      heroTitle: "Sell your car today",
      heroSub: "Multiple car dealers compete to give you the best price. Fast, safe and simple.",
      processTitle: "Sell your car",
      processSubtitle: "Kaggi is simple, secure and completely without obligation. You have full control over the entire sales process.",
      revolutionarySection: {
        title: "Revolutionary way to sell your car",
        subtitle: "We make car selling easier than ever before, you enter your car once, get multiple offers and choose the best option. No fees, no hassle!"
      },
      advantagesTitle: "Safe and simple",
      faqTitle: "We help you all the way",
      seeMore: "See more questions",
      seeDeliveryMap: "See map of delivery locations",
      phoneTooltip: "You can call us Mon - Sun from 9-17",
      received: "We have received your car – bids will appear shortly.",
      formTitle: "Get started with an easy car sale",
      formSubtitle: "It has never been easier to sell a car. Deliver the car, and we'll handle the rest.",
      nav: {
        sell: "Sell your car",
        dealers: "Dealers",
        faq: "FAQ",
        about: "About Kaggi",
        contact: "Contact",
        myPage: "My page",
        dealerPortal: "Dealer portal",
        company: "Company"
      },
      back: "Back",
      continue: "Continue",
      footer: {
        shortcuts: "Shortcuts",
        contact: "Get in touch",
        rights: "© 2025",
        contactUs: "Contact us",
        chat: "Chat",
        openingHours: "Mon - Sun 09-17",
        links: {
          faq: "FAQ",
          about: "About Kaggi",
          dealers: "For dealers",
          terms: "Terms",
          privacy: "Privacy",
          cookies: "Cookies",
          openbook: "Open book"
        }
      }
    },
    cookies: {
      title: "Cookies",
      content: {
        intro: "We want you to feel secure when using the Kaggi website. To provide you with better service, we use cookies to store non-sensitive information about your choices and how you use the site.",
        whatAre: {
          title: "What are cookies?",
          text: "Cookies are small text files that websites store on your computer or device. They make your usage more convenient and personalized, for example by remembering login settings or measuring site traffic. Some cookies are necessary for the site's functionality, while others we only use with your consent."
        },
        howToManage: {
          title: "How do I manage cookies?",
          text: "Most browsers (Google Chrome, Firefox, Safari, Edge, etc.) accept cookies by default. You can change the settings in your browser if you want to reject or delete cookies. Note that if you reject all cookies, the site may not work as intended.",
          link: "Here is good guidance from the Data Protection Authority on how to manage cookies:",
          linkText: "👉 Data Protection Authority – Cookies"
        },
        types: {
          title: "What types of cookies do we use?",
          necessary: {
            title: "Necessary cookies",
            text: "These cookies are necessary for the website's functionality and cannot be turned off in our system. They are usually only set when you perform actions such as logging in or filling out forms."
          },
          analytics: {
            title: "Statistical and analytical cookies",
            text: "These cookies help us understand how visitors use the site, so we can improve the experience. They collect information anonymously, e.g. about the number of visits and which pages are most popular."
          },
          marketing: {
            title: "Marketing cookies",
            text: "These cookies are used to show you relevant advertisements and measure the success of marketing campaigns. They may come from us or our partners such as Google or Facebook."
          }
        },
        consent: {
          title: "Your consent",
          text: "When you visit the site for the first time, a cookie notification appears. By accepting them, you give permission for their use in accordance with this policy. You can always withdraw your consent or change settings."
        }
      }
    },
    wizard: {
      step1: {
        title: "Contact info", 
        subtitle: "About the car",
        formTitle: "Complete the registration and get a price estimate for your car"
      },
      step2: {
        title: "About the car",
        subtitle: "Tell us more about the condition and location of your car",
        formTitle: "We just need a little more info",
        info: {
          title: "Next steps",
          description: "After you submit your information, we will:",
          point1: "Contact you within 24 hours",
          point2: "Schedule a free inspection of your car",
          point3: "Give you a price estimate based on the car's condition"
        },
        questions: {
          damage: {
            title: "Does the car have known defects, missing parts or visible damage?",
            description: "By visible damage we mean dents, rust, stone chips or scratches that you are aware of."
          },
          repairs: {
            title: "Have major repairs been done?",
            description: "Please let us know if the vehicle has been repaired, renewed or had other major changes after an accident."
          },
          other: {
            title: "Is there any other important information about the car?",
            description: "E.g. about the car's condition or additional equipment."
          },
          ownership: {
            title: "Are you selling with power of attorney, guardianship or for an estate?",
            description: "The owner of the car can sign a sales contract himself, choose no."
          }
        },
        yes: "Yes",
        no: "No",
        ownershipTypes: {
          title: "Which sales form applies to your situation?",
          estate: "Estate",
          powerOfAttorney: "Power of attorney", 
          helpingSell: "I'm helping someone sell their car, but they have to sign the contract themselves"
        },
        placeholders: {
          damage: "Describe faults, missing parts, or visible damage you know of",
          repairs: "Describe repairs or modifications that have been made",
          other: "Describe other information about the car",
          ownership: "Describe special ownership relationships"
        }
      },
      step3: {
        title: "Price estimate",
        subtitle: "Review your information and submit",
        formTitle: "Complete the registration and get a price estimate for your car",
        mainHeading: "The car was then registered",
        confirmationText: "We have sent a confirmation to your email.",
        priceEstimate: {
          heading: "See price estimate",
          description: "We have sold over 80,000 cars - see what we estimate your car could get in a bidding round at Nettbil!",
          noDataText: "Sometimes we don't have enough historical data to give you a price estimate. In that case, a customer advisor will call you with a price estimate.",
          loginButton: "Log in and see your price estimate"
        },
        whatNext: {
          heading: "What happens next?",
          step1: {
            title: "1. Book a free test drive of the car",
            description: "You book a free test at Viking Kontroll or NAF via My Page. If you do not want to do it yourself, we will contact you within a couple of days."
          },
          step2: {
            title: "2nd bidding round",
            description: "Deliver your car to the test center. After the test, the car will be put up for bidding for our dealers."
          },
          step3: {
            title: "3. The car is sold and money is in the account",
            description: "If you accept the highest bid, you will have the money in your account within a few days. If you are not satisfied with the bid, you can reject it and collect your car."
          }
        },
        footer: {
          company: "Nettbil AS © 2025",
          shortcuts: {
            title: "Shortcuts",
            carTips: "Car tips",
            qa: "Questions and answers", 
            aboutNettbil: "About Nettbil",
            forDealer: "For dealer"
          },
          contact: {
            title: "Get in touch",
            contactUs: "Contact us",
            chat: "Chat",
            facebook: "Facebook"
          }
        },
        success: {
          title: "Information received!",
          description: "We have received your information and will contact you shortly."
        },
        summary: {
          title: "Summary",
          contact: "Contact:",
          phone: "Phone:",
          email: "Email:",
          location: "Location:"
        },
        nextSteps: {
          title: "Next steps:",
          step1: "We will contact you within 24 hours",
          step2: "We schedule a free inspection of your car",
          step3: "You get a price estimate based on the car's condition"
        },
        terms: {
          prefix: "I accept",
          link: "the terms and conditions",
          suffix: "and that Kaggi may contact me regarding the sale of my car."
        },
        newsletter: "Yes, I would like to subscribe to Kaggi's newsletter."
      },
      firstName: "First name",
      lastName: "Surname",
      countryCode: "Country code", 
      phoneNumber: "Mobile number",
      email: "Email",
      postalCode: "Postal code",
      postalCodePlaceholder: "Postal code",
      city: "City",
      submit: "Register car",
      footer: {
        security: "This page is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply."
      }
    },
    process: {
      step1: { title: "Tell us about your car", desc: "We will give you a price estimate and set up a free, no-obligation test of the car." },
      step2: { title: "Deliver the car", desc: "Or let us pick it up. We'll test drive and take pictures of the car, then put it up for bidding." },
      step3: { title: "Accept highest bid", desc: "The money will be in your account within a few days and we will take responsibility for any complaints." },
      step4: { title: "Car sold and money in account", desc: "Your car is sold the same day and you receive money in your account shortly afterwards." }
    },
    advantages: {
      free: { title: "Free of charge", desc: "No costs for you as a seller." },
      easy: { title: "Non-binding offer", desc: "You choose whether to accept the highest bid." },
      fast: { title: "Sell your car quickly", desc: "After the bidding round, your car is sold in 1 day if you accept the highest bid." },
      safe: { title: "Release liability for claims", desc: "We take responsibility when the car is sold." },
      soldCount: { title: "Verified buyers", desc: "All bidders are identified and financially verified before bids count." },
      nationwide: { title: "Nationwide service", desc: "We cover all of Iceland." }
    },
    about: {
      title: "About us",
      content: {
        paragraph1: "Kaggi was founded in 2025 with the vision of making car sales simpler and more convenient for everyone. We want to offer a solution where multiple car dealers can bid on the same car at the same time, this way the owner gets a fair price without hassle.",
        paragraph2: "We handle the process from start to finish and make car sales a streamlined and stress-free experience.",
        paragraph3: "Although Kaggi is a new company, our goal is clear: to build trust, make transactions transparent and help car owners sell their car in a safe and efficient way.",
        paragraph4: "We look forward to growing with our customers and making car sales in Iceland simpler than ever before."
      },
      contact: {
        title: "Contact us",
        address: "Reykjavik, Iceland",
        phone: "354 787 7887",
        email: "kaggi@kaggi.is",
        hours: "Monday - Friday: 09:00 - 17:00"
      }
    },
    dealers: {
      hero: {
        title: "Bid on cars with condition report",
        subtitle: "Buy cars for resale. Get the opportunity to buy appraised cars with a condition report for an attractive price."
      },
      collaboration: "In collaboration with",
      createAccount: "Create free reseller account",
      login: "Log in",
      benefits: {
        auction: "Free access to the auction platform",
        newCars: "An average of 134 new cars up for bid every day",
        selection: "Wide selection of cars with condition report"
      },
      highestBid: "Highest bid",
      stats: {
        carsBidding: "Cars so far in bidding round",
        newCarsDaily: "New cars on the bidding round every day",
        carsComing: "Cars coming in the next few days"
      },
      examples: {
        title: "Examples of cars",
        placeholder: "Car examples will be connected later"
      },
      seeAllCars: "Create a free account to see all the cars",
      requiresLicense: "Requires a second-hand trade license and access to autosys",
      contact: {
        title: "Would you like to talk to one of our sales managers?",
        customerService: "Customer service",
        email: "Email",
        hours: "Opening hours",
        schedule: "Monday - Friday: 08:00 - 17:00"
      }
    },
    myPage: {
      title: "Go to my page",
      subtitle: "Check your sales process on my page",
      licensePlate: "The car's registration number.",
      email: "Your email",
      seeMyPage: "See my page",
      sellQuestion: "Do you want to sell your car with Kaggi?",
      registerCar: "Register your car",
      dealerQuestion: "Are you a car dealer?",
      dealerLogin: "Log in here.",
      recaptcha: {
        text: "This page is protected by reCAPTCHA and the Google",
        privacy: "Privacy Policy",
        and: "and",
        terms: "Terms",
        apply: "apply."
      }
    },
    dealerLogin: {
      title: "Login as dealer",
      subtitle: "If you are a car dealer, log in here.",
      email: "Your email",
      password: "Your password",
      loginButton: "Login as dealer",
      forgotPassword: "Forgot password?",
      register: "Register",
      sellWithNettbil: "Do you want to sell your car with Kaggi?",
      goToMyPage: "Go to my page.",
      recaptcha: {
        text: "This page is protected by reCAPTCHA and the Google",
        privacy: "Privacy Policy",
        and: "and",
        terms: "Terms",
        apply: "apply."
      }
    },
    dealerRegistration: {
      title: "Create Account",
      subtitle: "Enter your email and create a password",
      email: "Email",
      password: "Password",
      repeatPassword: "Repeat Password", 
      passwordStrength: "Password strength",
      tooWeak: "Too weak",
      medium: "Medium",
      strong: "Strong",
      requirements: {
        title: "Password requirements:",
        length: "At least 12 characters",
        strength: "Medium or strong password",
        lowercase: "At least 1 lowercase letter",
        uppercase: "At least 1 uppercase letter",
        number: "At least 1 number", 
        symbol: "At least 1 symbol (!\"#$%&'()*+,-./:;<=?@[]^_`{|}~)"
      },
      termsAccept: "I accept", 
      termsLink: "the terms",
      termsText: "for use of the service",
      nextButton: "Next",
      recaptcha: {
        text: "This page is protected by reCAPTCHA and the Google",
        privacy: "Privacy Policy", 
        and: "and",
        terms: "Terms",
        apply: "apply"
      }
    },
    dealerContactInfo: {
      title: "Contact information",
      subtitle: "Fill in your name and dealer information",
      firstName: "First name",
      surname: "Surname",
      organizationNumber: "Company registration number",
      dealerName: "Dealer name",
      mobileNumber: "Mobile number",
      streetAddress: "Street address",
      postalCode: "Postal code",
      city: "City",
      nextButton: "Next",
      recaptcha: {
        text: "This page is protected by reCAPTCHA and the Google",
        privacy: "Privacy Policy", 
        and: "and",
        terms: "Terms",
        apply: "apply"
      }
    },
    company: {
      hero: {
        headline: "Kaggi helps you get the best price from the dealer. Fast, easy and safe.",
      },
      title: "About the company",
      subtitle: "Learn about our story and values",
      story: {
        title: "Our story",
        content: "Kaggi was founded in 2017 with a simple goal - to make car sales easier and more transparent for everyone. Since then, we have helped thousands of Icelanders sell their cars quickly and safely."
      },
      mission: {
        title: "Our mission",
        content: "We believe everyone deserves a fair price for their car. That's why we offer a transparent process where multiple dealers compete to offer you the best price."
      },
      values: {
        title: "Our values",
        trust: "Trust - We build on mutual trust",
        transparency: "Transparency - Nothing hidden, everything clear",
        service: "Service - You always come first"
      },
      stats: {
        title: "Numbers that speak",
        cars: "85,031+ cars sold",
        dealers: "100+ dealers",
        satisfaction: "4.7/5 rating",
        years: "7+ years experience"
      }
    },
    faq: {
      q1: { q: "What can I expect to get for my car at Kaggi?", a: "If you sell with Kaggi, the price is determined in a bidding round where car dealers on our platform can bid on your car. The price you as a customer receive is the price offered by the highest bidding dealer. At this stage, a selected group of dealers participate in each bidding round, and the number of dealers will increase as the platform grows." },
      q2: { q: "What will be the final price?", a: "Final price is the highest bid if you choose to accept this. We want you to get the best price possible for your car, but it is the condition of the car and the market (the dealers who bid on the car) that determine what your car is worth." },
      q3: { q: "Is Kaggi free?", a: "It is free to register on Kaggi, and you do not have to pay for the service if you choose not to sell the car after the bidding round. It is therefore free and non-binding to participate in a bidding round on Kaggi.\n\nIf you accept the bid you receive for your car, you as the seller will not pay anything out of your own pocket, but Kaggi will take a margin that is deducted from the highest bid from the dealer who wins the bidding round. The margin varies from 30.000 to 160.000 ISK depending on the value of the car. The margin covers our costs for testing, photos, advertising, administration, obtaining offers and liability for complaints after the sale. The price you as the seller see during the bidding round is the price you will be paid for the car." },
      q4: { q: "What is the price estimate for the car based on?", a: "We create price estimates based on sales statistics of comparable cars that have sold through us along with evaluations from our experienced advisors. The price estimate is based on the assumption that the service book has been followed and that the car is in good condition relative to its age. The price estimate is valid for sale to car dealers and is therefore usually somewhat lower than if you sell yourself (e.g. on Bland).\n\nThe advantage of using us is that you can sell the car quickly, you do not bear responsibility for possible claims after the sale, and many car dealers have the opportunity to bid on your car." },
      q5: { q: "What if I think the price estimate from Kaggi is too low?", a: "Every car is unique in terms of condition, mileage, etc. Our price estimate is usually close to the price you will ultimately receive for the car, but the final price is determined in an auction where car dealers on our platform bid on the car.\n\nIf you have completely different price expectations than our estimate indicates, we recommend selling the car yourself (e.g. on Bland). However, remember that the value of the car decreases over time." },
      q6: { q: "Can I use the test report if I choose not to sell?", a: "You can purchase the test from us for 30,000 ISK and can then use it as much as you want." },
      q7: { q: "Do I get a better price with trade-in?", a: "When you choose trade-in, you are bound to buy a car from the dealer you trade in with. You often get offers based on the profit on the car you want to buy, and there can be large variations. At Kaggi, all car dealers on our platform will be able to bid on your car, which significantly increases the chance that you will get a good price for the car without committing to buying a new car." },
      q8: { q: "What if I don't get the price I want in the bidding round?", a: "If you don't get the price you want, just pick up the car back at the test center. You won't pay anything, as our service is free and without obligation." },
      q9: { q: "Can it pay to wait to sell the car?", a: "The simple answer is no. A car depreciates in value every day, and you may also have to pay for a loan and insurance. Of course, there are some cars that are more seasonal than others (for example, the market for a convertible may be better in May than in October), but the general rule is that the car loses value every day. Our recommendation is therefore that once you have decided to sell your car, do it as soon as possible." },
      q10: { q: "Can I get more for the car if I sell it myself?", a: "Yes, you will probably get more for the car if you sell it yourself (e.g. on Bland). However, you would then have to handle all the sales yourself and bear responsibility for possible complaints after the transaction (two-year warranty rights for defects that may be discovered). It is also worth bearing in mind that private sales can take time and the final price may not be what you expected." },
      q11: { q: "My car has liens, can I still sell it on Kaggi?", a: "It is possible to sell a car with liens on Kaggi. If the liens exceed the sales price, you can agree with the bank to refinance the loan, or you can pay the difference yourself. We provide information and advice on this during the sales process." },
      q12: { q: "How quickly do I need to decide whether I want to sell?", a: "You usually have 24-48 hours to decide after the bidding round ends." },
      q13: { q: "Can you deliver my car to the test station for free?", a: "We offer free pickup in some areas to make selling your car even easier. Note that the car must be in safe driving condition." },
      q14: { q: "What happens with contract and liability after sale?", a: "We arrange contracts and re-registration, and take over all responsibility for the car after the sale. You therefore have no responsibility for the car after you have sold with Kaggi." },
      q15: { q: "I inherited a car, what do I do?", a: "We want to make this process as easy as possible for you. To get started, we first need a copy of the transfer certificate and a power of attorney from everyone listed on the transfer certificate. After that, the car can be sold quickly and easily with Kaggi." }
    },
    homeFaq: {
      q1: { q: "What price can I expect?", a: "If you sell with Kaggi, the price is set in a bidding round where the car dealers on our platform can bid on your car. The price you as a customer receive is the price offered by the highest-bidding dealer." },
      q2: { q: "Is Kaggi free?", a: "It is free to register on Kaggi, and you do not have to pay for the service if you choose not to sell the car after the bidding round. It is therefore free and non-binding to participate in a bidding round on Kaggi.\n\nIf you accept the bid you receive for your car, you as the seller will not pay anything out of your own pocket, but Kaggi will take a margin that is deducted from the highest bid from the dealer who wins the bidding round. The margin varies from 30.000 to 160.000 ISK depending on the value of the car. The margin covers our costs for testing, photos, advertising, administration, obtaining offers and liability for complaints after the sale. The price you as the seller see during the bidding round is the price you will be paid for the car." },
      q3: { q: "Can I use the test report if I choose not to sell?", a: "You can purchase the test from us for 30,000 ISK and can then use it as much as you want." },
      q4: { q: "Do I get a better price with trade-in?", a: "When you choose trade-in, you are bound to buy a car from the dealer you trade in with. You often get offers based on the profit on the car you want to buy, and there can be large variations. At Kaggi, all car dealers on our platform will be able to bid on your car, which significantly increases the chance that you will get a good price for the car without committing to buying a new car." },
      q5: { q: "Can I deliver the car to a test station?", a: "We offer free home pickup in some areas to make selling your car even easier. Please note that the car must be in a safe condition so that the driver can safely drive it to the nearest test center." },
      q6: { q: "What if my car has a lien?", a: "It is possible to sell a car with liens on Kaggi. If the liens exceed the sales price, you can agree with the bank to refinance the loan, or you can pay the difference yourself. We provide information and advice on this during the sales process." }
    },
    company: {
      subtitle: "ONLINE CAR COMPANY",
      title: {
        line1: "Kaggi helps you get the",
        line2: "best price from the dealer.",
        line3: "Fast, easy and safe."
      },
      description: {
        line1: "Leave your contact information and one of our advisors",
        line2: "will contact you to discuss and plan the sale."
      },
      contactButton: "Contact me",
      features: {
        sellMore: {
          title: "Sell more cars",
          description: "Kaggi's advisor will help you plan the sale, and we can arrange transportation of the car if needed."
        },
        lessTime: {
          title: "Spend little time and effort",
          description: "Kaggi helps you with the sale, from A to Z. You can spend more time on your business, and less time selling cars."
        },
        bestPrice: {
          title: "Best price from dealer",
          description: "Kaggi allows dealers to bid on your car, based on an independent test from NAF or Viking Kontroll. Your company gets the best price from the dealer."
        }
      },
      processTitle: "Kaggi ensures quick and easy sales for your business",
      steps: {
        step1: {
          title: "Advisor will contact you",
          description: {
            line1: "You will receive a plan tailored to your needs, and an estimated",
            line2: "price per car."
          }
        },
        step2: {
          title: {
            line1: "Tests are performed at NAF or Viking",
            line2: "Kontroll"
          },
          description: {
            line1: "The car can be delivered to a test center, or Kaggi can",
            line2: "arrange transport if needed. Kaggi can also order a car wash",
            line3: "upon delivery."
          }
        },
        step3: {
          title: "Bidding round",
          description: {
            line1: "Your car is advertised to more than 2,000 dealers who are",
            line2: "vying to buy it. Whether they get to buy it is up to you."
          }
        },
        step4: {
          title: "Car sold and money in account",
          description: {
            line1: "Your car is sold on the same day and you receive money in",
            line2: "your account shortly afterwards."
          }
        }
      },
      form: {
        title: "Fill in your contact information",
        subtitle: "Fill out the form and one of our advisors will contact you soon.",
        name: "Name",
        mobile: "Mobile number",
        email: "Email",
        company: "Company name",
        consentTitle: "We need your consent.",
        consent: "I allow Kaggi AS to store and process my information and to contact me in connection with the sale of cars.",
        newsletter: "I would like to receive information and news by email from Kaggi",
        submitButton: "Contact me"
      }
    },
    contact: {
      hero: {
        title: "Contact us",
        description: "We are here to answer any questions you may have about selling a car."
      },
      simple: {
        contactBy: "Contact us by email",
        phone: "phone",
        orChat: "or in the chat in the bottom right corner.",
        hours: "You can call us Mon - Sun from 09-17"
      },
      cta: {
        button: "Open chat"
      }
    },
    terms: {
      title: "Terms of Service",
      sections: {
        definition: {
          title: "Definition of the service",
          content: [
            "Kaggi is a service for individuals or companies (hereinafter referred to as 'car sellers') who want to sell their car quickly, easily and without risk through an auction on the car. All cars that are sold are inspected by an independent third party and sold at auction to professional car dealers. The car seller can choose to reject the highest bid after the auction and can then withdraw from the process at no cost.",
            "For car sellers, the service is free of charge. This means that the car seller never pays anything directly to Kaggi for the inspection or administration, even if the sale falls through. The exception is additional services that the seller orders specifically from Kaggi. The car dealer who buys the car pays a commission to Kaggi. The commission covers the cost of inspection, photography, advertising, administration, warranty after sale and bid collection. The commission ranges from ISK 50,000–200,000, depending on the value of the car."
          ]
        },
        carDealers: {
          title: "Car dealers",
          content: [
            "Kaggi's service is not intended for car dealers who want to sell their own cars. Kaggi reserves the right to refuse car dealers to sell through the system. If a car dealer registers a car to a private individual or related party and then puts it up for sale through Kaggi, this is considered circumventing the provision."
          ]
        },
        sellerResponsibility: {
          title: "Car seller's responsibility before selling through Kaggi",
          subsections: {
            information: {
              title: "Information obligation",
              content: "The car seller has the obligation to provide correct information about the condition of the car. When registering, all defects or damages that affect the condition must be registered. If the seller fails to inform Kaggi about this, it can lead to liability for damages towards Kaggi and also towards the car dealer who buys the car. All information must be in writing."
            },
            legalOwner: {
              title: "Legal owner",
              content: "The car seller needs to confirm that he/she is the registered owner of the car. If not, he/she must obtain written authorization from the owner before the auction takes place. When selling from an estate, it is necessary to submit a certificate of inheritance or other necessary documents."
            },
            carReady: {
              title: "Car ready for sale",
              content: "The car must be delivered to Kaggi or partners in a condition that makes it ready for resale. Service book, two keys and both wheel sets (if applicable) should be included to get the highest price. If the service book is electronic, the seller must assist Kaggi in obtaining the information. The car must be in roadworthy condition according to Icelandic traffic laws."
            },
            washing: {
              title: "Washing",
              content: "The seller must wash the car so that the inspection can be carried out. If it is not possible to inspect the car due to dirty condition, Kaggi may charge the seller for washing. A rough wash is sufficient."
            },
            otherAdvertising: {
              title: "Other advertising",
              content: "While the car is being inspected and the auction is in progress, the seller may not have the car for sale on other media (e.g. Bland or Facebook)."
            },
            lienOnCar: {
              title: "Lien on car",
              content: "The seller undertakes to pay off lien debts on the car before the sale to Kaggi takes place. If this is not done within 7 working days from the accepted offer, Kaggi has the right to void the purchase unilaterally."
            },
            directCommunication: {
              title: "Direct communication with car dealers",
              content: "If car dealers contact the seller directly during or after the sale, the seller should let Kaggi know."
            }
          }
        },
        liabilityCancellations: {
          title: "Liability and cancellations",
          subsections: {
            carDamage: {
              title: "Car damage",
              content: "If damage occurs to the car while it is with the testing party, and while the sales arrangement is in progress, Kaggi pays a deductible of up to ISK 100,000. However, Kaggi does not compensate for loss of bonus."
            },
            cancellation: {
              title: "Cancellation",
              content: "If the seller wants to cancel the service, this must be notified in writing to Kaggi by email at least 24 hours before delivery. If this is not done, the seller may be charged ISK 30,000 for costs."
            }
          }
        },
        pickupServices: {
          title: "Terms of use for pickup services at Kaggi",
          subsections: {
            theService: {
              title: "The service",
              content: "Kaggi uses third parties to pick up cars. The car is picked up at an agreed location and time and then goes for inspection. All drivers have valid driving licenses and are certified by the service provider."
            },
            carCondition: {
              title: "Car condition",
              content: "The car must be in roadworthy condition with a valid inspection certificate. If the car does not meet the conditions, the driver may refuse to take it."
            },
            insurance: {
              title: "Insurance",
              content: "The car is insured during transport."
            },
            pickupCancellation: {
              title: "Cancellation",
              content: "Cancellation must be received at least 24 hours before scheduled transport. If this is not done, Kaggi reserves the right to charge the seller for the cost."
            }
          }
        },
        liabilityCompletedSale: {
          title: "Liability in case of cancelled or completed sale",
          subsections: {
            rejectedBid: {
              title: "If highest bid is rejected",
              content: "If the seller rejects the highest bid, the car must be picked up within 3 days. Otherwise, rental fees may be charged (ISK 4,000 per day)."
            },
            acceptedBid: {
              title: "After acceptance of highest bid",
              content: [
                "The seller must accept the highest bid by 10 o'clock the next day. Kaggi may withdraw the offer if it is not accepted.",
                "Change of ownership and signing of contract must be completed within 2 working days. If delayed, Kaggi may void the purchase and charge storage fees. The seller is responsible for canceling road taxes and other contracts related to the car after sale."
              ]
            }
          }
        }
      }
    },
    carValuation: {
      tabs: {
        overview: "Overview",
        testReport: "Test report", 
        biddingRound: "Bidding round"
      },
      loading: "Loading car information...",
      logout: "Log out",
      nextStep: {
        title: "Next step",
        description: "A customer advisor will contact you as soon as possible.",
        details: "If you want to get started with the sale faster, you can book a\nfree bidding round here. After the bidding round, you choose\nwhether to accept the highest bid or not.",
        startAuction: "Start auction"
      },
      testReportPlaceholder: "Test report will be available after inspection",
      biddingRound: {
        biddingPlaceholder: "Bidding round starts after inspection",
        notStarted: "The car is not in a bidding round yet",
        description: "If you continue the sales process and deliver the car for a free test, you will be able to follow the bidding round here when it starts.",
        faqs: [
          {
            question: "How does a bidding round work with Kaggi?",
            answer: "Once the car has been tested, a bidding round begins where car dealers can submit bids. You can follow the bids in real-time and choose whether to accept the highest bid."
          },
          {
            question: "When does the bidding round start?",
            answer: "The bidding round starts automatically after the car inspection is completed and the test report has been prepared."
          },
          {
            question: "Do I have to sell the car if I receive a bid?",
            answer: "No, you are not obligated to accept any bid. You can reject all bids and withdraw from the sales process at any time without any cost."
          }
        ]
      },
      testReport: {
        noReport: "No test report yet",
        description: "All cars sold through Kaggi must be tested by NAF or Viking Kontroll. After testing you will find your report in this tab.",
        faqs: [
          {
            question: "What is a test?",
            answer: "A test is a thorough technical examination of your car performed by NAF or Viking Kontroll. The test covers all important systems in the car."
          },
          {
            question: "What happens when I book a test?",
            answer: "When you book a test, you get a confirmation and can choose a time and place that suits you best with our test partners."
          },
          {
            question: "Does it cost anything to test the car?",
            answer: "The test is included in the sales process and costs you nothing extra. We cover all test expenses."
          },
          {
            question: "What do I need to do before the car is delivered for testing?",
            answer: "Make sure the car is clean, that all personal items are removed, and that you have all keys and papers with you."
          },
          {
            question: "Do I have to deliver the car to the test center myself?",
            answer: "You can either deliver the car yourself or we can arrange pickup. We offer flexible solutions that suit your situation."
          }
        ]
      },
      whySell: {
        title: "Why sell with Kaggi?",
        benefits: {
          safe: {
            title: "Kaggi is safe and non-binding",
            description: "you can withdraw from the sales process at any time."
          },
          fullService: {
            title: "We take care of the entire sales process",
            description: "all you have to do is deliver your car to the test center."
          },
          noLiability: {
            title: "Release the liability for complaints",
            description: "we take responsibility once the car is sold!"
          }
        }
      },
      faq: {
        title: "Frequently asked questions",
        questions: {
          howLong: {
            question: "How long does it take to sell with Kaggi?",
            answer: "It usually takes 1-2 weeks from when the car is tested until it is sold."
          },
          cost: {
            question: "Does it cost anything to sell your car with Kaggi?",
            answer: "No, it costs nothing to sell your car with Kaggi. We only take a small commission from the sale price."
          },
          liability: {
            question: "Am I responsible for complaints when I sell with Kaggi?",
            answer: "No, Kaggi takes responsibility for complaints after the car is sold."
          },
          price: {
            question: "How much can I expect to get for my car at Kaggi?",
            answer: "The price depends on the condition of the car, age and market demand. We give you an estimate before the auction begins."
          },
          loan: {
            question: "Can I sell my car with Kaggi even if I have a loan on it?",
            answer: "Yes, it is possible. We can help you pay off the loan from the sale price."
          }
        }
      }
    },
    dealerDashboard: {
      sidebar: {
        activeAuctions: "Active auctions",
        comingCars: "Coming cars",
        myBids: "My bids",
        favorites: "Favorites",
        myPurchases: "My purchases",
        faq: "Frequently asked questions"
      },
      logout: "Logout",
      search: {
        placeholder: "Search...",
        allStatuses: "All statuses",
        activeAuction: "Active auction",
        pending: "Pending",
        sold: "Sold"
      },
      empty: {
        noCars: "No cars found",
        noBids: "No bids found", 
        noFavorites: "No favorite cars",
        tryChangingFilters: "Try changing search criteria"
      },
      actions: {
        bidOnCar: "Bid on car",
        openAuction: "Open auction",
        addedToFavorites: "Added to favorites",
        removedFromFavorites: "Removed from favorites",
        backToList: "Back to list"
      },
      auctionDetail: {
        imageGallery: "Image gallery",
        images: "images",
        seller: "Seller",
        bidHistory: "Bid history",
        highestBid: "Highest bid",
        timeRemaining: "Ends",
        placeBid: "Place bid",
        autoBid: "Auto bid",
        whatIsAutoBid: "What is auto bid?",
        bidAmount: "Amount",
        bidAmountPlaceholder: "Enter bid...",
        minimumBid: "minimum",
        suggestion: "Suggestion",
        noBidsYet: "No bids yet",
        status: {
          outbid: "Outbid",
          active: "Active auction",
          pending: "Pending",
          sold: "Sold"
        },
        carDetails: {
          regNumber: "Reg. no.",
          year: "Year",
          vin: "VIN",
          volume: "Volume",
          mileage: "Mileage",
          fuel: "Fuel",
          transmission: "Transmission",
          equipment: "Equipment",
          name: "Name",
          email: "Email"
        }
      },
      faq: {
        title: "Frequently asked questions",
        questions: [
          {
            question: "How does the auction process work?",
            answer: "The auction process is simple. When a car is put up for auction, dealers can submit bids..."
          },
          {
            question: "What does it cost to participate in auctions?",
            answer: "It costs nothing to participate in auctions. You only pay if you win the auction..."
          },
          {
            question: "How can I see my purchases?",
            answer: "You can see all your purchases in the \"My purchases\" section in the left sidebar..."
          }
        ]
      }
    }
  },
  no: {

  }
};

const I18nContext = createContext({ lang: "is", t: (k) => k, setLang: () => {} });

export function I18nProvider({ children }) {
  // Always start with 'is' to avoid server/client hydration mismatch
  const [lang, setLangState] = useState("is");

  const setLang = (l) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEYS.language, l);
  };

  useEffect(() => {
    // After mount, pick up saved language (client-only) to update without hydration errors
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.language);
      if (saved && saved !== lang) setLangState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => {
    const dict = translations[lang] || translations.is;
    return (key) => key.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), dict) || key;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() { return useContext(I18nContext); }