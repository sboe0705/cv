<script setup lang="ts">
import { computed } from 'vue'

import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()

const mailHref = computed(
  () => t.value.contacts.find((contact) => contact.href.startsWith('mailto:'))?.href ?? '#',
)

/** mailto: links must not open in a new tab. */
function isExternal(href: string) {
  return href.startsWith('http')
}
</script>

<template>
  <section class="contact">
    <div>
      <h2 class="contact-title">{{ t.footerTitle }}</h2>
      <div class="contact-grid">
        <div v-for="contact in t.contacts" :key="contact.k" class="contact-item">
          <span class="contact-label">{{ contact.k }}</span>
          <a
            class="contact-link"
            :href="contact.href"
            :target="isExternal(contact.href) ? '_blank' : undefined"
            :rel="isExternal(contact.href) ? 'noopener' : undefined"
          >
            {{ contact.v }}
          </a>
        </div>
      </div>
    </div>

    <a class="contact-cta" :href="mailHref">{{ t.ctaMail }}</a>
  </section>
</template>

<style scoped>
.contact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
  margin: 44px 24px 24px;
  padding: 44px var(--section-pad-x);
  background: var(--accent-base);
  border-radius: var(--radius-card);
}

.contact-title {
  color: var(--on-dark);
  font-size: 34px;
  letter-spacing: -0.02em;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 32px;
  margin-top: 22px;
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contact-label {
  color: var(--on-dark-70);
  font-size: 9.5px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.contact-link {
  width: fit-content;
  border-bottom: 1.5px solid var(--highlight);
  color: var(--on-dark);
  font-size: 14.5px;
  font-weight: 600;
  text-decoration: none;
}

.contact-link:hover {
  border-color: var(--on-dark);
}

.contact-cta {
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  border-radius: var(--radius-pill);
  background: var(--page-card);
  color: var(--accent-base);
  font-size: 14.5px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
}

.contact-cta:hover {
  background: var(--on-dark);
}

@media screen and (max-width: 900px) {
  .contact {
    gap: 24px;
    margin: 36px 16px 20px;
    padding: 34px var(--section-pad-x);
  }
}

@media screen and (max-width: 560px) {
  .contact {
    margin: 28px 12px 16px;
    padding: 28px 20px;
  }

  .contact-title {
    font-size: 26px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .contact-cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
