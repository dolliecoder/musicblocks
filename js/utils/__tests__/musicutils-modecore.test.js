/**
 * @license
 * MusicBlocks v3.4.1
 * Copyright (C) 2014-2026 Walter Bender
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { TextEncoder } = require("util");

const isUnsafeObjectKey = key => ["__proto__", "constructor", "prototype"].includes(key);
const slicePath = () => ({ DonutSlice: "donut", DonutSliceCustomization: () => ({}) });

global.TextEncoder = TextEncoder;
global._ = jest.fn(str => str);
global.isUnsafeObjectKey = isUnsafeObjectKey;
global.DRUMNAMES = [];
global.NOISENAMES = [];
global.VOICENAMES = [];
global.CUSTOMSAMPLES = [];
global.slicePath = slicePath;
global.window = { btoa: str => Buffer.from(str, "binary").toString("base64") };

// require("../musicutils") first so MUSICALMODES is filled from PITCH_COLLECTIONS the way the
// real app fills it, before this file's own require of musicutils-modecore reads the same object.
const musicutils = require("../musicutils");
const modecore = require("../musicutils-modecore");

const readSource = name => fs.readFileSync(path.join(__dirname, "..", name), "utf8");

describe("musicutils-modecore", () => {
    it("round-trips a base64 string", () => {
        expect(modecore.base64Encode("hi")).toBe("hi");
    });

    it("gives a mode's semitone numbers and a scale pattern in a non-12-EDO tuning", () => {
        expect(modecore.getModeNumbers("major")).toBe("0 2 4 5 7 9 11");
        expect(modecore.getNonEDOModeSteps("major", "equal")).toEqual([2, 2, 1, 2, 2, 2, 1]);
        expect(modecore.scalePatternToEDO([2, 2, 1, 2, 2, 2, 1], 19)).toEqual([
            3, 3, 2, 3, 3, 3, 2
        ]);
    });

    it("fills MUSICALMODES from the pitch collections, major included", () => {
        expect(modecore.MUSICALMODES.major).toEqual([2, 2, 1, 2, 2, 2, 1]);
        expect(modecore.getModePattern("major")).toEqual([2, 2, 1, 2, 2, 2, 1]);
    });

    it("captures customMode after MUSICALMODES.custom is set, not before", () => {
        // customMode = MUSICALMODES["custom"] is a one-time read, not a live reference, so the
        // assignment that fills MUSICALMODES.custom has to run first in this same file.
        expect(modecore.customMode).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
        expect(modecore.MUSICALMODES.custom).toBe(modecore.customMode);
    });

    it("has 20 chord definitions and a movable-tonic-degree table", () => {
        expect(modecore.CHORDVALUES).toHaveLength(20);
        expect(modecore.CHORDVALUES[0]).toEqual([
            [0, 0],
            [2, 0],
            [4, 0]
        ]);
        expect(Object.keys(modecore.MOVABLE_TONIC_DEGREE)).toContain("dorian");
    });

    it("encodes the note-graphic constants as base64 data URIs", () => {
        expect(modecore.wholeNoteImg).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it("replaces the last chord slot with a custom chord", () => {
        modecore.setCustomChord([[1, 2]]);
        expect(modecore.CHORDVALUES[modecore.CHORDVALUES.length - 1]).toEqual([[1, 2]]);
        // Restore, since CHORDVALUES is shared module state other tests also read.
        modecore.setCustomChord([
            [0, 0],
            [2, 0],
            [4, 0],
            [7, 0]
        ]);
    });

    describe("getCustomNote", () => {
        it("spells out each articulation symbol as its musical-notation character", () => {
            expect(modecore.getCustomNote("Abb")).toBe("A𝄫");
            expect(modecore.getCustomNote("Cx")).toBe("C𝄪");
            expect(modecore.getCustomNote("D##")).toBe("D𝄪");
            expect(modecore.getCustomNote("E*")).toBe("E𝄪");
        });
    });

    describe("getModePattern", () => {
        it("returns a flat step-1 pattern for the custom mode outside 12-EDO", () => {
            expect(modecore.getModePattern("custom", 19)).toHaveLength(19);
            expect(modecore.getModePattern("custom", 19).every(step => step === 1)).toBe(true);
        });

        it("falls back to the major pattern for a mode it does not recognize", () => {
            expect(modecore.getModePattern("not-a-mode")).toEqual([2, 2, 1, 2, 2, 2, 1]);
        });

        it("prefers a per-EDO override over the scaled 12-EDO pattern", () => {
            modecore.PITCH_COLLECTIONS_EDO_OVERRIDES[19] = { major: [3, 3, 2, 3, 3, 3, 2] };
            expect(modecore.getModePattern("major", 19)).toEqual([3, 3, 2, 3, 3, 3, 2]);
            delete modecore.PITCH_COLLECTIONS_EDO_OVERRIDES[19];
        });
    });

    describe("GetNotesForInterval", () => {
        const singer = overrides => ({
            singer: {
                noteStatus: null,
                notePitches: {},
                intervals: [],
                noteOctaves: {},
                inNoteBlock: [],
                ...overrides
            }
        });

        it("reads the first and second note from noteStatus, octave from their digits", () => {
            expect(modecore.GetNotesForInterval(singer({ noteStatus: [["C4", "E5"]] }))).toEqual({
                firstNote: "C",
                secondNote: "E",
                octave: 1
            });
        });

        it("repeats the first note when noteStatus has only one entry", () => {
            expect(modecore.GetNotesForInterval(singer({ noteStatus: [["C4"]] }))).toEqual({
                firstNote: "C",
                secondNote: "C",
                octave: 0
            });
        });

        it("reads from notePitches when there is no noteStatus", () => {
            expect(
                modecore.GetNotesForInterval(
                    singer({ notePitches: { 0: ["D4", "F4", "A4"] }, inNoteBlock: [0] })
                )
            ).toEqual({ firstNote: "D4", secondNote: "A4", octave: 0 });
        });

        it("defaults to C-to-C when neither noteStatus nor notePitches has data", () => {
            expect(modecore.GetNotesForInterval(singer())).toEqual({
                firstNote: "C",
                secondNote: "C",
                octave: 0
            });
        });

        it("takes the octave from intervals when intervals are present", () => {
            expect(
                modecore.GetNotesForInterval(singer({ noteStatus: [["C4", "E5"]], intervals: [3] }))
            ).toEqual({ firstNote: "C", secondNote: "E", octave: 0 });
        });

        it("takes the octave from noteOctaves when intervals are absent", () => {
            expect(
                modecore.GetNotesForInterval(
                    singer({
                        notePitches: { 0: ["D4"] },
                        noteOctaves: { 0: [4, 6] },
                        inNoteBlock: [0]
                    })
                )
            ).toEqual({ firstNote: "D4", secondNote: "D4", octave: 2 });
        });
    });

    describe("modeMapper over every branch of its dorian/phrygian/lydian/mixolydian/locrian key table", () => {
        // One case per `case` label the switch inside modeMapper has for each of these five
        // modes (all 12 chromatic keys, spelled sharp and flat where the switch has both), so
        // this sweep exercises the whole 260-line table, not just a hand-picked few keys.
        const cases = [
            ["C", "dorian", ["a♯", "major"]],
            ["D", "dorian", ["c", "major"]],
            ["E", "dorian", ["d", "major"]],
            ["F", "dorian", ["c", "minor"]],
            ["G", "dorian", ["f", "major"]],
            ["A", "dorian", ["g", "major"]],
            ["B", "dorian", ["a", "major"]],
            ["C♯", "dorian", ["b", "major"]],
            ["D♯", "dorian", ["c♯", "major"]],
            ["F♯", "dorian", ["e", "major"]],
            ["G♯", "dorian", ["f♯", "major"]],
            ["A♯", "dorian", ["g♯", "major"]],
            ["D♭", "dorian", ["e♭", "minor"]],
            ["E♭", "dorian", ["e♭", "minor"]],
            ["G♭", "dorian", ["d", "minor"]],
            ["A♭", "dorian", ["e♭", "minor"]],
            ["B♭", "dorian", ["f", "minor"]],
            ["C", "phrygian", ["g♯", "major"]],
            ["D", "phrygian", ["a♯", "major"]],
            ["E", "phrygian", ["c", "major"]],
            ["F", "phrygian", ["d♭", "major"]],
            ["G", "phrygian", ["c", "minor"]],
            ["A", "phrygian", ["f", "major"]],
            ["B", "phrygian", ["g", "major"]],
            ["C♯", "phrygian", ["a", "major"]],
            ["D♯", "phrygian", ["b", "major"]],
            ["F♯", "phrygian", ["d", "major"]],
            ["G♯", "phrygian", ["e", "major"]],
            ["A♯", "phrygian", ["b", "major"]],
            ["D♭", "phrygian", ["g♭", "minor"]],
            ["E♭", "phrygian", ["e♭", "minor"]],
            ["G♭", "phrygian", ["d", "major"]],
            ["A♭", "phrygian", ["d♭", "minor"]],
            ["B♭", "phrygian", ["e♭", "minor"]],
            ["C", "lydian", ["g", "major"]],
            ["D", "lydian", ["a", "major"]],
            ["E", "lydian", ["b", "major"]],
            ["F", "lydian", ["c", "major"]],
            ["G", "lydian", ["d", "major"]],
            ["A", "lydian", ["e", "major"]],
            ["B", "lydian", ["b", "major"]],
            ["C♯", "lydian", ["g♯", "major"]],
            ["D♯", "lydian", ["a♯", "major"]],
            ["F♯", "lydian", ["b", "major"]],
            ["G♯", "lydian", ["c", "minor"]],
            ["A♯", "lydian", ["f", "major"]],
            ["D♭", "lydian", ["f", "minor"]],
            ["E♭", "lydian", ["g", "minor"]],
            ["G♭", "lydian", ["d♭", "minor"]],
            ["A♭", "lydian", ["c", "minor"]],
            ["B♭", "lydian", ["d", "minor"]],
            ["C", "mixolydian", ["f", "major"]],
            ["D", "mixolydian", ["g", "major"]],
            ["E", "mixolydian", ["a", "major"]],
            ["F", "mixolydian", ["a♯", "major"]],
            ["G", "mixolydian", ["c", "major"]],
            ["A", "mixolydian", ["d", "major"]],
            ["B", "mixolydian", ["e", "major"]],
            ["C♯", "mixolydian", ["f♯", "major"]],
            ["D♯", "mixolydian", ["g♯", "major"]],
            ["F♯", "mixolydian", ["b", "major"]],
            ["G♯", "mixolydian", ["c♯", "major"]],
            ["A♯", "mixolydian", ["c", "minor"]],
            ["D♭", "mixolydian", ["e♭", "minor"]],
            ["E♭", "mixolydian", ["f", "minor"]],
            ["G♭", "mixolydian", ["e♭", "minor"]],
            ["A♭", "mixolydian", ["e♭", "minor"]],
            ["B♭", "mixolydian", ["c", "minor"]],
            ["C", "locrian", ["b", "major"]],
            ["D", "locrian", ["c", "minor"]],
            ["E", "locrian", ["f", "major"]],
            ["F", "locrian", ["g♭", "major"]],
            ["G", "locrian", ["g♯", "major"]],
            ["A", "locrian", ["a♯", "major"]],
            ["B", "locrian", ["c", "major"]],
            ["C♯", "locrian", ["d", "major"]],
            ["D♯", "locrian", ["e", "major"]],
            ["F♯", "locrian", ["g", "major"]],
            ["G♯", "locrian", ["a", "major"]],
            ["A♯", "locrian", ["b", "major"]],
            ["D♭", "locrian", ["d", "major"]],
            ["E♭", "locrian", ["d♭", "minor"]],
            ["G♭", "locrian", ["f", "minor"]],
            ["A♭", "locrian", ["g♭", "minor"]],
            ["B♭", "locrian", ["d♭", "minor"]]
        ];

        it.each(cases)("maps %s %s to %j", (key, mode, expected) => {
            expect(modecore.modeMapper(key, mode)).toEqual(expected);
        });
    });

    it("is still reachable through musicutils.js for callers that require it", () => {
        for (const name of [
            "MUSICALMODES",
            "customMode",
            "getModeNumbers",
            "getNonEDOModeSteps",
            "getArticulation",
            "modeMapper",
            "getCustomNote",
            "GetNotesForInterval",
            "base64Encode",
            "scalePatternToEDO",
            "PITCH_COLLECTIONS_EDO_OVERRIDES",
            "getModePattern"
        ]) {
            expect(musicutils[name]).toBe(modecore[name]);
        }
    });

    it("exports every function and table the file declares", () => {
        const source = readSource("musicutils-modecore.js");
        const declared = [
            ...source.matchAll(/^var (\w+) =/gm),
            ...source.matchAll(/^function (\w+)\(/gm)
        ]
            .map(match => match[1])
            .filter(name => name !== "MusicUtilsModeCore");
        expect(Object.keys(modecore).sort()).toEqual(declared.sort());
    });

    it("does not define anything that musicutils.js also defines", () => {
        const remaining = readSource("musicutils.js");
        for (const name of Object.keys(modecore)) {
            expect(remaining).not.toMatch(new RegExp(`^(const|let|var|function) ${name}\\b`, "m"));
        }
    });

    describe("loaded as classic scripts, the way the browser does", () => {
        const order = [
            "musicutils-constants.js",
            "musicutils-i18n.js",
            "musicutils-temperament.js",
            "musicutils-pitch.js",
            "musicutils-lookups.js",
            "musicutils-rhythm.js",
            "musicutils-solfege.js",
            "musicutils-modewheel.js",
            "musicutils-modecore.js",
            "musicutils.js"
        ];
        const load = files => {
            const sandbox = {
                TextEncoder,
                _: value => value,
                isUnsafeObjectKey,
                slicePath,
                DRUMNAMES: [],
                NOISENAMES: [],
                VOICENAMES: [],
                CUSTOMSAMPLES: [],
                localStorage: { getItem: () => null },
                window: { btoa: value => Buffer.from(value, "binary").toString("base64") }
            };
            vm.createContext(sandbox);
            files.forEach(file => vm.runInContext(readSource(file), sandbox, { filename: file }));
            return sandbox;
        };

        it("loads between the mode wheel module and musicutils.js without errors", () => {
            expect(() => load(order)).not.toThrow();
        });

        it("leaves every declared name visible as a bare global", () => {
            const sandbox = load(order);
            for (const name of Object.keys(modecore)) {
                if (name === "MusicUtilsModeCore") continue;
                expect(vm.runInContext(`typeof ${name}`, sandbox)).not.toBe("undefined");
            }
        });

        it("publishes the module object for the RequireJS shim", () => {
            const sandbox = load(order);
            expect(sandbox.window.MusicUtilsModeCore.getModeNumbers("major")).toBe(
                "0 2 4 5 7 9 11"
            );
        });
    });
});
