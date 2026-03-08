(function () {
  "use strict";

  // ============================================================
  // I18N
  // ============================================================
  let LANG = "en";
  const I = {
    en: {
      skip: "Skip to content",
      subtitle:
        "Test your password against 10 attack types and 6 hashing algorithms. No password is stored or transmitted.",
      inputLabel: "Enter a password to test",
      placeholder: "Your password…",
      show: "Show",
      hide: "Hide",
      showAria: "Show password",
      hideAria: "Hide password",
      reset: "Reset",
      hint: 'Local calculation + <abbr title="Have I Been Pwned">HIBP</abbr> k-anonymity check.',
      hibpTitle: "This password has been leaked!",
      hibpText:
        'This password appears <strong id="hibp-count">—</strong> times in data breaches indexed by <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noopener">Have I Been Pwned</a>. It is strongly recommended not to use it.',
      hibpPrivacy:
        'Verified via <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">k-anonymity</a>: only the first 5 chars of the SHA-1 hash are sent.',
      hibpSafe:
        "This password does not appear in any known breach from Have I Been Pwned.",
      hibpError: "Could not verify against Have I Been Pwned (network issue).",
      weak: "Weak",
      strong: "Strong",
      chars: "Characters",
      charsetSize: "Charset size",
      entropyBits: "Entropy bits",
      combos: "Combinations",
      status: "Status",
      statusShort: "Too short",
      statusGood: "Good length",
      statusExcellent: "Excellent",
      tableCaption: "Crack time by attack type and hashing algorithm",
      advancedDetails: "Advanced details",
      timeToCrackTitle: "Time to crack:",
      methodLink: "Learn more about this method",
      thAttack: "Attack type",
      thAlgo: "Algorithm",
      thSpeed: "Speed (12 GPU)",
      thTime: "Est. time",
      methTitle: "Methodology and sources",
      methContent:
        "<h3>10 attack types modeled</h3><ol class='method-list'><li><strong>Brute force</strong> — exhaustive search of all combinations. <a href='https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler' target='_blank' rel='noopener'>Source</a></li><li><strong>Dictionary</strong> — testing ~14 billion known leaked credentials. <a href='https://haveibeenpwned.com/' target='_blank' rel='noopener'>Source</a></li><li><strong>Hybrid</strong> — dictionary + hashcat mutation rules (~1,000 variants/word). <a href='https://gist.github.com/Chick3nman/32e662a5bb63bc4f51b847bb422222fd' target='_blank' rel='noopener'>Source</a></li><li><strong>Mask</strong> — targets predictable human structures. <a href='https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler' target='_blank' rel='noopener'>Source</a></li><li><strong>Rainbow table</strong> — instant lookup on unsalted hashes. <a href='https://www.hivesystems.com/blog/are-your-passwords-in-the-green' target='_blank' rel='noopener'>Source</a></li><li><strong>Credential stuffing</strong> — reuse of leaked credential pairs. <a href='https://haveibeenpwned.com/' target='_blank' rel='noopener'>Source</a></li><li><strong>Password spraying</strong> — common passwords across many accounts. <a href='https://securelist.com/password-brute-force-time/112984/' target='_blank' rel='noopener'>Source</a></li><li><strong>Markov/probabilistic</strong> — prioritizes statistically likely sequences. <a href='https://www.researchgate.net/publication/389902836' target='_blank' rel='noopener'>Source</a></li><li><strong>PCFG</strong> — models grammatical password structure. <a href='https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler' target='_blank' rel='noopener'>Source</a></li><li><strong>Combinator</strong> — concatenates words from two dictionaries. <a href='https://www.researchgate.net/publication/389902836' target='_blank' rel='noopener'>Source</a></li></ol><h3>6 hashing algorithms</h3><p>Hashcat on 12× RTX 4090: MD5 ~2,000 GH/s, SHA-1 ~610 GH/s, SHA-256 ~272 GH/s, NTLM ~2,000 GH/s, bcrypt ~71 kH/s, Argon2id ~800 H/s.</p><h3>Limitations</h3><p>State/cloud attackers could be 10–1,000× faster. Phishing, keyloggers, SIM swapping bypass password strength entirely.</p>",
      footer:
        'No password is stored. Only network request: first 5 chars of SHA-1 hash sent to <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">HIBP</a> (k-anonymity).',
      veryWeak: "Very weak",
      _weak: "Weak",
      moderate: "Moderate",
      _strong: "Strong",
      veryStrong: "Very strong",
      now: "Now",
      instant: "⚡ Instant",
      lessSec: "< 1 second",
      beyondDate: "Beyond any calculable date",
      beyondUniverse: "Longer than the age of the universe",
      na: "✓ N/A",
      via: "Via",
      allAttacks: "All attacks",
      unreachable:
        "<strong>Unreachable</strong>, even with the fastest attack.",
      instantVia: "Cracked <strong>instantly</strong>",
      evenSlowest: "Even the slowest attack is <strong>instant</strong>.",
      resistsBeyond: "Resists <strong>beyond the age of the universe</strong>.",
      bruteForce: "Brute force",
      bruteSectionLabel: "Detail: brute force by hashing algorithm",
      vCommon: "Common password",
      vKeyboard: "Keyboard pattern",
      vShort: "Too short (< 8)",
      vSequence: "Sequence detected",
      vRepeat: "Repetition",
      vDate: "Date detected",
      vStruct: "Predictable structure",
      v1Type: "Single char type",
      vDiversity: "Good diversity",
      vGoodLen: "Good length",
      vGreatLen: "Excellent length",
      aBrute: "Brute force",
      aDict: "Dictionary",
      aHybrid: "Hybrid (dict+rules)",
      aMask: "Mask (patterns)",
      aRainbow: "Rainbow table",
      aCred: "Credential stuffing",
      aSpray: "Password spraying",
      aMarkov: "Markov (probabilistic)",
      aPCFG: "PCFG (grammar)",
      aCombi: "Combinator (2 words)",
      nAllCombos: "All combinations",
      nInLeaks: "Found in known leaks!",
      nAbsentLeaks: "Not in known lists → ineffective",
      nDictMut: "Dict+mutation pattern detected",
      nStructUnrecog: "Unrecognizable structure → ineffective",
      nStructCaps: "Uppercase+lower+digits structure detected",
      nKBDetected: "Keyboard pattern detected",
      nSeqDetected: "Sequence detected",
      nNoPattern: "No predictable pattern → ineffective",
      nSalted: "Salted hash → tables useless",
      nTooLong: "Too long/complex for existing tables",
      nTablesAvail: "Precomputed tables available",
      nTablesBig: "Possible but large tables",
      nCredKnown: "Known credentials → instant access",
      nCredReuse: "Depends on reuse",
      nTop20: "Top 20 worldwide → priority target!",
      nNotTop: "Not in top common",
      nHuman95: "Human patterns → space reduced ~95%",
      nStatPrio: "Statistical sequence prioritization",
      nPCFGDetected: "Grammatical structure detected → targeted",
      nPCFGNone: "Non-grammatical → less effective",
      nPassphrase: "Passphrase detected → 2-dict concatenation",
      nNotPassphrase: "Not a passphrase → ineffective",
      yr: "year",
      yrs: "years",
      mo: "months",
      day: "day",
      days: "days",
      appDescription:
        "Time2Crack calculates locally how long it would take to crack your password, without ever transmitting your password.",
      inputPlaceholder: "Enter a password to test",
    },
    fr: {
      skip: "Aller au contenu principal",
      subtitle:
        "Évaluez la résistance de votre mot de passe face à 10 types d'attaques et 6 algorithmes de hachage. Aucun mot de passe n'est stocké ni transmis.",
      inputLabel: "Entrez un mot de passe à tester",
      placeholder: "Votre mot de passe…",
      show: "Afficher",
      hide: "Masquer",
      showAria: "Afficher le mot de passe",
      hideAria: "Masquer le mot de passe",
      reset: "Recommencer",
      hint: 'Calcul local + vérification <abbr title="Have I Been Pwned">HIBP</abbr> par k-anonymity.',
      hibpTitle: "Ce mot de passe a fuité !",
      hibpText:
        'Ce mot de passe apparaît <strong id="hibp-count">—</strong> fois dans des fuites répertoriées par <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noopener">Have I Been Pwned</a>. Il est fortement recommandé de ne pas l\'utiliser.',
      hibpPrivacy:
        'Vérification par <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">k-anonymity</a> : seuls les 5 premiers caractères du hash SHA-1 sont envoyés.',
      hibpSafe:
        "Ce mot de passe n'apparaît dans aucune fuite connue de Have I Been Pwned.",
      hibpError:
        "Impossible de vérifier auprès de Have I Been Pwned (problème réseau).",
      weak: "Faible",
      strong: "Fort",
      chars: "Caractères",
      charsetSize: "Taille du jeu",
      entropyBits: "Bits d'entropie",
      combos: "Combinaisons",
      status: "État",
      statusShort: "Trop court",
      statusGood: "Bonne longueur",
      statusExcellent: "Excellent",
      tableCaption:
        "Temps de craquage par type d'attaque et algorithme de hachage",
      advancedDetails: "Détails avancés",
      timeToCrackTitle: "Temps de craquage :",
      methodLink: "En savoir plus sur cette méthode",
      thAttack: "Type d'attaque",
      thAlgo: "Algorithme",
      thSpeed: "Vitesse (12 GPU)",
      thTime: "Temps estimé",
      methTitle: "Méthodologie et sources",
      methContent:
        "<h3>10 types d'attaques modélisés</h3><ol class='method-list'><li><strong>Force brute</strong> — recherche exhaustive de toutes les combinaisons. <a href='https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler' target='_blank' rel='noopener'>Référence</a></li><li><strong>Dictionnaire</strong> — test d'environ 14 milliards d'identifiants compromis connus. <a href='https://haveibeenpwned.com/' target='_blank' rel='noopener'>Référence</a></li><li><strong>Hybride</strong> — dictionnaire + règles de mutation hashcat (~1 000 variantes/mot). <a href='https://gist.github.com/Chick3nman/32e662a5bb63bc4f51b847bb422222fd' target='_blank' rel='noopener'>Référence</a></li><li><strong>Masque</strong> — cible les structures humaines prévisibles. <a href='https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler' target='_blank' rel='noopener'>Référence</a></li><li><strong>Table arc-en-ciel</strong> — recherche instantanée sur hash non salé. <a href='https://www.hivesystems.com/blog/are-your-passwords-in-the-green' target='_blank' rel='noopener'>Référence</a></li><li><strong>Credential stuffing</strong> — réutilisation de paires identifiant/mot de passe compromises. <a href='https://haveibeenpwned.com/' target='_blank' rel='noopener'>Référence</a></li><li><strong>Password spraying</strong> — mots de passe fréquents sur de nombreux comptes. <a href='https://securelist.com/password-brute-force-time/112984/' target='_blank' rel='noopener'>Référence</a></li><li><strong>Markov/probabiliste</strong> — priorise les séquences statistiquement probables. <a href='https://www.researchgate.net/publication/389902836' target='_blank' rel='noopener'>Référence</a></li><li><strong>PCFG</strong> — modélise la structure grammaticale des mots de passe. <a href='https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler' target='_blank' rel='noopener'>Référence</a></li><li><strong>Combinatoire</strong> — concatène des mots de deux dictionnaires. <a href='https://www.researchgate.net/publication/389902836' target='_blank' rel='noopener'>Référence</a></li></ol><h3>6 algorithmes de hachage</h3><p>Hashcat sur 12× RTX 4090 : MD5 ~2 000 GH/s, SHA-1 ~610 GH/s, SHA-256 ~272 GH/s, NTLM ~2 000 GH/s, bcrypt ~71 kH/s, Argon2id ~800 H/s.</p><h3>Limites</h3><p>Un attaquant étatique ou cloud pourrait être 10–1 000× plus rapide. Le phishing, les keyloggers et le SIM swapping contournent la force du mot de passe.</p>",
      footer:
        'Aucun mot de passe n\'est stocké. Seule requête réseau : les 5 premiers caractères du hash SHA-1 vers l\'API <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">HIBP</a> (k-anonymity).',
      veryWeak: "Très faible",
      _weak: "Faible",
      moderate: "Modéré",
      _strong: "Fort",
      veryStrong: "Très fort",
      now: "Maintenant",
      instant: "⚡ Instantané",
      lessSec: "< 1 seconde",
      beyondDate: "Au-delà de toute date",
      beyondUniverse: "Plus que l'âge de l'univers",
      na: "✓ Non applicable",
      via: "Via",
      allAttacks: "Toutes attaques",
      unreachable:
        "<strong>Inatteignable</strong>, même avec l'attaque la plus rapide.",
      instantVia: "Déchiffré <strong>instantanément</strong>",
      evenSlowest:
        "Même l'attaque la plus lente est <strong>instantanée</strong>.",
      resistsBeyond: "Résiste <strong>au-delà de l'âge de l'univers</strong>.",
      bruteForce: "Force brute",
      bruteSectionLabel: "Détail : force brute par algorithme de hachage",
      vCommon: "Mot de passe courant",
      vKeyboard: "Motif clavier",
      vShort: "Trop court (< 8)",
      vSequence: "Séquence détectée",
      vRepeat: "Répétition",
      vDate: "Date détectée",
      vStruct: "Structure prévisible",
      v1Type: "1 seul type de caractère",
      vDiversity: "Bonne diversité",
      vGoodLen: "Bonne longueur",
      vGreatLen: "Excellente longueur",
      aBrute: "Force brute",
      aDict: "Dictionnaire",
      aHybrid: "Hybride (dict+règles)",
      aMask: "Masque (motifs)",
      aRainbow: "Table arc-en-ciel",
      aCred: "Credential stuffing",
      aSpray: "Password spraying",
      aMarkov: "Markov (probabiliste)",
      aPCFG: "PCFG (grammaire)",
      aCombi: "Combinatoire (2 mots)",
      nAllCombos: "Toutes les combinaisons",
      nInLeaks: "Présent dans les fuites connues !",
      nAbsentLeaks: "Absent des listes → attaque inefficace",
      nDictMut: "Motif dict+mutations détecté",
      nStructUnrecog: "Structure non reconnaissable → inefficace",
      nStructCaps: "Structure Maj+min+chiffres détectée",
      nKBDetected: "Motif clavier détecté",
      nSeqDetected: "Séquence détectée",
      nNoPattern: "Aucun motif prévisible → inefficace",
      nSalted: "Hachage salé → tables inutiles",
      nTooLong: "Trop long/complexe pour les tables",
      nTablesAvail: "Tables précalculées disponibles",
      nTablesBig: "Tables possibles mais volumineuses",
      nCredKnown: "Credentials connues → accès immédiat",
      nCredReuse: "Dépend de la réutilisation",
      nTop20: "Top 20 mondial → ciblé en priorité !",
      nNotTop: "Hors top commun",
      nHuman95: "Motifs humains → espace réduit ~95 %",
      nStatPrio: "Priorisation statistique des séquences",
      nPCFGDetected: "Structure grammaticale détectée → ciblé",
      nPCFGNone: "Non grammaticale → peu efficace",
      nPassphrase: "Passphrase détectée → 2 dictionnaires",
      nNotPassphrase: "Pas une passphrase → inefficace",
      yr: "an",
      yrs: "ans",
      mo: "mois",
      day: "jour",
      days: "jours",
      appDescription:
        "Time2Crack calcule localement le temps de craquage de votre mot de passe, sans jamais transmettre votre mot de passe.",
      inputPlaceholder: "Entrez un mot de passe à tester",
    },
    es: {
      skip: "Ir al contenido principal",
      subtitle:
        "Prueba tu contraseña contra 10 tipos de ataque y 6 algoritmos de hash. Ninguna contraseña se almacena ni se transmite.",
      inputLabel: "Ingresa una contraseña para probar",
      placeholder: "Tu contraseña…",
      show: "Mostrar",
      hide: "Ocultar",
      showAria: "Mostrar contraseña",
      hideAria: "Ocultar contraseña",
      reset: "Reiniciar",
      hint: 'Cálculo local + verificación <abbr title="Have I Been Pwned">HIBP</abbr> por k-anonymity.',
      hibpTitle: "¡Esta contraseña ha sido filtrada!",
      hibpText:
        'Esta contraseña aparece <strong id="hibp-count">—</strong> veces en brechas de datos indexadas por <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noopener">Have I Been Pwned</a>. Se recomienda encarecidamente no utilizarla.',
      hibpPrivacy:
        'Verificado mediante <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">k-anonymity</a>: solo se envían los primeros 5 caracteres del hash SHA-1.',
      hibpSafe:
        "Esta contraseña no aparece en ninguna filtración conocida de Have I Been Pwned.",
      hibpError:
        "No se pudo verificar con Have I Been Pwned (problema de red).",
      weak: "Débil",
      strong: "Fuerte",
      chars: "Caracteres",
      charsetSize: "Tamaño del conjunto",
      entropyBits: "Bits de entropía",
      combos: "Combinaciones",
      status: "Estado",
      statusShort: "Demasiado corta",
      statusGood: "Buena longitud",
      statusExcellent: "Excelente",
      tableCaption: "Tiempo de craqueo por tipo de ataque y algoritmo de hash",
      advancedDetails: "Detalles avanzados",
      timeToCrackTitle: "Tiempo de crack:",
      methodLink: "Más información sobre este método",
      thAttack: "Tipo de ataque",
      thAlgo: "Algoritmo",
      thSpeed: "Velocidad (12 GPU)",
      thTime: "Tiempo estimado",
      methTitle: "Metodología y fuentes",
      methContent:
        "<h3>10 tipos de ataque modelados</h3><p><strong>1. Fuerza bruta</strong> — exhaustivo. <strong>2. Diccionario</strong> — ~14 mil millones de credenciales. <strong>3. Híbrido</strong> — dict + reglas. <strong>4. Máscara</strong> — estructuras predecibles. <strong>5. Tabla arcoíris</strong> — búsqueda sin sal. <strong>6. Credential stuffing</strong> — reutilización de filtraciones. <strong>7. Password spraying</strong> — contraseñas comunes. <strong>8. Markov</strong> — secuencias estadísticas. <strong>9. PCFG</strong> — modelado gramatical. <strong>10. Combinador</strong> — concatenación de 2 diccionarios.</p><h3>6 algoritmos de hash</h3><p>Hashcat en 12× RTX 4090: MD5 ~2000 GH/s, SHA-1 ~610 GH/s, SHA-256 ~272 GH/s, NTLM ~2000 GH/s, bcrypt ~71 kH/s, Argon2id ~800 H/s.</p><h3>Limitaciones</h3><p>Un atacante estatal o en la nube podría ser 10–1000× más rápido. El phishing, keyloggers y SIM swapping evitan la fortaleza de la contraseña.</p>",
      footer:
        'Ninguna contraseña se almacena. Única solicitud de red: los primeros 5 caracteres del hash SHA-1 se envían a la API <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">HIBP</a> (k-anonymity).',
      veryWeak: "Muy débil",
      _weak: "Débil",
      moderate: "Moderada",
      _strong: "Fuerte",
      veryStrong: "Muy fuerte",
      now: "Ahora",
      instant: "⚡ Instantáneo",
      lessSec: "< 1 segundo",
      beyondDate: "Más allá de cualquier fecha calculable",
      beyondUniverse: "Más que la edad del universo",
      na: "✓ No aplica",
      via: "Vía",
      allAttacks: "Todos los ataques",
      unreachable:
        "<strong>Inalcanzable</strong>, incluso con el ataque más rápido.",
      instantVia: "Descifrado <strong>instantáneamente</strong>",
      evenSlowest:
        "Incluso el ataque más lento es <strong>instantáneo</strong>.",
      resistsBeyond:
        "Resiste <strong>más allá de la edad del universo</strong>.",
      bruteForce: "Fuerza bruta",
      bruteSectionLabel: "Detalle: fuerza bruta por algoritmo de hash",
      vCommon: "Contraseña común",
      vKeyboard: "Patrón de teclado",
      vShort: "Demasiado corta (< 8)",
      vSequence: "Secuencia detectada",
      vRepeat: "Repetición",
      vDate: "Fecha detectada",
      vStruct: "Estructura predecible",
      v1Type: "Un solo tipo de carácter",
      vDiversity: "Buena diversidad",
      vGoodLen: "Buena longitud",
      vGreatLen: "Excelente longitud",
      aBrute: "Fuerza bruta",
      aDict: "Diccionario",
      aHybrid: "Híbrido (dict+reglas)",
      aMask: "Máscara (patrones)",
      aRainbow: "Tabla arcoíris",
      aCred: "Credential stuffing",
      aSpray: "Password spraying",
      aMarkov: "Markov (probabilístico)",
      aPCFG: "PCFG (gramática)",
      aCombi: "Combinador (2 palabras)",
      nAllCombos: "Todas las combinaciones",
      nInLeaks: "Encontrado en filtraciones conocidas",
      nAbsentLeaks: "No en listas conocidas → ataque ineficaz",
      nDictMut: "Patrón dict+mutaciones detectado",
      nStructUnrecog: "Estructura no reconocible → ineficaz",
      nStructCaps: "Estructura mayús+minús+dígitos detectada",
      nKBDetected: "Patrón de teclado detectado",
      nSeqDetected: "Secuencia detectada",
      nNoPattern: "Sin patrón predecible → ineficaz",
      nSalted: "Hash salteado → tablas inútiles",
      nTooLong: "Demasiado largo/complejo para tablas",
      nTablesAvail: "Tablas precalculadas disponibles",
      nTablesBig: "Tablas posibles pero grandes",
      nCredKnown: "Credenciales conocidas → acceso inmediato",
      nCredReuse: "Depende de la reutilización",
      nTop20: "Top 20 mundial → objetivo prioritario!",
      nNotTop: "Fuera de los comunes",
      nHuman95: "Patrones humanos → espacio reducido ~95%",
      nStatPrio: "Priorización estadística de secuencias",
      nPCFGDetected: "Estructura gramatical detectada → dirigida",
      nPCFGNone: "No gramatical → menos eficaz",
      nPassphrase: "Frase de paso detectada → 2 diccionarios",
      nNotPassphrase: "No es una frase de paso → ineficaz",
      yr: "año",
      yrs: "años",
      mo: "meses",
      day: "día",
      days: "días",
      appDescription:
        "Time2Crack calcula localmente cuánto tardarían en descifrar tu contraseña, sin transmitir nunca tu contraseña.",
      inputPlaceholder: "Ingresa una contraseña para probar",
    },
    pt: {
      skip: "Ir para o conteúdo principal",
      subtitle:
        "Teste sua senha contra 10 tipos de ataque e 6 algoritmos de hash. Nenhuma senha é armazenada ou transmitida.",
      inputLabel: "Digite uma senha para testar",
      placeholder: "Sua senha…",
      show: "Mostrar",
      hide: "Ocultar",
      showAria: "Mostrar senha",
      hideAria: "Ocultar senha",
      reset: "Reiniciar",
      hint: 'Cálculo local + verificação <abbr title="Have I Been Pwned">HIBP</abbr> por k-anonymity.',
      hibpTitle: "Esta senha foi vazada!",
      hibpText:
        'Esta senha aparece <strong id="hibp-count">—</strong> vezes em violações de dados indexadas por <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noopener">Have I Been Pwned</a>. É fortemente recomendável não utilizá-la.',
      hibpPrivacy:
        'Verificado via <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">k-anonymity</a>: apenas os primeiros 5 caracteres do hash SHA-1 são enviados.',
      hibpSafe:
        "Esta senha não aparece em nenhuma violação conhecida do Have I Been Pwned.",
      hibpError:
        "Não foi possível verificar com Have I Been Pwned (problema de rede).",
      weak: "Fraca",
      strong: "Forte",
      chars: "Caracteres",
      charsetSize: "Tamanho do conjunto",
      entropyBits: "Bits de entropia",
      combos: "Combinações",
      status: "Estado",
      statusShort: "Muito curta",
      statusGood: "Bom comprimento",
      statusExcellent: "Excelente",
      tableCaption: "Tempo de quebra por tipo de ataque e algoritmo de hash",
      advancedDetails: "Detalhes avançados",
      timeToCrackTitle: "Tempo de quebra:",
      methodLink: "Saiba mais sobre este método",
      thAttack: "Tipo de ataque",
      thAlgo: "Algoritmo",
      thSpeed: "Velocidade (12 GPU)",
      thTime: "Tempo estimado",
      methTitle: "Metodologia e fontes",
      methContent:
        "<h3>10 tipos de ataque modelados</h3><p><strong>1. Força bruta</strong> — exaustivo. <strong>2. Dicionário</strong> — ~14 bilhões de credenciais. <strong>3. Híbrido</strong> — dict + regras. <strong>4. Máscara</strong> — estruturas previsíveis. <strong>5. Tabela arco-íris</strong> — busca sem sal. <strong>6. Credential stuffing</strong> — reutilização de violações. <strong>7. Password spraying</strong> — senhas comuns. <strong>8. Markov</strong> — sequências estatísticas. <strong>9. PCFG</strong> — modelagem gramatical. <strong>10. Combinador</strong> — concatenação de 2 dicionários.</p><h3>6 algoritmos de hash</h3><p>Hashcat em 12× RTX 4090: MD5 ~2000 GH/s, SHA-1 ~610 GH/s, SHA-256 ~272 GH/s, NTLM ~2000 GH/s, bcrypt ~71 kH/s, Argon2id ~800 H/s.</p><h3>Limitações</h3><p>Um atacante estatal ou em nuvem poderia ser 10–1000× mais rápido. Phishing, keyloggers e SIM swapping contornam a força da senha.</p>",
      footer:
        'Nenhuma senha é armazenada. Única requisição de rede: os primeiros 5 caracteres do hash SHA-1 são enviados para a API <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">HIBP</a> (k-anonymity).',
      veryWeak: "Muito fraca",
      _weak: "Fraca",
      moderate: "Moderada",
      _strong: "Forte",
      veryStrong: "Muito forte",
      now: "Agora",
      instant: "⚡ Instantâneo",
      lessSec: "< 1 segundo",
      beyondDate: "Além de qualquer data calculável",
      beyondUniverse: "Mais que a idade do universo",
      na: "✓ Não aplicável",
      via: "Via",
      allAttacks: "Todos os ataques",
      unreachable:
        "<strong>Inatingível</strong>, mesmo com o ataque mais rápido.",
      instantVia: "Quebrado <strong>instantaneamente</strong>",
      evenSlowest: "Até o ataque mais lento é <strong>instantâneo</strong>.",
      resistsBeyond: "Resiste <strong>além da idade do universo</strong>.",
      bruteForce: "Força bruta",
      bruteSectionLabel: "Detalhe: força bruta por algoritmo de hash",
      vCommon: "Senha comum",
      vKeyboard: "Padrão de teclado",
      vShort: "Muito curta (< 8)",
      vSequence: "Sequência detectada",
      vRepeat: "Repetição",
      vDate: "Data detectada",
      vStruct: "Estrutura previsível",
      v1Type: "Um único tipo de caractere",
      vDiversity: "Boa diversidade",
      vGoodLen: "Bom comprimento",
      vGreatLen: "Excelente comprimento",
      aBrute: "Força bruta",
      aDict: "Dicionário",
      aHybrid: "Híbrido (dict+regras)",
      aMask: "Máscara (padrões)",
      aRainbow: "Tabela arco-íris",
      aCred: "Credential stuffing",
      aSpray: "Password spraying",
      aMarkov: "Markov (probabilístico)",
      aPCFG: "PCFG (gramática)",
      aCombi: "Combinador (2 palavras)",
      nAllCombos: "Todas as combinações",
      nInLeaks: "Encontrado em vazamentos conhecidos!",
      nAbsentLeaks: "Não em listas conhecidas → ataque ineficaz",
      nDictMut: "Padrão dict+mutações detectado",
      nStructUnrecog: "Estrutura não reconhecível → ineficaz",
      nStructCaps: "Estrutura maiúsc+minúsc+dígitos detectada",
      nKBDetected: "Padrão de teclado detectado",
      nSeqDetected: "Sequência detectada",
      nNoPattern: "Sem padrão previsível → ineficaz",
      nSalted: "Hash com sal → tabelas inúteis",
      nTooLong: "Muito longo/complexo para tabelas",
      nTablesAvail: "Tabelas pré-calculadas disponíveis",
      nTablesBig: "Tabelas possíveis mas grandes",
      nCredKnown: "Credenciais conhecidas → acesso imediato",
      nCredReuse: "Depende da reutilização",
      nTop20: "Top 20 mundial → alvo prioritário!",
      nNotTop: "Fora do comum",
      nHuman95: "Padrões humanos → espaço reduzido ~95%",
      nStatPrio: "Priorização estatística de sequências",
      nPCFGDetected: "Estrutura gramatical detectada → alvo",
      nPCFGNone: "Não gramatical → menos eficaz",
      nPassphrase: "Frase-passe detectada → 2 dicionários",
      nNotPassphrase: "Não é uma frase-passe → ineficaz",
      yr: "ano",
      yrs: "anos",
      mo: "meses",
      day: "dia",
      days: "dias",
      appDescription:
        "Time2Crack calcula localmente quanto tempo levaria para quebrar sua senha, sem nunca transmitir sua senha.",
      inputPlaceholder: "Digite uma senha para testar",
    },
    de: {
      skip: "Zum Inhalt springen",
      subtitle:
        "Testen Sie Ihr Passwort gegen 10 Angriffstypen und 6 Hash-Algorithmen. Kein Passwort wird gespeichert oder übertragen.",
      inputLabel: "Geben Sie ein Passwort zum Testen ein",
      placeholder: "Ihr Passwort…",
      show: "Anzeigen",
      hide: "Verbergen",
      showAria: "Passwort anzeigen",
      hideAria: "Passwort verbergen",
      reset: "Zurücksetzen",
      hint: 'Lokale Berechnung + <abbr title="Have I Been Pwned">HIBP</abbr> k-Anonymität-Prüfung.',
      hibpTitle: "Dieses Passwort wurde durchgesickert!",
      hibpText:
        'Dieses Passwort erscheint <strong id="hibp-count">—</strong> Mal in Datenverletzungen, die von <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noopener">Have I Been Pwned</a> indiziert wurden. Es wird dringend empfohlen, es nicht zu verwenden.',
      hibpPrivacy:
        'Verifiziert über <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">k-Anonymität</a>: Nur die ersten 5 Zeichen des SHA-1-Hash werden gesendet.',
      hibpSafe:
        "Dieses Passwort erscheint in keiner bekannten Verletzung von Have I Been Pwned.",
      hibpError:
        "Konnte nicht mit Have I Been Pwned überprüfen (Netzwerkproblem).",
      weak: "Schwach",
      strong: "Stark",
      chars: "Zeichen",
      charsetSize: "Zeichensatzgröße",
      entropyBits: "Entropiebits",
      combos: "Kombinationen",
      status: "Status",
      statusShort: "Zu kurz",
      statusGood: "Gute Länge",
      statusExcellent: "Ausgezeichnet",
      tableCaption: "Risszeit nach Angriffstyp und Hash-Algorithmus",
      advancedDetails: "Erweiterte Details",
      timeToCrackTitle: "Knackzeit:",
      methodLink: "Mehr über diese Methode",
      thAttack: "Angriffstyp",
      thAlgo: "Algorithmus",
      thSpeed: "Geschwindigkeit (12 GPU)",
      thTime: "Geschätzte Zeit",
      methTitle: "Methodik und Quellen",
      methContent:
        "<h3>10 modellierte Angriffstypen</h3><p><strong>1. Brute Force</strong> — erschöpfend. <strong>2. Wörterbuch</strong> — ~14 Milliarden Anmeldedaten. <strong>3. Hybrid</strong> — dict + Regeln. <strong>4. Maske</strong> — vorhersehbare Strukturen. <strong>5. Regenbogentabelle</strong> — unsalted Hash-Lookup. <strong>6. Credential Stuffing</strong> — Wiederverwendung von Verletzungen. <strong>7. Password Spraying</strong> — häufige Passwörter. <strong>8. Markov</strong> — statistische Sequenzen. <strong>9. PCFG</strong> — grammatikalische Modellierung. <strong>10. Kombiniert</strong> — Verkettung von 2 Wörterbüchern.</p><h3>6 Hash-Algorithmen</h3><p>Hashcat auf 12× RTX 4090: MD5 ~2000 GH/s, SHA-1 ~610 GH/s, SHA-256 ~272 GH/s, NTLM ~2000 GH/s, bcrypt ~71 kH/s, Argon2id ~800 H/s.</p><h3>Einschränkungen</h3><p>Ein staatlicher oder Cloud-Angreifer könnte 10–1000× schneller sein. Phishing, Keylogger und SIM-Swapping umgehen die Passwort-Stärke.</p>",
      footer:
        'Kein Passwort wird gespeichert. Einzige Netzwerkanfrage: Die ersten 5 Zeichen des SHA-1-Hash werden an die API <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">HIBP</a> (k-Anonymität) gesendet.',
      veryWeak: "Sehr schwach",
      _weak: "Schwach",
      moderate: "Moderat",
      _strong: "Stark",
      veryStrong: "Sehr stark",
      now: "Jetzt",
      instant: "⚡ Sofort",
      lessSec: "< 1 Sekunde",
      beyondDate: "Jenseits jedes berechenbaren Datums",
      beyondUniverse: "Länger als das Alter des Universums",
      na: "✓ Nicht zutreffend",
      via: "Über",
      allAttacks: "Alle Angriffe",
      unreachable:
        "<strong>Unerreichbar</strong>, selbst mit dem schnellsten Angriff.",
      instantVia: "Sofort <strong>geknackt</strong>",
      evenSlowest: "Auch der langsamste Angriff ist <strong>sofort</strong>.",
      resistsBeyond:
        "Widersetzt sich <strong>über das Alter des Universums hinaus</strong>.",
      bruteForce: "Brute Force",
      bruteSectionLabel: "Detail: Brute Force nach Hash-Algorithmus",
      vCommon: "Häufiges Passwort",
      vKeyboard: "Tastatormuster",
      vShort: "Zu kurz (< 8)",
      vSequence: "Sequenz erkannt",
      vRepeat: "Wiederholung",
      vDate: "Datum erkannt",
      vStruct: "Vorhersehbare Struktur",
      v1Type: "Nur ein Zeichentyp",
      vDiversity: "Gute Vielfalt",
      vGoodLen: "Gute Länge",
      vGreatLen: "Ausgezeichnete Länge",
      aBrute: "Brute Force",
      aDict: "Wörterbuch",
      aHybrid: "Hybrid (dict+Regeln)",
      aMask: "Maske (Muster)",
      aRainbow: "Regenbogentabelle",
      aCred: "Credential Stuffing",
      aSpray: "Password Spraying",
      aMarkov: "Markov (probabilistisch)",
      aPCFG: "PCFG (Grammatik)",
      aCombi: "Kombinator (2 Wörter)",
      nAllCombos: "Alle Kombinationen",
      nInLeaks: "In bekannten Lecks gefunden!",
      nAbsentLeaks: "Nicht in bekannten Listen → ineffektiver Angriff",
      nDictMut: "Dict+Mutationsmuster erkannt",
      nStructUnrecog: "Nicht erkannte Struktur → ineffektiv",
      nStructCaps: "Struktur Großbuchstaben+Kleinbuchstaben+Ziffern erkannt",
      nKBDetected: "Tastatormuster erkannt",
      nSeqDetected: "Sequenz erkannt",
      nNoPattern: "Kein vorhersehbares Muster → ineffektiv",
      nSalted: "Salted Hash → Tabellen nutzlos",
      nTooLong: "Zu lang/komplex für Tabellen",
      nTablesAvail: "Vorgenerierte Tabellen verfügbar",
      nTablesBig: "Tabellen möglich aber groß",
      nCredKnown: "Bekannte Anmeldedaten → sofortiger Zugriff",
      nCredReuse: "Abhängig von Wiederverwendung",
      nTop20: "Top 20 weltweit → Zielpriorität!",
      nNotTop: "Nicht häufig",
      nHuman95: "Menschliche Muster → Raum um 95% reduziert",
      nStatPrio: "Statistische Sequenzpriorisierung",
      nPCFGDetected: "Grammatikalische Struktur erkannt → zielgerichtet",
      nPCFGNone: "Nicht grammatikalisch → weniger effektiv",
      nPassphrase: "Passphrase erkannt → 2 Wörterbücher",
      nNotPassphrase: "Keine Passphrase → ineffektiv",
      yr: "Jahr",
      yrs: "Jahre",
      mo: "Monate",
      day: "Tag",
      days: "Tage",
      appDescription:
        "Time2Crack berechnet lokal, wie lange es dauern würde, Ihr Passwort zu knacken, ohne Ihr Passwort jemals zu übertragen.",
      inputPlaceholder: "Geben Sie ein Passwort ein zum Testen",
    },
    tr: {
      skip: "Ana içeriğe atla",
      subtitle:
        "Şifrenizi 10 saldırı türüne ve 6 karma algoritmasına karşı test edin. Şifre saklanmaz veya iletilmez.",
      inputLabel: "Test etmek için bir şifre girin",
      placeholder: "Şifreniz…",
      show: "Göster",
      hide: "Gizle",
      showAria: "Şifre göster",
      hideAria: "Şifre gizle",
      reset: "Sıfırla",
      hint: 'Yerel hesaplama + <abbr title="Have I Been Pwned">HIBP</abbr> k-anonimlik kontrolü.',
      hibpTitle: "Bu şifre sızdırılmıştır!",
      hibpText:
        'Bu şifre <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noopener">Have I Been Pwned</a> tarafından indekslenen veri ihlallerinde <strong id="hibp-count">—</strong> kez görülüyor. Kullanılmaması kesinlikle önerilir.',
      hibpPrivacy:
        '<a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">k-anonimlik</a> aracılığıyla doğrulandı: yalnızca SHA-1 karmasının ilk 5 karakteri gönderilir.',
      hibpSafe:
        "Bu şifre Have I Been Pwned'in hiçbir bilinen ihlaline ait değildir.",
      hibpError: "Have I Been Pwned ile doğrulanamadı (ağ sorunu).",
      weak: "Zayıf",
      strong: "Güçlü",
      chars: "Karakterler",
      charsetSize: "Karakter seti boyutu",
      entropyBits: "Entropi bitleri",
      combos: "Kombinasyonlar",
      status: "Durum",
      statusShort: "Çok kısa",
      statusGood: "İyi uzunluk",
      statusExcellent: "Mükemmel",
      tableCaption: "Saldırı türü ve karma algoritmasına göre kırma süresi",
      advancedDetails: "Gelişmiş ayrıntılar",
      timeToCrackTitle: "Kırılma süresi:",
      methodLink: "Bu yöntem hakkında daha fazla",
      thAttack: "Saldırı türü",
      thAlgo: "Algoritma",
      thSpeed: "Hız (12 GPU)",
      thTime: "Tahmini zaman",
      methTitle: "Metodoloji ve kaynaklar",
      methContent:
        "<h3>Modellenen 10 saldırı türü</h3><p><strong>1. Brute Force</strong> — kapsamlı. <strong>2. Sözlük</strong> — ~14 milyar kimlik bilgisi. <strong>3. Hibrit</strong> — dict + kurallar. <strong>4. Maske</strong> — öngörülebilir yapılar. <strong>5. Gökkuşağı tablosu</strong> — tuzlanmamış karma araması. <strong>6. Kimlik Bilgisi Doldurma</strong> — ihlal yeniden kullanımı. <strong>7. Şifre Sprayı</strong> — ortak şifreler. <strong>8. Markov</strong> — istatistiksel diziler. <strong>9. PCFG</strong> — dilbilimsel modelleme. <strong>10. Kombinator</strong> — 2 sözlüğün bitiştirmesi.</p><h3>6 karma algoritması</h3><p>12× RTX 4090 üzerinde Hashcat: MD5 ~2000 GH/s, SHA-1 ~610 GH/s, SHA-256 ~272 GH/s, NTLM ~2000 GH/s, bcrypt ~71 kH/s, Argon2id ~800 H/s.</p><h3>Sınırlamalar</h3><p>Devlet düzeyinde veya bulut saldırganı 10–1000× daha hızlı olabilir. Kimlik avı, tuş kaydediciler ve SIM değiştirme şifre gücünü atlatır.</p>",
      footer:
        'Şifre saklanmaz. Tek ağ isteği: SHA-1 karmasının ilk 5 karakteri <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">HIBP</a> API\'ye (k-anonimlik) gönderilir.',
      veryWeak: "Çok zayıf",
      _weak: "Zayıf",
      moderate: "Orta",
      _strong: "Güçlü",
      veryStrong: "Çok güçlü",
      now: "Şimdi",
      instant: "⚡ Anında",
      lessSec: "< 1 saniye",
      beyondDate: "Herhangi bir hesaplanabilir tarih dışında",
      beyondUniverse: "Evrenin yaşından daha fazla",
      na: "✓ Uygulanmaz",
      via: "Aracılığıyla",
      allAttacks: "Tüm saldırılar",
      unreachable: "<strong>Erişilemez</strong>, en hızlı saldırı ile bile.",
      instantVia: "<strong>Anında</strong> kırıldı",
      evenSlowest: "En yavaş saldırı bile <strong>anında</strong>.",
      resistsBeyond: "Evrenin yaşından <strong>ötesine direnir</strong>.",
      bruteForce: "Brute Force",
      bruteSectionLabel: "Detay: Karma algoritmasına göre brute force",
      vCommon: "Yaygın şifre",
      vKeyboard: "Klavye deseni",
      vShort: "Çok kısa (< 8)",
      vSequence: "Dizi algılandı",
      vRepeat: "Tekrar",
      vDate: "Tarih algılandı",
      vStruct: "Öngörülebilir yapı",
      v1Type: "Tek karakter türü",
      vDiversity: "İyi çeşitlilik",
      vGoodLen: "İyi uzunluk",
      vGreatLen: "Mükemmel uzunluk",
      aBrute: "Brute Force",
      aDict: "Sözlük",
      aHybrid: "Hibrit (dict+kurallar)",
      aMask: "Maske (desenler)",
      aRainbow: "Gökkuşağı tablosu",
      aCred: "Kimlik Bilgisi Doldurma",
      aSpray: "Şifre Sprayı",
      aMarkov: "Markov (olasılıksal)",
      aPCFG: "PCFG (dilbilim)",
      aCombi: "Kombinator (2 kelime)",
      nAllCombos: "Tüm kombinasyonlar",
      nInLeaks: "Bilinen sızıntılarda bulundu!",
      nAbsentLeaks: "Bilinen listelerde yok → etkisiz saldırı",
      nDictMut: "Dict+mutasyon deseni algılandı",
      nStructUnrecog: "Tanınmayan yapı → etkisiz",
      nStructCaps: "Büyük harf+küçük harf+rakam yapısı algılandı",
      nKBDetected: "Klavye deseni algılandı",
      nSeqDetected: "Dizi algılandı",
      nNoPattern: "Öngörülebilir desen yok → etkisiz",
      nSalted: "Tuzlanmış karma → tablolar işe yaramaz",
      nTooLong: "Tablolar için çok uzun/karmaşık",
      nTablesAvail: "Önceden hesaplanmış tablolar mevcut",
      nTablesBig: "Tablolar mümkün ama büyük",
      nCredKnown: "Bilinen kimlik bilgileri → anında erişim",
      nCredReuse: "Yeniden kullanıma bağlı",
      nTop20: "Dünya top 20 → hedef önceliği!",
      nNotTop: "Yaygın değil",
      nHuman95: "İnsan desenleri → alan %95 azaldı",
      nStatPrio: "İstatistiksel dizi önceliklendirmesi",
      nPCFGDetected: "Dilbilimsel yapı algılandı → hedefli",
      nPCFGNone: "Dilbilimsel olmayan → daha az etkili",
      nPassphrase: "İfade algılandı → 2 sözlük",
      nNotPassphrase: "İfade değil → etkisiz",
      yr: "yıl",
      yrs: "yıl",
      mo: "ay",
      day: "gün",
      days: "gün",
      appDescription:
        "Time2Crack, şifrenizin kırılmasının ne kadar süreceğini yerel olarak hesaplar ve şifrenizi asla iletmez.",
      inputPlaceholder: "Test etmek için bir şifre girin",
    },
    it: {
      skip: "Vai al contenuto principale",
      subtitle:
        "Testa la tua password contro 10 tipi di attacco e 6 algoritmi di hash. Nessuna password viene archiviata o trasmessa.",
      inputLabel: "Inserisci una password da testare",
      placeholder: "La tua password…",
      show: "Mostra",
      hide: "Nascondi",
      showAria: "Mostra password",
      hideAria: "Nascondi password",
      reset: "Ripristina",
      hint: 'Calcolo locale + verifica <abbr title="Have I Been Pwned">HIBP</abbr> k-anonimato.',
      hibpTitle: "Questa password è stata divulgata!",
      hibpText:
        'Questa password appare <strong id="hibp-count">—</strong> volte in violazioni di dati indicizzate da <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noopener">Have I Been Pwned</a>. Si consiglia vivamente di non utilizzarla.',
      hibpPrivacy:
        'Verificato tramite <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">k-anonimato</a>: solo i primi 5 caratteri dell\'hash SHA-1 vengono inviati.',
      hibpSafe:
        "Questa password non appare in alcuna violazione nota di Have I Been Pwned.",
      hibpError:
        "Impossibile verificare con Have I Been Pwned (problema di rete).",
      weak: "Debole",
      strong: "Forte",
      chars: "Caratteri",
      charsetSize: "Dimensione set",
      entropyBits: "Bit di entropia",
      combos: "Combinazioni",
      status: "Stato",
      statusShort: "Troppo corta",
      statusGood: "Buona lunghezza",
      statusExcellent: "Eccellente",
      tableCaption: "Tempo di crack per tipo di attacco e algoritmo di hash",
      advancedDetails: "Dettagli avanzati",
      timeToCrackTitle: "Tempo di crack:",
      methodLink: "Scopri di più su questo metodo",
      thAttack: "Tipo di attacco",
      thAlgo: "Algoritmo",
      thSpeed: "Velocità (12 GPU)",
      thTime: "Tempo stimato",
      methTitle: "Metodologia e fonti",
      methContent:
        "<h3>10 tipi di attacco modellati</h3><p><strong>1. Brute force</strong> — esaustivo. <strong>2. Dizionario</strong> — ~14 miliardi di credenziali. <strong>3. Ibrido</strong> — dict + regole. <strong>4. Maschera</strong> — strutture prevedibili. <strong>5. Tavola arcobaleno</strong> — ricerca hash senza salt. <strong>6. Credential stuffing</strong> — riutilizzo di violazioni. <strong>7. Password spraying</strong> — password comuni. <strong>8. Markov</strong> — sequenze statistiche. <strong>9. PCFG</strong> — modellazione grammaticale. <strong>10. Combinatore</strong> — concatenazione di 2 dizionari.</p><h3>6 algoritmi di hash</h3><p>Hashcat su 12× RTX 4090: MD5 ~2000 GH/s, SHA-1 ~610 GH/s, SHA-256 ~272 GH/s, NTLM ~2000 GH/s, bcrypt ~71 kH/s, Argon2id ~800 H/s.</p><h3>Limitazioni</h3><p>Un attaccante statale o cloud potrebbe essere 10–1000× più veloce. Phishing, keylogger e SIM swapping aggirano la forza della password.</p>",
      footer:
        'Nessuna password viene archiviata. Unica richiesta di rete: i primi 5 caratteri dell\'hash SHA-1 vengono inviati all\'API <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">HIBP</a> (k-anonimato).',
      veryWeak: "Molto debole",
      _weak: "Debole",
      moderate: "Moderata",
      _strong: "Forte",
      veryStrong: "Molto forte",
      now: "Adesso",
      instant: "⚡ Istantaneo",
      lessSec: "< 1 secondo",
      beyondDate: "Al di là di qualsiasi data calcolabile",
      beyondUniverse: "Più dell'età dell'universo",
      na: "✓ Non applicabile",
      via: "Via",
      allAttacks: "Tutti gli attacchi",
      unreachable:
        "<strong>Irraggiungibile</strong>, anche con l'attacco più veloce.",
      instantVia: "Craccato <strong>istantaneamente</strong>",
      evenSlowest: "Anche l'attacco più lento è <strong>istantaneo</strong>.",
      resistsBeyond: "Resiste <strong>oltre l'età dell'universo</strong>.",
      bruteForce: "Brute force",
      bruteSectionLabel: "Dettaglio: brute force per algoritmo di hash",
      vCommon: "Password comune",
      vKeyboard: "Motivo tastiera",
      vShort: "Troppo corta (< 8)",
      vSequence: "Sequenza rilevata",
      vRepeat: "Ripetizione",
      vDate: "Data rilevata",
      vStruct: "Struttura prevedibile",
      v1Type: "Un solo tipo di carattere",
      vDiversity: "Buona diversità",
      vGoodLen: "Buona lunghezza",
      vGreatLen: "Lunghezza eccellente",
      aBrute: "Brute force",
      aDict: "Dizionario",
      aHybrid: "Ibrido (dict+regole)",
      aMask: "Maschera (motivi)",
      aRainbow: "Tavola arcobaleno",
      aCred: "Credential stuffing",
      aSpray: "Password spraying",
      aMarkov: "Markov (probabilistico)",
      aPCFG: "PCFG (grammatica)",
      aCombi: "Combinatore (2 parole)",
      nAllCombos: "Tutte le combinazioni",
      nInLeaks: "Trovato in violazioni note!",
      nAbsentLeaks: "Non in liste note → attacco inefficace",
      nDictMut: "Motivo dict+mutazioni rilevato",
      nStructUnrecog: "Struttura non riconosciuta → inefficace",
      nStructCaps: "Struttura Maius+minus+cifre rilevata",
      nKBDetected: "Motivo tastiera rilevato",
      nSeqDetected: "Sequenza rilevata",
      nNoPattern: "Nessun motivo prevedibile → inefficace",
      nSalted: "Hash salato → tabelle inutili",
      nTooLong: "Troppo lungo/complesso per le tabelle",
      nTablesAvail: "Tabelle precalcolate disponibili",
      nTablesBig: "Tabelle possibili ma grandi",
      nCredKnown: "Credenziali note → accesso immediato",
      nCredReuse: "Dipende dal riutilizzo",
      nTop20: "Top 20 mondiale → bersaglio prioritario!",
      nNotTop: "Non comune",
      nHuman95: "Motivi umani → spazio ridotto ~95%",
      nStatPrio: "Prioritizzazione sequenza statistica",
      nPCFGDetected: "Struttura grammaticale rilevata → mirata",
      nPCFGNone: "Non grammaticale → meno efficace",
      nPassphrase: "Passphrase rilevata → 2 dizionari",
      nNotPassphrase: "Non una passphrase → inefficace",
      yr: "anno",
      yrs: "anni",
      mo: "mesi",
      day: "giorno",
      days: "giorni",
      appDescription:
        "Time2Crack calcola localmente quanto tempo servirebbe per violare la tua password, senza trasmettere mai la tua password.",
      inputPlaceholder: "Inserisci una password da testare",
    },
    pl: {
      skip: "Przejdź do treści",
      subtitle:
        "Przetestuj swoje hasło na 10 typów ataków i 6 algorytmów hashowania. Żadne hasło nie jest przechowywane ani przesyłane.",
      inputLabel: "Wpisz hasło do przetestowania",
      placeholder: "Twoje hasło…",
      show: "Pokaż",
      hide: "Ukryj",
      showAria: "Pokaż hasło",
      hideAria: "Ukryj hasło",
      reset: "Resetuj",
      hint: 'Obliczenie lokalne + weryfikacja <abbr title="Have I Been Pwned">HIBP</abbr> k-anonimowość.',
      hibpTitle: "To hasło zostało ujawnione!",
      hibpText:
        'To hasło pojawia się <strong id="hibp-count">—</strong> razy w naruszeniach danych indeksowanych przez <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noopener">Have I Been Pwned</a>. Zdecydowanie zaleca się go nie używać.',
      hibpPrivacy:
        'Zweryfikowany za pośrednictwem <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">k-anonimowości</a>: przesyłane są tylko pierwsze 5 znaków skrótu SHA-1.',
      hibpSafe:
        "To hasło nie pojawia się w żadnym znanym naruszeniu Have I Been Pwned.",
      hibpError:
        "Nie można było zweryfikować w Have I Been Pwned (problem z siecią).",
      weak: "Słabe",
      strong: "Silne",
      chars: "Znaki",
      charsetSize: "Rozmiar zestawu",
      entropyBits: "Bity entropii",
      combos: "Kombinacje",
      status: "Status",
      statusShort: "Za krótkie",
      statusGood: "Dobra długość",
      statusExcellent: "Doskonałe",
      tableCaption: "Czas łamania według typu ataku i algorytmu hashowania",
      advancedDetails: "Szczegóły zaawansowane",
      timeToCrackTitle: "Czas złamania:",
      methodLink: "Dowiedz się więcej o tej metodzie",
      thAttack: "Typ ataku",
      thAlgo: "Algorytm",
      thSpeed: "Prędkość (12 GPU)",
      thTime: "Szacunkowy czas",
      methTitle: "Metodologia i źródła",
      methContent:
        "<h3>10 modelowanych typów ataków</h3><p><strong>1. Brute force</strong> — wyczerpujący. <strong>2. Słownik</strong> — ~14 miliardów poświadczeń. <strong>3. Hybrydowy</strong> — dict + reguły. <strong>4. Maska</strong> — przewidywalne struktury. <strong>5. Tablica tęczy</strong> — wyszukiwanie bez soli. <strong>6. Credential stuffing</strong> — ponowne wykorzystanie naruszeń. <strong>7. Password spraying</strong> — typowe hasła. <strong>8. Markov</strong> — sekwencje statystyczne. <strong>9. PCFG</strong> — modelowanie gramatyczne. <strong>10. Kombinator</strong> — konkatenacja 2 słowników.</p><h3>6 algorytmów hashowania</h3><p>Hashcat na 12× RTX 4090: MD5 ~2000 GH/s, SHA-1 ~610 GH/s, SHA-256 ~272 GH/s, NTLM ~2000 GH/s, bcrypt ~71 kH/s, Argon2id ~800 H/s.</p><h3>Ograniczenia</h3><p>Atakujący na poziomie państwa lub chmury może być 10–1000× szybszy. Phishing, keylogery i SIM swapping obchodzą siłę hasła.</p>",
      footer:
        'Żadne hasło nie jest przechowywane. Jedyne żądanie sieciowe: pierwsze 5 znaków skrótu SHA-1 jest wysyłane do API <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">HIBP</a> (k-anonimowość).',
      veryWeak: "Bardzo słabe",
      _weak: "Słabe",
      moderate: "Umiarkowane",
      _strong: "Silne",
      veryStrong: "Bardzo silne",
      now: "Teraz",
      instant: "⚡ Natychmiast",
      lessSec: "< 1 sekunda",
      beyondDate: "Poza dowolną obliczalną datą",
      beyondUniverse: "Dłużej niż wiek wszechświata",
      na: "✓ Nie dotyczy",
      via: "Via",
      allAttacks: "Wszystkie ataki",
      unreachable:
        "<strong>Nieosiągalne</strong>, nawet przy najszybszym ataku.",
      instantVia: "Złamane <strong>natychmiast</strong>",
      evenSlowest:
        "Nawet najwolniejszy atak jest <strong>natychmiastowy</strong>.",
      resistsBeyond: "Opiera się <strong>poza wiekiem wszechświata</strong>.",
      bruteForce: "Brute force",
      bruteSectionLabel: "Szczegół: brute force według algorytmu hashowania",
      vCommon: "Popularne hasło",
      vKeyboard: "Wzór klawiatury",
      vShort: "Za krótkie (< 8)",
      vSequence: "Sekwencja wykryta",
      vRepeat: "Powtórzenie",
      vDate: "Data wykryta",
      vStruct: "Przewidywalna struktura",
      v1Type: "Tylko jeden typ znaku",
      vDiversity: "Dobra różnorodność",
      vGoodLen: "Dobra długość",
      vGreatLen: "Doskonała długość",
      aBrute: "Brute force",
      aDict: "Słownik",
      aHybrid: "Hybrydowy (dict+reguły)",
      aMask: "Maska (wzory)",
      aRainbow: "Tablica tęczy",
      aCred: "Credential stuffing",
      aSpray: "Password spraying",
      aMarkov: "Markov (probabilistyczny)",
      aPCFG: "PCFG (gramatyka)",
      aCombi: "Kombinator (2 słowa)",
      nAllCombos: "Wszystkie kombinacje",
      nInLeaks: "Znalezione w znanych naruszeniach!",
      nAbsentLeaks: "Nie na znanych listach → atak nieskuteczny",
      nDictMut: "Wykryte dict+mutacje",
      nStructUnrecog: "Nierozpoznana struktura → nieskuteczna",
      nStructCaps: "Wykryta struktura Wielkie+małe+cyfry",
      nKBDetected: "Wzór klawiatury wykryty",
      nSeqDetected: "Sekwencja wykryta",
      nNoPattern: "Brak przewidywalnego wzoru → nieskuteczna",
      nSalted: "Haszowanie solone → tabele bezużyteczne",
      nTooLong: "Za długie/skomplikowane dla tabel",
      nTablesAvail: "Dostępne wstępnie obliczone tabele",
      nTablesBig: "Tabele możliwe ale duże",
      nCredKnown: "Znane poświadczenia → natychmiastowy dostęp",
      nCredReuse: "Zależy od ponownego wykorzystania",
      nTop20: "Top 20 na świecie → cel priorytetowy!",
      nNotTop: "Nie popularne",
      nHuman95: "Wzory ludzkie → przestrzeń zmniejszona ~95%",
      nStatPrio: "Priorytet sekwencji statystycznej",
      nPCFGDetected: "Struktura gramatyczna wykryta → celowana",
      nPCFGNone: "Niegramatyczna → mniej efektywna",
      nPassphrase: "Fraza hasła wykryta → 2 słowniki",
      nNotPassphrase: "Nie fraza hasła → nieskuteczna",
      yr: "rok",
      yrs: "lata",
      mo: "miesiące",
      day: "dzień",
      days: "dni",
      appDescription:
        "Time2Crack oblicza lokalnie, ile czasu zajęłoby złamanie Twojego hasła, nigdy nie przesyłając Twojego hasła.",
      inputPlaceholder: "Wpisz hasło do przetestowania",
    },
    nl: {
      skip: "Ga naar hoofdinhoud",
      subtitle:
        "Test je wachtwoord tegen 10 aangrifstypen en 6 hashalgoritmes. Geen wachtwoord wordt opgeslagen of verzonden.",
      inputLabel: "Voer een wachtwoord in om te testen",
      placeholder: "Jouw wachtwoord…",
      show: "Weergeven",
      hide: "Verbergen",
      showAria: "Wachtwoord weergeven",
      hideAria: "Wachtwoord verbergen",
      reset: "Herstellen",
      hint: 'Lokale berekening + <abbr title="Have I Been Pwned">HIBP</abbr> k-anonimiteit controle.',
      hibpTitle: "Dit wachtwoord is gelekt!",
      hibpText:
        'Dit wachtwoord komt <strong id="hibp-count">—</strong> keer voor in gegevensinbreuken geïndexeerd door <a href="https://haveibeenpwned.com/Passwords" target="_blank" rel="noopener">Have I Been Pwned</a>. Het wordt sterk aanbevolen dit niet te gebruiken.',
      hibpPrivacy:
        'Geverifieerd via <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">k-anonimiteit</a>: alleen de eerste 5 tekens van de SHA-1 hash worden verzonden.',
      hibpSafe:
        "Dit wachtwoord komt niet voor in enige bekende inbreuk van Have I Been Pwned.",
      hibpError: "Kon niet verifiëren met Have I Been Pwned (netwerkprobleem).",
      weak: "Zwak",
      strong: "Sterk",
      chars: "Tekens",
      charsetSize: "Tekensetgrootte",
      entropyBits: "Entropiebits",
      combos: "Combinaties",
      status: "Status",
      statusShort: "Te kort",
      statusGood: "Goede lengte",
      statusExcellent: "Uitstekend",
      tableCaption: "Kraaktijd naar aangrifstype en hashalgoritme",
      advancedDetails: "Geavanceerde details",
      timeToCrackTitle: "Kraaktijd:",
      methodLink: "Lees meer over deze methode",
      thAttack: "Aangrifstype",
      thAlgo: "Algoritme",
      thSpeed: "Snelheid (12 GPU)",
      thTime: "Geschatte tijd",
      methTitle: "Methodologie en bronnen",
      methContent:
        "<h3>10 gemodelleerde aangrifstypen</h3><p><strong>1. Brute force</strong> — uitputtend. <strong>2. Woordenboek</strong> — ~14 miljard referenties. <strong>3. Hybrid</strong> — dict + regels. <strong>4. Masker</strong> — voorspelbare structuren. <strong>5. Regenboogtabel</strong> — ongezoute hashopzoeking. <strong>6. Credential stuffing</strong> — hergebruik van inbreuken. <strong>7. Password spraying</strong> — veelgebruikte wachtwoorden. <strong>8. Markov</strong> — statistische reeksen. <strong>9. PCFG</strong> — grammaticale modellering. <strong>10. Combinator</strong> — aaneenschakeling van 2 woordenboeken.</p><h3>6 hashalgoritmes</h3><p>Hashcat op 12× RTX 4090: MD5 ~2000 GH/s, SHA-1 ~610 GH/s, SHA-256 ~272 GH/s, NTLM ~2000 GH/s, bcrypt ~71 kH/s, Argon2id ~800 H/s.</p><h3>Beperkingen</h3><p>Een staatsaanvaller of cloud-aanvaller kan 10–1000× sneller zijn. Phishing, keyloggers en SIM-wisseling omzeilen wachtwoordsterkte.</p>",
      footer:
        'Geen wachtwoord wordt opgeslagen. Enig netwerkverzoek: de eerste 5 tekens van de SHA-1 hash worden verzonden naar de <a href="https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange" target="_blank" rel="noopener">HIBP</a> API (k-anonimiteit).',
      veryWeak: "Erg zwak",
      _weak: "Zwak",
      moderate: "Matig",
      _strong: "Sterk",
      veryStrong: "Erg sterk",
      now: "Nu",
      instant: "⚡ Instant",
      lessSec: "< 1 seconde",
      beyondDate: "Voorbij elke berekenbare datum",
      beyondUniverse: "Langer dan het universum oud is",
      na: "✓ Niet van toepassing",
      via: "Via",
      allAttacks: "Alle aanvallen",
      unreachable:
        "<strong>Onbereikbaar</strong>, zelfs met de snelste aanval.",
      instantVia: "<strong>Instant</strong> gekraakt",
      evenSlowest: "Zelfs de langzaamste aanval is <strong>instant</strong>.",
      resistsBeyond: "Bestand <strong>voorbij het universum</strong>.",
      bruteForce: "Brute force",
      bruteSectionLabel: "Detail: brute force per hashalgoritme",
      vCommon: "Veelgebruikt wachtwoord",
      vKeyboard: "Toetsenbordpatroon",
      vShort: "Te kort (< 8)",
      vSequence: "Reeks gedetecteerd",
      vRepeat: "Herhaling",
      vDate: "Datum gedetecteerd",
      vStruct: "Voorspelbare structuur",
      v1Type: "Slechts één tekentype",
      vDiversity: "Goede diversiteit",
      vGoodLen: "Goede lengte",
      vGreatLen: "Uitstekende lengte",
      aBrute: "Brute force",
      aDict: "Woordenboek",
      aHybrid: "Hybrid (dict+regels)",
      aMask: "Masker (patronen)",
      aRainbow: "Regenboogtabel",
      aCred: "Credential stuffing",
      aSpray: "Password spraying",
      aMarkov: "Markov (probabilistisch)",
      aPCFG: "PCFG (grammatica)",
      aCombi: "Combinator (2 woorden)",
      nAllCombos: "Alle combinaties",
      nInLeaks: "Gevonden in bekende inbreuken!",
      nAbsentLeaks: "Niet op bekende lijsten → ineffectieve aanval",
      nDictMut: "Dict+mutatie patroon gedetecteerd",
      nStructUnrecog: "Onherkende structuur → ineffectief",
      nStructCaps: "Hoofdletter+kleine+cijfers structuur gedetecteerd",
      nKBDetected: "Toetsenbordpatroon gedetecteerd",
      nSeqDetected: "Reeks gedetecteerd",
      nNoPattern: "Geen voorspelbaar patroon → ineffectief",
      nSalted: "Gezoute hash → tabellen nutteloos",
      nTooLong: "Te lang/complex voor tabellen",
      nTablesAvail: "Vooraf berekende tabellen beschikbaar",
      nTablesBig: "Tabellen mogelijk maar groot",
      nCredKnown: "Bekende referenties → onmiddellijke toegang",
      nCredReuse: "Hangt af van hergebruik",
      nTop20: "Top 20 wereldwijd → prioriteitsdoel!",
      nNotTop: "Niet veelgebruikt",
      nHuman95: "Menselijke patronen → ruimte verkleind ~95%",
      nStatPrio: "Statistische reeksprioriteit",
      nPCFGDetected: "Grammaticale structuur gedetecteerd → gericht",
      nPCFGNone: "Niet-grammaticaal → minder effectief",
      nPassphrase: "Wachtzin gedetecteerd → 2 woordenboeken",
      nNotPassphrase: "Geen wachtzin → ineffectief",
      yr: "jaar",
      yrs: "jaren",
      mo: "maanden",
      day: "dag",
      days: "dagen",
      appDescription:
        "Time2Crack berekent lokaal hoe lang het zou duren om je wachtwoord te kraken, zonder je wachtwoord ooit te verzenden.",
      inputPlaceholder: "Voer een wachtwoord in om te testen",
    },
  };

  function t(k) {
    return I[LANG][k] || I.en[k] || k;
  }

  function setLang(lang) {
    LANG = lang;
    document.documentElement.lang = lang;
    document.title =
      "Time2Crack — " +
      (lang === "fr"
        ? "Quand votre mot de passe sera-t-il craqué ?"
        : "When will your password be cracked?");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (I[lang][k]) el.textContent = I[lang][k];
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const k = el.getAttribute("data-i18n-html");
      if (I[lang][k]) el.innerHTML = I[lang][k];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const k = el.getAttribute("data-i18n-placeholder");
      if (I[lang][k]) el.placeholder = I[lang][k];
    });
    // Update toggle button text (preserve icon)
    const isVisible = input.type === "text";
    const textSpan = toggleBtn.querySelector("span");
    if (textSpan) textSpan.textContent = isVisible ? t("hide") : t("show");
    // Update lang switcher
    document.querySelectorAll(".lang-switch button").forEach((b) => {
      const active = b.getAttribute("data-lang") === lang;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", active);
    });
    // Re-render if there's content
    if (input.value.length) render();
  }

  // Lang switch click
  document.querySelectorAll(".lang-switch button").forEach((b) => {
    b.addEventListener("click", () => setLang(b.getAttribute("data-lang")));
  });

  const $ = (id) => document.getElementById(id);
  const input = $("password-input");
  const toggleBtn = $("toggle-visibility");
  const strengthBar = $("strength-bar");
  const strengthLabel = $("strength-label");
  const resultsDiv = $("results");
  const crackDateFast = $("crack-date-fast");
  const crackDurationFast = $("crack-duration-fast");
  const resultSentenceFast = $("result-sentence-fast");
  const resultLabelFast = $("result-label-fast");
  const crackDateSlow = $("crack-date-slow");
  const crackDurationSlow = $("crack-duration-slow");
  const resultSentenceSlow = $("result-sentence-slow");
  const resultLabelSlow = $("result-label-slow");
  const detailLength = $("detail-length");
  const detailCharset = $("detail-charset");
  const detailEntropy = $("detail-entropy");
  const detailCombos = $("detail-combos");
  const detailStatus = $("detail-status");
  const liveDetails = $("live-details");
  const barWrapper = document.querySelector(".strength-bar-wrapper");
  const resetBtn = $("reset-btn");
  const attackTbody = $("attack-tbody");
  const vulnTagsEl = $("vuln-tags");
  const hibpBanner = $("hibp-banner");
  const hibpCount = $("hibp-count");
  const hibpSafe = $("hibp-safe");

  // ============================================================
  // HIBP k-anonymity check (only first 5 chars of SHA-1 sent)
  // ============================================================
  let hibpAbort = null;
  let hibpDebounce = null;
  let lastCheckedPw = "";
  const hibpError = $("hibp-error");

  async function sha1(str) {
    const buf = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest("SHA-1", buf);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
  }

  async function checkHIBP(pw) {
    // Hide all banners while checking
    hibpBanner.hidden = true;
    hibpSafe.hidden = true;
    hibpError.hidden = true;

    if (!pw || pw.length < 1) return;

    // Abort any in-flight request
    if (hibpAbort) hibpAbort.abort();
    hibpAbort = new AbortController();

    try {
      const hash = await sha1(pw);
      const prefix = hash.substring(0, 5);
      const suffix = hash.substring(5);

      const resp = await fetch(
        "https://api.pwnedpasswords.com/range/" + prefix,
        {
          signal: hibpAbort.signal,
          headers: { "Add-Padding": "true" }, // extra privacy
        },
      );

      if (!resp.ok) {
        // Only update if the password hasn't changed during the request
        if (input.value !== pw) return;
        hibpError.hidden = false;
        return;
      }

      const text = await resp.text();
      const lines = text.split("\n");
      let found = 0;

      for (const line of lines) {
        const [hashSuffix, count] = line.split(":");
        if (hashSuffix.trim() === suffix) {
          found = parseInt(count.trim(), 10);
          break;
        }
      }

      // Only update if the password hasn't changed during the request
      if (input.value !== pw) return;

      if (found > 0) {
        hibpCount.textContent = found.toLocaleString(
          LANG === "fr" ? "fr-FR" : "en-US",
        );
        hibpBanner.hidden = false;
        hibpSafe.hidden = true;
        hibpError.hidden = true;
      } else {
        hibpBanner.hidden = true;
        hibpSafe.hidden = false;
        hibpError.hidden = true;
      }
    } catch (e) {
      if (e.name === "AbortError") return; // expected on rapid typing
      // Network error: show error banner if password hasn't changed
      if (input.value === pw) {
        hibpError.hidden = false;
      }
    }
  }

  // Toggle visibility
  toggleBtn.addEventListener("click", () => {
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    const textSpan = toggleBtn.querySelector("span");
    if (textSpan) textSpan.textContent = show ? t("hide") : t("show");
    toggleBtn.setAttribute("aria-label", show ? t("hideAria") : t("showAria"));
    input.focus();
  });

  // ============================================================
  // CONSTANTS & THRESHOLDS
  // ============================================================
  // Password length thresholds
  const PASSWORD_MIN_LENGTH = 8;
  const PASSWORD_GOOD_LENGTH = 12;
  const PASSWORD_GREAT_LENGTH = 16;
  const MIN_ANALYSIS_LENGTH = 6;
  const SHORT_INPUT_IDLE_DELAY = 1000;

  // Charset sizes
  const CHARSET_LOWER = 26,
    CHARSET_UPPER = 26,
    CHARSET_DIGIT = 10,
    CHARSET_SYMBOL = 32,
    CHARSET_UNICODE = 100;
  const CHARSET_UNICODE_ESTIMATE = 100; // Rough estimate for non-ASCII

  // Strength score thresholds
  const SCORE_ENTROPY = [28, 36, 60, 128];
  const SCORE_RANGES = [20, 35, 60, 90];
  const SCORE_COMMON_PENALTY = 5;
  const SCORE_KEYBOARD_PENALTY = 15;
  const SCORE_STRUCT_PENALTY = 15;
  const SCORE_DATE_PENALTY = 10;

  // Mask attack parameters
  const MASK_STRUCT_KEYSPACE_MULTIPLIER = 1000;
  const MASK_GENERAL_REDUCTION = 0.001;

  // Markov attack parameters
  const MARKOV_HUMAN_REDUCTION = 0.05;
  const MARKOV_STAT_REDUCTION = 0.3;

  // Rainbow table parameters
  const RAINBOW_LEN_THRESHOLD_1 = 7,
    RAINBOW_CHARSET_THRESHOLD_1 = 72;
  const RAINBOW_LEN_THRESHOLD_2 = 8,
    RAINBOW_TIME_2 = 60;
  const RAINBOW_LEN_THRESHOLD_3 = 10,
    RAINBOW_CHARSET_THRESHOLD_3 = 36,
    RAINBOW_TIME_3 = 300;

  // PCFG keyspace
  const PCFG_KEYSPACE = 1e7;

  // Combinator keyspace
  const COMBI_KEYSPACE = 1e10;

  // Hybrid attack keyspace
  const HYBRID_KEYSPACE = 1e9;

  // ============================================================
  // HASH RATES — 12× RTX 4090 (hashcat benchmarks)
  // ============================================================
  const ALGOS = [
    { key: "md5", name: "MD5", rate: 168.9e9 * 12, salted: false },
    { key: "sha1", name: "SHA-1", rate: 50.86e9 * 12, salted: false },
    { key: "sha256", name: "SHA-256", rate: 22.68e9 * 12, salted: false },
    { key: "ntlm", name: "NTLM", rate: 168.9e9 * 12, salted: false },
    { key: "bcrypt", name: "bcrypt (coût 5)", rate: 71000, salted: true },
    { key: "argon2", name: "Argon2id", rate: 800, salted: true },
  ];

  // ============================================================
  // COMMON PASSWORDS & PATTERNS
  // ============================================================
  // Generated from data/common-passwords.json via scripts/sync-common-passwords.mjs
  const COMMON = new Set([
    "password",
    "123456",
    "12345678",
    "qwerty",
    "abc123",
    "monkey",
    "1234567",
    "letmein",
    "trustno1",
    "dragon",
    "baseball",
    "iloveyou",
    "master",
    "sunshine",
    "ashley",
    "bailey",
    "passw0rd",
    "shadow",
    "123123",
    "654321",
    "superman",
    "qazwsx",
    "michael",
    "football",
    "password1",
    "admin",
    "welcome",
    "hello",
    "charlie",
    "donald",
    "princess",
    "qwerty123",
    "solo",
    "loveme",
    "starwars",
    "azerty",
    "soleil",
    "bonjour",
    "000000",
    "111111",
    "1234",
    "12345",
    "123456789",
    "1234567890",
    "666666",
    "696969",
    "888888",
    "abcdef",
    "access",
    "amor",
    "batman",
    "cheese",
    "computer",
    "flower",
    "freedom",
    "google",
    "jesus",
    "jordan",
    "killer",
    "maggie",
    "matrix",
    "mustang",
    "nicole",
    "pass",
    "pepper",
    "robert",
    "samantha",
    "soccer",
    "thomas",
    "thunder",
    "112233",
    "123321",
    "123qwe",
    "123abc",
    "1234qwer",
    "987654321",
    "1111111",
    "555555",
    "7777777",
    "999999",
    "88888888",
    "121212",
    "12121212",
    "1q2w3e",
    "1q2w3e4r",
    "1q2w3e4r5t",
    "qwertyuiop",
    "zxcvbnm",
    "asdfgh",
    "asdfghjkl",
    "qwe123",
    "test123",
    "welcome1",
    "changeme",
    "default",
    "root",
    "user",
    "qwertz",
    "iloveu",
    "whatever",
    "pass123",
    "susana",
    "maria",
    "virginia",
    "veronica",
    "lorena",
    "monica",
    "claudia",
    "passwort",
    "parola",
    "123",
    "12345678910",
    "admin123",
    "admin@123",
    "admintelecom",
    "aa123456",
    "aa@123456",
    "pass@123",
    "p@ssw0rd",
    "skibidi",
    "pakistan123",
    "marta",
    "margarita",
    "rodolfo",
    "valentina",
    "graciela",
    "contraseña",
    "zaq1zaq1",
    "login",
    "password123",
  ]);

  const KB_PATTERNS = [
    "qwerty",
    "qwertz",
    "azerty",
    "qazwsx",
    "zxcvbn",
    "asdf",
    "fdsa",
    "qwertyuiop",
    "azertyuiop",
    "1qaz2wsx",
    "zaq1zaq1",
  ];

  const LEET = {
    a: "@4",
    e: "3",
    i: "1!",
    o: "0",
    s: "$5",
    t: "7",
    l: "1",
    b: "8",
  };

  function deLeet(pw) {
    let r = pw.toLowerCase();
    for (const [ch, reps] of Object.entries(LEET))
      for (const c of reps) r = r.split(c).join(ch);
    return r;
  }

  function isCommon(pw) {
    const l = pw.toLowerCase();
    return COMMON.has(l) || COMMON.has(deLeet(pw));
  }

  function hasKBPattern(pw) {
    const l = pw.toLowerCase();
    return KB_PATTERNS.some((p) => l.includes(p));
  }

  function hasSequence(pw) {
    if (pw.length < 4) return false;
    let asc = 1,
      desc = 1;
    for (let i = 1; i < pw.length; i++) {
      const d = pw.charCodeAt(i) - pw.charCodeAt(i - 1);
      if (d === 1) {
        if (++asc >= 4) return true;
      } else asc = 1;
      if (d === -1) {
        if (++desc >= 4) return true;
      } else desc = 1;
    }
    return false;
  }

  function hasRepeat(pw) {
    if (pw.length < 3) return false;
    let c = 1;
    for (let i = 1; i < pw.length; i++) {
      if (pw[i] === pw[i - 1]) {
        if (++c >= 3) return true;
      } else c = 1;
    }
    return false;
  }

  function hasDate(pw) {
    return (
      /(?:19|20)\d{2}/.test(pw) ||
      /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/.test(pw)
    );
  }

  function hasCommonStruct(pw) {
    return /^[A-Z][a-z]+\d+[!@#$%^&*.]?$/.test(pw);
  }

  // ============================================================
  // CHARSET
  // ============================================================
  function getCharset(pw) {
    let s = 0,
      fl = { lo: 0, up: 0, di: 0, sy: 0, un: 0 };
    for (let i = 0; i < pw.length; i++) {
      const c = pw.charCodeAt(i);
      if (c >= 97 && c <= 122) fl.lo = 1;
      else if (c >= 65 && c <= 90) fl.up = 1;
      else if (c >= 48 && c <= 57) fl.di = 1;
      else if (c >= 33 && c <= 126) fl.sy = 1;
      else fl.un = 1;
    }
    s =
      fl.lo * CHARSET_LOWER +
      fl.up * CHARSET_UPPER +
      fl.di * CHARSET_DIGIT +
      fl.sy * CHARSET_SYMBOL +
      fl.un * CHARSET_UNICODE;
    return {
      size: Math.max(s, 1),
      flags: fl,
      types: fl.lo + fl.up + fl.di + fl.sy + fl.un,
    };
  }

  function entropy(pw) {
    return pw.length * Math.log2(getCharset(pw).size);
  }

  // ============================================================
  // TIME CALCULATION
  // ============================================================
  function bruteTime(keyspace, rate) {
    if (keyspace <= 0 || rate <= 0) return 0;
    const ls = Math.log(keyspace / 2) - Math.log(rate);
    return ls > 230 ? Infinity : Math.max(0, Math.exp(ls));
  }

  // ============================================================
  // ATTACK SCENARIO BUILDERS (Refactored)
  // ============================================================
  function addBruteForceAttacks(rows, full) {
    for (const a of ALGOS) {
      rows.push({
        atk: t("aBrute"),
        hash: a.name,
        rate: a.rate,
        sec: bruteTime(full, a.rate),
        note: t("nAllCombos"),
        cat: "brute",
      });
    }
  }

  function addDictionaryAttacks(rows, common) {
    for (const a of ALGOS) {
      rows.push({
        atk: t("aDict"),
        hash: a.name,
        rate: a.rate,
        sec: common ? 0.001 : null,
        note: common ? t("nInLeaks") : t("nAbsentLeaks"),
        cat: "dict",
      });
    }
  }

  function addHybridAttacks(rows, hybridVuln) {
    if (hybridVuln) {
      for (const a of ALGOS) {
        rows.push({
          atk: t("aHybrid"),
          hash: a.name,
          rate: a.rate,
          sec: bruteTime(HYBRID_KEYSPACE, a.rate),
          note: t("nDictMut"),
          cat: "hybrid",
        });
      }
    } else {
      rows.push({
        atk: t("aHybrid"),
        hash: "(all)",
        rate: 0,
        sec: null,
        note: t("nStructUnrecog"),
        cat: "hybrid",
      });
    }
  }

  function addMaskAttacks(rows, full, len, cs, struct, kbPat, seq) {
    const hasMaskVuln = struct || kbPat || seq;
    if (hasMaskVuln) {
      let maskKS;
      if (struct)
        maskKS =
          CHARSET_LOWER *
          Math.pow(CHARSET_LOWER, Math.max(len - 3, 1)) *
          MASK_STRUCT_KEYSPACE_MULTIPLIER;
      else maskKS = full * MASK_GENERAL_REDUCTION;
      const note = struct
        ? t("nStructCaps")
        : kbPat
          ? t("nKBDetected")
          : t("nSeqDetected");
      for (const a of ALGOS) {
        rows.push({
          atk: t("aMask"),
          hash: a.name,
          rate: a.rate,
          sec: bruteTime(Math.min(maskKS, full), a.rate),
          note: note,
          cat: "mask",
        });
      }
    } else {
      rows.push({
        atk: t("aMask"),
        hash: "(all)",
        rate: 0,
        sec: null,
        note: t("nNoPattern"),
        cat: "mask",
      });
    }
  }

  function addRainbowTableAttacks(rows, len, cs, common) {
    for (const a of ALGOS) {
      let s;
      if (a.salted) {
        s = null;
      } else if (common) {
        s = 0.001;
      } else if (
        len <= RAINBOW_LEN_THRESHOLD_1 &&
        cs <= RAINBOW_CHARSET_THRESHOLD_1
      ) {
        s = 0.01;
      } else if (
        len === RAINBOW_LEN_THRESHOLD_2 &&
        cs <= RAINBOW_CHARSET_THRESHOLD_1
      ) {
        s = RAINBOW_TIME_2;
      } else if (
        len <= RAINBOW_LEN_THRESHOLD_3 &&
        cs <= RAINBOW_CHARSET_THRESHOLD_3
      ) {
        s = RAINBOW_TIME_3;
      } else {
        s = null;
      }
      rows.push({
        atk: t("aRainbow"),
        hash: a.name,
        rate: a.salted ? 0 : a.rate,
        sec: s,
        note: a.salted
          ? t("nSalted")
          : s === null
            ? t("nTooLong")
            : s < 1
              ? t("nTablesAvail")
              : t("nTablesBig"),
        cat: "rainbow",
      });
    }
  }

  function addCredentialAttacks(rows, common, pw) {
    rows.push({
      atk: t("aCred"),
      hash: "(all)",
      rate: 0,
      sec: common ? 0 : null,
      note: common ? t("nCredKnown") : t("nCredReuse"),
      cat: "cred",
    });

    const top20 = [
      "123456",
      "password",
      "12345678",
      "qwerty",
      "abc123",
      "1234567",
      "letmein",
      "trustno1",
      "dragon",
      "baseball",
      "iloveyou",
      "master",
      "sunshine",
      "ashley",
      "bailey",
      "shadow",
      "123123",
      "654321",
      "superman",
      "qazwsx",
    ];
    const spray = top20.includes(pw.toLowerCase());
    rows.push({
      atk: t("aSpray"),
      hash: "(all)",
      rate: 0,
      sec: spray ? 0 : null,
      note: spray ? t("nTop20") : t("nNotTop"),
      cat: "spray",
    });
  }

  function addMarkovAttacks(rows, full, hybridVuln, struct, kbPat, dt, rep) {
    const looksHuman = hybridVuln || struct || kbPat || dt || rep;
    const markovReduction = looksHuman
      ? MARKOV_HUMAN_REDUCTION
      : MARKOV_STAT_REDUCTION;
    const note = looksHuman ? t("nHuman95") : t("nStatPrio");
    for (const a of ALGOS) {
      rows.push({
        atk: t("aMarkov"),
        hash: a.name,
        rate: a.rate,
        sec: bruteTime(full * markovReduction, a.rate),
        note: note,
        cat: "markov",
      });
    }
  }

  function addPCFGAttacks(rows, struct, hybridVuln) {
    if (struct || hybridVuln) {
      for (const a of ALGOS) {
        rows.push({
          atk: t("aPCFG"),
          hash: a.name,
          rate: a.rate,
          sec: bruteTime(PCFG_KEYSPACE, a.rate),
          note: t("nPCFGDetected"),
          cat: "pcfg",
        });
      }
    } else {
      rows.push({
        atk: t("aPCFG"),
        hash: "(all)",
        rate: 0,
        sec: null,
        note: t("nPCFGNone"),
        cat: "pcfg",
      });
    }
  }

  function addCombinatorAttacks(rows, len, pw, common, looksPassphrase) {
    if (looksPassphrase || common) {
      for (const a of ALGOS) {
        rows.push({
          atk: t("aCombi"),
          hash: a.name,
          rate: a.rate,
          sec: common ? 0.001 : bruteTime(COMBI_KEYSPACE, a.rate),
          note: t("nPassphrase"),
          cat: "combi",
        });
      }
    } else {
      rows.push({
        atk: t("aCombi"),
        hash: "(all)",
        rate: 0,
        sec: null,
        note: t("nNotPassphrase"),
        cat: "combi",
      });
    }
  }

  // ============================================================
  // ALL ATTACK SCENARIOS
  // ============================================================
  function getScenarios(pw) {
    const { size: cs } = getCharset(pw);
    const len = pw.length;
    const full = Math.pow(cs, len);

    // Cache vulnerability checks
    const common = isCommon(pw);
    const kbPat = hasKBPattern(pw);
    const seq = hasSequence(pw);
    const rep = hasRepeat(pw);
    const dt = hasDate(pw);
    const struct = hasCommonStruct(pw);
    const deleet = deLeet(pw);
    const hybridVuln = /^[a-z]+\d{0,4}[!@#$%^&*.]?$/.test(deleet);
    const hasSpaces = pw.includes(" ") || pw.includes("-") || pw.includes("_");
    const looksPassphrase = hasSpaces || (/^[a-z]{6,}$/i.test(pw) && len >= 10);

    const rows = [];

    // Add attacks in organized groups
    addBruteForceAttacks(rows, full);
    addDictionaryAttacks(rows, common);
    addHybridAttacks(rows, hybridVuln);
    addMaskAttacks(rows, full, len, cs, struct, kbPat, seq);
    addRainbowTableAttacks(rows, len, cs, common);
    addCredentialAttacks(rows, common, pw);
    addMarkovAttacks(rows, full, hybridVuln, struct, kbPat, dt, rep);
    addPCFGAttacks(rows, struct, hybridVuln);
    addCombinatorAttacks(rows, len, pw, common, looksPassphrase);

    return rows;
  }

  // ============================================================
  // VULNERABILITIES
  // ============================================================
  function getVulns(pw) {
    const v = [];
    if (isCommon(pw)) v.push({ t: t("vCommon"), l: "critical" });
    if (hasKBPattern(pw)) v.push({ t: t("vKeyboard"), l: "critical" });
    if (pw.length < 8) v.push({ t: t("vShort"), l: "critical" });
    if (hasSequence(pw)) v.push({ t: t("vSequence"), l: "warn" });
    if (hasRepeat(pw)) v.push({ t: t("vRepeat"), l: "warn" });
    if (hasDate(pw)) v.push({ t: t("vDate"), l: "warn" });
    if (hasCommonStruct(pw)) v.push({ t: t("vStruct"), l: "warn" });
    const { types } = getCharset(pw);
    if (types <= 1) v.push({ t: t("v1Type"), l: "critical" });
    if (types >= 4) v.push({ t: t("vDiversity"), l: "ok" });
    if (pw.length >= 16) v.push({ t: t("vGreatLen"), l: "ok" });
    else if (pw.length >= 12) v.push({ t: t("vGoodLen"), l: "ok" });
    return v;
  }

  // ============================================================
  // FORMATTING
  // ============================================================
  function fmtBig(n) {
    if (!isFinite(n)) return "∞";
    if (n >= 1e18) return n.toExponential(1).replace("+", "");
    if (n >= 1e15) return (n / 1e15).toFixed(1) + " P";
    if (n >= 1e12) return (n / 1e12).toFixed(1) + " T";
    if (n >= 1e9) return (n / 1e9).toFixed(1) + " G";
    if (n >= 1e6) return (n / 1e6).toFixed(1) + " M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + " k";
    return Math.round(n).toString();
  }

  function fmtDuration(s) {
    if (s === null) return { text: t("na"), ok: false, na: true };
    if (!isFinite(s) || s > 1e18)
      return { text: t("beyondUniverse"), ok: false, inf: true };
    if (s < 0.01) return { text: t("instant"), ok: true, instant: true };
    if (s < 1) return { text: t("lessSec"), ok: true, instant: true };
    const tot = Math.floor(s);
    const y = Math.floor(tot / 31557600),
      mo = Math.floor((tot % 31557600) / 2629800),
      d = Math.floor((tot % 2629800) / 86400),
      h = Math.floor((tot % 86400) / 3600),
      mi = Math.floor((tot % 3600) / 60),
      se = tot % 60;
    const p = [];
    if (y > 0) p.push(fmtBig(y) + " " + (y === 1 ? t("yr") : t("yrs")));
    if (mo > 0) p.push(mo + " " + t("mo"));
    if (d > 0) p.push(d + " " + (d === 1 ? t("day") : t("days")));
    if (h > 0) p.push(h + " h");
    if (mi > 0 && y === 0) p.push(mi + " min");
    if (se > 0 && y === 0 && mo === 0) p.push(se + " s");
    return { text: p.slice(0, 3).join(", "), ok: true };
  }

  function fmtDate(s) {
    if (s === null || !isFinite(s) || s > 3.15576e15) return null;
    const d = new Date(Date.now() + s * 1000);
    return isNaN(d.getTime())
      ? null
      : d.toLocaleDateString(LANG === "fr" ? "fr-FR" : "en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
  }

  function fmtSpeed(r) {
    return r === 0 ? "—" : fmtBig(r) + " H/s";
  }

  // ============================================================
  // STRENGTH SCORE
  // ============================================================
  function score(pw) {
    const e = entropy(pw);
    let s;
    if (e <= 0) s = 0;
    else if (e < SCORE_ENTROPY[0]) s = (e / SCORE_ENTROPY[0]) * SCORE_RANGES[0];
    else if (e < SCORE_ENTROPY[1])
      s =
        SCORE_RANGES[0] +
        ((e - SCORE_ENTROPY[0]) / (SCORE_ENTROPY[1] - SCORE_ENTROPY[0])) * 15;
    else if (e < SCORE_ENTROPY[2])
      s =
        SCORE_RANGES[1] +
        ((e - SCORE_ENTROPY[1]) / (SCORE_ENTROPY[2] - SCORE_ENTROPY[1])) * 25;
    else if (e < SCORE_ENTROPY[3])
      s =
        SCORE_RANGES[2] +
        ((e - SCORE_ENTROPY[2]) / (SCORE_ENTROPY[3] - SCORE_ENTROPY[2])) * 30;
    else
      s = Math.min(100, SCORE_RANGES[3] + ((e - SCORE_ENTROPY[3]) / 64) * 10);
    if (isCommon(pw)) s = Math.min(s, SCORE_COMMON_PENALTY);
    if (hasKBPattern(pw)) s = Math.min(s, SCORE_KEYBOARD_PENALTY);
    if (hasCommonStruct(pw)) s -= SCORE_STRUCT_PENALTY;
    if (hasDate(pw)) s -= SCORE_DATE_PENALTY;
    return Math.max(0, Math.min(100, Math.round(s)));
  }

  function scoreColor(s) {
    return s < 20
      ? "var(--critical)"
      : s < 35
        ? "var(--warning)"
        : s < 60
          ? "var(--accent)"
          : s < 90
            ? "var(--success)"
            : "var(--excellent)";
  }
  function scoreText(s) {
    return s < 20
      ? t("veryWeak")
      : s < 35
        ? t("_weak")
        : s < 60
          ? t("moderate")
          : s < 90
            ? t("_strong")
            : t("veryStrong");
  }

  // ============================================================
  // RENDER
  // ============================================================
  let timer;
  function setPendingState() {
    resultsDiv.classList.add("visible");
    resultsDiv.classList.remove("is-empty");
    resetBtn.classList.add("visible");
    strengthBar.style.width = "0%";
    strengthBar.style.background = "var(--border)";
    strengthLabel.textContent = "—";
    strengthLabel.style.color = "";
    barWrapper.classList.remove("strong");
    barWrapper.setAttribute("aria-valuenow", "0");
    resultLabelFast.textContent = "—";
    crackDurationFast.textContent = "—";
    crackDateFast.textContent = "—";
    resultSentenceFast.textContent = "";
    liveDetails.hidden = true;
    vulnTagsEl.innerHTML = "";
    hibpBanner.hidden = true;
    hibpSafe.hidden = true;
    hibpError.hidden = true;
  }

  input.addEventListener("input", () => {
    clearTimeout(timer);
    const len = input.value.length;
    if (!len) {
      render();
      return;
    }
    setPendingState();
    if (len < MIN_ANALYSIS_LENGTH) {
      timer = setTimeout(render, SHORT_INPUT_IDLE_DELAY);
      return;
    }
    timer = setTimeout(render, 120);
  });

  function render() {
    const pw = input.value;
    if (!pw.length) {
      resultsDiv.classList.add("visible");
      resultsDiv.classList.add("is-empty");
      resetBtn.classList.remove("visible");
      strengthBar.style.width = "0%";
      strengthBar.style.background = "var(--border)";
      strengthLabel.textContent = "—";
      strengthLabel.style.color = "";
      barWrapper.classList.remove("strong");
      barWrapper.setAttribute("aria-valuenow", "0");
      vulnTagsEl.innerHTML = "";
      resultLabelFast.textContent = "—";
      crackDurationFast.textContent = "—";
      crackDateFast.textContent = "—";
      resultSentenceFast.textContent = "";
      hibpBanner.hidden = true;
      hibpSafe.hidden = true;
      hibpError.hidden = true;
      if (hibpAbort) hibpAbort.abort();
      lastCheckedPw = "";
      liveDetails.hidden = true;
      return;
    }

    resetBtn.classList.add("visible");
    resultsDiv.classList.add("visible");
    resultsDiv.classList.remove("is-empty");

    // Debounced HIBP check (600ms after last keystroke to avoid spamming)
    clearTimeout(hibpDebounce);
    if (pw !== lastCheckedPw) {
      hibpDebounce = setTimeout(() => {
        lastCheckedPw = pw;
        checkHIBP(pw);
      }, 600);
    }
    const { size: cs, types } = getCharset(pw);
    const ent = entropy(pw);
    const sc = score(pw);
    const col = scoreColor(sc);

    // Bar
    strengthBar.style.width = sc + "%";
    strengthBar.style.background = col;
    strengthLabel.textContent = scoreText(sc);
    strengthLabel.style.color = col;
    barWrapper.setAttribute("aria-valuenow", sc);

    // Update strength bar color indicator
    if (sc >= 60) {
      barWrapper.classList.add("strong");
    } else {
      barWrapper.classList.remove("strong");
    }

    // Live details (updated in real time)
    detailLength.textContent = pw.length;
    detailCharset.textContent = cs;
    detailEntropy.textContent = Math.round(ent);
    detailCombos.textContent =
      ent > 60 ? "2^" + Math.round(ent) : fmtBig(Math.pow(2, ent));

    // Update status indicator based on password score (textual, no circular gauge)
    detailStatus.className = "detail-status";
    if (sc < 20) {
      detailStatus.classList.add("status-short");
      detailStatus.textContent = t("statusShort");
      detailStatus.setAttribute(
        "aria-label",
        t("statusShort") + ": " + sc + "%",
      );
    } else if (sc < 60) {
      detailStatus.classList.add("status-good");
      detailStatus.textContent = t("statusGood");
      detailStatus.setAttribute(
        "aria-label",
        t("statusGood") + ": " + sc + "%",
      );
    } else {
      detailStatus.classList.add("status-excellent");
      detailStatus.textContent = t("statusExcellent");
      detailStatus.setAttribute(
        "aria-label",
        t("statusExcellent") + ": " + sc + "%",
      );
    }

    liveDetails.hidden = false;

    // Tags
    const vulns = getVulns(pw);
    vulnTagsEl.innerHTML = vulns
      .map(
        (v) =>
          '<span class="vuln-tag ' +
          v.l +
          '" role="status">' +
          (v.l === "critical" ? "⚠ " : v.l === "warn" ? "⚡ " : "✓ ") +
          v.t +
          "</span>",
      )
      .join("");

    // Scenarios
    const all = getScenarios(pw);

    // Find FASTEST and SLOWEST attacks (non-null, finite seconds)
    let fastest = null;
    let slowest = null;
    for (const r of all) {
      if (r.sec !== null && isFinite(r.sec)) {
        if (!fastest || r.sec < fastest.sec) fastest = r;
        if (!slowest || r.sec > slowest.sec) slowest = r;
      }
    }

    // --- FASTEST CARD ---
    const fastSec = fastest ? fastest.sec : 0;
    const fastDur = fmtDuration(fastSec);
    const fastDt = fmtDate(fastSec);

    crackDurationFast.style.color = col;
    crackDateFast.style.color = col;
    const methodAnchor =
      ' <a href="#methodology" class="method-inline-link">' +
      t("methodLink") +
      "</a>";

    if (fastDur.instant) {
      resultLabelFast.textContent = fastest
        ? fastest.atk + " — " + fastest.hash
        : "";
      crackDurationFast.textContent = t("lessSec");
      crackDateFast.textContent = t("now");
      resultSentenceFast.innerHTML =
        t("instantVia") +
        (fastest ? " via " + fastest.atk + "." : ".") +
        methodAnchor;
    } else if (fastDur.inf || !fastDur.ok) {
      resultLabelFast.textContent = t("allAttacks");
      crackDurationFast.textContent = fastDur.text;
      crackDateFast.textContent = t("beyondDate");
      resultSentenceFast.innerHTML = t("unreachable") + methodAnchor;
    } else {
      resultLabelFast.textContent = fastest.atk + " — " + fastest.hash;
      crackDurationFast.textContent = fastDur.text;
      crackDateFast.textContent = fastDt || t("beyondDate");
      resultSentenceFast.innerHTML =
        t("via") +
        " <strong>" +
        fastest.atk +
        "</strong> — " +
        fastest.hash +
        "." +
        methodAnchor;
    }

    const slowSec = slowest ? slowest.sec : Infinity;
    const slowDur = fmtDuration(slowSec);
    const slowDt = fmtDate(slowSec);

    if (slowDur.instant) {
      resultLabelSlow.textContent = slowest
        ? slowest.atk + " — " + slowest.hash
        : "";
      crackDurationSlow.textContent = t("lessSec");
      crackDateSlow.textContent = t("now");
      resultSentenceSlow.innerHTML = t("evenSlowest");
    } else if (slowDur.inf || !slowDur.ok) {
      resultLabelSlow.textContent = slowest
        ? slowest.atk + " — " + slowest.hash
        : t("aBrute");
      crackDurationSlow.textContent = slowDur.text;
      crackDateSlow.textContent = t("beyondDate");
      resultSentenceSlow.innerHTML = t("resistsBeyond");
    } else {
      resultLabelSlow.textContent = slowest.atk + " — " + slowest.hash;
      crackDurationSlow.textContent = slowDur.text;
      crackDateSlow.textContent = slowDt || t("beyondDate");
      resultSentenceSlow.innerHTML =
        t("via") +
        " <strong>" +
        slowest.atk +
        "</strong> — " +
        slowest.hash +
        ".";
    }

    // Table: best per attack type, then full brute force breakdown
    const best = {};
    for (const r of all) {
      const k = r.atk;
      if (
        !best[k] ||
        (r.sec !== null && (best[k].sec === null || r.sec < best[k].sec))
      )
        best[k] = r;
    }
    const sorted = Object.values(best).sort((a, b) => {
      if (a.sec === null) return 1;
      if (b.sec === null) return -1;
      return a.sec - b.sec;
    });

    const fastestTime =
      sorted.length && sorted[0].sec !== null ? sorted[0].sec : Infinity;

    let html = sorted
      .map((r) => {
        const fast = r.sec !== null && r.sec === fastestTime && r.sec < 60;
        return (
          "<tr" +
          (fast ? ' class="fastest"' : "") +
          ">" +
          "<td><strong>" +
          r.atk +
          '</strong><br><small class="attack-note">' +
          r.note +
          "</small></td>" +
          "<td>" +
          r.hash +
          "</td>" +
          "<td>" +
          fmtSpeed(r.rate) +
          "</td>" +
          '<td class="time-cell">' +
          fmtDuration(r.sec).text +
          "</td></tr>"
        );
      })
      .join("");

    html +=
      '<tr class="section-row"><td colspan="4">' +
      t("bruteSectionLabel") +
      "</td></tr>";
    const brutes = all
      .filter((r) => r.cat === "brute")
      .sort((a, b) => a.sec - b.sec);
    html += brutes
      .map(
        (r) =>
          "<tr><td>" +
          t("aBrute") +
          "</td><td>" +
          r.hash +
          "</td><td>" +
          fmtSpeed(r.rate) +
          "</td>" +
          '<td class="time-cell">' +
          fmtDuration(r.sec).text +
          "</td></tr>",
      )
      .join("");

    attackTbody.innerHTML = html;

    resultsDiv.classList.add("visible");
    resultsDiv.classList.remove("is-empty");
  }

  // Reset
  resetBtn.addEventListener("click", () => {
    input.value = "";
    input.type = "text";
    const textSpan = toggleBtn.querySelector("span");
    if (textSpan) textSpan.textContent = t("hide");
    toggleBtn.setAttribute("aria-label", t("hideAria"));
    resultsDiv.classList.add("visible");
    resultsDiv.classList.add("is-empty");
    resetBtn.classList.remove("visible");
    strengthBar.style.width = "0%";
    strengthBar.style.background = "var(--border)";
    strengthLabel.textContent = "—";
    strengthLabel.style.color = "";
    barWrapper.setAttribute("aria-valuenow", "0");
    vulnTagsEl.innerHTML = "";
    liveDetails.hidden = true;
    hibpBanner.hidden = true;
    hibpSafe.hidden = true;
    hibpError.hidden = true;
    if (hibpAbort) hibpAbort.abort();
    clearTimeout(hibpDebounce);
    lastCheckedPw = "";
    input.focus();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") e.preventDefault();
  });
  window.addEventListener("beforeunload", () => {
    input.value = "";
  });
})();
