<script setup lang="ts">
import { computed } from "vue";
import { formatDistanceToNowStrict } from "date-fns";

const props = defineProps<{
  celebrity: Celebrity;
}>();

const positiveWeight = computed(
  () =>
    +(
      (props.celebrity.votes.positive /
        (props.celebrity.votes.positive + props.celebrity.votes.negative)) *
      100
    ).toFixed(2)
);
const negativeWeight = computed(
  () =>
    +(
      (props.celebrity.votes.negative /
        (props.celebrity.votes.positive + props.celebrity.votes.negative)) *
      100
    ).toFixed(2)
);

function formatTimestamp(date: string): string {
  return formatDistanceToNowStrict(new Date(date));
}
</script>

<template>
  <article class="card">
    <div class="card__content">
      <div class="content__sentiment">
        <button
          class="icon-button"
          :aria-label="
            positiveWeight > negativeWeight ? 'thumbs up' : 'thumbs down'
          "
        >
          <img
            v-if="positiveWeight > negativeWeight"
            src="../assets/img/thumbs-up.svg"
            alt="thumbs up"
          />
          <img v-else src="../assets/img/thumbs-down.svg" alt="thumbs down" />
        </button>
      </div>

      <div class="content__info">
        <p class="info__name overflow-text-vertically">{{ celebrity.name }}</p>
        <p class="info__description overflow-text-vertically">
          {{ celebrity.description }}
        </p>
        <p class="info__timestamp">
          {{ formatTimestamp(celebrity.lastUpdated) }} ago in
          <span class="info__category">{{ celebrity.category }}</span>
        </p>

        <div class="info__buttons">
          <button class="icon-button" aria-label="thumbs up">
            <img src="../assets/img/thumbs-up.svg" alt="thumbs up" />
          </button>
          <button class="icon-button" aria-label="thumbs down">
            <img src="../assets/img/thumbs-down.svg" alt="thumbs down" />
          </button>
          <button class="info__cta">Vote Now</button>
        </div>
      </div>
    </div>

    <div class="card__gauge-bar">
      <div class="gauge-bar__positive">
        <img src="../assets/img/thumbs-up.svg" alt="thumbs up" />
        <span class="positive__title">{{ positiveWeight }}%</span>
      </div>
      <div class="gauge-bar__negative">
        <img src="../assets/img/thumbs-down.svg" alt="thumbs down" />
        <span class="negative__title">{{ negativeWeight }}%</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 12px;
  min-width: 300px;
  max-width: 348px;
  min-height: 300px;
  max-height: 348px;
  aspect-ratio: 1 / 1;
  background-image: v-bind("`url('src/assets/img/${celebrity.picture}')`");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.card::before {
  z-index: 0;
  position: absolute;
  content: "";
  width: 100%;
  height: 60%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.0001) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

.card__content {
  padding-right: 34px;
  display: flex;
  gap: 2px;
  color: var(--color-white);
  z-index: 1;
}

.icon-button {
  width: 30px;
  height: 30px;
}

.icon-button > img {
  max-width: 16px;
}

.content__info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.content__info p {
  margin: 0;
}

.info__name {
  font-size: 30px;
}

.info__description {
  font-size: 15px;
}

.info__timestamp {
  font-size: 12px;
  text-align: right;
}

.info__buttons {
  justify-content: flex-end;
  display: flex;
  align-items: center;
  gap: 12px;
}

.info__buttons .icon-button:hover,
.info__buttons .icon-button:active {
  outline: 2px solid var(--color-white);
  cursor: pointer;
}

.info__cta {
  cursor: pointer;
  padding: 10px 20px;
  border: 1px solid var(--color-white);
  background-color: var(--color-darker-background);
  color: var(--color-white);
  font-size: 15px;
}

.card__gauge-bar {
  display: flex;
  width: 100%;
  height: 36px;
  z-index: 1;
}

.card__gauge-bar > * {
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: var(--color-white);
  font-size: 18px;
  gap: 6px;
}

.gauge-bar__positive {
  justify-content: flex-start;
  background-color: rgba(var(--color-green-positive), 0.6);
  width: v-bind("`${positiveWeight * 100}%`");
}

.gauge-bar__negative {
  justify-content: flex-end;
  background-color: rgba(var(--color-yellow-negative), 0.6);
  width: v-bind("`${negativeWeight * 100}%`");
}

.positive__title {
  z-index: 1;
}
</style>
