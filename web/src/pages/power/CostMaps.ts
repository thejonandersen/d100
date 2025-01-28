type CostMaps = {
    [key: string]: any
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
        conditions: {},
        combat_effects: {},
        movement: {
            shift_2: 2,
            shift_3: 3,
            shift_4: 4,
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
        conditions: {
            charm: 2,
            stagger: 1,
            slow: 3,
            restrain: 2
        },
        combat_effects: {
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
        conditions: {
            charm: 2,
            stagger: 1,
            slow: 3,
            stun: 5,
            weaken: 3,
            blind: 2,
            restrain: 2,
            panic: 3
        },
        combat_effects: {
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
            movement_equals_move_plus_3: 3,
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
    }

}

export default CostMaps
