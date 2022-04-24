<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <h3><router-link class="nav-link" exact-active-class="active" :to='{ name: "Root"}'>Tree Node Project</router-link></h3>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ms-4" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">
            <li class="nav-item">
              <router-link class="btn btn-primary" exact-active-class="active" :to='{ name: "Add Factory"}'>Add Factory</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
.navbar-nav {
  width: 100%;
}
</style>
