<template>
    <div class="user-dropdown">
      <div class="user-icon" @click="toggleDropdown">
        <img src="/path/to/user/icon" alt="User Icon" />
      </div>
      <div class="dropdown-menu" v-if="isOpen">
        <ul>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false
      };
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      }
    }
  };
  </script>
  
  <style>
  .user-dropdown {
    position: relative;
  }
  .user-icon {
    cursor: pointer;
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
  }
  .dropdown-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .dropdown-menu li {
    margin: 0;
    padding: 0;
  }
  .dropdown-menu a {
    color: #333;
    display: block;
    padding: 0.5rem;
    text-decoration: none;
  }
  .dropdown-menu a:hover {
    background-color: #eee;
  }
  </style>
  