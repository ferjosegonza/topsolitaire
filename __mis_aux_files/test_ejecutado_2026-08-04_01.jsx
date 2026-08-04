último test suite ejecutado 2026-08-04 06.55

desarrollo@DESARROLLO03 MINGW64 /d/xampp/htdocs/topsolitaire (hotfix/update-haciendo.txt)
$ npm run test

> topsolitaire@0.0.0 test
> vitest --environment jsdom


 DEV  v2.1.9 D:/xampp/htdocs/topsolitaire

stderr | __tests__/ui.test.jsx > Tests del Footer > Footer tiene el texto de copyright
⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition.
⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath.

stderr | __tests__/app-routing.test.jsx > App - rutas y navegación del sitio > renderiza el Home con el juego en la ruta raíz
⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition.
⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath.

 ❯ __tests__/app-routing.test.jsx (6) 566ms
   ❯ App - rutas y navegación del sitio (6) 565ms
     ✓ renderiza el Home con el juego en la ruta raíz
     × renderiza la página de Privacy Policy en /privacy-policy
     ✓ renderiza la página de Contact en /contact
     ✓ una ruta desconocida cae en el Home (juego)
     ✓ el footer contiene enlaces a Privacy Policy y Contact
     ✓ el sitio no depende de autenticación: no hay ruta de login
 ❯ __tests__/auto-move.test.jsx (6) 351ms
   ❯ Auto-move - comportamiento real (estado determinista) (6) 349ms
     ✓ la última carta que puede ir a foundation se auto-mueve (prioridad 1)
     ✓ si puede ir a foundation Y a tableau, prioriza foundation
     × si hay varios destinos tableau, elige la columna con MÁS cartas
     × en caso de empate entre destinos, elige la columna más a la derecha
     × un clic en la última carta boca abajo la voltea (no la mueve)
     × al hacer clic en el stock vacío, el waste se reinvierte al stock
 ❯ __tests__/drag-drop.test.jsx (6) 625ms
   ❯ Drag & Drop - comportamiento real (estado determinista) (6) 624ms
     × existen 7 slots de tableau y 4 de foundation (también en columnas con cartas)
     × arrastrar una carta de tableau a otra columna la mueve
     × arrastrar la última carta del tableau a foundation la mueve
     ✓ un arrastre corto (menos del umbral de 5px) NO mueve la carta
     × un grupo de cartas se arrastra y se mueve COMPLETO
     ✓ no se puede arrastrar una carta boca abajo
 ✓ __tests__/setup.test.js (3)
 ✓ __tests__/solitaire.test.jsx (11)
 ✓ __tests__/sound.test.jsx (1)
 ✓ __tests__/ui.test.jsx (17) 1521ms
 ✓ __tests__/visual-effects.test.jsx (17) 2154ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 9 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
 FAIL  __tests__/app-routing.test.jsx > App - rutas y navegación del sitio > renderiza la página de Privacy Policy en /privacy-policy
TestingLibraryElementError: Unable to find an element with the text: /no registration or login/i. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

