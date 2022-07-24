<template>
    <component class="hover" :is="tag">
        <span
            class="w-100 h-100 position-absolute hover__bck"
            :style="{ backgroundColor: backgroundColor }"
        />
        <div class="hover__body w-100 h-100 position-relative">
            <img :src="photo" alt="photo_50" class="rounded border border-5" />
            <span class="align-top m-4">
                {{ name }}
            </span>
            <div v-if="!!this.bdate">Birthday: {{ this.bdate }}</div>
            <div v-if="!!this.friends">Friends: {{ this.friends }}</div>
            <div v-if="!!this.sex">Sex: {{ this.sex }}</div>

            <div class="rightElement">
                <slot name="addOnRight" />
            </div>
        </div>
    </component>
</template>

<script>
    export default {
        name: 'user-card',

        props: {
            tag: {
                type: String,
                default: 'div',
            },
            photo: {
                type: String,
                default: '',
            },
            name: {
                type: String,
                required: true,
                default: '',
            },
            bdate: {
                type: String,
            },
            friends: {
                type: Number,
            },
            backgroundColor: {
                type: String,
                default: '',
            },
            sex: {
                type: String,
            },
        },
    }
</script>
<style lang="sass" scoped>
    .hover
      &__body
        z-index: 20
      &__bck
        z-index: 10
        top: 0
        left: 0
        transition: all .3s
      &:hover
        .hover__bck
          left: -5%
          width: 110% !important
          background: #55b3f2
    .rightElement
        position: absolute
        top: 50%
        right: 0px
        transform: translate(0%, -50%)
</style>
