<template>
<div class="container">
    <div class="row align-items-center justify-content-center mt-5">
        <div class="col-md-5">
            <factory-form @addFactory="addFactory"/>
        </div>
    </div>
</div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Factory } from '../models/factory-model'
import FactoryService from '../factoryService'
import FactoryForm from '../components/FactoryForm.vue'
/* eslint-disable  @typescript-eslint/no-unused-vars */
import VueRouter from 'vue-router' 


@Component({
    components: {
        'factory-form': FactoryForm
    }
})
export default class AddFactory extends Vue {

    //Add factory event
    addFactory(data: Factory) {
        FactoryService.addFactory(data).then((res) => {
            this.$router.push(
            { 
                name: 'Root', 
                params: { 
                    status: 'added',
                    factoryName: res.name,
                    factoryId: res._id
                } 
            })

        })
    }
}
</script>
