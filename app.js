const appState = {
  lives: 3,
  timer: 0,
  timerId: null,
  completed: new Set(),
  currentScreen: 'menu',
  quizQueue: [],
  currentStationId: null,
  bestTime: Number(localStorage.getItem('dataQuestBestTime') || 0),
  avatarPos: { left: 40, top: 72 },
  introIndex: 0,
  outroIndex: 0,
  bossIndex: 0,
  allowWorldClick: false
};

const stations = [
  {
    id: 'rights', x: 7, y: 68,
    name: 'Eule Erika', topic: 'Grundrechte', animal: 'owl',
    lesson: [
      {speaker:'Eule Erika', title:'Datenschutz ist ein Grundrecht', lines:[
        'Datenschutz ist nicht einfach ein nettes Extra. Er schützt Menschen davor, dass ihre Persönlichkeit durch einen unsicheren oder unbegrenzten Umgang mit Daten beeinträchtigt wird.',
        'Die Folien zeigen: Die DSGVO fiel nicht vom Himmel. Schon Art. 8 EMRK, Art. 7 und 8 der Grundrechtecharta und in Österreich auch § 1 DSG schützen Privatleben und personenbezogene Daten.'
      ]},
      {speaker:'Eule Erika', title:'Informationelle Selbstbestimmung', lines:[
        'Der Kern ist das Recht auf informationelle Selbstbestimmung: Du sollst in allen Lebensbereichen mitentscheiden können, wer was über dich weiß und wofür diese Daten genutzt werden.',
        'Darum braucht es Regeln, Rechte der Betroffenen und eine Kontrolle durch unabhängige Stellen.'
      ]},
      {speaker:'Eule Erika', title:'Warum das wichtig ist', lines:[
        'Wenn Menschen die Kontrolle über ihre Daten verlieren, verlieren sie schnell auch Kontrolle über Kontakte, Entscheidungen und Chancen.',
        'Datenschutz schützt also Freiheit, Würde und Vertrauen - nicht nur Aktenordner.'
      ]}
    ],
    questions: [
      {context:'Im Team sagt jemand: „Datenschutz ist doch nur Bürokratie.“ Du willst widersprechen und den Kern erklären.',
       question:'Welche Aussage trifft den Zweck des Datenschutzrechts am besten?',
       options:['Datenschutz soll vor allem Unternehmen vor Beschwerden schützen.','Datenschutz schützt einzelne Personen vor Beeinträchtigungen ihrer Persönlichkeit durch einen sicheren und begrenzten Umgang mit Daten.','Datenschutz gilt nur für besonders geheime staatliche Daten.'], correct:1},
      {context:'Eine Kollegin fragt, warum die DSGVO so ausführlich Rechte und Pflichten regelt.',
       question:'Welche Idee steht hinter dem Recht auf informationelle Selbstbestimmung?',
       options:['Menschen sollen selbst entscheiden können, wer welche Informationen über sie verwenden darf.','Unternehmen sollen Daten frei austauschen können, solange es praktisch ist.','Behörden sollen jede Datenverarbeitung vorher genehmigen müssen.'], correct:0},
      {context:'Du fasst die Folien für neue Mitarbeitende zusammen.',
       question:'Welche Aussage ist richtig?',
       options:['Die DSGVO entstand ohne Vorläufer und ohne Grundrechtsbezug.','Datenschutz ist nur eine freiwillige Empfehlung.','Der Schutz personenbezogener Daten ist als Grundrecht verankert und wird von unabhängigen Stellen überwacht.'], correct:2}
    ]
  },
  {
    id: 'data', x: 21, y: 76,
    name: 'Schildkröte Theo', topic: 'Personenbezogene Daten', animal: 'turtle',
    lesson: [
      {speaker:'Theo', title:'Was sind personenbezogene Daten?', lines:[
        'Personenbezogene Daten sind alle Informationen, die sich auf eine Person beziehen - also alles, womit jemand erkannt oder von anderen unterschieden werden kann.',
        'Dazu gehören offensichtliche Angaben wie Name und Adresse, aber oft auch Kundennummern, Standortdaten, E-Mail-Adressen oder IP-Adressen.'
      ]},
      {speaker:'Theo', title:'Was gilt überhaupt?', lines:[
        'Die DSGVO erfasst automatisierte Verarbeitungen und auch nichtautomatisierte Verarbeitungen, wenn Daten nach bestimmten Kriterien geordnet sind.',
        'Sie schützt natürliche Personen. Wer innerhalb der EU Daten verarbeitet oder Personen in der EU Waren, Dienstleistungen oder Beobachtung aussetzt, kann in den Anwendungsbereich fallen.'
      ]},
      {speaker:'Theo', title:'Besondere Kategorien', lines:[
        'Einige Daten sind besonders sensibel: etwa Gesundheitsdaten, biometrische Daten zur eindeutigen Identifizierung, politische Meinungen, religiöse Überzeugungen oder Daten zum Sexualleben.',
        'Mit solchen Daten muss besonders vorsichtig umgegangen werden.'
      ]}
    ],
    questions: [
      {context:'In einer Excel-Liste stehen Kundennummer, E-Mail-Adresse und Lieferhistorie. Ein Kollege meint, das seien keine personenbezogenen Daten, weil kein Geburtsdatum dabei ist.',
       question:'Was stimmt?',
       options:['Die Liste enthält personenbezogene Daten, wenn die Person dadurch erkannt oder unterscheidbar wird.','Personenbezogene Daten liegen nur vor, wenn zusätzlich Geburtsdatum und Adresse vorhanden sind.','Nur Gesundheitsdaten sind personenbezogene Daten.'], correct:0},
      {context:'Du prüfst, welche Informationen besonders sorgfältig behandelt werden müssen.',
       question:'Welche Daten zählen zu den besonders geschützten Kategorien?',
       options:['Lieblingsfarbe, Schuhgröße und Abteilung.','Gesundheitsdaten, biometrische Daten zur eindeutigen Identifizierung und politische Meinungen.','Nur die private Telefonnummer.'], correct:1},
      {context:'Ein Team digitalisiert alte Karteikarten und sortiert sie nach Kundennummer.',
       question:'Was folgt daraus für die DSGVO?',
       options:['Nicht automatisierte, geordnete Datenbestände können ebenfalls unter die DSGVO fallen.','Die DSGVO gilt nur für Apps und Datenbanken, nie für Papier.','Papierunterlagen sind immer frei von Datenschutzregeln.'], correct:0}
    ]
  },
  {
    id: 'roles', x: 36, y: 66,
    name: 'Hund Hugo', topic: 'Rollenbilder', animal: 'dog',
    lesson: [
      {speaker:'Hugo', title:'Wer ist wofür verantwortlich?', lines:[
        'Der Verantwortliche entscheidet über Zwecke und Mittel der Verarbeitung. Er entscheidet also, ob und wie Daten verarbeitet werden, und trägt dafür die rechtliche Verantwortung.',
        'Betroffene Personen üben ihre Rechte gegenüber dem Verantwortlichen aus.'
      ]},
      {speaker:'Hugo', title:'Auftragsverarbeiter', lines:[
        'Ein Auftragsverarbeiter verarbeitet Daten im Auftrag des Verantwortlichen. Er darf nur das tun, was schriftlich angewiesen wurde.',
        'Wer noch weitere Dienstleister einsetzt, arbeitet mit Subauftragsverarbeitern. Dafür braucht es klare Regeln.'
      ]},
      {speaker:'Hugo', title:'Warum Rollen wichtig sind', lines:[
        'Viele Probleme entstehen, weil niemand sauber trennt, wer entscheidet und wer nur ausführt.',
        'Darum sind Rollenbilder in der DSGVO so wichtig: Sie klären Verantwortung, Weisungen und Haftung.'
      ]}
    ],
    questions: [
      {context:'Ein Unternehmen entscheidet selbst, welche Kundendaten erhoben werden, wie lange sie gespeichert werden und welche Tools genutzt werden.',
       question:'Welche Rolle hat dieses Unternehmen?',
       options:['Auftragsverarbeiter','Betroffene Person','Verantwortlicher'], correct:2},
      {context:'Ein externer IT-Dienstleister hostet eine Anwendung nur nach schriftlichen Vorgaben des Auftraggebers.',
       question:'Welche Aussage beschreibt seine Rolle am besten?',
       options:['Er ist Auftragsverarbeiter und darf Daten nur im Rahmen der Weisung verarbeiten.','Er wird automatisch selbst Verantwortlicher für alle Daten.','Er darf die Daten auch für eigene Zwecke nutzen, wenn das technisch bequem ist.'], correct:0},
      {context:'Der beauftragte Dienstleister zieht für einen Teil der Leistung noch einen weiteren technischen Anbieter hinzu.',
       question:'Wie heißt diese weitere Rolle?',
       options:['Subauftragsverarbeiter','Informationspflichtiger','Dateninhaber'], correct:0}
    ]
  },
  {
    id: 'legal', x: 48, y: 78,
    name: 'Fuchs Frieda', topic: 'Rechtsgrundlagen', animal: 'fox',
    lesson: [
      {speaker:'Frieda', title:'Verbot mit Erlaubnisvorbehalt', lines:[
        'Die Folien bringen es auf den Punkt: Die Verarbeitung personenbezogener Daten ist verboten - außer man kann sich auf eine passende Rechtsgrundlage stützen.',
        'Ohne Rechtsgrundlage darf man Daten also nicht einfach kopieren, verschicken, ändern oder auf sonstige Weise verarbeiten.'
      ]},
      {speaker:'Frieda', title:'Die wichtigsten Grundlagen', lines:[
        'Zu den Grundlagen zählen vor allem die informierte Einwilligung, die Vertragserfüllung oder vorvertragliche Maßnahmen, rechtliche Verpflichtungen, lebenswichtige Interessen, Aufgaben im öffentlichen Interesse und berechtigte Interessen.',
        'Welche Grundlage passt, hängt vom konkreten Zweck ab.'
      ]},
      {speaker:'Frieda', title:'Nicht vergessen: Information', lines:[
        'Zusätzlich muss über die Verarbeitung informiert werden, etwa nach Art. 13 und 14 DSGVO.',
        'Rechtmäßig ist eine Verarbeitung also nur, wenn sowohl die Grundlage passt als auch transparent informiert wird.'
      ]}
    ],
    questions: [
      {context:'Ein Vertriebsteam will alte Kontaktdaten für einen neuen Zweck nutzen, hat aber keine Einwilligung und keine andere passende Grundlage geprüft.',
       question:'Was ist datenschutzrechtlich der erste Prüfpunkt?',
       options:['Ob eine ausreichende Rechtsgrundlage für diesen Zweck vorliegt.','Ob die Daten schon einmal irgendwo gespeichert waren.','Ob die Datenmenge klein genug ist.'], correct:0},
      {context:'Eine Person bestellt online ein Produkt. Dafür werden Adresse und Zahlungsdaten verarbeitet.',
       question:'Welche Rechtsgrundlage kann hier typischerweise passen?',
       options:['Erfüllung eines Vertrages oder vorvertragliche Maßnahmen.','Beliebige Nutzung, weil die Person Kunde ist.','Nur eine mündliche Einwilligung in jeden einzelnen Verarbeitungsschritt.'], correct:0},
      {context:'Du erklärst einem Team die Verbindung aus Rechtsgrundlage und Transparenz.',
       question:'Welche Aussage ist richtig?',
       options:['Eine passende Rechtsgrundlage reicht immer aus, Informationen an Betroffene sind unnötig.','Rechtmäßig ist die Verarbeitung nur, wenn eine passende Grundlage vorliegt und über die Verarbeitung informiert wird.','Sobald Daten intern bleiben, braucht es keine Rechtsgrundlage.'], correct:1}
    ]
  },
  {
    id: 'rights2', x: 62, y: 68,
    name: 'Bär Bruno', topic: 'Betroffenenrechte', animal: 'bear',
    lesson: [
      {speaker:'Bruno', title:'Rechte der betroffenen Personen', lines:[
        'Betroffene Personen haben starke Rechte gegenüber dem Verantwortlichen. Dazu gehören Informationspflicht, Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch und Schutz vor ausschließlich automatisierten Entscheidungen.',
        'Diese Rechte machen Datenschutz im Alltag greifbar.'
      ]},
      {speaker:'Bruno', title:'Was bedeuten die Rechte praktisch?', lines:[
        'Auskunft heißt: Eine Person kann erfahren, welche Daten zu welchen Zwecken verarbeitet werden, welche Kategorien betroffen sind, wer Empfänger ist und welche Rechte bestehen.',
        'Löschung kommt zum Beispiel in Betracht, wenn kein Vertrag mehr besteht, wirksam widersprochen wurde und keine gesetzliche Aufbewahrungspflicht entgegensteht.'
      ]},
      {speaker:'Bruno', title:'Warum das wichtig ist', lines:[
        'Diese Rechte sorgen dafür, dass Menschen nicht ausgeliefert sind, sondern nachfragen, korrigieren oder widersprechen können.',
        'Wer Datenschutz ernst nimmt, muss solche Anfragen erkennen und weiterleiten können.'
      ]}
    ],
    questions: [
      {context:'Eine Kundin möchte wissen, welche Daten über sie gespeichert sind und an wen diese weitergegeben wurden.',
       question:'Auf welches Recht beruft sie sich?',
       options:['Recht auf Auskunft','Recht auf Datenverkürzung','Recht auf Geheimhaltung gegenüber der Person selbst'], correct:0},
      {context:'Ein ehemaliger Vertrag ist beendet. Die Person verlangt, dass ihre Daten entfernt werden. Es gibt keine gesetzliche Aufbewahrungspflicht mehr.',
       question:'Welches Recht kann hier einschlägig sein?',
       options:['Recht auf Löschung','Nur das Recht auf Berichtigung','Keines, weil Daten nie gelöscht werden dürfen'], correct:0},
      {context:'Ein Bewerber möchte seine Daten in einem gängigen Format erhalten, um sie an einen anderen Anbieter mitzunehmen.',
       question:'Welches Recht passt dazu?',
       options:['Recht auf Widerspruch','Recht auf Datenübertragbarkeit','Recht auf öffentliche Einsicht'], correct:1}
    ]
  },
  {
    id: 'company', x: 74, y: 78,
    name: 'Hase Hanna', topic: 'Unternehmen & Prozesse', animal: 'rabbit',
    lesson: [
      {speaker:'Hanna', title:'Datenschutz im Unternehmen', lines:[
        'Im Unternehmen dürfen Mitarbeitende nur auf personenbezogene Daten zugreifen, wenn sie diese für ihre Aufgaben benötigen. Zugang richtet sich also nach Rollen und Anordnungen.',
        'Außerdem müssen Mitarbeitende auf Stillschweigen verpflichtet werden.'
      ]},
      {speaker:'Hanna', title:'Prozesse und Vereinbarungen', lines:[
        'Wird ein Auftragsverarbeiter beauftragt, braucht es eine Auftragsverarbeitungsvereinbarung.',
        'Als Auftragsverarbeiter verarbeitet man Daten nur im Rahmen schriftlicher Aufträge, trifft technische und organisatorische Maßnahmen, unterstützt bei Anfragen und meldet neue Subauftragsverarbeiter.'
      ]},
      {speaker:'Hanna', title:'To-dos und Data Breach', lines:[
        'Zu den To-dos zählen Verarbeitungsverzeichnis, Übersicht über Auftragsverarbeiter und Verträge, definierte Prozesse und Datenschutzrichtlinien.',
        'Eine Datenschutzverletzung liegt vor, wenn Verfügbarkeit, Vertraulichkeit oder Richtigkeit personenbezogener Daten beeinträchtigt wird - etwa bei einer E-Mail an den falschen Empfänger oder einem Hackingangriff. Das muss gemeldet werden.'
      ]}
    ],
    questions: [
      {context:'Eine Mitarbeiterin möchte auf einen Datenbestand zugreifen, der nichts mit ihrer Aufgabe zu tun hat.',
       question:'Was ist richtig?',
       options:['Zugriff ist nur erlaubt, wenn er für die jeweilige Aufgabe erforderlich ist.','Interner Zugriff ist immer zulässig.','Wer im Unternehmen arbeitet, darf jede Kundenakte öffnen.'], correct:0},
      {context:'Ein externer Dienstleister soll personenbezogene Daten im Auftrag verarbeiten.',
       question:'Was braucht es dafür?',
       options:['Nur eine mündliche Absprache.','Eine Auftragsverarbeitungsvereinbarung.','Gar nichts, solange der Dienstleister seriös wirkt.'], correct:1},
      {context:'Ein Newsletter wurde versehentlich an alle Empfänger im cc statt im bcc versendet.',
       question:'Wie ist dieser Vorfall einzuordnen?',
       options:['Als normale Kleinigkeit ohne Relevanz.','Als Datenschutzverletzung, die gemeldet werden muss.','Als zulässige Direktwerbung.'], correct:1}
    ]
  },
  {
    id: 'tkg', x: 86, y: 64,
    name: 'Adler Amir', topic: 'TKG & Direktwerbung', animal: 'eagle',
    lesson: [
      {speaker:'Amir', title:'Direktwerbung ist nicht frei', lines:[
        'Das Telekommunikationsgesetz ist bei Direktwerbung wichtig. Die Folien sagen ausdrücklich: Unerbetene Anrufe oder E-Mails zu Werbezwecken sind grundsätzlich unzulässig - sowohl im B2C- als auch nach ständiger Rechtsprechung im B2B-Bereich.',
        'Wer werblich kommunizieren will, muss die Regeln sehr genau prüfen.'
      ]},
      {speaker:'Amir', title:'Einwilligung und Ausnahmefälle', lines:[
        'Oft braucht es eine vorherige Einwilligung. Unter bestimmten gesetzlichen Bedingungen kann Werbung auch ohne neue Einwilligung zulässig sein, aber das ist ein enger Rahmen und kein Freifahrtschein.',
        'Saubere Dokumentation ist hier besonders wichtig.'
      ]},
      {speaker:'Amir', title:'Double-Opt-in', lines:[
        'Wenn jemand seine E-Mail-Adresse eingibt, muss sichergestellt werden, dass sie nicht missbräuchlich benutzt wurde - etwa durch ein Double-Opt-in.',
        'Fehlt diese Absicherung, kann eine Verletzung des Grundrechts auf Geheimhaltung vorliegen.'
      ]}
    ],
    questions: [
      {context:'Ein Team möchte spontan eine gekaufte Adressliste für Werbe-E-Mails nutzen.',
       question:'Welche Aussage passt zu den Folien?',
       options:['Werbe-E-Mails ohne vorherige Einwilligung sind grundsätzlich unzulässig.','Werbung per E-Mail ist immer erlaubt, wenn sie höflich formuliert ist.','Im B2B-Bereich gelten nie Regeln zur Direktwerbung.'], correct:0},
      {context:'Auf einer Plattform trägt jemand eine E-Mail-Adresse ein. Das Unternehmen möchte sicherstellen, dass die Adresse wirklich zu dieser Person gehört.',
       question:'Welche Maßnahme ist dafür typisch?',
       options:['Double-Opt-in','Automatisches Verschicken beliebiger Werbung','Ein öffentlicher Aushang der Adresse'], correct:0},
      {context:'Eine Kollegin meint: „Wenn wir B2B werben, gilt das Telekommunikationsgesetz nicht.“',
       question:'Was ist nach den Folien richtig?',
       options:['Das TKG ist nur für Privatkunden relevant.','Das TKG gilt auch im B2B-Kontext.','Direktwerbung ist nur im B2B ohne Einwilligung immer erlaubt.'], correct:1}
    ]
  },
  {
    id: 'security', x: 90, y: 82,
    name: 'Dachs Daria', topic: 'Datensicherheit', animal: 'badger',
    lesson: [
      {speaker:'Daria', title:'Datengeheimnis und Alltag', lines:[
        'Personenbezogene Daten, die dir im Job anvertraut oder zugänglich gemacht werden, sind geheim zu halten. Unbefugte dürfen weder Einsicht erhalten noch die Daten verwenden.',
        'Datensicherheit zeigt sich im Alltag: am Schreibtisch, im Browser, auf Reisen, beim Drucker und beim E-Mail-Versand.'
      ]},
      {speaker:'Daria', title:'Typische Risiken', lines:[
        'Geschenkte oder gefundene USB-Sticks können Schadsoftware enthalten. Phishing-Mails erkennt man oft an ungewöhnlichen Links, Anhängen oder einem merkwürdigen Gefühl. Passwörter gehören nicht auf Post-its und nicht unverschlüsselt per E-Mail.',
        'Apps und Programme sollten nur aus vertrauenswürdigen Quellen kommen. Öffentliches WLAN ist riskant. HTTPS und Updates sind wichtig, damit Daten nicht leicht mitgelesen oder Sicherheitslücken ausgenutzt werden können.'
      ]},
      {speaker:'Daria', title:'Sauberes Verhalten', lines:[
        'Verlässt du den Arbeitsplatz, räume Unterlagen weg und sperre den Bildschirm. Lass Besucher nicht unbeaufsichtigt durch Büros laufen. Hole Ausdrucke sofort ab und kontrolliere beim Mailversand den Empfänger.',
        'Wenn du einen Sicherheitsvorfall vermutest oder dir bei einer Mail unsicher bist, kontaktiere die IT.'
      ]}
    ],
    questions: [
      {context:'Du verlässt kurz den Arbeitsplatz. Auf dem Tisch liegen Unterlagen mit personenbezogenen Daten, der Bildschirm ist noch offen.',
       question:'Was ist in dieser Situation richtig?',
       options:['Unterlagen wegräumen und den Bildschirm sperren.','Nur den Bildschirm heller stellen.','Nichts tun - du bist ja gleich zurück.'], correct:0},
      {context:'Du erhältst eine E-Mail mit dringend klingender Zahlungsaufforderung und einem merkwürdigen Link. Du bist unsicher, ob die Nachricht echt ist.',
       question:'Wie reagierst du richtig?',
       options:['Link sofort öffnen, damit nichts eskaliert.','Die Nachricht ignorieren und niemandem davon erzählen.','Vorsichtig prüfen und bei Unsicherheit die IT kontaktieren.'], correct:2},
      {context:'Am Drucker liegt ein Ausdruck mit Kundendaten. Gleichzeitig möchte ein Kollege ein neues Tool aus einer unbekannten Quelle installieren.',
       question:'Welche Kombination ist datensicher?',
       options:['Ausdruck sofort mitnehmen und Software nur aus vertrauenswürdigen Quellen oder nach Rücksprache mit der IT installieren.','Ausdruck liegen lassen und die neue Software einfach testen.','Öffentliches WLAN nutzen, um die Software schneller herunterzuladen.'], correct:0}
    ]
  }
];

