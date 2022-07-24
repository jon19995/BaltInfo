<script>
    export default {
        methods: {
            getStorageData(routeName, params = null) {
                const data = JSON.parse(localStorage.getItem(routeName))

                return params && data ? data[params] : data
            },

            setStorageData(routeName, params) {
                const data = this.getStorageData(routeName)

                return localStorage.setItem(
                    routeName,
                    JSON.stringify(data ? { ...data, ...params } : params)
                )
            },
        },
    }
</script>
