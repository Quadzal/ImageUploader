<template>
    <b-container fluid>
        <b-img rounded fluid center height="50%" :src="image.src"></b-img>
    </b-container>
</template>

<script>
const BASE_URL = "http://localhost:8000/"
export default {
    name:"ImageComponent",
    data:() =>{
        return {
            image:""
        }
    },

    created(){
        this.axios.get(BASE_URL + "api/image/" + this.$route.params.image_code)
        .then(res => this.image = res.data);
    }
}
</script>

