<template>
    <div>
      <a v-b-toggle="'factory-' + index" class="node text-secondary">
          <b-icon icon="chevron-right"></b-icon>
          {{factory.name}}
      </a>
      <b-collapse :id="'factory-' + index" class="mt-2 ml-4" :visible="factory._id === updatedId">
        <div class="row">
          <div class="col-sm-45">
            <div class="card">
              <div class="card-body">
                <button class="btn btn-outline-primary btn-sm" @click="editFactory(factory._id)">Edit</button>
                <button class="btn btn-outline-danger btn-sm ml-2" @click="deleteFactory(factory._id)">Delete</button>
                <h6 class="mt-4">Random Numbers:</h6>
                <ul class="list-unstyled mt-2 random-number-list d-flex mt-4 mb-3">
                  <li class="mr-2" v-for="(randomNum, index) in factory.randomNums" :key="index"><span class="bg-secondary text-white p-3 rounded">{{randomNum}}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </b-collapse>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Factory } from '../models/factory-model'
import FactoryService from '../factoryService'
import VueRouter from 'vue-router';

@Component
export default class FactoryComp extends Vue {
  @Prop() private factory!: Factory;
  @Prop() private index!: number;
  @Prop() private updatedId!: string;

  editFactory(id: string) {
    this.$router.push(
      { 
        name: 'Edit Factory',
        query: { 
          id: id
        } 
      }
    );
  }

  deleteFactory(id: string) {
    FactoryService.deleteFactory(id).then((res) => {
        this.$emit('factorydeleted', res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.node {
    font-size: 18px;
}
</style>
