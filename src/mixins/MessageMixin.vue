<script>
    export default {
        methods: {
            showError(message) {
                this.$toast.error(message)
            },

            showSuccess(message) {
                this.$toast.success(message)
            },

            showMessage(type, message, props) {
                this.$toast.open({
                    message: message,
                    type: type,
                    ...props,
                })
            },
        },
    }
</script>
