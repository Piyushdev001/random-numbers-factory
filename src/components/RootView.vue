<template>
  <div>
    <div class="ml-5 mt-5">
        <a v-b-toggle.collapse-1 class="node text-primary h5">
            <b-icon icon="chevron-right"></b-icon>
            Root Node
        </a>
        <b-collapse id="collapse-1" visible class="mt-2">
           <ul class="list-unstyled mb-0 py-3 pt-md-1 ml-3">
                <li v-for="(factory, index) in factories" class="mb-2" :key="factory._id">
                    <factory-comp @factorydeleted="updateparent" :factory="factory" :index="index" :updated-id="status.id" />
                </li>
            </ul>
        </b-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Factory } from '../models/factory-model'
import FactoryService from '../factoryService'
import FactoryComp from './Factory.vue'
import { BootstrapVue } from 'bootstrap-vue'
import io from 'socket.io-client';



@Component({
    components: { FactoryComp }
})
export default class RootView extends Vue {
    factories: Array<Factory> = []
    status: { status: string, name: string, id?: string } = { status: "", name: "", id: "" }
    socket: any = null

    created() {
        this.socket = io('http://localhost:3000')
        this.status = { 
            status: this.$route.params.status,
            name: this.$route.params.factoryName,
            id: this.$route.params.factoryId || ""
        }
        this.getFactories()
        if(this.status.status === "edited") {
            this.makeToast('primary', `'${this.status.name}' is updated!`)
        } else if(this.status.status === "deleted") {
            this.makeToast('danger', `'${this.status.name}' is deleted!`)
        } else if(this.status.status === "added") {
            this.makeToast('primary', `'${this.status.name}' is added!`)
        }
        
        this.socket.on('factoryAdded', (data: any) => {
            this.getFactories()
            this.makeToast('primary', `New Factory '${data.name}' is added`)
        })
        this.socket.on('factoryUpdated', (data: any) => {
            this.getFactories()
            this.makeToast('primary', `Factory '${data.name}' is updated`)
        })
        this.socket.on('factoryDeleted', (data: any) => {
            this.getFactories()
            this.makeToast('primary', `Factory '${data.name}' is Deleted`)
        })
    }

    makeToast(variant = "primary", content = "") {
        this.$bvToast.toast(content, {
            toaster: 'b-toaster-top-center',
            variant: variant,
            solid: true
        })
    }

    updateparent(res: {message: string, name: string}) {
        this.makeToast('danger', `'${res.name}' is deleted!`)
        this.getFactories()
    }

    async getFactories() {
        await FactoryService.getFactories().then((res) => {
            this.factories = res
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .node {
        cursor: pointer;

        &:hover {
            text-decoration: none;
        }

        &.not-collapsed {
            .bi-chevron-right {
                transform: rotate(90deg);
                transition: transform .3s linear;
            }
        }
        &.collapsed {
            .bi-chevron-right {
                transform: rotate(0deg);
                transition: transform .3s linear;
            }
        }
    }
</style>
