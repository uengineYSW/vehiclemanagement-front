<template>
    <v-card outlined>
        <v-card-title>
            RegisterVehicle
        </v-card-title>

        <v-card-text>
            <String label="VehicleType" v-model="value.vehicleType" :editMode="editMode"/>
            <String label="VehicleName" v-model="value.vehicleName" :editMode="editMode"/>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="primary"
                    text
                    @click="registerVehicle"
            >
                RegisterVehicle
            </v-btn>
            
            <v-btn
                    color="primary"
                    text
                    @click="close"
            >
                Close
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
   
    export default {
        name: 'RegisterVehicleCommand',
        components:{},
        props: {},
        data: () => ({
            editMode: true,
            value: {},
        }),
        created() {
            this.value.vehicleType = '';
            this.value.vehicleName = '';
        },
        watch: {
        },
        methods: {
            registerVehicle() {
                this.$emit('registerVehicle', this.value);
            },
            close() {
                this.$emit('closeDialog');
            },
            change() {
                this.$emit('input', this.value);
            },
        }
    }
</script>

