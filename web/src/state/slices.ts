import * as advantage from './advantage/slice'
import * as race from './race/slice'
import * as language from './language/slice'
import * as characterTemplates from './characterTemplates/slice'
import * as power from './power/slice'

export type Slices = {
    advantage: typeof advantage;
    language: typeof language;
    race: typeof race;
    characterTemplate: typeof characterTemplates;
    power: typeof power;
}

export const allSlices= {
    advantage: {
        load: advantage.load,
        all: advantage.all,
        byId: advantage.byId,
    },
    race: {
        load: race.load,
        all: race.all,
        byId: race.byId,
    },
    language: {
        load: language.load,
        all: language.all,
        byId: language.byId,
    },
    characterTemplate: {
        load: characterTemplates.load,
        all: characterTemplates.all,
        byId: characterTemplates.byId,
    },
    power: {
        load: power.load,
        all: power.all,
        byId: power.byId,
    }
}
