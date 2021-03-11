<template>
</template>

<script>
import axios from 'axios'

export default {
    layout: 'empty',

    async mounted() {
        let urlTmp = new String(window.location.href)

        console.log("url", urlTmp)
        let url = new URL(document.location)

        let access_token = this.getHashValue('access_token')
        let expireDate = new Date();

        expireDate.setSeconds(expireDate.getSeconds() + 3600);

        let tokenObject = { token: access_token, expires_at: expireDate}

        localStorage.setItem("facebook-token", JSON.stringify(tokenObject))

        await this.setFacebookToken(access_token)

        window.location = ("/")
    },

    methods: {
        async setFacebookToken(FacebookToken) {
            let userData = JSON.parse(localStorage.getItem("api-user"))

            let responseData = {}
            const data = JSON.stringify({
                token: FacebookToken
            })

            const config = {
                method: 'patch',
                url: 'http://localhost:8080/api/facebook/register',
                headers: {
                'Content-Type': 'application/json',
                'access-token': userData.accessToken
                },
                data: data
            }

            await axios(config)
                .then(function (response) {
                console.log(response)
                responseData = response.data
                })
                .catch(function (error) {
                console.log(error.response)
                responseData = error.response
                })
            if (responseData.success) {
                console.log(responseData)
            }
        },
        getHashValue(key) {
            var matches = window.location.hash.match(new RegExp(key+'=([^&]*)'));
            return matches ? matches[1] : null;
        }
    }

}
</script>

<style>

</style>