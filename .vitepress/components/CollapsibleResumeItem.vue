<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const expanded = ref(false)
const contentRef = ref<HTMLElement | null>(null)
const contentHeight = ref(0)

function toggle() {
  expanded.value = !expanded.value
  if (expanded.value && contentRef.value) {
    contentHeight.value = contentRef.value.scrollHeight
  }
}
</script>

<template>
  <div :class="['collapsible-box', { expanded }]">
    <button class="collapsible-header" @click="toggle" :aria-expanded="expanded">
      <span class="collapsible-title">{{ title }}</span>
      <span class="chevron" aria-hidden="true" />
    </button>
    <div
      ref="contentRef"
      class="content-wrapper"
      :style="expanded ? { maxHeight: contentHeight + 'px' } : undefined"
    >
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.collapsible-box {
  border: 1px solid #e1e9ee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.collapsible-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font: inherit;
  color: inherit;
  text-align: left;
  margin-bottom: 0.5rem;
}

.collapsible-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.chevron {
  border: solid var(--vp-c-text-3);
  border-width: 0 1.5px 1.5px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 12px;
}

.expanded .chevron {
  transform: rotate(45deg);
}

.collapsible-header:hover .chevron {
  border-color: var(--vp-c-text-2);
}

.content-wrapper {
  max-height: 1.5em;
  overflow: hidden;
  position: relative;
  transition: max-height 0.3s ease;
}

.content-wrapper::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.5em;
  background: linear-gradient(transparent, var(--vp-c-bg));
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.expanded .content-wrapper::after {
  opacity: 0;
}

.content {
  font-size: .9rem;
  font-weight: 400;
  margin: 0;
}

:deep(.content ul) {
  margin-top: .3rem;
  padding-left: 1.2rem;
  margin-bottom: .3rem;
}

:deep(.content li) {
  margin-top: 0.2rem;
}

:deep(.content a) {
  font-weight: 400;
}

:deep(.content > :first-child) {
  margin-top: 0;
}

:deep(.content p) {
  margin: 0 0 0.6rem 0;
  line-height: 1.3rem;
}

:deep(.content p:last-child) {
  margin-bottom: 0;
}
</style>
