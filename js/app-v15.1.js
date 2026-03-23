(function () {
  'use strict';

  const stations = [
    {
      id: 'grundrechte', speaker: 'Eule Erika', title: 'Grundrechte und informationelle Selbstbestimmung',
      pages: [
        'Datenschutz ist kein Zufallsprodukt. Schon lange vor der DSGVO schützten Menschenrechts- und Grundrechtsnormen das Privatleben, die Kommunikation und die personenbezogenen Daten von Menschen.',
        'Wichtig sind vor allem Art. 8 EMRK sowie die Art. 7 und 8 der EU-Grundrechtecharta. Dahinter steht die Idee, dass Menschen nicht zum gläsernen Objekt werden dürfen.',
        'Der zentrale Gedanke heißt informationelle Selbstbestimmung. Gemeint ist: Jeder Mensch soll möglichst selbst entscheiden können, wer was über ihn weiß und wofür diese Informationen verwendet werden.',
        'Datenschutz schützt also Freiheit, Würde und die Persönlichkeitssphäre. Es geht nicht nur um Computer und Akten, sondern darum, dass Menschen nicht unkontrolliert beobachtet, bewertet oder beeinflusst werden.',
        'Die DSGVO gilt räumlich für Verarbeitungen in der EU und auch dann, wenn Personen in der EU Waren oder Dienstleistungen angeboten werden oder ihr Verhalten beobachtet wird.',
        'Sachlich erfasst sie automatisierte Verarbeitungen und geordnete nichtautomatisierte Verarbeitungen personenbezogener Daten natürlicher Personen.'
      ],
      quiz: [
        { context: 'Ein Team sagt: „Datenschutz ist nur Bürokratie.“ Du willst die Grundidee richtig einordnen.', q: 'Welche Antwort trifft den Kern am besten?', options: ['Datenschutz schützt die Freiheit und Kontrolle von Menschen über ihre Daten.', 'Datenschutz ist nur für Papierakten da.', 'Datenschutz betrifft nur besonders geheime Daten.'], correct: 0 },
        { context: 'Eine Person fragt, was mit „informationeller Selbstbestimmung“ gemeint ist.', q: 'Welche Erklärung passt?', options: ['Menschen sollen selbst entscheiden können, wem sie welche Daten geben.', 'Nur Behörden entscheiden über alle Daten.', 'Daten dürfen niemals gespeichert werden.'], correct: 0 },
        { context: 'Ein Anbieter sitzt außerhalb der EU, beobachtet aber das Verhalten von Personen in der EU.', q: 'Warum kann die DSGVO trotzdem relevant sein?', options: ['Weil die DSGVO auch dann greifen kann, wenn Personen in der EU beobachtet werden.', 'Weil die DSGVO nur in Deutschland gilt.', 'Weil Sitzort und Verhalten von Nutzenden nie eine Rolle spielen.'], correct: 0 }
      ]
    },
    {
      id: 'daten', speaker: 'Schildkröte Theo', title: 'Personenbezogene und sensible Daten',
      pages: [
        'Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen. Es reicht, wenn eine Person damit erkannt oder von anderen unterschieden werden kann.',
        'Dazu gehören Name, Anschrift, E-Mail-Adresse und Telefonnummer. Aber auch Kundennummern, Standortdaten, Kennzeichen, Bilder, Stimmen oder bestimmte Online-Kennungen können personenbezogen sein.',
        'Wichtig ist die Kombination: Mehrere auf den ersten Blick harmlose Angaben können zusammen sehr aussagekräftig werden. Genau deshalb war der Käse-Deal mit der Katze so problematisch.',
        'Besonders geschützt sind sensible Daten. Dazu zählen etwa Daten über Gesundheit, genetische und biometrische Daten, politische Meinung, Religion, Gewerkschaftszugehörigkeit oder sexuelle Orientierung.',
        'Im Alltag gilt deshalb: Nicht nur offensichtliche Gesundheits- oder Personaldaten verdienen Aufmerksamkeit. Schon scheinbar normale Angaben können bei der Zuordnung oder Profilbildung sehr wertvoll sein.'
      ],
      quiz: [
        { context: 'Eine Kollegin meint: „Die E-Mail-Adresse allein ist doch nichts Besonderes.“', q: 'Welche Einordnung ist richtig?', options: ['Auch eine E-Mail-Adresse kann ein personenbezogenes Datum sein.', 'Nur sensible Daten sind personenbezogen.', 'Personenbezogene Daten sind immer geheim und nie öffentlich.'], correct: 0 },
        { context: 'Ein Datensatz enthält Name, Hobby, Wohnort und E-Mail-Adresse.', q: 'Warum ist das heikel?', options: ['Weil die Kombination eine Person oft identifizierbar und angreifbar macht.', 'Weil Hobbys automatisch verbotene Daten sind.', 'Weil Wohnorte nie gespeichert werden dürfen.'], correct: 0 },
        { context: 'Du sollst sensible Daten erkennen.', q: 'Welche Kategorie ist besonders geschützt?', options: ['Gesundheitsdaten', 'Lieblingsfarbe', 'Abteilungsname'], correct: 0 }
      ]
    },
    {
      id: 'rollen', speaker: 'Hund Hugo', title: 'Rollenbilder: Verantwortlicher, Auftragsverarbeiter, Subauftragsverarbeiter',
      pages: [
        'Der Verantwortliche ist die Stelle, die über Zwecke und Mittel der Verarbeitung entscheidet. Er legt also fest, ob Daten verarbeitet werden, zu welchem Zweck und mit welchen Mitteln.',
        'Darum liegt dort die rechtliche Hauptverantwortung. Betroffene machen ihre Rechte grundsätzlich gegenüber dem Verantwortlichen geltend.',
        'Der Auftragsverarbeiter handelt dagegen im Auftrag des Verantwortlichen. Er darf die Daten nur im Rahmen eines schriftlichen Auftrags und nach Weisung verarbeiten.',
        'Er darf die Daten nicht für eigene Zwecke verwenden. Genau das unterscheidet ihn vom Verantwortlichen.',
        'Werden weitere Dienstleister in der Kette eingesetzt, spricht man von Subauftragsverarbeitern. Auch diese Beauftragung muss vertraglich geregelt und sauber kontrolliert werden.',
        'Für Mitarbeitende bedeutet das: Nicht jede Person, die technisch Zugriff haben könnte, darf auch inhaltlich mit den Daten arbeiten.'
      ],
      quiz: [
        { context: 'Ein Unternehmen entscheidet selbst, warum Kundendaten gespeichert und genutzt werden.', q: 'Welche Rolle hat dieses Unternehmen?', options: ['Verantwortlicher', 'Subauftragsverarbeiter', 'Betroffene Person'], correct: 0 },
        { context: 'Ein externer Dienstleister verarbeitet Daten nur auf schriftliche Weisung.', q: 'Welche Rolle trifft zu?', options: ['Auftragsverarbeiter', 'Verantwortlicher', 'Besucher'], correct: 0 },
        { context: 'Ein Auftragsverarbeiter schaltet einen weiteren IT-Dienstleister ein.', q: 'Wie heißt dieser weitere Dienstleister in der Kette?', options: ['Subauftragsverarbeiter', 'Betroffener', 'Datenschutzvorfall'], correct: 0 }
      ]
    },
    {
      id: 'rechtsgrundlagen', speaker: 'Fuchs Frieda', title: 'Rechtsgrundlagen und Informationspflichten',
      pages: [
        'Eine Verarbeitung personenbezogener Daten ist nicht einfach deshalb erlaubt, weil sie nützlich erscheint. Sie braucht eine tragfähige Rechtsgrundlage.',
        'Wichtige Rechtsgrundlagen sind die informierte Einwilligung, die Erfüllung eines Vertrags oder vorvertragliche Maßnahmen, rechtliche Verpflichtungen, lebenswichtige Interessen, Aufgaben im öffentlichen Interesse und berechtigte Interessen.',
        'Eine Einwilligung muss freiwillig, informiert, eindeutig und widerrufbar sein. Sie ist kein pauschaler Freifahrtschein für alles Zukünftige.',
        'Gerade im Arbeitsalltag ist wichtig: Auch mit Rechtsgrundlage müssen Betroffene darüber informiert werden, wer verarbeitet, zu welchem Zweck, welche Daten betroffen sind, wer Empfänger ist und welche Rechte bestehen.',
        'Art. 13 und 14 DSGVO stehen für diese Informationspflichten. Gute Datenschutzpraxis bedeutet deshalb immer: Rechtsgrundlage prüfen und Transparenz schaffen.'
      ],
      quiz: [
        { context: 'Ein Team möchte Kontaktdaten „einfach vorsorglich“ in einer neuen Liste sammeln.', q: 'Welche Prüfung ist zuerst nötig?', options: ['Ob es eine passende Rechtsgrundlage gibt.', 'Ob die Liste hübsch gestaltet ist.', 'Ob die Daten später vielleicht nützlich sind.'], correct: 0 },
        { context: 'Ein Formular enthält eine Einwilligung.', q: 'Welche Aussage muss für eine wirksame Einwilligung stimmen?', options: ['Sie muss freiwillig und informiert sein.', 'Sie gilt automatisch für alle denkbaren Zwecke.', 'Sie braucht nie einen Widerrufshinweis.'], correct: 0 },
        { context: 'Eine Verarbeitung ist zwar erlaubt, aber die betroffene Person wurde über nichts informiert.', q: 'Was fehlt dann zusätzlich?', options: ['Die Informationspflicht nach Art. 13/14 DSGVO', 'Ein Firmenlogo', 'Ein stärkeres Passwort'], correct: 0 }
      ]
    },
    {
      id: 'rechte', speaker: 'Bär Bruno', title: 'Betroffenenrechte im Überblick',
      pages: [
        'Betroffene Personen sollen nicht passiv zuschauen müssen. Darum gibt ihnen die DSGVO konkrete Rechte gegenüber dem Verantwortlichen.',
        'Dazu gehören Informationsrechte: Menschen sollen wissen, wer ihre Daten verarbeitet, zu welchen Zwecken das geschieht, an wen Daten gehen und wie lange sie gespeichert werden.',
        'Das Recht auf Auskunft erlaubt es, die eigenen Datenverarbeitungen genauer nachzuvollziehen, einschließlich Datenkategorien, Empfängern und den bestehenden Rechten.',
        'Hinzu kommen das Recht auf Berichtigung, das Recht auf Löschung, das Recht auf Einschränkung der Verarbeitung und das Recht auf Datenübertragbarkeit.',
        'Auch das Widerspruchsrecht ist wichtig. In bestimmten Situationen können Menschen einer Verarbeitung widersprechen.',
        'Außerdem gibt es das Recht, keiner ausschließlich automatisierten Entscheidung unterworfen zu sein. Kurz gesagt: Menschen sollen handlungsfähig bleiben.'
      ],
      quiz: [
        { context: 'Eine Person möchte wissen, welche Daten über sie verarbeitet werden und an wen sie weitergegeben werden.', q: 'Welches Recht ist dafür besonders wichtig?', options: ['Recht auf Auskunft', 'Recht auf Werbung', 'Recht auf Firmenzugang'], correct: 0 },
        { context: 'Eine Kundin entdeckt, dass ihr Geburtsdatum falsch gespeichert ist.', q: 'Welches Recht passt?', options: ['Recht auf Berichtigung', 'Recht auf Datenverkauf', 'Recht auf Zweckänderung'], correct: 0 },
        { context: 'Eine Person möchte einer bestimmten Verarbeitung widersprechen.', q: 'Welches Recht hilft hier unmittelbar?', options: ['Widerspruchsrecht', 'Recht auf Passwortweitergabe', 'Recht auf Screenshot'], correct: 0 }
      ]
    },
    {
      id: 'unternehmen', speaker: 'Hase Hanna', title: 'Datenschutz im Unternehmen und saubere Prozesse',
      pages: [
        'Im Unternehmen darf nicht jede Person nach eigenem Gefühl entscheiden, welche Daten verarbeitet werden. Verantwortlich für diese Beurteilung sind die Geschäftsführung und die anordnungsbefugten Stellen.',
        'Mitarbeitende dürfen personenbezogene Daten nur dann sehen oder bearbeiten, wenn das für ihre jeweilige Aufgabe erforderlich ist. Rollen- und Berechtigungskonzepte sind deshalb ein echter Schutzmechanismus.',
        'Mitarbeitende müssen auf Vertraulichkeit und Stillschweigen verpflichtet werden. Datenschutz ist Teil professioneller Arbeit und nicht nur eine zusätzliche Formalie.',
        'Wenn externe Dienstleister Daten im Auftrag verarbeiten, muss eine Auftragsverarbeitungsvereinbarung abgeschlossen werden. Darin wird geregelt, was erlaubt ist, welche Sicherheitsmaßnahmen gelten und wie kontrolliert wird.',
        'Zu den To-dos im Unternehmen zählen ein Verarbeitungsverzeichnis, die Übersicht über Auftragsverarbeiter und Verträge, dokumentierte Prozesse und Datenschutzrichtlinien für Mitarbeitende.',
        'Als Datenschutzverletzung gilt es, wenn Verfügbarkeit, Vertraulichkeit oder Richtigkeit personenbezogener Daten beeinträchtigt werden – zum Beispiel durch eine E-Mail an den falschen Empfänger, offene CC-Listen oder einen Hackingangriff.',
        'Als Auftragsverarbeiter kommen zusätzliche Pflichten hinzu: Verarbeitung nur auf schriftliche Aufträge, technische und organisatorische Maßnahmen, Unterstützung bei Betroffenenrechten und Data Breach, Löschung nach Ende der Zusammenarbeit und kein Einsatz zu eigenen Zwecken.'
      ],
      quiz: [
        { context: 'Du brauchst Daten für deine Arbeit, ein anderer Bereich aber nicht.', q: 'Wer sollte Zugriff erhalten?', options: ['Nur Personen, die die Daten für ihre Aufgabe wirklich brauchen.', 'Alle Mitarbeitenden zur Sicherheit.', 'Niemand, auch wenn die Aufgabe es erfordert.'], correct: 0 },
        { context: 'Ein externer Dienstleister soll Kundendaten für euch verarbeiten.', q: 'Was braucht es vorab?', options: ['Eine Auftragsverarbeitungsvereinbarung', 'Nur einen kurzen Telefonanruf', 'Nur die mündliche Zustimmung des Teams'], correct: 0 },
        { context: 'Ein Newsletter wurde mit allen Empfängeradressen im CC versendet.', q: 'Wie ist das einzuordnen?', options: ['Als Datenschutzverletzung, die gemeldet werden muss.', 'Als normales Büroversehen ohne Relevanz.', 'Als zulässige Werbung.'], correct: 0 }
      ]
    },
    {
      id: 'werbung', speaker: 'Adler Amir', title: 'TKG, Direktwerbung und Double-Opt-in',
      pages: [
        'Direktwerbung per Anruf oder E-Mail ist kein rechtsfreier Raum. Das Telekommunikationsgesetz spielt dabei eine wichtige Rolle und ist nicht nur im B2C-Bereich relevant, sondern nach der Rechtsprechung auch im B2B-Bereich.',
        'Grundsätzlich gilt: Werbeanrufe oder Werbe-E-Mails ohne vorherige Einwilligung sind unzulässig. Nur in bestimmten gesetzlich geregelten Ausnahmen ist eine vorherige Einwilligung entbehrlich.',
        'Wenn jemand auf einer Plattform eine E-Mail-Adresse eingibt oder sich registriert, muss sichergestellt werden, dass die Adresse wirklich von dieser Person stammt oder jedenfalls berechtigt verwendet wird.',
        'Ein klassischer Weg dafür ist das Double-Opt-in. Erst nach einer Bestätigung wird die Anmeldung wirksam oder die Nutzung für Werbung freigegeben.',
        'Fehlt diese Absicherung, kann das nicht nur unprofessionell wirken, sondern das Grundrecht auf Geheimhaltung verletzen. Auch Marketing braucht also klare Datenschutzregeln.'
      ],
      quiz: [
        { context: 'Ein Vertriebsteam möchte spontan Werbe-E-Mails an eine neue Kontaktliste senden.', q: 'Was ist der Grundsatz?', options: ['Ohne vorherige Einwilligung ist das grundsätzlich unzulässig.', 'Werbe-E-Mails sind immer erlaubt, wenn der Inhalt freundlich ist.', 'Im B2B-Bereich gilt Datenschutz nie.'], correct: 0 },
        { context: 'Jemand trägt auf einer Plattform eine E-Mail-Adresse ein.', q: 'Warum ist Double-Opt-in sinnvoll?', options: ['Damit bestätigt wird, dass die E-Mail-Adresse wirklich berechtigt verwendet wurde.', 'Damit mehr Werbung gleichzeitig gesendet werden kann.', 'Damit Passwörter gespeichert werden.'], correct: 0 },
        { context: 'Eine Kollegin sagt: „TKG betrifft nur Verbraucher, nicht Unternehmen.“', q: 'Welche Antwort ist richtig?', options: ['Nein, nach der Rechtsprechung kann das TKG auch im B2B-Bereich relevant sein.', 'Ja, TKG gilt ausschließlich für Privatpersonen.', 'TKG ist nur für Telefonanbieter relevant.'], correct: 0 }
      ]
    },
    {
      id: 'sicherheit', speaker: 'Dachs Daria', title: 'Datensicherheit im Arbeitsalltag',
      pages: [
        'Datensicherheit beginnt mit dem Datengeheimnis: Personenbezogene Daten und sonstige zugeordnete Merkmale, die im Arbeitsverhältnis bekannt werden, sind geheim zu halten. Unbefugte dürfen weder Einsicht erhalten noch Daten verwenden.',
        'Unbekannte oder geschenkte USB-Sticks können Schadsoftware enthalten. Sie gehören nicht ungeprüft an Firmenrechner.',
        'Bei E-Mails ist Vorsicht nötig: Phishing arbeitet mit falschen Absendern, Druck, ungewöhnlichen Links oder Anhängen. Wenn etwas komisch wirkt, lieber nachfragen oder die IT einschalten.',
        'Passwörter gehören nicht auf Post-its, nicht in unverschlüsselte Dateien und nicht unverschlüsselt per E-Mail. Sie sollten stark und möglichst einzigartig sein.',
        'Offen liegende Notizen, Notebooks und Smartphones erleichtern Shoulder Surfing. Besonders auf Reisen oder in der Öffentlichkeit helfen Aufräumen, Sichtschutz und eine bewusste Arbeitsweise.',
        'Programme und Apps sollten nur aus vertrauenswürdigen Quellen installiert werden oder nach Rücksprache mit der IT. Updates schließen bekannte Sicherheitslücken.',
        'Beim Surfen sollte auf HTTPS geachtet werden. Öffentliche und frei verfügbare Netzwerke sind riskant und sollten möglichst gemieden werden.',
        'Clean Desk und Clean Screen sind Pflicht: Dokumente wegräumen, Bildschirm sperren, Whiteboards reinigen, Ausdrucke sofort vom Drucker holen und Besucher nicht unbeaufsichtigt durchs Büro laufen lassen.',
        'Besteht Verdacht auf einen Sicherheitsvorfall oder ist unklar, ob eine Nachricht Phishing ist, dann sollte sofort die IT kontaktiert werden.'
      ],
      quiz: [
        { context: 'Du verlässt kurz deinen Arbeitsplatz. Auf dem Bildschirm sind noch personenbezogene Daten sichtbar und auf dem Tisch liegen Unterlagen.', q: 'Was ist jetzt richtig?', options: ['Bildschirm sperren und Unterlagen wegräumen.', 'Nur schnell einen Zettel auf die Tastatur legen.', 'Nichts – du bist ja gleich zurück.'], correct: 0 },
        { context: 'Du findest einen USB-Stick im Besprechungsraum.', q: 'Wie reagierst du datensicher?', options: ['Nicht einstecken und den Vorfall an die zuständige Stelle geben.', 'Ausprobieren, wem er gehört.', 'Direkt private Dateien darauf speichern.'], correct: 0 },
        { context: 'Eine E-Mail wirkt seltsam und fordert dich zu schnellem Handeln auf.', q: 'Was ist die beste Reaktion?', options: ['Absender, Links und Anhänge kritisch prüfen und im Zweifel die IT fragen.', 'Sofort auf den Link klicken, um Zeit zu sparen.', 'Die E-Mail an alle weiterleiten.'], correct: 0 }
      ]
    }
  ];

  const boss = {
    pages: [
      { speaker: 'Jörg', title: 'Abschlussprüfung', body: 'Die Lernstationen sind abgeschlossen. Jetzt prüfe ich, ob die Maus die Zusammenhänge wirklich verstanden hat. Es geht nicht um Begriffe allein, sondern um gute Entscheidungen im Alltag.' },
      { speaker: 'Jörg', title: 'Jetzt wird es kniffliger', body: 'Die nächsten fünf Fragen sind schwerer. Lies die Situationen genau und entscheide so, wie du es in einem echten Arbeitsalltag tun würdest.' }
    ],
    quiz: [
      { context: 'Die Katze kennt nun Namen, Anschrift, Hobbys und E-Mail-Adresse der Maus.', q: 'Warum ist diese Kombination besonders riskant?', options: ['Weil damit Identifizierung, Kontaktaufnahme, Profilbildung und glaubwürdige Täuschung leichter werden.', 'Weil Hobbys automatisch immer sensible Daten sind.', 'Weil Anschriften nie verarbeitet werden dürfen.'], correct: 0 },
      { context: 'Ein Unternehmen entscheidet selbst über Zweck und Mittel einer Verarbeitung und lagert die technische Umsetzung an einen Dienstleister aus.', q: 'Welche Aussage ist richtig?', options: ['Das Unternehmen bleibt Verantwortlicher und trägt die Hauptverantwortung.', 'Der Dienstleister wird automatisch alleiniger Verantwortlicher.', 'Niemand ist verantwortlich, solange ein Vertrag existiert.'], correct: 0 },
      { context: 'Ein Team möchte Daten „erst einmal sammeln“ und später prüfen, ob sie nützlich sind.', q: 'Welche Bewertung passt?', options: ['Das reicht nicht; es braucht vorher eine Rechtsgrundlage und klare Zwecke.', 'Das ist zulässig, wenn genug Speicherplatz vorhanden ist.', 'Das ist nur bei digitalen Daten problematisch.'], correct: 0 },
      { context: 'Ein Mitarbeiter arbeitet im Zug an vertraulichen Unterlagen, lässt das Notebook offen und telefoniert laut über Kundendaten.', q: 'Welcher Gedanke verbindet Datenschutz und Datensicherheit hier am besten?', options: ['Nur notwendige Daten nutzen und sie organisatorisch wie technisch vor unbefugten Blicken schützen.', 'Nur ein starkes Passwort genügt.', 'Datenschutz spielt unterwegs keine Rolle.'], correct: 0 },
      { context: 'Eine E-Mail mit personenbezogenen Daten ging an den falschen Empfänger. Das Team überlegt, erst einmal abzuwarten.', q: 'Was ist richtig?', options: ['Schnelles Melden ist wichtig, damit Schäden begrenzt und Pflichten erfüllt werden können.', 'Abwarten ist besser, damit niemand etwas merkt.', 'Es ist nur dann relevant, wenn ein Passwort betroffen ist.'], correct: 0 }
    ]
  };

  const introPages = [
    { speaker: 'Maus', title: 'Ein Wunsch', body: '„Ein bisschen Käse wäre jetzt perfekt ...“' },
    { speaker: 'Katze', title: 'Ein verlockendes Angebot', body: '„Ich hätte Käse. Ich brauche dafür nur ein paar Infos: Vor- und Nachname, Anschrift, Hobbys und deine E-Mail-Adresse.“' },
    { speaker: 'Maus', title: 'Zu schnell vertraut', body: '„Nur dafür? Das klingt harmlos.“\n\nDie Maus nennt ihre Daten – und merkt erst zu spät, wie viel sie gerade preisgegeben hat.' },
    { speaker: 'Erzählstimme', title: 'Mehr wert als gedacht', body: 'Schon diese Kombination kann reichen, um eine Person zu identifizieren, glaubwürdige Phishing-Nachrichten zu schreiben, Profile zu bilden oder weitere Informationen zu erschleichen.' },
    { speaker: 'Erzählstimme', title: 'Jetzt beginnt die Schulung', body: 'Hilf der Maus, die Regeln, Rechte und Sicherheitsmaßnahmen zu verstehen – damit sie künftig bessere Entscheidungen treffen kann.' }
  ];

  const outroPages = [
    { speaker: 'Katze', title: 'Noch ein Versuch', body: '„Ich hätte wieder ein Stück Käse. Nur ein paar Infos. Nichts Wichtiges.“' },
    { speaker: 'Maus', title: 'Diesmal anders', body: '„Ich weiß jetzt, was mit meinen Daten passieren kann. Und ich entscheide selbst, wem ich sie gebe.“' },
    { speaker: 'Maus', title: 'Die Entscheidung', body: 'Die Maus übergibt den Bescheid der Datenschutzbehörde.\n\n„Nein. Diesmal nicht.“' },
    { speaker: 'Erzählstimme', title: 'Kontrolle zurückgewonnen', body: 'Datenschutz bedeutet nicht, alles zu verbieten. Datenschutz bedeutet, informiert und bewusst zu entscheiden.' }
  ];

  const el = {
    lives: document.getElementById('lives'), timer: document.getElementById('timer'), progress: document.getElementById('progress'), hint: document.getElementById('hint'),
    world: document.getElementById('world'), worldSign: document.getElementById('world-sign'), stations: Array.from(document.querySelectorAll('.station')),
    mouse: document.getElementById('mouse'), startScreen: document.getElementById('start-screen'), startBtn: document.getElementById('start-btn'), skipIntroBtn: document.getElementById('skip-intro-btn'),
    bubbleLayer: document.getElementById('bubble-layer'), bubble: document.getElementById('bubble'), bubbleSpeaker: document.getElementById('bubble-speaker'), bubbleTitle: document.getElementById('bubble-title'), bubbleBody: document.getElementById('bubble-body'), bubbleChoices: document.getElementById('bubble-choices'), choiceStatus: document.getElementById('choice-status'), bubbleActions: document.getElementById('bubble-actions'),
    cutsceneScreen: document.getElementById('cutscene-screen'), cutsceneStage: document.getElementById('cutscene-stage'), cutNotice: document.getElementById('cut-notice'),
    bossScreen: document.getElementById('boss-screen'), bossBtn: document.getElementById('boss-btn'),
    resultScreen: document.getElementById('result-screen'), resultText: document.getElementById('result-text'), bestTime: document.getElementById('best-time'), finalTime: document.getElementById('final-time'), finalLives: document.getElementById('final-lives'), finalScore: document.getElementById('final-score'), retryBtn: document.getElementById('retry-btn')
  };

  const state = { seconds: 0, timerId: null, lives: 3, score: 0, completed: new Set(), started: false, mouseX: 8, mouseY: 78, bestTime: window.localStorage.getItem('dq_best_time_v15') || '', bossDone: false, inBoss: false, currentOrder: stations.map(s => s.id) };

  function formatTime(totalSeconds) {
    const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const ss = String(totalSeconds % 60).padStart(2, '0');
    return mm + ':' + ss;
  }
  function parseTime(text) {
    const parts = String(text || '').split(':');
    return parts.length === 2 ? (Number(parts[0]) * 60 + Number(parts[1])) : Infinity;
  }
  function updateHud() {
    el.lives.textContent = '❤'.repeat(Math.max(0, state.lives)) + '♡'.repeat(Math.max(0, 3 - state.lives));
    el.timer.textContent = formatTime(state.seconds);
    el.progress.textContent = state.completed.size + ' / 8';
    el.bestTime.textContent = state.bestTime || '--:--';
  }
  function startTimer() {
    stopTimer();
    state.timerId = window.setInterval(function () { state.seconds += 1; updateHud(); }, 1000);
  }
  function stopTimer() { if (state.timerId) { window.clearInterval(state.timerId); state.timerId = null; } }
  function playTone(freq, duration, type, gain) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!playTone.ctx) playTone.ctx = new AudioCtx();
    const ctx = playTone.ctx;
    if (ctx.state === 'suspended') return;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.type = type || 'triangle';
    osc.frequency.value = freq;
    amp.gain.value = gain || 0.03;
    osc.connect(amp); amp.connect(ctx.destination); osc.start(); amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration); osc.stop(ctx.currentTime + duration);
  }
  function unlockAudio() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!playTone.ctx) playTone.ctx = new AudioCtx();
    if (playTone.ctx.state === 'suspended') playTone.ctx.resume();
  }
  function setBubbleMode(cutscene) { el.bubbleLayer.classList.toggle('cutscene-mode', Boolean(cutscene)); }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function paragraphHtml(text) {
    return String(text).split(/\n\n+/).map(function (part) {
      return '<p>' + escapeHtml(part).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }
  function openBubble(config) {
    el.bubbleLayer.classList.remove('hidden');
    setBubbleMode(config.cutscene);
    el.bubbleSpeaker.textContent = config.speaker || '';
    el.bubbleTitle.textContent = config.title || '';
    el.bubbleBody.innerHTML = config.htmlBody || paragraphHtml(config.body || '');
    el.choiceStatus.textContent = '';
    el.bubbleChoices.innerHTML = '';
    el.bubbleChoices.classList.add('hidden');
    el.bubbleActions.innerHTML = '';
    (config.actions || []).forEach(function (action) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = action.primary ? 'primary' : 'secondary';
      button.textContent = action.label;
      button.addEventListener('click', action.onClick);
      el.bubbleActions.appendChild(button);
    });
  }
  function closeBubble() {
    el.bubbleLayer.classList.add('hidden');
    setBubbleMode(false);
    el.bubbleChoices.innerHTML = ''; el.bubbleActions.innerHTML = ''; el.choiceStatus.textContent = '';
  }
  function showPagedDialog(pages, done, onPage, cutsceneMode) {
    let index = 0;
    function nextPage() {
      if (typeof onPage === 'function') onPage(index);
      const page = pages[index];
      openBubble({ speaker: page.speaker, title: page.title, body: page.body, cutscene: cutsceneMode, actions: [{ label: index === pages.length - 1 ? 'Weiter' : 'Nächste Seite', primary: true, onClick: function () { playTone(640, 0.07, 'triangle', 0.02); index += 1; if (index >= pages.length) { closeBubble(); if (done) done(); } else { nextPage(); } } }] });
    }
    nextPage();
  }
  function shuffle(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i]; copy[i] = copy[j]; copy[j] = tmp;
    }
    return copy;
  }
  function prepareQuestion(question) {
    const items = question.options.map(function (text, idx) { return { text: text, original: idx }; });
    const shuffled = shuffle(items);
    return { context: question.context, q: question.q, options: shuffled.map(function (i) { return i.text; }), correct: shuffled.findIndex(function (i) { return i.original === question.correct; }) };
  }
  function showQuiz(questionSet, onComplete) {
    const prepared = questionSet.map(prepareQuestion);
    let questionIndex = 0;
    function renderQuestion() {
      const question = prepared[questionIndex];
      openBubble({ speaker: 'Quiz', title: question.q, body: question.context + '\n\nWähle genau eine Antwort aus und bestätige sie.', actions: [] });
      el.bubbleChoices.classList.remove('hidden');
      const name = 'question_' + questionIndex;
      question.options.forEach(function (option, idx) {
        const label = document.createElement('label');
        label.className = 'choice-item';
        const input = document.createElement('input');
        input.type = 'checkbox'; input.name = name; input.value = String(idx);
        input.addEventListener('change', function () { Array.from(el.bubbleChoices.querySelectorAll('input')).forEach(function (other) { if (other !== input) other.checked = false; }); });
        const text = document.createElement('span'); text.textContent = option; label.appendChild(input); label.appendChild(text); el.bubbleChoices.appendChild(label);
      });
      const confirm = document.createElement('button');
      confirm.type = 'button'; confirm.className = 'confirm-btn primary'; confirm.textContent = 'Antwort bestätigen';
      confirm.addEventListener('click', function () {
        const selected = el.bubbleChoices.querySelector('input:checked');
        if (!selected) { el.choiceStatus.textContent = 'Bitte wähle zuerst eine Antwort aus.'; return; }
        const selectedIndex = Number(selected.value);
        const items = Array.from(el.bubbleChoices.querySelectorAll('.choice-item'));
        items.forEach(function (item, idx) { item.classList.toggle('correct', idx === question.correct); item.classList.toggle('incorrect', idx === selectedIndex && idx !== question.correct); });
        confirm.disabled = true;
        if (selectedIndex === question.correct) {
          state.score += 100; playTone(760, 0.12, 'triangle', 0.03); el.choiceStatus.textContent = 'Richtig!'; questionIndex += 1;
          window.setTimeout(function () { if (questionIndex >= prepared.length) { closeBubble(); onComplete(true); } else { renderQuestion(); } }, 720);
        } else {
          state.lives -= 1; updateHud(); playTone(190, 0.18, 'sawtooth', 0.03); el.choiceStatus.textContent = 'Leider falsch. Du verlierst ein Leben und musst diese Station wiederholen.';
          window.setTimeout(function () { closeBubble(); onComplete(false); }, 1100);
        }
      });
      el.bubbleActions.innerHTML = ''; el.bubbleActions.appendChild(confirm);
    }
    renderQuestion();
  }
  function moveMouseTo(x, y, callback) {
    const dx = Math.abs(state.mouseX - x); const dy = Math.abs(state.mouseY - y);
    const duration = Math.max(700, Math.min(1800, (dx + dy) * 30));
    el.mouse.classList.add('walking'); el.mouse.style.transitionDuration = duration + 'ms'; el.mouse.style.left = x + '%'; el.mouse.style.top = y + '%'; state.mouseX = x; state.mouseY = y;
    window.setTimeout(function () { el.mouse.classList.remove('walking'); if (callback) callback(); }, duration + 40);
  }
  function stationById(id) { return stations.find(function (station) { return station.id === id; }); }
  function canInteract() { return state.started && el.bubbleLayer.classList.contains('hidden') && el.cutsceneScreen.classList.contains('hidden') && el.bossScreen.classList.contains('hidden'); }
  function openStation(id, button) {
    const station = stationById(id); if (!station || state.completed.has(id) || state.inBoss) return;
    const x = parseFloat(button.style.left); const y = Math.min(82, parseFloat(button.style.top) + 8);
    moveMouseTo(x, y, function () {
      const pages = station.pages.map(function (body) { return { speaker: station.speaker, title: station.title, body: body }; });
      showPagedDialog(pages, function () {
        showQuiz(station.quiz, function (ok) {
          if (ok) {
            state.completed.add(id); button.classList.add('completed'); state.score += 50; updateHud(); el.hint.textContent = station.speaker + ' ist abgeschlossen.';
            if (state.completed.size === stations.length) { window.setTimeout(showBossScreen, 320); }
          } else if (state.lives <= 0) {
            gameOver();
          } else {
            el.hint.textContent = 'Diese Station ist noch nicht geschafft.';
          }
        });
      }, null, false);
    });
  }
  function setCutsceneStep(type, stepIndex) {
    el.cutsceneStage.className = 'cutscene-stage ' + type + '-step-' + (stepIndex + 1);
    el.cutNotice.classList.toggle('hidden', type !== 'outro');
  }
  function playCutscene(type, pages, onDone) {
    el.cutsceneScreen.classList.remove('hidden');
    showPagedDialog(pages, function () {
      el.cutsceneScreen.classList.add('hidden'); el.cutsceneStage.className = 'cutscene-stage'; if (onDone) onDone();
    }, function (index) { setCutsceneStep(type, index); }, true);
  }
  function showBossScreen() {
    state.inBoss = true; el.worldSign.textContent = 'Alle Themen abgeschlossen'; el.hint.textContent = 'Jörg wartet auf dem Prüfungsbildschirm.'; el.bossScreen.classList.remove('hidden');
  }
  function launchBoss() {
    el.bossScreen.classList.add('hidden');
    showPagedDialog(boss.pages, function () {
      showQuiz(boss.quiz, function (ok) {
        if (ok) { state.score += 250; state.bossDone = true; playCutscene('outro', outroPages, finishGame); }
        else if (state.lives <= 0) { gameOver(); }
        else { el.bossScreen.classList.remove('hidden'); el.hint.textContent = 'Jörg wartet noch. Versuche es erneut.'; }
      });
    }, null, false);
  }
  function finishGame() {
    stopTimer(); const current = formatTime(state.seconds);
    if (!state.bestTime || state.seconds < parseTime(state.bestTime)) { state.bestTime = current; window.localStorage.setItem('dq_best_time_v15', current); }
    el.resultText.textContent = 'Die Maus hat alle Themen verstanden, Jörg besiegt und der Katze mit dem Bescheid der Datenschutzbehörde klargemacht: Über Daten wird künftig bewusst entschieden.';
    el.finalTime.textContent = current; el.finalLives.textContent = String(state.lives); el.finalScore.textContent = String(state.score); updateHud(); el.resultScreen.classList.remove('hidden');
  }
  function hardStart(skipIntro) {
    unlockAudio(); playTone(520, 0.1, 'triangle', 0.03); el.startScreen.classList.add('hidden'); state.started = true; state.seconds = 0; updateHud(); startTimer();
    if (skipIntro) { el.hint.textContent = 'Klicke auf ein Tier oder auf die Wiese, damit die Maus losläuft.'; }
    else { playCutscene('intro', introPages, function () { el.hint.textContent = 'Klicke auf ein Tier oder auf die Wiese, damit die Maus losläuft.'; }); }
  }
  function resetGame() {
    stopTimer(); state.seconds = 0; state.lives = 3; state.score = 0; state.completed = new Set(); state.started = false; state.mouseX = 8; state.mouseY = 78; state.inBoss = false; state.bossDone = false;
    el.mouse.style.left = state.mouseX + '%'; el.mouse.style.top = state.mouseY + '%'; el.startScreen.classList.remove('hidden'); el.resultScreen.classList.add('hidden'); el.bossScreen.classList.add('hidden'); el.cutsceneScreen.classList.add('hidden'); closeBubble(); el.worldSign.textContent = 'Datenschutzpfad'; el.hint.textContent = 'Klicke in die Wiese oder direkt auf ein Tier.'; el.stations.forEach(function (button) { button.classList.remove('completed'); }); updateHud();
  }
  function gameOver() { stopTimer(); showPagedDialog([{ speaker: 'Erzählstimme', title: 'Alle Leben verloren', body: 'Die Maus braucht einen neuen Anlauf. Die Schulung startet komplett von vorn.' }], resetGame, null, false); }
  function bindEvents() {
    el.startBtn.addEventListener('click', function () { hardStart(false); });
    el.skipIntroBtn.addEventListener('click', function () { hardStart(true); });
    el.startBtn.onclick = function () { hardStart(false); };
    el.skipIntroBtn.onclick = function () { hardStart(true); };
    el.stations.forEach(function (button) {
      button.addEventListener('click', function (event) { event.stopPropagation(); if (!canInteract()) return; openStation(button.dataset.id, button); });
    });
    el.world.addEventListener('click', function (event) {
      if (!canInteract()) return; if (event.target.closest('.station')) return;
      const rect = el.world.getBoundingClientRect(); const x = ((event.clientX - rect.left) / rect.width) * 100; const y = ((event.clientY - rect.top) / rect.height) * 100;
      moveMouseTo(Math.max(6, Math.min(94, x)), Math.max(48, Math.min(84, y)));
    });
    el.bossBtn.addEventListener('click', function () { unlockAudio(); launchBoss(); });
    el.retryBtn.addEventListener('click', resetGame);
  }
  bindEvents(); updateHud();
})();
