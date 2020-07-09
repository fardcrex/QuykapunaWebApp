<template>
  <div class="productList">

    <div
      class="rowContainer"
      v-for="(producto,index) in productos"
      v-bind:key="index"
    > <template v-if="producto.cantidad>0 ">
        <div class="rowCardProduct">
          <BaseRowProduct :producto="producto"></BaseRowProduct>

          <div class="icon">
            <div v-on:click="minusOne(index)">
              <BaseCircularButton type="minus" />
            </div>
            <div class="cantidad__value">{{producto.cantidad}}</div>
            <div v-on:click="plusOne(index)">
              <BaseCircularButton type="plus" />
            </div>
            <span class="tolalPrecioProducto">S/ {{formatPrecioComputed(producto)}}</span>
          </div>
        </div>
        <div v-on:click="eliminar(index)">
          <EliminarSvg class="sizeSvg" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import EliminarSvg from "@/components-svg/EliminarSvg.vue";
import { formatPrecio } from "@/helpers/precioHelper.js";
export default {
  components: { EliminarSvg },
  props: {
    productos: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    plusOne(index) {
      this.productos[index].cantidad++;
      this.productos[index].isChange = true;
    },
    minusOne(index) {
      if (this.productos[index].cantidad == 1) {
        this.productos[index].cantidad = 1;
      } else {
        this.productos[index].cantidad--;
        this.productos[index].isChange = true;
      }
    },
    formatPrecioComputed(producto) {
      return formatPrecio(producto.cantidad * producto.productoCosto);
    },
    eliminar(index) {
      this.productos[index].cantidad = 0;
      this.productos[index].isChange = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/global.scss";

.sizeSvg {
  width: 2rem;
  cursor: pointer;
  margin-right: 1.5rem;
  @media screen and (max-width: $notebook) {
    margin-top: 1.5rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
}

.productList {
  display: grid;
  row-gap: 1rem;
  width: auto;
  grid-template-columns: 100%;
  grid-template-rows: auto;

  @media screen and (min-width: $notebook) {
    padding: 0 1rem;
    justify-items: stretch;
    width: 100%;
    grid-column: 1/3;
  }
}
.rowCardProduct {
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin: 0 1em;
  flex-direction: column;
  @media screen and (min-width: $notebook) {
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
}
.rowContainer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media screen and (min-width: $notebook) {
    justify-content: space-between;
    align-items: center;
  }
}

.cantidad__value {
  min-width: 30px;
  padding: 0 0.5rem;
  @media screen and (min-width: $notebook) {
    padding: 0 1rem;
  }
}

.tolalPrecioProducto {
  color: $color-primary;
  display: inline;
  font-weight: 500;
  min-width: 5rem;
  @media screen and (min-width: $notebook) {
    margin-left: 1rem;
  }
}

.icon {
  padding: 10px;
  display: flex;
  width: max-content;

  align-items: center;
  justify-content: flex-end;
  @media screen and (min-width: $notebook) {
    margin-left: 1rem;
  }
}
</style>