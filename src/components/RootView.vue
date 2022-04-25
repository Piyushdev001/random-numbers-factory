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
/* eslint-disable  @typescript-eslint/no-unused-vars */
import { BootstrapVue } from 'bootstrap-vue'



@Component({
    components: { FactoryComp }
})
export default class RootView extends Vue {
    factories: Array<Factory> = []
    status: { status: string, name: string, id?: string } = { status: "", name: "", id: "" }
    
    created() {
       this.status = { 
            status: this.$route.params.status || "",
            name: this.$route.params.factoryName || "",
            id: this.$route.params.factoryId || ""
        }
        this.getFactories()
        if(this.status.status === "edited") {
            this.$socket.client.emit('factoryUpdated', this.status.name)
            this.makeToast('primary', `'${this.status.name}' is updated!`)
        } else if(this.status.status === "deleted") {
            console.log('delete trigger')
            this.$socket.client.emit('factoryDeleted', this.status.name)
            this.makeToast('danger', `'${this.status.name}' is deleted!`)
        } else if(this.status.status === "added") {
            this.$socket.client.emit('factoryAdded', this.status.name)
            this.makeToast('primary', `'${this.status.name}' is added!`)
        }

        this.$socket.$subscribe('connect', () => {
            console.log(this.$socket.client.id)
        })
        this.$socket.$subscribe('factoryAdded', (name: string) => {
            this.getFactories()
            this.makeToast('primary', `'${name}' is added!`)
        });
        this.$socket.$subscribe('factoryUpdated', (name: string) => {
            this.getFactories()
            this.makeToast('primary', `'${name}' is updated!`)
        });
        this.$socket.$subscribe('factoryDeleted', (name: string) => {
            console.log('delete listener')
            this.getFactories()
            this.makeToast('danger', `'${name}' is deleted!`)
        });
    }

    makeToast(variant = 'primary', content = '') {
        this.$bvToast.toast(content, {
            toaster: 'b-toaster-top-center',
            variant: variant,
            solid: true
        })
    }

    updateparent(res: {message: string, name: string}) {
        this.$socket.client.emit('factoryDeleted', res.name)
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
