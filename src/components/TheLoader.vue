<template>
    <component
        :is="tag"
        class="d-flex justify-content-center align-items-center loader"
    >
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </component>
</template>
<script>
    export default {
        name: 'UserCard',

        props: {
            tag: {
                type: String,
                default: 'div',
            },
        },
    }
</script>
<style lang="sass" scoped>
    .loader
      z-index: 1000
      background: rgba(255, 255, 255, .5)
      position: fixed
      top: 0
      left: 0
      width: 100vw
      height: 100vh
</style>
