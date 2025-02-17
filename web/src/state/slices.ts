import * as advantage from './advantage/slice'
import * as race from './race/slice'
import * as language from './language/slice'
import * as characterTemplates from './characterTemplates/slice'
import * as power from './power/slice'

export type Slices = {
    advantage: typeof advantage;
    language: typeof language;
    race: typeof race;
    ['character-template']: typeof characterTemplates;
    power: typeof power;
}

export const allSlices= {
    advantage: {
        load: advantage.load,
        all: advantage.all,
        byId: advantage.byId,
        created: advantage.created,
        updated: advantage.updated,
    },
    race: {
        load: race.load,
        all: race.all,
        byId: race.byId,
        created: race.created,
        updated: race.updated,
    },
    language: {
        load: language.load,
        all: language.all,
        byId: language.byId,
        created: language.created,
        updated: language.updated,
    },
    ['character-template']: {
        load: characterTemplates.load,
        all: characterTemplates.all,
        byId: characterTemplates.byId,
        created: characterTemplates.created,
        updated: characterTemplates.updated,
    },
    power: {
        load: power.load,
        all: power.all,
        byId: power.byId,
        created: power.created,
        updated: power.updated,
    }
}
