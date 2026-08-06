<script setup lang="ts">
import { useUser } from "~/composables/useUser.ts";
import { Admin } from "#shared/classes/People.ts";

const user = useUser();

user.setName("aLISA");

if (user instanceof Admin) {
  user.setGender("female");
}

</script>

<template>
  <NuxtLink to="/">Home</NuxtLink>
  <h1>Account</h1>
  <div>
    {{ user }}
  </div>
</template>
