<template>
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content-box"  :class="{ 'content-collapse': collapse }">
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script>
import vHeader from "../components/Header";
import vSidebar from "../components/Sidebar";
export default {
  components: {
    vHeader,
    vSidebar,
  },
  computed: {
    collapse() {
      return this.$store.state.collapse;
    }
  }
};
</script>
<style scoped>
</style>
