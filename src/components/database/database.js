import _ from 'lodash';

var currentId;

export default {
    created: function () {
        this.get();
    },
    data: function () {
        return {
            confirm: {
                ok: 'Так',
                cancel: 'Ні',
                content: 'Видалити?'
            },
            filter: "",
            sortBy: "",
            sortType: "",
            data: [],
            pumproom: {
                name: "Бювет № ",
                address: "",
                lat: "",
                lng: "",
                description: "",
                imgLink: "",
                startTime: "",
                endTime: "",
                status: true
            },
            message: ""
        }
    },
    methods: {
        resetPumproom() {

            this.pumproom = {
                name: "Бювет № ",
                address: "",
                lat: "",
                lng: "",
                description: "",
                imgLink: "",
                status: true
            };
        },

        openDialog(index) {
            if (_.isUndefined(index)) {
                this.resetPumproom();
            }
            else {
                this.pumproom = _.clone(this.data[index]);
            }
            this.$refs['editDialog'].open();
        },
        closeDialog() {
            this.$refs['editDialog'].close();
        },
        get() {
            this.$http.get("pump", {
                responseType: "json"
            }).then(response => {
                this.data = response.body.map(t => {
                    t.worktime = t.startTime + " - " + t.endTime;
                    return t;
                })
            });
        },
        save() {
            let dest = _.clone(this.pumproom);
            console.log(dest);
            this.$http.post("pump", dest, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }).then(response => {
                this.closeDialog();
                this.get();
            });
        },
        deleteOne(id) {
            currentId = id;
            this.$refs['dialogConfirm'].open();
        },
        onRemoveClose(type) {
            if (type == "ok") {
                this.$http.delete("pump?id=" + currentId).then(response => {
                    currentId = null;
                    this.get();
                });
            }

        },
    },

    computed: {
        formValidation: function () {
            let item = this.pumproom;
            return item.name && item.address && item.lat > 0 && item.lng > 0;
        },
        filteredData: function () {
            let ignoreColumns = ["_id", "imgLink"];

            let filterKey = this.filter && this.filter.toLowerCase(),
                data = _.clone(this.data);

            if (filterKey) {
                data = data.filter(item => Object.keys(item)
                    .filter(t => !ignoreColumns.some(p => p == t)).some(key =>
                        String(item[key].toLowerCase().indexOf(filterKey) > -1))
                )
            }

            return data;
        }
    }
}