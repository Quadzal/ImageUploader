<template>
    <div>
        <div v-if="is_success" class="mt-3">
            <b-alert show variant="success">Success! Deleted Image.</b-alert>
        </div>
        <div v-if="is_error" class="mt-3">
            <b-alert show variant="danger">Error! Image Not Deleted.</b-alert>
        </div>
    </div>
</template>

<script>
const BASE_URL = "http://localhost:8000/"
export default {
    name:"DeleteImageComponent",
    data:() => {
        return {
            is_error:false,
            is_success:false
        }
    },
    created(){
        this.axios.get(BASE_URL + "api/delete/" + this.$route.params.image_code)
        .then((response) => {
            this.is_success=true
        }).catch((err) => {
            this.is_error = true
        });
    }
}
</script>

