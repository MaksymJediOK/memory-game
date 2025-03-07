import { emojiCategories } from '~/constants'

export type EmojiCategory = (typeof emojiCategories)[number]
export type Emoji = {
    name: string
    category: string
    group: string
    htmlCode: string[]
    unicode: string[]
}