const bossQuestions = [
  {context:'Ein Team will für einen neuen Analysezweck vorhandene Kundendaten weiterverwenden. Ein Vertrag deckt diesen Zweck nicht ab. Es gibt auch keine Einwilligung. Ein Kollege meint, interne Nutzung sei immer erlaubt.',
   question:'Welche Prüfung ist zuerst nötig?',
   options:['Ob für den neuen Zweck eine eigene passende Rechtsgrundlage besteht und transparent informiert wurde.','Ob die Datenmenge klein genug ist.','Ob die Analyse technisch spannend genug ist.'], correct:0},
  {context:'Ein Auftragsverarbeiter möchte einen weiteren Cloud-Dienst einschalten, über den personenbezogene Daten verarbeitet werden. Gleichzeitig sollen Daten nach Ende der Zusammenarbeit weiter intern für eigene Auswertungen genutzt werden.',
   question:'Welche Aussage ist richtig?',
   options:['Neue Subauftragsverarbeiter müssen angezeigt werden; Daten dürfen nicht zu eigenen Zwecken weiterverarbeitet werden.','Als Auftragsverarbeiter darf man Daten nach Projektende für eigene Zwecke behalten.','Subauftragsverarbeiter brauchen nie besondere Regeln.'], correct:0},
  {context:'Ein Marketingteam versendet einen Newsletter an viele Empfänger offen im cc. Kurz darauf fragt eine betroffene Person nach Auskunft und Löschung.',
   question:'Was trifft zu?',
   options:['Es liegt keine Datenschutzverletzung vor, solange nur E-Mail-Adressen betroffen sind.','Die offene cc-Liste kann eine meldepflichtige Datenschutzverletzung sein; die Betroffenenrechte müssen trotzdem bearbeitet werden.','Betroffenenrechte ruhen automatisch, solange ein Vorfall untersucht wird.'], correct:1},
  {context:'Auf einer Messe wird auf einem Notebook ohne Sichtschutzfolie gearbeitet. Gleichzeitig notiert jemand Passwörter auf einem Zettel neben dem Gerät.',
   question:'Welches Risiko beschreiben die Folien hier besonders?',
   options:['Nur das Risiko eines Stromausfalls.','Shoulder Surfing und unbefugter Zugriff auf Informationen.','Ausschließlich das Risiko eines Vertragsfehlers.'], correct:1},
  {context:'Ein Unternehmen möchte Werbe-E-Mails versenden, nachdem Personen ihre E-Mail-Adresse in ein Formular eingetragen haben. Es wurde aber nicht geprüft, ob die Adresse wirklich ihnen gehört.',
   question:'Warum ist das problematisch?',
   options:['Weil ohne Absicherung wie Double-Opt-in die Adresse missbräuchlich verwendet worden sein könnte.','Weil Werbe-E-Mails grundsätzlich nie dokumentiert werden dürfen.','Weil B2B-Werbung immer ohne jede Voraussetzung erlaubt ist.'], correct:0}
];

