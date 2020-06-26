<template>
  <div
    v-if="loading"
    class="preloader"
  ></div>
  <div
    v-else-if="!notFound"
    class="container"
  >
    <router-link
      :to="'/evento/'+$route.params.idEvent"
      class="title"
    >
      <h1>{{evento.eventoNombre}}</h1>
    </router-link>
    <template v-if="!isLoadingList">

      <div class="eventList">
        <div
          class="rowCardProduct"
          v-for="(producto,index) in productos"
          v-bind:key="index"
        >
          <BaseRowProduct :producto="producto"></BaseRowProduct>
          <div class="icon">
            <div class="cantidad__text">Cantidad:</div>
            <div
              class="icon__minus"
              v-on:click="minusOne(index)"
            >
              <div>-</div>
            </div>
            <div class="cantidad__value">{{producto.cantidad}}</div>
            <div
              class="icon__plus"
              v-on:click="plusOne(index)"
            >
              <div>+</div>
            </div>
            <span class="tolalPrecioProducto">S/ {{producto.cantidad*producto.productoCosto}}</span>
          </div>
        </div>
      </div>
      <div class="table__pie">
        <textarea
          rows="6"
          placeholder="Descripción"
          class="child textarea"
          v-model="descripcion"
          value
        />
        <div class="precio_and_bottom_container">
          <div>Precio Total: <span class="tolalPrecioFinal"> S/<span class="display_none">_</span>{{precioTotal}}</span></div>
          <button :class="{btn__isBlocked:isBlocked}"   v-if="!isLoadingRequest"
            class="red btn"
            type="submit"
            name="button"
            v-on:click="hacerPedido"
          >Mandar Pedido</button>
          <div v-else class="preloader__min preloader">          
          </div>
        </div>
      </div>
    </template>
    <div
      v-else
      class="preloader preloader__list"
    ></div>

  </div>
  <div
    v-else
    class="container__not_found"
  >
    <div v-if="requestCompleted">
      <h2>Su pedido ha sido realizado</h2>
      <button
        class="red btn"
        type="submit"
        name="button"
        v-on:click="reiniciar"
      >Ver Pedido</button>
    </div>
    <h2 v-else>Evento no encontrado</h2>
    <NotFoundSvg class="svg"></NotFoundSvg>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService.js";
