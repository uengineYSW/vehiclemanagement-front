<template>
    <v-card outlined>
        <v-card-title>
            UpdateDriver
        </v-card-title>

        <v-card-text>
            <Number label="DriverId" v-model="value.driverId" :editMode="editMode"/>
            <Number label="UserId" v-model="value.userId" :editMode="editMode"/>
            <String label="Name" v-model="value.name" :editMode="editMode"/>
            <String label="Company" v-model="value.company" :editMode="editMode"/>
            <String label="Department" v-model="value.department" :editMode="editMode"/>
            <String label="Contact" v-model="value.contact" :editMode="editMode"/>
            <String label="EmployeeId" v-model="value.employeeId" :editMode="editMode"/>
            <String label="Permission" v-model="value.permission" :editMode="editMode"/>
            <String label="CarRegistration" v-model="value.carRegistration" :editMode="editMode"/>
            <Boolean label="IsActive" v-model="value.isActive" :editMode="editMode"/>
            <String label="ApproverId" v-model="value.approverId" :editMode="editMode"/>
            <Date label="CreatedAt" v-model="value.createdAt" :editMode="editMode"/>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="primary"
                    text
                    @click="updateDriver"
            >
                UpdateDriver
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
        name: 'UpdateDriverCommand',
        components:{},
        props: {},
        data: () => ({
            editMode: true,
            value: {},
        }),
        created() {
            this.value.driverId = 0;
            this.value.userId = 0;
            this.value.name = '';
            this.value.company = '';
            this.value.department = '';
            this.value.contact = '';
            this.value.employeeId = '';
            this.value.permission = '';
            this.value.carRegistration = '';
            this.value.isActive = false;
            this.value.approverId = '';
            this.value.createdAt = '2024-10-25';
        },
        watch: {
        },
        methods: {
            updateDriver() {
                this.$emit('updateDriver', this.value);
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