const introStory = [
  {side:'left-top', speaker:'Maus', title:'Ein Stück Käse...', text:'"Oh, ein Stück Käse wäre jetzt perfekt."'},
  {side:'right-bottom', speaker:'Katze', title:'Ein verlockendes Angebot', text:'"Ich hätte Käse. Ich brauche dafür nur ein paar Infos: Vor- und Nachname, Anschrift, Hobbys und deine E-Mail-Adresse."'},
  {side:'left-top', speaker:'Maus', title:'Sie willigt ein', text:'"Das klingt harmlos. Gut, ich sage es dir."'},
  {side:'right-bottom', speaker:'Erzählstimme', title:'Mehr als genug', text:'Für ein Stück Käse hat die Maus genug preisgegeben, um identifiziert, kontaktiert und mit glaubwürdigen Nachrichten getäuscht zu werden. Hilf ihr jetzt, Risiken zu erkennen und künftig bewusster zu entscheiden.'}
];

const outroStory = [
  {side:'left-top', speaker:'Katze', title:'Noch einmal versuchen?', text:'"Ich hätte wieder ein Stück Käse. Nur ein paar Infos. Nichts Wichtiges."'},
  {side:'right-bottom', speaker:'Maus', title:'Diesmal anders', text:'"Ich weiß jetzt, was mit meinen Daten passieren kann."'},
  {side:'left-top', speaker:'Maus', title:'Eigene Entscheidung', text:'"Und ich entscheide selbst, wem ich sie gebe. Nein. Diesmal nicht."'},
  {side:'right-bottom', speaker:'Erzählstimme', title:'Das ist die Botschaft', text:'Datenschutz bedeutet: Du triffst informierte Entscheidungen über deine Daten - nicht aus Angst, sondern aus Verständnis.'}
];

