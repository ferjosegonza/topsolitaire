import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const STORAGE_KEY = 'topsolitaire-lang';

// Idiomas soportados
// - zh  : Chino simplificado (zh-CN, zh-SG, zh)
// - zh-TW : Chino tradicional (zh-TW, zh-HK, zh-MO)
export const SUPPORTED_LANGS = ['en', 'es', 'fr', 'it', 'pl', 'de', 'zh', 'zh-TW'];

// Metadatos para el selector (bandera + nombre nativo)
export const LANG_META = {
  en: { flag: '🇺🇸', label: 'English' },
  es: { flag: '🇪🇸', label: 'Español' },
  fr: { flag: '🇫🇷', label: 'Français' },
  it: { flag: '🇮🇹', label: 'Italiano' },
  pl: { flag: '🇵🇱', label: 'Polski' },
  de: { flag: '🇩🇪', label: 'Deutsch' },
  zh: { flag: '🇨🇳', label: '简体中文' },
  'zh-TW': { flag: '🇹🇼', label: '繁體中文' },
};

// Mapea un string/código de idioma a uno soportado normalizado (case-insensitive)
export function normalizeLang(lang) {
  if (!lang) return null;
  const match = SUPPORTED_LANGS.find((l) => l.toLowerCase() === lang.toLowerCase());
  return match || null;
}

// Mapea un código de idioma del navegador a uno soportado.
export function resolveLanguage(browserLang) {
  if (!browserLang) return 'en';
  const lower = browserLang.toLowerCase();

  // Chino tradicional
  if (lower.startsWith('zh-tw') || lower.startsWith('zh-hk') || lower.startsWith('zh-mo')) {
    return 'zh-TW';
  }
  // Chino simplificado (zh, zh-cn, zh-sg, ...)
  if (lower.startsWith('zh')) {
    return 'zh';
  }
  // Resto: comparar por prefijo de 2 letras
  const base = lower.slice(0, 2);
  if (SUPPORTED_LANGS.includes(base)) {
    return base;
  }
  return 'en'; // fallback → inglés
}

function getInitialLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  } catch {
    // localStorage no disponible
  }
  // Detección por idioma del navegador
  const navLangs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const lang of navLangs) {
    const resolved = resolveLanguage(lang);
    if (resolved !== 'en') return resolved;
  }
  return resolveLanguage(navigator.language);
}

