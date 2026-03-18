export const introOverlayText = {
  title: 'Ein Käse. Ein Tausch. Ein Fehler.',
  body: `Für ein kleines Stück Käse hat die Maus mehr preisgegeben, als es auf den ersten Blick scheint.

Vor- und Nachname, postalische Anschrift, Hobbys und E-Mail-Adresse reichen oft schon aus, um eine Person eindeutig zuzuordnen, Kontakt aufzunehmen, Profile zu bilden und Vertrauen auszunutzen. Solche Daten können für personalisierte Phishing-Nachrichten, Identitätsmissbrauch, Social Engineering, ungewollte Werbung, Scoring oder die Verknüpfung mit weiteren Informationen genutzt werden.

Gerade die Kombination aus Identitätsdaten, Kontaktinformationen und Alltagswissen macht Menschen angreifbar. Wer weiß, wie jemand heißt, wo diese Person erreichbar ist und wofür sie sich interessiert, kann glaubwürdige Nachrichten formulieren, sich als vertrauenswürdige Stelle ausgeben oder sensible Folgeinformationen abfragen.

Darum ist das Recht auf informationelle Selbstbestimmung so wichtig: Menschen sollen selbst entscheiden können, wer was über sie weiß und wofür diese Informationen verwendet werden.

Die DSGVO fiel nicht vom Himmel. Sie knüpft an Grundrechte an: den Schutz des Privatlebens, den Schutz personenbezogener Daten und die Kontrolle durch unabhängige Stellen. Datenschutz ist deshalb nicht bloß Bürokratie, sondern ein Schutzschild für Freiheit, Würde und faire digitale Teilhabe.

Hilf der Maus jetzt dabei, Wissen aufzubauen, sichere Entscheidungen zu treffen und sich am Ende gegen den Datenmissbrauch zu wehren.`
};

