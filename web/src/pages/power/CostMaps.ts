type CostMaps = {
    [key: string]: any
}

const loreMap = {
    duration: {
        "no_duration": 0,
            "one_minute": 1,
            "one_hour": 3,
            "eight_hours": 4,
            "twenty_four_hours": 6,
    },
    areaOfEffect: {
        target: {
            1: 0,
        },
    },
    range: {
        touch: 0,
    },
    apCost: {
        5: -1,
            3: 0,
            2: 2,
            1: 4,
            0: 5
    },
    damage: {
        extra_weapon: {
            low: 2,
                medium: 3,
                high: 4,
        },
    },
    healing: {
        healing: {
            low: 0,
                medium: 1,
                high: 2,
                superior: 5,
        },
        save_vs_condition: 2,
            temp_hp: {
            low: 1,
                high: 2,
        }
    },
    condition: {},
    combat_effect: {},
    movement: {},
    sense: {},
    benefit: {
        plus_ten_to_skill_group: 1,
            plus_ten_to_save: 1,
            plus_twenty_to_save: 2,
            plus_twenty_to_skill_group: 2,
            plus_thirty_to_save: 4,
            plus_thirty_to_skill_group: 4,
    },
    terrain: {},
    warding: {},
    polymorph: {},
    miscellaneous: {}
}

