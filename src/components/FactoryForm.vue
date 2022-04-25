<template>
<div class="container">
    <form @submit.prevent="handleSubmit()">
        <div class="mb-3">
            <label for="factoryName" class="form-label">Factory Name</label>
            <input type="text" class="form-control" v-model="factory.name" id="factoryName">
            <p v-if="validation.name.required" class="small text-danger">Factory name is required.</p>
        </div>
        <div class="mb-3">
            <label for="count" class="form-label">Random Numbers Count</label>
            <input type="number" class="form-control" v-model.number="factory.randomNumCount" id="count">
            <p v-if="validation.randomNumCount.required" class="small text-danger">Random numbers count is required.</p>
            <p v-if="validation.randomNumCount.count" class="small text-danger">Random numbers count should be greater than or equal to 1 and should not exeed 15.</p>
        </div>
        <div class="mb-3">
            <label for="inBound" class="form-label">In-bound</label>
            <input type="number" class="form-control" v-model.number="factory.randomNumInBound" id="inBound">
            <p v-if="validation.randomNumInBound.required" class="small text-danger">In-bound is required.</p>
        </div>
        <div class="mb-3">
            <label for="outBound" class="form-label">Out-bound</label>
            <input type="number" class="form-control" v-model.number="factory.randomNumOutBound" id="outBound">
            <p v-if="validation.randomNumOutBound.required" class="small text-danger">Out-bound is required.</p>
            <p v-if="validation.invalidInputs" class="small text-danger">Out-bound should not be less than In-bound</p>
        </div>
        <button v-if="isEdit" type="submit" class="btn btn-outline-primary">Edit Factory</button>
        <button v-else type="submit" class="btn btn-outline-success">Add Factory</button>
        <button v-if="isEdit" @click.prevent="deleteFactory()" class="btn btn-outline-danger ml-2">Delete Factory</button>
        <router-link class="btn btn-outline-secondary ml-2" :to='{ name: "Root"}'>Cancel</router-link>
    </form>
</div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Factory } from '../models/factory-model'
import FactoryService from '../factoryService'
/* eslint-disable  @typescript-eslint/no-unused-vars */
import VueRouter from 'vue-router' 


@Component
export default class FactoryForm extends Vue {
    @Prop({default: false}) isEdit!: Factory;
    @Prop() factoryId!: string;
    
    factory: Factory = {
        name: "",
        randomNumCount: null,
        randomNumInBound: null,
        randomNumOutBound: null
    }
    errors = 0
    validation: any = {
        name: {
            required: false
        },
        randomNumCount: {
            required: false,
            count: false
        },
        randomNumInBound: {
            required: false
        },
        randomNumOutBound: {
            required: false
        },
        invalidInputs: false
    }

    created() {
        if(this.isEdit) {
            FactoryService.getFactory(this.factoryId).then((res) => {
                this.factory = res
            })
        }
    }

    handleErrors() {
        if(this.factory.name === "" || this.factory.name === null) {
            this.validation.name.required = true
            this.errors++
        } else {
            this.validation.name.required = false
            this.errors = 0;
        }
        if(this.factory.randomNumCount === null) {
            this.validation.randomNumCount.required = true
            this.errors++
        } else {
            this.validation.randomNumCount.required = false
            this.errors = 0;
        }
        if(this.factory.randomNumCount != null && (this.factory.randomNumCount <= 0 || this.factory.randomNumCount > 15)) {
            this.validation.randomNumCount.count = true
            this.errors++
        } else {
            this.validation.randomNumCount.count = false
            this.errors = 0;
        }
        if(this.factory.randomNumInBound === null) {
            this.validation.randomNumInBound.required = true
            this.errors++
        } else {
            this.validation.randomNumInBound.required = false
            this.errors = 0;
        }
        if(this.factory.randomNumOutBound === null) {
            this.validation.randomNumOutBound.required = true
            this.errors++
        } else {
            this.validation.randomNumOutBound.required = false
            this.errors = 0;
        }
        if(this.factory.randomNumOutBound != null && this.factory.randomNumInBound && this.factory.randomNumOutBound < this.factory.randomNumInBound) {
            this.validation.invalidInputs = true
            this.errors++
        } else {
            this.validation.invalidInputs = false
            this.errors = 0;
        }
    }

    handleSubmit() {
        this.handleErrors()
        if(this.errors <= 0) {
            if(this.isEdit) {
                this.$emit('editFactory', this.factory)
            } else {
                this.$emit('addFactory', this.factory)
            }
        }
    }

    //Edit factory 
    // editFactory() {
    //     FactoryService.editFactory(this.factoryId, this.factory).then((res) => {
    //         this.$router.push(
    //         { 
    //             name: 'Root', 
    //             params: { 
    //                 status: 'edited',
    //                 factoryName: res.name,
    //                 factoryId: res._id
    //             } 
    //         })
    //     })
    // }

    //Delete Factory
    deleteFactory() {
        this.$emit('deleteFactory')
    }
}
</script>
