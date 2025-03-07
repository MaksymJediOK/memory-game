<script setup lang="ts"></script>

<template>
    <div class="layout w-screen h-screen flex justify-center items-center">
        <slot />
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
.layout {
    background: #212e43;
    font-family: Roboto, sans-serif;
}
</style>
