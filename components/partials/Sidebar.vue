<template>
  <section class="sidebar" :class="{ 'show-menu': !showMenu }">
    <div class="sidebar-space"></div>
    <div class="content">
      <div class="sidebar-content-items">
        <div class="section-sidebar">
          <div class="section-sidebar-items">
            <div class="section-items">
              <div class="menus">
                <div class="items">
                  <div v-if="$fetchState.pending">
                    <div class="skeleton">
                      <div class="skeleton-icon"></div>
                      <div class="skeleton-text"></div>
                    </div>
                  </div>
                  <div v-else>
                    <NuxtLink
                      to="/dashboard"
                      class="item-link"
                      active-class="active"
                    >
                      <div class="item-icon">
                        <img v-if="$route.name == 'dashboard'"
                          :src="baseURL + 'assets/icon/white/dashboard.svg'"
                          alt=""
                        />
                        <img v-else
                          :src="baseURL + 'assets/icon/black/dashboard.svg'"
                          alt=""
                        />
                      </div>
                      <div class="item-title">Dashboard</div>
                    </NuxtLink>
                  </div>
                  <div v-for="mm in main_menus.data">
                    <div v-if="$fetchState.pending">
                      <div class="skeleton">
                        <div class="skeleton-icon"></div>
                        <div class="skeleton-text"></div>
                      </div>
                    </div>
                    <div v-else>
                      <div v-if="mm.link == '#'">
                        <a
                          class="item-link"
                          :href="'#' + mm.url"
                          data-bs-toggle="collapse"
                          aria-expanded="false"
                          aria-controls="sidebar-item"
                          role="button"
                        >
                          <div class="item-icon">
                            <img
                              :src="baseURL + 'assets/icon/black/' + mm.icon"
                              alt=""
                            />
                          </div>
                          <div class="item-title">{{ mm.nama_menu }}</div>
                        </a>

                        <div v-for="sm in sub_menus.data">
                          <div v-if="sm.master_menu == mm.id">
                            <div class="collapse" :id="mm.url">
                              <div class="sidebar-dropdown-collapse">
                                <div class="sidebar-dropdown-content">
                                  <NuxtLink
                                    :to="`/${mm.url}/${sm.url}`"
                                    class="sub-item-links"
                                    active-class="active"
                                  >
                                    {{ sm.nama_menu }}
                                  </NuxtLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <NuxtLink
                        v-else
                        :to="`/${mm.url}`"
                        class="item-link"
                        active-class="active"
                      >
                        <div class="item-icon">
                            <img v-if="$route.name == mm.url"
                            :src="baseURL + 'assets/icon/white/' + mm.icon"
                            alt=""
                            />
                            <img v-else
                            :src="baseURL + 'assets/icon/black/' + mm.icon"
                            alt=""
                            />

                        </div>
                        <div class="item-title">{{ mm.nama_menu }}</div>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Sidebar',
  layout: 'default',
  props: ['showMenu'],
  data() {
    return {
      main_menus: [],
      sub_menus: [],
      baseURL: 'http://p-ams-backend.test/',
    }
  },
  async fetch() {
    this.main_menus = await this.$axios.$get('/main_menu', {
      params: {
        role_id: this.$auth.user.role_id,
      },
    })
    this.sub_menus = await this.$axios.$get('/sub_menu', {
      params: {
        role_id: this.$auth.user.role_id,
      },
    })
  },
  mounted() {},
}
</script>