import EventService from "@/services/EventService.js";
import PedidoService from "@/services/PedidoService.js";
import NotFoundSvg from "@/components-svg/NotFoundSvg.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "EventClientPage",
  components: { NotFoundSvg },
  computed: {
    ...mapState({
      usuarioId: state => state.user.usuarioId,
      eventos: state => state.eventos
    }),
    precioTotal() {
      let precioSum = 0;
      this.productos.forEach(producto => {
        precioSum = precioSum + producto.cantidad * producto.productoCosto;
      });
      return Math.round(precioSum * 100) / 100;
    },
    isBlocked() {
      for (const producto of this.productos) {
        if (producto.cantidad > 0) {
          return false;
        }
      }
      return true;
    }
  },
  data() {
    return {
      evento: {
        eventoNombre: "cargando",
        eventoDescripcion: "cargando",
        estadoEventoId: "cargando"
      },
      loading: true,
      productos: [],
      isLoadingList: true,
      notFound: false,
      isLoadingRequest: false,
      descripcion: "",
      requestCompleted: false,
      idPedido: 0
    };
  },

  async created() {
    if (this.eventos[0]) {
      let eventoFind;
      for (let event of this.eventos) {
        if (event.eventoId == this.$route.params.idEvent) {
          eventoFind = event;
          break;
        }
      }
      if (!eventoFind) {
        this.notFound = true;
      }
      this.evento = eventoFind;
    } else {
      const respuesta = await EventService.getEventsById(
        this.$route.params.idEvent
      );
      if (respuesta.data[0]) {
        console.log(respuesta.data[0]);
        this.evento = respuesta.data[0];
        this.ADD_TO_EVENTS_DATA(this.evento);
      } else {
        this.notFound = true;
        this.loading = false;
        return;
      }
    }
    this.loading = false;
    await this.getProductos();
    this.isLoadingList = false;
  },
  methods: {
    ...mapMutations(["ADD_TO_EVENTS_DATA"]),
    reiniciar() {
      this.$router.push({
        name: "PedidosPageFound",
        params: { idPedido: this.idPedido, idEstado: 1 }
      });
    },

    async getProductos() {
      try {
        var response = await ProductService.getProductosForEvent(
          this.$route.params.idEvent
        );
        console.log(response);

        this.productos = response.data.reverse().map(producto => {
          return { ...producto, cantidad: 0 };
        });
        this.isLoading = false;
        // For now, logs out the response
      } catch (error) {
        console.log("There was an error:", error); // Logs out the error
      }
    },
    async hacerPedido() {
      if (this.isBlocked) {
        return;
      }
      try {
        this.isLoadingRequest = true;
        const res = await PedidoService.insertarCarrito({
          idUsuario: this.usuarioId,
          fecha: new Date().toJSON(),
          descripcion: this.descripcion,
          idEvento: this.evento.eventoId,
          idEstadoPedido: 1
        });
        console.log(res);
        if (res.data[0].idPedido) {
          this.idPedido = res.data[0].idPedido;
          this.productos.forEach(async producto => {
            if (producto.cantidad > 0) {
              await PedidoService.insertarItem({
                idProducto: producto.productoId,
                cantidad: producto.cantidad,
                idpedido: this.idPedido
              });
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
      this.isLoadingRequest = false;
      this.requestCompleted = true;
      this.notFound = true;
    },
    plusOne(index) {
      this.productos[index].cantidad++;
    },
    minusOne(index) {
      if (this.productos[index].cantidad == 0) {
        this.productos[index].cantidad = 0;
      } else this.productos[index].cantidad--;
    }
  }
};
</script>

<style lang="scss" scoped>
$greyLight-2: #c8d0e7;
$color-primary: #ff6531;
$color-bg: #f9f9f9;
$color-shadow: #e3e5e9;
$color-white: #fff;
$shadow: 0.3rem 0.3rem 0.6rem $color-shadow, -0.5rem -0.5rem 1rem $color-white;
$inner-shadow: inset 0.2rem 0.2rem 0.5rem $color-shadow,
  inset -0.2rem -0.2rem 0.5rem $color-white;
$cel: 540px;
$tablet: 814px;
$laptop: 1025px;
$desk: 1300px;
.container__not_found {
  display: grid;
  width: 90%;
  max-width: 1024px;
  margin: 3em auto;
  justify-items: center;
  align-items: center;
  grid-template-rows: 20vh auto;
}

.container {
  justify-items: center;

  display: grid;
  width: 100%;
  max-width: 1024px;
  margin: auto;
  grid-template-columns: 100%;
  grid-template-rows: minmax(6rem, 10vh) auto;
}
.title {
  margin: auto;
  color: $color-primary;
  text-decoration: none;
}
.eventoStyle {
  margin: 2em 2em 0;

  width: 80%;
  @media screen and (min-width: $cel) {
    margin: 2em 5em 0;
    width: 65%;
  }
  @media screen and (min-width: $tablet) {
    margin: 2em 3em;
    width: 65%;
  }
  @media screen and (min-width: $laptop) {
    margin: 3em auto 2em;
    width: 80%;
  }
}

.btn_svg {
  width: 70%;
  margin: 1em auto;
  @media screen and (min-width: $tablet) {
    margin: auto;
  }
}
.btn {
  margin: 1em auto 0;
}
.btn__isBlocked {
  color: $greyLight-2;
}
.eventList {
  grid-column: 1/2;
  display: grid;

  row-gap: 15px;
  // width: max-content;
  justify-content: center;
  grid-template-columns: 95%;
  @media screen and (min-width: $tablet) {
    padding: 0 1rem;
    justify-items: stretch;
    width: 100%;
  }
  /*  @media screen and (min-width: $cel) {
  }
  @media screen and (min-width: $laptop) {
    width: 100%;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
  } */
}
.rowCardProduct {
  display: flex;
  align-items: flex-end;

  flex-direction: column;
  @media screen and (min-width: $tablet) {
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
}
.preloader {
  margin: 10em auto;
  width: 70px;
  height: 70px;
}
.preloader__list {
  margin: 1.5em auto 0;
  width: 70px;
  height: 70px;
  grid-column: 1/2;
  @media screen and (min-width: $tablet) {
    margin: 4em auto 4em;
    grid-column: 1/3;
  }
}
.svg {
  width: 60%;
  margin: 2.5em 2.5em 1em 2.5em;
}

.icon {
  padding: 10px;
  display: flex;
  width: max-content;

  align-items: center;
  justify-content: flex-end;
  @media screen and (min-width: $tablet) {
    margin-left: 1rem;
  }
  &__plus,
  &__minus {
    width: 2rem;
    height: 2rem;
    background-color: $color-bg;

    border-radius: 50%;
    box-shadow: $shadow;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    cursor: pointer;
    color: $color-primary;
    transition: all 0.5s ease;
    @media screen and (min-width: $tablet) {
      width: 2.5rem;
      height: 2.5rem;
    }
    &:active {
      box-shadow: $inner-shadow;
      color: $color-primary;
    }
    &:hover {
      color: $color-primary;
    }
  }
}
.cantidad__text {
  padding: 0 0.5rem;
  @media screen and (min-width: $tablet) {
    display: none;
  }
}
.display_none {
  color: $color-bg;
}
.cantidad__value {
  min-width: 20px;
  padding: 0 0.5rem;
  @media screen and (min-width: $tablet) {
    padding: 0 1rem;
  }
}
.textarea {
  margin: 0 1rem;
  height: 7em;
  border-radius: 20px;
  @media screen and (min-width: $tablet) {
    margin: 0 3rem;
  }
}
.table__pie {
  margin: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (min-width: $tablet) {
    margin: 1rem 4.5rem 3rem auto;
  }
}
.preloader__min {
  margin: auto;
  margin-top: 1em;
  width: 40px;
  height: 40px;
}
.tolalPrecioProducto {
  color: $color-primary;
  display: inline;
  font-weight: 500;
  min-width: 5rem;
  @media screen and (min-width: $tablet) {
    margin-left: 1rem;
  }
}
.tolalPrecioFinal {
  font-weight: 500;
  color: $color-primary;
  display: inline;
}
.precio_and_bottom_container {
  min-width: 180px;
}
</style>