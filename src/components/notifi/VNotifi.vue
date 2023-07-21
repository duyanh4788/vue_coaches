<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <v-button @click="tryClose">Close</v-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { KeyEmit } from "common/keyemit";
import { SetupContext, defineComponent } from "vue";

interface Props {
  show: boolean;
  title?: string;
  fixed?: boolean;
}

export default defineComponent({
  emits: [KeyEmit.CLOSE],
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props: Props, ctx: SetupContext) {
    const tryClose = () => {
      if (props.fixed) {
        return;
      }
      ctx.emit(KeyEmit.CLOSE);
    };

    return { tryClose };
  },
});
</script>

<style lang="scss" scoped>
@import "./style/notifi.scss";
</style>
