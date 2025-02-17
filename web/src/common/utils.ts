export function getTypedProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

export const singularize = (word: string): string => {
    return word.endsWith('s') ? word.slice(0, -1) : word;
}

let rgxBracketToDot: RegExp;

export const sanitizePath =  (path: string | string[]): string[] => {
    path = path || [] as string[];
    return Array.isArray(path) ? path : path.replace(rgxBracketToDot || (rgxBracketToDot = /\[(\w+)\]/g), '.$1').split('.');
}

export const get = (obj: any, path: string): any => {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    return sanitizePath(path).reduce((acc, val) => acc && acc[val], obj);
}

export const set = (obj: any, path: string | string[], value: any) => {
    const [current,...rest] = sanitizePath(path);
    rest.length >= 1 ? set(obj[current] = obj[current] || {}, rest, value) : obj[current]= value;
    return obj;
}

export const isEqual = (x: any, y: any): boolean => {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        ok(x).length === ok(y).length &&
        ok(x).every(key => isEqual(x[key], y[key]))
    ) : (x === y);
}

export const displayText = {
    "personal": "Personal",
    "touch": "Touch",
    "ten": "10 squares",
    "twenty": "20 squares",
    "forty": "40 squares",
    "weapon_range": "Weapon's range",
    "no_duration": "No Duration",
    "one_minute": "1 Minute",
    "one_hour": "1 Hour",
    "eight_hours": "8 Hours",
    "twenty_four_hours": "24 Hours",
    "save_ends": "Save Ends",
    "create_armor": "Create Armor",
    "create_food_and_water": "Create Food and Water",
    "create_weapon": "Create Weapon",
    "dispel_power": "Dispel power",
    "water_breathing": "Water Breathing",
    "change_appearance": "Change Appearance",
    "change_form": "Change Form",
    "change_size": "Change Size",
    "shape_change": "Shape Change",
    "difficult_terrain": "Difficult Terrain",
    "solid_terrain": "Solid Terrain",
    "plus_ten_to_skill_group": "+10 To Skill Group",
    "plus_twenty_to_skill_group": "+20 To Skill Group",
    "plus_thirty_to_skill_group": "+30 To Skill Group",
    "plus_ten_to_save": "+10 To Save",
    "plus_twenty_to_save": "+20 To Save",
    "plus_thirty_to_save": "+30 To Save",
    "success_shift": "Success Shift",
    "extra_defense_action": "Extra Defense Action",
    "power_sight": "Power Sight",
    "low_light_vision": "Low Light Vision",
    "blind_sight": "Blind Sight",
    "true_seeing": "True Seeing",
    "climb_duration": "Climb Duration",
    "swim_duration": "Swim Duration",
    "climb_add_to_move": "Climb Add To Move",
    "swim_add_to_move": "Swim Add To Move",
    "water_walking": "Water Walking",
    "movement_equals_move": "Movement Equals Move",
    "movement_equals_move_plus_2": "Movement Equals Move +2",
    "movement_equals_move_plus_4": "Movement Equals Move +4",
    "shift_2": "Shift 2",
    "shift_4": "Shift 4",
    "shift_6": "Shift 6",
    "standard_attack": "Standard Attack",
    "save_vs_condition": "Save VS Condition",
    "temp_HP": "Temp HP",
    "danger": "Danger Sense",
    "elemental_bonus": "Elemental Bonus",
    "extra_weapon": "Extra Weapon",
    "lore_arcana": "Lore: Arcana",
    "lore_nature": "Lore: Nature",
    "lore_social": "Lore: Social",
    "lore_technology": "Lore: Technology",
    "combat_effect": "Combat Effect",
    "combat_axes_and_picks":"Combat: Axes and Picks",
    "combat_blade":"Combat: Blade",
    "combat_bludgeoning":"Combat: Bludgeoning",
    "combat_natural":"Combat: Natural",
    "combat_projectile":"Combat: Projectile",
    "combat_shield":"Combat: Shield",
    "combat_staff_weapons":"Combat: Staff Weapons",
    "athletics_base": 'Athletics',
    "powers_base": 'Powers',
    "combat_base": 'Combat',
    "interaction_base": 'Interaction',
    "profession_base": 'Profession',
    "lore_base": 'Lore',
    "lore_history": 'Lore: History',
    "observation_base": 'Observation',
    "appraise": 'Appraise',
    "insight": 'Insight',
    "navigate": 'Navigate',
    "perception": 'Perception',
    "chicanery": 'Chicanery',
    "command": 'Command',
    "diplomacy": 'Diplomacy',
    "fast_talking": 'Fast Talking',
    "divination": 'Divination',
    "energy": 'Energy',
    "life": 'Life',
    "mind": 'Mind',
    "planar": 'Planar',
    "acrobatics": 'Acrobatics',
    "dodge": 'Dodge',
    "pilot": 'Pilot',
    "stealth": 'Stealth',
    "str": 'Strength',
    "con": 'Constitution',
    "siz": 'Size',
    "int": 'Intelligence',
    "pow": 'Power',
    "dex": 'Dexterity',
    "chr": 'Charisma',
}


