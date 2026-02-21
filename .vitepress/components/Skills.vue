<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="skill-row">
    <strong>{{ name }}:</strong>&nbsp;<slot />
  </div>
</template>

<style scoped>
.skill-row {
  font-size: .9rem;
  margin: 0.1rem 0;
}
</style>
