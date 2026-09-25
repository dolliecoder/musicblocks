(function (root) {
    var MusicUtilsConstants =
        typeof window !== "undefined" && window.MusicUtilsConstants
            ? window.MusicUtilsConstants
            : typeof require !== "undefined"
              ? require("./musicutils-constants")
              : {};
    var {
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
    } = MusicUtilsConstants;

    let octaveRatio = 2;

    /**
     * Returns the number of pitches in the given temperament's octave.
     * Falls back to 12-EDO if temperament is not found.
     * @param {string} temperament - temperament key (e.g., "equal", "equal19")
     * @returns {number} number of pitches per octave
     */
    const getCurrentEDO = temperament => {
        if (!temperament) return 12;
        const t = TEMPERAMENT[temperament];
        return t && t.pitchNumber ? t.pitchNumber : 12;
    };

    /**
     * Generates a note name table for any EDO.
     *
     * Examples:
     *   generateNoteNames(5)  → ["C", "D", "E", "G", "A"]
     *   generateNoteNames(7)  → ["C", "D", "E", "F", "G", "A", "B"]
     *   generateNoteNames(12) → ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"]
     *   generateNoteNames(19) → ["C", "C♯", "D♭", "D", "D♯", "E♭", "E", "E♯", "F", "F♯", "G♭", "G", "G♯", "A♭", "A", "A♯", "B♭", "B", "B♯"]
     *
     * For 12-EDO: returns the standard 12-tone chromatic names.
     * For small EDOs (5, 7): returns the subset of natural letters without accidentals.
     * For EDO > 12: interleaves sharp and flat accidentals between naturals.
     * Results are cached in EDO_NOTE_NAMES.
     * @param {number} edo - number of steps per octave
     * @returns {string[]} array of note names, length = edo
     */
    function generateNoteNames(edo) {
        if (EDO_NOTE_NAMES[edo]) {
            return EDO_NOTE_NAMES[edo];
        }

        const naturals = ["C", "D", "E", "F", "G", "A", "B"];
        const naturalPos12 = [0, 2, 4, 5, 7, 9, 11];

        if (edo === 12) {
            EDO_NOTE_NAMES[edo] = SHARP_NAMES;
            return SHARP_NAMES;
        }

        if (edo === 7) {
            EDO_NOTE_NAMES[edo] = naturals;
            return naturals;
        }

        if (edo === 5) {
            const pentatonic = ["C", "D", "E", "G", "A"];
            EDO_NOTE_NAMES[edo] = pentatonic;
            return pentatonic;
        }

        // Compute ideal step counts for each of the 7 intervals, rounding down.
        // Distribute remaining steps to intervals with the largest fractional part.
        const intervals = [];
        let totalFloor = 0;
        for (let n = 0; n < 7; n++) {
            const posDiff = (naturalPos12[(n + 1) % 7] - naturalPos12[n] + 12) % 12;
            const ideal = (edo * posDiff) / 12;
            const floored = Math.floor(ideal);
            intervals.push({ index: n, frac: ideal - floored, steps: floored });
            totalFloor += floored;
        }

        let remaining = edo - totalFloor;
        intervals.sort((a, b) => b.frac - a.frac);
        for (let i = 0; i < remaining; i++) {
            intervals[i].steps++;
        }
        intervals.sort((a, b) => a.index - b.index);

        const repeatChar = (ch, count) => {
            let s = "";
            for (let i = 0; i < count; i++) s += ch;
            return s;
        };

        const names = [];
        for (let n = 0; n < 7; n++) {
            const natural = naturals[n];
            const nextNatural = naturals[(n + 1) % 7];
            const edoSteps = intervals[n].steps;

            // A letter with zero allocated steps contributes no note names at
            // all (not even its own natural). Pushing it unconditionally was
            // the bug: it forced names.length to always be >= 7, even for
            // EDOs smaller than 7 (e.g. edo=4 allocates steps to only 4 of the
            // 7 letters, leaving 3 letters with 0 steps).
            if (edoSteps < 1) {
                continue;
            }

            names.push(natural);

            const numAccidentals = edoSteps - 1;
            const sharpCount = Math.ceil(numAccidentals / 2);
            const flatCount = Math.floor(numAccidentals / 2);

            for (let s = 1; s <= sharpCount; s++) {
                names.push(natural + repeatChar(SHARP, s));
            }
            for (let f = flatCount; f >= 1; f--) {
                names.push(nextNatural + repeatChar(FLAT, f));
            }
        }

        EDO_NOTE_NAMES[edo] = names;
        return names;
    }

    /**
     * Returns the index of a note name in an EDO-specific name table.
     *
     * Examples:
     *   getEdoNoteNamePosition("C♯", 12)  → 1
     *   getEdoNoteNamePosition("D♭", 19)  → 2
     *   getEdoNoteNamePosition("E♯", 19)  → 7
     *   getEdoNoteNamePosition("G",   7)  → 4
     *   getEdoNoteNamePosition("C♯",  7)  → -1 (not in 7-EDO)
     *
     * @param {string} name - note name (e.g., "C♯", "D♭")
     * @param {number} edo - number of steps per octave
     * @returns {number} position in the EDO name table, or -1 if not found
     */
    function getEdoNoteNamePosition(name, edo) {
        const normalizedName = name
            .replaceAll("#", SHARP)
            .replaceAll("b", FLAT)
            .replaceAll(DOUBLESHARP, SHARP + SHARP)
            .replaceAll(DOUBLEFLAT, FLAT + FLAT);

        const names = generateNoteNames(edo);
        let idx = names.indexOf(normalizedName);
        if (idx !== -1) return idx;

        // Fallback: try sharp equivalent (12-EDO only — non-12 EDO has distinct pitch classes)
        if (edo === 12 && normalizedName in EQUIVALENTSHARPS) {
            idx = names.indexOf(EQUIVALENTSHARPS[normalizedName]);
            if (idx !== -1) return idx;
        }
        if (edo === 12 && normalizedName in EQUIVALENTFLATS) {
            idx = names.indexOf(EQUIVALENTFLATS[normalizedName]);
            if (idx !== -1) return idx;
        }

        // Try 12-EDO proportional fallback for notes not in the EDO name set
        const pos12 = PITCHES2.indexOf(normalizedName);
        if (pos12 !== -1) {
            return Math.round((pos12 / 12) * edo) % edo;
        }
        const posFlat = PITCHES.indexOf(normalizedName);
        if (posFlat !== -1) {
            return Math.round((posFlat / 12) * edo) % edo;
        }

        return -1;
    }

    /**
     * Set the global octave ratio.
     * @function
     * @param {number} newOctaveRatio - The new octave ratio to set.
     * @returns {void}
     */
    const setOctaveRatio = newOctaveRatio => {
        octaveRatio = newOctaveRatio;
    };

    /**
     * Get the current global octave ratio.
     * @function
     * @returns {number} The current octave ratio.
     */
    const getOctaveRatio = () => {
        return octaveRatio;
    };

    /**
     * Get the list of available temperaments.
     * @function
     * @returns {Array<Array<string>>} The list of available temperaments.
     */
    const getTemperamentsList = () => {
        return TEMPERAMENTS;
    };

    /**
     * Get the interval ratios for a specific temperament.
     * @function
     * @param {string} entry - The name of the temperament.
     * @returns {Object} The interval ratios for the specified temperament.
     */
    const getTemperament = entry => {
        return TEMPERAMENT[entry];
    };

    /**
     * Get the keys of the temperament dictionary.
     * @function
     * @returns {Array<string>} The keys of the temperament dictionary.
     */
    const getTemperamentKeys = () => {
        const keys = [];
        for (const k in TEMPERAMENT) {
            keys.push(k);
        }

        return keys;
    };

    /**
     * Add a new temperament entry to the list.
     * @function
     * @param {Array<string>} newEntry - The new temperament entry to add.
     * @returns {void}
     */
    const addTemperamentToList = newEntry => {
        for (let i = 0; i < TEMPERAMENTS.length; i++) {
            if (PreDefinedTemperaments[i] === newEntry) {
                return;
            }
        }
        TEMPERAMENTS.push(newEntry);
    };

    /**
     * Delete a temperament entry from the list.
     * @function
     * @param {string} oldEntry - The name of the temperament to delete.
     * @returns {void}
     */
    const deleteTemperamentFromList = oldEntry => {
        delete TEMPERAMENT[oldEntry];
    };

    /**
     * Add a new temperament entry to the dictionary.
     * @function
     * @param {string} entryName - The name of the temperament.
     * @param {Object} entryValue - The interval ratios for the temperament.
     * @returns {void}
     */
    const addTemperamentToDictionary = (entryName, entryValue) => {
        TEMPERAMENT[entryName] = entryValue;
    };

    /**
     * Update the list of available temperaments.
     * @function
     * @returns {void}
     */
    const updateTemperaments = () => {
        TEMPERAMENTS = [...INITIALTEMPERAMENTS];
        for (const i in TEMPERAMENT) {
            if (!(i in PreDefinedTemperaments)) {
                TEMPERAMENTS.push([_(i), i, i]);
            }
        }
    };

    /**
     * Check if a given temperament is custom.
     * @function
     * @param {string} temperament - The name of the temperament.
     * @returns {boolean} True if the temperament is custom, false otherwise.
     */
    const isCustomTemperament = temperament => {
        // Treat invalid/null temperaments as custom to avoid errors
        if (!temperament || typeof temperament !== "string") {
            return true;
        }
        return !(temperament in PreDefinedTemperaments);
    };

    /**
     * Detect whether a temperament carries usable per-pitch ratio data.
     *
     * Two storage formats exist:
     *  - EDO/derived temperaments expose a `ratios` array.
     *  - The temperament editor saves custom temperaments with per-pitch numeric
     *    keys such as `"0": [ratio, note, octave]` (and no `ratios` array).
     *
     * The scalar-step code previously only checked the `ratios` array, so
     * editor-saved custom temperaments (which hold the ratios in numeric keys)
     * were wrongly treated as "no ratios" and stepped by a raw offset instead of
     * following the mode pattern. That produced degenerate playback for custom
     * EDO temperaments with a saved mode.
     * @function
     * @param {string} temperament - The temperament key.
     * @returns {boolean} True if per-pitch ratio data is available.
     */
    const temperamentHasRatios = temperament => {
        const t = getTemperament(temperament);
        if (!t || typeof t !== "object") {
            return false;
        }
        if (Array.isArray(t.ratios) && t.ratios.length > 0) {
            return true;
        }
        // Editor-saved custom temperaments store ratios in numeric pitch keys.
        return Boolean(t["0"] && Array.isArray(t["0"]) && typeof t["0"][0] === "number");
    };

    /**
     * Check if a temperament is a true equal division of the octave (EDO).
     * True EDOs have uniform step sizes; non-equal temperaments (JI, meantone,
     * Pythagorean) have unequal intervals despite having a pitch count.
     * @function
     * @param {string} temperament - The name of the temperament.
     * @returns {boolean} True if the temperament is a true equal division.
     */
    const isTrueEDO = temperament => {
        if (!temperament || typeof temperament !== "string") {
            return false;
        }
        return temperament.startsWith("equal");
    };

    /**
     * Detect whether a temperament is an equal division of the octave regardless of
     * how it was registered. Unlike `isTrueEDO` (which only matches names starting
     * with "equal") this also catches user-defined equal temperaments that the
     * temperament editor saved under arbitrary keys such as "custom" or "custom1".
     *
     * A temperament is treated as equally tempered when:
     *  - it explicitly flags `isEDO`, or
     *  - its numeric pitch entries are arrays whose ratios match 2^(i / pitchNumber)
     *    within tolerance (the editor stores ratios inside the numeric keys, not in a
     *    `ratios` array).
     *
     * @function
     * @param {string} temperament - The temperament key.
     * @returns {boolean} True if the temperament is an equal division of the octave.
     */
    const isEquallyTempered = temperament => {
        const t = getTemperament(temperament);
        if (!t || typeof t !== "object") {
            return false;
        }
        if (t.isEDO) {
            return true;
        }
        const n = t.pitchNumber;
        if (!Number.isInteger(n) || n < 2) {
            return false;
        }
        for (let i = 0; i < n; i++) {
            const entry = t["" + i];
            if (!Array.isArray(entry) || typeof entry[0] !== "number") {
                return false;
            }
            const expected = Math.pow(2, i / n);
            if (Math.abs(entry[0] - expected) > 1e-4) {
                return false;
            }
        }
        return true;
    };

    /**
     * True when the temperament is tuned by ratios and is NOT an equal division
     * of the octave.
     * @function
     * @param {string} temperament - temperament key in TEMPERAMENT
     * @returns {boolean}
     */
    const isNonEDO = temperament => {
        const t = getTemperament(temperament);
        if (!t) {
            return false;
        }
        return temperamentHasRatios(temperament) && !isEquallyTempered(temperament);
    };

    /**
     * Integer step pattern for a mode under a non-EDO temperament: each
     * cumulative semitone offset of the 12-EDO mode pattern is mapped to the
     * index of the nearest ratio, then positions are differenced. This gives
     * the builder wheel unequal-temperament geometry (e.g. meantone major is
     * not the proportional rescale of 12-EDO semitones).
     * @function
     * @param {string} mode - mode name in MUSICALMODES
     * @param {string} temperament - temperament key in TEMPERAMENT
     * @returns {Array|null} step counts, or null when impossible
     */
    const getNonEDOModeSteps = (mode, temperament) => {
        const pattern = MUSICALMODES[mode];
        const t = getTemperament(temperament);
        if (!pattern || !t || !Array.isArray(t.ratios) || t.ratios.length === 0) {
            return null;
        }
        const n = t.pitchNumber || t.ratios.length;
        const positions = [0];
        let cum = 0;
        for (let k = 0; k < pattern.length - 1; k++) {
            cum += pattern[k];
            const target = Math.pow(2, cum / 12);
            let best = 0;
            let bestDiff = Infinity;
            for (let r = 1; r < n; r++) {
                const ratio = Number(t.ratios[r]);
                if (!isFinite(ratio) || ratio <= 0) {
                    continue;
                }
                const diff = Math.abs(Math.log2(ratio / target));
                if (diff < bestDiff) {
                    bestDiff = diff;
                    best = r;
                }
            }
            // Keep positions monotonically increasing; if the nearest ratio
            // falls at or before the previous degree, bump forward by 1 to
            // avoid collapsing two degrees onto the same pitch. This can
            // produce a step of 1 that doesn't correspond to a real ratio
            // interval — acceptable for typical ratio tables (12+ entries)
            // where this path is rarely hit.
            if (best <= positions[positions.length - 1]) {
                best = positions[positions.length - 1] + 1;
            }
            if (best >= n) {
                return null;
            }
            positions.push(best);
        }
        const steps = [];
        for (let p = 1; p < positions.length; p++) {
            steps.push(positions[p] - positions[p - 1]);
        }
        // Close back to the octave: the ratios table holds no octave entry, so
        // the final mode step spans from the last mapped degree to pitchNumber.
        const last = positions[positions.length - 1];
        if (last >= n) {
            return null;
        }
        steps.push(n - last);
        return steps;
    };

    /**
     * Compute the frequency and pitch info for a note degree under a non-EDO
     * temperament (ratio-based: just intonation, meantone, etc.). Returns null
     * when the temperament is equally tempered or has no note labels.
     * @function
     * @param {number} note - degree index (0 = root, n = octave)
     * @param {number} baseOctave - starting octave
     * @param {string} temperamentKey - key in TEMPERAMENT
     * @param {string} keySignature - key signature for pitch spelling
     * @returns {{ freq: number, noteName: string, octave: number } | null}
     */
    const getNonEDOFrequency = (note, baseOctave, temperamentKey, keySignature) => {
        const runtime =
            typeof global === "undefined"
                ? { TEMPERAMENT, isEquallyTempered, pitchToFrequency }
                : global;
        const t = runtime.TEMPERAMENT && runtime.TEMPERAMENT[temperamentKey];
        const labels =
            t && Array.isArray(t.noteLabels) && !runtime.isEquallyTempered(temperamentKey)
                ? t.noteLabels
                : null;
        if (!labels || !labels[note % labels.length]) {
            return null;
        }
        const idx = note % labels.length;
        const octave = baseOctave + Math.floor(note / labels.length);
        const freq = runtime.pitchToFrequency(labels[idx], octave, 0, keySignature, temperamentKey);
        return { freq, noteName: labels[idx], octave };
    };

    /**
     * Extract ratio from a temperament interval value.
     * Handles both legacy numeric format and new {ratio, cents} object format.
     * @function
     * @param {number|Object} value - The interval value (ratio number or object with ratio property).
     * @returns {number} The ratio value.
     */
    const getTemperamentRatio = value => {
        if (typeof value === "number") {
            return value;
        } else if (value && typeof value === "object" && typeof value.ratio === "number") {
            return value.ratio;
        }
        return 1;
    };

    /**
     * Extract cents from a temperament interval value.
     * Handles both legacy numeric format and new {ratio, cents} object format.
     * @function
     * @param {number|Object} value - The interval value (ratio number or object with cents property).
     * @returns {number} The cents value.
     */
    const getTemperamentCents = value => {
        if (typeof value === "number") {
            return 1200 * Math.log2(value);
        } else if (value && typeof value === "object" && typeof value.cents === "number") {
            return value.cents;
        }
        return 0;
    };

    /**
     * Get the name of a temperament based on its identifier.
     * @function
     * @param {string} name - The identifier of the temperament.
     * @returns {string} The name of the temperament, or the default temperament name if not found.
     */
    const getTemperamentName = name => {
        if (name === "") {
            name = DEFAULTTEMPERAMENT;
        }

        for (let i = 0; i < TEMPERAMENTS.length; i++) {
            if (TEMPERAMENTS[i][0].toLowerCase() === name.toLowerCase()) {
                return TEMPERAMENTS[i][1];
            } else if (TEMPERAMENTS[i][1].toLowerCase() === name.toLowerCase()) {
                return TEMPERAMENTS[i][1];
            }
        }

        // console.debug(name + " not found in TEMPERAMENTS");
        return DEFAULTTEMPERAMENT;
    };

    const exportsObj = {
        updateTemperaments,
        setOctaveRatio,
        getOctaveRatio,
        getTemperamentsList,
        getTemperament,
        getTemperamentKeys,
        addTemperamentToList,
        deleteTemperamentFromList,
        addTemperamentToDictionary,
        isCustomTemperament,
        temperamentHasRatios,
        isTrueEDO,
        isEquallyTempered,
        getTemperamentRatio,
        getTemperamentCents,
        getTemperamentName,
        getCurrentEDO,
        getEdoNoteNamePosition,
        isNonEDO,
        getNonEDOModeSteps,
        getNonEDOFrequency,
        generateNoteNames
    };

    if (typeof window !== "undefined") {
        window.MusicUtilsTemperament = exportsObj;
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = exportsObj;
    }
})(
    typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this,
    typeof _ !== "undefined" ? _ : null
);
