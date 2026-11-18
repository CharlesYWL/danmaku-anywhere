import { describe, expect, it } from 'vitest'
import { zCombinedPolicy } from '@/common/options/combinedPolicy'
import { MediaParser } from '@/content/controller/danmaku/integration/xPathPolicyOps/MediaParser'
import { PLEX_PRESET, PLEX_TITLE_REGEX } from './builtInPresets'

const parse = (title: string) =>
  new MediaParser().parse({
    title: { value: title, regex: [PLEX_TITLE_REGEX] },
  })

describe('Plex preset', () => {
  it('is a valid combined policy', async () => {
    const r = await zCombinedPolicy.safeParseAsync(PLEX_PRESET)
    expect(r.success).toBe(true)
  })

  it('parses the playing tab title', () => {
    const r = parse('▶ 葬送的芙莉莲 - S1 · E3')
    expect(r.searchTitle).toBe('葬送的芙莉莲')
    expect(r.episode).toBe(3)
  })

  it('parses the Chinese Plex UI title', () => {
    const r = parse('学生会也有洞！ - 第1季 · 第3集')
    expect(r.searchTitle).toBe('学生会也有洞！')
    expect(r.episode).toBe(3)
  })

  it('parses a paused title and multi-dash names', () => {
    const r = parse('Re:Zero - Starting Life in Another World - S3 · E12')
    expect(r.searchTitle).toBe('Re:Zero - Starting Life in Another World')
    expect(r.episode).toBe(12)
  })
})
