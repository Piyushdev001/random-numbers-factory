<template>
<div class="container">
    <div class="row align-items-center justify-content-center mt-5">
        <div class="col-md-5">
            <factory-form :is-edit="true" :factoryId="factoryId" @editFactory="editFactory" @deleteFactory="deleteFactory"/>
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
export default class EditFactory extends Vue {
    factoryId = ""

    created() {
        this.factoryId = this.$route.query.id as string
    }

    //Edit factory event
    editFactory(data: Factory) {
        FactoryService.editFactory(this.factoryId, data).then((res) => {
            this.$router.push(
            { 
                name: 'Root', 
                params: { 
                    status: 'edited',
                    factoryName: res.name,
                    factoryId: res._id
                } 
            })
        })
    }

    //Delete Factory event
    deleteFactory() {
        FactoryService.deleteFactory(this.factoryId).then((res) => {
            this.$router.push(
            { 
                name: 'Root', 
                params: { 
                    status: 'deleted',
                    factoryName: res.name
                } 
            })
        })
    }
}
</script>