function $(id){ return document.getElementById(id); }
function shuffleQuestion(question){
  const entries = question.options.map((text, idx) => ({text, correct: idx === question.correct}));
  for(let i=entries.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [entries[i], entries[j]]=[entries[j],entries[i]]; }
  return {...question, entries, correctIndex: entries.findIndex(e => e.correct)};
}

function resetGame(full = true){
  appState.lives = 3;
  appState.timer = 0;
  appState.completed = new Set();
  appState.currentStationId = null;
  appState.quizQueue = [];
  appState.bossIndex = 0;
  appState.introIndex = 0;
  appState.outroIndex = 0;
  if(full){ stopTimer(); }
  updateHud();
}

function startTimer(){
  stopTimer();
  appState.timerId = setInterval(()=>{
    appState.timer += 1;
    $('timer').textContent = formatTime(appState.timer);
  },1000);
}
function stopTimer(){ if(appState.timerId) clearInterval(appState.timerId); appState.timerId = null; }
function formatTime(sec){ const m=String(Math.floor(sec/60)).padStart(2,'0'); const s=String(sec%60).padStart(2,'0'); return `${m}:${s}`; }
function setHint(text){ $('hint').textContent = text; }
function updateHud(){
  $('lives').textContent = '♥'.repeat(appState.lives) + '♡'.repeat(Math.max(0,3-appState.lives));
  $('timer').textContent = formatTime(appState.timer);
  $('progress').textContent = `${appState.completed.size} / 8`;
}

