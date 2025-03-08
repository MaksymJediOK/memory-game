<script setup lang="ts">
const flipped = ref(false)
const flipRef = ref({
    flipBack: () => (flipped.value = false)
})

const { emojiCode } = defineProps<{ emojiCode: string }>()
const emit = defineEmits<{
    (event: 'flip', emojiName: string, flipRef: any): void
}>()
const getEmoji = (code: string) => {
    const hex = code.substring(2)
    return String.fromCodePoint(parseInt(hex, 16))
}
const flipCard = () => {
    if(!flipped.value) {
        flipped.value = true
        emit('flip', emojiCode, flipRef)
    }
}
</script>

<template>
    <div class="flex items-center justify-center">
        <div class="w-32 h-32 cursor-pointer perspective-1000" @click="flipCard">
            <div
                class="w-full h-full rounded-2xl shadow-lg transform-style-preserve-3d transition-transform duration-500"
                :class="{ 'rotate-y-180': flipped }"
            >
                <div
                    class="w-full h-full flex items-center justify-center bg-blue-500 text-white text-4xl font-bold rounded-2xl backface-hidden"
                >
                    ?
                </div>
                <div
                    class="w-full h-full flex items-center justify-center bg-orange-500 text-white text-xl font-bold rounded-2xl backface-hidden rotate-y-180"
                >
                    <div class="text-2xl">
                        {{ getEmoji(emojiCode) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.perspective-1000 {
    perspective: 1000px;
}

.transform-style-preserve-3d {
    transform-style: preserve-3d;
}

.transition-transform {
    transition: transform 0.6s;
}

.backface-hidden {
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
}

.rotate-y-180 {
    transform: rotateY(180deg);
}
</style>
