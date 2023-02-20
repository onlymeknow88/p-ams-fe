<template>
  <div class="table-responsive">
    <table class="table table-hover" width="100%">
      <thead>
        <tr>
          <th>Nama Menu</th>
          <th>Access</th>
          <th>Create</th>
          <th>Edit</th>
          <th>Delete</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody
        v-if="lm.level_menu == 'main_menu'"
        v-for="(lm, index) in list_menu"
        :key="index"
      >
        <tr v-if="lm.link == '#'">
          <td class="fw-bold">{{ lm.nama_menu }}</td>
          <td>
            <div class="custom-control">
              <input
                :name="lm.role_access"
                value="true"
                type="checkbox"
                class="custom-control-input main"
                :id="'customSwitch ' + lm.role_access"
                :checked="lm.access_check"
              />
              <label
                class="custom-control-label"
                :for="'customSwitch ' + lm.role_access"
              ></label>
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr v-else>
          <td class="fw-bold">{{ lm.nama_menu }}</td>
          <td>
            <div class="custom-control">
              <input
                :checked="lm.access_check"
                :name="lm.role_access"
                value="true"
                type="checkbox"
                class="custom-control-input main"
                :id="'customSwitch ' + lm.role_access"
              />
              <label
                class="custom-control-label"
                :for="'customSwitch ' + lm.role_access"
              ></label>
            </div>
          </td>
          <td>
            <div class="custom-control">
              <input
                :name="lm.role_create"
                type="checkbox"
                value="true"
                class="custom-control-input main"
                :id="'customSwitch ' + lm.role_create"
                :checked="lm.create_check"
              />
              <label
                class="custom-control-label"
                :for="'customSwitch ' + lm.role_create"
              ></label>
            </div>
          </td>
          <td>
            <div class="custom-control">
              <input
                :name="lm.role_edit"
                type="checkbox"
                class="custom-control-input main"
                :id="'customSwitch ' + lm.role_edit"
                value="true"
                :checked="lm.edit_check"
              />
              <label
                class="custom-control-label"
                :for="'customSwitch ' + lm.role_edit"
              ></label>
            </div>
          </td>
          <td>
            <div class="custom-control">
              <input
                :name="lm.role_delete"
                type="checkbox"
                class="custom-control-input main"
                :id="'customSwitch ' + lm.role_delete"
                value="true"
                :checked="lm.delete_check"
              />
              <label
                class="custom-control-label"
                :for="'customSwitch ' + lm.role_delete"
              ></label>
            </div>
          </td>
          <td>
            <div class="custom-control">
              <input
                :name="lm.role_view"
                type="checkbox"
                class="custom-control-input main"
                :id="'customSwitch ' + lm.role_view"
                value="true"
                :checked="lm.view_check"
              />
              <label
                class="custom-control-label"
                :for="'customSwitch ' + lm.role_view"
              ></label>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td>
            <span class="ml-15">{{ lm.nama_menu }}</span>
          </td>
          <td>
            <div class="custom-control">
              <input
                :name="lm.role_access"
                value="true"
                :checked="lm.access_check"
                type="checkbox"
                class="custom-control-input main"
                :id="'customSwitch ' + lm.role_access"
              />
              <label
                class="custom-control-label"
                :for="'customSwitch ' + lm.role_access"
              ></label>
            </div>
          </td>
          <td>
            <div class="custom-control">
              <input
                :name="lm.role_create"
                type="checkbox"
                class="custom-control-input main"
                :id="'customSwitch ' + lm.role_create"
                value="true"
                :checked="lm.create_check"
              />
              <label
                class="custom-control-label"
                :for="'customSwitch ' + lm.role_create"
              ></label>
            </div>
          </td>
          <td>
            <div class="custom-control">
              <input
                :name="lm.role_edit"
                type="checkbox"
                class="custom-control-input main"
                :id="'customSwitch ' + lm.role_edit"
                value="true"
                :checked="lm.edit_check"
              />
              <label
                class="custom-control-label"
                :for="'customSwitch ' + lm.role_edit"
              ></label>
            </div>
          </td>
          <td>
            <div class="custom-control">
              <input
                :name="lm.role_delete"
                type="checkbox"
                class="custom-control-input main"
                :id="'customSwitch ' + lm.role_delete"
                value="true"
                :checked="lm.delete_check"
              />
              <label
                class="custom-control-label"
                :for="'customSwitch ' + lm.role_delete"
              ></label>
            </div>
          </td>
          <td>
            <div class="custom-control">
              <input
                :name="lm.role_view"
                type="checkbox"
                class="custom-control-input main"
                :id="'customSwitch ' + lm.role_view"
                value="true"
                :checked="lm.view_check"
              />
              <label
                class="custom-control-label"
                :for="'customSwitch ' + lm.role_view"
              ></label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'checkbox',
  data() {
    return {
      list_menu: [],
    }
  },
  async fetch() {
    const Response = await this.$axios.$post(
      'role/list-menu?role_id=' + this.$route.params.id
    )
    this.list_menu = Response
  },
}
</script>