function renderMenu(){
  appState.currentScreen = 'menu';
  stopTimer();
  setHint('Starte das Spiel oder überspringe direkt in die Schulung.');
  $('screen').innerHTML = `
    <div class="scene-stage scenic">
      <div class="layer-hill hill-back"></div>
      <div class="layer-hill hill-front"></div>
      <div class="path"></div>
      <div class="menu-wrap">
        <div class="menu-card">
          <div>
            <span class="ribbon">Comic Edition v14</span>
            <h1 class="title">Data Quest - Die Maus und das Geheimnis der Daten</h1>
            <p class="sub">Eine interaktive Schulung im klassischen Comicstil. Die Maus trifft Tiere, die ihr Datenschutz und Datensicherheit leicht verständlich erklären. Danach wartet die Abschlussprüfung mit Jörg.</p>
            <ul class="bullets">
              <li>8 Lernstationen mit vollständigen, leicht verständlichen Inhalten</li>
              <li>Quizfragen mit Kontext statt bloßer Stichwortabfrage</li>
              <li>Bossprüfung mit 5 schwierigeren Fragen</li>
              <li>Bestzeit, 3-Leben-System und Abschlusszertifikat</li>
            </ul>
          </div>
          <div class="stack">
            <button class="cta" onclick="beginStory()">Spiel starten</button>
            <button class="cta secondary" onclick="skipToWorld()">Direkt zur Schulung</button>
            <p class="side-note">Die Inhalte basieren auf den Themenblöcken deiner Folien: Grundrechte und informationelle Selbstbestimmung, personenbezogene Daten, Rollenbilder, Rechtsgrundlagen, Betroffenenrechte, Unternehmenspflichten, TKG/Double-Opt-in und Datensicherheit.</p>
            <p class="side-note">Bestzeit: <strong>${appState.bestTime ? formatTime(appState.bestTime) : 'noch keine'}</strong></p>
          </div>
        </div>
      </div>
    </div>`;
}

