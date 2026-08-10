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
