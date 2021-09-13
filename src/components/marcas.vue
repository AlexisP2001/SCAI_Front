<template>
  <div v-if="this.$store.state.token != ''" >
  <v-app>
    <v-container fluid>

      <template>
        <v-row style="margin-left:10px">
          <v-text-field  v-model="buscarMarcasLetras" label="Traer marcas por nombre. (Ejemplo:categoria1)" v-on:keyup.enter="obtenerMarcas()"></v-text-field>
          <v-btn style="margin-right:10px; margin-left:50px;  margin-top:10px"   icon color="#72128E"  @click="obtenerMarcas()"><v-icon size="40">mdi-card-search-outline</v-icon> </v-btn>
        </v-row>
      </template>

      <template>
        <!--tabla de marcas-->
        <v-data-table style="margin-top:50px"  class="elevation-15 "  :headers="columnas" :items="marcas"  :search="search">
          <template v-slot:top>
            <v-toolbar  flat>
              <v-toolbar-title>Marcas</v-toolbar-title>
              <!--barra para buscar-->
              <v-spacer></v-spacer>
              <!--<v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar por nombre" single-line hide-details  ></v-text-field>-->
              <!--<v-divider class="mx-4"   inset vertical></v-divider>-->
              <!--Botones descargar agregar-->
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog"  max-width="500px"  >

                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mb-2 purple darken-3 white--text" v-bind="attrs"  v-on="on" > Nueva</v-btn>
                </template>

                <!--Formuario para almacenar o editar-->
                <v-card >
                <v-card-title><span class="text-h5">Marcas</span></v-card-title>
                  <v-card-text>
                    <v-text-field  v-model="editedItem.nombre" :counter="50" label="Nombre" :rules="rulesNombre" required ></v-text-field>
                    <v-btn  color="blue darken-1" text class="mr-4" @click="guardar" > Guardar </v-btn>
                    <v-btn  color="blue darken-1" text class="mr-4" @click="reset"> Limpiar </v-btn>
                    <v-btn  color="red darken-1" text class="mr-4" @click="dialog=false"> Cancelar </v-btn>
                  </v-card-text>    
                </v-card>

              </v-dialog>
            </v-toolbar>
          </template>

          <!--estado-->
          <template v-slot:[`item.estado`]="{ item }">
            <div v-if="item.estado">
              <span class="black--text">Activo</span>
            </div>
            <div v-else>
              <span class="red--text">Inactivo</span>
            </div>
          </template>

          <!--editar activar desactibar-->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon   small  class="mr-2" @click="editar(item)" >mdi-pencil</v-icon>
            <template v-if="item.estado">
              <v-icon small class="mr-2"  @click="activarDesactivarItem(2,item)"  >mdi-check</v-icon>
            </template>
            <template v-else>
              <v-icon  small  @click="activarDesactivarItem(1,item)" > mdi-block-helper </v-icon>
            </template>
          </template>

        </v-data-table>
      </template>
    </v-container>
  </v-app>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
  export default {
    data: () => ({     
      buscarMarcasLetras:'', 
      dialog:false,
      msgError:'',
      search: '',
      bd:0,//agregar o editar
      rulesNombre: [
        value => !!value || 'Required.',
        value => (value && value.length <= 50) || 'Max 3 caracteres',
      ],
      columnas: [
        { text: 'Nombre', value: 'nombre'  ,class:'purple darken-3 white--text'},
        { text: 'Estado', value: 'estado'  ,class:'purple darken-3 white--text',width:'30%'},
        { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'10%',sortable: false }
      ],
      marcas: [],//columnas de tablas
      editedItem: {nombre: '' },//objeto para enviar o editar
    }),//data

    created(){
      
    },

    methods: {
      //msg de alerta
      msjAlerta:function(tata){
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: tata,
          showConfirmButton: false,
          timer: 3000})
      },

      msjAlertaBien:function(tata){
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: tata,
          showConfirmButton: false,
          timer: 2000})
      },

      //Traer todas las marcas
      obtenerMarcas(){
        let buscandoMarca=this.buscarMarcasLetras.trim();
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get(`marca?value=${buscandoMarca}`,header)
          .then(response =>{
            console.log(response);
            this.marcas = response.data.marca
          })
          .catch((error) =>{
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjAlerta(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjAlerta(this.msgError);
            }
          })
      },//obtenerMarcas

      //Limpiar el formulario despues de enviar o editar
      reset(){
        this.editedItem.nombre=''
      },

      //para editar la marca
      editar(item){
        console.log(item);
        this.bd = 1;
        this.id= item._id;
        this.editedItem.nombre=item.nombre;
        this.dialog=true;
      },//editar

      //para almacenar o editar la marca
      guardar(){
        if (this.bd == 0 ){
          console.log('estoy almacenando :'+this.bd);
          let header = {headers:{"token" : this.$store.state.token}};
          const me = this;
          if(this.editedItem.nombre.trim()===''){
            this.msjAlerta('Nombre obligatorio');
          }else if(this.editedItem.nombre.length>50){
            this.msjAlerta('Supero los 50 carácteres');
          }else{
            axios.post('marca',{ nombre:this.editedItem.nombre},header)
              .then((response)=>{
                console.log(response);
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
                me.obtenerMarcas(),
                me.reset();
                this.dialog=false;
              })
              .catch((error)=>{
                console.log(error.response);
                if(!error.response.data.msg){
                  console.log(error.response);
                  this.msgError = error.response.data.errors[0].msg
                  this.msjAlerta(this.msgError);
                }else{
                  this.msgError = error.response.data.msg
                  console.log(error.response.data.msg);
                  this.msjAlerta(this.msgError);
                }
              })
          }
        }else{
          console.log('estoy editando: '+this.bd);
          let header = {headers:{"token" : this.$store.state.token}};
          const me = this;
          if(this.editedItem.nombre.trim()===''){
            this.msjAlerta('Nombre obligatorio');
          }else if(this.editedItem.nombre.length>50){
            this.msjAlerta('Supero los 50 carácteres');
          }else{
            axios.put(`marca/actualizar/${this.id}`,{ nombre:this.editedItem.nombre}, header )
              .then((response)=>{
                console.log(response);
                console.log('msg');
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
                me.obtenerMarcas(),
                this.dialog=false;
              })
              .catch((error)=>{
                console.log(error.response);
                if(!error.response.data.msg){
                  console.log(error.response);
                  this.msgError = error.response.data.errors[0].msg
                  this.msjAlerta(this.msgError);
                }else{
                  this.msgError = error.response.data.msg
                  console.log(error.response.data.msg);
                  this.msjAlerta(this.msgError);
                }  
            })
          }
        }
      },//guardar

      //activar o desactivar
      activarDesactivarItem (accion , item) {
        let id = item._id;
        if(accion == 2){
          let me = this
          let header = {headers:{"token" : this.$store.state.token}};
          axios.put(`marca/desactivar/${id}`,{}  , header)
            .then((response)=>{
              console.log(response);
              me.obtenerMarcas();
            })
            .catch((error)=>{
              console.log(error);
              if(!error.response.data.msg){
                console.log(error.response);
                this.msgError = error.response.data.errors[0].msg;
                this.msjAlerta(this.msgError);
              }else{
                this.msgError = error.response.data.msg;
                console.log(error.response.data.msg);
                this.msgError =error.response.data.msg;
                this.msjAlerta(this.msgError);
              }
            });
        }else if (accion==1){
          let me = this
          let header = {headers:{"token" : this.$store.state.token}};
          axios.put(`marca/activar/${id}`,{},header)
            .then((response)=>{
              console.log(response);
              me.obtenerMarcas();
            })
            .catch((error)=>{
              console.log(error);
              if(!error.response.data.msg){
                console.log(error.response);
                this.msgError = error.response.data.errors[0].msg;
                this.msjAlerta(this.msgError);
              }else{
                this.msgError = error.response.data.msg;
                console.log(error.response.data.msg);
                this.msgError =error.response.data.msg;
                this.msjAlerta(this.msgError);
              }
            });
        }
      },//activarDesactivarItem

    },//methods
  }
</script>