export const stations = [
  {
    key: 'grundrechte',
    title: 'Station 1: Ursprung & Grundrechte',
    theme: 'Warum Datenschutz ein Grundrecht ist',
    color: 0x8ecae6,
    x: 1000,
    lesson: `Datenschutz wurde nicht zufällig erfunden. Die Schulungsfolien zeigen: Das Recht auf Achtung des Privatlebens und das Recht auf Schutz personenbezogener Daten sind grundrechtlich verankert. Daraus leitet sich das Recht auf informationelle Selbstbestimmung ab – also die Kontrolle darüber, wer welche Daten über eine Person nutzen darf. Unabhängige Aufsichtsbehörden überwachen diese Regeln.`,
    questions: [
      {
        question: 'Was schützt das Recht auf informationelle Selbstbestimmung?',
        options: ['Nur staatliche Datenbanken', 'Die Kontrolle über die eigenen personenbezogenen Daten', 'Nur Unternehmensdaten'],
        correct: 1,
        explanation: 'Genau. Es geht um die Kontrolle über Daten, die sich auf eine Person beziehen.'
      },
      {
        question: 'Welche Aussage passt zu den Wurzeln des Datenschutzes?',
        options: ['Die DSGVO entstand ohne Vorgeschichte', 'Datenschutz knüpft an Grundrechte an', 'Datenschutz schützt nur IT-Systeme'],
        correct: 1,
        explanation: 'Richtig. Datenschutz baut auf Grundrechten wie Privatleben und Schutz personenbezogener Daten auf.'
      },
      {
        question: 'Warum sind unabhängige Datenschutzbehörden wichtig?',
        options: ['Sie überwachen die Einhaltung der Datenschutzregeln', 'Sie schreiben Marketingtexte', 'Sie ersetzen Unternehmensleitungen'],
        correct: 0,
        explanation: 'Richtig. Unabhängige Stellen kontrollieren die Einhaltung des Datenschutzrechts.'
      }
    ]
  },
  {
    key: 'personenbezogene_daten',
    title: 'Station 2: Personenbezogene Daten',
    theme: 'Welche Informationen besonders geschützt sind',
    color: 0xffd166,
    x: 1950,
    lesson: `Die Folien definieren personenbezogene Daten als alle Informationen, die sich auf eine Person beziehen und eine Identifizierung ermöglichen oder erleichtern. Dazu gehören nicht nur Name und Adresse, sondern zum Beispiel auch E-Mail-Adressen oder IP-Adressen. Besondere Kategorien – etwa Gesundheitsdaten oder biometrische Daten – genießen einen noch stärkeren Schutz.`,
    questions: [
      {
        question: 'Was sind personenbezogene Daten?',
        options: ['Nur Name und Adresse', 'Alle Informationen, die sich auf eine identifizierbare Person beziehen', 'Nur sensible Daten'],
        correct: 1,
        explanation: 'Richtig. Entscheidend ist der Personenbezug.'
      },
      {
        question: 'Welche der folgenden Angaben kann personenbezogen sein?',
        options: ['Eine IP-Adresse', 'Nur das Firmenlogo', 'Ein beliebiger Wetterbericht'],
        correct: 0,
        explanation: 'Genau. Auch technische Kennungen können personenbezogen sein.'
      },
      {
        question: 'Welche Daten sind besonders sensibel?',
        options: ['Lieblingsfarbe', 'Gesundheitsdaten', 'Abteilungsname'],
        correct: 1,
        explanation: 'Richtig. Gesundheitsdaten zählen zu den besonders geschützten Daten.'
      }
    ]
  },
  {
    key: 'rollen',
    title: 'Station 3: Rollenbilder',
    theme: 'Wer entscheidet, wer verarbeitet',
    color: 0xf4978e,
    x: 2900,
    lesson: `Die DSGVO unterscheidet Rollen. Verantwortliche bestimmen Zweck und Mittel der Verarbeitung. Auftragsverarbeiter handeln im Auftrag und nur nach Weisung. Werden weitere Dienstleister eingebunden, spricht man von Subauftragsverarbeitern. Diese Unterscheidung ist wichtig, weil davon Verantwortung, Verträge und Pflichten abhängen.`,
    questions: [
      {
        question: 'Wer entscheidet über Zweck und Mittel der Datenverarbeitung?',
        options: ['Auftragsverarbeiter', 'Verantwortlicher', 'Betroffene Person'],
        correct: 1,
        explanation: 'Richtig. Der Verantwortliche legt fest, ob und wie verarbeitet wird.'
      },
      {
        question: 'Was darf ein Auftragsverarbeiter tun?',
        options: ['Daten für eigene Zwecke verwenden', 'Daten im Auftrag und nach Weisung verarbeiten', 'Betroffenenrechte abschaffen'],
        correct: 1,
        explanation: 'Genau. Er handelt im Auftrag des Verantwortlichen.'
      },
      {
        question: 'Was ist ein Subauftragsverarbeiter?',
        options: ['Ein weiterer Dienstleister unter dem Auftragsverarbeiter', 'Die Aufsichtsbehörde', 'Die betroffene Person'],
        correct: 0,
        explanation: 'Richtig. Es ist ein nachgelagerter Dienstleister.'
      }
    ]
  },
  {
    key: 'rechtsgrundlagen',
    title: 'Station 4: Rechtsgrundlagen',
    theme: 'Wann Datenverarbeitung erlaubt ist',
    color: 0x90be6d,
    x: 3850,
    lesson: `Eine Verarbeitung personenbezogener Daten ist nicht einfach so erlaubt. Die Folien machen klar: Es braucht eine Rechtsgrundlage. Dazu gehören zum Beispiel Einwilligung, Vertragserfüllung, rechtliche Verpflichtung, lebenswichtige Interessen, öffentliche Aufgabe oder berechtigte Interessen. Zusätzlich muss über die Verarbeitung informiert werden.`,
    questions: [
      {
        question: 'Wann ist eine Verarbeitung personenbezogener Daten rechtmäßig?',
        options: ['Immer, wenn es praktisch ist', 'Nur wenn eine passende Rechtsgrundlage vorliegt', 'Nur mit Freigabe der IT'],
        correct: 1,
        explanation: 'Richtig. Ohne Rechtsgrundlage ist die Verarbeitung unzulässig.'
      },
      {
        question: 'Welche Option ist eine gültige Rechtsgrundlage?',
        options: ['Neugier einer Kollegin', 'Einwilligung der betroffenen Person', 'Schätzung des Teams'],
        correct: 1,
        explanation: 'Genau. Die informierte Einwilligung ist eine anerkannte Rechtsgrundlage.'
      },
      {
        question: 'Was gehört neben der Rechtsgrundlage noch dazu?',
        options: ['Information über die Verarbeitung', 'Ein buntes Dashboard', 'Ein Telefonanruf an die Behörde'],
        correct: 0,
        explanation: 'Richtig. Betroffene müssen informiert werden.'
      }
    ]
  },
  {
    key: 'betroffenenrechte',
    title: 'Station 5: Betroffenenrechte',
    theme: 'Welche Rechte Menschen gegenüber Verantwortlichen haben',
    color: 0xc77dff,
    x: 4800,
    lesson: `Betroffene Personen haben nach den Schulungsfolien klare Rechte: Sie können Informationen verlangen, Auskunft erhalten, Daten berichtigen lassen, Löschung verlangen, die Verarbeitung einschränken, Daten übertragen lassen und Widerspruch einlegen. Diese Rechte machen Datenschutz im Alltag konkret durchsetzbar.`,
    questions: [
      {
        question: 'Welches Recht gehört zu den Betroffenenrechten?',
        options: ['Recht auf Auskunft', 'Recht auf beliebige Datenweitergabe', 'Recht auf Geheimhaltung vor sich selbst'],
        correct: 0,
        explanation: 'Richtig. Das Auskunftsrecht ist ein zentrales Betroffenenrecht.'
      },
      {
        question: 'Was bedeutet das Recht auf Löschung?',
        options: ['Daten dauerhaft löschen lassen können, wenn Voraussetzungen erfüllt sind', 'Daten automatisch an alle schicken', 'Daten in Papierform ausdrucken'],
        correct: 0,
        explanation: 'Genau. Unter bestimmten Voraussetzungen können Daten gelöscht werden.'
      },
      {
        question: 'Was erlaubt das Widerspruchsrecht?',
        options: ['Einer Verarbeitung zu widersprechen', 'Verträge anderer zu ändern', 'Passwörter neu zu vergeben'],
        correct: 0,
        explanation: 'Richtig. Gegen bestimmte Verarbeitungen kann Widerspruch eingelegt werden.'
      }
    ]
  },
  {
    key: 'unternehmen',
    title: 'Station 6: Datenschutz im Unternehmen',
    theme: 'Pflichten, Prozesse und Meldewege',
    color: 0x4cc9f0,
    x: 5750,
    lesson: `Im Unternehmen dürfen Mitarbeitende nur auf personenbezogene Daten zugreifen, wenn sie diese für ihre Aufgaben brauchen. Vertraulichkeit ist Pflicht. Werden Auftragsverarbeiter eingesetzt, braucht es Verträge. Datenschutzverletzungen – etwa E-Mails an falsche Empfänger oder offen sichtbare Verteiler – müssen erkannt und gemeldet werden.`,
    questions: [
      {
        question: 'Wer sollte im Unternehmen Zugriff auf personenbezogene Daten haben?',
        options: ['Alle Mitarbeitenden', 'Nur berechtigte Personen mit Aufgabenbezug', 'Nur externe Dienstleister'],
        correct: 1,
        explanation: 'Richtig. Zugriff folgt dem Need-to-know-Prinzip.'
      },
      {
        question: 'Was ist eine Datenschutzverletzung?',
        options: ['Eine Beeinträchtigung von Verfügbarkeit, Vertraulichkeit oder Richtigkeit personenbezogener Daten', 'Jede Teamsitzung', 'Ein geplanter Systemtest'],
        correct: 0,
        explanation: 'Genau. Eine Datenschutzverletzung betrifft Schutzgüter der Daten.'
      },
      {
        question: 'Was ist bei einer Datenschutzverletzung zu tun?',
        options: ['Ignorieren', 'Sofort intern melden', 'Nur privat notieren'],
        correct: 1,
        explanation: 'Richtig. Sicherheits- und Datenschutzvorfälle müssen gemeldet werden.'
      }
    ]
  },
  {
    key: 'datensicherheit',
    title: 'Station 7: Datensicherheit',
    theme: 'Sicher handeln im Arbeitsalltag',
    color: 0x06d6a0,
    x: 6700,
    lesson: `Datensicherheit zeigt sich im Alltag: Keine unbekannten USB-Sticks verwenden, Phishing kritisch prüfen, Passwörter nicht offen notieren, Bildschirme sperren, Besucher begleiten, Ausdrucke zügig abholen, nur vertrauenswürdige Netzwerke und Software nutzen, auf HTTPS achten, Updates einspielen und im Zweifel die IT kontaktieren.`,
    questions: [
      {
        question: 'Woran erkennt man Phishing eher als eine legitime Nachricht?',
        options: ['Dringlichkeit und verdächtige Links oder Anhänge', 'Ein freundlicher Gruß', 'Eine normale Schriftart'],
        correct: 0,
        explanation: 'Richtig. Ungewöhnliche Links, Anhänge und Druck sind Warnzeichen.'
      },
      {
        question: 'Welche Verhaltensweise ist sicher?',
        options: ['Passwort auf einen Post-it schreiben', 'Bildschirm sperren, wenn man den Arbeitsplatz verlässt', 'Unbekannte USB-Sticks testen'],
        correct: 1,
        explanation: 'Genau. Bildschirm sperren und Unterlagen wegräumen sind wichtige Maßnahmen.'
      },
      {
        question: 'Was ist bei Unsicherheit über einen Vorfall sinnvoll?',
        options: ['Abwarten', 'Die IT kontaktieren', 'Die Nachricht an alle weiterleiten'],
        correct: 1,
        explanation: 'Richtig. Im Zweifel sofort intern nachfragen und melden.'
      }
    ]
  }
];

