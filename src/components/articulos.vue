<template>
  <div v-if="this.$store.state.token != ''" >
  <v-app>
    <v-container fluid>

    <template >
      <!--buscar por marca, categoria o todo-->
      <template v-if="muestra == 1">
        <v-card style="margin-top:20px;box-shadow: 0 0 20px #A068B8;" >
        <v-row style="margin-left:10px">
          
            <!--autocomplete-->
            <v-autocomplete style="width:8%;"  v-model="categoriaFiltrada"  :items="categoriasFiltro" label="Categoria" required></v-autocomplete>
            <v-autocomplete style="width:8%; margin-left:10px;  " v-model="marcaFiltrada"  :items="marcasFiltro" label="Marcas" required></v-autocomplete>
            <!--boton de buscar-->
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
      
      <template v-if="muestra == 1"> 
        <!--tabla para mostrar los articulos-->
        <v-data-table style="margin-top:50px"   class=" elevation-15 " :headers="columnas" :items="articulos" :objetos="[categorias,marcas]" :search="search">
          <template v-slot:top>
            <!--parte arriba tabla-->
            <v-toolbar flat  >
              <v-toolbar-title>Articulos</v-toolbar-title>
              
              <!--buscar-->
              <v-spacer></v-spacer>
              <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar por categoria, marca o referencia"  single-line hide-details></v-text-field>
              <v-divider  class="mx-4" inset  vertical ></v-divider>
              <v-spacer></v-spacer>

              <!--cuadro de texto para agregar articulo-->
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
                        <v-col >
                          <v-text-field type="number"  min="0" v-model="editedItem.cantDisponibles"  :rules="rulesNum" label="Cantidad"  required  ></v-text-field>  
                        </v-col>
                        <v-col >
                          <v-text-field  type="number" min="0" v-model="editedItem.costo" :rules="rulesNum" label="Costo"  required ></v-text-field> 
                        </v-col>
                        <v-col >
                          <v-text-field type="number"  min="0" v-model="editedItem.precio"  :rules="rulesNum" label="Precio"  required ></v-text-field> 
                        </v-col>
                      </v-row>

                      <v-btn color="blue darken-1" text class="mr-4"  @click="guardar"  > Guardar </v-btn>
                      <v-btn color="blue darken-1" text class="mr-4"  @click="reset">  Limpiar </v-btn>
                      <v-btn color="red darken-1" text class="mr-4" @click="dialog=false"> Cancelar </v-btn>

                    </v-form >
                  </v-card-text>    
                </v-card>
              </v-dialog>

              <!--cuadro de texto para editar articulo-->
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
                        <v-text-field  v-model="editedItem.costo"  :rules="rulesNum" label="Costo"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarCosto(editedItem.costo)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      <v-row>
                        <v-text-field  v-model="editedItem.precio"  :rules="rulesNum" label="Precio"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarPrecio(editedItem.precio)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      <v-row>
                        <v-text-field  v-model="editedItem.cantDisponibles"  :rules="rulesNum" label="Disponibles"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarDisponibles(editedItem.cantDisponibles)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      <v-row>
                        <v-text-field  v-model="editedItem.cantSeparadas"  :rules="rulesNum" label="Separadas"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarAlmacenadas(editedItem.cantSeparadas)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      <v-row>
                        <v-text-field  v-model="editedItem.cantVendieron"  :rules="rulesNum" label="Vendieron"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarVendieron(editedItem.cantVendieron)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      <v-row>
                        <v-text-field  v-model="editedItem.cantCompradas"  :rules="rulesNum" label="Compradas"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarCompradas(editedItem.cantCompradas)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      <v-row>
                        <v-text-field  v-model="editedItem.cantSalieron"  :rules="rulesNum" label="Salieron"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarSalieron(editedItem.cantSalieron)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      
                      <v-btn color="red darken-1" text class="mr-4" @click="dialog2=false"> Cancelar </v-btn>
                    </v-form >
                  </v-card-text>    
                </v-card>
              </v-dialog>

            </v-toolbar>
          </template>

          <!--total costo-->
          <template v-slot:[`item.totalCosto`]="{ item }">
            {{item.cantDisponibles * item.costo}}
          </template>

          <!--total precio-->
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


      <template v-if="muestra==2">
        <div  >
          <v-container fluid>
            <v-row> 
              <v-btn   @click="cambioPage(1,false)"  class="mb-2 purple darken-3 white--text" >Volver</v-btn>
            </v-row>

            <v-row> 
              
              <v-col>
                <v-card style="margin-top:20px;box-shadow: 0 0 20px #A068B8; width:100%" >
                <div >
                  <v-layout justify-left>
                    <label  class="col-sm-4 col-form-label" style="text-align:left">Categoria:</label>
                    <label  class="col-sm-4 col-form-label" style="text-align:left">{{this.articulosDetallesCategoria}}</label>
                  </v-layout>
                </div>
                <div >
                  <v-layout justify-left>
                    <label  class="col-sm-4 col-form-label" style="text-align:left">Marca:</label>
                    <label  class="col-sm-4 col-form-label" style="text-align:left">{{this.articulosDetallesMarca}}</label>
                  </v-layout>
                </div>
                <div>
                  <v-layout justify-left  >
                    <label  class="col-sm-4 col-form-label" style="text-align:left">Referencia:</label>
                    <label  class="col-sm-4 col-form-label" style="text-align:left">{{this.editedItem.referencia}}</label>
                  </v-layout>
                </div>
                </v-card>
              </v-col>
              <v-col>
                <v-card style="margin-top:20px;box-shadow: 0 0 20px #A068B8; width:100%" >
                <div >
                  <v-layout justify-left>
                    <label  class="col-sm-4 col-form-label" style="text-align:left">Codigo de barras:</label>
                    
                  </v-layout>
                </div>
                <div >
                  <v-layout justify-left>
                    <label  class="col-sm-4 col-form-label" style="text-align:left">||||||||||</label>
                    
                  </v-layout>
                </div>
                </v-card>
              </v-col>
              
            </v-row>


            <v-row>
              
              <v-col style="margin-top:10px">
               
                <table class="table1">
                <thead>
                    <tr>
                        <th></th>
                        <th scope="col2" >Disponibles</th>
                        <th scope="col" >Separadas</th>
                        <th scope="col" >Vendidas</th>
                        <th scope="col" >Salieron</th>
                        <th scope="col" >Compraron</th>
                        
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                        <th scope="row">Diferencia</th>
                        <td>{{editedItem.cantDisponibles*(editedItem.precio-editedItem.costo)}}</td>
                        <td>{{editedItem.cantSeparadas*(editedItem.precio-editedItem.costo)}}</td>
                        <td>{{editedItem.cantVendieron*(editedItem.precio-editedItem.costo)}}</td>
                        <td>{{editedItem.cantSalieron*(editedItem.precio-editedItem.costo)}}</td>
                        <td>{{editedItem.cantCompradas*(editedItem.precio-editedItem.costo)}}</td>
                        
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr>
                        <th scope="row">Unidades</th>
                        <td>
                          <input  type="text" class="form-control mb-3 llenarTexto" v-model="editedItem.cantDisponibles"  >
                          <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarDisponibles(editedItem.cantDisponibles)">
                            <v-icon>mdi-reload</v-icon>  
                          </v-btn>
                        </td>
                        <td>
                          <input  type="text" class="form-control mb-3 llenarTexto" v-model="editedItem.cantSeparadas"  >
                          <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarAlmacenadas(editedItem.cantSeparadas)">
                            <v-icon>mdi-reload</v-icon>  
                          </v-btn>
                        </td>
                        

                        <td>
                          <input  type="text" class="form-control mb-3 llenarTexto" v-model="editedItem.cantVendieron"  >
                          <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarVendieron(editedItem.cantVendieron)">
                            <v-icon>mdi-reload</v-icon>  
                          </v-btn>
                        </td>

                        <td>
                          <input  type="text" class="form-control mb-3 llenarTexto" v-model="editedItem.cantSalieron"  >
                          <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarSalieron(editedItem.cantSalieron)">
                            <v-icon>mdi-reload</v-icon>  
                          </v-btn>
                        </td>
                        
                        <td>
                          <input  type="text" class="form-control mb-3 llenarTexto" v-model="editedItem.cantCompradas"  >
                          <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarCompradas(editedItem.cantCompradas)">
                            <v-icon>mdi-reload</v-icon>  
                          </v-btn>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Costo</th>
                        <td>
                          <input  type="text" class="form-control mb-3 llenarTexto" v-model="editedItem.costo"  >
                          <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarCosto(editedItem.costo)">
                            <v-icon>mdi-reload</v-icon>  
                          </v-btn>
                        </td>
                        <td>{{editedItem.costo}}</td>
                        <td>{{editedItem.costo}}</td>
                        <td>{{editedItem.costo}}</td>
                        <td>{{editedItem.costo}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Precio</th>
                        <td>
                          <input  type="text" class="form-control mb-3 llenarTexto" v-model="editedItem.precio"  >
                          <v-btn class="botones" style="margin-top:0px" icon color="#72128E" @click="actualizarPrecio(editedItem.precio)">
                            <v-icon>mdi-reload</v-icon>  
                          </v-btn>
                        </td>
                        <td>{{editedItem.precio}}</td>
                        <td>{{editedItem.precio}}</td>
                        <td>{{editedItem.precio}}</td>
                        <td>{{editedItem.precio}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Total costo</th>
                        <td>{{editedItem.cantDisponibles*editedItem.costo}}</td>
                        <td>{{editedItem.cantSeparadas*editedItem.costo}}</td>
                        <td>{{editedItem.cantVendieron*editedItem.costo}}</td>
                        <td>{{editedItem.cantSalieron*editedItem.costo}}</td>
                        <td>{{editedItem.cantCompradas*editedItem.costo}}</td>
                        
                    </tr>
                    <tr>
                        <th scope="row">Total precio</th>
                        <td>{{editedItem.cantDisponibles*editedItem.precio}}</td>
                        <td>{{editedItem.cantSeparadas*editedItem.precio}}</td>
                        <td>{{editedItem.cantVendieron*editedItem.precio}}</td>
                        <td>{{editedItem.cantSalieron*editedItem.precio}}</td>
                        <td>{{editedItem.cantCompradas*editedItem.precio}}</td>
                        
                    </tr>
                  </tbody>
                </table>
            
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
      
      categoriaFiltrada:'', //filtros 
      marcaFiltrada:'',     //filtros
      categoriasFiltro:[],  //filtros
      marcasFiltro:[],      //filtros

      categorias:[],//lista desplegable
      marcas:[],//lista desplegable
      
      articulos: [],//datos de la tabla
      columnas: [
        { text: 'Categoria', value: 'categoria.nombre', class:'purple darken-3 white--text' },
        { text: 'Marca', value: 'marca.nombre', class:'purple darken-3 white--text' },
        { text: 'Referencia', value: 'referencia', class:'purple darken-3 white--text' },
        { text: 'disponibles', value: 'cantDisponibles', class:'purple darken-3 white--text' },
        { text: 'Costo', value: 'costo', class:'purple darken-3 white--text' },
        { text: 'Precio', value: 'precio', class:'purple darken-3 white--text' },
        { text: 'Total costo', value: 'totalCosto', class:'purple darken-3 white--text' },
        { text: 'Total precio', value: 'totalPrecio', class:'purple darken-3 white--text' },
        { text: 'Estado', value: 'estado', class:'purple darken-3 white--text' },
        { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'150px',sortable: false }
      ],
      
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

      //almacena el articulo traido por id
      articulosDetalles: {},  
      articulosDetallesCategoria:'',
      articulosDetallesMarca:'',

      editedItem: {
        categoria:'', marca:'', referencia:'',
        precio:'',costo:'',estado:'' ,
        cantDisponibles:'',cantSeparadas:'',
        cantVendieron:'',cantCompradas:'',cantSalieron:''
      },

      articulosExport: [],
      
    }),//data

    created(){
      //this.obtenerarticulos();
      this.selectCategoria();
      this.selectMarca();
      this.traerCategorias();
      this.traerMarcas();
      this.obtenerarticulos();
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
            this.articulos = response.data.articulo;
            this.categoriaFiltrada='';
            this.marcaFiltrada='';
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

      //todas las categorias
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
      },//traerCategorias
      
      //todas las marcas
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
      },//traerMarcas

      //categorias activas
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

      //marcas activas
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

      //traer articulos por marca y/o categoria o todos si esta vacia la peticion
      filtarCateAndMarca(){
        console.log("categoria: "+this.categoriaFiltrada);
        console.log("marca: "+this.marcasFiltro);
        let header = {headers:{"token" : this.$store.state.token}};
        axios.post(`articulo/categoriaAndMarca`,{categoria:this.categoriaFiltrada,marca:this.marcaFiltrada}, header)
          .then((response)=>{
            console.log(response);
            this.articulos = response.data.articulo;
            this.categoriaFiltrada='';
            this.marcaFiltrada='';
            if(this.articulos.length==0){
              this.msjAlertaBien('No hay articulos con esos caracteres')
            }
            
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
      },//filtarCateAndMarca
      
      //traer el articulo para editarlo
      traerArticulo(id){
        console.log(id);
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get(`/articulo/articulo/${id}`,header)
          .then(response =>{
            console.log(response.data);
            //this.articulosDetalles = response.data.articulo
            this.articulosDetallesCategoria=response.data.articulo.categoria.nombre
            this.articulosDetallesMarca=response.data.articulo.marca.nombre
            this.editarDetalle(response.data.articulo)
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
        this.editedItem.precio='';
        this.editedItem.costo='';
        this.editedItem.cantDisponibles='';
        this.editedItem.cantSeparadas='';
        this.editedItem.cantVendieron='';
        this.editedItem.cantCompradas='';
        this.editedItem.cantSalieron='';
      },//reset

      //alistar variables para enviar 
      editar(item){
        console.log(item);
        this.id= item._id;
        this.editedItem.categoria=item.categoria;
        this.editedItem.marca=item.marca;
        this.editedItem.referencia=item.referencia;
        this.editedItem.costo=item.costo;
        this.editedItem.precio=item.precio;
        this.editedItem.cantDisponibles=item.cantDisponibles;
        this.editedItem.cantSeparadas=item.cantSeparadas;
        this.editedItem.cantCompradas=item.cantCompradas;
        this.editedItem.cantSalieron=item.cantSalieron;
        this.editedItem.cantVendieron=item.cantVendieron;
        this.dialog2=true;
      },//editar

      editarDetalle(item){
        console.log(item);
        this.id= item._id;
        this.editedItem.categoria=item.categoria;
        this.editedItem.marca=item.marca;
        this.editedItem.referencia=item.referencia;
        this.editedItem.costo=item.costo;
        this.editedItem.precio=item.precio;
        this.editedItem.cantDisponibles=item.cantDisponibles;
        this.editedItem.cantSeparadas=item.cantSeparadas;
        this.editedItem.cantCompradas=item.cantCompradas;
        this.editedItem.cantSalieron=item.cantSalieron;
        this.editedItem.cantVendieron=item.cantVendieron;
      },//editar
      
      //almacenar
      guardar(){
        console.log('estoy guardando'+this.bd+'ALMACENAR');
        let header = {headers:{"token" : this.$store.state.token}};
        const me = this;
        if(
            this.editedItem.categoria == '' || 
            this.editedItem.marca=='' || 
            this.editedItem.referencia=='' ||
            this.editedItem.precio=='' ||
            this.editedItem.costo=='' ||
            this.editedItem.cantDisponibles==''
          ){
          return this.msjcompra('faltan campos');
        }
        if(this.editedItem.referencia.trim().length>50){
          return this.msjcompra('Referencia superior a 50 carácteres');
        }
        axios.post('articulo',{
            categoria:this.editedItem.categoria,
            marca:this.editedItem.marca,
            referencia:this.editedItem.referencia,
            precio:this.editedItem.precio,
            costo:this.editedItem.costo,
            cantDisponibles:this.editedItem.cantDisponibles
          },
          header)
            .then((response)=>{
              console.log(response);
              this.msgError=response.data.msg;
              this.msjAlertaBien(this.msgError);
              me.reset();
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

      //activar o desactivar ariticulos
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

      //actulizar costo
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

      //actualizar precio
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

      //actualizar disponible
      actualizarDisponibles(cantDisponibles){
        console.log(cantDisponibles);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        axios.put(`articulo/actualizarCantDisponible/${id}`,{cantDisponibles}, header)
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
      },//actualizarDisponibles

      //actualizar almacenadas
      actualizarAlmacenadas(cantSeparadas){
        console.log(cantSeparadas);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        axios.put(`articulo/actualizarCantSeparadas/${id}`,{cantSeparadas}, header)
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
      },//actualizarAlmacenadas

      //actualizar vendidas
      actualizarVendieron(cantVendieron){
        console.log(cantVendieron);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        axios.put(`articulo/actualizarCantVendieron/${id}`,{cantVendieron}, header)
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
      },//actualizarVendieron

      //actualizar compraron
      actualizarCompradas(cantCompradas){
        console.log(cantCompradas);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        axios.put(`articulo/actualizarCantCompradas/${id}`,{cantCompradas}, header)
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
      },//actualizarCompradas

      //actualizar compraron
      actualizarSalieron(cantSalieron){
        console.log(cantSalieron);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        axios.put(`articulo/actualizarCantSalieron/${id}`,{cantSalieron}, header)
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
      },//actualizarSalieron



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
                  costo:x.costo,
                  precio:x.precio,  
                  cantDisponibles:x.cantDisponibles,
                  cantVendieron:x.cantVendieron,
                  cantSeparadas:x.cantSeparadas,
                  cantSalieron:x.cantSalieron,
                  cantCompradas:x.cantCompradas
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

<style scoped>
  .llenarTexto{
    font-family: 'calibri';
    color: #72128E;
    font-size: 20px;
    border: 3px solid #72128E;
    border-radius: 5px;
    height:35px;
    width:100px;
    margin-top:12px
  }

  .table1{
    font-family: "Trebuchet MS", sans-serif;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.4em;
    font-style: normal;
    border-collapse:separate;
    width:100%
  }

  .table1 thead th{
    padding:15px;
    color:#fff;
    text-shadow:1px 1px 1px #A068B8 ;
    border:1px solid #A068B8;
    border-bottom:3px solid #A068B8;
    background-color:#72128E;
    background:-webkit-gradient(
        linear,
        left bottom,
        left top,
        color-stop(0.02, rgb(123,192,67)),
        color-stop(0.51, rgb(139,198,66)),
        color-stop(0.87, rgb(158,217,41))
        );
    background: -moz-linear-gradient(
        center bottom,
        rgb(123,192,67) 2%,
        rgb(139,198,66) 51%,
        rgb(158,217,41) 87%
        );
    -webkit-border-top-left-radius:5px;
    -webkit-border-top-right-radius:5px;
    -moz-border-radius:5px 5px 0px 0px;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    
  }
  .table1 thead th:empty{
    background:transparent;
    border:none;
  }

  .table1 tbody th{
    
    color:#fff;
    text-shadow:1px 1px 1px #A068B8;
    background-color:#72128E;
    border:1px solid #A068B8;
    border-right:3px solid #A068B8;
    padding:0px 10px;
    background:-webkit-gradient(
        linear,
        left bottom,
        right top,
        color-stop(0.02, rgb(158,217,41)),
        color-stop(0.51, rgb(139,198,66)),
        color-stop(0.87, rgb(123,192,67))
        );
    background: -moz-linear-gradient(
        left bottom,
        rgb(158,217,41) 2%,
        rgb(139,198,66) 51%,
        rgb(123,192,67) 87%
        );
    -moz-border-radius:5px 0px 0px 5px;
    -webkit-border-top-left-radius:5px;
    -webkit-border-bottom-left-radius:5px;
    border-top-left-radius:5px;
    border-bottom-left-radius:5px;
  }
  .table1 tfoot td{
    color: #72128E;
    font-size:32px;
    text-align:center;
    padding:10px 0px;
    text-shadow:1px 1px 1px #444;
}
.table1 tfoot th{
    color:#666;
}
.table1 tbody td{
  
    padding:10px;
    text-align:center;
    background-color:#E7BBFA;
    border: 2px solid #E7EFE0;
    -moz-border-radius:2px;
    -webkit-border-radius:2px;
    border-radius:2px;
    color:#000000;
    text-shadow:1px 1px 1px #fff;
}


</style>