<template>
  <div>
    <div>
      Vehicles
      <q-icon>plus</q-icon>
    </div>
    <q-tabs align="justify" ref="tabs">
      <q-tab slot="title" icon="view_quilt" name="Active" replace hide="icon" label="Active"/>
      <q-tab slot="title" icon="view_day" name="InActive" replace hide="icon" label="Inactive"/>
      <q-tab slot="title" icon="view_day" name="InTransit" replace label="InTransit"/>
      <q-tab
        slot="title"
        icon="add_box"
        name="Add new"
        replace
        label="Add New"
        @click="add_new_dialog=true"
      />
    </q-tabs>
    <q-table
      :data="table_data"
      :columns="table_columns"
      :loading="table_data_loading"
      selection="single"
      __tdClass="ccc"
    >
      <q-tr
        slot="body"
        slot-scope="props"
        :props="props"
        @click.native="rowClick(props.row)"
        class="cursor-pointer"
        title="Click on a row"
        dark
        color="amber"
        row-key="name"
      >
        <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
      </q-tr>
    </q-table>
    <new-car-dialog v-model="add_new_dialog"/>
  </div>
</template>

<script>
import NewCarDialog from "../../components/new_car_dialog";
export default {
  components: { NewCarDialog },
  data() {
    return {
      table_data: [],
      table_columns: [
        { label: "id", field: "id", name: "id" },
        { label: "name", field: "name", name: "name" },
        {
          label: "Registration Number",
          field: "registration_no",
          name: "registration_no"
        },
        { label: "Status", name: "status" }
      ],
      table_data_loading: true,
      add_new_dialog: false
    };
  },
  methods: {
    rowClick(row) {
      this.$router.push({ name: "vehicle", params: { id: row.id } });
    }
  },
  mounted() {
    let self = this;
    this.$api
      .get("vehicles/")
      .then(data => {
        self.table_data = data.data;
        self.table_data_loading = false;
      })
      .catch(err => {
        console.debug(err);
        this.$q.alert("Unknown error while trying to fetch vehicle list");
      });
  },
  watch: {
    add_new_dialog(val) {
      if (!val) this.$refs.tabs.data.tabName = "Active";
    }
  }
};
</script>

<style>
</style>
