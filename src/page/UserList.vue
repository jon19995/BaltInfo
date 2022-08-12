<template>
    <div class="container">
        <the-loader v-if="loading" />
        <div class="row justify-content-center pt-3">
            <div class="col-6 position-relative">
                <form>
                    <div class="mb-4">
                        <div class="input-group mb-3">
                            <input
                                v-model="form.userIds"
                                type="text"
                                class="form-control"
                                placeholder="username"
                                aria-label="User Name"
                                aria-describedby="button-addon2"
                            />
                            <button
                                id="button-addon2"
                                class="btn btn-outline-secondary"
                                type="submit"
                                @click.prevent="validateBeforeAddUser()"
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
                        v-for="user in getUsersBySort"
                        :key="user.id"
                        tag="li"
                        class="list-group-item w-100"
                        style="cursor: pointer"
                        :name="`${user.first_name} ${user.last_name}`"
                        :photo="user.photo_50"
                        :bdate="user.bdate"
                        :friends="user.counters?.friends"
                        :sex="user.sex === 2 ? SEX.MALE : SEX.WOMAN"
                        :background-color="
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
    import { StorageDataMixin, MessageMixin } from '@/mixins/index'

    export default {
        components: {
            UserCard,
            TheLoader,
        },

        mixins: [StorageDataMixin, MessageMixin],

        data() {
            return {
                loading: false,
                showUsers: false,
                form: {
                    userIds: '',
                },
                foundUsers: [],
                TOKEN: this.$store.state.token,
                SEX: {
                    WOMAN: 'Woman',
                    MALE: 'Male',
                },
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

            validateBeforeAddUser() {
                if (this.form.userIds) {
                    this.handleSetUser(this.form.userIds)
                } else {
                    this.showError('Empty request')
                }
            },

            handleSetUser(userIds) {
                this.loading = true

                this.setUser(userIds)
                    .then(() => {
                        this.showSuccess('successfully')
                    })
                    .catch((error) => {
                        this.showError(error.message)
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
        },
    }
</script>
