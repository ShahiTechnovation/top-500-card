import { SOCIAL_CONFIG } from './config.js';

/**
 * Calculates Twitter / X weighted character length:
 * - URLs count as 23 characters (t.co standard)
 * - Emojis and extended code points count as 2 characters
 * - Standard ASCII / Latin characters count as 1 character
 */
export function calculateXLength(text) {
  if (!text) return 0;

  // Replace URLs with 23 characters
  const urlRegex = /https?:\/\/[^\s]+/gi;
  const withoutUrls = text.replace(urlRegex, 'x'.repeat(23));

  // Use Intl.Segmenter for accurate grapheme cluster analysis
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    let count = 0;
    for (const { segment } of segmenter.segment(withoutUrls)) {
      if (segment === '\r\n') {
        count += 1;
      } else {
        const cp = segment.codePointAt(0);
        // Emojis / surrogate pairs / wide symbols count as 2
        if (
          cp > 0xffff ||
          (cp >= 0x2600 && cp <= 0x27bf) || // Misc symbols & Dingbats (e.g. ⛰, 🏔, 🚀)
          (cp >= 0x2b00 && cp <= 0x2bff) ||
          (cp >= 0xfe00 && cp <= 0xfe0f) ||
          (segment.length > 1 && cp > 127)
        ) {
          count += 2;
        } else {
          count += 1;
        }
      }
    }
    return count;
  }

  // Fallback: iterate over characters/code points
  let count = 0;
  for (const char of withoutUrls) {
    const cp = char.codePointAt(0);
    if (cp > 0xffff || (cp >= 0x2600 && cp <= 0x27bf)) {
      count += 2;
    } else {
      count += 1;
    }
  }
  return count;
}

/**
 * Validates X caption length against the strict 280-character limit.
 */
export function validateXCaption(text) {
  const length = calculateXLength(text);
  const isValid = length <= SOCIAL_CONFIG.x.charLimit;
  return {
    length,
    limit: SOCIAL_CONFIG.x.charLimit,
    remaining: SOCIAL_CONFIG.x.charLimit - length,
    isValid
  };
}

/**
 * Generates the official Top 500 Builder Pass X caption.
 * Strictly 280 characters or fewer.
 */
export function generateTop500XCaption(options = {}) {
  const { domains = [], includeDomain = false } = options;

  const defaultCaption = `Base camp: cleared. 🏔️

I'm in the Top 500 at Hack in Hills '26!
Round 1 done. The climb continues. ⛰️

Powered by @Tiny_Fish
Organised by @theBuilder_base, @Web3indiaHQ & @nexido_official

#HIH26`;

  if (includeDomain && Array.isArray(domains) && domains.length > 0) {
    const domainStr = domains[0];
    const candidate = `Base camp: cleared. 🏔️

I'm in the Top 500 at Hack in Hills '26!
Building in ${domainStr}.
Round 1 done. The climb continues. ⛰️

Powered by @Tiny_Fish
Organised by @theBuilder_base, @Web3indiaHQ & @nexido_official

#HIH26`;

    if (calculateXLength(candidate) <= SOCIAL_CONFIG.x.charLimit) {
      return candidate;
    }
  }

  return defaultCaption;
}

/**
 * Generates the official Top 500 Builder Pass LinkedIn caption.
 * Highlights Round 1 qualification, Top 500 milestone, and builder community.
 */
