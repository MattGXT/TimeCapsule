<template>
  <div class="contatiner-message">
    <h1>{{ title }}</h1>
    <div class="timeline" v-if="lists.length !== 0">
      <div class="timeline_item" :key="list" v-for="list in lists">
        <div class="timeline_item_content">
          <div class="item_row">
            <div>
              {{
                isSendbox
                  ? sendDate(list.availableAt)
                  : sendDate(list.createdAt)
              }}
            </div>
            <div>{{ list.content }}</div>
          </div>
        </div>
        <div class="timeline_item_divider">
          <div class="item_dot">
            <div class="dot" v-bind:class="{'pink':list.isRead,'blue':!list.isRead}"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="lists.length === 0">
      {{
        isSendbox
          ? "您还没有埋下过胶囊哦。点击上方的加号尝试一下吧！"
          : "您没有已经打开过的胶囊哦\n再等等吧，也许明天就有了呢？"
      }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CapsuleCreate",
  components: {},
  props: {
    lists: Array,
    isSendbox: { type: Boolean, default: false },
    title: { type: String, default: "时间胶囊" },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  activated() {},

  methods: {
    sendDate(date) {
      const d = new Date(date);
      return d.getFullYear() + "年" + d.getMonth() + "月" + d.getDate() + "日";
    },
  },
};
</script>

<style lang="scss" scoped>
.contatiner-message {
  width: 400px;
  border-radius: 4px;
  background-color: #fdfdfd;
  padding: 1em;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  text-align: left;
  margin: 0 auto;
  z-index: 0;
}

.timeline {
  position: relative;
  padding-top: 24px;
  &::before {
    content: "";
    left: 39px;
    background: rgba(0, 0, 0, 0.12);
    height: 100%;
    width: 2px;
    position: absolute;
    top: 0;
  }

  .timeline_item {
    display: flex;
    padding-bottom: 24px;
    flex-direction: row-reverse !important;

    .timeline_item_content {
      height: 100%;
      flex: 1 1 auto;
      .item_row {
        display: flex;
        flex-wrap: wrap;
        flex: 1 1 auto;
        margin: -12px;
        div:nth-child(1) {
          flex: 0 0 40%;
          max-width: 35%;
          padding: 14px;
        }
        div:nth-child(2) {
          flex-basis: 0;
          flex-grow: 1;
          max-width: 100%;
          padding: 14px;
        }
      }
    }
  }

  .timeline_item_divider {
    position: relative;
    min-width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    .item_dot {
      align-self: start;
      height: 24px;
      left: calc(50% - 12px);
      width: 24px;
      background: #fff;
      z-index: 2;
      border-radius: 50%;
      box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
        0 1px 3px 0 rgb(0 0 0 / 12%);

      .dot {
        height: 18px;
        margin: 3px;
        width: 18px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .pink{
        background-color: #FFCEF3 !important;
        border-color: #FFCEF3 !important;
      }

      .blue{
        background-color: #a1eafb !important;
        border-color: #a1eafb !important;
      }
    }
  }
}

h1 {
  padding: 0;
  margin: 0 0 10px 0;
}
</style>
