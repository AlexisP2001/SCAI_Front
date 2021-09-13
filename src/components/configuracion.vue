<template>
  <div>
    <v-row>

      <v-col>
        <v-card style="margin-top:60px; width:100%; ">
         <img src="../assets/logoStore.jpg" style="margin-left:10px; margin-top:10px" alt="" contain  height="90%" width="90%">
         </v-card>
      </v-col>

      <v-col>
        <v-card style="margin-top:60px; width:90%;">

          <div class="form-group row texto" >
            <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-store</v-icon> Nombre:</label>
            <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.nameStore"  >
            <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarNameStore()"><v-icon>mdi-reload</v-icon>  </v-btn>
          </div>

          <div class="form-group row texto" >
            <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-card-bulleted</v-icon>    Nit:</label>
            <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.nit"  >
            <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarNit()"><v-icon>mdi-reload</v-icon>  </v-btn>
          </div>

          <div class="form-group row texto" >
            <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-file-multiple-outline</v-icon> Regimen:</label>
            <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.regimen"  >
            <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarRegimen()"><v-icon>mdi-reload</v-icon>  </v-btn>
          </div>
          <div class="form-group row texto" >
            <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-account</v-icon> Reprecentatne Camara comercio:</label>
            <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.representanteCC"  >
            <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarRepresenante()"><v-icon>mdi-reload</v-icon>  </v-btn>
          </div>
          <div class="form-group row texto" >
            <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-earth</v-icon> Departamento:</label>
            <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.departamento"  >
            <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarDepartamento()"><v-icon>mdi-reload</v-icon>  </v-btn>
          </div>
          <div class="form-group row texto" >
            <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-map-legend</v-icon> Ciudad:</label>
            <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.ciudad"  >
            <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarCiudad()"><v-icon>mdi-reload</v-icon>  </v-btn>
          </div>
          <div class="form-group row texto" >
            <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-map-marker</v-icon> Direccion:</label>
            <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.direccion"  >
            <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarDireccion()"><v-icon>mdi-reload</v-icon>  </v-btn>
          </div>
          <div class="form-group row texto" >
            <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-whatsapp</v-icon> Celular:</label>
            <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.celular"  >
            <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarCelular()"><v-icon>mdi-reload</v-icon>  </v-btn>
          </div>
          <div class="form-group row texto" >
            <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-phone-hangup-outline</v-icon> Telefono:</label>
            <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.telefono"  >
            <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarTelefono()"><v-icon>mdi-reload</v-icon>  </v-btn>
          </div>
          <div class="form-group row texto" >
            <label  class="col-sm-4 col-form-label" style="margin-left:10px" ><v-icon>mdi-email</v-icon> Email:</label>
            <input type="text" class="form-control col-sm-6 llenarTexto" v-model="datosAlmacen.email"  >
            <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="actualizarEmail()"><v-icon>mdi-reload</v-icon>  </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>


        
        

    
  </div>
