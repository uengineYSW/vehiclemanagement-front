<template>
    <div>
        <v-list two-line v-if="list.length > 0">
            <v-list-item-group 
                    v-model="selected" 
                    color="primary"
                    @change="select"
            >
                <v-list-item v-for="(item, idx) in list" :key="idx">
                    <template v-slot:default="{ active }">
                        <v-list-item-avatar color="primary-darker-1">
                        </v-list-item-avatar>
                        
                        <v-list-item-content>
                            <v-list-item-title>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                VehicleId :  {{item.vehicleId }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                VehicleType :  {{item.vehicleType }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                VehicleName :  {{item.vehicleName }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                Usage :  {{item.usage }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                OwnershipCompany :  {{item.ownershipCompany }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                ContractPeriod :  {{item.contractPeriod }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                OwnershipType :  {{item.ownershipType }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                AccidentType :  {{item.accidentType }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                OperatingDepartment :  {{item.operatingDepartment }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                RegistrationDate :  {{item.registrationDate }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                Mileage :  {{item.mileage }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                IsInUse :  {{item.isInUse }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                UsagePeriodStart :  {{item.usagePeriodStart }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                UsagePeriodEnd :  {{item.usagePeriodEnd }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                EngineOilCheck :  {{item.engineOilCheck }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                EngineOilNextCheck :  {{item.engineOilNextCheck }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                CreatedAt :  {{item.createdAt }}
                            </v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-checkbox :input-value="active" color="primary-darker-1"></v-checkbox>
                        </v-list-item-action>
                    </template>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>


<script>
    const axios = require('axios').default;

    export default {
        name: 'VehicleVehiclePicker',
        props: {
            value: [String, Object, Array, Number, Boolean],
        },
        data: () => ({
            list: [],
            selected: null,
        }),
        async created() {
            var me = this;
            var temp = await axios.get(axios.fixUrl('/vehicles'))
            if(temp.data) {
                me.list = temp.data._embedded.vehicles;
            }

            if(me.value && typeof me.value == "object" && Object.values(me.value)[0]) {
                var id = Object.values(me.value)[0];
                var tmpValue = await axios.get(axios.fixUrl('/vehicles/' + id))
                if(tmpValue.data) {
                    var val = tmpValue.data
                    me.list.forEach(function(item, idx) {
                        if(item.name == val.name) {
                            me.selected = idx
                        }
                    })
                }
            }
        },
        methods: {
            select(val) {
                var obj = {}
                if(val != undefined) {
                    var arr = this.list[val]._links.self.href.split('/');
                    obj['vehicleId'] = arr[4]; 
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    this.$emit('selected', obj);
                }
            },
        },
    };
</script>

