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
        class="primary btn"
        type="submit"
        name="button"
        v-on:click="goToTheDetallesPedidos"
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
import { formatPrecio } from "@/recursos/precioHelper.js";
import { mapState, mapMutations, mapActions } from "vuex";
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
      return formatPrecio(precioSum);
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
    ...mapActions(["getPedidosAction"]),
    goToTheDetallesPedidos() {
      this.$router.push({
        name: "DetallePedidoPage",
        params: { idPedido: this.idPedido, idEvent: this.evento.eventoId }
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
        await this.getPedidosAction({
          usuarioId: this.usuarioId,
          idEstado: 1,
          reload: true
        });
      } catch (error) {
        console.log(error);
      }
      this.isLoadingRequest = false;
      this.requestCompleted = true;
      this.notFound = true;
    },
    formatPrecioComputed(producto) {
      return formatPrecio(producto.cantidad * producto.productoCosto);
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
@import "@/assets/styles/global.scss";

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
  @media screen and (min-width: $tablet) {
    margin: 2em 5em 0;
    width: 65%;
  }
  @media screen and (min-width: $notebook) {
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
  @media screen and (min-width: $notebook) {
    margin: auto;
  }
}
.btn {
  color: $color-primary;
  margin: 1em auto 0;
}
.btn__isBlocked {
  color: $color-desactive-btn;
}
.eventList {
  grid-column: 1/2;
  display: grid;

  row-gap: 15px;
  // width: max-content;
  justify-content: center;
  grid-template-columns: 95%;
  @media screen and (min-width: $notebook) {
    padding: 0 1rem;
    justify-items: stretch;
    width: 100%;
  }
  /*  @media screen and (min-width: $tablet) {
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
  @media screen and (min-width: $notebook) {
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
  @media screen and (min-width: $notebook) {
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
  @media screen and (min-width: $notebook) {
    margin-left: 1rem;
  }
}

.cantidad__text {
  padding: 0 0.5rem;
  @media screen and (min-width: $notebook) {
    display: none;
  }
}
.display_none {
  color: $color-bg;
}
.cantidad__value {
  min-width: 20px;
  padding: 0 0.5rem;
  @media screen and (min-width: $notebook) {
    padding: 0 1rem;
  }
}
.textarea {
  margin: 0 1rem 1rem;
  height: 7em;
  border-radius: 20px;
  @media screen and (min-width: $notebook) {
    margin: 0 3rem;
  }
}
.table__pie {
  margin: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  @media screen and (min-width: $tablet) {
    flex-direction: row;
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
  min-width: 4rem;
  @media screen and (min-width: $notebook) {
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