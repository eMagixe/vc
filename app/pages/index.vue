<script setup lang="ts">
import { useUser } from "~/composables/useUser.ts";

const user = useUser();

</script>

<template>
  <NuxtLink to="/account">Account</NuxtLink>
  <div>
    {{ user.getAge() }}
  </div>
</template>
