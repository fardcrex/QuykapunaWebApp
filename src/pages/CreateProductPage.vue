<template>
  <div class="container">
    <div class="child-1">
      <h2 class="title">Crear Producto</h2>
      <input
        placeholder="Nombre"
        class="child input"
        v-model="producto.nombreP"
        type="text"
        value
      />
      <textarea
        rows="6"
        placeholder="Descripción"
        class="child textarea"
        v-model="producto.descripcionP"
        value
      />
      <input class="child " type="file" @change="previewImage" accept="image/*" >
      <input
        placeholder="Precio"
        class="child input input-costo"
        v-model.number="producto.costoP"
        type="number"
        value
      />
      <!-- <input type="date" name="fecha" v-model="fecha"> -->
      <button
          v-if="!isLoadingRequest"
        class="primary child btn"
        type="submit"
        name="button"
        v-on:click="onUpload"
      >Aceptar</button>
      <div
        v-else
        class="preloader__min preloader"
      ></div>
    </div>

    <Personaje class="svg"></Personaje>
    <div class="title2" >
        <h2 >{{messageRequest}}</h2>
        <button            
            class="primary child btn"
            type="submit"
            name="button"
            v-on:click="anteriorPage"
        >Ver Productos</button>
    </div>   
  </div>
</template>

<script>
import ProductService from "@/services/ProductService.js";
import Personaje from "@/components-svg/Personaje.vue";
import fire from "@/fire";
import { mapState, mapActions } from "vuex";
export default {
  components: { Personaje },
  data() {
    return {
      //Loader para el formulario
      isLoadingRequest: false,
      messageRequest: "",
      producto: {
        costoP: null,
        nombreP: "",
        descripcionP: ""
      },
      imageData: null,
      picture: null,
      uploadValue: 0
    };
  },
  computed: {
    ...mapState({
      empresaId: state => state.empresa.empresaId
    })
  },
  methods: {
    ...mapActions(["getProductosAction"]),
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    onUpload() {
      if (
        !this.empresaId ||
        !this.producto.costoP ||
        !this.producto.nombreP ||
        !this.producto.descripcionP ||
        !this.imageData ||
        this.producto.nombreP.length < 3
      ) {
        this.isLoadingRequest = false;
        return;
      }
      this.isLoadingRequest = true;
      this.picture = null;
      const storageRef = fire
        .storage()
        .ref(`${this.empresaRuc}/${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.picture = url;
            this.createProducto();
          });
        }
      );
    },
    async createProducto() {
      try {
        let respondProduct = await ProductService.postCrearProducto({
          idEmpresa: this.empresaId,
          imagenP: this.picture,
          ...this.producto
        });
        if (respondProduct.data.Status == "Registro exitoso") {
          await this.getProductosAction({
            empresaId: this.empresaId,
            reload: true
          });
        }
        this.messageRequest = respondProduct.data.Status;
      } catch (e) {
        this.messageRequest = e;
      }
      this.isLoadingRequest = false;
      this.clearForm();
    },
    clearForm() {
      this.producto.costoP = null;
      this.producto.nombreP = "";
      this.producto.descripcionP = "";
      this.imageData = null;
      this.uploadValue = 0;
      this.picture = null;
    },
    anteriorPage() {
      this.$router.push({ name: "ProductPage" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/global.scss";
.container {
  justify-items: center;

  display: grid;
  width: 100%;
  max-width: 1100px;
  margin: auto;
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto;
  @media screen and (min-width: $notebook) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(500px, auto) 12vh;
  }
  @media screen and (min-width: $laptop) {
    grid-template-rows: minmax(520px, auto) 14vh;
  }
}
.title {
  margin-top: 5vh;
  @media screen and (min-width: $notebook) {
    margin-top: 7vh;
  }
}
.svg {
  grid-row: 1;
  margin: 3vh 1em 0 1em;
  width: 80%;
  @media screen and (min-width: $notebook) {
    grid-column: 2;
    margin: auto;
    width: 90%;
  }
  @media screen and (min-width: $laptop) {
    width: 100%;
  }
}
.child-1 {
  width: 80%;
  grid-row: 2/3;
  @media screen and (min-width: $notebook) {
    grid-row: 1/2;
    grid-column: 1/2;
    width: 75%;
  }
  @media screen and (min-width: $laptop) {
    grid-column: 1/2;
    width: 64%;
  }
}
.title2 {
  margin-top: 3vh;
  align-self: center;
  grid-row: 3/4;
  grid-column: 1/2;
  @media screen and (min-width: $notebook) {
    grid-row: 2/3;
    grid-column: 1/3;
    width: 90%;
  }
  @media screen and (min-width: $laptop) {
  }
}

.eventList {
  grid-column: 1/2;
  display: grid;
  padding: 1rem;
  row-gap: 1.5rem;
  column-gap: 1.5rem;
  width: 85%;
  grid-template-columns: repeat(auto-fit, minmax(auto, 1fr));
  @media screen and (min-width: $tablet) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    width: 85%;
  }

  @media screen and (min-width: $notebook) {
    row-gap: 2.5rem;
    grid-column: 1/3;
    width: 95%;
    grid-template-columns: repeat(3t, minmax(200px, 1fr));
  }
  @media screen and (min-width: $laptop) {
    row-gap: 3rem;
    width: 100%;
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }
}
.input {
  padding: 1.6em 2em;
}
.child {
  display: block;
  margin: 1.5em 0 1.5em 0;
  height: 3em;
  width: 100%;
}
.btn {
  margin: 0 auto 1em auto;
  margin-top: 1.5em;
  height: 3.5em;
  width: auto;
  @media screen and (min-width: $notebook) {
    margin: 2em auto 1em auto;
  }
}
.textarea {
  height: 7em;
  border-radius: 20px;
}
.input-costo {
  width: 60%;
  margin: 0%;
}

.preloader__min {
  width: 40px;
  height: 40px;
  margin: 1.6em auto;
}
</style>