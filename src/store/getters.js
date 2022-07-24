// getters
export default {
    getUsersBySort: (state) => {
        const data = [...state.users]

        const fullName = (user) =>
            user.first_name.toLowerCase() + user.last_name.toLowerCase()

        data.sort(function (a, b) {
            if (fullName(a) > fullName(b)) {
                return 1
            }

            if (fullName(a) < fullName(a)) {
                return -1
            }

            return 0
        })

        return data
    },
}