export function generateTop500LinkedInCaption(options = {}) {
  const { domains = [], includeDomain = false } = options;
  const domainText = Array.isArray(domains) && domains.length > 0
    ? (domains.length > 1 ? domains.slice(0, -1).join(', ') + ' and ' + domains.at(-1) : domains[0])
    : '';

  const domainSentence = (includeDomain && domainText)
    ? `\nI’ll be building in ${domainText}.\n`
    : '';

  if (domainSentence) {
    return `Base camp: cleared. 🏔️

10,000+ registrations. Just 500 teams made the cut.
And I'm proud to be among them! 🚀

Officially qualified for Round 2 of Hack in Hills '26.${domainSentence}
From thousands of builders across the country to the next stage of the climb, this journey is getting real.

The next checkpoint? Round 2.
The ultimate destination? Manali, Himachal Pradesh. ⛰️

One step closer. A lot more to build.
The climb continues. 🏔️

${SOCIAL_CONFIG.linkedIn.attribution}

${SOCIAL_CONFIG.linkedIn.hashtags.join(' ')}`;
  }

  return `Base camp: cleared. 🏔️

10,000+ registrations. Just 500 teams made the cut.
And I'm proud to be among them! 🚀

Officially qualified for Round 2 of Hack in Hills '26.

From thousands of builders across the country to the next stage of the climb, this journey is getting real.

The next checkpoint? Round 2.
The ultimate destination? Manali, Himachal Pradesh. ⛰️

One step closer. A lot more to build.
The climb continues. 🏔️

${SOCIAL_CONFIG.linkedIn.attribution}

${SOCIAL_CONFIG.linkedIn.hashtags.join(' ')}`;
}

/**
 * Generates the General HIH '26 Builder Pass X caption (preserved).
 */
export function generateGeneralXCaption(options = {}) {
  const { domains = [], includeDomain = false } = options;
  const hashtags = SOCIAL_CONFIG.x.generalHashtags || ['@HackInHills', '#HIH26'];

  const baseCaption = `Base camp: unlocked. 🏔️

I'm part of Hack in Hills '26!
Big ideas. Wild builds. Himalayan vibes.
Built for the climb. ⛰️

${SOCIAL_CONFIG.x.attribution}

${hashtags.join(' ')}`;

  if (includeDomain && Array.isArray(domains) && domains.length > 0) {
    const domainStr = domains[0];
    const candidate = `Base camp: unlocked. 🏔️

I'm part of Hack in Hills '26!
Building in ${domainStr}.
Built for the climb. ⛰️

${SOCIAL_CONFIG.x.attribution}

${hashtags.join(' ')}`;

    if (calculateXLength(candidate) <= SOCIAL_CONFIG.x.charLimit) {
      return candidate;
    }
  }

  return baseCaption;
}

/**
 * Generates the General HIH '26 Builder Pass LinkedIn caption (preserved).
 */
export function generateGeneralLinkedInCaption(options = {}) {
  const { domains = [] } = options;
  const domainText = Array.isArray(domains) && domains.length > 0
    ? (domains.length > 1 ? domains.slice(0, -1).join(', ') + ' and ' + domains.at(-1) : domains[0])
    : '';

  const domainSentence = domainText
    ? `\nI’ll be building in ${domainText}.\n`
    : '';

  return `Base camp: unlocked. 🏔️

I'm officially part of Hack in Hills '26!
There's something exciting about being surrounded by builders who aren't afraid to experiment, break things, and turn wild ideas into something real.

Hack in Hills is bringing together a community of builders, developers, designers, and dreamers with one shared mindset: keep building.

Different ideas. One builder community. And a whole lot of ambition. 🚀
${domainSentence}
Proud to be part of the journey.
Built for the climb. ⛰️

${SOCIAL_CONFIG.linkedIn.attribution}

${SOCIAL_CONFIG.linkedIn.hashtags.join(' ')}`;
}

/**
 * Generates the official X caption based on edition (defaults to Top 500).
 */
export function generateXCaption(options = {}) {
  if (options.edition === 'general') {
    return generateGeneralXCaption(options);
  }
  return generateTop500XCaption(options);
}

/**
 * Generates the official LinkedIn caption based on edition (defaults to Top 500).
 */
export function generateLinkedInCaption(options = {}) {
  if (options.edition === 'general') {
    return generateGeneralLinkedInCaption(options);
  }
  return generateTop500LinkedInCaption(options);
}
