<script setup lang="ts">
const { time } = defineProps<{
    time: number
}>()
const timeLeft = ref(time)
const timerId = ref<ReturnType<typeof setInterval> | null>(null)
const isOpen = ref(false)

const timeUp = () => (isOpen.value = true)

const startTimer = () => {
    timerId.value = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--
        } else {
            clearInterval(timerId.value!)
            timeUp()
        }
    }, 1000)
}

const backToMenu = async () => {
    isOpen.value = false
    return navigateTo('/')
}

onMounted(() => startTimer())

onUnmounted(() => {
    if (timerId.value) clearInterval(timerId.value)
})
</script>

<template>
    <div class="mt-2">
        <p class="text-3xl text-orange-300 tracking-wide">Time Left: {{ timeLeft }} seconds</p>
    </div>
    <UModal v-model="isOpen" prevent-close>
        <div class="py-6 px-4 flex flex-col items-center rounded-md bg-[#212e43] gap-3">
            <h2 class="mb-3 text-2xl text-orange-300">Sadly, you lost, because time is up</h2>
            <UButton @click="backToMenu"> Go to start menu</UButton>
        </div>
    </UModal>
</template>
