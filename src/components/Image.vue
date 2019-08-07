<template>
    <b-container fluid>
        <b-img rounded fluid center height="50%" :src="image.src"></b-img>
    </b-container>
</template>

<script>
export default {
    name:"ImageComponent",
    data:() =>{
        return {
            image:""
        }
    },

    created(){
        this.axios.get("/api/image/" + this.$route.params.image_code)
        .then(res => this.image = res.data);
    }
}
</script>