</template>
<script>
  import axios from 'axios'
  import Swal from 'sweetalert2'
  export default {
    data:()=>({
      idSetting : '',
      datosAlmacen:{
        nameStore:'',
        nit:'',
        regimen:'',
        representanteCC:'',
        departamento:'',
        ciudad:'',
        direccion:'',
        celular:'',
        telefono:'',
        email:''
      },   
    }),//data

    created(){
      this.traerDatos();
    },

    methods:{

        //msg alerta
        msjcompra:function(tata){
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: tata,
            showConfirmButton: false,
            //5000 son 5 seg
            timer: 3000})
        },//msjcompra

        msjAlertaBien:function(tata){
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: tata,
            showConfirmButton: false,
            timer: 2000})
        },

        traerDatos(){
          let header = {headers:{"token" : this.$store.state.token}};
          axios.get(`setting`,header)
            .then(response =>{
              console.log(response.data);
              this.datosAlmacen = response.data.configuraciones
              this.idSetting = response.data.configuraciones._id
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

        //actualzar nombre del almacen
        actualizarNameStore(){
          console.log(this.idSetting);
           let header = {headers:{"token" : this.$store.state.token}};
           if(this.datosAlmacen.nameStore.trim()===''){
             this.msjcompra('Nombre obligatorio');
           }else if(this.datosAlmacen.nameStore.legend>100){
             this.msjcompra('Nombre mayor a 100 carácteres');
           }else{
              axios.put(`setting/nameStore/${this.idSetting}`,{ nameStore:this.datosAlmacen.nameStore}, header )
              .then((response)=>{
                console.log(response);
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
                this.traerDatos();
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
        },//actualizarNameStore

        //actualzar nit del almacen
        actualizarNit(){
          console.log(this.idSetting);
           let header = {headers:{"token" : this.$store.state.token}};
           if(this.datosAlmacen.nit.trim()===''){
             this.msjcompra('Nit obligatorio');
           }else if(this.datosAlmacen.nit.legend>100){
             this.msjcompra('Nit mayor a 100 carácteres');
           }else{
              axios.put(`setting/nit/${this.idSetting}`,{ nit:this.datosAlmacen.nit}, header )
              .then((response)=>{
                console.log(response);
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
                this.traerDatos();
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
        },//actualizarNit

        //actualzar regimen del almacen
        actualizarRegimen(){
          console.log(this.idSetting);
           let header = {headers:{"token" : this.$store.state.token}};
           if(this.datosAlmacen.regimen.trim()===''){
             this.msjcompra('Regimen obligatorio');
           }else if(this.datosAlmacen.regimen.legend>100){
             this.msjcompra('Regimen mayor a 100 carácteres');
           }else{
              axios.put(`setting/regimen/${this.idSetting}`,{ regimen:this.datosAlmacen.regimen}, header )
              .then((response)=>{
                console.log(response);
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
                this.traerDatos();
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
        },//actualizarRegimen

        //actualzar representante del almacen
        actualizarRepresenante(){
          console.log(this.idSetting);
           let header = {headers:{"token" : this.$store.state.token}};
           if(this.datosAlmacen.representanteCC.trim()===''){
             this.msjcompra('Representante obligatorio');
           }else if(this.datosAlmacen.representanteCC.legend>100){
             this.msjcompra('Representante mayor a 100 carácteres');
           }else{
              axios.put(`setting/representanteCC/${this.idSetting}`,{ representanteCC:this.datosAlmacen.representanteCC}, header )
              .then((response)=>{
                console.log(response);
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
                this.traerDatos();
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
        },//actualizarRepresenante

        //actualzar departameno del almacen
        actualizarDepartamento(){
          console.log(this.idSetting);
           let header = {headers:{"token" : this.$store.state.token}};
           if(this.datosAlmacen.departamento.trim()===''){
             this.msjcompra('Departamento obligatorio');
           }else if(this.datosAlmacen.departamento.legend>100){
             this.msjcompra('Departamento mayor a 100 carácteres');
           }else{
              axios.put(`setting/departamento/${this.idSetting}`,{ departamento:this.datosAlmacen.departamento}, header )
              .then((response)=>{
                console.log(response);
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
                this.traerDatos();
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
        },//actualizarDepartamento

        //actualzar ciudad del almacen
        actualizarCiudad(){
          console.log(this.idSetting);
           let header = {headers:{"token" : this.$store.state.token}};
           if(this.datosAlmacen.ciudad.trim()===''){
             this.msjcompra('Ciudad obligatorio');
           }else if(this.datosAlmacen.ciudad.legend>100){
             this.msjcompra('Ciudad mayor a 100 carácteres');
           }else{
              axios.put(`setting/ciudad/${this.idSetting}`,{ ciudad:this.datosAlmacen.ciudad}, header )
              .then((response)=>{
                console.log(response);
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
                this.traerDatos();
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
        },//actualizarCiudad

        //actualzar direccion del almacen
        actualizarDireccion(){
          console.log(this.idSetting);
           let header = {headers:{"token" : this.$store.state.token}};
           if(this.datosAlmacen.direccion.trim()===''){
             this.msjcompra('Direccion obligatorio');
           }else if(this.datosAlmacen.direccion.legend>100){
             this.msjcompra('Direccion mayor a 100 carácteres');
           }else{
              axios.put(`setting/direccion/${this.idSetting}`,{ direccion:this.datosAlmacen.direccion}, header )
              .then((response)=>{
                console.log(response);
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
                this.traerDatos();
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
        },//actualizarDireccion

        //actualzar celular del almacen
        actualizarCelular(){
          console.log(this.idSetting);
           let header = {headers:{"token" : this.$store.state.token}};
           if(this.datosAlmacen.celular.trim()===''){
             this.msjcompra('Celular obligatorio');
           }else if(this.datosAlmacen.celular.legend>100){
             this.msjcompra('Celular mayor a 100 carácteres');
           }else{
              axios.put(`setting/celular/${this.idSetting}`,{ celular:this.datosAlmacen.celular}, header )
              .then((response)=>{
                console.log(response);
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
                this.traerDatos();
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
        },//actualizarCelular

        //actualzar telefono del almacen
        actualizarTelefono(){
          console.log(this.idSetting);
           let header = {headers:{"token" : this.$store.state.token}};
           if(this.datosAlmacen.telefono.trim()===''){
             this.msjcompra('Telefono obligatorio');
           }else if(this.datosAlmacen.telefono.legend>100){
             this.msjcompra('Telefono mayor a 100 carácteres');
           }else{
              axios.put(`setting/telefono/${this.idSetting}`,{ telefono:this.datosAlmacen.telefono}, header )
              .then((response)=>{
                console.log(response);
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
                this.traerDatos();
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
        },//actualizarTelefono

        //actualzar email del almacen
        actualizarEmail(){
          console.log(this.idSetting);
           let header = {headers:{"token" : this.$store.state.token}};
           if(this.datosAlmacen.email.trim()===''){
             this.msjcompra('Email obligatorio');
           }else if(this.datosAlmacen.email.legend>100){
             this.msjcompra('Email mayor a 100 carácteres');
           }else{
              axios.put(`setting/email/${this.idSetting}`,{ email:this.datosAlmacen.email}, header )
              .then((response)=>{
                console.log(response);
                this.msgError=response.data.msg;
                this.msjAlertaBien(this.msgError);
                this.traerDatos();
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
        },//actualizarEmail

        
    }//metodos
  }//export defauld
</script>

<style scoped>
    .logoStoreCss{
       
    }
    .texto{
        font-family: 'calibri';
        color: #00000;
        font-size: 22px;
        text-align:left;
    }
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