function beginStory(){
  resetGame(true);
  renderIntroScene();
}
function skipToWorld(){
  resetGame(true);
  startTimer();
  renderWorld();
}

function renderIntroScene(){
  appState.currentScreen = 'intro';
  setHint('Lies die Szene und klicke weiter.');
  const story = introStory[appState.introIndex];
  $('screen').innerHTML = `
    <div class="scene-stage stage-intro scenic">
      <div class="story-scene">
        <div class="layer-hill hill-back"></div>
        <div class="layer-hill hill-front"></div>
        <div class="desk"><div class="desk-top"></div></div>
        <div class="window-card">DSGVO</div>
        <div class="sprite mouse"></div>
        <div class="sprite cat"></div>
        <div class="sprite cheese"></div>
      </div>
    </div>`;
  showStoryBubble(story, appState.introIndex === introStory.length -1 ? () => { startTimer(); renderWorld(); } : () => { appState.introIndex++; renderIntroScene(); });
}

function renderWorld(){
  appState.currentScreen = 'world';
  setHint(appState.completed.size === stations.length ? 'Alle Tiere sind fertig. Öffne die Bossprüfung.' : 'Sprich nacheinander mit den Tieren.');
  updateHud();
  const avatar = `<div class="avatar" id="avatar" style="left:${appState.avatarPos.left}%; top:${appState.avatarPos.top}%;"></div>`;
  const stationHtml = stations.map(s => `
    <div class="station ${appState.completed.has(s.id)?'done':''}" style="left:${s.x}%; top:${s.y}%;" onclick="openStation('${s.id}')">
      <div class="animal" style="background-image:url('assets/images/${s.animal}.svg')"></div>
      <div class="label-card">
        <div class="name">${s.name}</div>
        <div class="topic">${s.topic}</div>
      </div>
    </div>`).join('');
  const bossReady = appState.completed.size === stations.length;
  const bossHtml = bossReady ? `
    <div class="station" style="left:46%; top:32%;" onclick="openBoss()">
      <div class="animal" style="width:140px;height:170px;background-image:url('assets/images/jorg.svg')"></div>
      <div class="label-card"><div class="name">Jörg</div><div class="topic">Abschlussprüfung</div></div>
    </div>` : '';
  const sparkles = Array.from({length: 18}, (_,i) => `<div class="sparkle" style="left:${8 + (i*5)%84}%; top:${62 + (i*11)%26}%; animation-delay:${(i*.12).toFixed(2)}s"></div>`).join('');
  $('screen').innerHTML = `
    <div class="scene-stage scenic">
      <div class="layer-hill hill-back"></div>
      <div class="layer-hill hill-front"></div>
      <div class="path"></div>
      <div class="logo-tag">Datenschutzpfad</div>
      <div class="sparkles">${sparkles}</div>
      ${avatar}
      ${stationHtml}
      ${bossHtml}
    </div>`;
}

