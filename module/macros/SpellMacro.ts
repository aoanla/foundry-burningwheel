import { Skill } from "../items/skill.js";
import { ItemDragData } from "../helpers.js";
import { getImage, getMacroRollPreset, MacroData } from "./Macro.js";
import { BWActor } from "../actors/BWActor.js";
import { BWCharacter } from "../actors/BWCharacter.js";
import { handleNpcSpellRoll } from "../rolls/npcSkillRoll.js";
import { Npc } from "../actors/Npc.js";
import { RollDialogData } from "../rolls/rolls.js";
import { Spell } from "../items/spell.js";
import { handleSpellRoll } from "../rolls/rollSpell.js";

export function CreateSpellRollMacro(dragData: ItemDragData): MacroData | null {
    if (!dragData.actorId) {
        return null;
    }
    const spellData = dragData.data as Spell & { _id: string };
    return {
        name: `Cast ${spellData.name}`,
        type: 'script',
        command: `game.burningwheel.macros.rollSpell("${dragData.actorId}", "${dragData.id}");`,
        img: getImage(spellData.img, "spell")
    };
}

export function RollSpellMacro(actorId: string, spellId: string): void {
    const actor = game.actors?.find(a => a.id === actorId) as BWActor;
    if (!actor) {
        ui.notifications?.notify("Unable to find actor linked to this macro. Were they deleted?", "error");
        return;
    }

    const spell = actor.items.get(spellId) as Spell | null;
    if (!spell) {
        ui.notifications?.notify("Unable to find spell linked to this macro. Was it deleted?", "error");
        return;
    }

    const skill = actor.items.get(spell.system.skillId) as Skill | null;
    if (!skill) {
        ui.notifications?.notify("Unable to find skill linked to the spell in this macro. Ensure a sorcerous skill is linked with this spell.", "error");
        return;
    }
    const dataPreset: Partial<RollDialogData> = getMacroRollPreset(actor);
    if (actor.type === "character") {
        handleSpellRoll({ actor: actor as BWCharacter, skill, spell, dataPreset});
    } else {
        handleNpcSpellRoll({ actor: actor as Npc, skill, spell, dataPreset });
    }
}