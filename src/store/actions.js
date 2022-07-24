// actions
import axios from 'axios-jsonp-pro'

export default {
    async setUser({ commit, state }, userIds) {
        const data = await axios.jsonp('https://api.vk.com/method/users.get', {
            params: {
                fields: 'photo_50, sex, bdate, counters',
                user_ids: userIds,
                v: state.v,
                access_token: state.token,
            },
        })

        if ('error' in data) {
            throw new Error(data.error.error_msg)
        }

        if ((await data.response) && data.response.length) {
            commit('setUser', data.response[0])
        } else {
            throw new Error('User is not found')
        }
    },
}
