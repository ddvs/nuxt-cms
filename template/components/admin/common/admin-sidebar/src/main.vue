<template>
  <div class="sidebars sidebars-main pull-left" :class="{'active':isFullScreen}">
    <ddv-ui-row class="tac">
      <ddv-ui-col :span="24">
        <slot></slot>
      </ddv-ui-col>
    </ddv-ui-row>
  </div>
</template>

<script>
import ddvUiCol from './ddv-ui-col'
import ddvUiRow from './ddv-ui-row'

export default {
  components: {
    ddvUiCol,
    ddvUiRow
  },
  name: 'adminSidebar',
  props: {
    'isFullScreen': {
      type: Boolean
    }
  }
}
</script>
