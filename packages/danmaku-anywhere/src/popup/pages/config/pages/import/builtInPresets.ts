import type { CombinedPolicy } from '@/common/options/combinedPolicy'

// Plex Web sets document.title to "▶ Show - S1 · E3" while playing an episode
export const PLEX_TITLE_REGEX =
  '^(?:▶\\s*)?(?<title>.+?)\\s*-\\s*S(?<season>\\d+)\\s*[·•]?\\s*E(?<episode>\\d+)'

export const PLEX_PRESET: CombinedPolicy = {
  id: 'b7c1a0e2-5d3f-4c8e-9a61-0f2d7e4b9c11',
  name: 'Plex',
  description: 'Plex Web (reads show/season/episode from the tab title)',
  author: 'CharlesYWL',
  patterns: [
    'https://app.plex.tv/*',
    'https://plex.charlesywl.com/*',
    'http://100.67.245.72:32400/*',
  ],
  mediaQuery: 'video',
  enabled: true,
  mode: 'xpath',
  integration: {
    version: 3,
    id: 'd4e8f3a1-2b6c-4f7d-8e95-3a1c0b7d6e22',
    name: 'Plex',
    policy: {
      version: 3,
      title: {
        selector: [{ value: '//title', quick: false }],
        regex: [{ value: PLEX_TITLE_REGEX, quick: false }],
      },
      episode: { selector: [], regex: [] },
      season: { selector: [], regex: [] },
      episodeTitle: { selector: [], regex: [] },
      options: {},
    },
  },
}

export const BUILT_IN_PRESETS: CombinedPolicy[] = [PLEX_PRESET]
