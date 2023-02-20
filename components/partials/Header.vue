<template>
  <header class="header-container">
    <div class="header">
      <div class="header-left">
        <div class="menubar">
          <button class="btn btn-master btn-menu" id="header-toggle" @click="toggleSidebar()" >
            <svg
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
              style="width: 100%; height: 100%"
            >
              <g>
                <path
                  d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"
                ></path>
              </g>
            </svg>
          </button>
        </div>

        <div class="logo">
          <a href="index.html">
            <div class="top-logo">
              <img src="/assets/img/logo.png" alt="" />
              <h4>AMS</h4>
            </div>
          </a>
        </div>
      </div>
      <div class="header-right">
        <div class="header-options">
          <div class="avatar-profiles">
            <div class="mobile-bottom-drawer" id="bottomDrawer">
              <a class="d-flex align-items-center"  @click="handle">
                <div class="inisial-name">FW</div>
              </a>
            </div>
            <div class="dropdown-profile">
              <a
                class="dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="text-black">Hi, {{ $auth.user.name }}</span>
                <!-- <img src="/assets/img/avatar.png" class="rounded-circle" width="40" height="40" alt=""> -->
                <div class="inisial-name">FW</div>
              </a>

              <ul
                class="dropdown-menu border-0"
                aria-labelledby="dropdownMenuLink"
              >
                <li><a class="dropdown-item" href="#">Account Settings</a></li>
                <li>
                  <a class="dropdown-item" @click="$auth.logout()">Log Out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    handle() {
      this.$nuxt.$emit('showBottom', true)
    },
    toggleSidebar() {
      this.$nuxt.$emit('toggleSidebar')
    }
  }
}
</script>
