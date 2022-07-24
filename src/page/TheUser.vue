<template>
    <div class="container">
        <the-loader v-if="loading" />
        <div class="row pt-3 justify-content-center">
            <div v-if="error" class="alert alert-danger col-6" role="alert">
                {{ error.error_msg }}
            </div>
            <template v-else>
                <div class="col-6 mb-4">
                    <div
                        class="btn-group"
                        role="group"
                        aria-label="Basic radio toggle button group"
                    >
                        <input
                            type="radio"
                            :value="true"
                            v-model="showPostOrFriends"
                            class="btn-check"
                            name="btnradio"
                            id="btnradio1"
                            autocomplete="off"
                        />
                        <label
                            class="btn btn-outline-primary col-2"
                            for="btnradio1"
                            >Posts</label
                        >

                        <input
                            type="radio"
                            :value="false"
                            v-model="showPostOrFriends"
                            class="btn-check"
                            name="btnradio"
                            id="btnradio2"
                            autocomplete="off"
                        />
                        <label
                            class="btn btn-outline-primary col-2"
                            for="btnradio2"
                            >Friends</label
                        >
                    </div>
                </div>
                <div class="w-100" />
                <ul v-show="showPostOrFriends" class="col-6">
                    <div
                        class="card border-dark mb-3 p-0"
                        v-for="post in posts"
                        :key="post.id"
                    >
                        <div class="card-header">id: {{ post.id }}</div>
                        <div class="card-body text-dark">
                            <h5 class="card-title">description:</h5>
                            <p class="card-text">{{ getPostText(post) }}</p>
                        </div>
                    </div>
                </ul>
                <ul v-show="!showPostOrFriends" class="col-6">
                    <user-card
                        tag="li"
                        v-for="friend in friends"
                        :key="friend.id"
                        class="list-group-item w-100"
                        style="cursor: pointer"
                        :name="`${friend.first_name} ${friend.last_name}`"
                        :photo="friend.photo_50"
                    >
                    </user-card>
                </ul>
            </template>
        </div>
    </div>
</template>

<script>
    import { UserCard, TheLoader } from '@/components/index'

    export default {
        components: {
            UserCard,
            TheLoader,
        },

        data() {
            return {
                loading: false,
                ID: this.$route.params.id,
                showPostOrFriends: true,
                error: null,
                posts: [],
                friends: [],
                TOKEN: this.$store.state.token,
                VERSION: this.$store.state.v,
            }
        },

        created() {
            this.loadData()
        },

        methods: {
            loadData() {
                this.loading = true

                Promise.all([this.getFriends(), this.getPosts()])
                    .then(([friends, posts]) => {
                        if (posts && 'error' in posts) {
                            this.error = posts.error
                        } else if (posts && posts.response) {
                            this.posts = posts.response.items
                        }

                        if (friends && friends.response) {
                            this.friends = friends.response.items
                        }
                    })
                    .catch((error) => {
                        this.$toast.error(error.message)
                    })
                    .finally(() => {
                        this.loading = false
                    })
            },

            getFriends() {
                return this.$axios.jsonp(
                    'https://api.vk.com/method/friends.get',
                    {
                        params: {
                            fields: 'photo_50',
                            count: 10,
                            user_id: this.ID,
                            v: this.VERSION,
                            access_token: this.TOKEN,
                        },
                    }
                )
            },

            getPosts() {
                return this.$axios.jsonp('https://api.vk.com/method/wall.get', {
                    params: {
                        owner_id: this.ID,
                        count: 7,
                        v: this.VERSION,
                        access_token: this.TOKEN,
                    },
                })
            },

            getPostText(post) {
                let text = ''

                if (post.text) {
                    text = post.text
                } else if ('copy_history' in post) {
                    text = post.copy_history[0].text
                }

                return text
            },
        },
    }
</script>
