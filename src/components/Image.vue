<template>
    <div>
        <b-img rounded :src="image.src"></b-img>
    </div>
</template>

<script>
const BASE_URL = "http://localhost:8000/api/"
export default {
    name:"ImageComponent",
    data:() =>{
        return {
            image:""
        }
    },

    created(){
        this.axios.get(BASE_URL + "image/" + this.$route.params.image_code)
        .then(res => this.image = res.data);
    }
}
</script>

