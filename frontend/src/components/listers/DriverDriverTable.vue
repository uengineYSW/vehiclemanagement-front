<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="values"
                :items-per-page="5"
                class="elevation-1"
        ></v-data-table>

        <v-col style="margin-bottom:40px;">
            <div class="text-center">
                <v-dialog
                        v-model="openDialog"
                        width="332.5"
                        fullscreen
                        hide-overlay
                        transition="dialog-bottom-transition"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-fab-transition>
                            <v-btn
                                    color="primary"
                                    fab
                                    dark
                                    large
                                    style="position:absolute; bottom: 5%; right: 2%; z-index:99"
                                    @click="openDialog=true;"
                            >
                                <v-icon v-bind="attrs" v-on="on">mdi-plus</v-icon>
                            </v-btn>
                        </v-fab-transition>
                    </template>

                    <DriverDriver :offline="offline" class="video-card" :isNew="true" :editMode="true" v-model="newValue" @add="append" v-if="tick"/>
                
                    <v-btn
                            style="postition:absolute; top:2%; right:2%"
                            @click="closeDialog()"
                            depressed 
                            icon 
                            absolute
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-dialog>
            </div>
        </v-col>
    </div>
</template>

<script>
    const axios = require('axios').default;
    import DriverDriver from './../DriverDriver.vue';

    export default {
        name: 'DriverDriverManager',
        components: {
            DriverDriver,
        },
        props: {
            offline: Boolean,
            editMode: Boolean,
            isNew: Boolean
        },
        data: () => ({
            values: [],
            headers: 
                [
                    { text: "driverId", value: "driverId" },
                    { text: "userId", value: "userId" },
                    { text: "name", value: "name" },
                    { text: "company", value: "company" },
                    { text: "department", value: "department" },
                    { text: "contact", value: "contact" },
                    { text: "employeeId", value: "employeeId" },
                    { text: "permission", value: "permission" },
                    { text: "carRegistration", value: "carRegistration" },
                    { text: "isActive", value: "isActive" },
                    { text: "approverId", value: "approverId" },
                    { text: "createdAt", value: "createdAt" },
                ],
            driver : [],
            newValue: {},
            tick : true,
            openDialog : false,
        }),
        async created() {
            if(this.offline){
                if(!this.values) this.values = [];
                return;
            }

            var temp = await axios.get(axios.fixUrl('/drivers'))
            temp.data._embedded.drivers.map(obj => obj.id=obj._links.self.href.split("/")[obj._links.self.href.split("/").length - 1])
            this.values = temp.data._embedded.drivers;

            this.newValue = {
                'driverId': 0,
                'userId': 0,
                'name': '',
                'company': '',
                'department': '',
                'contact': '',
                'employeeId': '',
                'permission': '',
                'carRegistration': '',
                'isActive': false,
                'approverId': '',
                'createdAt': '2024-10-25',
            }
        },
        methods: {
            closeDialog(){
                this.openDialog = false
            },
            append(value){
                this.tick = false
                this.newValue = {}
                this.values.push(value)
                
                this.$emit('input', this.values);

                this.$nextTick(function(){
                    this.tick=true
                })
            },
        }
    }
</script>