export const bossFight = {
  title: 'Bosskampf: Jörg, der Datenschutzboss',
  intro: `Bevor die Maus die Katze stellen kann, blockiert Jörg, der Datenschutzboss, den Weg. Er stellt fünf schwierigere Fragen. Sie greifen Inhalte aus der Schulung auf, aber in anspruchsvolleren Anwendungssituationen. Nur wenn alle richtig beantwortet werden, kann die Maus weiterziehen.`,
  questions: [
    {
      question: 'Ein Team möchte Kundendaten aus einem bestehenden Vertragsverhältnis für eine neue, nicht angekündigte Marketingkampagne nutzen. Was ist datenschutzrechtlich zuerst zu prüfen?',
      options: ['Ob die Daten technisch exportierbar sind', 'Ob für diesen neuen Zweck eine passende Rechtsgrundlage und Information der Betroffenen vorliegen', 'Ob die Kampagne schnell genug startet'],
      correct: 1,
      explanation: 'Richtig. Zweckänderung erfordert eine tragfähige Rechtsgrundlage und Transparenz.'
    },
    {
      question: 'Ein externer Dienstleister verarbeitet personenbezogene Daten nur nach Weisung. Später bindet er ohne Abstimmung einen weiteren Hosting-Anbieter ein. Welches Problem liegt nahe?',
      options: ['Keines, solange es billiger ist', 'Es kann ein unzulässiger Einsatz eines Subauftragsverarbeiters vorliegen', 'Nur ein IT-Thema ohne Datenschutzbezug'],
      correct: 1,
      explanation: 'Genau. Der Einsatz weiterer Dienstleister ist vertraglich und organisatorisch abzusichern.'
    },
    {
      question: 'Eine Mitarbeiterin sendet einen Newsletter mit allen Empfängeradressen im CC statt im BCC. Wie ist das am treffendsten einzuordnen?',
      options: ['Als Datenschutzverletzung wegen unbefugter Offenlegung personenbezogener Daten', 'Als reine Formatierungsfrage', 'Als zulässige Sammelkommunikation'],
      correct: 0,
      explanation: 'Richtig. Die E-Mail-Adressen werden unbefugt offengelegt.'
    },
    {
      question: 'Welcher Fall zeigt am besten das Zusammenspiel von Datenschutz und Datensicherheit?',
      options: ['Ein korrekt dokumentierter Löschprozess und gleichzeitig gesperrter Bildschirm beim Verlassen des Arbeitsplatzes', 'Nur ein modernes Logo im Intranet', 'Eine längere Mittagspause'],
      correct: 0,
      explanation: 'Richtig. Datenschutz braucht rechtliche Regeln und technische-organisatorische Schutzmaßnahmen.'
    },
    {
      question: 'Warum ist die Kombination aus Name, Adresse, Hobbys und E-Mail-Adresse riskanter als jede Angabe für sich allein?',
      options: ['Weil kombinierte Daten die Identifizierung, Profilbildung und glaubwürdige Kontaktaufnahme erleichtern', 'Weil Hobbys automatisch geheim sind', 'Weil Adressen nie personenbezogen sind'],
      correct: 0,
      explanation: 'Genau. Erst die Kombination erhöht oft die Aussagekraft und Missbrauchsgefahr deutlich.'
    }
  ]
};

export const credits = {
  sources: [
    'Schulungsfolien DSGVO_Basics.pdf',
    'Introtexte zusätzlich fachlich an Grundrechten, informationeller Selbstbestimmung und typischen Missbrauchsrisiken personenbezogener Daten ausgerichtet.'
  ]
};
