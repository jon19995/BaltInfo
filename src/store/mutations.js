// mutations
export default {
    setUser(state, user) {
        const usersIncludesNewUser = state.users.some((u) => u.id === user.id)

        if (usersIncludesNewUser) {
            throw new Error('the new user is already in the list')
        } else {
            state.users.push(user)
        }
    },

    deleteUser(state, userToDeleted) {
        state.users = state.users.filter((user) => user.id !== userToDeleted.id)
    },
}
