<template>
    <v-card outlined>
        <v-card-title>
            RegisterDriver
        </v-card-title>

        <v-card-text>
            <Number label="UserId" v-model="value.userId" :editMode="editMode"/>
            <String label="Name" v-model="value.name" :editMode="editMode"/>
            <String label="Contact" v-model="value.contact" :editMode="editMode"/>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="primary"
                    text
                    @click="registerDriver"
            >
                RegisterDriver
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
        name: 'RegisterDriverCommand',
        components:{},
        props: {},
        data: () => ({
            editMode: true,
            value: {},
        }),
        created() {
            this.value.userId = 0;
            this.value.name = '';
            this.value.contact = '';
        },
        watch: {
        },
        methods: {
            registerDriver() {
                this.$emit('registerDriver', this.value);
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

