// Old riddles, the kind that have been passed round kitchen tables for a
// century or more. Nobody owns them.

export interface Riddle {
  riddle: string;
  hint: string;
  answers: string[];
  /** How Max says the answer. */
  reveal: string;
}

export const RIDDLES: readonly Riddle[] = [
  { riddle: "What has keys but can't open a single lock?", hint: 'You could play it.', answers: ['piano', 'a piano', 'keyboard'], reveal: 'A piano.' },
  { riddle: "What has hands but can't clap?", hint: "It's on the wall.", answers: ['clock', 'a clock', 'watch', 'a watch'], reveal: 'A clock.' },
  { riddle: 'What gets wetter the more it dries?', hint: "It's in the bathroom.", answers: ['towel', 'a towel'], reveal: 'A towel.' },
  { riddle: 'What has a neck but no head?', hint: 'You can pour from it.', answers: ['bottle', 'a bottle'], reveal: 'A bottle.' },
  { riddle: 'What can travel around the world while staying in a corner?', hint: 'It goes on an envelope.', answers: ['stamp', 'a stamp', 'postage stamp'], reveal: 'A stamp.' },
  { riddle: 'What has to be broken before you can use it?', hint: 'Breakfast.', answers: ['egg', 'an egg', 'eggs'], reveal: 'An egg.' },
  { riddle: "I'm tall when I'm young and short when I'm old. What am I?", hint: 'It gives light.', answers: ['candle', 'a candle'], reveal: 'A candle.' },
  { riddle: 'What has one eye but cannot see?', hint: 'Thread goes through it.', answers: ['needle', 'a needle'], reveal: 'A needle.' },
  { riddle: 'What goes up but never comes down?', hint: 'You have more of it every birthday.', answers: ['age', 'your age', 'my age'], reveal: 'Your age.' },
  { riddle: 'What has many teeth but cannot bite?', hint: "It's for your hair.", answers: ['comb', 'a comb'], reveal: 'A comb.' },
  { riddle: 'What runs but never walks, and has a mouth but never talks?', hint: 'Water.', answers: ['river', 'a river'], reveal: 'A river.' },
  { riddle: 'What can you catch but never throw?', hint: 'You sneeze.', answers: ['cold', 'a cold'], reveal: 'A cold.' },
  { riddle: 'The more you take, the more you leave behind. What are they?', hint: 'Look at the ground behind you.', answers: ['footsteps', 'footprints', 'steps'], reveal: 'Footsteps.' },
  { riddle: 'What building has the most stories?', hint: 'Quiet, please.', answers: ['library', 'a library'], reveal: 'A library.' },
  { riddle: 'What has words but never speaks?', hint: 'It has pages.', answers: ['book', 'a book'], reveal: 'A book.' },
  { riddle: 'What has a thumb and four fingers but is not alive?', hint: 'Winter.', answers: ['glove', 'a glove', 'gloves'], reveal: 'A glove.' },
  { riddle: 'What is full of holes but still holds water?', hint: 'The kitchen sink.', answers: ['sponge', 'a sponge'], reveal: 'A sponge.' },
  { riddle: 'What can fill a room but takes up no space?', hint: 'Flip the switch.', answers: ['light'], reveal: 'Light.' },
  { riddle: 'I have branches but no fruit, no trunk, and no leaves. What am I?', hint: 'Money.', answers: ['bank', 'a bank'], reveal: 'A bank.' },
  { riddle: 'What comes once in a minute, twice in a moment, but never in a thousand years?', hint: 'Spell them.', answers: ['m', 'the letter m', 'letter m'], reveal: 'The letter M.' },
  { riddle: 'What has cities but no houses, forests but no trees, and water but no fish?', hint: 'Unfold it.', answers: ['map', 'a map'], reveal: 'A map.' },
  { riddle: 'What can you hold in your left hand but never in your right?', hint: 'Part of you.', answers: ['right elbow', 'your right elbow', 'my right elbow', 'elbow', 'right hand', 'your right hand'], reveal: 'Your right elbow.' },
  { riddle: 'Forward I am heavy, but backward I am not. What am I?', hint: 'Spell it backwards.', answers: ['ton', 'a ton'], reveal: 'A ton. Backwards it is "not".' },
  { riddle: 'What begins with T, ends with T, and has T in it?', hint: 'Boil the kettle.', answers: ['teapot', 'a teapot'], reveal: 'A teapot.' },
  { riddle: 'What gets bigger the more you take away from it?', hint: 'Dig.', answers: ['hole', 'a hole'], reveal: 'A hole.' },
  { riddle: 'What has four wheels and flies?', hint: 'It comes on Tuesdays.', answers: ['garbage truck', 'a garbage truck', 'trash truck', 'a trash truck'], reveal: 'A garbage truck.' },
  { riddle: 'What kind of coat is best put on wet?', hint: 'Not the closet.', answers: ['paint', 'a coat of paint', 'coat of paint'], reveal: 'A coat of paint.' },
  { riddle: 'What has a bottom at the top?', hint: 'You have two.', answers: ['legs', 'your legs', 'leg'], reveal: 'Your legs.' },
];
