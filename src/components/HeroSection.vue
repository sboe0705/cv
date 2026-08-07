<script setup lang="ts">
import { computed } from 'vue'

import { portraitJpg, portraitWebp } from '@/assets/portrait'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()

/** The mail CTA reuses the contact block's address — one source of truth. */
const mailHref = computed(
  () => t.value.contacts.find((contact) => contact.href.startsWith('mailto:'))?.href ?? '#kontakt',
)

function exportPdf() {
  window.print()
}
</script>

<template>
  <section class="hero">
    <div>
      <p class="kicker">{{ t.kicker }}</p>
      <h1 class="hero-title">{{ t.h1 }}</h1>
      <p class="lead">{{ t.lead }}</p>

      <dl class="facts">
        <div v-for="fact in t.heroFacts" :key="fact.k" class="fact">
          <dt class="fact-label">{{ fact.k }}</dt>
          <dd class="fact-value">{{ fact.v }}</dd>
        </div>
      </dl>

      <div class="actions">
        <a class="btn btn-primary" :href="mailHref">{{ t.ctaMail }}</a>
        <button type="button" class="btn btn-secondary" @click="exportPdf">
          {{ t.ctaPdf }}
        </button>
      </div>
    </div>

    <figure class="portrait">
      <picture>
        <source :srcset="portraitWebp" type="image/webp" />
        <img :src="portraitJpg" width="320" height="380" :alt="t.photoAlt" />
      </picture>
      <figcaption class="portrait-note">{{ t.photoNote }}</figcaption>
    </figure>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  align-items: start;
  padding: 56px var(--section-pad-x) 48px;
}

.kicker {
  display: inline-block;
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  background: var(--highlight);
  color: var(--ink);
  font-size: 10px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-title {
  margin-top: 20px;
  font-size: 58px;
  letter-spacing: -0.025em;
  line-height: 1.02;
}

.lead {
  max-width: 52ch;
  margin-top: 20px;
  font-size: 17.5px;
  line-height: 1.55;
  text-wrap: pretty;
}

.facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0 32px;
  margin: 22px 0 0;
  padding-top: 16px;
  border-top: 1.5px solid var(--hairline-12);
}

.fact {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.fact-label {
  color: var(--accent-base);
  font-size: 9.5px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.fact-value {
  margin: 0;
  font-size: 14.5px;
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 13px 26px;
  border-radius: var(--radius-pill);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
}

.btn-primary {
  border: 0;
  background: var(--accent-base);
  color: var(--on-dark);
}

.btn-primary:hover {
  background: var(--accent-deep);
}

.btn-secondary {
  border: 2px solid var(--hairline-18);
  background: transparent;
  color: var(--ink);
}

.btn-secondary:hover {
  border-color: var(--accent-soft);
  color: var(--accent-base);
}

.portrait {
  margin: 0;
}

.portrait img {
  width: 320px;
  height: 380px;
  border-radius: var(--radius-card);
  object-fit: cover;
}

.portrait-note {
  margin-top: 8px;
  color: var(--ink-50);
  font-size: 11.5px;
}

@media screen and (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 40px var(--section-pad-x);
  }

  /* .facts only wraps once it is in one column, and the desktop row-gap is 0. */
  .facts {
    gap: 14px 24px;
  }

  /* Stacked, the portrait would sit flush left with a 400px hole beside it.
     Centring the figure balances the column instead; on a phone the image
     fills the width and the centring is a no-op. */
  .portrait {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .portrait img {
    width: 100%;
    max-width: 320px;
    height: auto;
    aspect-ratio: 320 / 380;
  }
}

@media screen and (max-width: 560px) {
  .hero-title {
    font-size: 34px;
  }

  .lead {
    font-size: 16px;
  }

  .actions {
    flex-wrap: wrap;
  }

  /* Side by side while both fit, stacked full-width once they do not. */
  .btn {
    flex: 1 1 200px;
    justify-content: center;
  }
}
</style>
