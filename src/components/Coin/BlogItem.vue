<template>
  <article class="media">
    <div class="media-content">
      <div class="content">
        <p>
          <a v-text="item.title" @click="isModalActive = true"></a>
          <small v-if="item.author">by {{ item.author }}</small>
          <small>{{ item.pubDate | relativeDate }}</small>
        </p>
      </div>
    </div>
    <transition name="modal">
      <div class="modal is-active" v-if="isModalActive">
        <div class="modal-background" @click="isModalActive = false"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title" v-text="item.title"></p>
            <button class="delete" @click="isModalActive = false"></button>
          </header>
          <div class="modal-card-body" v-html="item.body"></div>
          <footer class="modal-card-foot">
            <a :href="item.url" class="button is-link" target="_blank">Original</a>
            <button class="button is-primary" @click="isModalActive = false">Close</button>
          </footer>
        </div>
      </div>
    </transition>
  </article>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        isModalActive: false
      }
    }
  }
</script>

<style>
  article a:hover {
    text-decoration: underline;
  }

  .modal-card-title {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 0;
    overflow: hidden;
    display: block;
    padding: 0.25rem 0;
  }

  .modal-card-body {
    padding-top: 0
  }

  .modal-card-body p {
    margin-bottom: 1rem;
  }

  .modal-card-body h1, .modal-card-body h2, .modal-card-body h3 {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
</style>