Ignored nodes: comments, script, style
<body>
  <div>
    <div
      class="ad-container ad-top"
    >
      <ins
        class="adsbygoogle"
        data-ad-client="ca-pub-2204003132702383"
        data-ad-format="auto"
        data-ad-slot="2778338000"
        data-full-width-responsive="true"
        style="display: block;"
      />
    </div>
    <div
      class="min-h-screen bg-slate-50"
    >
      <div
        class="mx-auto max-w-2xl px-4 py-10"
      >
        <a
          class="text-sm text-slate-500 hover:text-slate-900 transition-colors"
          href="#/"
        >
          ← Back to Solitaire
        </a>
        <h1
          class="mt-4 text-2xl font-bold text-slate-900"
        >
          Privacy Policy
        </h1>
        <div
          class="mt-4 prose prose-sm text-slate-600 space-y-3"
        >
          <p
            class="text-sm text-slate-500"
          >
            Last updated: July 22, 2026
          </p>
          <p>
            At Play Solitaire Online Free, we respect your privacy. This Privacy Policy explains how we handle your information when you use our website.
          </p>
          <h2
            class="text-lg font-semibold text-slate-900 mt-4"
          >
            1. Information We Collect
          </h2>
          <p>
            We do not collect any personal information such as names, email addresses, or payment details. Our game is completely free to play without registration or login.
          </p>
          <h2
            class="text-lg font-semibold text-slate-900 mt-4"
          >
            2. Cookies and Tracking
          </h2>
          <p>
            We use cookies to enhance your experience and serve relevant advertisements. Specifically:
          </p>
          <ul
            class="list-disc pl-5 space-y-1"
          >
            <li>
              <strong>
                Google AdSense:
              </strong>
               Uses cookies to serve ads based on your previous visits to our site or other websites. You can opt out of personalized advertising by visiting 
              <a
                class="text-slate-900 underline"
                href="https://www.google.com/settings/ads"
                rel="noopener"
                target="_blank"
              >
                Google Ad Settings
              </a>
              .
            </li>
            <li>
              <strong>
                Essential Cookies:
              </strong>
               Required for the game to function properly.
            </li>
          </ul>
          <h2
            class="text-lg font-semibold text-slate-900 mt-4"
          >
            3. Third-Party Services
          </h2>
          <p>
            We use the following third-party services:
          </p>
          <ul
            class="list-disc pl-5 space-y-1"
          >
            <li>
              <strong>
                Google AdSense:
              </strong>
               For displaying advertisements. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
            </li>
          </ul>
          <h2
            class="text-lg font-semibold text-slate-900 mt-4"
          >
            4. Data Security
          </h2>
          <p>
            We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your information.
          </p>
          <h2
            class="text-lg font-semibold text-slate-900 mt-4"
          >
            5. Children's Privacy
          </h2>
          <p>
            Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children.
          </p>
          <h2
            class="text-lg font-semibold text-slate-900 mt-4"
          >
            6. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. You should visit the website from time to time for any changes in the new Privacy Policy on this page.
          </p>
          <h2
            class="text-lg font-semibold text-slate-900 mt-4"
          >
            7. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: 
            <a
              class="text-slate-900 underline"
              href="mailto:support@topsolitaire.online"
            >
              support@topsolitaire.online
            </a>
          </p>
        </div>
      </div>
    </div>
    <div
      class="ad-container ad-bottom"
    >
      <ins
        class="adsbygoogle"
        data-ad-client="ca-pub-2204003132702383"
        data-ad-format="auto"
        data-ad-slot="2778338000"
        data-full-width-responsive="true"
        style="display: block;"
      />
    </div>
    <div
      class="ad-container ad-side"
      style="position: fixed; right: 8px; top: 50%; transform: translateY(-50%); width: 160px; min-height: 600px; z-index: 100;"
    >
      <ins
        class="adsbygoogle"
        data-ad-client="ca-pub-2204003132702383"
        data-ad-format="vertical"
        data-ad-slot="2778338000"
        data-full-width-responsive="true"
        style="display: block;"
      />
    </div>
    <div
      class="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
    >
      <div
        class="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
      />
    </div>
  </div>
</body>
 ❯ Object.getElementError node_modules/@testing-library/dom/dist/config.js:37:19
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:76:38
 ❯ node_modules/@testing-library/dom/dist/query-helpers.js:109:15
 ❯ __tests__/app-routing.test.jsx:48:19
     46|     render(<App />);
     47|     expect(screen.getAllByText(/Privacy Policy/i).length).toBeGreaterThan(0);
     48|     expect(screen.getAllByText(/no registration or login/i).length).toBeGreaterThan(0);
       |                   ^
     49|   });
     50| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/9]⎯
 FAIL  __tests__/auto-move.test.jsx > Auto-move - comportamiento real (estado determinista) > si hay varios destinos tableau, elige la columna con MÁS cartas
AssertionError: expected '0' to be '1' // Object.is equality

Expected: "1"
Received: "0"

 ❯ __tests__/auto-move.test.jsx:103:26
    101|     clickCard('c1');
    102| 
    103|     expect(movesValue()).toBe('1');
       |                          ^
    104|     expect(document.querySelector('[data-tableau-slot="1"] [data-card-id="c1"]')).toBeTruthy();
    105|     expect(document.querySelector('[data-tableau-slot="2"] [data-card-id="c1"]')).toBeNull();

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/9]⎯
 FAIL  __tests__/auto-move.test.jsx > Auto-move - comportamiento real (estado determinista) > en caso de empate entre destinos, elige la columna más a la derecha
AssertionError: expected null to be truthy

- Expected: 
true

+ Received: 
null

 ❯ __tests__/auto-move.test.jsx:120:83
    118| 
    119|     expect(movesValue()).toBe('1');
    120|     expect(document.querySelector('[data-tableau-slot="2"] [data-card-id="c1"]')).toBeTruthy();
       |                                                                                   ^
    121|     expect(document.querySelector('[data-tableau-slot="1"] [data-card-id="c1"]')).toBeNull();
    122|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/9]⎯
 FAIL  __tests__/auto-move.test.jsx > Auto-move - comportamiento real (estado determinista) > un clic en la última carta boca abajo la voltea (no la mueve)
