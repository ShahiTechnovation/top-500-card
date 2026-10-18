import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateXLength,
  validateXCaption,
  generateXCaption,
  generateLinkedInCaption,
  generateTop500XCaption,
  generateTop500LinkedInCaption,
  generateGeneralXCaption,
  generateGeneralLinkedInCaption
} from '../src/captions.js';

/* -------------------------------------------------------------------------- */
/* TOP 500 BUILDER PASS TESTS (Primary Upgraded Edition)                      */
/* -------------------------------------------------------------------------- */

test('Top 500 X Caption — Strict <= 280 character limit', () => {
  const caption = generateTop500XCaption();
  const validation = validateXCaption(caption);

  assert.equal(validation.isValid, true);
  assert.ok(validation.length <= 280, `Expected <= 280, got ${validation.length}`);
  assert.ok(validation.length > 150, `Expected reasonable length, got ${validation.length}`);
});

test('Top 500 X Caption — Exact default text and structure', () => {
  const caption = generateTop500XCaption();

  const expected = `Base camp: cleared. 🏔️

I'm in the Top 500 at Hack in Hills '26!
Round 1 done. The climb continues. ⛰️

Powered by @Tiny_Fish
Organised by @theBuilder_base, @Web3indiaHQ & @nexido_official

#HIH26`;

  assert.equal(caption, expected);
});

test('Top 500 X Caption — Exact required handles and hashtags', () => {
  const caption = generateTop500XCaption();

  assert.ok(caption.includes('@Tiny_Fish'), 'Missing @Tiny_Fish handle');
  assert.ok(caption.includes('@theBuilder_base'), 'Missing @theBuilder_base handle');
  assert.ok(caption.includes('@Web3indiaHQ'), 'Missing @Web3indiaHQ handle');
  assert.ok(caption.includes('@nexido_official'), 'Missing @nexido_official handle');
  assert.ok(caption.includes('#HIH26'), 'Missing #HIH26 hashtag');
  assert.ok(!caption.includes('#HackInHills'), 'Should not include extra hashtags on X to preserve length');
});

test('Top 500 X Caption — No false finalist or Manali selection claims', () => {
  const caption = generateTop500XCaption();

  assert.doesNotMatch(caption, /summit pass/i);
  assert.doesNotMatch(caption, /official finalist/i);
  assert.doesNotMatch(caption, /finalist/i);
  assert.doesNotMatch(caption, /manali qualified/i);
  assert.doesNotMatch(caption, /winner/i);
  assert.doesNotMatch(caption, /selected for manali/i);
});

test('Top 500 LinkedIn Caption — Exact default text and structure', () => {
  const caption = generateTop500LinkedInCaption();

  const expected = `Base camp: cleared. 🏔️

10,000+ registrations. Just 500 teams made the cut.
And I'm proud to be among them! 🚀

Officially qualified for Round 2 of Hack in Hills '26.

From thousands of builders across the country to the next stage of the climb, this journey is getting real.

The next checkpoint? Round 2.
The ultimate destination? Manali, Himachal Pradesh. ⛰️

One step closer. A lot more to build.
The climb continues. 🏔️

Powered by @TinyFish. Organised by @Builderbase, @Web3India and @Nexido.

#HackInHills #HIH26 #Hackathon #BuildInPublic`;

  assert.equal(caption, expected);
});

test('Top 500 LinkedIn Caption — Contains exact attribution and hashtags', () => {
  const caption = generateTop500LinkedInCaption();

  assert.ok(
    caption.includes('Powered by @TinyFish. Organised by @Builderbase, @Web3India and @Nexido.'),
    'Missing exact LinkedIn attribution string'
  );
  assert.ok(caption.includes('#HackInHills'));
  assert.ok(caption.includes('#HIH26'));
  assert.ok(caption.includes('#Hackathon'));
  assert.ok(caption.includes('#BuildInPublic'));
  assert.ok(caption.includes('10,000+ registrations. Just 500 teams made the cut.'));
  assert.ok(caption.includes('Officially qualified for Round 2 of Hack in Hills \'26.'));
  assert.ok(caption.includes('The climb continues. 🏔️'));
});

test('Top 500 LinkedIn Caption — Does not reuse X handles or markdown syntax', () => {
  const caption = generateTop500LinkedInCaption();

  assert.ok(!caption.includes('@Tiny_Fish'), 'Should not contain X handle @Tiny_Fish');
  assert.ok(!caption.includes('@theBuilder_base'), 'Should not contain X handle @theBuilder_base');
  assert.ok(!caption.includes('@Web3indiaHQ'), 'Should not contain X handle @Web3indiaHQ');
  assert.ok(!caption.includes('@nexido_official'), 'Should not contain X handle @nexido_official');

  // No markdown formatting symbols
  assert.ok(!caption.includes('**'), 'Should not contain Markdown bold syntax');
  assert.ok(!caption.includes('##'), 'Should not contain Markdown headers');
});

test('Top 500 LinkedIn Caption — Clear round qualification, not final Manali selection', () => {
  const caption = generateTop500LinkedInCaption();

  assert.ok(caption.includes('The next checkpoint? Round 2.'));
  assert.ok(caption.includes('The ultimate destination? Manali, Himachal Pradesh. ⛰️'));
  assert.doesNotMatch(caption, /summit pass/i);
  assert.doesNotMatch(caption, /official finalist/i);
  assert.doesNotMatch(caption, /selected for manali/i);
});

/* -------------------------------------------------------------------------- */
/* PRESERVED GENERAL BUILDER PASS TESTS                                       */
/* -------------------------------------------------------------------------- */

test('General X Caption — Preserved intact with <= 280 chars', () => {
  const caption = generateGeneralXCaption();
  const validation = validateXCaption(caption);

  assert.equal(validation.isValid, true);
  assert.ok(caption.includes('@HackInHills'));
  assert.ok(caption.includes('Built for the climb.'));
  assert.doesNotMatch(caption, /top 500/i);
});

test('General LinkedIn Caption — Preserved intact', () => {
  const caption = generateGeneralLinkedInCaption();

  assert.ok(caption.includes("I'm officially part of Hack in Hills '26!"));
  assert.ok(caption.includes('Built for the climb. ⛰️'));
  assert.doesNotMatch(caption, /top 500/i);
});

test('Polymorphic generateXCaption & generateLinkedInCaption defaults to Top 500', () => {
  const defaultX = generateXCaption();
  assert.ok(defaultX.includes('Top 500'));

  const generalX = generateXCaption({ edition: 'general' });
  assert.ok(!generalX.includes('Top 500'));

  const defaultLi = generateLinkedInCaption();
  assert.ok(defaultLi.includes('Just 500 teams made the cut.'));

  const generalLi = generateLinkedInCaption({ edition: 'general' });
  assert.ok(!generalLi.includes('500 teams'));
});

/* -------------------------------------------------------------------------- */
/* UTILITY TESTS                                                              */
/* -------------------------------------------------------------------------- */

test('validateXCaption — Detects valid and invalid lengths accurately', () => {
  const shortText = 'Hack in Hills ’26 Top 500 Builder Pass!';
  assert.equal(validateXCaption(shortText).isValid, true);

  const tooLong = 'a'.repeat(281);
  assert.equal(validateXCaption(tooLong).isValid, false);
});
