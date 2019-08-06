<template>
<div :style='background_image'>
<b-container fluid class="text-light" >

  <b-row class="mb-3">
    <b-col md="3"></b-col>

    <!-- Image Url Clipboard Alert -->
    <b-col md="5" class="text-center mt-3">
        <div v-if="is_copy_clipboard" class="mt-3">
            <b-alert show variant="success">Success! Image Url Copy To Clipboard</b-alert>
        </div>
        <div v-if="error">
            <b-alert show variant="danger">{{ error_message }}</b-alert>
        </div>
    </b-col>
    <!-- ./Image Url Clipboard Alert -->

    <b-col md="4"></b-col>
    <b-col md="3"></b-col>
    
    <!-- Image Form -->
    <b-col md="5">
        <form method="post" @submit.prevent="upload_image" class="mt-3" enctype="multipart/form-data">
            <b-input-group>
                <b-form-file v-model="image" accept="image/*" placeholder="Choose a image" drop-placeholder="Drop image here"></b-form-file>
                <b-input-group-append>
                    <b-btn variant="danger" type="submit" v-if="image">Upload Image</b-btn>
                </b-input-group-append>
            </b-input-group>
            
        </form>
    </b-col>
    <!-- ./Image Form -->


    <b-col md="4"></b-col>
    <b-col md="3"></b-col>
    <b-col md="5" class="mt-3">
        <b-input-group prepend="Image Url:" v-if="image_code">
            <b-form-input readonly v-model="get_image_url" ></b-form-input>
            <b-input-group-append>
                <b-btn variant="light" alt="Copy To Clipboard" @click="copy_clipboard">
                    <font-awesome-icon :icon="['far','clipboard']" :style="{ color: 'black'}"/>
                </b-btn>
                <b-btn variant="success" :href="get_image_url" target="_blank">Go To Image</b-btn>
            </b-input-group-append>
        </b-input-group>
    </b-col>
  </b-row>
</b-container>
</div>
</template>

<script>
export default {

    data:() => {
        return {
            image:null,
            image_code:"",
            is_copy_clipboard:false,
            error:false,
            error_message:""
        }
    },

    methods:{

        upload_image(){
            let formData = new FormData();
            formData.append("image", this.image);
            this.axios.post("/api/upload/image", formData, {headers:{"Content-Type":"multipart/form-data"}})
            .then(image => {
                this.image_code = image.data.url_code
                this.is_copy_clipboard = false;
            })
            .catch(error => {
                this.error = true;
                this.error_message += "Please Upload To Image";
            })
        },

        copy_clipboard(){
            this.is_copy_clipboard = true
            this.$clipboard(this.get_image_url);
        }
    },

    computed:{

        get_image_url(){
            return "/i/" + this.image_code
        }
    }
}
</script>

