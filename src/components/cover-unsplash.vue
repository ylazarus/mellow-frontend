<template>
  
</template>

<script>
import { getCurrentInstance, onMounted } from 'vue'
export default {
  name: 'cover-unsplash',
 
  setup(props, context) {
    const instance = getCurrentInstance()
    const globalProperties = instance.appContext.config.globalProperties
 
    onMounted(async () => {
      var image = await globalProperties.$unsplash.getPhoto('l3N9Q27zULw')
      var urls = image.urls || []
      var links = image.links || []
      var user = image.user || {}
    })
  }
}
</script>

<style>

</style>