function showStoryBubble(story, onNext){
  $('modal-root').innerHTML = `
    <div class="modal-backdrop">
      <div class="bubble-shell">
        <div class="speech ${story.side}">
          <div class="kicker">${story.speaker}</div>
          <h2>${story.title}</h2>
          <p>${story.text}</p>
          <div class="bubble-actions"><button class="small-btn" id="story-next">${appState.currentScreen === 'outro' && appState.outroIndex === outroStory.length -1 ? 'Zum Zertifikat' : 'Nächste Seite'}</button></div>
        </div>
      </div>
    </div>`;
  $('story-next').onclick = () => { $('modal-root').innerHTML=''; onNext(); };
}

function openStation(id){
  if(appState.currentScreen !== 'world') return;
  const station = stations.find(s => s.id === id);
  appState.currentStationId = id;
  appState.avatarPos = { left: station.x - 1, top: station.y + 6 };
  renderWorld();
  showLessonPage(0);
}

function showLessonPage(index){
  const station = stations.find(s => s.id === appState.currentStationId);
  const page = station.lesson[index];
  $('modal-root').innerHTML = `
    <div class="modal-backdrop">
      <div class="bubble-shell">
        <div class="speech center">
          <div class="kicker">${page.speaker}</div>
          <h2>${page.title}</h2>
          ${page.lines.map(l => `<p>${l}</p>`).join('')}
          <div class="bubble-actions">
            ${index > 0 ? '<button class="small-btn secondary" id="lesson-prev">Zurück</button>' : ''}
            <button class="small-btn" id="lesson-next">${index === station.lesson.length -1 ? 'Zum Quiz' : 'Weiter'}</button>
          </div>
        </div>
      </div>
    </div>`;
  const prev = $('lesson-prev'); if(prev) prev.onclick = () => showLessonPage(index-1);
  $('lesson-next').onclick = () => { if(index === station.lesson.length -1) { appState.quizQueue = station.questions.map(q => shuffleQuestion(q)); showQuiz(0, false); } else { showLessonPage(index+1); } };
}

