<template>
    <v-card outlined>
        <v-card-title>
            UpdateUser
        </v-card-title>

        <v-card-text>
            <Number label="UserId" v-model="value.userId" :editMode="editMode"/>
            <String label="Username" v-model="value.username" :editMode="editMode"/>
            <String label="Password" v-model="value.password" :editMode="editMode"/>
            <String label="Email" v-model="value.email" :editMode="editMode"/>
            <String label="Role" v-model="value.role" :editMode="editMode"/>
            <String label="RoleType" v-model="value.roleType" :editMode="editMode"/>
            <Boolean label="IsActive" v-model="value.isActive" :editMode="editMode"/>
            <Date label="CreatedAt" v-model="value.createdAt" :editMode="editMode"/>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="primary"
                    text
                    @click="updateUser"
            >
                UpdateUser
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
        name: 'UpdateUserCommand',
        components:{},
        props: {},
        data: () => ({
            editMode: true,
            value: {},
        }),
        created() {
            this.value.userId = 0;
            this.value.username = '';
            this.value.password = '';
            this.value.email = '';
            this.value.role = '';
            this.value.roleType = '';
            this.value.isActive = false;
            this.value.createdAt = '2024-10-25';
        },
        watch: {
        },
        methods: {
            updateUser() {
                this.$emit('updateUser', this.value);
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

