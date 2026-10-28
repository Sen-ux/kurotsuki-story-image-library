/* Kurotsuki Academy — editable narrative codex. Expanded story drafts are deliberately distinguished from established names/ranks. */
window.KUROTSUKI_CODEX = {
  "meta": {
    "title": "Kurotsuki Academy",
    "subtitle": "The Black Moon Codex",
    "edition": "Living world guide · Expanded lore draft",
    "disclaimer": "Character identities, affiliations, departments and named threats follow the established story. Where a precise history, hunter-grade rule or creature behaviour was not yet defined, this codex offers an expandable lore interpretation rather than a final canon ruling."
  },
  "world": {
    "heading": "Beyond the lanternlight",
    "intro": "The mountains are old, but the things beneath them are older. At Kurotsuki Academy, young hunters learn to read the signs of the unseen: a prayer gone unanswered, a shadow that lingers past dawn, a village road that has forgotten its destination.",
    "detail": "Eastern shrines hold the boundary between ordinary life and the spirit-haunted reaches of the world. Demons bargain in masks and ancient titles. Aberrations rearrange the possible. Eldritch presences threaten reality itself. Kurotsuki trains hunters, occultists, healers, and historians to preserve lives without pretending every unnatural being deserves destruction.",
    "themes": [
      "Eastern supernatural horror",
      "Haunted shrines & mountain paths",
      "Yokai bloodlines",
      "Rituals, wards & exorcism",
      "Body horror among creatures",
      "Mystery, diplomacy & survival"
    ],
    "tenets": [
      [
        "The Veil",
        "The fragile boundary separating the familiar world from the spirit-haunted unknown."
      ],
      [
        "Power of lineage",
        "Purer supernatural bloodlines tend to carry greater innate potential, but training, restraint and judgment decide what that power becomes."
      ],
      [
        "Not every spirit is an enemy",
        "The academy distinguishes predatory entities from spirits that may be reasoned with, protected or left in peace."
      ],
      [
        "A hunter’s burden",
        "A contract can demand a killing; good judgment sometimes demands refusal."
      ]
    ]
  },
  "departments": [
    {
      "id": "hunters",
      "name": "Hunters",
      "color": "#cd6465",
      "symbol": "刃",
      "motto": "Meet the threat. Protect the living.",
      "purpose": "Martial training, containment in the field and the pursuit of entities that cannot be negotiated with.",
      "methods": "Swordsmanship, polearms, archery, coordinated formations and spirit-warded weapons.",
      "head": "akane-tsurugi",
      "people": [
        "akane-tsurugi",
        "goro-akatsuki",
        "haru-amagiri",
        "reina-onikawa",
        "toma-karasuba",
        "jin-seo",
        "masato-igarashi",
        "kazuma-shido"
      ]
    },
    {
      "id": "occultism",
      "name": "Occultism",
      "color": "#a595e9",
      "symbol": "符",
      "motto": "A seal is a promise made visible.",
      "purpose": "Spirit research, exorcism, talisman craft and the study of contact with dangerous forces.",
      "methods": "Ofuda, ritual circles, barriers, invocations and controlled spirit-channeling.",
      "head": "reiha-kiyomizu",
      "people": [
        "reiha-kiyomizu",
        "yuzuriha-sazanami",
        "bai-suiren",
        "emiko-shigure",
        "yae-tsuchigumo",
        "ayame-byakuren"
      ]
    },
    {
      "id": "healing",
      "name": "Healing",
      "color": "#79c7a6",
      "symbol": "癒",
      "motto": "One more life returned from the brink.",
      "purpose": "Field triage, purification, trauma care and protection from spiritual contamination.",
      "methods": "Medical rites, acupuncture, herbal treatment, restorative wards and battlefield evacuation.",
      "head": "dr-meilin-zhao",
      "people": [
        "dr-meilin-zhao",
        "han-haejin",
        "koharu-minase",
        "fuyuka-yukishiro",
        "chiyo-komori"
      ]
    },
    {
      "id": "history",
      "name": "History",
      "color": "#dec17e",
      "symbol": "史",
      "motto": "To forget is to invite repetition.",
      "purpose": "Chronicles, vanished settlements, demon treaties, relic provenance and interpretation of old records.",
      "methods": "Archive work, field archaeology, inscriptions, maps and recorded witness testimony.",
      "head": "yasuhide-momose",
      "people": [
        "yasuhide-momose",
        "eri-hanabusa",
        "sora-mikuni",
        "rin-kurogane",
        "liang-shuren"
      ]
    }
  ],
  "hunterGrades": [
    {
      "grade": "Unlicensed",
      "title": "Academy Enrollee",
      "note": "First through third year learners",
      "detail": "Students may train and accompany supervised missions, but rank and reputation do not themselves confer operational authority.",
      "tone": "#c2c2cc"
    },
    {
      "grade": "C",
      "title": "Field Hunter",
      "note": "Routine assignments",
      "detail": "A provisional operational tier for trained hunters handling limited incidents, escorts and low-threat investigations.",
      "tone": "#86c8a7"
    },
    {
      "grade": "B",
      "title": "Veteran Hunter",
      "note": "Complex containment",
      "detail": "Operatives entrusted with coordinated responses, unstable wards and supervision of less experienced teams.",
      "tone": "#7fa7dc"
    },
    {
      "grade": "A",
      "title": "Master Hunter",
      "note": "High-risk response",
      "detail": "Senior specialists who can direct major hunts, negotiate dangerous pacts and make difficult containment decisions.",
      "tone": "#d7b575"
    },
    {
      "grade": "S",
      "title": "Legendary Hunter",
      "note": "Exceptional recognition",
      "detail": "A rare designation for hunters whose feats and judgment exceed ordinary institutional measures; it does not imply allegiance to Kurotsuki.",
      "tone": "#d97580"
    }
  ],
  "rankNote": "Hunter grades above are a proposed in-world field hierarchy. Threat ranks below classify encounters rather than people; a hunter's grade is not an automatic match for a creature's class.",
  "threatGrades": [
    {
      "grade": "C",
      "name": "Localised",
      "meaning": "A contained anomaly or lesser hostile manifestation. Still dangerous to unprotected civilians.",
      "response": "Survey, ward and investigate."
    },
    {
      "grade": "B",
      "name": "Severe",
      "meaning": "A persistent threat capable of overwhelming isolated hunters or endangering a settlement.",
      "response": "Deploy an experienced team."
    },
    {
      "grade": "A",
      "name": "Catastrophic",
      "meaning": "A highly mobile, intelligent or rapidly escalating threat requiring specialist intervention.",
      "response": "Coordinate multiple disciplines."
    },
    {
      "grade": "S",
      "name": "Apex / Unknown Horizon",
      "meaning": "An exceptional entity that may break existing containment assumptions or threaten an entire region.",
      "response": "Avoid unsupported confrontation; preserve testimony."
    }
  ],
  "rankModifiers": "Modifiers such as A−, A+, or B+ are sometimes used in creature dossier art to refine estimates. All rankings remain provisional until verified in the story.",
  "factions": [
    {
      "id": "crimson-wardens",
      "name": "The Crimson Wardens",
      "kind": "Hunter Organisation",
      "stance": "Allied",
      "palette": "#d96066",
      "crest": "刃",
      "leader": "Yuzuki Kurenai",
      "members": [
        "Yuzuki Kurenai",
        "Ren Akatsuki",
        "Kagami Reika"
      ],
      "summary": "An elite demon-hunting order renowned for extermination and swift, uncompromising action.",
      "doctrine": "Where a demon’s predation is proven, the Wardens prefer a decisive end over a costly negotiation. Their crimson insignia is both a warning and an assurance to the vulnerable.",
      "conflicts": "Their methods often bring them into argument with the Order of Nine Seals, especially where capture is possible."
    },
    {
      "id": "order-nine-seals",
      "name": "The Order of Nine Seals",
      "kind": "Spiritual Society",
      "stance": "Allied / Neutral",
      "palette": "#8b9ee8",
      "crest": "封",
      "leader": "Kujou Satsuki",
      "members": [
        "Kujou Satsuki",
        "Minase Haruto",
        "Tachibana Ayame"
      ],
      "summary": "A spiritual society of exorcists, ritualists and occult scholars devoted to keeping the Veil intact.",
      "doctrine": "Binding, investigation and preservation are preferred to destruction; even a dangerous spirit may be the key to understanding a deeper breach.",
      "conflicts": "Its reliance on seals rather than executions puts it at odds with the Crimson Wardens."
    },
    {
      "id": "nameless-blades",
      "name": "The Nameless Blades",
      "kind": "Independent Hunters",
      "stance": "Neutral",
      "palette": "#b5b7a5",
      "crest": "無",
      "leader": "Shirakawa Kage",
      "leaderId": "shirakawa-kage",
      "members": [
        "shirakawa-kage",
        "kurogane-rei",
        "kasumi-nagi"
      ],
      "summary": "Wandering hunters, mercenaries and exiled exorcists living beyond official authority.",
      "doctrine": "Contracts buy their services, not their loyalty. Some choose coin; others accept payment in information, shelter or the chance to settle an old score.",
      "conflicts": "No charter binds them to the Academy, though temporary alliances are common."
    },
    {
      "id": "hundred-masks",
      "name": "The Court of a Hundred Masks",
      "kind": "Demonic Aristocracy",
      "stance": "Hostile / Neutral",
      "palette": "#de898a",
      "crest": "面",
      "leader": "Lady Utsugi Saigetsu",
      "leaderId": "lady-utsugi-saigetsu",
      "members": [
        "lady-utsugi-saigetsu",
        "lord-enji-kurobane",
        "kohana-menreika"
      ],
      "summary": "Ancient demon nobility whose masks, territories and favours carry obligations that outlive human dynasties.",
      "doctrine": "Every audience is a negotiation; every courtesy has a price. Some courtiers see mortals as prey, while others honour bargains more strictly than human rulers.",
      "conflicts": "Their rivalries can spare villages as easily as they can destroy them."
    },
    {
      "id": "hollow-sutra",
      "name": "The Hollow Sutra",
      "kind": "Eldritch Cult",
      "stance": "Hostile",
      "palette": "#ba9bdf",
      "crest": "空",
      "leader": "Yoru Shinkai",
      "leaderId": "yoru-shinkai",
      "members": [
        "yoru-shinkai",
        "sumi-arata",
        "hoshi-kaimon"
      ],
      "summary": "A hidden cult venerating beings older than the spirit realms and seeking to awaken reality from its supposed dream.",
      "doctrine": "Its followers interpret broken geometry, impossible scripture and fevered prophecy as signs that the waking world is a lie.",
      "conflicts": "Both academy occultists and shrine authorities regard their rites as a danger to the Veil itself."
    },
    {
      "id": "shrine-concordat",
      "name": "The Shrine Concordat",
      "kind": "Spiritual Authority",
      "stance": "Allied",
      "palette": "#84c9b8",
      "crest": "社",
      "leader": "Aoi Mitsurugi",
      "leaderId": "aoi-mitsurugi",
      "members": [
        "aoi-mitsurugi",
        "natsume-kohana",
        "brother-daichi-morisada"
      ],
      "summary": "A network of sanctuaries and temples upholding the rites that keep roads, homes and villages safe.",
      "doctrine": "Rather than hunt every apparition, the Concordat maintains protective boundaries, consecrated weapons and places of refuge.",
      "conflicts": "It works with Kurotsuki, but the safety of shrine communities comes before the Academy's ambitions."
    }
  ],
  "species": [
    {
      "name": "Demons",
      "desc": "Infernal beings ranging from lesser predators to intelligent aristocrats and sovereigns."
    },
    {
      "name": "Aberrations",
      "desc": "Mutated or unnatural organisms whose anatomy appears to reject ordinary life."
    },
    {
      "name": "Revenants",
      "desc": "Ghosts, restless dead and manifestations anchored to loss, death or unfinished obligations."
    },
    {
      "name": "Cursed",
      "desc": "Objects, places and presences kept alive by spiritual malediction."
    },
    {
      "name": "Eldritch",
      "desc": "Powers originating beyond conventional reality and often unaffected by known physical laws."
    },
    {
      "name": "Unknown",
      "desc": "Entities that resist classification and require cautious investigation."
    },
    {
      "name": "Yokai & Spirits",
      "desc": "A broader cultural grouping of supernatural lineages and local presences; not necessarily hostile."
    }
  ],
  "bestiary": [
    {
      "id": "orihime",
      "name": "Orihime",
      "grade": "S",
      "species": "Unknown",
      "summary": "An apex figure recorded at the edge of classification. Its form and significance remain a central mystery.",
      "behavior": "Dossiers disagree on whether its appearance heralds disaster or warns against something still worse.",
      "advice": "Witness, record, retreat. Do not improvise an exorcism."
    },
    {
      "id": "hyakume-inu",
      "name": "Hyakume Inu",
      "grade": "A",
      "species": "Aberrations",
      "summary": "An impossible hound with a proliferation of eyes and a jaw that can unhinge beyond familiar anatomy.",
      "behavior": "Tracks observation as much as scent; witnesses report the unsettling sensation of being counted.",
      "advice": "Avoid prolonged visual contact; preserve escape routes."
    },
    {
      "id": "gesshoku-onna",
      "name": "Gesshoku-onna",
      "grade": "A+",
      "species": "Demons",
      "summary": "An eclipse-associated apparition whose dossier carries an A+ threat assessment.",
      "behavior": "Its precise manifestations remain disputed, sometimes appearing only in accounts gathered after moonless nights.",
      "advice": "Verify the witness and ward the site before pursuit."
    },
    {
      "id": "kegareyama",
      "name": "Kegareyama",
      "grade": "B+",
      "species": "Cursed",
      "summary": "A mountain-bound curse whose contamination travels through neglected places and false paths.",
      "behavior": "Old routes become unreliable where the curse has settled.",
      "advice": "Use marked waystones and a historian's map."
    },
    {
      "id": "utsuro-no-koku",
      "name": "Utsuro no Koku",
      "grade": "A−",
      "species": "Eldritch",
      "summary": "A recorded void-like anomaly notorious for distorted distance and contradictory testimony.",
      "behavior": "Signs and boundaries fail to agree on where the phenomenon begins.",
      "advice": "Record observations from outside the suspected perimeter."
    },
    {
      "id": "mourning-actors",
      "name": "The Mourning Actors",
      "grade": "B",
      "species": "Revenants",
      "summary": "A procession of disquieting stage-like revenants whose movements echo rituals they no longer understand.",
      "behavior": "They repeat gestures and ceremonies to an audience that may never have existed.",
      "advice": "Do not interrupt the pattern without identifying its cause."
    },
    {
      "id": "sunlit-eclipse-wolf",
      "name": "Sunlit Eclipse Wolf",
      "grade": "A",
      "species": "Unknown",
      "summary": "A great wolf-like presence associated with a disturbing reversal of daylight and eclipse.",
      "behavior": "Its outline seems to contradict the light that falls on it.",
      "advice": "Avoid chasing silhouettes; establish multiple observation points."
    },
    {
      "id": "verdant-hollow-tree",
      "name": "Verdant Hollow Tree",
      "grade": "B",
      "species": "Cursed",
      "summary": "A seemingly thriving tree whose hollow core conceals a curse-driven interior ecology.",
      "behavior": "The nearby undergrowth may appear unnaturally receptive to human presence.",
      "advice": "Do not enter exposed roots or cavities without a ward."
    },
    {
      "id": "crimson-eye",
      "name": "The Crimson Eye",
      "grade": "A",
      "species": "Eldritch",
      "summary": "An immense watching phenomenon more easily described by the fear of its gaze than by any stable body.",
      "behavior": "Reported in reflections and sealed chambers where no opening should exist.",
      "advice": "Cover reflective surfaces and withdraw in pairs."
    },
    {
      "id": "celestial-horizon",
      "name": "Celestial Horizon of the New Eclipse",
      "grade": "S",
      "species": "Unknown",
      "summary": "An apex celestial-scale phenomenon whose very name appears in forbidden field records.",
      "behavior": "What witnesses describe as an approaching horizon may be something looking back.",
      "advice": "Treat the first credible report as a regional emergency."
    },
    {
      "id": "spectral-foxes",
      "name": "Spectral Foxes",
      "grade": "C",
      "species": "Revenants",
      "summary": "Fox-shaped spirit lights that haunt old roads, graves and shrines.",
      "behavior": "Often harmless, but may lure travellers toward memories they have tried to bury.",
      "advice": "Approach with respect; offer safe passage rather than violence."
    },
    {
      "id": "lantern-wisps",
      "name": "Lantern Wisps",
      "grade": "C",
      "species": "Yokai & Spirits",
      "summary": "Small wandering lights that appear at the edge of mist and shrine paths. Usually harmless.",
      "behavior": "Circle lanterns and unattended offerings; sometimes guide lost travellers home.",
      "advice": "Observe before assuming hostile intent."
    }
  ],
  "legends": [
    {
      "id": "tempest-fang",
      "name": "Tatsuya Kagetsu",
      "title": "The Tempest Fang",
      "lineage": "Raiju — divine thunder beast",
      "character": "tatsuya-kagetsu",
      "summary": "An independent female hunter whose storm-blood and restless movement have turned her name into a warning among predatory spirits.",
      "rumor": "Some say thunder follows her; others say she simply knows where it will fall.",
      "ethos": "No contract or council owns her blade."
    },
    {
      "id": "crimson-mirage",
      "name": "Shizuru Nuehara",
      "title": "The Crimson Mirage",
      "lineage": "Kitsune — celestial fox",
      "character": "shizuru-nuehara",
      "summary": "A pure-blood Kitsune and independent female hunter whose illusions, foxfire and impeccable courtesy conceal an alarming talent for exposing bargains.",
      "rumor": "Those who think they have trapped her often discover they bargained with an empty room.",
      "ethos": "She chooses which promises are worth keeping."
    },
    {
      "id": "wandering-qilin",
      "name": "Lóngqí Seiran",
      "title": "The Wandering Qilin",
      "lineage": "Qilin — auspicious divine beast",
      "character": "longqi-seiran",
      "summary": "A female Qilin-blooded wanderer whose compassion is backed by a guardian's uncompromising strength.",
      "rumor": "A road where she has passed may remain safe for years, though none can prove why.",
      "ethos": "She protects the vulnerable without swearing to any banner."
    }
  ],
  "places": [
    {
      "id": "kurotsuki",
      "name": "Kurotsuki Academy",
      "type": "Institution",
      "summary": "The mountain academy where hunters, occultists, healers and historians study the dangers of the unseen.",
      "details": "Lantern-lit stairways, enclosed courtyards, ritual chambers and guarded archives make the Academy a place of learning and a bastion against hostile spirits.",
      "links": [
        "hunters",
        "occultism",
        "healing",
        "history"
      ]
    },
    {
      "id": "academy-gate",
      "name": "The Moonlit Entrance",
      "type": "Threshold",
      "summary": "A torii gate rising above a mist-covered stone path, framed by lanterns leading toward the Academy.",
      "details": "For new students the gate is a promise; for veterans it is a reminder of what they have survived."
    },
    {
      "id": "mission-hall",
      "name": "The Incident Hall",
      "type": "Hunter Headquarters",
      "summary": "The mission board where incident reports, creature sketches and maps reveal patterns no single hunter can see.",
      "details": "Senior Hunters select contracts, coordinate teams and return with evidence that may rewrite a classification."
    },
    {
      "id": "archive",
      "name": "The Moonshadow Archives",
      "type": "Restricted Library",
      "summary": "Kurotsuki's records of vanished shrines, old treaties and anomalous events.",
      "details": "History students may spend years learning why some documents are kept under seal rather than destroyed."
    },
    {
      "id": "hollow-lantern",
      "name": "The Hollow Lantern",
      "type": "Neutral Gathering Place",
      "summary": "A candlelit tavern welcoming hunters, exorcists, travellers, supernatural visitors and those who wish to remain unnamed.",
      "details": "Maribel tends to its guests beneath the enigmatic hospitality of Mr. Hollow. Stories travel faster here than official reports."
    },
    {
      "id": "veil-shrines",
      "name": "The Shrine Roads",
      "type": "Sacred Network",
      "summary": "Remote temples and roads protected by Concordat rites and ancestral offerings.",
      "details": "When a route loses its protective signs, the first warning may be a lantern that refuses to stay lit."
    },
    {
      "id": "masked-court",
      "name": "The Masked Territories",
      "type": "Demonic Domain",
      "summary": "A web of estates, hidden audience chambers and courts governed by ancient demonic etiquette.",
      "details": "Mortals who cross into these holdings may return with a boon, a debt, or a name no longer entirely their own."
    }
  ],
  "chronicles": [
    {
      "era": "Before the Academy",
      "title": "The long age of shrines",
      "text": "Shrine communities maintained local warding rites, preserving small islands of safety along dangerous roads."
    },
    {
      "era": "Early Kurotsuki",
      "title": "A school behind the torii",
      "text": "Martial and occult study became intertwined with healing and the keeping of historical records."
    },
    {
      "era": "Age of competing orders",
      "title": "The red blade and the sealed page",
      "text": "Exterminators and ritual societies learned that the same entity could inspire entirely different judgments."
    },
    {
      "era": "The concealed courts",
      "title": "Masks, treaties and obligations",
      "text": "Demonic nobility treated human lifetimes as brief interludes in much older negotiations."
    },
    {
      "era": "Present day",
      "title": "Unquiet incidents",
      "text": "Senior Hunters gather reports of corrupted routes, impossible creatures and phenomena that no familiar ward was designed to contain."
    }
  ],
  "attributes": [
    {
      "name": "Vitality",
      "note": "Physical endurance and capacity to survive injury."
    },
    {
      "name": "Spirit Energy",
      "note": "The reserves required for spiritual techniques and wards."
    },
    {
      "name": "Combat Proficiency",
      "note": "Training, timing, technique and practical martial skill."
    },
    {
      "name": "Occult Knowledge",
      "note": "Understanding of entities, curses, symbols and ritual mechanics."
    },
    {
      "name": "Resolve",
      "note": "Self-command under fear, loss and supernatural pressure."
    },
    {
      "name": "Corruption",
      "note": "Exposure to influences that distort body, spirit or perception."
    },
    {
      "name": "Mode Reputation",
      "note": "Academy Merit, Hunter Renown or Local Reputation, depending on the starting mode."
    }
  ],
  "modes": [
    {
      "name": "Student / Enrollee",
      "focus": "Entrance examinations, classes, friendships and supervised assignments.",
      "place": "The Moonlit Entrance",
      "metric": "Academy Merit"
    },
    {
      "name": "Senior Hunter",
      "focus": "Mission briefings, field leadership and difficult choices under pressure.",
      "place": "The Incident Hall",
      "metric": "Hunter Renown"
    },
    {
      "name": "Free Mode",
      "focus": "Independent exploration, faction bargains and stories beginning at the tavern.",
      "place": "The Hollow Lantern",
      "metric": "Local Reputation"
    }
  ],
  "bios": {
    "tsukuyomi-shizuka": {
      "role": "Headmaster · Kurotsuki Academy",
      "lead": "The calm authority behind Kurotsuki's gates.",
      "background": "The Headmaster presides over an institution that must teach restraint as carefully as power. Students know her as a composed presence whose decisions carry the weight of generations of dangerous precedent.",
      "style": "Academy leadership, spiritual insight and the discipline of difficult choices.",
      "hook": "Why she safeguards certain sealed records remains a matter of speculation.",
      "affiliation": "Kurotsuki Academy",
      "lineage": "Unstated"
    },
    "akane-tsurugi": {
      "role": "Hunters Department Head",
      "lead": "A teacher who measures promises against the lives they protect.",
      "background": "Akane insists that a good hunter can end a fight, but a better hunter knows which fight never should have begun.",
      "style": "Yari spear; disciplined battlefield command.",
      "hook": "Can her uncompromising standards coexist with students' individual instincts?"
    },
    "reiha-kiyomizu": {
      "role": "Occultism Department Head",
      "lead": "A patient interpreter of things that resist being named.",
      "background": "Her white-serpent lineage and restrained manner make her a natural guardian of the Academy's ritual boundaries.",
      "style": "Engraved ritual staff, sealing rites and spiritual boundaries.",
      "hook": "What truth is buried beneath the Academy's oldest ward?"
    },
    "dr-meilin-zhao": {
      "role": "Healing Department Head",
      "lead": "Gentleness sharpened by an unyielding refusal to lose a patient.",
      "background": "Meilin's crane-blood traces remain subtle. The infirmary is hers to protect, even when field commanders would rather keep wounded hunters on their feet.",
      "style": "Needles, purification and medical intervention.",
      "hook": "When resources run short, whose recovery must come first?"
    },
    "yasuhide-momose": {
      "role": "History Department Head",
      "lead": "A scholar who hides difficult truths behind an easy joke.",
      "background": "He has spent decades comparing old field reports, contradictory maps and the stories survivors tell after a supernatural encounter.",
      "style": "Iron war fan; archive knowledge and interpretation of relics.",
      "hook": "His oldest annotations point to a history even he seldom discusses."
    },
    "eri-hanabusa": {
      "role": "History Associate Professor",
      "lead": "An adventurous folklorist who believes every road hides a footnote.",
      "background": "Eri's faint tanuki heritage and playful demeanour make her particularly good at coaxing testimony from people who distrust officials.",
      "style": "Ceremonial umbrella, field surveys and folklore investigation.",
      "hook": "A village legend she remembers does not appear in any official map."
    },
    "goro-akatsuki": {
      "role": "Senior Hunter · Hunters",
      "lead": "A veteran who distrusts theatrics but respects courage.",
      "background": "Gorō's blunt instruction is earned from missions where hesitation carried a cost no student should have to pay.",
      "style": "Iron jitte, reinforced short blade and close-quarter drills.",
      "hook": "An old scar has never stopped him from returning to the field."
    },
    "yuzuriha-sazanami": {
      "role": "Senior Hunter · Occultism",
      "lead": "A sharp-tongued barrier expert who notices what others miss.",
      "background": "Her Karasu-Tengu lineage and quick wit disguise a painstaking regard for ritual safety.",
      "style": "Gohei, chained ritual kunai and barrier work.",
      "hook": "The ward she could not maintain still troubles her."
    },
    "han-haejin": {
      "role": "Senior Hunter · Healing",
      "lead": "The combat medic who reaches the fallen before fear can.",
      "background": "Haejin treats rescue as an active martial discipline: protecting the patient is as important as closing the wound.",
      "style": "Rope dart, silver needles and battlefield evacuation.",
      "hook": "She keeps a record of everyone her team brought home."
    },
    "haru-amagiri": {
      "role": "First-year · Hunters",
      "lead": "Reserved, observant and unwilling to yield.",
      "background": "Haru learns through patient observation rather than display. He often sees the opening in a problem only after everyone else has rushed ahead.",
      "style": "Uchigatana and measured iaijutsu technique.",
      "hook": "He must decide when stubbornness becomes courage—and when it endangers others.",
      "lineage": "Human",
      "year": 1
    },
    "reina-onikawa": {
      "role": "First-year · Hunters",
      "lead": "Boisterous, fiercely competitive and deeply loyal.",
      "background": "A rare half-oni student whose strength is obvious, Reina is determined not to let classmates mistake her bloodline for her entire character.",
      "style": "Heavy kanabō, close-range pressure and raw endurance.",
      "hook": "Can she show restraint when the world expects violence?",
      "lineage": "Half-Oni",
      "year": 1
    },
    "bai-suiren": {
      "role": "First-year · Occultism",
      "lead": "A charming troublemaker with a very uncommon appearance.",
      "background": "White hair, elegant antlers and amber slit-pupil eyes make Bai's demon heritage impossible to ignore. She prefers wit and misdirection to explaining herself.",
      "style": "Reinforced folding fan and paper talismans.",
      "hook": "Her jokes sometimes mask questions she cannot safely ask aloud.",
      "lineage": "Demon-blooded",
      "year": 1
    },
    "koharu-minase": {
      "role": "First-year · Healing",
      "lead": "A patient healer whose gentleness is an act of strength.",
      "background": "Koharu's faint river-yokai lineage makes water rites feel intuitive, though mastering medicine takes the same exhausting discipline as anyone else's work.",
      "style": "Restorative water, silver needles and a short jitte.",
      "hook": "She must learn that she cannot heal everyone alone.",
      "lineage": "Faint river-yokai traces",
      "year": 1
    },
    "toma-karasuba": {
      "role": "First-year · Hunters",
      "lead": "Proud, aloof and bound to a quiet personal code.",
      "background": "Tōma's Karasu-Tengu heritage lends his presence an avian sharpness. A rooftop is often the one place he can think clearly.",
      "style": "Yumi bow, kodachi and precision from elevation.",
      "hook": "He believes honour forbids dependence, even when a team needs him.",
      "lineage": "Karasu-Tengu",
      "year": 1
    },
    "sora-mikuni": {
      "role": "First-year · History",
      "lead": "Curious, talkative and startlingly perceptive.",
      "background": "Sora works among old scrolls and gold-black History robes, chasing contradictions others dismiss. They are human and use they/them pronouns.",
      "style": "Kyoketsu-shoge, careful research and historical deductions.",
      "hook": "They may find evidence that a famous account was written to hide the truth.",
      "lineage": "Human",
      "year": 1,
      "pronouns": "they/them"
    },
    "emiko-shigure": {
      "role": "First-year · Occultism",
      "lead": "A cheerful novice who worries she isn't enough.",
      "background": "Emiko's diluted oni ancestry leaves only the faintest trace. She is socially fearless until it is time to trust her own ability.",
      "style": "Paired sai, fast ofuda placement and improvised seals.",
      "hook": "A failed practice seal might reveal an unexpected talent.",
      "lineage": "Faint Oni ancestry",
      "year": 1
    },
    "yae-tsuchigumo": {
      "role": "Second-year · Occultism",
      "lead": "Soft-spoken and devastatingly observant.",
      "background": "With spider-yokai blood, Yae prefers patterns, patience and the quiet certainty of a prepared trap.",
      "style": "Spirit silk, steel war fan and layered ritual snares.",
      "hook": "Her classmates seldom know when she is teasing and when she is testing them.",
      "lineage": "Spider-yokai",
      "year": 2
    },
    "jin-seo": {
      "role": "Second-year · Hunters",
      "lead": "Reliable in the moment when others lose direction.",
      "background": "Jin's steadiness makes him a natural anchor during field exercises, especially when younger students become overwhelmed.",
      "style": "Korean woldo, measured polearm work and defensive formation.",
      "hook": "He is learning that leadership can require an unpopular decision.",
      "lineage": "Human",
      "year": 2
    },
    "fuyuka-yukishiro": {
      "role": "Second-year · Healing",
      "lead": "Quiet, elegant and fiercely protective.",
      "background": "The cold discipline of Fuyuka's yuki-onna heritage supports her calming presence in the infirmary.",
      "style": "Iron war fan, protective talismans and controlled frost.",
      "hook": "What happens when preserving one life risks freezing everyone else in place?",
      "lineage": "Yuki-onna",
      "year": 2
    },
    "masato-igarashi": {
      "role": "Third-year · Hunters",
      "lead": "A serious senior student guided by honour.",
      "background": "Masato treats every exercise as a duty owed to whoever may later depend on him.",
      "style": "Nagamaki, formal sword drills and defensive counters.",
      "hook": "His perfectionism is tested when rules conflict with real lives.",
      "lineage": "Human",
      "year": 3
    },
    "rin-kurogane": {
      "role": "Third-year · History",
      "lead": "An incisive scholar who seldom wastes a word.",
      "background": "Rin's half-Mizuchi heritage gives her a watchful stillness; she approaches disputed histories as she would a moving current.",
      "style": "Ringed shakujō staff, water-script and precise inquiry.",
      "hook": "She knows the difference between a record being lost and deliberately erased.",
      "lineage": "Half-Mizuchi",
      "year": 3
    },
    "ayame-byakuren": {
      "role": "Student Council President · Occultism",
      "lead": "A diplomatic smile concealing the instincts of a fox.",
      "background": "As a pure-blood Kitsune, Ayame carries formidable innate potential, yet her real authority lies in navigating rival loyalties without losing control of the council.",
      "style": "Gohei, ceremonial talismans, foxfire and illusion.",
      "hook": "Whose confidence is she protecting—and what must she conceal to do it?",
      "lineage": "Pure-blood Kitsune",
      "year": 3
    },
    "kazuma-shido": {
      "role": "Student Council Vice President · Hunters",
      "lead": "A principled deputy whose sense of order rarely bends.",
      "background": "Kazuma guards the council's authority with measured formality, though his peers sometimes see his rules as a shield against doubt.",
      "style": "Nodachi, binding cords and coordinated discipline.",
      "hook": "How far can duty stretch before it breaks trust?",
      "lineage": "Human",
      "year": 3
    },
    "liang-shuren": {
      "role": "Student Council Secretary · History",
      "lead": "A dreamy observer who misses far less than he appears to.",
      "background": "Liang's Baku lineage is reflected in his soft-spoken manner and fascination with the uncertain edge of dreams.",
      "style": "Iron folding fan, ink-script talismans and dream records.",
      "hook": "He may have noticed a pattern everyone else believes is coincidence.",
      "lineage": "Half-Baku",
      "year": 3
    },
    "chiyo-komori": {
      "role": "Student Council Welfare Officer · Healing",
      "lead": "Unfailingly lively, with a guardian's instinct.",
      "background": "Chiyo's quarter-Nekomata heritage lends her swift reactions and playful confidence, but welfare is a role she takes seriously.",
      "style": "Tekko-kagi hand claws, silk cords and restorative talismans.",
      "hook": "A smiling reassurance sometimes costs her more than she lets on.",
      "lineage": "Quarter-Nekomata",
      "year": 2
    },
    "maribel": {
      "role": "The Hollow Lantern · Familiar Face",
      "lead": "An antlered hostess who belongs to more than one world.",
      "background": "Maribel's white hair and amber slit-pupil eyes betray her mixed human-demon ancestry. At the Hollow Lantern, she has learned to read both the danger and the loneliness in a guest's arrival.",
      "style": "Hospitality, keen observation and practical survival.",
      "hook": "What would make her finally leave the tavern behind?",
      "lineage": "Half-human, half-demon"
    },
    "mr-hollow": {
      "role": "The Hollow Lantern · Patron",
      "lead": "A human host whose generosity feels one question too generous.",
      "background": "In his burgundy waistcoat, white shirt and dark coat, Mr. Hollow greets strangers with disarming warmth. He is entirely human, though his tavern seems to know far more than its walls should.",
      "style": "Negotiation, discretion and an unnervingly good memory.",
      "hook": "Why does he always seem to be expecting the next visitor?",
      "lineage": "Human"
    },
    "lady-utsugi-saigetsu": {
      "role": "Court of a Hundred Masks · Head",
      "lead": "A demonic sovereign who has never mistaken courtesy for weakness.",
      "background": "Lady Utsugi rules by obligation, titles and the power of an invitation accepted. Her audiences are dangerous precisely because they appear civilised.",
      "style": "Courtly pacts, masked etiquette and political pressure.",
      "hook": "Which debt could threaten the Court more than open war?"
    },
    "lord-enji-kurobane": {
      "role": "Court of a Hundred Masks · Court Duelist",
      "lead": "An aristocratic blade whose loyalties are part of the performance.",
      "background": "Enji's place within the Court is secured by skill and spectacle. He treats challenges as negotiations conducted at swordpoint.",
      "style": "Formal duels and ceremonial violence.",
      "hook": "Would he defend the Court's honour if its ruler were in the wrong?"
    },
    "kohana-menreika": {
      "role": "Court of a Hundred Masks · Mask Envoy",
      "lead": "A messenger who is never quite the face she presents.",
      "background": "Kohana carries the Court's invitations and unwritten threats across boundaries that few mortals can cross safely.",
      "style": "Masks, deception and bargains.",
      "hook": "Does the envoy ever carry a message that is truly her own?"
    },
    "yoru-shinkai": {
      "role": "The Hollow Sutra · Leader",
      "lead": "The still voice at the heart of an impossible scripture.",
      "background": "Yoru's cult teaches that existence is a dream and that awakening will destroy every comforting law. His composure makes the doctrine more frightening.",
      "style": "Forbidden rites, eldritch study and ideological command.",
      "hook": "What did Yoru witness before he first spoke of waking?"
    },
    "sumi-arata": {
      "role": "The Hollow Sutra · Manuscript Blade",
      "lead": "A disciplined guardian of texts best left unread.",
      "background": "Sumi interprets obedience as a form of revelation, guarding cult records with a severity that leaves little room for doubt.",
      "style": "Ritual manuscripts, hidden blades and counterseals.",
      "hook": "A missing page might undermine everything Sumi has sworn to protect."
    },
    "hoshi-kaimon": {
      "role": "The Hollow Sutra · Veil Listener",
      "lead": "A listener attuned to voices that no ordinary ear should hear.",
      "background": "Hoshi searches the spaces between spoken prayers for signs of a world that has not yet awakened.",
      "style": "Resonance, omen-reading and unorthodox rites.",
      "hook": "What happens when the voice falls silent?"
    },
    "aoi-mitsurugi": {
      "role": "Shrine Concordat · Head Keeper",
      "lead": "A guardian for whom sanctuary is a sacred obligation.",
      "background": "Aoi protects the network of shrine communities, ensuring that wards, safe roads and offerings survive wars between stronger factions.",
      "style": "Consecration, shrine authority and protective rites.",
      "hook": "Will she risk an ancient sanctuary to save strangers beyond its protection?"
    },
    "natsume-kohana": {
      "role": "Shrine Concordat · Purification Archer",
      "lead": "A watchful archer who prefers warning to punishment.",
      "background": "Natsume patrols boundaries where travellers mistake spiritual omens for ordinary weather.",
      "style": "Purification arrows and distant warding.",
      "hook": "A road she guards has begun to lead elsewhere."
    },
    "brother-daichi-morisada": {
      "role": "Shrine Concordat · Guardian Warden",
      "lead": "A patient sentinel who stays when others flee.",
      "background": "Brother Daichi treats a shrine's refuge as inviolate, standing between frightened visitors and threats far beyond them.",
      "style": "Guardian arms, defensive rites and sanctuary watch.",
      "hook": "How much of himself will he spend keeping the doors open?"
    },
    "shirakawa-kage": {
      "role": "Nameless Blades · Leader",
      "lead": "The Unbound leads without pretending the group is an army.",
      "background": "Shirakawa accepts contracts that powerful institutions would rather ignore, gathering capable wanderers who dislike being commanded.",
      "style": "Wandering bladecraft, contracts and quiet strategy.",
      "hook": "Which unpaid debt keeps the Nameless Blades moving?"
    },
    "kurogane-rei": {
      "role": "Nameless Blades · Wandering Blade",
      "lead": "A reserved sword who measures every promise in action.",
      "background": "Rei trusts the road more than declarations. In the Nameless Blades, independence is a discipline, not a slogan.",
      "style": "Katana and adaptable field techniques.",
      "hook": "An old name resurfaces on a contract she refuses to explain."
    },
    "kasumi-nagi": {
      "role": "Nameless Blades · Mercenary",
      "lead": "A laughing opportunist with an eye for exits.",
      "background": "Nagi reads a room quickly and rarely allows a job to become a prison. Loyalty comes slowly, but once earned it may surprise her.",
      "style": "Hidden kunai and improvisational ambushes.",
      "hook": "What reward would make her abandon a profitable contract?"
    },
    "tatsuya-kagetsu": {
      "role": "Independent Legendary Hunter · Raiju",
      "lead": "The Tempest Fang: a woman who walks at the edge of thunder.",
      "background": "Tatsuya's Raiju lineage fuels her terrible speed and fierce presence. She hunts by conviction rather than any academy charter.",
      "style": "Lightning-charged hunter arms and relentless pursuit.",
      "hook": "Who taught the storm to recognise her name?",
      "lineage": "Raiju divine-beast lineage",
      "affiliation": "Independent"
    },
    "shizuru-nuehara": {
      "role": "Independent Legendary Hunter · Kitsune",
      "lead": "The Crimson Mirage: a fox spirit who knows the weakness of any bargain.",
      "background": "Shizuru's pure-blood Kitsune ancestry grants her an unsettling command of illusion and foxfire. She owes allegiance to no hunter order.",
      "style": "Ritual fans, foxfire and misdirection.",
      "hook": "Which bargain is she still trying to undo?",
      "lineage": "Pure-blood Kitsune",
      "affiliation": "Independent"
    },
    "longqi-seiran": {
      "role": "Independent Legendary Hunter · Qilin",
      "lead": "The Wandering Qilin: a guardian who rarely raises her weapon first.",
      "background": "Lóngqí bears auspicious Qilin heritage and walks roads forgotten by governments and maps. Her strength is most visible when she chooses restraint.",
      "style": "Jade warding polearm and protective rites.",
      "hook": "What will force a merciful hunter to become a judge?",
      "lineage": "Qilin divine-beast lineage",
      "affiliation": "Independent"
    }
  }
};