// Recursos de traducción
const resources = {
  en: {
    translation: {
      meta: {
        title: 'Play Solitaire Online Free - No Signup',
        description: 'Play classic Klondike Solitaire online for free. No signup, no download, no installation — play instantly in your browser on mobile, tablet and desktop.',
      },
      game: {
        badge: '☕ Play · Relax · Rainy Day',
        title: 'Play Solitaire Online Free',
        subtitle: 'Classic Klondike Solitaire — no signup, no download, play instantly in your browser.',
        moves: 'Moves',
        time: 'Time',
        newGame: 'New Game',
        youWon: 'You Won!',
        solvedIn: 'Solved in {{moves}} moves',
        timeLabel: 'Time: {{time}}',
        playAgain: 'Play Again',
        howToPlay: 'How to play',
        undo: 'Undo',
        rule1: 'Tap the stock pile (top-left) to draw a card.',
        rule2: 'Build foundations up by suit, from Ace to King.',
        rule3: 'Build tableau columns down with alternating colors.',
        rule4: 'Tap a card to select it, then tap a destination to move. Double-tap to send a card to the foundations.',
        rule5: 'Only Kings can be placed in empty tableau columns.',
        ariaNewGame: 'New Game',
      },
      lang: {
        select: 'Choose language',
      },
      footer: {
        rights: 'Play Solitaire Online Free. All rights reserved.',
        privacy: 'Privacy Policy',
        contact: 'Contact',
      },
      home: {
        howToTitle: 'How to Play Solitaire',
        howToIntro: 'Solitaire (Klondike) is played with a standard 52-card deck. The goal is to move every card to the four foundations, building each one from Ace to King of the same suit.',
        rulesTitle: 'Solitaire Rules',
        rule1: 'Tableau: arrange cards in descending order, alternating red and black suits.',
        rule2: 'Foundations: build each of the four foundations in ascending order, from Ace to King.',
        rule3: 'Stock and waste: draw the top card of the stock; when it runs out, recycle the waste pile.',
        rule4: 'Victory: you win when all 52 cards are sorted into the four foundations.',
        faqTitle: 'Solitaire FAQ',
        faq1q: 'Is Top Solitaire really free to play?',
        faq1a: 'Yes. Play Solitaire online for free with no signup, no download and no hidden fees — right in your browser.',
        faq2q: 'Can I play Solitaire on my phone?',
        faq2a: 'Yes. The game works on mobile, tablet and desktop and automatically adapts to your screen size.',
        faq3q: 'What is the difference between Solitaire and Klondike?',
        faq3a: 'Klondike is the classic version of Solitaire where cards are dealt into seven tableau columns and you build foundations from Ace to King — the version you can play here for free.',
        backToGame: 'Back to the game',
      },
    },
  },
es: {
    translation: {
      meta: {
        title: 'Jugar Solitario Online Gratis - Sin Registro',
        description: 'Juega al clásico Klondike Solitario online gratis. Sin registro, sin descargas, sin instalación — juega al instante en tu navegador desde móvil, tableta o escritorio.',
      },
      game: {
        badge: '☕ Juega · Relájate · Día Lluvioso',
        title: 'Jugar Solitario Online Gratis',
        subtitle: 'Klondike Solitario clásico — sin registro, sin descargas, juega al instante en tu navegador.',
        moves: 'Movimientos',
        time: 'Tiempo',
        newGame: 'Nuevo Juego',
        youWon: '¡Ganaste!',
        solvedIn: 'Resuelto en {{moves}} movimientos',
        timeLabel: 'Tiempo: {{time}}',
        playAgain: 'Jugar de nuevo',
        howToPlay: 'Cómo jugar',
        undo: 'Deshacer',
        rule1: 'Toca el mazo (arriba a la izquierda) para sacar una carta.',
        rule2: 'Construye las bases por palo, del As al Rey.',
        rule3: 'Construye las columnas hacia abajo alternando colores.',
        rule4: 'Toca una carta para seleccionarla y luego un destino para moverla. Toca dos veces para enviar una carta a las bases.',
        rule5: 'Solo los Reyes pueden colocarse en columnas vacías.',
        ariaNewGame: 'Nuevo Juego',
      },
      lang: {
        select: 'Elegir idioma',
      },
      footer: {
        rights: 'Jugar Solitario Online Gratis. Todos los derechos reservados.',
        privacy: 'Política de Privacidad',
        contact: 'Contacto',
      },
      home: {
        howToTitle: 'Cómo jugar al Solitario',
        howToIntro: 'El Solitario (Klondike) se juega con una baraja estándar de 52 cartas. El objetivo es llevar todas las cartas a las cuatro bases, construyendo cada una del As al Rey del mismo palo.',
        rulesTitle: 'Reglas del Solitario',
        rule1: 'Columnas: ordena las cartas de mayor a menor, alternando rojo y negro.',
        rule2: 'Bases: construye cada una de las cuatro bases en orden ascendente, del As al Rey.',
        rule3: 'Mazo y descarte: saca la carta superior del mazo; cuando se agote, recicla la pila de descarte.',
        rule4: 'Victoria: ganas cuando las 52 cartas están ordenadas en las cuatro bases.',
        faqTitle: 'Preguntas frecuentes del Solitario',
        faq1q: '¿Top Solitaire es realmente gratis?',
        faq1a: 'Sí. Juega al solitario online gratis, sin registro, sin descargas y sin costes ocultos — directamente en tu navegador.',
        faq2q: '¿Puedo jugar al solitario en el móvil?',
        faq2a: 'Sí. El juego funciona en móvil, tableta y escritorio, y se adapta automáticamente al tamaño de tu pantalla.',
        faq3q: '¿Qué diferencia hay entre solitario y Klondike?',
        faq3a: 'Klondike es la versión clásica del solitario en la que las cartas se reparten en siete columnas y construyes las bases del As al Rey — la versión que puedes jugar aquí gratis.',
        backToGame: 'Volver al juego',
      },
    },
  },
fr: {
    translation: {
      meta: {
        title: 'Jouer au Solitaire en Ligne Gratuit - Sans Inscription',
        description: 'Jouez au Klondike Solitaire classique en ligne gratuitement. Sans inscription, sans téléchargement, sans installation — jouez instantanément dans votre navigateur sur mobile, tablette ou ordinateur.',
      },
      game: {
        badge: '☕ Jouez · Détendez-vous · Jour de Pluie',
        title: 'Jouer au Solitaire en Ligne Gratuitement',
        subtitle: 'Klondike Solitaire classique — sans inscription, sans téléchargement, jouez instantanément dans votre navigateur.',
        moves: 'Coups',
        time: 'Temps',
        newGame: 'Nouvelle Partie',
        youWon: 'Vous avez gagné !',
        solvedIn: 'Résolu en {{moves}} coups',
        timeLabel: 'Temps : {{time}}',
        playAgain: 'Rejouer',
        howToPlay: 'Comment jouer',
        undo: 'Annuler',
        rule1: 'Cliquez sur la pioche (en haut à gauche) pour tirer une carte.',
        rule2: 'Construisez les fondations par couleur, de l\'As au Roi.',
        rule3: 'Construisez les colonnes en descendant en alternant les couleurs.',
        rule4: 'Cliquez sur une carte pour la sélectionner, puis sur une destination pour la déplacer. Double-cliquez pour envoyer une carte aux fondations.',
        rule5: 'Seuls les Rois peuvent être placés dans les colonnes vides.',
        ariaNewGame: 'Nouvelle Partie',
      },
      lang: {
        select: 'Choisir la langue',
      },
      footer: {
        rights: 'Jouer au Solitaire en Ligne Gratuitement. Tous droits réservés.',
        privacy: 'Politique de confidentialité',
        contact: 'Contact',
      },
      home: {
        howToTitle: 'Comment jouer au Solitaire',
        howToIntro: 'Le Solitaire (Klondike) se joue avec un jeu standard de 52 cartes. Le but est de déplacer toutes les cartes vers les quatre fondations, en construisant chacune de l\'As au Roi de la même couleur.',
        rulesTitle: 'Règles du Solitaire',
        rule1: 'Tableau : rangez les cartes en ordre décroissant, en alternant les couleurs.',
        rule2: 'Fondations : construisez chacune des quatre fondations en ordre croissant, de l\'As au Roi.',
        rule3: 'Pioche et talon : tirez la carte supérieure de la pioche ; quand elle est épuisée, retournez le talon.',
        rule4: 'Victoire : vous gagnez lorsque les 52 cartes sont rangées dans les quatre fondations.',
        faqTitle: 'FAQ Solitaire',
        faq1q: 'Top Solitaire est-il vraiment gratuit ?',
        faq1a: 'Oui. Jouez gratuitement, sans inscription, sans téléchargement et sans frais cachés — directement dans votre navigateur.',
        faq2q: 'Puis-je jouer au Solitaire sur mon téléphone ?',
        faq2a: 'Oui. Le jeu fonctionne sur mobile, tablette et ordinateur et s\'adapte automatiquement à la taille de votre écran.',
        faq3q: 'Quelle est la différence entre le Solitaire et le Klondike ?',
        faq3a: 'Le Klondike est la version classique du Solitaire où les cartes sont distribuées en sept colonnes et où l\'on construit les fondations de l\'As au Roi — la version que vous pouvez jouer ici gratuitement.',
        backToGame: 'Retour au jeu',
      },
    },
  },
it: {
    translation: {
      meta: {
        title: 'Gioca a Solitario Online Gratis - Senza Registrazione',
        description: 'Gioca al classico Klondike Solitario online gratuitamente. Senza registrazione, senza download, senza installazione — gioca subito nel tuo browser su mobile, tablet o desktop.',
      },
      game: {
        badge: '☕ Gioca · Rilassati · Giorno di Pioggia',
        title: 'Gioca a Solitario Online Gratis',
        subtitle: 'Klondike Solitario classico — senza registrazione, senza download, gioca subito nel tuo browser.',
        moves: 'Mosse',
        time: 'Tempo',
        newGame: 'Nuova Partita',
        youWon: 'Hai vinto!',
        solvedIn: 'Risolto in {{moves}} mosse',
        timeLabel: 'Tempo: {{time}}',
        playAgain: 'Gioca di nuovo',
        howToPlay: 'Come si gioca',
        undo: 'Annulla',
        rule1: 'Tocca il mazzo (in alto a sinistra) per pescare una carta.',
        rule2: 'Costruisci i fondamenti per seme, dall\'Asso al Re.',
        rule3: 'Costruisci le colonne in ordine decrescente alternando i colori.',
        rule4: 'Tocca una carta per selezionarla, poi tocca una destinazione per spostarla. Doppio tocco per inviare una carta ai fondamenti.',
        rule5: 'Solo i Re possono essere posti in colonne vuote.',
        ariaNewGame: 'Nuova Partita',
      },
      lang: {
        select: 'Scegli la lingua',
      },
      footer: {
        rights: 'Gioca a Solitario Online Gratis. Tutti i diritti riservati.',
        privacy: 'Informativa sulla privacy',
        contact: 'Contatto',
      },
      home: {
        howToTitle: 'Come si gioca a Solitario',
        howToIntro: 'Il Solitario (Klondike) si gioca con un mazzo standard di 52 carte. L\'obiettivo è portare tutte le carte sulle quattro fondamenta, costruendo ognuna dall\'Asso al Re dello stesso seme.',
        rulesTitle: 'Regole del Solitario',
        rule1: 'Tableau: disponi le carte in ordine decrescente, alternando i colori.',
        rule2: 'Fondamenta: costruisci ognuna delle quattro fondamenta in ordine crescente, dall\'Asso al Re.',
        rule3: 'Mazzo e scarto: pesca la carta in cima al mazzo; quando finisce, ricicla la pila degli scarti.',
        rule4: 'Vittoria: vinci quando tutte le 52 carte sono ordinate nelle quattro fondamenta.',
        faqTitle: 'Domande frequenti sul Solitario',
        faq1q: 'Top Solitaire è davvero gratuito?',
        faq1a: 'Sì. Gioca a solitario online gratis, senza registrazione, senza download e senza costi nascosti — direttamente nel tuo browser.',
        faq2q: 'Posso giocare a solitario sul mio telefono?',
        faq2a: 'Sì. Il gioco funziona su mobile, tablet e desktop e si adatta automaticamente alla dimensione dello schermo.',
        faq3q: 'Qual è la differenza tra solitario e Klondike?',
        faq3a: 'Il Klondike è la versione classica del solitario in cui le carte vengono distribuite in sette colonne e si costruiscono le fondamenta dall\'Asso al Re — la versione che puoi giocare qui gratis.',
        backToGame: 'Torna al gioco',
      },
    },
  },
pl: {
    translation: {
      meta: {
        title: 'Graj w Pasjansa Online za Darmo - Bez Rejestracji',
        description: 'Graj w klasycznego Klondike Pasjansa online za darmo. Bez rejestracji, bez pobierania, bez instalacji — graj natychmiast w przeglądarce na telefonie, tablecie lub komputerze.',
      },
      game: {
        badge: '☕ Graj · Odpocznij · Deszczowy Dzień',
        title: 'Graj w Pasjansa Online za Darmo',
        subtitle: 'Klasyczny Klondike Pasjans — bez rejestracji, bez pobierania, graj natychmiast w przeglądarce.',
        moves: 'Ruchy',
        time: 'Czas',
        newGame: 'Nowa Gra',
        youWon: 'Wygrałeś!',
        solvedIn: 'Rozwiązane w {{moves}} ruchów',
        timeLabel: 'Czas: {{time}}',
        playAgain: 'Zagraj ponownie',
        howToPlay: 'Jak grać',
        undo: 'Cofnij',
        rule1: 'Kliknij stos kart (w lewym górnym rogu), aby dobrać kartę.',
        rule2: 'Buduj fundamenty wg kolorów, od Asa do Króla.',
        rule3: 'Buduj kolumny w dół, naprzemiennie kolorami.',
        rule4: 'Kliknij kartę, aby ją zaznaczyć, a następnie kliknij miejsce docelowe, aby ją przenieść. Podwójne kliknięcie wyśle kartę do fundamentów.',
        rule5: 'Tylko Króle mogą być umieszczane w pustych kolumnach.',
        ariaNewGame: 'Nowa Gra',
      },
      lang: {
        select: 'Wybierz język',
      },
      footer: {
        rights: 'Graj w Pasjansa Online za Darmo. Wszelkie prawa zastrzeżone.',
        privacy: 'Polityka prywatności',
        contact: 'Kontakt',
      },
      home: {
        howToTitle: 'Jak grać w Pasjansa',
        howToIntro: 'Pasjans (Klondike) gra się standardową talią 52 kart. Celem jest przeniesienie wszystkich kart na cztery fundamenty, budując każdy od Asa do Króla w tym samym kolorze.',
        rulesTitle: 'Zasady Pasjansa',
        rule1: 'Kolumny: układaj karty w kolejności malejącej, naprzemiennie kolorami.',
        rule2: 'Fundamenty: buduj każdy z czterech fundamentów w kolejności rosnącej, od Asa do Króla.',
        rule3: 'Stos kart i stos odrzuconych: dobierz kartę ze stosu; gdy się skończy, odwróć stos odrzuconych.',
        rule4: 'Zwycięstwo: wygrywasz, gdy wszystkie 52 karty znajdą się na czterech fundamentach.',
        faqTitle: 'Częste pytania o Pasjansa',
        faq1q: 'Czy Top Solitaire jest naprawdę darmowy?',
        faq1a: 'Tak. Graj w pasjansa online za darmo, bez rejestracji, bez pobierania i bez ukrytych opłat — bezpośrednio w przeglądarce.',
        faq2q: 'Czy mogę grać w pasjansa na telefonie?',
        faq2a: 'Tak. Gra działa na telefonie, tablecie i komputerze, automatycznie dopasowując się do rozmiaru ekranu.',
        faq3q: 'Jaka jest różnica między pasjansem a Klondike?',
        faq3a: 'Klondike to klasyczna wersja pasjansa, w której karty rozdaje się do siedmiu kolumn, a fundamenty buduje się od Asa do Króla — wersja, w którą możesz grać tutaj za darmo.',
        backToGame: 'Wróć do gry',
      },
    },
  },
de: {
    translation: {
      meta: {
        title: 'Solitaire Online Kostenlos Spielen - Ohne Anmeldung',
        description: 'Spiele klassisches Klondike Solitaire online kostenlos. Ohne Anmeldung, ohne Download, ohne Installation — direkt im Browser spielen, auf Mobilgerät, Tablet oder Desktop.',
      },
      game: {
        badge: '☕ Spielen · Entspannen · Regentag',
        title: 'Solitaire Online Kostenlos Spielen',
        subtitle: 'Klassisches Klondike Solitaire — ohne Anmeldung, ohne Download, direkt im Browser spielen.',
        moves: 'Züge',
        time: 'Zeit',
        newGame: 'Neues Spiel',
        youWon: 'Gewonnen!',
        solvedIn: 'Gelöst in {{moves}} Zügen',
        timeLabel: 'Zeit: {{time}}',
        playAgain: 'Nochmal spielen',
        howToPlay: 'So spielt man',
        undo: 'Rückgängig',
        rule1: 'Tippe auf den Stapel (oben links), um eine Karte zu ziehen.',
        rule2: 'Baue die Fundamente nach Farbe auf, vom Ass zum König.',
        rule3: 'Baue die Reihen absteigend mit abwechselnden Farben.',
        rule4: 'Tippe auf eine Karte, um sie auszuwählen, dann auf ein Ziel, um sie zu bewegen. Doppeltippen sendet eine Karte zu den Fundamenten.',
        rule5: 'Nur Könige dürfen in leere Reihen gelegt werden.',
        ariaNewGame: 'Neues Spiel',
      },
      lang: {
        select: 'Sprache wählen',
      },
      footer: {
        rights: 'Solitaire Online Kostenlos Spielen. Alle Rechte vorbehalten.',
        privacy: 'Datenschutzerklärung',
        contact: 'Kontakt',
      },
      home: {
        howToTitle: 'So spielst du Solitaire',
        howToIntro: 'Solitaire (Klondike) wird mit einem Standard-Kartenspiel mit 52 Karten gespielt. Ziel ist es, alle Karten auf die vier Fundamente zu bringen, jeweils vom Ass bis zum König in derselben Farbe.',
        rulesTitle: 'Solitaire-Regeln',
        rule1: 'Tisch: ordne die Karten absteigend an, mit abwechselnden Farben.',
        rule2: 'Fundamente: baue jedes der vier Fundamente in aufsteigender Reihenfolge vom Ass zum König.',
        rule3: 'Nachziehstapel und Ablage: ziehe die oberste Karte des Stapels; ist er leer, drehe die Ablage um.',
        rule4: 'Sieg: Du gewinnst, wenn alle 52 Karten auf den vier Fundamenten liegen.',
        faqTitle: 'Solitaire-FAQ',
        faq1q: 'Ist Top Solitaire wirklich kostenlos?',
        faq1a: 'Ja. Spiele Solitaire online kostenlos — ohne Anmeldung, ohne Download und ohne versteckte Kosten — direkt im Browser.',
        faq2q: 'Kann ich Solitaire auf dem Handy spielen?',
        faq2a: 'Ja. Das Spiel funktioniert auf Handy, Tablet und Computer und passt sich automatisch der Bildschirmgröße an.',
        faq3q: 'Was ist der Unterschied zwischen Solitaire und Klondike?',
        faq3a: 'Klondike ist die klassische Version von Solitaire, bei der die Karten in sieben Reihen ausgeteilt werden und du die Fundamente vom Ass bis zum König aufbaust — die Version, die du hier kostenlos spielen kannst.',
        backToGame: 'Zurück zum Spiel',
      },
    },
  },
zh: {
    translation: {
      meta: {
        title: '免费在线玩纸牌接龙 - 无需注册',
        description: '免费在线玩经典克朗代克纸牌接龙。无需注册，无需下载，无需安装 — 在手机、平板或电脑浏览器中即刻畅玩。',
      },
      game: {
        badge: '☕ 玩耍 · 放松 · 雨天',
        title: '免费在线玩纸牌接龙',
        subtitle: '经典克朗代克纸牌接龙 — 无需注册，无需下载，直接在浏览器中畅玩。',
        moves: '步数',
        time: '时间',
        newGame: '新游戏',
        youWon: '你赢了！',
        solvedIn: '用 {{moves}} 步完成',
        timeLabel: '时间：{{time}}',
        playAgain: '再玩一次',
        howToPlay: '玩法说明',
        undo: '撤销',
        rule1: '点击牌堆（左上角）抽一张牌。',
        rule2: '按花色将牌从A到K构建到基础区。',
        rule3: '按降序并交替颜色构建列。',
        rule4: '点击一张牌选中它，然后点击目标位置移动。双击将牌发送到基础区。',
        rule5: '只有K可以放到空列上。',
        ariaNewGame: '新游戏',
      },
      lang: {
        select: '选择语言',
      },
      footer: {
        rights: '免费在线玩纸牌接龙。保留所有权利。',
        privacy: '隐私政策',
        contact: '联系我们',
      },
      home: {
        howToTitle: '如何玩纸牌接龙',
        howToIntro: '纸牌接龙（Klondike）使用一副标准的52张牌。目标是将所有牌移到四个基础区，每堆按同花色从A到K排列。',
        rulesTitle: '纸牌接龙规则',
        rule1: '列：按降序排列牌，红黑交替。',
        rule2: '基础区：将四堆基础牌从A到K按升序排列。',
        rule3: '牌堆和废牌区：抽取牌堆顶部的牌；牌堆耗尽后，重新使用废牌区。',
        rule4: '胜利：当所有52张牌都按顺序放入基础区时，你就赢了。',
        faqTitle: '纸牌接龙常见问题',
        faq1q: 'Top Solitaire 真的免费吗？',
        faq1a: '是的。免费在线玩纸牌接龙，无需注册、无需下载、无隐藏费用——直接在浏览器中畅玩。',
        faq2q: '我可以在手机上玩纸牌接龙吗？',
        faq2a: '可以。游戏适用于手机、平板和电脑，并会根据你的屏幕大小自动调整。',
        faq3q: '纸牌接龙和克朗代克有什么区别？',
        faq3a: '克朗代克是纸牌接龙的经典版本，牌会分到七列中，你从A到K构建基础区——你可以在这里免费玩这个版本。',
        backToGame: '回到游戏',
      },
    },
  },
'zh-TW': {
    translation: {
      meta: {
        title: '免費線上玩紙牌接龍 - 無需註冊',
        description: '免費線上玩經典克朗代克紙牌接龍。無需註冊，無需下載，無需安裝 — 在手機、平板或電腦瀏覽器中即刻暢玩。',
      },
      game: {
        badge: '☕ 遊玩 · 放鬆 · 雨天',
        title: '免費線上玩紙牌接龍',
        subtitle: '經典克朗代克紙牌接龍 — 無需註冊，無需下載，直接在瀏覽器中暢玩。',
        moves: '步數',
        time: '時間',
        newGame: '新遊戲',
        youWon: '你贏了！',
        solvedIn: '用 {{moves}} 步完成',
        timeLabel: '時間：{{time}}',
        playAgain: '再玩一次',
        howToPlay: '玩法說明',
        undo: '撤銷',
        rule1: '點擊牌堆（左上角）抽一張牌。',
        rule2: '按花色將牌從A到K構建到基礎區。',
        rule3: '按降序並交替顏色構建列。',
        rule4: '點擊一張牌選中它，然後點擊目標位置移動。雙擊將牌發送到基礎區。',
        rule5: '只有K可以放到空列上。',
        ariaNewGame: '新遊戲',
      },
      lang: {
        select: '選擇語言',
      },
      footer: {
        rights: '免費線上玩紙牌接龍。保留所有權利。',
        privacy: '隱私政策',
        contact: '聯絡我們',
      },
      home: {
        howToTitle: '如何玩紙牌接龍',
        howToIntro: '紙牌接龍（Klondike）使用一副標準的52張牌。目標是將所有牌移到四個基礎區，每堆按同花色從A到K排列。',
        rulesTitle: '紙牌接龍規則',
        rule1: '列：按降序排列牌，紅黑交替。',
        rule2: '基礎區：將四堆基礎牌從A到K按升序排列。',
        rule3: '牌堆和廢牌區：抽取牌堆頂部的牌；牌堆耗盡後，重新使用廢牌區。',
        rule4: '勝利：當所有52張牌都按順序放入基礎區時，你就贏了。',
        faqTitle: '紙牌接龍常見問題',
        faq1q: 'Top Solitaire 真的免費嗎？',
        faq1a: '是的。免費線上玩紙牌接龍，無需註冊、無需下載、無隱藏費用——直接在瀏覽器中暢玩。',
        faq2q: '我可以在手機上玩紙牌接龍嗎？',
        faq2a: '可以。遊戲適用於手機、平板和電腦，並會根據你的螢幕大小自動調整。',
        faq3q: '紙牌接龍和克朗代克有什麼區別？',
        faq3a: '克朗代克是紙牌接龍的經典版本，牌會分到七列中，你從A到K構建基礎區——你可以在這裡免費玩這個版本。',
        backToGame: '回到遊戲',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGS,
    interpolation: {
      escapeValue: false, // React ya escapa
    },
    react: {
      useSuspense: false,
    },
  });

// Persistir cambios de idioma en localStorage y aplicar fuente CJK
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // ignorar
  }
  document.documentElement.setAttribute('data-lang', lng);
});

// Aplicar data-lang inicial (para la fuente CJK)
document.documentElement.setAttribute('data-lang', i18n.language);

export default i18n;
