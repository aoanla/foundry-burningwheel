import { spellLengthSelect } from "../../constants.js";
import { StringIndexedObject } from "../../helpers.js";
import { BWItemSheet, BWItemSheetData } from "./bwItemSheet.js";

export class SpellSheet extends BWItemSheet {
    static get defaultOptions(): BaseEntitySheet.Options {
        return mergeObject(super.defaultOptions, {});
    }

    get template(): string {
        return "systems/burningwheel/templates/items/spell.hbs";
    }

    getData(): TraitSheetData {
        const data = super.getData() as TraitSheetData;
        data.spellLengths = spellLengthSelect;
        return data;
    }
}

interface TraitSheetData extends BWItemSheetData {
    spellLengths: StringIndexedObject<string>;
}
