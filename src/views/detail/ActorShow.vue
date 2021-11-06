<template>
  <div class="wrap">
    <div
      class="content"
      ref="move"
    >
      <slot name="actorbox"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      startX: 0, // 初始坐标
      endX: 0, // 结束坐标
      disX: 0, // 结束坐标-初始坐标距离
      concentX: 0, // 盒子初始位置
      moveX: 0 // 移动距离
    }
  },
  methods: {
    touchMove () {
      this.$refs.move.addEventListener('touchstart', this.handleTouchStart, false)
      this.$refs.move.addEventListener('touchmove', this.handleTouchMove, false)
    },
    handleTouchStart (e) {
      this.startX = e.targetTouches[0].pageX
      this.concentX = this.$refs.move.offsetLeft
      // console.log(this.startX, this.concentX)
    },
    handleTouchMove (e) {
      this.endX = e.targetTouches[0].pageX
      this.disX = this.endX - this.startX
      this.moveX = this.disX + this.concentX
      if (this.moveX <= 20 && this.moveX > -100) {
        this.$refs.move.style.left = this.moveX + 'px'
      }
    }
  },
  mounted () {
    this.touchMove()
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 270px;
  overflow: hidden;
  padding-left: 20px;

  .content {
    position: absolute;
    width: 900px;
    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    .actorbox {
      width: 170px;

      .actor-avatar {
        width: 170px;
        height: 190px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .actor-name {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 26px;
        text-align: center;
        color: #999;
      }
    }
  }
}
</style>
