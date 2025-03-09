<script setup lang="ts">
import { getGrid } from '~/constants'
import type { Emoji } from '~/types'

const { category, cardsQuantity, timerData } = useGameConf()
const { data: emojis, status } = useAsyncData('emojis', async () => {
    const response: Emoji[] = await $fetch(`http://localhost:4000/api/all/category/${category.value}`)

    return response.slice(0, cardsQuantity.value / 2)
})

const isOpen = ref(false)
const gridLayout = computed(() => getGrid(cardsQuantity.value))
const pairs = ref<Emoji[]>([])
const openedCards = ref<{ emojiName: string; flipRef: any }[]>([])
const solvedCards = ref<string[]>([])
const handleFlip = (emojiName: string, flipRef: any) => {
    if (solvedCards.value.includes(emojiName)) return

    if (openedCards.value.length === 0) {
        openedCards.value.push({ emojiName: emojiName, flipRef: flipRef })
    } else if (openedCards.value.length === 1) {
        if (openedCards.value[0].emojiName === emojiName) {
            solvedCards.value.push(emojiName)
            openedCards.value = []
        } else {
            openedCards.value.push({ emojiName: emojiName, flipRef: flipRef })
        }
    } else if (openedCards.value.length === 2) {
        openedCards.value.forEach((card) => {
            card.flipRef.flipBack()
        })
        openedCards.value = []
        openedCards.value.push({ emojiName: emojiName, flipRef: flipRef })
    }
}

watchEffect(() => {
    if (emojis.value) pairs.value = generateShuffledPairs(emojis.value)
})
watch(
    () => solvedCards.value.length,
    (newLength) => {
        if (newLength === cardsQuantity.value / 2) {
            isOpen.value = true
            timerData.value.timer = false
        }
    },
)
</script>

<template>
    <section class="flex flex-col items-center">
        <div class="flex items-center gap-10">
            <h1 class="uppercase text-4xl text-amber-200 mt-4">memory</h1>
            <Timer v-if="timerData.timer" :time="timerData.timeToPlay" />
        </div>
        <div class="grid mt-8 gap-3" :class="gridLayout">
            <div v-if="status === 'pending'" class="text-white">Loading...</div>
            <EmojiCard
                v-else
                v-for="(emoji, index) in pairs"
                :key="emoji.name + index"
                :emoji-code="emoji.unicode[0]"
                @flip="handleFlip"
            />
        </div>
    </section>
    <UModal v-model="isOpen">
        <div class="py-6 px-4 flex flex-col items-center rounded-md bg-[#212e43] gap-3">
            <h2 class="mb-3 text-2xl text-orange-300">You won, congrats</h2>
            <UButton @click="navigateTo('/')"> Go to start menu</UButton>
        </div>
    </UModal>
</template>

<style scoped>
.grid-layout-9 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
}
.grid-layout-20 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: repeat(4, minmax(0, 1fr));
}
.grid-layout-40 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
    grid-template-rows: repeat(4, minmax(0, 1fr));
}
.grid-layout-50 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
    grid-template-rows: repeat(5, minmax(0, 1fr));
}
</style>
