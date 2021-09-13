<template>
  <div v-if="this.$store.state.token != ''" >
  <v-app>
    <v-container fluid>
      <template   v-if="muestra == 1">
        <v-data-table  class=" elevation-15 " :headers="columnas" :items="personas" :search="search">
          <template v-slot:top>
            <!--parte arriba tabla-->
            <v-toolbar flat  >
              <v-toolbar-title>Usuarios</v-toolbar-title>
              
              <!--buscar-->
              <v-spacer></v-spacer>
              <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar usuario por rol, usuario y nombre"  single-line hide-details></v-text-field>
              <v-divider  class="mx-4" inset  vertical ></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="80%"  >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn  depressed dark  class="mb-2 purple darken-3 white--text"  v-bind="attrs"  v-on="on" @click="reset()"  >  Nuevo </v-btn>
                </template>
                <!--formulario-->

                <v-card >
                <v-card-title><span class="text-h5">Usuario</span></v-card-title>
                  <v-card-text>
                    <v-form>

                      <v-row>
                        <v-col><v-text-field  v-model="editedItem.rol"         :rules="rulesRol"       label="Rol*"        required ></v-text-field></v-col>
                        <v-col><v-text-field  v-model="editedItem.nombreUser"  :rules="rulesNombre"    label="Usuario*"     required :counter="50"></v-text-field></v-col>
                        <v-col><v-text-field  v-model="editedItem.password"    :rules="rulesPassword"  label="Contraseña*" required  :counter="10"></v-text-field></v-col>
                      </v-row>

                      <v-row>
                        <v-col><v-text-field  v-model="editedItem.nombre"      :rules="rulesNombrePila"       label="Nombre*"        required :counter="100"></v-text-field></v-col>
                        <v-col><v-text-field  v-model="editedItem.cedula"      :rules="rulesCedula"       label="Cedula*"        required :counter="100"></v-text-field></v-col>
                      </v-row>

                      <v-row>
                        <v-col><v-text-field  v-model="editedItem.telefono"    :rules="rulesOtros"       label="Telefono"  :counter="100"></v-text-field></v-col>
                        <v-col><v-text-field  v-model="editedItem.direccion"   :rules="rulesOtros"       label="Direccion"  :counter="100"></v-text-field></v-col>
                      </v-row>

                      <v-row>
                        <v-col><v-text-field  v-model="editedItem.tipoCuenta"  :rules="rulesOtros"       label="Tipo de cuenta"  :counter="100"></v-text-field></v-col>
                        <v-col><v-text-field  v-model="editedItem.numCuenta"   :rules="rulesOtros"       label="Numero de cuenta" :counter="100"></v-text-field></v-col>
                      </v-row>
                      
                      <v-row>
                        <v-col><v-text-field  v-model="editedItem.banco"       :rules="rulesOtros"       label="Banco" :counter="100" ></v-text-field></v-col>
                      </v-row>

                      <v-row>
                        <v-col><v-text-field  v-model="editedItem.numContrato" :rules="rulesOtros"       label="Numero de contrato" :counter="100" ></v-text-field></v-col>
                      </v-row>
                  
                      <v-btn color="blue darken-1" text class="mr-4"  @click="guardar"  > Guardar </v-btn>
                      <v-btn color="blue darken-1" text class="mr-4"  @click="reset">  Limpiar </v-btn>
                      <v-btn color="red darken-1" text class="mr-4" @click="dialog=false"> Cancelar </v-btn>
                    </v-form >
                  </v-card-text>    
                </v-card>

              </v-dialog>

              <!--
              <v-dialog v-model="dialog2" max-width="80%" >
                <v-card >
                <v-card-title><span class="text-h5">Editar usuario</span></v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-row>
                        <v-text-field  v-model="editedItem.nombreUser"   :rules="rulesNombre"    label="Usuario*"     required :counter="50"></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarNombreUser(editedItem.nombreUser)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="password" :rules="rulesPassword"  label="Contraseña*" required  :counter="10"></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarPassword(password)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.nombre" :rules="rulesNombrePila"  label="Nombre*" required  :counter="100"></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarNombre(editedItem.nombre)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.cedula" :rules="rulesCedula"  label="Cedula*" required  :counter="100"></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarCedula(editedItem.cedula)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.telefono" :rules="rulesOtros"  label="Telefono"   :counter="100"></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarTelefono(editedItem.telefono)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.direccion" :rules="rulesOtros"  label="Direccion"   :counter="100"></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarDireccion(editedItem.direccion)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.numCuenta" :rules="rulesOtros"  label="Numero de cuenta"   :counter="100"></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarNumCuenta(editedItem.numCuenta)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.tipoCuenta" :rules="rulesOtros"  label="Tipo de cuenta"   :counter="100"></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarTipoCuenta(editedItem.tipoCuenta)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.banco" :rules="rulesOtros"  label="Banco" required  :counter="100"></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarBanco(editedItem.banco)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>

                      <v-row>
                        <v-text-field  v-model="editedItem.numContrato" :rules="rulesOtros"  label="Numero de contrato" required  :counter="100"></v-text-field>
                        <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarNumContrato(editedItem.numContrato)"><v-icon>mdi-reload</v-icon>  </v-btn>
                      </v-row>
                      
                      <v-btn color="red darken-1" text class="mr-4" @click="dialog2=false"> Cancelar </v-btn>
                    </v-form >
                  </v-card-text>    
                </v-card>

              </v-dialog>
              -->


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
            <!--<v-icon  small  class="mr-2"  @click="editar(item)" >  mdi-pencil </v-icon>-->
            <v-icon  small  class="mr-2"  @click="cambioPage(2,item)" >mdi-file-search-outline</v-icon>
            <template v-if="item._id != $store.state.id">
                <template v-if="item.estado">
                <v-icon  small class="mr-2" @click="activarDesactivarItem(2,item)" > mdi-check </v-icon>
                </template>
                <template v-else>
                <v-icon  small  @click="activarDesactivarItem(1,item)" >  mdi-block-helper </v-icon>
                </template>
            </template>

          </template>

        </v-data-table>
      </template>
        
      <template   v-if="muestra == 2">

      
        <div class="overflow-hidden mt-n9 transition-swing v-card--material__sheet v-sheet theme--light elevation-6 rounded primary" style="max-width: 100%;">
          
          <div class="pa-8">
            <i aria-hidden="true" class="v-icon notranslate mdi mdi-account-outline theme--dark" style="font-size: 36px;"></i>
          </div>

        </div>


        <v-row> 
          <v-btn  style="margin-top:30px; margin-left:100px" @click="cambioPage(1,false)"  class="mb-2 purple darken-3 white--text" >Volver</v-btn>
        </v-row>
        
       
          <v-card style="margin-top:30px; margin-left:100px; box-shadow: 7px 13px 37px #52515198;"  max-width="70%">
          <v-card-title><span class="text-h5">Editar usuario</span></v-card-title>
            <v-card-text>
              <v-form>
                <v-row>
                  <v-text-field  v-model="editedItem.nombreUser"   :rules="rulesNombre"    label="Usuario*"     required :counter="50"></v-text-field>
                  <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarNombreUser(editedItem.nombreUser)"><v-icon>mdi-reload</v-icon>  </v-btn>
                </v-row>

                <v-row>
                  <v-text-field  v-model="password" :rules="rulesPassword"  label="Contraseña*" required  :counter="10"></v-text-field>
                  <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarPassword(password)"><v-icon>mdi-reload</v-icon>  </v-btn>
                </v-row>

                <v-row>
                  <v-text-field  v-model="editedItem.nombre" :rules="rulesNombrePila"  label="Nombre*" required  :counter="100"></v-text-field>
                  <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarNombre(editedItem.nombre)"><v-icon>mdi-reload</v-icon>  </v-btn>
                </v-row>

                <v-row>
                  <v-text-field  v-model="editedItem.cedula" :rules="rulesCedula"  label="Cedula*" required  :counter="100"></v-text-field>
                  <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarCedula(editedItem.cedula)"><v-icon>mdi-reload</v-icon>  </v-btn>
                </v-row>

                <v-row>
                  <v-text-field  v-model="editedItem.telefono" :rules="rulesOtros"  label="Telefono"   :counter="100"></v-text-field>
                  <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarTelefono(editedItem.telefono)"><v-icon>mdi-reload</v-icon>  </v-btn>
                </v-row>

                <v-row>
                  <v-text-field  v-model="editedItem.direccion" :rules="rulesOtros"  label="Direccion"   :counter="100"></v-text-field>
                  <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarDireccion(editedItem.direccion)"><v-icon>mdi-reload</v-icon>  </v-btn>
                </v-row>

                <v-row>
                  <v-text-field  v-model="editedItem.numCuenta" :rules="rulesOtros"  label="Numero de cuenta"   :counter="100"></v-text-field>
                  <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarNumCuenta(editedItem.numCuenta)"><v-icon>mdi-reload</v-icon>  </v-btn>
                </v-row>

                <v-row>
                  <v-text-field  v-model="editedItem.tipoCuenta" :rules="rulesOtros"  label="Tipo de cuenta"   :counter="100"></v-text-field>
                  <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarTipoCuenta(editedItem.tipoCuenta)"><v-icon>mdi-reload</v-icon>  </v-btn>
                </v-row>

                <v-row>
                  <v-text-field  v-model="editedItem.banco" :rules="rulesOtros"  label="Banco" required  :counter="100"></v-text-field>
                  <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarBanco(editedItem.banco)"><v-icon>mdi-reload</v-icon>  </v-btn>
                </v-row>

                <v-row>
                  <v-text-field  v-model="editedItem.numContrato" :rules="rulesOtros"  label="Numero de contrato" required  :counter="100"></v-text-field>
                  <v-btn class="botones" style="margin-top:25px" icon color="#72128E" @click="actualizarNumContrato(editedItem.numContrato)"><v-icon>mdi-reload</v-icon>  </v-btn>
                </v-row>
                
              </v-form >
            </v-card-text>    
          </v-card>
        
        
        
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
      search: '',
      dialog: false,
      dialog2: false,
      password:'',
      rulesNombre: [
        value => !!value || 'Required.',
        value => (value && value.length <= 50) || 'Max 50 caracteres',
      ],
      
      rulesPassword: [
        value=>!!value||'Requerido',
        value => (value && value.length <= 10) || 'Max 10 caracteres' 
      ],
      rulesRol: [
        value=>!!value||'Requerido',
        value => (value && value == 'administrador' || value == 'vendedor') || 'administrador o vendedor' 
      ],
      rulesNombrePila:[
        value=>!!value||'Requerido',
        value => (value && value.length <= 100) || 'Max 100 caracteres' 
      ],
      rulesCedula:[
        value=>!!value||'Requerido',
        value => (value && value.length <= 100) || 'Max 100 caracteres' 
      ],
      rulesOtros:[
        value => (value.length <= 100) || 'Max 100 caracteres' 
      ],

      columnas: [
        { text: 'Rol', value: 'rol' , class:'purple darken-3 white--text'},
        { text: 'Usuario', value: 'nombreUser', class:'purple darken-3 white--text' },
        { text: 'Nombre', value: 'nombre', class:'purple darken-3 white--text' },
        { text: 'Estado', value: 'estado', class:'purple darken-3 white--text' },
        { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'10%',sortable: false }
      ],
      personas: [],
      editedItem: {nombreUser:'',password:'',rol:'',nombre:'',cedula:'',telefono:'',direccion:'',numCuenta:'',tipoCuenta:'',banco:'',numContrato:''},
      usuarioDetalles:{}
    }),//data
    created(){
      this.obtenerPersonas();
    },
    methods: {

      cambioPage(num,item){
        console.log(num,item);
        if(num==1){
          this.muestra=1
        }else{
          this.muestra=2
          this.editarDetalle(item)
        }
      },

      //msg alerta
      msjcompra:function(tata){
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

      //traer proveedores
      obtenerPersonas(){
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get("usuario",header)
          .then(response =>{
            console.log(response.data);
            this.personas = response.data.usuario
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
        this.editedItem.nombreUser=''
        this.editedItem.password=''
        this.editedItem.rol=''
        this.editedItem.nombre=''
        this.editedItem.cedula=''
        this.editedItem.telefono=''
        this.editedItem.direccion=''
        this.editedItem.numCuenta=''
        this.editedItem.tipoCuenta=''
        this.editedItem.banco=''
        this.editedItem.numContrato=''
      },//reset

      //alistar variables para enviar 
      editar(item){
        console.log(item);
        this.id= item._id;
        this.editedItem.nombreUser=item.nombreUser;
        this.editedItem.password=item.password
        this.editedItem.rol=item.rol
        this.editedItem.nombre=item.nombre
        this.editedItem.cedula=item.cedula
        this.editedItem.telefono=item.telefono
        this.editedItem.direccion=item.direccion
        this.editedItem.numCuenta=item.numCuenta
        this.editedItem.tipoCuenta=item.tipoCuenta
        this.editedItem.banco=item.banco
        this.editedItem.numContrato=item.numContrato
        this.dialog2=true;
      },//editar

      //alistar variables para enviar 
      editarDetalle(item){
        console.log(item);
        this.id= item._id;
        this.editedItem.nombreUser=item.nombreUser;
        this.editedItem.password=item.password
        this.editedItem.rol=item.rol
        this.editedItem.nombre=item.nombre
        this.editedItem.cedula=item.cedula
        this.editedItem.telefono=item.telefono
        this.editedItem.direccion=item.direccion
        this.editedItem.numCuenta=item.numCuenta
        this.editedItem.tipoCuenta=item.tipoCuenta
        this.editedItem.banco=item.banco
        this.editedItem.numContrato=item.numContrato
      },//editar

      
      //almacenar
      guardar(){
        console.log('estoy guardando'+this.bd+'ALMACENAR');
        let header = {headers:{"token" : this.$store.state.token}};
        const me = this;
        if(this.editedItem.rol.trim()==='' || this.editedItem.nombreUser.trim() === '' || 
           this.editedItem.nombre.trim()==='' || this.editedItem.cedula.trim()==='' ||this.editedItem.password.trim()===''){
          this.msjcompra('(*) Son campos obligatorios');

        }else if(this.editedItem.rol.trim().toLowerCase()!='administrador' &&  this.editedItem.rol.trim().toLowerCase()!='vendedor'){
          this.msjcompra('Roles: administrador o vendedor');

        }else if( this.editedItem.nombreUser.length>50 || this.editedItem.nombre.length>100 ||
                  this.editedItem.cedula.length>100 || this.editedItem.password.length>10 ||
                  this.editedItem.telefono.length>100  || this.editedItem.direccion.length>100 ||
                  this.editedItem.tipoCuenta.length>100 || this.editedItem.numCuenta.length>100 ||
                  this.editedItem.banco.length>100  ||  this.editedItem.numContrato.length>100){
          this.msjcompra('Supero el número de carácteres permintidos en un campo');

        }else{
          axios.post('usuario',{
            password:this.editedItem.password,
            rol:this.editedItem.rol,
            nombreUser:this.editedItem.nombreUser,
            nombre:this.editedItem.nombre,
            cedula:this.editedItem.cedula,
            telefono:this.editedItem.telefono,
            direccion:this.editedItem.direccion,
            tipoCuenta:this.editedItem.tipoCuenta,
            numCuenta:this.editedItem.numCuenta,
            banco:this.editedItem.banco,
            numContrato:this.editedItem.numContrato,
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
          axios.put(`usuario/desactivar/${id}`,{}, header)
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
          axios.put(`usuario/activar/${id}`,  {},header)
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

      actualizarNombreUser(nombreUser){
        console.log(nombreUser);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(nombreUser.trim()===''){
          this.msjcompra('Nombre de usuario olbigatorio');
        }else if (nombreUser.length>50){
          this.msjcompra('Nombre de usuario mayor a 50 carácteres');
        }else{
          axios.put(`usuario/actualizarNombreUser/${id}`,{nombreUser}, header)
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

      actualizarPassword(password){
        console.log(password);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(password.trim()===''){
          this.msjcompra('Contraseña olbigatoria');
        }else if (password.length>10){
          this.msjcompra('Contraseña mayor a 10 carácteres');
        }else{
          axios.put(`usuario/actualizarPass/${id}`,{password}, header)
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
      },//actualizarPassword

      actualizarNombre(nombre){
        console.log(nombre);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(nombre.trim()===''){
          this.msjcompra('Nombre olbigatorio');
        }else if (nombre.length>100){
          this.msjcompra('Nombre mayor a 100 carácteres');
        }else{
          axios.put(`usuario/actualizarNombrePila/${id}`,{nombre}, header)
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

      actualizarCedula(cedula){
        console.log(cedula);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(cedula.trim()===''){
          this.msjcompra('Cedula olbigatorio');
        }else if (cedula.length>100){
          this.msjcompra('Cedula mayor a 100 carácteres');
        }else{
          axios.put(`usuario/actualizarCedula/${id}`,{cedula}, header)
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
      },//actualizarCedula

      actualizarTelefono(telefono){
        console.log(telefono);
        console.log(this.id);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(telefono.trim()===''){
          this.msjcompra('Telefono olbigatorio');
        }else if (telefono.length>100){
          this.msjcompra('Telefono mayor a 100 carácteres');
        }else{
          axios.put(`usuario/actualizarTelefono/${id}`,{telefono}, header)
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
      },//actualizar telefono

      actualizarDireccion(direccion){
        console.log(direccion);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(direccion.trim()===''){
          this.msjcompra('Dirección olbigatoria');
        }else if (direccion.length>100){
          this.msjcompra('Dirección mayor a 100 carácteres');
        }else{
          axios.put(`usuario/actualizarDireccion/${id}`,{direccion}, header)
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

      actualizarNumCuenta(numCuenta){
        console.log(numCuenta);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(numCuenta.trim()===''){
          this.msjcompra('Numero de cuenta olbigatori');
        }else if (numCuenta.length>100){
          this.msjcompra('Numero de cuenta mayor a 100 carácteres');
        }else{
          axios.put(`usuario/actualizarNumcuenta/${id}`,{numCuenta}, header)
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
      },//actualizarNumCuenta

      actualizarTipoCuenta(tipoCuenta){
        console.log(tipoCuenta);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(tipoCuenta.trim()===''){
          this.msjcompra('Tipo de cuenta olbigatori');
        }else if (tipoCuenta.length>100){
          this.msjcompra('Tipo de cuenta mayor a 100 carácteres');
        }else{
          axios.put(`usuario/actualizarTypecuenta/${id}`,{tipoCuenta}, header)
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
      },//actualizarTipoCuenta

      actualizarBanco(banco){
        console.log(banco);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(banco.trim()===''){
          this.msjcompra('Banco olbigatori');
        }else if (banco.length>100){
          this.msjcompra('Banco mayor a 100 carácteres');
        }else{
          axios.put(`usuario/actualizarBanco/${id}`,{banco}, header)
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
      },//actualizarBanco

      actualizarNumContrato(numContrato){
        console.log(numContrato);
        let id=this.id;
        let me = this
        let header = {headers:{"token" : this.$store.state.token}};
        if(numContrato.trim()===''){
          this.msjcompra('Contrato olbigatori');
        }else if (numContrato.length>100){
          this.msjcompra('Contrato mayor a 100 carácteres');
        }else{
          axios.put(`usuario/actualizarContrato/${id}`,{numContrato}, header)
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
      },//actualizarNumContrato

    },//methots
  }//export default
</script>
