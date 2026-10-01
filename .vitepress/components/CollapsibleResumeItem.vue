<script setup lang="ts">
import {ref} from "vue"

const expanded = ref(false)
</script>

<template>
  <div :class="['collapsible', {expanded}]">
    <div id="collapsible-content" class="content">
      <slot/>
    </div>
    <button class="toggle" aria-controls="collapsible-content" :aria-expanded="expanded" @click="expanded = !expanded">
      {{ expanded ? "Show less" : "Read full profile" }}
    </button>
  </div>
</template>

<style scoped>
.content {
  display: grid;
  max-height: 4.8em;
  overflow: hidden;
  mask-image: linear-gradient(black 30%, transparent);
  transition: max-height 0.4s ease;
}

.expanded .content {
  max-height: 60em;
  mask-image: none;
}

.content :deep(p) {
  margin: 0 0 0.8em;
  line-height: 1.6;
}

.toggle {
  margin-top: 0.4rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.toggle:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.toggle:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
  border-radius: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .content {
    transition: none;
  }
}

@media print {
  .content {
    max-height: none;
    mask-image: none;
  }

  .toggle {
    display: none;
  }
}
</style>
