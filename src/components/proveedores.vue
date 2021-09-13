<template>
  <div v-if="this.$store.state.token != ''" >
  <v-app>
    <v-container fluid>
      <template>
        <v-row style="margin-left:10px">
          <v-text-field  v-model="buscarClienteLetras"
            label="Traer proveedores por tipo y numero de documento, nombre, dirección, ciudad, telefono o email. (Ejemplo:proveedor1)" 
            v-on:keyup.enter="obtenerPersonas()">
          </v-text-field>
          <v-btn style="margin-right:10px; margin-left:50px;  margin-top:10px"   icon color="#72128E"  @click="obtenerPersonas()"><v-icon size="40">mdi-card-search-outline</v-icon> </v-btn>
        </v-row>
      </template>

      <template>
        <v-data-table style="margin-top:50px" class=" elevation-15 " :headers="columnas" :items="personas" :search="search">
          <template v-slot:top>
            <!--parte arriba tabla-->
            <v-toolbar flat  >
              <v-toolbar-title>Proveedores</v-toolbar-title>
              
              <!--buscar-->
              <v-spacer></v-spacer>
              <!--<v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar proveedor por documento, nombre, dirección, ciudad, telefono o email"  single-line hide-details></v-text-field>-->
              <!--<v-divider  class="mx-4" inset  vertical ></v-divider>-->
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="500px"  >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  v-bind="attrs"  v-on="on" @click="reset()"  >  Nuevo </v-btn>
                </template>
                <!--formulario-->

                <v-card >
                <v-card-title><span class="text-h5">Proveedores</span></v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field  v-model="editedItem.tipoDocumento"                :rules="rulesTipoDocumento" label="Tipo de Documento*"  required ></v-text-field>
                      <v-text-field  v-model="editedItem.numDocumento"  :counter="30" :rules="rulesNumDocumento" label="Número de Documento*" required  ></v-text-field>
                      <v-text-field  v-model="editedItem.nombre"        :counter="70" :rules="rulesNombre" label="Nombre*"  required ></v-text-field>
                      <v-text-field  v-model="editedItem.direccion"     :counter="70" :rules="rulesDireccion"  label="Dirección"  ></v-text-field>
                      <v-text-field  v-model="editedItem.ciudad"        :counter="70" :rules="rulesCiudad"  label="Ciudad"  ></v-text-field>
                      <v-text-field  v-model="editedItem.telefono"      :counter="70" :rules="rulesTelefono"  label="Telefono"   ></v-text-field>
                      <v-text-field  v-model="editedItem.email"         :counter="70" :rules="rulesEmail" label="Email"></v-text-field>

                      <v-btn color="blue darken-1" text class="mr-4"  @click="guardar"  > Guardar </v-btn>
                      <v-btn color="blue darken-1" text class="mr-4"  @click="reset">  Limpiar </v-btn>
                      <v-btn color="red darken-1" text class="mr-4" @click="dialog=false"> Cancelar </v-btn>
                    </v-form >
                  </v-card-text>    
                </v-card>

              </v-dialog>

              <v-dialog v-model="dialog2" max-width="500px" >
                
                <!--formulario-->

                <v-card >
                <v-card-title><span class="text-h5">Editar proveedor</span></v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-row>
                        <v-text-field  v-model="editedItem.tipoDocumento"  :rules="rulesTipoDocumento" label="Tipo de Documento"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarTipodoc(editedItem.tipoDocumento)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.numDocumento" :counter="30" :rules="rulesNumDocumento" label="Número de Documento"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarNumdoc(editedItem.numDocumento)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.nombre" :counter="70" :rules="rulesNombre" label="Nombre*"  required ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarNombre(editedItem.nombre)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.direccion" :counter="70" :rules="rulesDireccion"  label="Dirección"  ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarDireccion(editedItem.direccion)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.ciudad" :counter="70" :rules="rulesCiudad"  label="Ciudad"  ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarCiudad(editedItem.ciudad)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.telefono"  :counter="70" :rules="rulesTelefono"  label="Telefono"   ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarTelefono(editedItem.telefono)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.email" :counter="70" :rules="rulesEmail" label="Email*"  required  ></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarEmail(editedItem.email)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      
                      <v-btn color="red darken-1" text class="mr-4" @click="dialog2=false"> Cancelar </v-btn>
                    </v-form >
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

          <!--editar activar desactivar-->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon  small  class="mr-2"  @click="editar(item)" >  mdi-pencil </v-icon>
            <template v-if="item.estado">
              <v-icon  small class="mr-2" @click="activarDesactivarItem(2,item)" > mdi-check </v-icon>
            </template>
            <template v-else>
              <v-icon  small  @click="activarDesactivarItem(1,item)" >  mdi-block-helper </v-icon>
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
      buscarClienteLetras:'', 
      search: '',
      dialog: false,
      dialog2: false,

      rulesTipoDocumento: [
        value=>!!value||'Requerido',
        value => ( value == 'cc' || value == 'nit') || 'nit o cc' 
      ],
      rulesNumDocumento: [
        value=>!!value||'Requerido',
        value => (value.length <= 30) || 'Max 30 caracteres' 
      ],
      rulesNombre: [
        value => !!value || 'Required.',
        value => (value && value.length <= 70) || 'Max 70 caracteres',
      ],
      rulesDireccion: [value => ( value.length <= 70) || 'Max 70 caracteres'],
      rulesCiudad: [value => ( value.length <= 70) || 'Max 70 caracteres'],
      rulesTelefono: [value => ( value.length <= 70) || 'Max 70 caracteres'],
      rulesEmail: [value => ( value.length <= 70) || 'Max 70 caracteres'],
      
      columnas: [
        { text: 'Tipo Doc', value: 'tipoDocumento' , class:'purple darken-3 white--text',width:'5%'},
        { text: 'Número Doc', value: 'numDocumento', class:'purple darken-3 white--text' },
        { text: 'Nombre', value: 'nombre', class:'purple darken-3 white--text' },
        { text: 'Dirección', value: 'direccion' , class:'purple darken-3 white--text'},
        { text: 'Ciudad', value: 'ciudad' , class:'purple darken-3 white--text'},
        { text: 'Telefono', value: 'telefono', class:'purple darken-3 white--text',width:'10%' ,sortable: false },
        { text: 'Email', value: 'email', class:'purple darken-3 white--text' },
        { text: 'Estado', value: 'estado', class:'purple darken-3 white--text' },
        { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'10%',sortable: false }
      ],
      personas: [
      ],
      editedItem: {
        tipoPersona:'', nombre:'', tipoDocumento:'', numDocumento:'',
        direccion:'', estado:'', telefono:'',  email:''
      }
    }),//data
    created(){
    },
    methods: {
      //msg alerta
      msjcompra:function(tata){
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: tata,
          showConfirmButton: false,
          //5000 son 5 seg
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

      //traer proveedores
      obtenerPersonas(){
        let caracteresClientes = this.buscarClienteLetras.trim();
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get(`persona/proveedores?value=${caracteresClientes}`,header)
          .then(response =>{
            console.log(response.data);
            this.personas = response.data.persona
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
      },//obtenerPersonas

      //limpiar formulario
      reset(){
        this.editedItem.tipoPersona=''
        this.editedItem.tipoDocumento=''
        this.editedItem.nombre=''
        this.editedItem.numDocumento=''
        this.editedItem.direccion=''
        this.editedItem.ciudad=''
        this.editedItem.telefono=''
        this.editedItem.email=''
      },//reset

      //alistar variables para enviar 
      editar(item){
        console.log(item);
        this.id= item._id;
        this.editedItem.tipoDocumento=item.tipoDocumento
        this.editedItem.numDocumento=item.numDocumento
        this.editedItem.nombre=item.nombre
        this.editedItem.direccion=item.direccion
        this.editedItem.ciudad=item.ciudad
        this.editedItem.telefono=item.telefono
        this.editedItem.email=item.email
        this.dialog2=true;
      },//editar
      
      //almacenar
      guardar(){
        console.log('estoy guardando'+this.bd+'ALMACENAR');
        let header = {headers:{"token" : this.$store.state.token}};
        const me = this;

        if(this.editedItem.tipoDocumento.trim()==='' || this.editedItem.numDocumento.trim()==='' || this.editedItem.nombre.trim()==='' ){
          this.msjcompra('(*) Son campos obligatorios');
        }else if(this.editedItem.tipoDocumento.length>3 || this.editedItem.numDocumento.length>30 || this.editedItem.nombre.length>70 ||
                this.editedItem.direccion.length>70 || this.editedItem.ciudad.length>70 || this.editedItem.telefono.length>70 || 
                this.editedItem.email.length>70 ){
          this.msjcompra('Supero el número de carácteres permintidos en un campo');

        }else if(this.editedItem.tipoDocumento.trim().toLowerCase()!='cc' && this.editedItem.tipoDocumento.trim().toLowerCase()!='nit'){
          this.msjcompra('Tipo de documento invalido: cc o nit');
        }else{

          axios.post('persona',{
            tipoPersona:'proveedor',  
            tipoDocumento:this.editedItem.tipoDocumento,
            numDocumento:this.editedItem.numDocumento,
            nombre:this.editedItem.nombre,
            direccion:this.editedItem.direccion,
            ciudad:this.editedItem.ciudad,
            telefono:this.editedItem.telefono,
            email:this.editedItem.email,
            },
            header)
              .then((response)=>{
                console.log(response);
                me.obtenerPersonas(),
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
        }
      },//guardar

      activarDesactivarItem (accion , item) {
        let id = item._id;
        console.log(accion);
        if(accion == 2){
          console.log(id);
          let me = this
          let header = {headers:{"token" : this.$store.state.token}};
          axios.put(`persona/desactivar/${id}`,{}, header)
          .then((response)=>{
            console.log(response);
            me.obtenerPersonas();
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
          axios.put(`persona/activar/${id}`,  {},header)
          .then((response)=>{
            console.log(response);
            me.obtenerPersonas();
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

      actualizarTipodoc(tipoDocumento){
        console.log(tipoDocumento);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(tipoDocumento.trim()===''){
          this.msjcompra('Tipo de documento vacio');
        }else if(tipoDocumento.trim().toLowerCase()!='cc' && tipoDocumento.trim().toLowerCase()!='nit'){
          this.msjcompra('Solo se permite cc o nit');
        }else{
          axios.put(`persona/actualizarTipoDoc/${id}`,{tipoDocumento}, header)
            .then((response)=>{
              console.log(response);
              this.msgError=response.data.msg;
              this.msjAlertaBien(this.msgError);
              me.obtenerPersonas();
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
      },//actualizarTipodoc
      
      actualizarNumdoc(numDocumento){
        console.log(numDocumento);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(numDocumento.trim()==''){
          this.msjcompra('Numero de documento obligatorio');
        }else if(numDocumento.trim().length>30){
          this.msjcompra('Numero de documento demasiado largo');
        }else{
          axios.put(`persona/actualizarNumDoc/${id}`,{numDocumento}, header)
            .then((response)=>{
              console.log(response);
              this.msgError=response.data.msg;
              this.msjAlertaBien(this.msgError);
              me.obtenerPersonas();
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
      },//actualizarNumodoc

      actualizarNombre(nombre){
        console.log(nombre);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(nombre.trim()===''){
          this.msjcompra('Nombre obligatorio');
        }else if(nombre.length>70){
          this.msjcompra('Nombre demasiado largo');
        }else{
          axios.put(`persona/actualizarNombre/${id}`,{nombre}, header)
            .then((response)=>{
              console.log(response);
              this.msgError=response.data.msg;
              this.msjAlertaBien(this.msgError);
              me.obtenerPersonas();
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
      },//actualizarNombre
      
      actualizarDireccion(direccion){
        console.log(direccion);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(direccion.trim()===''){
          this.msjcompra('Dirección obligatorio');
        }else if(direccion.length>70){
          this.msjcompra('Dirección demasiada larga');
        }else{
          axios.put(`persona/actualizarDireccion/${id}`,{direccion}, header)
            .then((response)=>{
              console.log(response);
              this.msgError=response.data.msg;
              this.msjAlertaBien(this.msgError);
              me.obtenerPersonas();
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
      },//actualizarDireccion

      actualizarCiudad(ciudad){
        console.log(ciudad);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(ciudad.trim()===''){
          this.msjcompra('Ciudad obligatorio');
        }else if(ciudad.length>70){
          this.msjcompra('Ciudad demasiada larga');
        }else{
          axios.put(`persona/actualizarCiudad/${id}`,{ciudad}, header)
            .then((response)=>{
              console.log(response);
              this.msgError=response.data.msg;
              this.msjAlertaBien(this.msgError);
              me.obtenerPersonas();
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
      },//actualizarCiudad

      actualizarTelefono(telefono){
        console.log(telefono);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(telefono.trim()===''){
          this.msjcompra('Telefono obligatorio');
        }else if(telefono.length>70){
          this.msjcompra('Telefono demasiada larga');
        }else{
          axios.put(`persona/actualizarTelefono/${id}`,{telefono}, header)
            .then((response)=>{
              console.log(response);
              this.msgError=response.data.msg;
              this.msjAlertaBien(this.msgError);
              me.obtenerPersonas();
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
      },//actualizarTelefono
     
      actualizarEmail(email){
        console.log(email);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(email.trim()===''){
          this.msjcompra('Email obligatorio');
        }else if(email.length>70){
          this.msjcompra('Email demasiada larga');
        }else{
          axios.put(`persona/actualizarEmail/${id}`,{email}, header)
            .then((response)=>{
              console.log(response);
              this.msgError=response.data.msg;
              this.msjAlertaBien(this.msgError);
              me.obtenerPersonas();
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
      },//actualizarDireccion
    },//methots
  }//export default
</script>
