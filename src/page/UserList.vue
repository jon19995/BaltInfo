<template>
    <div class="container">
        <the-loader v-if="loading" />
        <div class="row justify-content-center pt-3">
            <div class="col-6 position-relative">
                <form @submit.prevent>
                    <div class="mb-3">
                        <div class="input-group mb-3">
                            <input
                                v-model="userIds"
                                type="text"
                                class="form-control"
                                placeholder="username"
                                aria-label="User Name"
                                aria-describedby="button-addon2"
                            />
                            <button
                                class="btn btn-outline-secondary"
                                type="button"
                                id="button-addon2"
                                @click.prevent="handleSetUser(userIds)"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </form>
                <button
                    type="button"
                    class="btn btn-primary mb-3"
                    @click="handleShowUserList"
                >
                    Построить
                </button>
                <ul v-show="showUsers" class="ps-0">
                    <user-card
                        tag="li"
                        v-for="user in getUsersBySort"
                        :key="user.id"
                        class="list-group-item w-100"
                        style="cursor: pointer"
                        :name="`${user.first_name} ${user.last_name}`"
                        :photo="user.photo_50"
                        :bdate="user.bdate"
                        :friends="user.counters?.friends"
                        :sex="user.sex === 2 ? 'male' : 'Woman'"
                        :backgroundColor="
                            backgroundColorForUserCard(user.counters?.friends)
                        "
                        @click.native="handleOpenUser(user.id)"
                    >
                        <template #addOnRight>
                            <button
                                class="btn btn-danger"
                                type="button"
                                @click.prevent="deleteUser(user)"
                            >
                                Remove
                            </button>
                        </template>
                    </user-card>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import { UserCard, TheLoader } from '@/components/index'
    import { StorageDataMixin } from '@/mixins/index'

    export default {
        components: {
            UserCard,
            TheLoader,
        },

        mixins: [StorageDataMixin],

        data() {
            return {
                loading: false,
                showUsers: false,
                userIds: '',
                foundUsers: [],
                TOKEN: this.$store.state.token,
            }
        },

        computed: {
            ...mapGetters(['getUsersBySort']),
        },

        created() {
            this.showUsers = this.getStorageData(this.$route.name, 'showUsers')
        },

        methods: {
            ...mapMutations(['deleteUser']),
            ...mapActions(['setUser']),

            backgroundColorForUserCard(friends) {
                let brightness = 99

                if (friends) {
                    brightness = friends > 100 ? 50 : 100 - friends / 2
                }

                return `hsla(204, 86%, ${brightness}%, 1)`
            },

            handleSetUser(userIds) {
                if (!userIds) {
                    return this.$toast.error('Empty request')
                }

                this.loading = true

                this.setUser(userIds)
                    .then(() => {
                        this.$toast.success('successfully')
                    })
                    .catch((error) => {
                        this.$toast.error(error.message)
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },

            handleOpenUser(id) {
                this.$router.push({ name: 'User', params: { id: id } })
            },

            handleShowUserList() {
                this.showUsers = !this.showUsers
                this.setStorageData(this.$route.name, {
                    showUsers: this.showUsers,
                })
            },

            checkUserInfoundUsers(userId) {
                return !this.getUsersBySort
                    .map((user) => user.id)
                    .includes(userId)
            },
        },
    }
</script>
<style lang="sass" scoped></style>
