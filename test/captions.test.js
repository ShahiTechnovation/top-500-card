import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateXLength,
  validateXCaption,
  generateXCaption,
  generateLinkedInCaption
} from '../src/captions.js';
import { SOCIAL_CONFIG } from '../src/config.js';

test('X Caption — Strict <= 280 character limit', () => {
  const caption = generateXCaption();
  const validation = validateXCaption(caption);

  assert.equal(validation.isValid, true);
  assert.ok(validation.length <= 280, `Expected <= 280, got ${validation.length}`);
  assert.ok(validation.length > 150, `Expected reasonable length, got ${validation.length}`);
});

test('X Caption — Contains exact required handles and hashtags', () => {
  const caption = generateXCaption();

  assert.ok(caption.includes('@Tiny_Fish'), 'Missing @Tiny_Fish handle');
  assert.ok(caption.includes('@theBuilder_base'), 'Missing @theBuilder_base handle');
  assert.ok(caption.includes('@Web3indiaHQ'), 'Missing @Web3indiaHQ handle');
  assert.ok(caption.includes('@nexido_official'), 'Missing @nexido_official handle');
  assert.ok(caption.includes('@HackInHills'), 'Missing @HackInHills handle/tag');
  assert.ok(caption.includes('#HIH26'), 'Missing #HIH26 hashtag');
  assert.ok(caption.includes('Built for the climb.'), 'Missing tagline');
});

test('X Caption — No selection/qualification or Top 500 claims', () => {
  const caption = generateXCaption();

  assert.doesNotMatch(caption, /top 500/i);
  assert.doesNotMatch(caption, /qualified/i);
  assert.doesNotMatch(caption, /10,000/i);
  assert.doesNotMatch(caption, /shortlist/i);
  assert.doesNotMatch(caption, /certificate/i);
});

test('LinkedIn Caption — Contains exact required attribution and hashtags', () => {
  const caption = generateLinkedInCaption();

  assert.ok(
    caption.includes('Powered by @TinyFish. Organised by @Builderbase, @Web3India and @Nexido.'),
    'Missing exact LinkedIn attribution string'
  );
  assert.ok(caption.includes('#HackInHills'));
  assert.ok(caption.includes('#HIH26'));
  assert.ok(caption.includes('#BuildInPublic'));
  assert.ok(caption.includes("I'm officially part of Hack in Hills '26!"));
  assert.ok(caption.includes('Built for the climb. ⛰️'));
});

test('LinkedIn Caption — Does not reuse X handles or selection claims', () => {
  const caption = generateLinkedInCaption();

  assert.ok(!caption.includes('@Tiny_Fish'), 'Should not contain X handle @Tiny_Fish');
  assert.ok(!caption.includes('@theBuilder_base'), 'Should not contain X handle @theBuilder_base');
  assert.ok(!caption.includes('@Web3indiaHQ'), 'Should not contain X handle @Web3indiaHQ');
  assert.ok(!caption.includes('@nexido_official'), 'Should not contain X handle @nexido_official');

  assert.doesNotMatch(caption, /top 500/i);
  assert.doesNotMatch(caption, /qualified/i);
  assert.doesNotMatch(caption, /10,000/i);
});

test('LinkedIn Caption — Gracefully personalizes with domains when provided', () => {
  const withDomains = generateLinkedInCaption({ domains: ['AI Agents', 'DevTools'] });
  assert.ok(withDomains.includes('AI Agents and DevTools'));

  const withoutDomains = generateLinkedInCaption({ domains: [] });
  assert.ok(!withoutDomains.includes('I’ll be building in'));
});

test('validateXCaption — Detects valid and invalid lengths accurately', () => {
  const shortText = 'Hack in Hills ’26 Builder!';
  assert.equal(validateXCaption(shortText).isValid, true);

  const tooLong = 'a'.repeat(281);
  assert.equal(validateXCaption(tooLong).isValid, false);
});
