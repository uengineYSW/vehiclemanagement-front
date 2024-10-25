<template>
    <v-card style="width:450px; height:100%;" outlined>
        <template slot="progress">
            <v-progress-linear
                    color="primary-darker-1"
                    height="10"
                    indeterminate
            ></v-progress-linear>
        </template>

        <v-card-title v-if="value._links">
            차량 # {{decode(value._links.self.href.split("/")[value._links.self.href.split("/").length - 1])}}
        </v-card-title >
        <v-card-title v-else>
            차량
        </v-card-title >        

        <v-card-text style="background-color: white;">
            <Number v-if="editMode" label="차량 ID" v-model="value.vehicleId" :editMode="editMode" :inputUI="''"/>
            <String label="차량 종류" v-model="value.vehicleType" :editMode="editMode" :inputUI="''"/>
            <String label="차량 이름" v-model="value.vehicleName" :editMode="editMode" :inputUI="''"/>
            <String label="사용 용도" v-model="value.usage" :editMode="editMode" :inputUI="''"/>
            <String label="소유 회사" v-model="value.ownershipCompany" :editMode="editMode" :inputUI="''"/>
            <Date label="계약 기간" v-model="value.contractPeriod" :editMode="editMode" :inputUI="''"/>
            <String label="소유권 유형" v-model="value.ownershipType" :editMode="editMode" :inputUI="''"/>
            <String label="사고 유형" v-model="value.accidentType" :editMode="editMode" :inputUI="''"/>
            <String label="운영 부서" v-model="value.operatingDepartment" :editMode="editMode" :inputUI="''"/>
            <Date label="등록 일자" v-model="value.registrationDate" :editMode="editMode" :inputUI="''"/>
            <Number label="주행 거리" v-model="value.mileage" :editMode="editMode" :inputUI="''"/>
            <Boolean label="사용 중 여부" v-model="value.isInUse" :editMode="editMode" :inputUI="''"/>
            <Date label="사용 시작 날짜" v-model="value.usagePeriodStart" :editMode="editMode" :inputUI="''"/>
            <Date label="사용 종료 날짜" v-model="value.usagePeriodEnd" :editMode="editMode" :inputUI="''"/>
            <Date label="엔진오일 점검일" v-model="value.engineOilCheck" :editMode="editMode" :inputUI="''"/>
            <Date label="다음 엔진오일 점검일" v-model="value.engineOilNextCheck" :editMode="editMode" :inputUI="''"/>
            <Date label="생성일자" v-model="value.createdAt" :editMode="editMode" :inputUI="''"/>
        </v-card-text>

        <v-card-actions style="background-color: white;">
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="edit"
                v-if="!editMode"
            >
                수정
            </v-btn>
            <div v-else>
                <v-btn
                    color="primary"
                    text
                    @click="save"
                >
                    차량 등록
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="save"
                >
                    차량 삭제
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="remove"
                    v-if="!editMode"
                >
                    삭제
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="editMode = false"
                    v-if="editMode && !isNew"
                >
                    취소
                </v-btn>
            </div>
        </v-card-actions>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                v-if="!editMode"
                color="primary"
                text
                @click="openUpdateVehicle"
            >
                UpdateVehicle
            </v-btn>
            <v-dialog v-model="updateVehicleDiagram" width="500">
                <UpdateVehicleCommand
                    @closeDialog="closeUpdateVehicle"
                    @updateVehicle="updateVehicle"
                ></UpdateVehicleCommand>
            </v-dialog>
        </v-card-actions>

        <v-snackbar
            v-model="snackbar.status"
            :top="true"
            :timeout="snackbar.timeout"
            color="error"
        >
            {{ snackbar.text }}
            <v-btn dark text @click="snackbar.status = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-card>

</template>

<script>
    const axios = require('axios').default;


    export default {
        name: 'VehicleVehicle',
        components:{
        },
        props: {
            value: [Object, String, Number, Boolean, Array],
            editMode: Boolean,
            isNew: Boolean,
            offline: Boolean,
        },
        data: () => ({
            snackbar: {
                status: false,
                timeout: 5000,
                text: '',
            },
            updateVehicleDiagram: false,
        }),
	async created() {
        },
        methods: {
            decode(value) {
                return decodeURIComponent(value);
            },
            selectFile(){
                if(this.editMode == false) {
                    return false;
                }
                var me = this
                var input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.id = "uploadInput";
                
                input.click();
                input.onchange = function (event) {
                    var file = event.target.files[0]
                    var reader = new FileReader();

                    reader.onload = function () {
                        var result = reader.result;
                        me.imageUrl = result;
                        me.value.photo = result;
                        
                    };
                    reader.readAsDataURL( file );
                };
            },
            edit() {
                this.editMode = true;
            },
            async save(){
                try {
                    var temp = null;

                    if(!this.offline) {
                        if(this.isNew) {
                            temp = await axios.post(axios.fixUrl('/vehicles'), this.value)
                        } else {
                            temp = await axios.put(axios.fixUrl(this.value._links.self.href), this.value)
                        }
                    }

                    if(this.value!=null) {
                        for(var k in temp.data) this.value[k]=temp.data[k];
                    } else {
                        this.value = temp.data;
                    }

                    this.editMode = false;
                    this.$emit('input', this.value);

                    if (this.isNew) {
                        this.$emit('add', this.value);
                    } else {
                        this.$emit('edit', this.value);
                    }

                    location.reload()

                } catch(e) {
                    this.snackbar.status = true
                    if(e.response && e.response.data.message) {
                        this.snackbar.text = e.response.data.message
                    } else {
                        this.snackbar.text = e
                    }
                }
                
            },
            async remove(){
                try {
                    if (!this.offline) {
                        await axios.delete(axios.fixUrl(this.value._links.self.href))
                    }

                    this.editMode = false;
                    this.isDeleted = true;

                    this.$emit('input', this.value);
                    this.$emit('delete', this.value);

                } catch(e) {
                    this.snackbar.status = true
                    if(e.response && e.response.data.message) {
                        this.snackbar.text = e.response.data.message
                    } else {
                        this.snackbar.text = e
                    }
                }
            },
            change(){
                this.$emit('input', this.value);
            },
            async updateVehicle(params) {
                try {
                    if(!this.offline) {
                        var temp = await axios.put(axios.fixUrl(this.value._links['updatevehicle'].href), params)
                        for(var k in temp.data) {
                            this.value[k]=temp.data[k];
                        }
                    }

                    this.editMode = false;
                    this.closeUpdateVehicle();
                } catch(e) {
                    this.snackbar.status = true
                    if(e.response && e.response.data.message) {
                        this.snackbar.text = e.response.data.message
                    } else {
                        this.snackbar.text = e
                    }
                }
            },
            openUpdateVehicle() {
                this.updateVehicleDiagram = true;
            },
            closeUpdateVehicle() {
                this.updateVehicleDiagram = false;
            },
        },
    }
</script>

