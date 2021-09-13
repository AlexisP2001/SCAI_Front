<template>
  <div v-if="this.$store.state.token != ''" >
  <v-app>
    <v-container fluid>

    <template v-if="muestra == 1">
      <!--buscar por marca, categoria o todo-->
      <template>
        <v-row style="margin-left:10px">
        <!--autocomplete-->
        <v-autocomplete style="width:10%;  "  v-model="categoriaFiltrada"  :items="categoriasFiltro" label="Categoria" required></v-autocomplete>
        <v-autocomplete style="width:10%; margin-left:10px;  " v-model="marcaFiltrada"  :items="marcasFiltro" label="Marcas" required></v-autocomplete>
        <!--boton de buscar-->
        <v-btn style="margin-right:10px; margin-left:50px;  margin-top:10px"   icon color="#72128E"  @click="filtarCateAndMarca()"><v-icon size="40">mdi-card-search-outline</v-icon> </v-btn>
        <!--boton de excel-->
        <v-btn style="margin-right:10px; margin-left:20px;  margin-top:10px"   icon color="#72128E"  @click="exportarExcel()">
          <download-excel  :data="articulosExport">
            <v-icon size="40">mdi-file-excel-outline</v-icon>
          </download-excel> 
        </v-btn>
        <!--boton para traer todo-->
        <v-btn style="margin-right:110px; margin-left:20px;  margin-top:10px"  class="mb-2 purple darken-3 white--text"   @click="obtenerarticulos()">Todos</v-btn>
        </v-row>
      </template>
      
      <template>
        <v-data-table style="margin-top:50px"   class=" elevation-15 " :headers="columnas" :items="articulos" :objetos="[categorias,marcas]" :search="search">
          <template v-slot:top>
            <!--parte arriba tabla-->
            <v-toolbar flat  >
              <v-toolbar-title>Articulos</v-toolbar-title>
              
              <!--buscar-->
              <v-spacer></v-spacer>
              <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar"  single-line hide-details></v-text-field>
              <v-divider  class="mx-4" inset  vertical ></v-divider>
              <v-spacer></v-spacer>


              <v-dialog v-model="dialog" max-width="500px"  >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  v-bind="attrs"  v-on="on" @click="reset()"  >  Nuevo </v-btn>
                </template>
                <!--formulario-->

                <v-card >
                <v-card-title><span class="text-h5">Articulo</span></v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-row > <v-col>  <v-autocomplete  v-model="editedItem.categoria"  :rules="rulesCategoria" :items="categorias" label="Categoria" required></v-autocomplete>  </v-col> </v-row>
                      <v-row > <v-col>  <v-autocomplete  v-model="editedItem.marca"  :rules="rulesMarca" :items="marcas" label="Marcas" required></v-autocomplete>  </v-col> </v-row>
                      <v-row>
                        <v-col > <v-text-field  v-model="editedItem.referencia" :rules="rulesReferencia" :counter="50" label="Referencia"  required  ></v-text-field>  </v-col>
                      </v-row> 
                      <v-row>
                        <v-col > <v-text-field type="number"  min="0" v-model="editedItem.stock"  :rules="rulesNum" label="stock"  required  ></v-text-field>  </v-col>
                        <v-col > <v-text-field  type="number" min="0" v-model="editedItem.costo" :rules="rulesNum" label="Costo"  required ></v-text-field> </v-col>
                        <v-col >  <v-text-field type="number"  min="0" v-model="editedItem.precio"  :rules="rulesNum" label="Precio"  required ></v-text-field> </v-col>
                      </v-row>
                      <v-btn color="blue darken-1" text class="mr-4"  @click="guardar"  > Guardar </v-btn>
                      <v-btn color="blue darken-1" text class="mr-4"  @click="reset">  Limpiar </v-btn>
                      <v-btn color="red darken-1" text class="mr-4" @click="dialog=false"> Cancelar </v-btn>
                    </v-form >
                  </v-card-text>    
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog2" max-width="500px" >
                <v-card >
                <v-card-title><span class="text-h5">Editar articulo</span></v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-row>
                        <v-autocomplete  v-model="editedItem.categoria"  :rules="rulesCategoria" label="Categoria"  :items="categorias" ></v-autocomplete>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarCategoria(editedItem.categoria)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      <v-row>
                        <v-autocomplete  v-model="editedItem.marca"  :rules="rulesMarca" label="Marca"  :items="marcas" ></v-autocomplete>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarMarca(editedItem.marca)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      <v-row>
                        <v-text-field  v-model="editedItem.referencia"  :rules="rulesReferencia" label="Referencia"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarReferencia(editedItem.referencia)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      <v-row>
                        <v-text-field  v-model="editedItem.stock"  :rules="rulesNum" label="Stock"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarStock(editedItem.stock)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      <v-row>
                        <v-text-field  v-model="editedItem.costo"  :rules="rulesNum" label="Costo"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarCosto(editedItem.costo)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      <v-row>
                        <v-text-field  v-model="editedItem.precio"  :rules="rulesNum" label="Precio"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarPrecio(editedItem.precio)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      
                      <v-btn color="red darken-1" text class="mr-4" @click="dialog2=false"> Cancelar </v-btn>
                    </v-form >
                  </v-card-text>    
                </v-card>
              </v-dialog>

            </v-toolbar>
          </template>

          <template v-slot:[`item.totalCosto`]="{ item }">
            {{item.cantDisponibles * item.costo}}
          </template>

          <template v-slot:[`item.totalPrecio`]="{ item }">
            {{item.cantDisponibles * item.precio}}
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

          <!--editar activar desactivar-->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon  small  class="mr-2"  @click="editar(item)" >  mdi-pencil </v-icon>
            <v-icon  small  class="mr-2"  @click="cambioPage(2,item._id)" >mdi-file-search-outline</v-icon>
            
            <template v-if="item.estado">
              <v-icon  small class="mr-2" @click="activarDesactivarItem(2,item)" > mdi-check </v-icon>
            </template>
            <template v-else>
              <v-icon  small  @click="activarDesactivarItem(1,item)" >  mdi-block-helper </v-icon>
            </template>

          </template>

        </v-data-table>
        </template>
      </template>


      <template>
        <div v-if="muestra==2" class="container pa-4 white grid-list-sm">
          <v-container fluid>
            <v-row> 
              <v-btn   @click="cambioPage(1,false)"  class="mb-2 purple darken-3 white--text" >Volver</v-btn>
            </v-row>

            <v-row> 

              <v-col>

                <div >
                  <v-layout justify-left>
                    <v-flex xs2><v-card style="width:80px"><v-card-text class="px-0">Categoria</v-card-text></v-card></v-flex>
                    <v-flex xs2><v-card ><v-card-text class="px-0">{{this.articulosDetallesCategoria}}</v-card-text></v-card></v-flex>
                  </v-layout>
                </div>

                <div >
                  <v-layout justify-left  >
                    <v-flex xs2><v-card style="width:80px"><v-card-text class="px-0">Marca</v-card-text></v-card></v-flex>
                    <v-flex xs2> <v-card ><v-card-text class="px-0"> {{this.articulosDetallesMarca}}</v-card-text></v-card></v-flex>
                  </v-layout>
                </div>

                <div>
                  <v-layout justify-left  >
                    <v-flex xs2><v-card style="width:80px"><v-card-text class="px-0">Referencia</v-card-text></v-card></v-flex>
                    <v-flex xs2><v-card > <v-card-text class="px-0">{{this.articulosDetalles.referencia}}</v-card-text></v-card></v-flex>
                  </v-layout>
                </div>

              </v-col>
              <v-col>

                <div >
                    <label  class="col-sm-4 col-form-label">Stock:</label>
                    <input dir="rtl" type="text" class="form-control mb-3 llenarTexto" v-model="articulosDetalles.stock"  >
                    <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarStock(articulosDetalles.stock)"><v-icon>mdi-reload</v-icon>  </v-btn>
                </div>  
                <div >
                    <label  class="col-sm-4 col-form-label">Precio:</label>
                    <input dir="rtl" type="text" class="form-control mb-3 llenarTexto" v-model="articulosDetalles.precio"  >
                    <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarPrecio(articulosDetalles.precio)"><v-icon>mdi-reload</v-icon>  </v-btn>
                </div>
                <v-divider></v-divider>  
                <div >
                    <label  class="col-sm-4 col-form-label">Total precio:</label>
                    <label  class="col-sm-4 col-form-label">$ {{this.articulosDetalles.stock * this.articulosDetalles.precio}}</label>
                </div>
                <div >
                    <label  class="col-sm-4 col-form-label">Costo:</label>
                    <input dir="rtl" type="text" class="form-control mb-3 llenarTexto" v-model="articulosDetalles.costo"  >
                    <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarCosto(articulosDetalles.costo)"><v-icon>mdi-reload</v-icon>  </v-btn>
                </div>    
                <v-divider></v-divider>  
                <div >
                    <label  class="col-sm-4 col-form-label">Total costo:</label>
                    <label  class="col-sm-4 col-form-label">$ {{this.articulosDetalles.stock * this.articulosDetalles.costo}}</label>
                </div>
            
              </v-col>
            </v-row>
             
            
          </v-container>
        </div>
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
      muestra:1,    //cambiar de vista
      search: '',   //buscar dentro de la tabla
      dialog: false, //cuadro para almacenar
      dialog2: false, //cuadro para editar

      categoriaFiltrada:'',
      marcaFiltrada:'',

      rulesCategoria: [value=>!!value||'Requerido'],
      rulesMarca: [value=>!!value||'Requerido'],
      rulesReferencia: [
        value => !!value || 'Requiredo',
        value => (value && value.length <= 50) || 'Max 50 caracteres',
      ],
      rulesNum: [ 
        value=>!!value||'Requerido',
        value=>value>=0 || 'Numero negativo'
      ],

      categoriasFiltro:[],
      marcasFiltro:[],
      
      columnas: [
        { text: 'Categoria', value: 'categoria.nombre', class:'purple darken-3 white--text' },
        { text: 'Marca', value: 'marca.nombre', class:'purple darken-3 white--text' },
        { text: 'Referencia', value: 'referencia', class:'purple darken-3 white--text' },
        { text: 'disponibles', value: 'cantDisponibles', class:'purple darken-3 white--text' },
        { text: 'Costo', value: 'costo', class:'purple darken-3 white--text' },
        { text: 'Total costo', value: 'totalCosto', class:'purple darken-3 white--text' },
        { text: 'Precio', value: 'precio', class:'purple darken-3 white--text' },
        { text: 'Total precio', value: 'totalPrecio', class:'purple darken-3 white--text' },
        { text: 'Estado', value: 'estado', class:'purple darken-3 white--text' },
        { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'150px',sortable: false }
      ],
      
      articulos: [{categoria:'', marca:'', referencia:'',cantDisponibles:'',precio:'',costo:'',estado:'' }],
      articulosExport: [],

      articulosDetalles: {},  
      articulosDetallesCategoria:'',
      articulosDetallesMarca:'',

      editedItem: {categoria:'', marca:'', referencia:'',cantDisponibles:'',precio:'',costo:'',estado:'' },

      categorias:[],//lista desplegable
      marcas:[],//lista desplegable
    }),//data

    created(){
      this.obtenerarticulos();
      this.selectCategoria();
      this.selectMarca();
      this.traerCategorias();
      this.traerMarcas();
    },
    methods: {
      //msg alerta
      msjcompra:function(tata){
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: tata,
          showConfirmButton: false,
          timer: 2000})
      },

      msjAlertaBien:function(tata){
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: tata,
          showConfirmButton: false,
          timer: 2000})
      },

      cambioPage(num,id){
        console.log(num,id);
        if(num==1){
          this.muestra=1
        }else{
          this.muestra=2
          this.traerArticulo(id)
        }
      },//cambioPage

      //traer todos los articulos
      obtenerarticulos(){
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get("articulo",header)
          .then(response =>{
            console.log(response.data);
            this.articulos = response.data.articulo
          })
          .catch((error) =>{
            console.log(error.response);
            if(!error.response.data.msg){
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          })
      },//obtenerarticulos

      traerCategorias(){
        console.log("sirve");
        let me = this;
        let categoriasArray=[];
        let header = {headers:{"token":this.$store.state.token}};
        axios.get("categoria",header)
          .then(response=>{
            console.log(response);
            categoriasArray = response.data.categoria;
            categoriasArray.map(function(x){
              me.categoriasFiltro.push({text: x.nombre, value: x._id});
            })
          })
          .catch(function (error) {
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          });
      },//filtarCateAndMarca
      
      traerMarcas(){
        console.log("sirve");
        let me = this;
        let marcasArray=[];
        let header = {headers:{"token":this.$store.state.token}};
        axios.get("marca",header)
          .then(response=>{
            console.log(response);
            marcasArray = response.data.marca;
            marcasArray.map(function(x){
              me.marcasFiltro.push({text: x.nombre, value: x._id});
            })
          })
          .catch(function (error) {
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          });
      },//filtarCateAndMarca

      //obtener las categorias activas
      selectCategoria(){
        let me = this;
        let categoriasArray=[];
        let header = {headers:{"token":this.$store.state.token}};
        axios.get("categoria/activas",header)
          .then(response=>{
            console.log(response);
            categoriasArray = response.data.categoria;
            categoriasArray.map(function(x){
              me.categorias.push({text: x.nombre, value: x._id});
            })
          })
          .catch(function (error) {
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          });
      },//seletCategoria

      filtarCateAndMarca(){
        console.log("categoria: "+this.categoriaFiltrada);
        console.log("marca: "+this.marcasFiltro);
        let header = {headers:{"token" : this.$store.state.token}};
        axios.post(`articulo/categoriaAndMarca`,{categoria:this.categoriaFiltrada,marca:this.marcaFiltrada}, header)
          .then((response)=>{
            console.log(response);
            this.articulos = response.data.articulo
          })
          .catch((error)=>{
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          });
      },
      //obtener las marcas activas
      selectMarca(){
        let me = this;
        let marcasArray=[];
        let header = {headers:{"token":this.$store.state.token}};
        axios.get("marca/activas",header)
          .then(response=>{
            console.log(response);
            marcasArray = response.data.marca;
            marcasArray.map(function(x){
              me.marcas.push({text: x.nombre, value: x._id});
            })
          })
          .catch(function (error) {
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          });
      },//selectMarcas

      

      traerArticulo(id){
        console.log(id);
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get(`/articulo/articulo/${id}`,header)
          .then(response =>{
            console.log(response.data);
            this.articulosDetalles = response.data.articulo
            this.articulosDetallesCategoria=response.data.articulo.categoria.nombre
            this.articulosDetallesMarca=response.data.articulo.marca.nombre
          })
          .catch((error) =>{
            console.log(error.response);
            if(!error.response.data.msg){
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          })
      },

      //limpiar formulario
      reset(){
        this.editedItem.categoria='';
        this.editedItem.marca='';
        this.editedItem.referencia='';
        this.editedItem.stock='';
        this.editedItem.precio='';
        this.editedItem.costo='';
      },

      //alistar variables para enviar 
      editar(item){
        console.log(item);
        this.id= item._id;
        this.editedItem.categoria=item.categoria;
        this.editedItem.marca=item.marca;
        this.editedItem.referencia=item.referencia;
        this.editedItem.stock=item.stock;
        this.editedItem.costo=item.costo;
        this.editedItem.precio=item.precio;
        this.dialog2=true;
      },//editar

      editarDetalle(item){
        console.log(item);
        this.id= item._id;
        this.editedItem.categoria=item.categoria;
        this.editedItem.marca=item.marca;
        this.editedItem.referencia=item.referencia;
        this.editedItem.stock=item.stock;
        this.editedItem.costo=item.costo;
        this.editedItem.precio=item.precio;
      },//editar
      
      //almacenar
      guardar(){
        console.log('estoy guardando'+this.bd+'ALMACENAR');
        let header = {headers:{"token" : this.$store.state.token}};
        const me = this;
        axios.post('articulo',{
            categoria:this.editedItem.categoria,
            marca:this.editedItem.marca,
            referencia:this.editedItem.referencia,
            precio:this.editedItem.precio,
            costo:this.editedItem.costo,
            stock:this.editedItem.stock
          },
          header)
            .then((response)=>{
              console.log(response);
              this.msgError=response.data.msg;
              this.msjAlertaBien(this.msgError);
              me.reset();
              me.obtenerarticulos(),
              this.dialog=false
            })
            .catch((error)=>{
              console.log(error.response);
              if(!error.response.data.msg){
                console.log(error.response);
                this.msgError = error.response.data.errors[0].msg;
                this.msjcompra(this.msgError);
              }else{
                this.msgError = error.response.data.msg;
                console.log(error.response.data.msg);
                this.msgError =error.response.data.msg;
                this.msjcompra(this.msgError);
              }
            })
      },//guardar

      activarDesactivarItem (accion , item) {
        let id = item._id;
        console.log(accion);
        if(accion == 2){
          console.log(id);
          let me = this
          let header = {headers:{"token" : this.$store.state.token}};
          axios.put(`articulo/desactivar/${id}`,{}, header)
          .then((response)=>{
            console.log(response);
            me.obtenerarticulos();
          })
          .catch((error)=>{
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          });
        }else if (accion==1){
          console.log(id);
          let me = this
          let header = {headers:{"token" : this.$store.state.token}};
          axios.put(`articulo/activar/${id}`,  {},header)
          .then((response)=>{
            console.log(response);
            me.obtenerarticulos();
          })
          .catch((error)=>{
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          });
        }
      },//activarDesactivarItem
      
      //actualizar categoria
      actualizarCategoria(categoria){
        console.log(categoria);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        axios.put(`articulo/actualizarCategoria/${id}`,{categoria}, header)
          .then((response)=>{
            console.log(response);
            this.msgError=response.data.msg;
            this.msjAlertaBien(this.msgError);
            me.obtenerarticulos();
          })
          .catch((error)=>{
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          });
      },//actualizarNumodoc
      
      //actualizar marca
      actualizarMarca(marca){
        console.log(marca);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        axios.put(`articulo/actualizarMarca/${id}`,{marca}, header)
          .then((response)=>{
            console.log(response);
            this.msgError=response.data.msg;
            this.msjAlertaBien(this.msgError);
            me.obtenerarticulos();
          })
          .catch((error)=>{
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          });
      },//actualizarMarca

      actualizarReferencia(referencia){
        console.log(referencia);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        axios.put(`articulo/actualizarReferencia/${id}`,{referencia}, header)
          .then((response)=>{
            console.log(response);
            this.msgError=response.data.msg;
            this.msjAlertaBien(this.msgError);
            me.obtenerarticulos();
          })
          .catch((error)=>{
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          });
      },//actualizarNombre

      actualizarStock(stock){
        console.log(stock);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        axios.put(`articulo/actualizarStock/${id}`,{stock}, header)
          .then((response)=>{
            console.log(response);
            this.msgError=response.data.msg;
            this.msjAlertaBien(this.msgError);
            me.obtenerarticulos();
          })
          .catch((error)=>{
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          });
      },//actualizarStock

      actualizarCosto(costo){
        console.log(costo);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        axios.put(`articulo/actualizarCosto/${id}`,{costo}, header)
          .then((response)=>{
            console.log(response);
            this.msgError=response.data.msg;
            this.msjAlertaBien(this.msgError);
            me.obtenerarticulos();
          })
          .catch((error)=>{
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          });
      },//actualizarCosto

      actualizarPrecio(precio){
        console.log(precio);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        axios.put(`articulo/actualizarPrecio/${id}`,{precio}, header)
          .then((response)=>{
            console.log(response);
            this.msgError=response.data.msg;
            this.msjAlertaBien(this.msgError);
            me.obtenerarticulos();
          })
          .catch((error)=>{
            console.log(error);
            if(!error.response.data.msg){
              console.log(error.response);
              this.msgError = error.response.data.errors[0].msg;
              this.msjcompra(this.msgError);
            }else{
              this.msgError = error.response.data.msg;
              console.log(error.response.data.msg);
              this.msgError =error.response.data.msg;
              this.msjcompra(this.msgError);
            }
          });

      },//actualizarPrecio

      exportarExcel(){
        console.log("exportando ");
        let vacio = this.limpiando();
        this.articulosExport=vacio;
        let me = this;
        me.articulos.map(function(x){
              me.articulosExport.push(
                {
                  categoria:x.categoria.nombre, 
                  marca:x.marca.nombre, 
                  referencia:x.referencia, 
                  stock:x.stock, 
                  costo:x.costo,
                  precio:x.precio, 
                }
              );
        })
        console.log(this.articulos);
        console.log("_______");
        console.log(this.articulosExport);
        
      },//exportarExcel

      limpiando(){
        return []
      }
      

    },//methots
  }//export default
</script>

<style>
  .llenarTexto{
    font-family: 'calibri';
    color: #72128E;
    font-size: 20px;
    border: 3px solid #72128E;
    border-radius: 5px;
    height:35px;
    margin-top:12px
  }
</style>