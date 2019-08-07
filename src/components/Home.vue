<script>
export default {

    data:() => {
        return {
            image:null,
            image_code:"",
            is_copy_clipboard:false,
            is_image_deleted:false,
            error:false,
            error_message:"",
            message:""
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

        image_url_copy_clipboard(){
            this.is_copy_clipboard = true
            this.message = "Image Url Copy To Clipboard"
            this.$clipboard(this.get_image_url);
        },
        image_delete_url_copy_clipboard(){
            this.is_copy_clipboard=true
            this.message = "Image Delete Url Copy To Clipboard"
            this.$clipboard(this.get_image_delete_url);
        },
    },

    computed:{

        get_image_url(){
            return document.URL + "/i/" + this.image_code
        },
        get_image_delete_url(){
            return document.URL + "/delete/" + this.image_code
        }
    }
}
</script>

<template>
<b-container fluid class="text-light" >

  <b-row class="mb-3">
    <b-col md="3"></b-col>

    <!-- Image Url Clipboard Alert -->
    <b-col md="5" class="text-center mt-3">
        <div v-if="is_copy_clipboard" class="mt-3">
            <b-alert show variant="success">{{message}}</b-alert>
        </div>
        <div v-if="error">
            <b-alert show variant="danger">{{ error_message }}</b-alert>
        </div>
    </b-col>
    <!-- ./Image Url Clipboard Alert -->

    <b-col md="4"></b-col><b-col md="3"></b-col>
    
    <!-- Image Form -->
    <b-col md="5">
        <form method="post" @submit.prevent="upload_image" class="mt-3" enctype="multipart/form-data">
            <b-input-group>
                <b-form-file v-model="image" accept="image/*" placeholder="Choose a image" drop-placeholder="Drop image here" size="large"></b-form-file>
                <b-input-group-append>
                    <b-btn variant="danger" type="submit" v-if="image">Upload Image</b-btn>
                </b-input-group-append>
            </b-input-group>
            
        </form>
    </b-col>
    <!-- ./Image Form -->

    <b-col md="4"></b-col><b-col md="3"></b-col>

    <!-- Image Url -->
    <b-col md="5" class="mt-3">
        <b-input-group prepend="Image Url:" v-if="image_code">
            <b-form-input readonly v-model="get_image_url" ></b-form-input>
            <b-input-group-append>
                <b-btn variant="light" alt="Copy To Clipboard" @click="image_url_copy_clipboard">
                    <font-awesome-icon :icon="['far','clipboard']" :style="{ color: 'black'}"/>
                </b-btn>
                <b-btn variant="success" :href="get_image_url" target="_blank">Go To Image</b-btn>
                
            </b-input-group-append>
        </b-input-group>
    </b-col>
    <!-- ./Image Url -->

    <b-col md="4"></b-col><b-col md="3"></b-col>

    <!-- Image Delete -->
    <b-col md="5" class="mt-3">
        <b-input-group prepend="Image Delete Url:" v-if="image_code">
            <b-form-input readonly v-model="get_image_delete_url"></b-form-input>
            <b-input-group-append>
                <b-btn variant="light" alt="Copy To Clipboard" @click="image_delete_url_copy_clipboard">
                    <font-awesome-icon :icon="['far','clipboard']" :style="{ color: 'black'}"/>
                </b-btn>
                <b-btn variant="danger" :href="get_image_delete_url">Delete Image</b-btn>
            </b-input-group-append>
        </b-input-group>
    </b-col>
    <!-- ./Image Delete -->

  </b-row>
</b-container>

</template>



