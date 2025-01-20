import * as advantage from './advantage/slice'
import * as race from './race/slice'
import * as language from './language/slice'

export type Slices = {
    advantage: typeof advantage;
    language: typeof language;
    race: typeof race;
}

export const allSlices= {
    advantage: {
        load: advantage.load,
        all: advantage.all,
    },
    race: {
        load: race.load,
        all: race.all,
    },
    language: {
        load: language.load,
        all: language.all,
    }
}