AssertionError: expected <div …(1)></div> to be null

- Expected: 
null

+ Received: 
<div
  class="solitaire-card solitaire-card-back relative cursor-pointer"
  style="transform: none;"
/>

 ❯ __tests__/auto-move.test.jsx:138:80
    136| 
    137|     // Tras el clic quedó boca arriba
    138|     expect(document.querySelector('[data-card-id="c1"] .solitaire-card-back')).toBeNull();
       |                                                                                ^
    139|     expect(document.querySelector('[data-card-id="c1"] .solitaire-card:not(.solitaire-card-back)')).toBeTruthy();
    140|     expect(movesValue()).toBe('0');

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/9]⎯
 FAIL  __tests__/auto-move.test.jsx > Auto-move - comportamiento real (estado determinista) > al hacer clic en el stock vacío, el waste se reinvierte al stock
AssertionError: expected <div …(1)></div> to be null

- Expected: 
null

+ Received: 
<div
  class="solitaire-card rounded-md border border-dashed border-white/25 flex items-center justify-center text-white/30 "
/>

 ❯ __tests__/auto-move.test.jsx:162:91
    160|     // El waste quedó vacío (sin carta boca arriba)
    161|     const topRow = document.querySelectorAll('.grid-cols-7')[0];
    162|     expect(topRow.children[1].querySelector('.solitaire-card:not(.solitaire-card-back)')).toBeNull();
       |                                                                                           ^
    163|   });
    164| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/9]⎯
 FAIL  __tests__/drag-drop.test.jsx > Drag & Drop - comportamiento real (estado determinista) > existen 7 slots de tableau y 4 de foundation (también en columnas con cartas)
AssertionError: expected …(8) to have a length of 4 but got 8

- Expected
+ Received

- 4
+ 8

 ❯ __tests__/drag-drop.test.jsx:111:65
    109| 
    110|     expect(document.querySelectorAll('[data-tableau-slot]')).toHaveLength(7);
    111|     expect(document.querySelectorAll('[data-foundation-slot]')).toHaveLength(4);
       |                                                                 ^
    112| 
    113|     // Una columna CON cartas también tiene el atributo data-tableau-slot

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/9]⎯
 FAIL  __tests__/drag-drop.test.jsx > Drag & Drop - comportamiento real (estado determinista) > arrastrar una carta de tableau a otra columna la mueve
AssertionError: expected '0' to be '1' // Object.is equality

Expected: "1"
Received: "0"

 ❯ __tests__/drag-drop.test.jsx:131:26
    129|     await dragFromTo('c1', 30, 30, 120, 250);
    130| 
    131|     expect(movesValue()).toBe('1');
       |                          ^
    132|     expect(document.querySelector('[data-tableau-slot="1"] [data-card-id="c1"]')).toBeTruthy();
    133|     expect(document.querySelector('[data-tableau-slot="0"] [data-card-id]')).toBeNull();

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/9]⎯
 FAIL  __tests__/drag-drop.test.jsx > Drag & Drop - comportamiento real (estado determinista) > arrastrar la última carta del tableau a foundation la mueve
AssertionError: expected '0' to be '1' // Object.is equality

Expected: "1"
Received: "0"

 ❯ __tests__/drag-drop.test.jsx:148:26
    146|     await dragFromTo('c1', 30, 30, 320, 50);
    147| 
    148|     expect(movesValue()).toBe('1');
       |                          ^
    149|     expect(document.querySelector('[data-foundation-slot="0"] .solitaire-card:not(.solitaire-card-back)')).toBeTruthy();
    150|     expect(document.querySelector('[data-card-id="c1"]')).toBeNull();

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/9]⎯
 FAIL  __tests__/drag-drop.test.jsx > Drag & Drop - comportamiento real (estado determinista) > un grupo de cartas se arrastra y se mueve COMPLETO
AssertionError: expected '0' to be '1' // Object.is equality

Expected: "1"
Received: "0"

 ❯ __tests__/drag-drop.test.jsx:185:26
    183|     await dragFromTo('c1', 30, 30, 120, 250);
    184| 
    185|     expect(movesValue()).toBe('1');
       |                          ^
    186|     const col1 = document.querySelector('[data-tableau-slot="1"]');
    187|     expect(col1.querySelector('[data-card-id="c1"]')).toBeTruthy();

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[9/9]⎯
 Test Files  3 failed | 5 passed (8)
      Tests  9 failed | 58 passed (67)
   Start at  06:53:19
   Duration  33.66s (transform 1.43s, setup 8.22s, collect 14.48s, tests 5.44s, environment 20.13s, prepare 2.17s)

 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit

