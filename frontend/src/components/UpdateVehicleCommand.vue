<template>
    <v-card outlined>
        <v-card-title>
            UpdateVehicle
        </v-card-title>

        <v-card-text>
            <Number label="VehicleId" v-model="value.vehicleId" :editMode="editMode"/>
            <String label="VehicleType" v-model="value.vehicleType" :editMode="editMode"/>
            <String label="VehicleName" v-model="value.vehicleName" :editMode="editMode"/>
            <String label="Usage" v-model="value.usage" :editMode="editMode"/>
            <String label="OwnershipCompany" v-model="value.ownershipCompany" :editMode="editMode"/>
            <Date label="ContractPeriod" v-model="value.contractPeriod" :editMode="editMode"/>
            <String label="OwnershipType" v-model="value.ownershipType" :editMode="editMode"/>
            <String label="AccidentType" v-model="value.accidentType" :editMode="editMode"/>
            <String label="OperatingDepartment" v-model="value.operatingDepartment" :editMode="editMode"/>
            <Date label="RegistrationDate" v-model="value.registrationDate" :editMode="editMode"/>
            <Number label="Mileage" v-model="value.mileage" :editMode="editMode"/>
            <Boolean label="IsInUse" v-model="value.isInUse" :editMode="editMode"/>
            <Date label="UsagePeriodStart" v-model="value.usagePeriodStart" :editMode="editMode"/>
            <Date label="UsagePeriodEnd" v-model="value.usagePeriodEnd" :editMode="editMode"/>
            <Date label="EngineOilCheck" v-model="value.engineOilCheck" :editMode="editMode"/>
            <Date label="EngineOilNextCheck" v-model="value.engineOilNextCheck" :editMode="editMode"/>
            <Date label="CreatedAt" v-model="value.createdAt" :editMode="editMode"/>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="primary"
                    text
                    @click="updateVehicle"
            >
                UpdateVehicle
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
        name: 'UpdateVehicleCommand',
        components:{},
        props: {},
        data: () => ({
            editMode: true,
            value: {},
        }),
        created() {
            this.value.vehicleId = 0;
            this.value.vehicleType = '';
            this.value.vehicleName = '';
            this.value.usage = '';
            this.value.ownershipCompany = '';
            this.value.contractPeriod = '2024-10-25';
            this.value.ownershipType = '';
            this.value.accidentType = '';
            this.value.operatingDepartment = '';
            this.value.registrationDate = '2024-10-25';
            this.value.mileage = 0;
            this.value.isInUse = false;
            this.value.usagePeriodStart = '2024-10-25';
            this.value.usagePeriodEnd = '2024-10-25';
            this.value.engineOilCheck = '2024-10-25';
            this.value.engineOilNextCheck = '2024-10-25';
            this.value.createdAt = '2024-10-25';
        },
        watch: {
        },
        methods: {
            updateVehicle() {
                this.$emit('updateVehicle', this.value);
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