const CostMaps: CostMaps = {
    divination: {
        duration: {
            "no_duration": 0,
            "one_minute": 1,
            "one_hour": 3,
            "eight_hours": 4,
            "twenty_four_hours": 6,
        },
        areaOfEffect: {
            burst: {
                1: 2,
                2: 4,
                3: 6,
            },
            aura: {
                1: 2,
                2: 4,
                3: 6,
            },
            blast: {
                3: 1,
                5: 3,
                7: 5,
            },
            wall: {
                6: 2,
                12: 3
            },
            trap: 1,
            target: {
                1: 0,
                2: 1,
                3: 2,
                4: 3,
            },
        },
        range: {
            touch: -1,
            ten: 0,
            twenty: 1,
            forty: 2
        },
        apCost: {
            5: -1,
            3: 0,
            2: 2,
            1: 4,
            0: 5
        },
        damage: {

        },
        healing: {

        },
        condition: {},
        combat_effect: {},
        movement: {
            shift_2: 2,
            shift_4: 3,
            shift_6: 4,
        },
        sense: {
            power_sight: 0,
            lifesense: 3,
            item: 2,
            danger: 2,
            low_light_vision: 1,
            darkvision: 2,
            blind_sight: 3,
            true_seeing: 4,
            empathy: 1,
        },
        benefit: {
            plus_ten_to_skill_group: 1,
            plus_twenty_to_skill_group: 2,
            plus_thirty_to_skill_group: 4,
            plus_ten_to_save: 1,
            plus_twenty_to_save: 2,
            plus_thirty_to_save: 4,
            reroll: 5,
            success_shift: 8,
            extra_defense_action: 4,
        },
        terrain: {},
        warding: {},
        polymorph: {},
        miscellaneous: {},
    },
    energy: {
        duration: {
            "no_duration": 0,
            "one_minute": 1,
            "one_hour": 3,
            "eight_hours": 4,
            "twenty_four_hours": 6,
        },
        areaOfEffect: {
            burst: {
                1: 2,
                2: 4,
                3: 6,
            },
            aura: {
                1: 2,
                2: 4,
                3: 6,
            },
            blast: {
                3: 1,
                5: 3,
                7: 5,
            },
            wall: {
                6: 2,
                12: 3
            },
            trap: 1,
            target: {
                1: 0,
                2: 1,
                3: 2,
                4: 3,
            },
        },
        range: {
            touch: -1,
            ten: 0,
            twenty: 1,
            forty: 2
        },
        apCost: {
            5: -1,
            3: 0,
            2: 2,
            1: 4,
            0: 5
        },
        damage: {
            energy: {
                low: -1,
                high: 0,
                superior: 6
            },
            ongoing: {
                low: 2,
                high: 3,
            },
            elemental_bonus: 1
        },
        healing: {

        },
        condition: {
            charm: 2,
            stagger: 1,
            slow: 3,
            restrain: 2
        },
        combat_effect: {
            trip: 1,
            disarm: 1,
            push: 1,
            pull: 1,
            slide: 2,
            grapple: 2,
        },
        movement: {
            swim_duration: 1,
            burrow_duration: 1,
            fly: 4,
            water_walking: 1
        },
        sense: {
            power_sight: 1
        },
        benefit: {},
        terrain: {
            light: 1,
            obscured: 1,
            difficult_terrain: 1,
            silenced: 1,
            solid_terrain: 3
        },
        warding: {
            acid: 2,
            cold: 2,
            electrical: 2,
            fire: 2,
            force: 2,
        },
        polymorph: {},
        miscellaneous: {
            create_armor: {
                medium: 1,
                superior: 5,
            }
        },
    },
    life: {
        duration: {
            "no_duration": 0,
            "one_minute": 1,
            "one_hour": 3,
            "eight_hours": 4,
            "twenty_four_hours": 6,
        },
        areaOfEffect: {
            burst: {
                1: 2,
                2: 4,
                3: 6,
            },
            aura: {
                1: 2,
                2: 4,
                3: 6,
            },
            blast: {
                3: 1,
                5: 3,
                7: 5,
            },
            wall: {
                6: 2,
                12: 3
            },
            trap: 1,
            target: {
                1: 0,
                2: 1,
                3: 2,
                4: 3,
            },
        },
        range: {
            touch: -1,
            ten: 0,
            twenty: 1,
            forty: 2
        },
        apCost: {
            5: -1,
            3: 0,
            2: 2,
            1: 4,
            0: 5
        },
        damage: {
            direct: {
                low: 0,
                high: 1,
                superior: 6,
            },
            ongoing: {
                low: 2,
                high: 3,
            },
            elemental_bonus: 1,
            siphon: {
                low: 4,
                high: 5,
            }
        },
        healing: {
            healing: {
                low: 0,
                medium: 1,
                high: 2,
                superior: 5,
            },
            regeneration: 7,
            save_vs_condition: 2,
            temp_hp: {
                low: 1,
                high: 2,
            }
        },
        condition: {
            charm: 2,
            stagger: 1,
            slow: 3,
            stun: 5,
            weaken: 3,
            blind: 2,
            restrain: 2,
            panic: 3
        },
        combat_effect: {
            trip: 1,
            disarm: 1,
            push: 1,
            pull: 1,
            slide: 2,
            grapple: 2,
        },
        movement: {
            climb_duration: 2,
            swim_duration: 1,
            burrow_duration: 4,
            fly: 4,
            water_walking: 1,
            movement_equals_move: 1,
            movement_equals_move_plus_2: 2,
            movement_equals_move_plus_4: 3,
        },
        sense: {
            power_sight: 1,
            lifesense: 2,
            danger: 3,
            low_light_vision: 2,
            darkvision: 3,
            blind_sight: 4,
        },
        benefit: {
            plus_ten_to_skill_group: 1,
            plus_ten_to_save: 1,
            plus_twenty_to_skill_group: 2,
            plus_twenty_to_save: 2,
            plus_thirty_to_save: 4,
            plus_thirty_to_skill_group: 4,
        },
        terrain: {
            light: 1,
            difficult_terrain: 1,
            solid_terrain: 3
        },
        warding: {
        },
        polymorph: {
            change_appearance: 1,
            change_form: 2,
            change_size: 5,
            shape_change: 6,
        },
        miscellaneous: {
            create_armor: {
                medium: 1,
                superior: 5,
            },
            create_food_and_water: 3,
            create_weapon: {
                medium: 0,
                superior: 6,
            },
            water_breathing: 2,
        },
    },
    mind: {
        duration: {
            "no_duration": 0,
            "one_minute": 1,
            "one_hour": 3,
            "eight_hours": 4,
            "twenty_four_hours": 6,
        },
        areaOfEffect: {
            burst: {
                1: 2,
                2: 4,
                3: 6,
            },
            aura: {
                1: 2,
                2: 4,
                3: 6,
            },
            blast: {
                3: 1,
                5: 3,
                7: 5,
            },
            wall: {
                6: 2,
                12: 3
            },
            trap: 1,
            target: {
                1: 0,
                2: 1,
                3: 2,
                4: 3,
            },
        },
        range: {
            touch: -1,
            ten: 0,
            twenty: 1,
            forty: 2
        },
        apCost: {
            5: -1,
            3: 0,
            2: 2,
            1: 4,
            0: 5
        },
        damage: {
            direct: {
                low: 0,
                high: 1,
                superior: 6,
            },
            ongoing: {
                low: 3,
                high: 4,
            },
        },
        healing: {
            healing: {
                low: 2,
            },
            save_vs_condition: 4,
        },
        condition: {
            charm: 2,
            dominant: 6,
            stagger: 1,
            slow: 3,
            stun: 5,
            weaken: 3,
            blind: 3,
            restrain: 2,
            panic: 2
        },
        combat_effect: {
            trip: 1,
            disarm: 1,
            push: 1,
            pull: 1,
            slide: 2,
            grapple: 2,
        },
        movement: {
            fly: 4,
            water_walking: 1,
        },
        sense: {
            power_sight: 1,
            lifesense: 3,
            danger: 2,
            low_light_vision: 2,
            darkvision: 3,
            blind_sight: 4,
            true_seeing: 5,
            telepathy: 1,
            empathy: 1
        },
        benefit: {},
        terrain: {
            light: 1,
            obscured: 1,
            difficult_terrain: 2,
            silenced: 1,
            solid_terrain: 3
        },
        warding: {
        },
        polymorph: {
            change_appearance: 2,
            change_form: 3,
            change_size: 6,
            shape_change: 7,
        },
        miscellaneous: {
            create_armor: {
                medium: 2,
                superior: 6,
            },
            create_weapon: {
                medium: 2,
                superior: 8,
            },
            invisibility: 5,
            telekinesis: 1
        },
    },
    planar: {
        duration: {
            "no_duration": 0,
            "one_minute": 1,
            "one_hour": 3,
            "eight_hours": 4,
            "twenty_four_hours": 6,
        },
        areaOfEffect: {
            burst: {
                1: 2,
                2: 4,
                3: 6,
            },
            aura: {
                1: 2,
                2: 4,
                3: 6,
            },
            blast: {
                3: 1,
                5: 3,
                7: 5,
            },
            wall: {
                6: 2,
                12: 3
            },
            trap: 1,
            target: {
                1: 0,
                2: 1,
                3: 2,
                4: 3,
            },
        },
        range: {
            touch: -1,
            ten: 0,
            twenty: 1,
            forty: 2
        },
        apCost: {
            5: -1,
            3: 0,
            2: 2,
            1: 4,
            0: 5
        },
        condition: {
            charm: 2,
            stagger: 0,
            slow: 2,
            restrain: 2,
        },
        combat_effect: {
            trip: 1,
            disarm: 1,
            push: 1,
            pull: 1,
            slide: 2,
            grapple: 2,
        },
        movement: {
            fly: 4,
            water_walking: 1,
            teleport: 2,
            phasing: 3,
            movement_equals_move: 1,
            movement_equals_move_plus_2: 2,
            movement_equals_move_plus_4: 3,
            shift_2: 1,
            shift_4: 2,
            shift_6: 3,
        },
        sense: {
            power_sight: 0,
            item: 2,
            true_seeing: 5,
            telepathy: 3,
        },
        benefit: {},
        warding: {
        },
        terrain: {
            light: 1,
            obscured: 1,
            difficult_terrain: 1,
            silenced: 1,
            solid_terrain: 2
        },
        polymorph: {
            change_appearance: 2,
            change_form: 3,
            change_size: 6,
            shape_change: 7,
        },
        miscellaneous: {
            create_armor: {
                medium: 2,
                superior: 6,
            },
            create_weapon: {
                medium: 2,
                superior: 8,
            },
            invisibility: 5,
            telekinesis: 1
        },
    },
    melee: {
        duration: {
            "no_duration": 0,
        },
        areaOfEffect: {
            burst: {
                1: 2,
                2: 4,
            },
            aura: {
                1: 2,
                2: 4,
                3: 6,
            },
            target: {
                1: 0,
                2: 1,
                3: 2,
                4: 3,
            },
        },
        range: {},
        apCost: {
            5: -1,
            3: 0,
            2: 2,
            1: 4,
            0: 5
        },
        damage: {
            extra_weapon: {
                low: 2,
                medium: 3,
                high: 4,
            },
        },
        healing: {},
        condition: {
            stagger: 1,
            slow: 3,
            stun: 5,
            weaken: 3,
            blind: 3,
            restrain: 2,
        },
        combat_effect: {
            trip: 1,
            disarm: 1,
            push: 1,
            pull: 2,
            slide: 2,
            sunder: 1,
            grapple: 2,
            standard_attack: 0,
        },
        movement: {
            climb_add_to_move: 1,
            swim_add_to_move: 1,
            movement_equals_move: 1,
            movement_equals_move_plus_2: 2,
            movement_equals_move_plus_4: 3,
            shift_2: 1,
            shift_4: 2,
            shift_6: 3,
        },
        sense: {},
        benefit: {
            reroll: 5,
            success_shift: 8,
            extra_defense_action: 4,
        },
        terrain: {
            difficult_terrain: 2,
        },
        warding: {
        },
        polymorph: {},
        miscellaneous: {},
    },
    thrown: {
        duration: {
            "no_duration": 0,
        },
        areaOfEffect: {
            burst: {
                1: 2,
            },
            aura: {
                1: 2,
            },
            blast: {
                3: 2,
            },
            target: {
                1: 0,
                2: 1,
                3: 2,
                4: 3,
            },
        },
        range: {},
        apCost: {
            5: -1,
            3: 0,
            2: 2,
            1: 4,
            0: 5
        },
        damage: {
            extra_weapon: {
                low: 2,
                medium: 3,
                high: 4,
            },
        },
        healing: {},
        condition: {
            stagger: 1,
            slow: 3,
            stun: 5,
            weaken: 3,
            blind: 3,
            restrain: 3,
        },
        combat_effect: {
            trip: 1,
            disarm: 1,
            push: 1,
            pull: 2,
            slide: 2,
            sunder: 1,
            grapple: 2,
            standard_attack: 0,
        },
        movement: {
            movement_equals_move: 1,
            movement_equals_move_plus_2: 2,
            movement_equals_move_plus_4: 3,
            shift_2: 1,
            shift_4: 2,
            shift_6: 3,
        },
        sense: {},
        benefit: {
            reroll: 5,
            success_shift: 9,
            extra_defense_action: 4,
        },
        terrain: {
            difficult_terrain: 2,
        },
        warding: {},
        polymorph: {},
        miscellaneous: {},
    },
    projectile: {
        duration: {
            "no_duration": 0,
        },
        areaOfEffect: {
            burst: {
                1: 2,
            },
            aura: {
                1: 2,
            },
            blast: {
                3: 2,
                5: 4,
            },
            target: {
                1: 0,
                2: 1,
                3: 2,
                4: 3,
            },
            trap: 2,
        },
        range: {},
        apCost: {
            5: -1,
            3: 0,
            2: 2,
            1: 4,
            0: 5
        },
        damage: {
            extra_weapon: {
                low: 2,
                medium: 3,
                high: 4,
            },
        },
        healing: {},
        condition: {
            stagger: 1,
            slow: 3,
            stun: 5,
            weaken: 3,
            blind: 3,
            restrain: 3,
        },
        combat_effect: {
            trip: 1,
            disarm: 1,
            push: 1,
            pull: 2,
            slide: 2,
            sunder: 1,
            grapple: 2,
            standard_attack: 0,
        },
        movement: {
            movement_equals_move: 1,
            movement_equals_move_plus_2: 2,
            movement_equals_move_plus_4: 3,
            shift_2: 1,
            shift_4: 2,
            shift_6: 3,
        },
        sense: {},
        benefit: {
            reroll: 5,
            success_shift: 9,
            extra_defense_action: 4,
        },
        terrain: {
            difficult_terrain: 2,
        },
        warding: {},
        polymorph: {},
        miscellaneous: {},
    },
    athletics: {
        duration: {
            "no_duration": 0,
        },
        areaOfEffect: {
            target: {
                1: 0,
            },
        },
        range: {
            touch: 0,
        },
        apCost: {
            5: -2,
            3: -1,
            2: 0,
            1: 4,
            0: 5
        },
        damage: {},
        healing: {},
        condition: {},
        combat_effect: {},
        movement: {
            climb_add_to_move: 1,
            swim_add_to_move: 1,
            fly: 7,
            water_walking: 4,
            movement_equals_move: 0,
            movement_equals_move_plus_2: 1,
            movement_equals_move_plus_4: 2,
            shift_2: 1,
            shift_4: 2,
            shift_6: 3,
        },
        sense: {},
        benefit: {
            reroll: 5,
            success_shift: 8,
            extra_defense_action: 4,
        },
        terrain: {},
        warding: {},
        polymorph: {},
        miscellaneous: {},
    },
    interaction: {
        duration: {
            "no_duration": 0,
            "one_minute": 1,
            "one_hour": 3,
            "eight_hours": 4,
            "twenty_four_hours": 6,
        },
        areaOfEffect: {
            burst: {
                1: 2,
                2: 4,
                3: 6,
            },
            aura: {
                1: 2,
                2: 4,
                3: 6,
            },
            blast: {
                3: 1,
                5: 3,
                7: 5,
            },
            target: {
                1: 0,
                2: 1,
                3: 2,
                4: 3,
            },
        },
        range: {
            touch: -1,
            ten: 0,
            twenty: 1,
            forty: 2
        },
        apCost: {
            5: -1,
            3: 0,
            2: 2,
            1: 4,
            0: 5
        },
        damage: {},
        healing: {
            save_vs_condition: 4,
            temp_hp: {
                low: 2,
                high: 4,
            }
        },
        condition: {
            charm: 2,
            dominate: 6,
            stagger: 1,
            slow: 4,
            stun: 5,
            panic: 3,
        },
        combat_effect: {
            trip: 2,
            disarm: 2,
            push: 1,
            pull: 2,
            slide: 2,
        },
        movement: {
            movement_equals_move: 2,
            movement_equals_move_plus_2: 3,
            movement_equals_move_plus_4: 4,
            shift_2: 2,
            shift_4: 3,
            shift_6: 4,
        },
        sense: {},
        benefit: {
            plus_ten_to_skill_group: 1,
            plus_ten_to_save: 1,
            plus_twenty_to_save: 2,
            plus_twenty_to_skill_group: 2,
            plus_thirty_to_save: 4,
            plus_thirty_to_skill_group: 4,
            reroll: 5,
            success_shift: 8,
        },
        terrain: {},
        warding: {},
        polymorph: {},
        miscellaneous: {},
    },
    lore_nature: loreMap,
    lore_arcana: loreMap,
    lore_technology: loreMap,
    lore_social: loreMap,
    observation: {
        duration: {
            "no_duration": 0,
            "one_minute": 1,
            "one_hour": 3,
            "eight_hours": 4,
            "twenty_four_hours": 6,
        },
        areaOfEffect: {
            target: {
                1: 0,
            },
        },
        range: {
            touch: 0,
        },
        apCost: {
            5: -1,
            3: 0,
            2: 2,
            1: 4,
            0: 5
        },
        damage: {},
        healing: {},
        condition: {},
        combat_effect: {},
        movement: {},
        sense: {
            power_sight: 3,
            lifesense: 3,
            danger: 2,
            low_light_vision: 2,
            darkvision: 3,
            blind_sight: 4,
            true_seeing: 5,
        },
        benefit: {
            plus_ten_to_skill_group: 2,
            plus_twenty_to_skill_group: 3,
            plus_thirty_to_skill_group: 5,
            plus_ten_to_save: 2,
            plus_twenty_to_save: 3,
            plus_thirty_to_save: 5,
            reroll: 5,
            success_shift: 9,
            extra_defense_action: 4,
        },
        terrain: {},
        warding: {},
        polymorph: {},
        miscellaneous: {},
    },
}

export default CostMaps