function showQuiz(index, isBoss){
  const pool = isBoss ? appState.quizQueue : appState.quizQueue;
  const q = pool[index];
  const title = isBoss ? `Prüfungsfrage ${index+1} von ${pool.length}` : `Kontrollfrage ${index+1} von ${pool.length}`;
  $('modal-root').innerHTML = `
    <div class="modal-backdrop">
      <div class="quiz-card">
        <div class="quiz-kicker"><span>${isBoss ? 'Jörg - Abschlussprüfung' : 'Quiz'}</span><span>${title}</span></div>
        <h3>${q.question}</h3>
        <div class="context-box"><strong>Situation:</strong> ${q.context}</div>
        <div class="options" id="options">
          ${q.entries.map((entry, i) => `<label class="option" data-index="${i}"><input type="checkbox" name="quiz-option"><span>${entry.text}</span></label>`).join('')}
        </div>
        <div class="feedback" id="feedback"></div>
        <div class="bubble-actions">
          <button class="small-btn" id="quiz-submit">Antwort bestätigen</button>
        </div>
      </div>
    </div>`;
  document.querySelectorAll('.option').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.option').forEach(o => { o.classList.remove('selected'); o.querySelector('input').checked = false; });
      el.classList.add('selected');
      el.querySelector('input').checked = true;
    });
  });
  $('quiz-submit').onclick = () => {
    const selectedEl = document.querySelector('.option.selected');
    if(!selectedEl){ $('feedback').textContent = 'Bitte wähle eine Antwort aus.'; return; }
    const selected = Number(selectedEl.dataset.index);
    const optionEls = [...document.querySelectorAll('.option')];
    optionEls[q.correctIndex].classList.add('correct');
    if(selected === q.correctIndex){
      $('feedback').textContent = 'Richtig!';
      setHint('Gut gemacht.');
      setTimeout(() => {
        if(index < pool.length -1){ showQuiz(index+1, isBoss); }
        else {
          $('modal-root').innerHTML = '';
          if(isBoss){ renderOutroScene(); }
          else { appState.completed.add(appState.currentStationId); updateHud(); renderWorld(); if(appState.completed.size === stations.length) setHint('Alle Tiere haben geholfen. Jetzt wartet Jörg.'); }
        }
      }, 850);
    } else {
      optionEls[selected].classList.add('wrong');
      appState.lives -= 1;
      updateHud();
      $('feedback').textContent = appState.lives > 0 ? 'Leider falsch. Du verlierst ein Leben und wiederholst diese Station.' : 'Alle Leben verbraucht. Die Schulung startet neu.';
      setHint(appState.lives > 0 ? 'Versuche die Station noch einmal.' : 'Neustart...');
      setTimeout(() => {
        $('modal-root').innerHTML = '';
        if(appState.lives <= 0){ resetGame(true); renderMenu(); }
        else {
          if(isBoss){ appState.bossIndex = 0; openBoss(); }
          else { showLessonPage(0); }
        }
      }, 1600);
    }
  };
}

function openBoss(){
  appState.currentScreen = 'boss';
  setHint('Jetzt kommen 5 schwierigere Prüfungsfragen.');
  appState.quizQueue = bossQuestions.map(q => shuffleQuestion(q));
  $('screen').innerHTML = `
    <div class="boss-screen">
      <div class="exam-stage">
        <div class="sprite jorg" style="position:relative; left:20px; bottom:0; align-self:end"></div>
        <div class="panel">
          <div class="kicker">Abschlussprüfung</div>
          <h2>Jörg prüft, ob die Maus sicher entscheiden kann.</h2>
          <p>Jörg taucht nur für die Prüfung auf. Er stellt 5 etwas schwierigere Fragen, die Wissen aus der Schulung verknüpfen.</p>
          <p>Bestehst du diese Runde, folgt die Schlussszene - und die Maus trifft ihre Entscheidung diesmal bewusst.</p>
          <div class="center-actions"><button class="small-btn" onclick="showQuiz(0, true)">Prüfung starten</button><button class="small-btn secondary" onclick="renderWorld()">Zurück zur Karte</button></div>
        </div>
      </div>
    </div>`;
}

function renderOutroScene(){
  appState.currentScreen = 'outro';
  setHint('Die Maus trifft jetzt ihre eigene Entscheidung.');
  stopTimer();
  const story = outroStory[appState.outroIndex];
  $('screen').innerHTML = `
    <div class="scene-stage stage-outro scenic">
      <div class="story-scene">
        <div class="layer-hill hill-back"></div>
        <div class="layer-hill hill-front"></div>
        <div class="desk"><div class="desk-top"></div></div>
        <div class="window-card">DSGVO</div>
        <div class="sprite mouse"></div>
        <div class="sprite cat"></div>
        <div class="sprite cheese" style="right:30%; bottom:26%;"></div>
        <div class="notice"></div>
      </div>
    </div>`;
  showStoryBubble(story, appState.outroIndex === outroStory.length -1 ? finishGame : () => { appState.outroIndex++; renderOutroScene(); });
}

function finishGame(){
  $('modal-root').innerHTML = '';
  const total = appState.timer;
  if(!appState.bestTime || total < appState.bestTime){ appState.bestTime = total; localStorage.setItem('dataQuestBestTime', String(total)); }
  $('screen').innerHTML = `
    <div class="score-screen">
      <div class="certificate">
        <div class="kicker">Zertifikat</div>
        <h1 class="cert-title">Data Quest bestanden</h1>
        <p>Die Maus hat gelernt, Risiken zu erkennen, Rechte einzuordnen und bewusst über ihre Daten zu entscheiden.</p>
        <div class="metrics">
          <div class="metric"><span class="label">Zeit</span><strong>${formatTime(total)}</strong></div>
          <div class="metric"><span class="label">Verbleibende Leben</span><strong>${appState.lives}</strong></div>
          <div class="metric"><span class="label">Bestzeit</span><strong>${formatTime(appState.bestTime)}</strong></div>
        </div>
        <p>Datenschutz bedeutet nicht, überall Nein zu sagen. Datenschutz bedeutet, informiert zu entscheiden, wem du welche Daten gibst, wofür und unter welchen Regeln.</p>
        <div class="center-actions">
          <button class="small-btn" onclick="beginStory()">Noch einmal spielen</button>
          <button class="small-btn secondary" onclick="renderMenu()">Zum Startbildschirm</button>
        </div>
      </div>
    </div>`;
  setHint('Geschafft. Du kannst erneut spielen oder zum Start zurückkehren.');
}

window.beginStory = beginStory;
window.skipToWorld = skipToWorld;
window.openStation = openStation;
window.openBoss = openBoss;
window.renderMenu = renderMenu;

renderMenu();
updateHud();
