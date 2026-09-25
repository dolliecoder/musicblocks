(function (root, _) {
    if (!_) {
        if (typeof module !== "undefined" && module.exports) {
            _ = require("./utils")._;
        } else if (typeof window !== "undefined" && window._) {
            _ = window._;
        }
    }

    /**
     * Scalable sinewave graphic.
     * @const
     * @type {string}
     */
    const SYNTHSVG =
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?> <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" y="0px" xml:space="preserve" x="0px" width="SVGWIDTHpx" viewBox="0 0 SVGWIDTH 55" version="1.1" height="55px" enable-background="new 0 0 SVGWIDTH 55"><g transform="scale(XSCALE,1)"><path d="m 1.5,27.5 c 0,0 2.2,-17.5 6.875,-17.5 4.7,0.0 6.25,11.75 6.875,17.5 0.75,6.67 2.3,17.5 6.875,17.5 4.1,0.0 6.25,-13.6 6.875,-17.5 C 29.875,22.65 31.1,10 35.875,10 c 4.1,0.0 5.97,13.0 6.875,17.5 1.15,5.7 1.75,17.5 6.875,17.5 4.65,0.0 6.875,-17.5 6.875,-17.5" style="stroke:#90c100;fill-opacity:1;fill:none;stroke-width:STROKEWIDTHpx;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" /></g></svg>';

    /**
     * Notes graphics.
     * @const
     * @type {string}
     */
    const WHOLENOTE =
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg6468" viewBox="0 0 5.1680003 12.432" height="12.432" width="5.1680002"> <g transform="translate(-375.23523,-454.37592)"> <g transform="translate(7.9606,5.6125499)" style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"> <path d="m 369.80263,457.99537 q 1.104,0 1.872,0.432 0.768,0.416 0.768,1.2 0,0.752 -0.752,1.168 -0.752,0.4 -1.808,0.4 -1.104,0 -1.856,-0.416 -0.752,-0.416 -0.752,-1.232 0,-0.576 0.464,-0.944 0.48,-0.368 1.008,-0.48 0.528,-0.128 1.056,-0.128 z m -0.864,1.136 q 0,0.672 0.304,1.184 0.304,0.512 0.784,0.512 0.736,0 0.736,-0.8 0,-0.64 -0.304,-1.136 -0.288,-0.512 -0.8,-0.512 -0.72,0 -0.72,0.752 z" /> </g> </g> </svg>';

    const HALFNOTE =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.84 12.432" height="3.5085866mm" width="1.0837333mm"> <g transform="translate(-375.23523,-454.37592)"> <g style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"> <path d="m 375.23523,465.70392 q 0,-0.832 0.816,-1.472 0.816,-0.656 1.728,-0.656 0.528,0 0.944,0.272 l 0,-9.472 0.352,0 0,10.352 q 0,0.896 -0.784,1.488 -0.784,0.592 -1.728,0.592 -0.528,0 -0.928,-0.304 -0.4,-0.32 -0.4,-0.8 z m 0.736,0.48 q 0.848,0 1.712,-0.72 0.88,-0.72 0.88,-1.072 0,-0.224 -0.192,-0.224 -0.592,0 -1.632,0.688 -1.024,0.672 -1.024,1.12 0,0.208 0.256,0.208 z" /> </g> </g> </svg>';

    const QUARTERNOTE =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.0859801 11.74224" height="3.313921mm" width="1.1531544mm"> <g transform="translate(-226.1339,-457.841)"> <g style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"> <path d="m 229.60268,457.841 0.5625,0 0.0547,0.0625 0,10.02344 q 0,1.27344 -1.53125,1.625 l -0.375,0.0313 -0.27343,0 q -1.65625,0 -1.875,-1.03906 l -0.0313,-0.24219 q 0,-1.01562 1.64843,-1.20312 l 0.25782,-0.0391 q 0.77343,0 1.47656,0.5 l 0.0313,0 0,-9.65625 0.0547,-0.0625 z" /> </g> </g> </svg>';

    const EIGHTHNOTE =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.5234898 11.7422" height="3.3139098mm" width="2.123296mm"> <g transform="translate(-244.80575,-403.5553)"> <g style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"> <path d="m 248.14955,403.5553 0.67969,0 0.0625,0.0547 0,0.30468 q 0.21094,0.42188 1.5625,0.91407 1.875,0.54687 1.875,1.625 0,1.14062 -0.95313,1.89062 l -0.0313,0 -0.23437,-0.25 q 0.47656,-0.38281 0.47656,-1.03906 0,-0.54688 -1.78125,-1.10156 -0.71875,-0.32813 -0.91406,-0.53125 l 0,8.32812 q 0,1.19531 -1.75,1.54688 l -0.44531,0 q -1.89063,0 -1.89063,-1.3125 0,-1.02344 1.65625,-1.20313 l 0.17969,0 q 0.75,0 1.44531,0.5 l 0,-9.67187 0.0625,-0.0547 z" /> </g> </g> </svg>';

    const SIXTEENTHNOTE =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.0080001 12.432" height="3.5085866mm" width="1.9778134mm"> <g transform="translate(-182.21292,-431.51877)"> <g style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"> <path d="m 182.21292,442.84677 q 0,-0.832 0.816,-1.472 0.816,-0.656 1.728,-0.656 0.528,0 0.944,0.272 l 0,-9.472 0.336,0 q 0.064,0.56 0.4,1.088 0.352,0.512 0.8,0.944 0.448,0.416 0.88,0.864 0.448,0.432 0.752,1.024 0.304,0.576 0.304,1.232 0,0.544 -0.256,1.104 0.304,0.448 0.304,1.184 0,1.232 -0.608,2.24 l -0.384,0 q 0.56,-1.12 0.56,-2.032 0,-0.512 -0.256,-0.96 -0.24,-0.448 -0.752,-0.816 -0.496,-0.368 -0.832,-0.56 -0.32,-0.192 -0.896,-0.48 l 0,5.52 q 0,0.896 -0.784,1.488 -0.784,0.592 -1.728,0.592 -0.528,0 -0.928,-0.304 -0.4,-0.32 -0.4,-0.8 z m 6.464,-5.904 q 0,-1.648 -2.624,-3.072 0,0.464 0.192,0.88 0.192,0.416 0.512,0.752 0.32,0.32 0.656,0.592 0.336,0.272 0.688,0.608 0.352,0.32 0.544,0.608 0.032,-0.256 0.032,-0.368 z" /> </g> </g> </svg>';

    const THIRTYSECONDNOTE =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.0080001 14.496001" height="4.0910935mm" width="1.9778134mm"> <g transform="translate(-630.78433,-240.88335)">  <g  style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1">  <path  d="m 630.78433,254.27535 q 0,-0.832 0.816,-1.472 0.816,-0.656 1.728,-0.656 0.528,0 0.944,0.272 l 0,-11.536 0.352,0 q 0.048,0.56 0.384,1.072 0.336,0.496 0.768,0.912 0.432,0.4 0.864,0.848 0.432,0.448 0.72,1.104 0.304,0.656 0.304,1.456 0,0.48 -0.16,1.056 0.224,0.416 0.224,0.912 0,0.512 -0.24,0.976 0.304,0.448 0.304,1.168 0,1.232 -0.608,2.24 l -0.384,0 q 0.56,-1.12 0.56,-2.032 0,-0.512 -0.256,-0.96 -0.24,-0.448 -0.752,-0.816 -0.496,-0.368 -0.832,-0.56 -0.32,-0.192 -0.896,-0.48 l 0,5.52 q 0,0.896 -0.784,1.488 -0.784,0.592 -1.728,0.592 -0.528,0 -0.928,-0.304 -0.4,-0.32 -0.4,-0.8 z m 6.448,-7.872 q 0,-0.496 -0.208,-0.928 -0.192,-0.432 -0.64,-0.832 -0.432,-0.416 -0.784,-0.672 -0.352,-0.256 -0.976,-0.656 0.032,0.448 0.352,0.896 0.32,0.432 0.704,0.752 0.4,0.32 0.848,0.8 0.464,0.464 0.704,0.912 l 0,-0.272 z m 0,2.096 q 0,-0.4 -0.16,-0.768 -0.144,-0.368 -0.32,-0.608 -0.16,-0.256 -0.592,-0.608 -0.416,-0.352 -0.672,-0.528 -0.256,-0.176 -0.848,-0.576 0.064,0.48 0.4,0.976 0.336,0.48 0.72,0.816 0.4,0.336 0.832,0.784 0.448,0.432 0.64,0.784 l 0,-0.272 z" /> </g> </g> </svg>';

    const SIXTYFOURTHNOTE =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.0080001 14.528" height="4.1001244mm" width="1.9778134mm"> <g transform="translate(-345.3223,-325.39492)"> <g transform="translate(3.1093785,1.6864426)" style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"> <path d="m 342.21292,337.13248 q 0,-0.832 0.816,-1.472 0.816,-0.656 1.728,-0.656 0.528,0 0.944,0.272 l 0,-11.568 0.336,0 q 0.064,0.64 0.384,1.104 0.336,0.464 0.752,0.768 0.416,0.304 0.832,0.656 0.416,0.336 0.688,0.928 0.288,0.592 0.288,1.44 0,0.24 -0.144,0.768 0.256,0.608 0.256,1.376 0,0.32 -0.16,0.896 0.224,0.416 0.224,0.912 0,0.496 -0.24,0.96 0.304,0.448 0.304,1.024 0,0.384 -0.08,0.688 -0.08,0.304 -0.16,0.448 -0.08,0.144 -0.368,0.608 l -0.384,0 q 0.08,-0.16 0.192,-0.368 0.112,-0.224 0.16,-0.32 0.064,-0.096 0.112,-0.24 0.064,-0.144 0.08,-0.288 0.016,-0.144 0.016,-0.32 0,-0.272 -0.096,-0.512 -0.08,-0.256 -0.176,-0.432 -0.096,-0.192 -0.32,-0.4 -0.224,-0.208 -0.368,-0.32 -0.144,-0.128 -0.464,-0.304 -0.304,-0.192 -0.432,-0.256 -0.128,-0.064 -0.48,-0.224 -0.336,-0.176 -0.4,-0.208 l 0,4.064 q 0,0.896 -0.784,1.488 -0.784,0.592 -1.728,0.592 -0.528,0 -0.928,-0.304 -0.4,-0.32 -0.4,-0.8 z m 6.352,-8.384 q 0,-0.352 -0.144,-0.688 -0.128,-0.352 -0.288,-0.576 -0.16,-0.224 -0.48,-0.496 -0.32,-0.272 -0.512,-0.4 -0.192,-0.144 -0.592,-0.384 -0.384,-0.24 -0.496,-0.32 0.032,0.432 0.352,0.832 0.32,0.384 0.704,0.656 0.4,0.272 0.816,0.72 0.432,0.432 0.624,0.912 0.016,-0.176 0.016,-0.256 z m 0.016,2.128 q 0,-0.208 -0.048,-0.4 -0.032,-0.192 -0.08,-0.336 -0.048,-0.16 -0.176,-0.336 -0.128,-0.176 -0.208,-0.288 -0.08,-0.112 -0.272,-0.272 -0.192,-0.176 -0.288,-0.256 -0.096,-0.08 -0.352,-0.256 -0.24,-0.176 -0.336,-0.224 -0.096,-0.064 -0.384,-0.24 -0.288,-0.192 -0.384,-0.256 0.032,0.464 0.368,0.88 0.336,0.416 0.736,0.704 0.4,0.272 0.816,0.688 0.416,0.416 0.576,0.864 0.032,-0.192 0.032,-0.272 z m -0.016,1.936 q 0,-0.848 -0.624,-1.504 -0.608,-0.672 -1.872,-1.392 0.064,0.464 0.384,0.896 0.336,0.416 0.72,0.688 0.4,0.272 0.8,0.704 0.4,0.416 0.576,0.88 0.016,-0.064 0.016,-0.272 z" /> </g> </g> </svg>';

    // Is there a "proper" double-sharp symbol as well? I see this from wikipedia: U+1D12A 𝄪 MUSICAL SYMBOL DOUBLE SHARP (HTML &#119082;) (https://en.wikipedia.org/wiki/Double_sharp)

    /**
     * Symbol for a sharp note.
     * @constant {string}
     * @default
     */
    const SHARP = "♯";

    /**
     * Symbol for a flat note.
     * @constant {string}
     * @default
     */
    const FLAT = "♭";

    /**
     * Symbol for cents.
     *
     * Cents are a logarithmic unit for measuring musical intervals:
     *   - 1 cent = 1/1200 of an octave (12-EDO semitone = 100 cents)
     *   - To convert a ratio to cents: cents = 1200 * log2(ratio)
     *   - To convert cents to a frequency multiplier: multiplier = 2^(cents/1200)
     *
     * Examples:
     *   12-EDO step = 100 ¢ (1200 / 12)
     *   5-EDO  step = 240 ¢ (1200 / 5)
     *   19-EDO step ≈ 63.16 ¢ (1200 / 19)
     *
     * Example: A4 = 440 Hz, A4 + 33 ¢ = 440 * 2^(33/1200) ≈ 448.17 Hz
     *
     * @constant {string}
     * @default
     */
    const CENTSSYMBOL = "\u00A2";

    /**
     * Symbol for a natural note.
     * @constant {string}
     * @default
     */
    const NATURAL = "♮";

    /**
     * Symbol for a double sharp note.
     * @constant {string}
     * @default
     */
    const DOUBLESHARP = "𝄪";

    /**
     * Symbol for a double flat note.
     * @constant {string}
     * @default
     */
    const DOUBLEFLAT = "𝄫";

    /**
     * Maps from notes with flats to their corresponding notes with '♭' (flat) symbol.
     * @constant {Object.<string, string>}
     */
    const BTOFLAT = {
        Eb: "E" + FLAT,
        Gb: "G" + FLAT,
        Ab: "A" + FLAT,
        Bb: "B" + FLAT,
        Db: "D" + FLAT,
        Cb: "C" + FLAT,
        Fb: "F" + FLAT,
        eb: "E" + FLAT,
        gb: "G" + FLAT,
        ab: "A" + FLAT,
        bb: "B" + FLAT,
        db: "D" + FLAT,
        cb: "C" + FLAT,
        fb: "F" + FLAT
    };

    /**
     * Maps from notes with flats to their corresponding notes with '♯' (sharp) symbol.
     * @constant {Object.<string, string>}
     */
    const STOSHARP = {
        "E#": "E" + SHARP,
        "G#": "G" + SHARP,
        "A#": "A" + SHARP,
        "B#": "B" + SHARP,
        "D#": "D" + SHARP,
        "C#": "C" + SHARP,
        "F#": "F" + SHARP,
        "e#": "E" + SHARP,
        "g#": "G" + SHARP,
        "a#": "A" + SHARP,
        "b#": "B" + SHARP,
        "d#": "D" + SHARP,
        "c#": "C" + SHARP,
        "f#": "F" + SHARP
    };

    /**
     * Array containing the solfege names for the chromatic scale.
     * @constant {string[]}
     */
    const CHROMATIC_SOLFEGE = [
        "Do", // 0
        "Di", // 1
        "Re", // 2
        "Ri", // 3
        "Mi", // 4
        "Fa", // 5
        "Fi", // 6
        "Sol", // 7
        "Si", // 8
        "La", // 9
        "Li", // 10
        "Ti" // 11
    ];

    /**
     * Array of notes with sharps.
     * @constant {string[]}
     */
    const NOTESSHARP = [
        "C",
        "C" + SHARP,
        "D",
        "D" + SHARP,
        "E",
        "F",
        "F" + SHARP,
        "G",
        "G" + SHARP,
        "A",
        "A" + SHARP,
        "B"
    ];

    /**
     * Array of notes with flats.
     * @constant {string[]}
     */
    const NOTESFLAT = [
        "C",
        "D" + FLAT,
        "D",
        "E" + FLAT,
        "E",
        "F",
        "G" + FLAT,
        "G",
        "A" + FLAT,
        "A",
        "B" + FLAT,
        "B"
    ];

    /**
     * Array of lowercase notes with flats.
     * @constant {string[]}
     */
    const NOTESFLAT2 = [
        "c",
        "d" + FLAT,
        "d",
        "e" + FLAT,
        "e",
        "f",
        "g" + FLAT,
        "g",
        "a" + FLAT,
        "a",
        "b" + FLAT,
        "b"
    ];

    /**
     * Equivalent flats for various notes.
     * @const
     * @type {Object.<string, string>}
     */
    const EQUIVALENTFLATS = {
        "C♯": "D" + FLAT,
        "D♯": "E" + FLAT,
        "F♯": "G" + FLAT,
        "G♯": "A" + FLAT,
        "A♯": "B" + FLAT
    };

    /**
     * Equivalent sharps for various notes.
     * @const
     * @type {Object.<string, string>}
     */
    const EQUIVALENTSHARPS = {
        "D♭": "C" + SHARP,
        "E♭": "D" + SHARP,
        "G♭": "F" + SHARP,
        "A♭": "G" + SHARP,
        "B♭": "A" + SHARP
    };

    /**
     * Maps from notes with specific accidentals to their equivalent natural notes.
     * @constant {Object.<string, string>}
     */
    const EQUIVALENTNATURALS = {
        "E♯": "F",
        "B♯": "C",
        "C♭": "B",
        "F♭": "E",
        "D𝄪": "E",
        "A𝄪": "B",
        "G𝄪": "A",
        "E𝄪": "F♯",
        "C𝄪": "D",
        "F𝄪": "G",
        "B𝄪": "C♯",
        "C𝄫": "B♭",
        "D𝄫": "C",
        "E𝄫": "D",
        "F𝄫": "E♭",
        "G𝄫": "F",
        "A𝄫": "G",
        "B𝄫": "A",
        // Two-character forms (from _parse_pitch_string normalization)
        "D♯♯": "E",
        "A♯♯": "B",
        "G♯♯": "A",
        "E♯♯": "F♯",
        "C♯♯": "D",
        "F♯♯": "G",
        "B♯♯": "C♯",
        "C♭♭": "B♭",
        "D♭♭": "C",
        "E♭♭": "D",
        "F♭♭": "E♭",
        "G♭♭": "F",
        "A♭♭": "G",
        "B♭♭": "A"
    };

    /**
     * Maps from natural notes to their equivalent notes with specific accidentals.
     * @constant {Object.<string, string>}
     */
    const EQUIVALENTACCIDENTALS = { F: "E♯", C: "B♯", B: "C♭", E: "F♭", G: "F𝄪", D: "C𝄪", A: "G𝄪" };

    /**
     * Converts a note down to a flat note.
     * @const
     * @type {Object.<string, string>}
     */
    const CONVERT_DOWN = {
        "C": "B" + SHARP,
        "C♭": "B",
        "D♭": "C" + SHARP,
        "E♭": "D" + SHARP,
        "F": "E" + SHARP,
        "F♭": "E",
        "G♭": "F" + SHARP,
        "A♭": "G" + SHARP,
        "B♭": "A" + SHARP
    };

    /**
     * Maps from notes with specific accidentals to their equivalent notes after a double-down transposition.
     * @constant {Object.<string, string>}
     */
    const CONVERT_DOUBLE_DOWN = {
        "C♯": "B" + DOUBLESHARP,
        "D": "C" + DOUBLESHARP,
        "E": "D" + DOUBLESHARP,
        "F♯": "E" + DOUBLESHARP,
        "G": "F" + DOUBLESHARP,
        "A": "G" + DOUBLESHARP,
        "B": "A" + DOUBLESHARP
    };

    /**
     * Maps from notes with specific accidentals to their equivalent notes after an up transposition.
     * @constant {Object.<string, string>}
     */
    const CONVERT_UP = {
        "C♯": "D" + FLAT,
        "D♯": "E" + FLAT,
        "E♯": "F",
        "E": "F" + FLAT,
        "F♯": "G" + FLAT,
        "G♯": "A" + FLAT,
        "A♯": "B" + FLAT,
        "B♯": "C",
        "B": "C" + FLAT
    };

    /**
     * Maps from notes with specific accidentals to their equivalent notes after a double-up transposition.
     * @constant {Object.<string, string>}
     */
    const CONVERT_DOUBLE_UP = {
        "C": "D" + DOUBLEFLAT,
        "D": "E" + DOUBLEFLAT,
        "E♭": "F" + DOUBLEFLAT,
        "F": "G" + DOUBLEFLAT,
        "G": "A" + DOUBLEFLAT,
        "A": "B" + DOUBLEFLAT,
        "B♭": "C" + DOUBLEFLAT
    };

    /**
     * Extra transpositions for specific notes with accidentals.
     * @constant {Object.<string, [string, number]>}
     */
    const EXTRATRANSPOSITIONS = {
        "E♯": ["F", 0],
        "B♯": ["C", 1],
        "C♭": ["B", -1],
        "F♭": ["E", 0],
        "e♯": ["F", 0],
        "b♯": ["C", 1],
        "c♭": ["B", -1],
        "f♭": ["E", 0]
    };

    /**
     * Array containing the solfege names for the diatonic scale.
     * @constant {string[]}
     */
    const SOLFEGENAMES = ["do", "re", "mi", "fa", "sol", "la", "ti"];

    /**
     * Array containing the solfege names for the chromatic scale.
     * @constant {string[]}
     */
    const SOLFEGENAMES1 = [
        "do",
        "do" + SHARP,
        "do" + DOUBLESHARP,
        "re" + DOUBLEFLAT,
        "re" + FLAT,
        "re",
        "re" + SHARP,
        "re" + DOUBLESHARP,
        "mi" + DOUBLEFLAT,
        "mi" + FLAT,
        "mi",
        "fa",
        "fa" + SHARP,
        "fa" + DOUBLESHARP,
        "sol" + DOUBLEFLAT,
        "sol" + FLAT,
        "sol",
        "sol" + SHARP,
        "sol" + DOUBLESHARP,
        "la" + DOUBLEFLAT,
        "la" + FLAT,
        "la",
        "la" + SHARP,
        "la" + DOUBLESHARP,
        "ti" + DOUBLEFLAT,
        "ti" + FLAT,
        "ti"
    ];

    /**
     * Array containing the basic note names (without accidentals).
     * @constant {string[]}
     */
    const NOTENAMES = ["C", "D", "E", "F", "G", "A", "B"];

    /**
     * Array containing all possible note names, including double sharps/flats and triple sharps/flats.
     * @constant {string[]}
     */
    const ALLNOTENAMES = [
        "C",
        "C#",
        "Cx",
        "Dbb",
        "Db",
        "D",
        "D#",
        "Dx",
        "Ebb",
        "Eb",
        "E",
        "E#",
        "Ex",
        "Fbb",
        "Fb",
        "F",
        "F#",
        "Fx",
        "Gbb",
        "Gb",
        "G",
        "G#",
        "Gx",
        "Abb",
        "Ab",
        "A",
        "A#",
        "Ax",
        "Bbb",
        "Bb",
        "B",
        "B#",
        "Bx",
        "Cbb",
        "Cb"
    ];

    /**
     * Array containing note names with various accidentals (sharps and flats).
     * @constant {string[]}
     */
    const NOTENAMES1 = [
        "C",
        "C" + SHARP,
        "C" + DOUBLESHARP,
        "D" + DOUBLEFLAT,
        "D" + FLAT,
        "D",
        "D" + SHARP,
        "D" + DOUBLESHARP,
        "E" + DOUBLEFLAT,
        "E" + FLAT,
        "E",
        "F",
        "F" + SHARP,
        "F" + DOUBLESHARP,
        "G" + DOUBLEFLAT,
        "G" + FLAT,
        "G",
        "G" + SHARP,
        "G" + DOUBLESHARP,
        "A" + DOUBLEFLAT,
        "A" + FLAT,
        "A",
        "A" + SHARP,
        "A" + DOUBLESHARP,
        "B" + DOUBLEFLAT,
        "B" + FLAT,
        "B"
    ];

    /**
     * Maps from Western note names to their corresponding solfege names.
     * @constant {Object.<string, string>}
     */
    const SOLFEGECONVERSIONTABLE = {
        "C♭": "do" + FLAT,
        "C": "do",
        "C♯": "do" + SHARP,
        "D♭": "re" + FLAT,
        "D": "re",
        "D♯": "re" + SHARP,
        "E♭": "mi" + FLAT,
        "E": "mi",
        "F": "fa",
        "F♯": "fa" + SHARP,
        "G♭": "sol" + FLAT,
        "G": "sol",
        "G♯": "sol" + SHARP,
        "A♭": "la" + FLAT,
        "A": "la",
        "A♯": "la" + SHARP,
        "B♭": "ti" + FLAT,
        "B": "ti",
        "B♯": "ti" + SHARP,
        "R": _("rest")
    };

    /**
     * Maps from Western solfege names to their corresponding Carnatic solfege names.
     * @constant {Object.<string, string>}
     */
    const WESTERN2EISOLFEGENAMES = {
        do: "sa",
        re: "re",
        mi: "ga",
        fa: "ma",
        sol: "pa",
        la: "dha",
        ti: "ni"
    };

    /**
     * Array containing pitches with flats.
     * @constant {string[]}
     */
    const PITCHES = [
        "C",
        "D" + FLAT,
        "D",
        "E" + FLAT,
        "E",
        "F",
        "G" + FLAT,
        "G",
        "A" + FLAT,
        "A",
        "B" + FLAT,
        "B"
    ];

    /**
     * Array containing pitches with flats and sharps.
     * @constant {string[]}
     */
    const PITCHES1 = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

    /**
     * Array containing pitches with sharps.
     * @constant {string[]}
     */
    const PITCHES2 = [
        "C",
        "C" + SHARP,
        "D",
        "D" + SHARP,
        "E",
        "F",
        "F" + SHARP,
        "G",
        "G" + SHARP,
        "A",
        "A" + SHARP,
        "B"
    ];

    /**
     * Array containing pitches with sharps.
     * @constant {string[]}
     */
    const PITCHES3 = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    /**
     * Maps from numerical values to solfege names.
     * @constant {Object.<number, string>}
     */
    const NOTESTABLE = {
        1: "do",
        2: "do" + SHARP,
        3: "re",
        4: "re" + SHARP,
        5: "mi",
        6: "fa",
        7: "fa" + SHARP,
        8: "sol",
        9: "sol" + SHARP,
        10: "la",
        11: "la" + SHARP,
        0: "ti"
    };

    /**
     * Maps from fixed solfege names to their corresponding Western note names.
     * @constant {Object.<string, string>}
     */
    const FIXEDSOLFEGE = {
        do: "C",
        re: "D",
        mi: "E",
        fa: "F",
        sol: "G",
        la: "A",
        ti: "B"
    };

    /**
     * Maps from fixed solfege names with accidentals to their corresponding Western note names.
     * @constant {Object.<string, string>}
     */
    const FIXEDSOLFEGE1 = {
        "do𝄫": "B" + FLAT,
        "do♭": "C" + FLAT,
        "do": "C",
        "do♯": "C" + SHARP,
        "do𝄪": "D",
        "re𝄫": "C",
        "re♭": "D" + FLAT,
        "re": "D",
        "re♯": "D" + SHARP,
        "re𝄪": "E",
        "mi𝄫": "D",
        "mi♭": "E" + FLAT,
        "mi": "E",
        "mi♯": "E" + SHARP,
        "mi𝄪": "F" + SHARP,
        "fa𝄫": "E" + FLAT,
        "fa♭": "F" + FLAT,
        "fa": "F",
        "fa♯": "F" + SHARP,
        "fa𝄪": "G",
        "sol𝄫": "F",
        "sol♭": "G" + FLAT,
        "sol": "G",
        "sol♯": "G" + SHARP,
        "sol𝄪": "A",
        "la𝄫": "G",
        "la♭": "A" + FLAT,
        "la": "A",
        "la♯": "A" + SHARP,
        "la𝄪": "B",
        "ti𝄫": "A",
        "ti♭": "B" + FLAT,
        "ti": "B",
        "ti♯": "B" + SHARP,
        "ti𝄪": "C" + SHARP,
        "R": _("rest")
    };

    /**
     * Maps from note names to their corresponding step numbers.
     * @constant {Object.<string, number>}
     */
    const NOTESTEP = { C: 1, D: 3, E: 5, F: 6, G: 8, A: 10, B: 12 };

    /**
     * Maps note names to their corresponding step numbers, including enharmonic equivalents.
     * @constant {Object.<number, string>}
     */
    const ALLNOTESTEP = {
        "Cb": 0,
        "C": 1,
        "C#": 2,
        "Db": 2,
        "D": 3,
        "D#": 4,
        "Eb": 4,
        "E": 5,
        "E#": 6,
        "Fb": 5,
        "F": 6,
        "F#": 7,
        "Gb": 7,
        "G": 8,
        "G#": 9,
        "Ab": 9,
        "A": 10,
        "A#": 11,
        "Bb": 11,
        "B": 12,
        "B#": 0
    };

    /**
     * semitone/intervalnumber --> lettergap/notenamesgap -->intervalnames
     * @constant {Object.<number, Object.<number,string>}
     */

    const SEMITONETOINTERVALMAP = {
        0: { 0: _("Perfect unison"), 1: _("Diminished second") },
        1: { 1: _("Minor second"), 0: _("Augmented unison") },
        2: { 1: _("Major second"), 2: _("Diminished third") },
        3: { 2: _("Minor third"), 1: _("Augmented second") },
        4: { 2: _("Major third"), 3: _("Diminished fourth") },
        5: { 3: _("Perfect fourth"), 2: _("Augmented third") },
        6: { 4: _("Diminished fifth"), 3: _("Augmented fourth") },
        7: { 4: _("Perfect fifth"), 5: _("Diminished sixth") },
        8: { 5: _("Minor sixth"), 4: _("Augmented fifth") },
        9: { 5: _("Major sixth"), 6: _("Diminished seventh") },
        10: { 6: _("Minor seventh"), 5: _("Augmented sixth") },
        11: { 6: _("Major seventh"), 0: _("Diminished octave") },
        12: { 0: _("Perfect octave"), 6: _("Augmented seventh") },
        13: { 1: _("Minor ninth"), 0: _("Augmented octave") },
        14: { 1: _("Major ninth"), 2: _("Diminished tenth") },
        15: { 2: _("Minor tenth"), 1: _("Augmented ninth") },
        16: { 2: _("Major tenth"), 3: _("Diminished eleventh") },
        17: { 3: _("Perfect eleventh"), 2: _("Augmented tenth") },
        18: { 4: _("Diminished twelfth"), 3: _("Augmented eleventh") },
        19: { 4: _("Perfect twelfth"), 5: _("Diminished thirteenth") },
        20: { 5: _("Minor thirteenth"), 4: _("Augmented fifth, plus an octave") },
        21: { 5: _("Major thirteenth"), 6: _("Diminished seventh, plus an octave") }
    };

    /**
     * Array containing preferences for keys with sharps.
     * @constant {string[]}
     */
    const SHARPPREFERENCE = [
        "g major",
        "d major",
        "a major",
        "e major",
        "b major",
        "f# major",
        "c# major",
        "e minor",
        "b minor",
        "f# minor",
        "c# minor",
        "g# minor",
        "d# minor"
    ];

    /**
     * Array containing preferences for keys with flats.
     * @constant {string[]}
     */
    const FLATPREFERENCE = [
        "f major",
        "bb major",
        "eb major",
        "ab major",
        "db major",
        "gb major",
        "cb major",
        "d minor",
        "g minor",
        "c minor",
        "f minor",
        "bb minor",
        "eb minor",
        "d harmonic minor",
        "g harmonic minor",
        "c harmonic minor",
        "f harmonic minor",
        "bb harmonic minor",
        "eb harmonic minor"
    ];

    /**
     * Internal representation of solfege notes used in selectors.
     * @constant {string[]}
     */
    const SOLFNOTES = ["ti", "la", "sol", "fa", "mi", "re", "do"];

    /**
     * Scale notes used in selectors.
     * @constant {string[]}
     */
    const SCALENOTES = ["7", "6", "5", "4", "3", "2", "1"];

    /**
     * Carnatic solfege notes.
     * @constant {string[]}
     */
    const EASTINDIANSOLFNOTES = ["ni", "dha", "pa", "ma", "ga", "re", "sa"];

    /**
     * Drum names used in selectors.
     * @constant {string[]}
     */
    const DRUMS = [
        "snare drum",
        "kick drum",
        "tom tom",
        "floor tom",
        "bass drum",
        "cup drum",
        "darbuka drum",
        "japanese drum",
        "hi hat",
        "ride bell",
        "cow bell",
        "triangle bell",
        "finger cymbals",
        "chime",
        "gong",
        "clang",
        "crash",
        "clap",
        "slap"
    ];

    /**
     * Graphics names used in selectors.
     * @constant {string[]}
     */
    const GRAPHICS = [
        "forward",
        "back",
        "right",
        "left",
        "set heading",
        "set color",
        "set shade",
        "set hue",
        "set grey",
        "set translucency",
        "set pen size"
    ];

    //The "original solfege" https://en.wikipedia.org/wiki/Solf%C3%A8ge#Origin
    // const ARETINIANSOLFNOTES = ['si', 'la', 'sol', 'fa', 'mi', 're', 'ut'];
    // https://en.wikipedia.org/wiki/Iroha
    // const IROHASOLFNOTES = ['ro', 'i', 'to', 'he', 'ho', 'ni', 'ha'];
    // const IROHASOLFNOTESJA = ['ロ','イ','ト','へ','ホ','二','ハ'];

    /**
     * Solfège attributes including double sharp, sharp, natural, flat, and double flat.
     * @constant {string[]}
     */
    const SOLFATTRS = [DOUBLESHARP, SHARP, NATURAL, FLAT, DOUBLEFLAT];

    //.TRANS: ordinal number. Please keep exactly one space between each number.
    /**
     * Ordinal numbers for degrees.
     * @constant {string}
     */
    const DEGREES = _("1st 2nd 3rd 4th 5th 6th 7th 8th 9th 10th 11th 12th");

    const EDO_NOTE_NAMES = {};

    const SHARP_NAMES = [
        "C",
        "C" + SHARP,
        "D",
        "D" + SHARP,
        "E",
        "F",
        "F" + SHARP,
        "G",
        "G" + SHARP,
        "A",
        "A" + SHARP,
        "B"
    ];

    /**
     * Number of semitones in an octave.
     * @constant {number}
     */
    const SEMITONES = 12;

    /**
     * Number of cents per semitone in 12-TET tuning.
     * @constant {number}
     */
    const CENTS_PER_SEMITONE = 100;

    /**
     * Number of cents in an octave.
     * Derived from SEMITONES for future temperament support.
     * @constant {number}
     */
    const CENTS_PER_OCTAVE = SEMITONES * CENTS_PER_SEMITONE;

    /**
     * Array representing powers of 2.
     * @constant {number[]}
     */
    const POWER2 = [1, 2, 4, 8, 16, 32, 64, 128];

    const TWELTHROOT2 = 1.0594630943592953;

    const TWELVEHUNDRETHROOT2 = 1.0005777895065549;

    /**
     * Frequency of A in octave 0, in Hz.
     * @constant {number}
     */
    const A0 = 27.5;

    /**
     * Frequency of C in octave 8, in Hz.
     * @constant {number}
     */
    const C8 = 4186.01;

    /**
     * Frequency of C in octave 10, in Hz.
     * @constant {number}
     */
    const C10 = 16744.04;

    /**
     * Height of the rhythm ruler.
     * @constant {number}
     */
    const RHYTHMRULERHEIGHT = 100;

    /**
     * Height of a staff note.
     * @constant {number}
     */
    const YSTAFFNOTEHEIGHT = 12.5;

    /**
     * Height of a staff octave.
     * @constant {number}
     */
    const YSTAFFOCTAVEHEIGHT = 87.5;

    /**
     * Height of a slider.
     * @constant {number}
     */
    const SLIDERHEIGHT = 200;

    /**
     * Width of a slider.
     * @constant {number}
     */
    const SLIDERWIDTH = 50;

    /**
     * Color of matrix buttons.
     * @constant {string}
     */
    const MATRIXBUTTONCOLOR = "#c374e9";

    /**
     * Color of matrix labels.
     * @constant {string}
     */
    const MATRIXLABELCOLOR = "#90c100";

    /**
     * Color of matrix note cells.
     * @constant {string}
     */
    const MATRIXNOTECELLCOLOR = "#b1db00";

    /**
     * Color of matrix tuplet cells.
     * @constant {string}
     */
    const MATRIXTUPLETCELLCOLOR = "#57e751";

    /**
     * Color of matrix rhythm cells.
     * @constant {string}
     */
    const MATRIXRHYTHMCELLCOLOR = "#c8c8c8";

    /**
     * Hover color of matrix buttons.
     * @constant {string}
     */
    const MATRIXBUTTONCOLORHOVER = "#c894e0";

    /**
     * Hover color of matrix note cells.
     * @constant {string}
     */
    const MATRIXNOTECELLCOLORHOVER = "#c2e820";

    /**
     * Width of matrix solfege.
     * @constant {number}
     */
    const MATRIXSOLFEWIDTH = 52;

    /**
     * Width of an eighth note.
     * @constant {number}
     */
    const EIGHTHNOTEWIDTH = 24;

    /**
     * Height of matrix buttons.
     * @constant {number}
     */
    const MATRIXBUTTONHEIGHT = 40;

    /**
     * Height of matrix buttons.
     * @constant {number}
     */
    const MATRIXBUTTONHEIGHT2 = 66;

    /**
     * Height of matrix solfege.
     * @constant {number}
     */
    const MATRIXSOLFEHEIGHT = 30;

    /**
     * Musical terms used in selectors that may require translation.
     * @constant {Array<string>}
     */
    const SELECTORSTRINGS = [
        //.TRANS: unison is a music term related to intervals
        _("unison"),
        //.TRANS: augmented is a music term related to intervals
        _("augmented"),
        //.TRANS: diminished is a music term related to intervals and mode
        _("diminished"),
        //.TRANS: minor is a music term related to intervals and mode
        _("minor"),
        //.TRANS: major is a music term related to intervals and mode
        _("major"),
        //.TRANS: perfect is a music term related to intervals
        _("perfect"),
        //.TRANS: twelve semi-tone scale for music
        _("chromatic"),
        _("algerian"),
        _("spanish"),
        //.TRANS: modal scale in music
        _("octatonic"),
        //.TRANS: harmonic major scale in music
        _("harmonic major"),
        //.TRANS: natural minor scales in music
        _("natural minor"),
        //.TRANS: harmonic minor scale in music
        _("harmonic minor"),
        //.TRANS: melodic minor scale in music
        _("melodic minor"),
        //.TRANS: modal scale for music
        _("ionian"),
        //.TRANS: modal scale for music
        _("dorian"),
        //.TRANS: modal scale for music
        _("phrygian"),
        //.TRANS: modal scale for music
        _("lydian"),
        //.TRANS: modal scale for music
        _("mixolydian"),
        //.TRANS: modal scale for music
        _("aeolian"),
        //.TRANS: modal scale for music
        _("locrian"),
        //.TRANS: minor jazz scale for music
        _("jazz minor"),
        //.TRANS: bebop scale for music
        _("bebop"),
        _("arabic"),
        _("byzantine"),
        //.TRANS: musical scale for music by Verdi
        _("enigmatic"),
        _("ethiopian"),
        //.TRANS: Ethiopic scale for music
        _("geez"),
        _("hindu"),
        _("hungarian"),
        //.TRANS: minor Romanian scale for music
        _("romanian minor"),
        _("spanish gypsy"),
        //.TRANS: musical scale for Mid-Eastern music
        _("maqam"),
        //.TRANS: minor blues scale for music
        _("minor blues"),
        //.TRANS: major blues scale for music
        _("major blues"),
        _("whole tone"),
        //.TRANS: pentatonic is a general term that means "five note scale". This scale is typically known as "minor pentatonic"
        _("minor pentatonic"),
        //.TRANS: pentatonic is a general term that means "five note scale". This scale is typically known as "major pentatonic"
        _("major pentatonic"),
        _("chinese"),
        _("egyptian"),
        //.TRANS: https://en.wikipedia.org/wiki/Hirajoshi_scale NOTE: There are three different versions of this scale
        _("hirajoshi"),
        _("Japan"),
        //.TRANS: https://en.wikipedia.org/wiki/In_scale and https://en.wikipedia.org/wiki/Sakura_Sakura
        _("in"),
        //.TRANS: https://en.wikipedia.org/wiki/Miny%C5%8D_scale
        _("minyo"),
        //.TRANS: Italian mathematician
        _("fibonacci"),
        _("custom"),
        //.TRANS: highpass filter
        _("highpass"),
        //.TRANS: lowpass filter
        _("lowpass"),
        //.TRANS: bandpass filter
        _("bandpass"),
        //.TRANS: high-shelf filter
        _("highshelf"),
        //.TRANS: low-shelf filter
        _("lowshelf"),
        //.TRANS: notch-shelf filter
        _("notch"),
        //.TRANS: all-pass filter
        _("allpass"),
        //.TRANS: peaking filter
        _("peaking"),
        _("sine"),
        _("square"),
        _("triangle"),
        _("sawtooth"),
        //.TRANS: even numbers
        _("even"),
        //.TRANS: odd numbers
        _("odd"),
        _("scalar"),
        _("piano"),
        _("violin"),
        _("viola"),
        _("xylophone"),
        _("vibraphone"),
        _("cello"),
        _("bass"),
        _("double bass"),
        _("guitar"),
        _("sitar"),
        _("harmonium"),
        _("mandolin"),
        _("acoustic guitar"),
        _("flute"),
        _("clarinet"),
        _("saxophone"),
        _("tuba"),
        _("trumpet"),
        _("oboe"),
        _("trombone"),
        _("electronic synth"),
        _("simple 1"),
        _("simple 2"),
        _("simple 3"),
        _("simple 4"),
        _("white noise"),
        _("brown noise"),
        _("pink noise"),
        _("custom"),
        _("snare drum"),
        _("kick drum"),
        _("tom tom"),
        _("floor tom"),
        _("bass drum"),
        _("cup drum"),
        _("darbuka drum"),
        _("hi hat"),
        _("ride bell"),
        _("cow bell"),
        _("japanese drum"),
        // _('japanese bell'),
        _("triangle bell"),
        _("finger cymbals"),
        _("chime"),
        _("gong"),
        _("clang"),
        _("crash"),
        _("bottle"),
        _("clap"),
        _("slap"),
        _("splash"),
        _("bubbles"),
        _("raindrop"),
        _("cat"),
        _("cricket"),
        _("dog"),
        _("duck"),
        _("banjo"),
        _("koto"),
        _("dulcimer"),
        _("electric guitar"),
        _("bassoon"),
        _("celeste"),
        //.TRANS: musical temperament
        _("equal"),
        //.TRANS: musical temperament
        _("Pythagorean"),
        //.TRANS: musical temperament
        _("just intonation"),
        //.TRANS: musical temperament
        _("Meantone").toLowerCase(),
        _("custom"),
        //.TRANS: double flat is a music term related to pitch
        _("double flat"),
        //.TRANS: flat is a music term related to pitch
        _("flat"),
        //.TRANS: natural is a music term related to pitch
        _("natural"),
        //.TRANS: sharp is a music term related to pitch
        _("sharp"),
        //.TRANS: double sharp is a music term related to pitch
        _("double sharp"),
        // Chord names
        _("major"),
        _("minor"),
        _("augmented"),
        _("diminished"),
        _("major 7th"),
        _("minor 7th"),
        _("dominant 7th"),
        _("minor-major 7th"),
        _("fully-diminished 7th"),
        _("half-diminished 7th"),
        _("custom")
    ];

    /**
     * Labels for accidentals, including their names and symbols.
     * @constant {Array<string>}
     */
    const ACCIDENTALLABELS = [
        _("double sharp") + " " + DOUBLESHARP,
        _("sharp") + " " + SHARP,
        _("natural") + " " + NATURAL,
        _("flat") + " " + FLAT,
        _("double flat") + " " + DOUBLEFLAT
    ];

    /**
     * Names and symbols for accidentals.
     * @constant {Array<string>}
     */
    const ACCIDENTALNAMES = [
        "double sharp" + " " + DOUBLESHARP,
        "sharp" + " " + SHARP,
        "natural" + " " + NATURAL,
        "flat" + " " + FLAT,
        "double flat" + " " + DOUBLEFLAT
    ];

    /**
     * Numeric values associated with accidentals.
     * @constant {Array<number>}
     */
    const ACCIDENTALVALUES = [2, 1, 0, -1, -2];

    /**
     * Names of various chord types.
     * @constant {Array<string>}
     */
    const CHORDNAMES = [
        // scalar
        "triad (root position)",
        "triad (1st inversion)",
        "triad (2nd inversion)",
        "seventh (root position)",
        "seventh (1st inversion)",
        "seventh (2nd inversion)",
        "seventh (3rd inversion)",
        "ninth (root position)",
        "thirteenth (root position)",
        // semitone
        "major",
        "minor",
        "augmented",
        "diminished",
        "major 7th",
        "minor 7th",
        "dominant 7th",
        "minor-major 7th",
        "fully-diminished 7th",
        "half-diminished 7th",
        // custom must always be at the end of the list.
        "custom"
    ];

    /**
     * Default chord for the "major" scale.
     * @constant {string}
     */
    const DEFAULTCHORD = CHORDNAMES[9];

    /**
     * Numeric values representing the intervals in different chords.
     * @constant {Array<Array<Array<number>>>}
     */
    const CHORDVALUES = [
        //scalar
        [
            [0, 0],
            [2, 0],
            [4, 0]
        ],
        [
            [2, 0],
            [4, 0],
            [7, 0]
        ],
        [
            [-3, 0],
            [0, 0],
            [2, 0]
        ],
        [
            [0, 0],
            [2, 0],
            [4, 0],
            [6, 0]
        ],
        [
            [2, 0],
            [4, 0],
            [6, 0],
            [7, 0]
        ],
        [
            [-3, 0],
            [-1, 0],
            [0, 0],
            [2, 0]
        ],
        [
            [-1, 0],
            [0, 0],
            [2, 0],
            [4, 0]
        ],
        [
            [0, 0],
            [2, 0],
            [4, 0],
            [6, 0],
            [8, 0]
        ],
        [
            [0, 0],
            [2, 0],
            [4, 0],
            [6, 0],
            [12, 0]
        ],
        //semitone
        [
            [0, 0],
            [0, 4],
            [0, 7]
        ],
        [
            [0, 0],
            [0, 3],
            [0, 7]
        ],
        [
            [0, 0],
            [0, 4],
            [0, 8]
        ],
        [
            [0, 0],
            [0, 3],
            [0, 6]
        ],
        [
            [0, 0],
            [0, 4],
            [0, 7],
            [0, 11]
        ],
        [
            [0, 0],
            [0, 3],
            [0, 7],
            [0, 10]
        ],
        [
            [0, 0],
            [0, 4],
            [0, 7],
            [0, 10]
        ],
        [
            [0, 0],
            [0, 3],
            [0, 7],
            [0, 11]
        ],
        [
            [0, 0],
            [0, 3],
            [0, 6],
            [0, 9]
        ],
        [
            [0, 0],
            [0, 3],
            [0, 6],
            [0, 10]
        ],
        // custom is always at the end of the list
        [
            [0, 0],
            [0, 4],
            [0, 7]
        ]
    ];

    /**
     * Modes for inverting chords.
     * @constant {Array<Array<string>>}
     */
    const INVERTMODES = [
        [_("even"), "even"],
        [_("odd"), "odd"],
        [_("scalar"), "scalar"]
    ];

    /**
     * Musical intervals and their characteristics.
     * @constant {Array<Array<string>>}
     */
    const INTERVALS = [
        [_("perfect"), "perfect", [1, 4, 5, 8]],
        [_("minor"), "minor", [2, 3, 6, 7]],
        [_("diminished"), "diminished", [2, 3, 4, 5, 6, 7, 8]],
        [_("augmented"), "augmented", [1, 2, 3, 4, 5, 6, 7, 8]],
        [_("major"), "major", [2, 3, 6, 7]]
    ];

    /**
     * Values associated with specific musical intervals.
     * @constant {Object}
     */
    const INTERVALVALUES = {
        "perfect 1": [0, 0, 1 / 1],
        "diminished 2": [0, -1, 128 / 125],
        "augmented 1": [1, 1, 25 / 24],
        "chromatic semitone": [1, 1, 25 / 24],
        "minor 2": [1, -1, 16 / 15],
        "major 2": [2, 1, 9 / 8],
        "whole tone": [2, 1, 9 / 8],
        "diminished 3": [2, -1, 144 / 125],
        "augmented 2": [3, 1, 75 / 64],
        "minor 3": [3, -1, 6 / 5],
        "major 3": [4, 1, 5 / 4],
        "diminished 4": [4, -1, 32 / 25],
        "augmented 3": [5, 1, 125 / 96],
        "perfect 4": [5, 0, 4 / 3],
        "augmented 4": [6, 1, 25 / 18],
        "diminished 5": [6, -1, 36 / 25],
        "perfect 5": [7, 0, 3 / 2],
        "diminished 6": [7, -1, 192 / 125],
        "augmented 5": [8, 1, 25 / 16],
        "minor 6": [8, -1, 8 / 5],
        "major 6": [9, 1, 5 / 3],
        "diminished 7": [9, -1, 128 / 75],
        "augmented 6": [10, 1, 125 / 72],
        "minor 7": [10, -1, 16 / 9],
        "major 7": [11, 1, 15 / 8],
        "diminished 8": [11, -1, 48 / 25],
        "diminished octave": [11, -1, 48 / 25],
        "augmented 7": [12, 1, 125 / 64],
        "perfect 8": [12, 0, 2 / 1],
        "octave": [12, 0, 2 / 1],
        "augmented 8": [13, 1, 25 / 12]
    };

    /**
     * Modes available in the pie menu associated with the mode name block.
     * @constant {Object}
     */
    const MODE_PIE_MENUS = {
        "5": [
            "minor pentatonic",
            "major pentatonic",
            " ",
            "chinese",
            "egyptian",
            " ",
            "hirajoshi",
            "in",
            "minyo",
            " ",
            "fibonacci",
            " "
        ],
        "6": [
            "minor blues",
            " ",
            " ",
            " ",
            "major blues",
            " ",
            " ",
            " ",
            "whole tone",
            " ",
            " ",
            " "
        ],
        "7": [
            "ionian",
            " ",
            "dorian",
            " ",
            "phrygian",
            "lydian",
            " ",
            "mixolydian",
            " ",
            "aeolian",
            " ",
            "locrian"
        ],
        "7a": [
            "major",
            " ",
            "harmonic major",
            " ",
            "natural minor",
            " ",
            "harmonic minor",
            " ",
            "melodic minor",
            " ",
            " ",
            " "
        ],
        "7b": [
            "jazz minor",
            " ",
            "arabic",
            "byzantine",
            "enigmatic",
            "ethiopian",
            "geez",
            "hindu",
            "hungarian",
            "maqam",
            "romanian minor",
            "spanish gypsy"
        ],
        "8": [
            "octatonic",
            " ",
            "spanish",
            " ",
            "bebop",
            " ",
            "diminished",
            " ",
            " ",
            "algerian",
            " ",
            " "
        ],
        "12": ["chromatic", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        "custom": [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
    };

    /**
     * Fixed slot count shared by every mode pie menu ring. Both the workspace
     * piemenu (piemenus.js) and the mode widget piemenu (modewidget.js) lay the
     * mode names out on this many slots.
     * @constant {number}
     */
    const MODEPIEMENU_SLOT_COUNT = 12;

    /**
     * Ring geometry shared by the mode-selection pie menus so the group and name
     * rings render with identical proportions in both contexts.
     */
    const MODEPIEMENU_GROUP_RING = { minRadius: 0.15, maxRadius: 0.3 };

    const MODEPIEMENU_NAME_RING = { minRadius: 0.3, maxRadius: 0.85 };

    /**
     * Mid-radius of the mode-name ring (0.3-0.85), used to size each label to its
     * own slice arc.
     * @constant {number}
     */
    const MODEPIEMENU_NAME_TITLE_RADIUS = 0.575;

    /**
     * Font family and relative group-ring font size shared by both mode pie menus.
     * Font px is computed as GROUP_FONT_RATIO * wheelRadius so the same wheel
     * renders identically regardless of the paper resolution.
     */
    const MODEPIEMENU_FONT_FAMILY = "sans-serif";

    const MODEPIEMENU_GROUP_FONT_RATIO = 0.08;

    /**
     * Min/max per-slice font sizes for the mode-name ring, as a fraction of the
     * wheel radius. Kept proportional so both contexts clamp identically.
     */
    const MODEPIEMENU_NAME_FONT_MIN_RATIO = 0.06;

    const MODEPIEMENU_NAME_FONT_MAX_RATIO = 0.12;

    // The table contains the intervals that define the modes.
    // All of these modes assume 12 semitones per octave.
    // See http://www.pianoscales.org <== this is in no way definitive

    const PITCH_COLLECTIONS = {
        12: {
            chromatic: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        },
        8: {
            algerian: [2, 1, 2, 1, 1, 1, 3, 1],
            diminished: [2, 1, 2, 1, 2, 1, 2, 1],
            spanish: [1, 2, 1, 1, 1, 2, 2, 2],
            octatonic: [1, 2, 1, 2, 1, 2, 1, 2],
            bebop: [1, 1, 1, 2, 2, 1, 2, 2]
        },
        7: {
            "major": [2, 2, 1, 2, 2, 2, 1],
            "harmonic major": [2, 2, 1, 2, 1, 3, 1],
            "natural minor": [2, 1, 2, 2, 1, 2, 2],
            "harmonic minor": [2, 1, 2, 2, 1, 3, 1],
            "melodic minor": [2, 1, 2, 2, 2, 2, 1],
            "dorian": [2, 1, 2, 2, 2, 1, 2],
            "phrygian": [1, 2, 2, 2, 1, 2, 2],
            "lydian": [2, 2, 2, 1, 2, 2, 1],
            "mixolydian": [2, 2, 1, 2, 2, 1, 2],
            "locrian": [1, 2, 2, 1, 2, 2, 2],
            "arabic": [2, 2, 1, 1, 2, 2, 2],
            "byzantine": [1, 3, 1, 2, 1, 3, 1],
            "enigmatic": [1, 3, 2, 2, 2, 1, 1],
            "hindu": [2, 2, 1, 2, 1, 2, 2],
            "hungarian": [2, 1, 3, 1, 1, 3, 1],
            "romanian minor": [2, 1, 3, 1, 2, 1, 2],
            "spanish gypsy": [1, 3, 1, 2, 1, 2, 2]
        },
        6: {
            "minor blues": [3, 2, 1, 1, 3, 2],
            "major blues": [2, 1, 1, 3, 2, 3],
            "whole tone": [2, 2, 2, 2, 2, 2]
        },
        5: {
            "major pentatonic": [2, 2, 3, 2, 3],
            "minor pentatonic": [3, 2, 2, 3, 2],
            "chinese": [4, 2, 1, 4, 1],
            "egyptian": [2, 3, 2, 3, 2],
            "hirajoshi": [1, 4, 1, 4, 2],
            "in": [1, 4, 2, 1, 4],
            "fibonacci": [1, 1, 2, 3, 5],
            "alt pentatonic": [2, 3, 2, 2, 3]
        }
    };

    const PITCH_COLLECTION_ALIASES = {
        "ionian": "major",
        "minor": "natural minor",
        "aeolian": "natural minor",
        "ethiopian": "natural minor",
        "geez": "natural minor",
        "jazz minor": "melodic minor",
        "maqam": "byzantine",
        "minyo": "minor pentatonic"
    };

    const MUSICALMODES = {};

    /**
     * Maqam table mapping specific maqams to their corresponding keys.
     * @constant {Object}
     */
    const MAQAMTABLE = {
        "hijaz kar": "C maqam",
        "hijaz kar maqam": "C maqam",
        "shahnaz": "D maqam",
        "maqam mustar": "Eb maqam",
        "maqam jiharkah": "F maqam",
        "shadd araban": "G maqam",
        "suzidil": "A maqam",
        "ajam": "Bb maqam",
        "ajam maqam": "Bb maqam"
    };

    /**
     * Filter types used in audio processing.
     * @constant {Array<Array<string>>}
     */
    const FILTERTYPES = [
        [_("highpass"), "highpass"],
        [_("lowpass"), "lowpass"],
        [_("bandpass"), "bandpass"],
        [_("highshelf"), "highshelf"],
        [_("lowshelf"), "lowshelf"],
        [_("notch"), "notch"],
        [_("allpass"), "allpass"],
        [_("peaking"), "peaking"]
    ];

    /**
     * Oscillator types used in audio synthesis.
     * @constant {Array<Array<string>>}
     */
    const OSCTYPES = [
        [_("sine"), "sine"],
        [_("square"), "square"],
        [_("triangle"), "triangle"],
        [_("sawtooth"), "sawtooth"]
    ];

    /**
     * Initial temperaments available for selection.
     * @constant {Array<Array<string>>}
     */
    const INITIALTEMPERAMENTS = [
        [_("Equal (12EDO)"), "equal", "equal"],
        [_("Equal (5EDO)"), "equal5", "equal5"],
        [_("Equal (7EDO)"), "equal7", "equal7"],
        [_("Equal (17EDO)"), "equal17", "equal17"],
        [_("Equal (19EDO)"), "equal19", "equal19"],
        [_("Equal (31EDO)"), "equal31", "equal31"],
        [_("5-limit Just Intonation"), "just intonation", "just intonation"],
        [_("Pythagorean (3-limit JI)"), "Pythagorean", "Pythagorean"],
        [_("Meantone") + " (1/3)", "1/3 comma meantone", "meantone (1/3)"],
        [_("Meantone") + " (1/4)", "1/4 comma meantone", "meantone (1/4)"]
    ];

    /**
     * Array of available temperaments.
     * @type {Array<Array<string>>}
     */
    let TEMPERAMENTS = [
        [_("Equal (12EDO)"), "equal", "equal"],
        [_("Equal (5EDO)"), "equal5", "equal5"],
        [_("Equal (7EDO)"), "equal7", "equal7"],
        [_("Equal (17EDO)"), "equal17", "equal17"],
        [_("Equal (19EDO)"), "equal19", "equal19"],
        [_("Equal (31EDO)"), "equal31", "equal31"],
        [_("5-limit Just Intonation"), "just intonation", "just intonation"],
        [_("Pythagorean (3-limit JI)"), "Pythagorean", "Pythagorean"],
        [`${_("Meantone")} (1/3)`, "1/3 comma meantone", "meantone (1/3)"],
        [`${_("Meantone")} (1/4)`, "1/4 comma meantone", "meantone (1/4)"],
        [_("custom"), "custom", "custom"]
    ];

    /**
     * Predefined temperaments for quick access.
     * @constant {Object}
     */
    const PreDefinedTemperaments = {
        "equal": true,
        "equal5": true,
        "equal7": true,
        "equal17": true,
        "equal19": true,
        "equal31": true,
        "just intonation": true,
        "Pythagorean": true,
        "1/3 comma meantone": true,
        "1/4 comma meantone": true
    };

    /**
     * Precise cents values for exact interval ratios.
     * Used to calculate temperament-dependent frequencies without approximation.
     * @constant {Object}
     */
    const INTERVAL_CENTS = {
        "1/1": 1200 * Math.log2(1 / 1),
        "2/1": 1200 * Math.log2(2 / 1),
        "3/2": 1200 * Math.log2(3 / 2),
        "4/3": 1200 * Math.log2(4 / 3),
        "5/4": 1200 * Math.log2(5 / 4),
        "5/3": 1200 * Math.log2(5 / 3),
        "6/5": 1200 * Math.log2(6 / 5),
        "8/5": 1200 * Math.log2(8 / 5),
        "9/8": 1200 * Math.log2(9 / 8),
        "9/5": 1200 * Math.log2(9 / 5),
        "15/8": 1200 * Math.log2(15 / 8),
        "15/16": 1200 * Math.log2(15 / 16),
        "16/15": 1200 * Math.log2(16 / 15),
        "16/9": 1200 * Math.log2(16 / 9),
        "24/25": 1200 * Math.log2(24 / 25),
        "25/24": 1200 * Math.log2(25 / 24),
        "25/18": 1200 * Math.log2(25 / 18),
        "25/16": 1200 * Math.log2(25 / 16),
        "32/25": 1200 * Math.log2(32 / 25),
        "36/25": 1200 * Math.log2(36 / 25),
        "45/32": 1200 * Math.log2(45 / 32),
        "72/125": 1200 * Math.log2(72 / 125),
        "75/64": 1200 * Math.log2(75 / 64),
        "81/64": 1200 * Math.log2(81 / 64),
        "96/125": 1200 * Math.log2(96 / 125),
        "125/72": 1200 * Math.log2(125 / 72),
        "125/96": 1200 * Math.log2(125 / 96),
        "125/64": 1200 * Math.log2(125 / 64),
        "128/81": 1200 * Math.log2(128 / 81),
        "128/125": 1200 * Math.log2(128 / 125),
        "144/125": 1200 * Math.log2(144 / 125),
        "243/128": 1200 * Math.log2(243 / 128),
        "256/243": 1200 * Math.log2(256 / 243),
        "729/512": 1200 * Math.log2(729 / 512),
        "1024/729": 1200 * Math.log2(1024 / 729),
        "7/5": 1200 * Math.log2(7 / 5),
        "7/4": 1200 * Math.log2(7 / 4),
        "21/16": 1200 * Math.log2(21 / 16)
    };

    /**
     * Centralized interval definitions with exact ratios and cents.
     * This object provides mathematically accurate interval data for all temperaments.
     * @constant {Object}
     */
    const TEMPERAMENT_INTERVALS = {
        "perfect 1": {
            ratio: 1 / 1,
            cents: INTERVAL_CENTS["1/1"],
            semitones: 0
        },
        "minor 2": {
            ratio: 16 / 15,
            cents: INTERVAL_CENTS["16/15"],
            semitones: 1
        },
        "augmented 1": {
            ratio: 25 / 24,
            cents: INTERVAL_CENTS["25/24"],
            semitones: 1
        },
        "major 2": {
            ratio: 9 / 8,
            cents: INTERVAL_CENTS["9/8"],
            semitones: 2
        },
        "augmented 2": {
            ratio: 75 / 64,
            cents: INTERVAL_CENTS["75/64"],
            semitones: 3
        },
        "minor 3": {
            ratio: 6 / 5,
            cents: INTERVAL_CENTS["6/5"],
            semitones: 3
        },
        "major 3": {
            ratio: 5 / 4,
            cents: INTERVAL_CENTS["5/4"],
            semitones: 4
        },
        "augmented 3": {
            ratio: 125 / 96,
            cents: INTERVAL_CENTS["125/96"],
            semitones: 5
        },
        "diminished 4": {
            ratio: 32 / 25,
            cents: INTERVAL_CENTS["32/25"],
            semitones: 4
        },
        "perfect 4": {
            ratio: 4 / 3,
            cents: INTERVAL_CENTS["4/3"],
            semitones: 5
        },
        "augmented 4": {
            ratio: 25 / 18,
            cents: INTERVAL_CENTS["25/18"],
            semitones: 6
        },
        "diminished 5": {
            ratio: 36 / 25,
            cents: INTERVAL_CENTS["36/25"],
            semitones: 6
        },
        "perfect 5": {
            ratio: 3 / 2,
            cents: INTERVAL_CENTS["3/2"],
            semitones: 7
        },
        "augmented 5": {
            ratio: 25 / 16,
            cents: INTERVAL_CENTS["25/16"],
            semitones: 8
        },
        "minor 6": {
            ratio: 8 / 5,
            cents: INTERVAL_CENTS["8/5"],
            semitones: 8
        },
        "major 6": {
            ratio: 5 / 3,
            cents: INTERVAL_CENTS["5/3"],
            semitones: 9
        },
        "augmented 6": {
            ratio: 125 / 72,
            cents: INTERVAL_CENTS["125/72"],
            semitones: 10
        },
        "minor 7": {
            ratio: 16 / 9,
            cents: INTERVAL_CENTS["16/9"],
            semitones: 10
        },
        "major 7": {
            ratio: 15 / 8,
            cents: INTERVAL_CENTS["15/8"],
            semitones: 11
        },
        "augmented 7": {
            ratio: 125 / 64,
            cents: INTERVAL_CENTS["125/64"],
            semitones: 12
        },
        "diminished 8": {
            ratio: 48 / 25,
            cents: INTERVAL_CENTS["48/25"],
            semitones: 11
        },
        "perfect 8": {
            ratio: 2 / 1,
            cents: INTERVAL_CENTS["2/1"],
            semitones: 12
        }
    };

    /**
     * Canonical interval ordering for consistent lookup and synthesis.
     * All temperament objects should reference this ordering for stability.
     * @constant {string[]}
     */
    const INTERVAL_ORDER = [
        "perfect 1",
        "minor 2",
        "major 2",
        "minor 3",
        "major 3",
        "perfect 4",
        "diminished 5",
        "perfect 5",
        "minor 6",
        "major 6",
        "minor 7",
        "major 7",
        "perfect 8"
    ];

    /**
     * Temperament settings and interval ratios.
     * @constant {Object}
     */
    const TEMPERAMENT = {
        "equal": {
            "perfect 1": Math.pow(2, 0 / 12),
            "minor 2": Math.pow(2, 1 / 12),
            "augmented 1": Math.pow(2, 1 / 12),
            "major 2": Math.pow(2, 2 / 12),
            "augmented 2": Math.pow(2, 3 / 12),
            "minor 3": Math.pow(2, 3 / 12),
            "major 3": Math.pow(2, 4 / 12),
            "augmented 3": Math.pow(2, 5 / 12),
            "diminished 4": Math.pow(2, 4 / 12),
            "perfect 4": Math.pow(2, 5 / 12),
            "augmented 4": Math.pow(2, 6 / 12),
            "diminished 5": Math.pow(2, 6 / 12),
            "perfect 5": Math.pow(2, 7 / 12),
            "augmented 5": Math.pow(2, 8 / 12),
            "minor 6": Math.pow(2, 8 / 12),
            "major 6": Math.pow(2, 9 / 12),
            "augmented 6": Math.pow(2, 10 / 12),
            "minor 7": Math.pow(2, 10 / 12),
            "major 7": Math.pow(2, 11 / 12),
            "augmented 7": Math.pow(2, 12 / 12),
            "diminished 8": Math.pow(2, 11 / 12),
            "perfect 8": Math.pow(2, 12 / 12),
            "pitchNumber": 12,
            "isEDO": true,
            "noteLabels": ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
            "ratios": [
                1,
                Math.pow(2, 1 / 12),
                Math.pow(2, 2 / 12),
                Math.pow(2, 3 / 12),
                Math.pow(2, 4 / 12),
                Math.pow(2, 5 / 12),
                Math.pow(2, 6 / 12),
                Math.pow(2, 7 / 12),
                Math.pow(2, 8 / 12),
                Math.pow(2, 9 / 12),
                Math.pow(2, 10 / 12),
                Math.pow(2, 11 / 12)
            ],
            "octaveRatio": 2,
            "interval": INTERVAL_ORDER
        },
        "equal5": {
            "isEDO": true,
            "edo": 5,
            "name": "Equal (5EDO)",
            "description": "5 Equal Divisions of the Octave",
            "ratios": [
                1,
                Math.pow(2, 1 / 5),
                Math.pow(2, 2 / 5),
                Math.pow(2, 3 / 5),
                Math.pow(2, 4 / 5)
            ],
            "octaveRatio": 2,
            "generator": null,
            "pitchNumber": 5,
            "perfect 1": Math.pow(2, 0 / 5),
            "minor 2": Math.pow(2, 1 / 5),
            "augmented 1": Math.pow(2, 1 / 5),
            "major 2": Math.pow(2, 2 / 5),
            "augmented 2": Math.pow(2, 2 / 5),
            "minor 3": Math.pow(2, 2 / 5),
            "major 3": Math.pow(2, 3 / 5),
            "augmented 3": Math.pow(2, 3 / 5),
            "diminished 4": Math.pow(2, 3 / 5),
            "perfect 4": Math.pow(2, 3 / 5),
            "augmented 4": Math.pow(2, 4 / 5),
            "diminished 5": Math.pow(2, 4 / 5),
            "perfect 5": Math.pow(2, 5 / 5),
            "augmented 5": Math.pow(2, 5 / 5),
            "minor 6": Math.pow(2, 5 / 5),
            "major 6": Math.pow(2, 5 / 5),
            "augmented 6": Math.pow(2, 5 / 5),
            "minor 7": Math.pow(2, 5 / 5),
            "major 7": Math.pow(2, 5 / 5),
            "augmented 7": Math.pow(2, 5 / 5),
            "diminished 8": Math.pow(2, 5 / 5),
            "perfect 8": Math.pow(2, 5 / 5),
            "interval": ["perfect 1", "minor 2", "major 2", "major 3", "augmented 4", "perfect 5"]
        },
        "equal7": {
            "isEDO": true,
            "edo": 7,
            "name": "Equal (7EDO)",
            "description": "7 Equal Divisions of the Octave",
            "ratios": [
                1,
                Math.pow(2, 1 / 7),
                Math.pow(2, 2 / 7),
                Math.pow(2, 3 / 7),
                Math.pow(2, 4 / 7),
                Math.pow(2, 5 / 7),
                Math.pow(2, 6 / 7)
            ],
            "octaveRatio": 2,
            "generator": null,
            "pitchNumber": 7,
            "perfect 1": Math.pow(2, 0 / 7),
            "minor 2": Math.pow(2, 1 / 7),
            "augmented 1": Math.pow(2, 1 / 7),
            "major 2": Math.pow(2, 2 / 7),
            "augmented 2": Math.pow(2, 2 / 7),
            "minor 3": Math.pow(2, 3 / 7),
            "major 3": Math.pow(2, 3 / 7),
            "augmented 3": Math.pow(2, 4 / 7),
            "diminished 4": Math.pow(2, 4 / 7),
            "perfect 4": Math.pow(2, 4 / 7),
            "augmented 4": Math.pow(2, 5 / 7),
            "diminished 5": Math.pow(2, 4 / 7),
            "perfect 5": Math.pow(2, 5 / 7),
            "augmented 5": Math.pow(2, 6 / 7),
            "minor 6": Math.pow(2, 5 / 7),
            "major 6": Math.pow(2, 6 / 7),
            "augmented 6": Math.pow(2, 7 / 7),
            "minor 7": Math.pow(2, 6 / 7),
            "major 7": Math.pow(2, 6 / 7),
            "augmented 7": Math.pow(2, 7 / 7),
            "diminished 8": Math.pow(2, 7 / 7),
            "perfect 8": Math.pow(2, 7 / 7),
            "interval": [
                "perfect 1",
                "minor 2",
                "major 2",
                "major 3",
                "perfect 4",
                "perfect 5",
                "major 6",
                "perfect 8"
            ]
        },
        "equal17": {
            isEDO: true,
            edo: 17,
            name: "Equal (17EDO)",
            description: "17 Equal Divisions of the Octave",
            ratios: [
                1,
                Math.pow(2, 1 / 17),
                Math.pow(2, 2 / 17),
                Math.pow(2, 3 / 17),
                Math.pow(2, 4 / 17),
                Math.pow(2, 5 / 17),
                Math.pow(2, 6 / 17),
                Math.pow(2, 7 / 17),
                Math.pow(2, 8 / 17),
                Math.pow(2, 9 / 17),
                Math.pow(2, 10 / 17),
                Math.pow(2, 11 / 17),
                Math.pow(2, 12 / 17),
                Math.pow(2, 13 / 17),
                Math.pow(2, 14 / 17),
                Math.pow(2, 15 / 17),
                Math.pow(2, 16 / 17)
            ],
            octaveRatio: 2,
            pitchNumber: 17,
            interval: [
                "perfect 1",
                "minor 2",
                "augmented 1",
                "minor 3",
                "major 2",
                "augmented 2",
                "major 3",
                "perfect 4",
                "augmented 4",
                "diminished 5",
                "perfect 5",
                "augmented 5",
                "minor 6",
                "major 6",
                "augmented 6",
                "minor 7",
                "major 7",
                "perfect 8"
            ]
        },
        "equal19": {
            "isEDO": true,
            "edo": 19,
            "name": "Equal (19EDO)",
            "description": "19 Equal Divisions of the Octave",
            "ratios": [
                1,
                Math.pow(2, 1 / 19),
                Math.pow(2, 2 / 19),
                Math.pow(2, 3 / 19),
                Math.pow(2, 4 / 19),
                Math.pow(2, 5 / 19),
                Math.pow(2, 6 / 19),
                Math.pow(2, 7 / 19),
                Math.pow(2, 8 / 19),
                Math.pow(2, 9 / 19),
                Math.pow(2, 10 / 19),
                Math.pow(2, 11 / 19),
                Math.pow(2, 12 / 19),
                Math.pow(2, 13 / 19),
                Math.pow(2, 14 / 19),
                Math.pow(2, 15 / 19),
                Math.pow(2, 16 / 19),
                Math.pow(2, 17 / 19),
                Math.pow(2, 18 / 19)
            ],
            "octaveRatio": 2,
            "generator": null,
            "pitchNumber": 19,
            "perfect 1": Math.pow(2, 0 / 19),
            "minor 2": Math.pow(2, 2 / 19),
            "augmented 1": Math.pow(2, 1 / 19),
            "major 2": Math.pow(2, 3 / 19),
            "augmented 2": Math.pow(2, 4 / 19),
            "minor 3": Math.pow(2, 5 / 19),
            "major 3": Math.pow(2, 6 / 19),
            "augmented 3": Math.pow(2, 7 / 19),
            "diminished 4": Math.pow(2, 7 / 19),
            "perfect 4": Math.pow(2, 8 / 19),
            "augmented 4": Math.pow(2, 9 / 19),
            "diminished 5": Math.pow(2, 9 / 19),
            "perfect 5": Math.pow(2, 10 / 19),
            "augmented 5": Math.pow(2, 11 / 19),
            "minor 6": Math.pow(2, 12 / 19),
            "major 6": Math.pow(2, 13 / 19),
            "augmented 6": Math.pow(2, 14 / 19),
            "minor 7": Math.pow(2, 15 / 19),
            "major 7": Math.pow(2, 16 / 19),
            "augmented 7": Math.pow(2, 17 / 19),
            "diminished 8": Math.pow(2, 18 / 19),
            "perfect 8": Math.pow(2, 19 / 19),
            "interval": [
                "perfect 1",
                "augmented 1",
                "minor 2",
                "major 2",
                "augmented 2",
                "minor 3",
                "major 3",
                "augmented 3",
                "perfect 4",
                "augmented 4",
                "perfect 5",
                "augmented 5",
                "minor 6",
                "major 6",
                "augmented 6",
                "minor 7",
                "major 7",
                "augmented 7",
                "diminished 8",
                "perfect 8"
            ]
        },
        "equal31": {
            "isEDO": true,
            "edo": 31,
            "name": "Equal (31EDO)",
            "description": "31 Equal Divisions of the Octave",
            "ratios": [
                1,
                Math.pow(2, 1 / 31),
                Math.pow(2, 2 / 31),
                Math.pow(2, 3 / 31),
                Math.pow(2, 4 / 31),
                Math.pow(2, 5 / 31),
                Math.pow(2, 6 / 31),
                Math.pow(2, 7 / 31),
                Math.pow(2, 8 / 31),
                Math.pow(2, 9 / 31),
                Math.pow(2, 10 / 31),
                Math.pow(2, 11 / 31),
                Math.pow(2, 12 / 31),
                Math.pow(2, 13 / 31),
                Math.pow(2, 14 / 31),
                Math.pow(2, 15 / 31),
                Math.pow(2, 16 / 31),
                Math.pow(2, 17 / 31),
                Math.pow(2, 18 / 31),
                Math.pow(2, 19 / 31),
                Math.pow(2, 20 / 31),
                Math.pow(2, 21 / 31),
                Math.pow(2, 22 / 31),
                Math.pow(2, 23 / 31),
                Math.pow(2, 24 / 31),
                Math.pow(2, 25 / 31),
                Math.pow(2, 26 / 31),
                Math.pow(2, 27 / 31),
                Math.pow(2, 28 / 31),
                Math.pow(2, 29 / 31),
                Math.pow(2, 30 / 31)
            ],
            "octaveRatio": 2,
            "generator": null,
            "pitchNumber": 31,
            "perfect 1": Math.pow(2, 0 / 31),
            "diminished 2": Math.pow(2, 1 / 31),
            "augmented 1": Math.pow(2, 2 / 31),
            "minor 2": Math.pow(2, 3 / 31),
            "mid 2": Math.pow(2, 4 / 31),
            "major 2": Math.pow(2, 5 / 31),
            "up-major 2": Math.pow(2, 6 / 31),
            "down-minor 3": Math.pow(2, 7 / 31),
            "minor 3": Math.pow(2, 8 / 31),
            "mid 3": Math.pow(2, 9 / 31),
            "major 3": Math.pow(2, 10 / 31),
            "up-major 3": Math.pow(2, 11 / 31),
            "down 4": Math.pow(2, 12 / 31),
            "perfect 4": Math.pow(2, 13 / 31),
            "up 4": Math.pow(2, 14 / 31),
            "down-diminished 5": Math.pow(2, 15 / 31),
            "up-augmented 4": Math.pow(2, 16 / 31),
            "down 5": Math.pow(2, 17 / 31),
            "perfect 5": Math.pow(2, 18 / 31),
            "up 5": Math.pow(2, 19 / 31),
            "down-minor 6": Math.pow(2, 20 / 31),
            "minor 6": Math.pow(2, 21 / 31),
            "mid 6": Math.pow(2, 22 / 31),
            "major 6": Math.pow(2, 23 / 31),
            "up-major 6": Math.pow(2, 24 / 31),
            "down-minor 7": Math.pow(2, 25 / 31),
            "minor 7": Math.pow(2, 26 / 31),
            "mid 7": Math.pow(2, 27 / 31),
            "major 7": Math.pow(2, 28 / 31),
            "up-major 7": Math.pow(2, 29 / 31),
            "down 8": Math.pow(2, 30 / 31),
            "perfect 8": Math.pow(2, 31 / 31),
            "octave": Math.pow(2, 31 / 31),
            "interval": [
                "perfect 1",
                "diminished 2",
                "augmented 1",
                "minor 2",
                "mid 2",
                "major 2",
                "up-major 2",
                "down-minor 3",
                "minor 3",
                "mid 3",
                "major 3",
                "up-major 3",
                "down 4",
                "perfect 4",
                "up 4",
                "down-diminished 5",
                "up-augmented 4",
                "down 5",
                "perfect 5",
                "up 5",
                "down-minor 6",
                "minor 6",
                "mid 6",
                "major 6",
                "up-major 6",
                "down-minor 7",
                "minor 7",
                "mid 7",
                "major 7",
                "up-major 7",
                "down 8",
                "perfect 8"
            ]
        },
        "just intonation": {
            "isEDO": false,
            "edo": 12,
            "name": "5-limit Just Intonation",
            "description": "Pure integer ratios based on the 5-limit prime limit system",
            // Cents are derived from ratios: cents = 1200 * log2(ratio)
            // Example: perfect 5 = 3/2 ratio → 1200 * log2(1.5) ≈ 702 cents
            // In 12-EDO, perfect 5 = 700 cents (slightly flat vs JI's pure 702 cents)
            "noteLabels": ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
            "ratios": [
                1 / 1,
                16 / 15,
                9 / 8,
                6 / 5,
                5 / 4,
                4 / 3,
                45 / 32,
                3 / 2,
                8 / 5,
                5 / 3,
                9 / 5,
                15 / 8
            ],
            "octaveRatio": 2,
            "generator": null,
            "perfect 1": { ratio: 1 / 1, cents: 1200 * Math.log2(1 / 1) },
            "minor 2": { ratio: 16 / 15, cents: 1200 * Math.log2(16 / 15) },
            "augmented 1": { ratio: 16 / 15, cents: 1200 * Math.log2(16 / 15) },
            "major 2": { ratio: 9 / 8, cents: 1200 * Math.log2(9 / 8) },
            "augmented 2": { ratio: 6 / 5, cents: 1200 * Math.log2(6 / 5) },
            "minor 3": { ratio: 6 / 5, cents: 1200 * Math.log2(6 / 5) },
            "major 3": { ratio: 5 / 4, cents: 1200 * Math.log2(5 / 4) },
            "augmented 3": { ratio: 4 / 3, cents: 1200 * Math.log2(4 / 3) },
            "diminished 4": { ratio: 5 / 4, cents: 1200 * Math.log2(5 / 4) },
            "perfect 4": { ratio: 4 / 3, cents: 1200 * Math.log2(4 / 3) },
            "augmented 4": { ratio: 45 / 32, cents: 1200 * Math.log2(45 / 32) },
            "diminished 5": { ratio: 45 / 32, cents: 1200 * Math.log2(45 / 32) },
            "perfect 5": { ratio: 3 / 2, cents: 1200 * Math.log2(3 / 2) },
            "augmented 5": { ratio: 8 / 5, cents: 1200 * Math.log2(8 / 5) },
            "minor 6": { ratio: 8 / 5, cents: 1200 * Math.log2(8 / 5) },
            "major 6": { ratio: 5 / 3, cents: 1200 * Math.log2(5 / 3) },
            "augmented 6": { ratio: 16 / 9, cents: 1200 * Math.log2(16 / 9) },
            "minor 7": { ratio: 16 / 9, cents: 1200 * Math.log2(16 / 9) },
            "major 7": { ratio: 15 / 8, cents: 1200 * Math.log2(15 / 8) },
            "augmented 7": { ratio: 2 / 1, cents: 1200 * Math.log2(2 / 1) },
            "diminished 8": { ratio: 15 / 8, cents: 1200 * Math.log2(15 / 8) },
            "perfect 8": { ratio: 2 / 1, cents: 1200 * Math.log2(2 / 1) },
            "pitchNumber": 12,
            "interval": INTERVAL_ORDER
        },
        "Pythagorean": {
            "isEDO": false,
            "edo": 12,
            "name": "Pythagorean Tuning",
            "description":
                "Tuning system based on pure perfect fifths (3/2 ratio) from ancient Greek theory",
            // All intervals derived by stacking 3/2 ratios (fifths).
            // Example: major 3 = 81/64 ≈ 408 cents (vs JI's 5/4 = 386 cents, 12-EDO's 400 cents)
            // Pythagorean major 3 is noticeably sharp compared to JI's pure major third.
            "noteLabels": ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
            "ratios": [
                1 / 1,
                256 / 243,
                9 / 8,
                32 / 27,
                81 / 64,
                4 / 3,
                729 / 512,
                3 / 2,
                128 / 81,
                27 / 16,
                16 / 9,
                243 / 128
            ],
            "octaveRatio": 2,
            "generator": 3 / 2,
            "perfect 1": { ratio: 1 / 1, cents: 1200 * Math.log2(1 / 1) },
            "minor 2": { ratio: 256 / 243, cents: 1200 * Math.log2(256 / 243) },
            "augmented 1": { ratio: 256 / 243, cents: 1200 * Math.log2(256 / 243) },
            "major 2": { ratio: 9 / 8, cents: 1200 * Math.log2(9 / 8) },
            "augmented 2": { ratio: 32 / 27, cents: 1200 * Math.log2(32 / 27) },
            "minor 3": { ratio: 32 / 27, cents: 1200 * Math.log2(32 / 27) },
            "major 3": { ratio: 81 / 64, cents: 1200 * Math.log2(81 / 64) },
            "augmented 3": { ratio: 4 / 3, cents: 1200 * Math.log2(4 / 3) },
            "diminished 4": { ratio: 81 / 64, cents: 1200 * Math.log2(81 / 64) },
            "perfect 4": { ratio: 4 / 3, cents: 1200 * Math.log2(4 / 3) },
            "augmented 4": { ratio: 729 / 512, cents: 1200 * Math.log2(729 / 512) },
            "diminished 5": { ratio: 729 / 512, cents: 1200 * Math.log2(729 / 512) },
            "perfect 5": { ratio: 3 / 2, cents: 1200 * Math.log2(3 / 2) },
            "augmented 5": { ratio: 128 / 81, cents: 1200 * Math.log2(128 / 81) },
            "minor 6": { ratio: 128 / 81, cents: 1200 * Math.log2(128 / 81) },
            "major 6": { ratio: 27 / 16, cents: 1200 * Math.log2(27 / 16) },
            "augmented 6": { ratio: 16 / 9, cents: 1200 * Math.log2(16 / 9) },
            "minor 7": { ratio: 16 / 9, cents: 1200 * Math.log2(16 / 9) },
            "major 7": { ratio: 243 / 128, cents: 1200 * Math.log2(243 / 128) },
            "augmented 7": { ratio: 2 / 1, cents: 1200 * Math.log2(2 / 1) },
            "diminished 8": { ratio: 243 / 128, cents: 1200 * Math.log2(243 / 128) },
            "perfect 8": { ratio: 2 / 1, cents: 1200 * Math.log2(2 / 1) },
            "pitchNumber": 12,
            "interval": INTERVAL_ORDER
        },
        "1/3 comma meantone": {
            "isEDO": false,
            "edo": 19,
            "name": "1/3 Comma Meantone",
            "description": "Meantone temperament with 1/3 syntonic comma (quarter-comma meantone)",
            "noteLabels": [
                "C",
                "D" + FLAT,
                "C" + SHARP,
                "D",
                "D" + SHARP,
                "E" + FLAT,
                "E",
                "E" + SHARP,
                "F",
                "F" + SHARP,
                "G" + FLAT,
                "G",
                "G" + SHARP,
                "A" + FLAT,
                "A",
                "A" + SHARP,
                "B" + FLAT,
                "B",
                "B" + SHARP
            ],
            // 1/3-comma meantone ratios (19 pitches per octave).
            // Generated by stacking fifths tempered narrow by 1/3 of a syntonic comma (81/80):
            //   Tempered Fifth = (3/2) * (80/81)^(1/3) ≈ 1.493762
            // Pitch ratios are octave-reduced (1.0 to 2.0) across the 19-note circle of fifths.
            "ratios": [
                1, 1.037156, 1.075693, 1.115656, 1.157109, 1.200103, 1.244694, 1.290943, 1.338902,
                1.38865, 1.440247, 1.493762, 1.549255, 1.60682, 1.666524, 1.728445, 1.792668,
                1.859266, 1.92835
            ],
            "octaveRatio": 2,
            "generator": 5 / 4,
            "pitchNumber": 19,
            "perfect 1": 1 / 1,
            "minor 2": 1.075693,
            "augmented 1": 1.037156,
            "major 2": 1.115656,
            "augmented 2": 1.157109,
            "minor 3": 1.200103,
            "major 3": 1.244694,
            "augmented 3": 1.290943,
            "diminished 4": 1.290943,
            "perfect 4": 1.338902,
            "augmented 4": 1.38865,
            "diminished 5": 1.440247,
            "perfect 5": 1.493762,
            "augmented 5": 1.549255,
            "minor 6": 1.60682,
            "major 6": 1.666524,
            "augmented 6": 1.728445,
            "minor 7": 1.792668,
            "major 7": 1.859266,
            "augmented 7": 1.92835,
            "diminished 8": 1.92835,
            "perfect 8": 2 / 1,
            "interval": [
                "perfect 1",
                "augmented 1",
                "minor 2",
                "major 2",
                "augmented 2",
                "minor 3",
                "major 3",
                "diminished 4",
                "perfect 4",
                "augmented 4",
                "diminished 5",
                "perfect 5",
                "augmented 5",
                "minor 6",
                "major 6",
                "augmented 6",
                "minor 7",
                "major 7",
                "diminished 8",
                "perfect 8"
            ]
        },
        "1/4 comma meantone": {
            "isEDO": false,
            "edo": 21,
            "name": "1/4 Comma Meantone",
            "description": "Meantone temperament with 1/4 syntonic comma",
            "noteLabels": [
                "C",
                "D" + FLAT,
                "C" + SHARP,
                "D",
                "D" + SHARP,
                "E" + FLAT,
                "E",
                "E" + SHARP,
                "F",
                "F" + SHARP,
                "G" + FLAT,
                "G",
                "G" + SHARP,
                "A" + FLAT,
                "A",
                "A" + SHARP,
                "B" + FLAT,
                "B",
                "B" + SHARP,
                "C" + FLAT,
                "C"
            ],
            "ratios": [
                1,
                16 / 15,
                25 / 24,
                9 / 8,
                75 / 64,
                6 / 5,
                5 / 4,
                32 / 25,
                125 / 96,
                4 / 3,
                25 / 18,
                36 / 25,
                3 / 2,
                25 / 16,
                8 / 5,
                5 / 3,
                125 / 72,
                9 / 5,
                15 / 8,
                48 / 25,
                125 / 64
            ],
            "octaveRatio": 2,
            "generator": 5 / 4,
            "pitchNumber": 21,
            "perfect 1": 1 / 1,
            "minor 2": 16 / 15,
            "augmented 1": 25 / 24,
            "major 2": 9 / 8,
            "augmented 2": 75 / 64,
            "minor 3": 6 / 5,
            "major 3": 5 / 4,
            "diminished 4": 32 / 25,
            "augmented 3": 125 / 96,
            "perfect 4": 4 / 3,
            "augmented 4": 25 / 18,
            "diminished 5": 36 / 25,
            "perfect 5": 3 / 2,
            "augmented 5": 25 / 16,
            "minor 6": 8 / 5,
            "major 6": 5 / 3,
            "augmented 6": 125 / 72,
            "minor 7": 9 / 5,
            "major 7": 15 / 8,
            "diminished 8": 48 / 25,
            "augmented 7": 125 / 64,
            "perfect 8": 2 / 1,
            "interval": [
                "perfect 1",
                "augmented 1",
                "minor 2",
                "major 2",
                "augmented 2",
                "minor 3",
                "major 3",
                "diminished 4",
                "augmented 3",
                "perfect 4",
                "augmented 4",
                "diminished 5",
                "perfect 5",
                "augmented 5",
                "minor 6",
                "major 6",
                "augmented 6",
                "minor 7",
                "major 7",
                "diminished 8",
                "augmented 7",
                "perfect 8"
            ]
        },
        "custom": {
            "0": Math.pow(2, 0 / 12),
            "1": Math.pow(2, 1 / 12),
            "2": Math.pow(2, 2 / 12),
            "3": Math.pow(2, 3 / 12),
            "4": Math.pow(2, 4 / 12),
            "5": Math.pow(2, 5 / 12),
            "6": Math.pow(2, 6 / 12),
            "7": Math.pow(2, 7 / 12),
            "8": Math.pow(2, 8 / 12),
            "9": Math.pow(2, 9 / 12),
            "10": Math.pow(2, 10 / 12),
            "11": Math.pow(2, 11 / 12),
            "perfect 1": Math.pow(2, 0 / 12),
            "minor 2": Math.pow(2, 1 / 12),
            "major 2": Math.pow(2, 2 / 12),
            "minor 3": Math.pow(2, 3 / 12),
            "major 3": Math.pow(2, 4 / 12),
            "perfect 4": Math.pow(2, 5 / 12),
            "diminished 5": Math.pow(2, 6 / 12),
            "perfect 5": Math.pow(2, 7 / 12),
            "minor 6": Math.pow(2, 8 / 12),
            "major 6": Math.pow(2, 9 / 12),
            "minor 7": Math.pow(2, 10 / 12),
            "major 7": Math.pow(2, 11 / 12),
            "perfect 8": Math.pow(2, 12 / 12),
            "pitchNumber": 12,
            "interval": [
                "perfect 1",
                "minor 2",
                "major 2",
                "minor 3",
                "major 3",
                "perfect 4",
                "diminished 5",
                "perfect 5",
                "minor 6",
                "major 6",
                "minor 7",
                "major 7",
                "perfect 8"
            ]
        }
    };

    const MIDI_INSTRUMENTS = {
        "default": 0, // Acoustic Grand Piano
        "piano": 0,
        "violin": 40,
        "viola": 41,
        "cello": 42,
        "double bass": 43,
        "bass": 32,
        "sitar": 104,
        "guitar": 24,
        "acoustic guitar": 25,
        "electric guitar": 27,
        "flute": 73,
        "clarinet": 71,
        "saxophone": 65,
        "tuba": 58,
        "trumpet": 56,
        "oboe": 68,
        "trombone": 57,
        "banjo": 105,
        "koto": 107,
        "dulcimer": 15,
        "bassoon": 70,
        "celeste": 8,
        "xylophone": 13,
        "electronic synth": 81,
        "sine": 81, // Approximate with Lead 2 (Sawtooth)
        "square": 80,
        "sawtooth": 81,
        "triangle": 81, // Approximate with Lead 2 (Sawtooth)
        "vibraphone": 11
    };

    const DRUM_MIDI_MAP = {
        "snare drum": 38,
        "kick drum": 36,
        "tom tom": 41,
        "floor tom tom": 43,
        "cup drum": 47, // Closest: Low-Mid Tom
        "darbuka drum": 50, // Closest: High Tom
        "japanese drum": 56, // Closest: Cowbell or Tambourine
        "hi hat": 42,
        "ride bell": 53,
        "cow bell": 56,
        "triangle bell": 81,
        "finger cymbals": 69, // Closest: Open Hi-Hat
        "chime": 82, // Closest: Shaker
        "gong": 52, // Closest: Chinese Cymbal
        "clang": 55, // Closest: Splash Cymbal
        "crash": 49,
        "clap": 39,
        "slap": 40,
        "raindrop": 88 // Custom mapping (not in GM), can use melodic notes
    };

    const REVERSE_DRUM_MIDI_MAP = {
        38: ["snare drum"],
        36: ["kick drum"],
        41: ["tom tom"],
        43: ["floor tom tom"],
        47: ["cup drum"],
        50: ["darbuka drum"],
        56: ["japanese drum", "cow bell"],
        42: ["hi hat"],
        53: ["ride bell"],
        81: ["triangle bell"],
        69: ["finger cymbals"],
        82: ["chime"],
        52: ["gong"],
        55: ["clang"],
        49: ["crash"],
        39: ["clap"],
        40: ["slap"],
        88: ["raindrop"]
    };

    /**
     * Default invert mode.
     * @constant {string}
     */
    const DEFAULTINVERT = "even";

    /**
     * Default interval for the mode.
     * @constant {string}
     */
    const DEFAULTINTERVAL = "perfect" + " 5";

    /**
     * Default voice for audio synthesis.
     * @constant {string}
     */
    const DEFAULTVOICE = "electronic synth";

    /**
     * Default noise type for audio synthesis.
     * @constant {string}
     */
    const DEFAULTNOISE = "noise1";

    /**
     * Default drum type for audio synthesis.
     * @constant {string}
     */
    const DEFAULTDRUM = "kick drum";

    /**
     * Default effect for audio synthesis.
     * @constant {string}
     */
    const DEFAULTEFFECT = "duck";

    /**
     * Default musical mode.
     * @constant {string}
     */
    const DEFAULTMODE = "major";

    /**
     * Default temperament.
     * @constant {string}
     */
    const DEFAULTTEMPERAMENT = "equal";

    /**
     * Default filter type for audio processing.
     * @constant {string}
     */
    const DEFAULTFILTERTYPE = "highpass";

    /**
     * Default oscillator type for audio synthesis.
     * @constant {string}
     */
    const DEFAULTOSCILLATORTYPE = "sine";

    /**
     * Default accidental for musical notation.
     * @constant {string}
     */
    const DEFAULTACCIDENTAL = "natural" + " " + NATURAL;

    /**
     * Approximate mapping of mode to solfege (Used by modes where the
     * length !== 7).
     * @constant
     * @type {Array}
     */
    const SOLFMAPPER = ["do", "do", "re", "re", "mi", "fa", "fa", "sol", "sol", "la", "la", "ti"];

    /**
     * Maps accidental characters to their semitone offsets.
     * Named distinctly to avoid collision with the ACCIDENTAL_MAP in abc.js
     * (which maps accidentals to ABC notation strings, not semitone offsets).
     * @constant {Object.<string, number>}
     */
    const ACCIDENTAL_SEMITONE_MAP = {
        "#": 1,
        "♯": 1,
        "b": -1,
        "♭": -1,
        "x": 2, // double-sharp (textual)
        "𝄪": 2, // double-sharp (Unicode)
        "𝄫": -2 // double-flat (Unicode)
    };

    /**
     * Optional per-EDO overrides for the standard 12-EDO mode patterns.
     *
     * Keyed by edo, then by mode name. When an override exists it takes priority
     * over the naive scalePatternToEDO conversion of MUSICALMODES.
     * @constant
     * @type {Object}
     */
    const PITCH_COLLECTIONS_EDO_OVERRIDES = {};

    const exportsObj = {
        SYNTHSVG,
        WHOLENOTE,
        HALFNOTE,
        QUARTERNOTE,
        EIGHTHNOTE,
        SIXTEENTHNOTE,
        THIRTYSECONDNOTE,
        SIXTYFOURTHNOTE,
        SHARP,
        FLAT,
        CENTSSYMBOL,
        NATURAL,
        DOUBLESHARP,
        DOUBLEFLAT,
        BTOFLAT,
        NOTESSHARP,
        NOTESFLAT,
        EQUIVALENTACCIDENTALS,
        SOLFEGENAMES,
        SOLFEGENAMES1,
        NOTENAMES,
        ALLNOTENAMES,
        NOTENAMES1,
        PITCHES,
        PITCHES1,
        PITCHES3,
        FIXEDSOLFEGE,
        FIXEDSOLFEGE1,
        NOTESTEP,
        ALLNOTESTEP,
        SEMITONETOINTERVALMAP,
        SOLFNOTES,
        SCALENOTES,
        EASTINDIANSOLFNOTES,
        SOLFATTRS,
        DEGREES,
        EDO_NOTE_NAMES,
        SEMITONES,
        CENTS_PER_SEMITONE,
        CENTS_PER_OCTAVE,
        POWER2,
        TWELTHROOT2,
        TWELVEHUNDRETHROOT2,
        A0,
        C8,
        C10,
        RHYTHMRULERHEIGHT,
        YSTAFFNOTEHEIGHT,
        YSTAFFOCTAVEHEIGHT,
        SLIDERHEIGHT,
        SLIDERWIDTH,
        MATRIXBUTTONCOLOR,
        MATRIXLABELCOLOR,
        MATRIXNOTECELLCOLOR,
        MATRIXTUPLETCELLCOLOR,
        MATRIXRHYTHMCELLCOLOR,
        MATRIXBUTTONCOLORHOVER,
        MATRIXNOTECELLCOLORHOVER,
        MATRIXSOLFEWIDTH,
        EIGHTHNOTEWIDTH,
        MATRIXBUTTONHEIGHT,
        MATRIXBUTTONHEIGHT2,
        MATRIXSOLFEHEIGHT,
        SELECTORSTRINGS,
        ACCIDENTALLABELS,
        ACCIDENTALNAMES,
        ACCIDENTALVALUES,
        CHORDNAMES,
        DEFAULTCHORD,
        CHORDVALUES,
        INVERTMODES,
        INTERVALS,
        INTERVALVALUES,
        MODE_PIE_MENUS,
        MODEPIEMENU_SLOT_COUNT,
        MODEPIEMENU_GROUP_RING,
        MODEPIEMENU_NAME_RING,
        MODEPIEMENU_NAME_TITLE_RADIUS,
        MODEPIEMENU_FONT_FAMILY,
        MODEPIEMENU_GROUP_FONT_RATIO,
        MODEPIEMENU_NAME_FONT_MIN_RATIO,
        MODEPIEMENU_NAME_FONT_MAX_RATIO,
        PITCH_COLLECTIONS,
        PITCH_COLLECTION_ALIASES,
        MUSICALMODES,
        MAQAMTABLE,
        FILTERTYPES,
        OSCTYPES,
        INITIALTEMPERAMENTS,
        TEMPERAMENTS,
        PreDefinedTemperaments,
        INTERVAL_CENTS,
        TEMPERAMENT_INTERVALS,
        INTERVAL_ORDER,
        TEMPERAMENT,
        MIDI_INSTRUMENTS,
        DRUM_MIDI_MAP,
        REVERSE_DRUM_MIDI_MAP,
        STOSHARP,
        CHROMATIC_SOLFEGE,
        NOTESFLAT2,
        EQUIVALENTFLATS,
        EQUIVALENTSHARPS,
        EQUIVALENTNATURALS,
        CONVERT_DOWN,
        CONVERT_DOUBLE_DOWN,
        CONVERT_UP,
        CONVERT_DOUBLE_UP,
        EXTRATRANSPOSITIONS,
        SOLFEGECONVERSIONTABLE,
        WESTERN2EISOLFEGENAMES,
        PITCHES2,
        NOTESTABLE,
        SHARPPREFERENCE,
        FLATPREFERENCE,
        DRUMS,
        GRAPHICS,
        SHARP_NAMES,
        DEFAULTINVERT,
        DEFAULTINTERVAL,
        DEFAULTVOICE,
        DEFAULTNOISE,
        DEFAULTDRUM,
        DEFAULTEFFECT,
        DEFAULTMODE,
        DEFAULTTEMPERAMENT,
        DEFAULTFILTERTYPE,
        DEFAULTOSCILLATORTYPE,
        DEFAULTACCIDENTAL,
        SOLFMAPPER,
        ACCIDENTAL_SEMITONE_MAP,
        PITCH_COLLECTIONS_EDO_OVERRIDES
    };

    if (typeof window !== "undefined") {
        window.MusicUtilsConstants = exportsObj;
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = exportsObj;
    }
})(
    typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this,
    typeof _ !== "undefined" ? _ : null
);
