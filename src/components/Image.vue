<template>
    <div>
        <b-img rounded :src="image.src"></b-img>
    </div>
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

