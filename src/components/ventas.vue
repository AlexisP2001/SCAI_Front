<template>
<v-app>
    <v-container>
    <!-- fechas -->
    <template>
        <v-card style="margin-top:20px;box-shadow: 0 0 20px #A068B8;" >
        <v-row style="margin-left:10px">
           <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Fecha Inicial"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Fecha Final"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>

  <!-- boton busqueda -->
            <v-btn style="margin-right:10px; margin-left:50px;  margin-top:20px"   icon color="#72128E"  @click="filtarCateAndMarca()"><v-icon size="40">mdi-card-search-outline</v-icon> </v-btn>
  <!--boton de excel-->
            <v-btn style="margin-right:10px; margin-left:20px;  margin-top:20px"   icon color="#72128E"  @click="exportarExcel()">
              <download-excel  :data="articulosExport">
                <v-icon size="40">mdi-file-excel-outline</v-icon>
              </download-excel> 
            </v-btn>
            <!--boton para traer todo-->
            <v-btn style="margin-right:110px; margin-left:20px;  margin-top:20px"  class="mb-2 purple darken-3 white--text"   @click="obtenerarticulos()">Todos</v-btn>
          
        </v-row>
        </v-card> 
      </template>
    <template>
        <!--tabla de categorias-->
        <v-data-table style="margin-top:50px"  class="elevation-15 "  :headers="columnas" :items="categorias"  :search="search">
          <template v-slot:top>
            <v-toolbar  flat>
              <v-toolbar-title>Categorias</v-toolbar-title>
              <!--barra para buscar-->
              <v-spacer></v-spacer>
              <!--<v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar por nombre" single-line hide-details  ></v-text-field>
              <v-divider class="mx-4"   inset vertical></v-divider>-->
              
              <!--Botones descargar agregar-->
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog"  max-width="500px"  >

                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mb-2 purple darken-3 white--text" v-bind="attrs"  v-on="on" > Nueva</v-btn>
                </template>

                <!--Formuario para almacenar o editar-->
                <v-card >
                <v-card-title><span class="text-h5">Categorias</span></v-card-title>
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

          <!--ver documento-->
          <template v-slot:[`item.actions`]="{ item }">
            <template v-if="item.estado">
              <v-icon small class="mr-2"  @click="ver(2,item)"  >mdi-file-find</v-icon>
            </template>
          </template>

        </v-data-table>
      </template>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
  export default {
    data: () => ({    
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,

    //  sdsdsdssdsdds
      buscarCategoriaLetras:'',  
      dialog:false,
      msgError:'',
      search: '',
      bd:0,//agregar o editar
      rulesNombre: [
        value => !!value || 'Required.',
        value => (value && value.length <= 50) || 'Max 3 caracteres',
      ],
      columnas: [
        { text: 'Fecha', value: 'fecha'  ,class:'purple darken-3 white--text'},
        { text: 'Factura', value: 'factura'  ,class:'purple darken-3 white--text'},
        { text: 'Cliente', value: 'cliente'  ,class:'purple darken-3 white--text'},
        { text: 'Saldo Anterior', value: 'saldoAnterior'  ,class:'purple darken-3 white--text'},
        { text: 'Abono', value: 'abono'  ,class:'purple darken-3 white--text'},
        { text: 'Saldo Actual', value: 'saldoActual'  ,class:'purple darken-3 white--text'},
        { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'10%',sortable: false }
      ],
      categorias: [],//columnas de tablas
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

      //Traer todas las categorias
      obtenerCategorias(){
        let bancandoCategoria = this.buscarCategoriaLetras.trim();
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get(`categoria?value=${bancandoCategoria}`,header)
          .then(response =>{
            console.log(response);
            this.categorias = response.data.categoria
            if(this.categorias.length==0){
              this.msjAlertaBien('No hay categorias');
            }
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
      },//obtenerCategorias

      //Limpiar el formulario despues de enviar o editar
      reset(){
        this.editedItem.nombre=''
      },

      //para editar la categoria
      editar(item){
        console.log(item);
        this.bd = 1;
        this.id= item._id;
        this.editedItem.nombre=item.nombre;
        this.dialog=true;
      },//editar

      //para almacenar o editar la categoria
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
            axios.post('categoria',{ nombre:this.editedItem.nombre},header)
              .then((response)=>{
                console.log(response);
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
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
            axios.put(`categoria/actualizar/${this.id}`,{ nombre:this.editedItem.nombre}, header )
              .then((response)=>{
                console.log(response);
                console.log('msg');
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
                me.obtenerCategorias(),
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
          axios.put(`categoria/desactivar/${id}`,{}  , header)
            .then((response)=>{
              console.log(response);
              me.obtenerCategorias();
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
          axios.put(`categoria/activar/${id}`,{},header)
            .then((response)=>{
              console.log(response);
              me.obtenerCategorias();
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

