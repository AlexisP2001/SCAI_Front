<template>
    <!--<div v-if="this.$store.state.token != ''" >-->
    <div>
        <v-app>
           
            <v-card style="margin-top:60px; margin-left:40px; width:90%; ">
                
                <v-row>
                    <v-col>
                        <div class="form-group row texto" style="margin-top:10px;margin-left:0px">
                            <label  class="col-sm-4 col-form-label">No. factura:</label>
                            <label  class="col-sm-2 col-form-label">{{numFactura}}</label>
                        </div>

                        <div class="form-group row texto" >
                            <label  class="col-sm-4 col-form-label" style="margin-left:10px" >Numero documento:</label>
                            <input type="text" class="form-control mb-3 llenarTexto" v-model="cliente.numDocumento"  placeholder="cc o nit">
                            <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="traerCliente()"><v-icon>mdi-account-search-outline</v-icon>  </v-btn>
                        </div>

                        <div class="form-group row texto">
                            <label  class="col-sm-4 col-form-label" style="margin-left:10px">Tipo documento:</label>
                            <input type="text" class="form-control mb-3 llenarTexto" v-model="cliente.tipoDocumento"  placeholder="cc o nit">
                        </div>

                        <div class="form-group row texto">
                            <label  class="col-sm-4 col-form-label" style="margin-left:10px">Nombre:</label>
                            <input type="text" class="form-control mb-3 llenarTexto" v-model="cliente.nombre"  placeholder="">
                            
                        </div>


                    </v-col>
                    <v-col>

                        <div class="form-group row texto" style="margin-top:10px">
                            <label  class="col-sm-3 col-form-label">Direccion:</label>
                            <input type="text" class="form-control mb-3 llenarTexto" v-model="cliente.direccion"  placeholder="">
                            
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-3 col-form-label">Ciudad:</label>
                            <input type="text" class="form-control mb-3 llenarTexto" v-model="cliente.ciudad"  placeholder="">
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-3 col-form-label">Telefono:</label>
                            <input type="text" class="form-control mb-4 llenarTexto" v-model="cliente.telefono"  placeholder="">
                            
                        </div>
                        <div class="form-group row texto">
                            <label  class="col-sm-3 col-form-label">Email:</label>
                            <input type="text" class="form-control mb-4 llenarTexto" v-model="cliente.email"  placeholder="">
                        </div>
                    </v-col>
                </v-row>

                <v-divider style="margin-top:10px;"></v-divider>


                <v-row>
                    <v-col>
                        <div style="font-family: 'calibri';  color: #00000;  font-size: 20px; text-align:left;  margin-left:30px; margin-top:50px;">
                            <div class="form-group row">
                                <label  class=" ">Forma de pago:</label>

                                <v-radio-group   v-model="formaPago[0]" style="margin-top:1px"  >
                                    <v-radio style="margin-left:15px; " label="Debito" color="#72128E"  value="debito"></v-radio> 
                                    <v-radio style="margin-left:15px; " label="Credito" color="#72128E"   value="credito"></v-radio>
                                    <v-radio style="margin-left:15px; " label="Venta" color="#72128E"   value="venta"></v-radio>
                                    <v-radio style="margin-left:15px; " label="Abono" color="#72128E"   value="abono"></v-radio>
                                </v-radio-group>

                                <v-radio-group v-if="formaPago[0]=='debito'" :value="formaPago[1]=''">  </v-radio-group> 
                                <v-radio-group v-if="formaPago[0]=='debito'" :value="formaPago[2]=''">  </v-radio-group> 
                                <v-radio-group  v-if="formaPago[0]=='credito'" :value="formaPago[2]=''"> </v-radio-group>
                                <v-radio-group  v-if="formaPago[0]=='venta' || formaPago[0]=='abono'"   :value="formaPago[1]=''"> </v-radio-group>

                                <v-radio-group v-if="formaPago[0]=='credito'" v-model="formaPago[1]" > 
                                    <v-radio style="margin-left:15px; margin-top:-15px; " label="Venta" color="#72128E" value="venta"></v-radio>
                                    <v-radio style="margin-left:15px; " label="Abono" color="#72128E" value="abono"></v-radio>
                                </v-radio-group>                 

                                <v-radio-group v-if="formaPago[0]=='venta' || formaPago[0]=='abono'" v-model="formaPago[2]"> 
                                    <v-radio style="margin-left:15px; margin-top:-15px; " label="Efectivo" color="#72128E" value="efectivo"></v-radio>
                                    <v-radio style="margin-left:15px; " label="Tarjeta" color="#72128E" value="tarjeta"></v-radio>
                                </v-radio-group> 
                                    
                            </div>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="form-group row" style="font-family: 'calibri';
                                color: #00000;
                                font-size: 20px;
                                text-align:left;
                                margin-left:0px;
                                margin-top:40px;
                                width:80%">
                            <v-textarea 
                                v-model="comentario" 
                                color="#72128E" 
                                outlined
                                :counter=200
                                label="Descripcion"
                            ></v-textarea>
                        </div>
                    </v-col>
                </v-row>
            
            </v-card>
<!--
             <v-card style="margin-top:60px; margin-left:40px; width:90%; height:550px">
                
                
                <div class="form-group row texto" style="margin-top:10px">
                    <label  class="col-sm-2 col-form-label">No. factura:</label>
                    <label  class="col-sm-2 col-form-label">{{numFactura}}</label>
                </div>

                <div class="form-group row texto">
                    <label  class="col-sm-2 col-form-label" >Numero documento:</label>
                    <input type="text" class="form-control mb-3 llenarTexto" v-model="cliente.numDocumento"  placeholder="cc o nit">
                    <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="traerCliente()"><v-icon>mdi-account-search-outline</v-icon>  </v-btn>
                </div>

                <div class="form-group row texto">
                    <label  class="col-sm-2 col-form-label">Tipo documento:</label>
                    <input type="text" class="form-control mb-3 llenarTexto" v-model="cliente.tipoDocumento"  placeholder="cc o nit">
                </div>

                <div class="form-group row texto">
                    <label  class="col-sm-2 col-form-label">Nombre:</label>
                    <input type="text" class="form-control mb-3 llenarTexto" v-model="cliente.nombre"  placeholder="">
                    
                </div>
                <div class="form-group row texto">
                    <label  class="col-sm-2 col-form-label">Direccion:</label>
                    <input type="text" class="form-control mb-3 llenarTexto" v-model="cliente.direccion"  placeholder="">
                    
                </div>
                <div class="form-group row texto">
                    <label  class="col-sm-2 col-form-label">Ciudad:</label>
                    <input type="text" class="form-control mb-3 llenarTexto" v-model="cliente.ciudad"  placeholder="">
                </div>
                <div class="form-group row texto">
                    <label  class="col-sm-2 col-form-label">Telefono:</label>
                    <input type="text" class="form-control mb-4 llenarTexto" v-model="cliente.telefono"  placeholder="">
                    
                </div>
                <div class="form-group row texto">
                    <label  class="col-sm-2 col-form-label">Email:</label>
                    <input type="text" class="form-control mb-4 llenarTexto" v-model="cliente.email"  placeholder="">
                </div>

                <div class="formaPagocss">
                    <div class="form-group row">
                        <label  class="col-sm-2 col-form-label">Forma de pago:</label>
                        
                        //<div class="col-sm-5"> 
                        //<v-autocomplete  class="FormaPagosccsTexto" v-model="formaPago"   :items="formasPagos" ></v-autocomplete>
                        //</div>
                        
                        <v-radio-group v-model="formaPago"> 
                            <v-radio label="Venta" color="#72128E" value="venta"></v-radio>
                            <v-radio label="Abono" color="#72128E" value="abono"></v-radio>
                            <v-radio label="Credito" color="#72128E" value="credito"></v-radio>
                            <v-radio label="Debito" color="#72128E" value="debito"></v-radio>
                        </v-radio-group> 
                    </div>

                    <div class="form-group row">
                        <v-col class="col-sm-4">
                            <v-textarea 
                                v-model="comentario" 
                                color="#72128E" 
                                outlined
                                :counter=200
                                label="Descripcion"
                                class="comentarioCss"
                            ></v-textarea>
                        </v-col>
                    </div>
                    

                </div>
            </v-card>
-->

            <v-card style="margin-top:10px; margin-left:40px; width:90%;" >
                <v-row>
                    <v-col>
                        <template  v-if="formaPago[0]=='credito' || formaPago[0]=='venta' || formaPago[0]=='abono'">
                            <div class="form-group row texto" style="margin-top:10px;margin-left:10px">
                                <label  class="col-sm-4 col-form-label">Sub total:</label>
                                <label  class="col-sm-4 col-form-label">{{totalVendido}}</label>
                            </div>

                            <div class="form-group row texto" style="margin-top:10px;margin-left:10px">
                                <label  class="col-sm-4 col-form-label">Descuento:</label>
                                <input type="text" class="form-control mb-3 llenarTexto" v-model="descuento"  placeholder="$">
                            </div>

                            <div class="form-group row texto" style="margin-top:10px;margin-left:10px">
                                <label  class="col-sm-4 col-form-label">Total:</label>
                                <label  class="col-sm-4 col-form-label">{{totalVendido-descuento}}</label>
                            </div>
                        </template>
                    </v-col>

                    <v-col>
                        <label  class="col-sm-2 col-form-label">{{formaPago}}</label>
                        
                        <template>
                            <div v-if="formaPago[0]=='debito' || formaPago[1]=='abono' || formaPago[0]=='abono'" class="form-group row texto" style="margin-top:10px;margin-left:10px; margin-bottom:10px">
                                <label  class="col-sm-4 col-form-label" >Abono:</label>
                                <input type="text" class="form-control mb-3 llenarTexto" v-model="abono"  placeholder="$">
                            </div>

                            <div v-if="(formaPago[0]=='credito' && formaPago[1]=='abono') || formaPago[0]=='abono'" class="form-group row texto" style="margin-top:10px;margin-left:10px">
                                <label  class="col-sm-4 col-form-label">Saldo:</label>
                                <label  class="col-sm-3 col-form-label">{{totalVendido-descuento-abono}}</label>
                            </div>
                        </template>

                    </v-col>
                </v-row>
            </v-card>
            
           
            <div style="margin-top:10px; margin-left:40px; margin-right:7%" class="container-fluid">

            <!--
                <v-row>
                     <v-btn class="botonesArriba" icon color="#72128E" @click="dialog=1"  >
                            <v-icon size="50"> mdi-plus-thick</v-icon>
                     </v-btn>
                </v-row>
                <v-row>
                    <v-col>
                        <v-dialog v-model="dialog" >
                            <v-card >
                                <v-data-table  class=" elevation-15" :headers="articulosMostradosTitle" :items="articulosMostrados" :search="search">
                                    <template v-slot:top>
                                    <v-toolbar flat >
                                        <v-toolbar-title>Todos</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-text-field  v-model="search"  append-icon="mdi-magnify" label="Buscar" single-line  hide-details ></v-text-field>
                                        <v-divider  class="mx-4"   inset  vertical ></v-divider>
                                    </v-toolbar>
                                    </template>
                                    <template  v-slot:item.actions="{ item }">
                                    <v-icon  small  class="mr-2" @click="facturar(item)" >mdi-cart </v-icon>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-data-table class=" elevation-15" :headers="facturaArticulosTitle" :items="facturaArticulos"   >
                            <template v-slot:top>
                            <v-toolbar flat >
                                <v-toolbar-title>Facturados</v-toolbar-title>
                                <v-spacer></v-spacer>
                                
                                <v-divider  class="mx-4"   inset  vertical ></v-divider>
                            </v-toolbar>
                            </template>
                            <template  v-slot:item.cantidad="props">
                            <v-text-field  v-model="props.item.cantidad"  min=0 name="quantity"  outlined type="number"></v-text-field>
                            </template>
                            <template v-slot:[`item.subtotal`]="{ item }">
                            {{item.precio*item.cantidad}}
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                            <v-icon  small  class="mr-2" @click="desfacturar(item)" >mdi-delete </v-icon>
                            </template>
                        </v-data-table> 
                    </v-col>
                </v-row>
            -->

                
                <v-row>
                
                    <v-col>
                        
                        <v-data-table  class=" elevation-15 ancho-tabla" :headers="articulosMostradosTitle" :items="articulosMostrados" :search="search">
                            <template v-slot:top>
                            <v-toolbar flat >
                                <v-toolbar-title>Todos</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-text-field  v-model="search"  append-icon="mdi-magnify" label="Buscar" single-line  hide-details ></v-text-field>
                                <v-divider  class="mx-4"   inset  vertical ></v-divider>
                            </v-toolbar>
                            </template>
                            <template  v-slot:item.actions="{ item }">
                            <v-icon  small  class="mr-2" @click="facturar(item)" >mdi-cart </v-icon>
                            </template>
                        </v-data-table>
                        
                    </v-col>
               
                    <v-col>
                        <v-data-table class=" elevation-15 ancho-tabla" :headers="facturaArticulosTitle" :items="facturaArticulos"   >
                            <template v-slot:top>
                            <v-toolbar flat >
                                <v-toolbar-title>Facturados</v-toolbar-title>
                                <v-spacer></v-spacer>
                                
                                <v-divider  class="mx-4"   inset  vertical ></v-divider>
                            </v-toolbar>
                            </template>
                            <template  v-slot:item.cantidad="props">
                                <v-text-field  v-model="props.item.cantidad"  min=0 name="quantity"  outlined type="number"></v-text-field>
                            </template>
                            <template v-slot:[`item.subtotal`]="{ item }">
                                {{item.precio*item.cantidad}}
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon  small  class="mr-2" @click="desfacturar(item)" >mdi-delete </v-icon>
                            </template>
                        </v-data-table> 
                    </v-col>
                </v-row>
              
            </div>
            

            <!--formulario para agregar cliente-->
            <v-dialog v-model="formularioCliente" max-width="500px" > 
                 <v-card >
                <v-card-title><span class="text-h5">Agregar</span></v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field  v-model="clienteAlmacenar.tipoDocumento"                :rules="rulesTipoDocumento" label="Tipo de Documento*"  required ></v-text-field>
                      <v-text-field  v-model="cliente.numDocumento"           :counter="30"  :rules="rulesNumDocumento"  label="Número de Documento*" required  ></v-text-field>
                      <v-text-field  v-model="clienteAlmacenar.nombre"        :counter="70"  :rules="rulesNombre"        label="Nombre*"  required ></v-text-field>
                      <v-text-field  v-model="clienteAlmacenar.direccion"     :counter="70"  :rules="rulesDireccion"     label="Dirección"  ></v-text-field>
                      <v-text-field  v-model="clienteAlmacenar.ciudad"        :counter="70"  :rules="rulesCiudad"        label="Ciudad"  ></v-text-field>
                      <v-text-field  v-model="clienteAlmacenar.telefono"      :counter="70"  :rules="rulesTelefono"     label="Telefono"   ></v-text-field>
                      <v-text-field  v-model="clienteAlmacenar.email"         :counter="70"  :rules="rulesEmail"        label="Email"></v-text-field>
                      <v-btn color="blue darken-1" text class="mr-4"  @click="guardar"  > Guardar </v-btn>
                      <v-btn color="red darken-1" text class="mr-4" @click="formularioCliente=0"> Cancelar </v-btn>
                    </v-form >
                  </v-card-text>    
                </v-card>
            </v-dialog > 
           
           
        </v-app>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'
    export default {
        data:()=>({
            //dialog:0,
            //formasPagos:['venta','credito','debido','abono']
            msgError:'',//mensaje
            formularioCliente:0,//formulario
            numFactura:'001',
            formaPago:[],
            comentario:'',
            descuento:'',
            abono:'',
            //datos del cliente para colocar en factura
            cliente:{
                _id:'',
                numDocumento:'',
                tipoDocumento:'',
                nombre:'',
                direccion:'',
                ciudad:'',
                telefono:'',
                email:''
            },
            //almacenar datos del cliente
            clienteAlmacenar:{
                tipoDocumento:'',
                nombre:'',
                direccion:'',
                ciudad:'',
                telefono:'',
                email:''
            },

            //reglas datos
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
            
            articulosTraidos:[],//almacenar articulos que llegan del servidor
            articulosMostrados:[],//mostrar articulos para la venta
            facturaArticulos:[],//articulos vendidos
            editedIndex:0,

            search:'',

            articulosMostradosTitle:[
                { text: 'Referencia', value: 'referencia' , class:'purple darken-3 white--text'},
                { text: 'Categoria', value: 'categoria' , class:'purple darken-3 white--text'},
                { text: 'Marca', value: 'marca' , class:'purple darken-3 white--text'},
                { text: 'Cantidad', value: 'cantidad' , class:'purple darken-3 white--text'},
                { text: 'Precio', value: 'precio' , class:'purple darken-3 white--text'},
                { text: 'Agregar', value: 'actions' , class:'purple darken-3 white--text'},
            ],
            facturaArticulosTitle:[
                { text: 'Referencia', value: 'referencia',class:'grey darken-4 white--text' },
                { text: 'Categoria', value: 'categoria',class:'grey darken-4 white--text' },
                { text: 'Cantidad', value: 'cantidad',class:'grey darken-4 white--text' },
                { text: 'Precio uni.', value: 'precio',class:'grey darken-4 white--text' },
                {text:'Sub total',value:'subtotal',class:'grey darken-4 white--text',sortable: false},
                {text:'Eliminar',value:'actions',class:'grey darken-4 white--text',sortable: false}
            ]
            
        }),//data

        created(){
            this.traerArticulosActivos();
        },

        methods:{

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

            agregarCliente:function(){
                Swal.fire({
                    icon: 'question',
                    title: 'No existe...¿Desea agregar?',
                    confirmButtonText: `Agregar`,
                    showDenyButton: false,
                    showCancelButton: true,
                    }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        this.formularioCliente=1;

                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            },
        
            //traer cliente por cedula
            traerCliente(){
                let header = {headers:{"token" : this.$store.state.token}};
                console.log('antas envio',this.cliente.numDocumento);
                axios.get(`persona/buscando?numDocumento=${this.cliente.numDocumento}`,header,)
                    .then(response=>{
                         console.log(response);
                        if(response.data.persona==false){
                            this.agregarCliente();
                        }else{
                            
                            this.cliente=response.data.persona
                        }
                       
                    })
                    .catch(error=>{
                        console.log(error.response);
                        if(!error.response.data.msg){
                        this.msgError = error.response.data.errors[0].msg;
                        this.msjcompra(this.msgError);
                        }else{
                        this.msgError =error.response.data.msg;
                        this.msjcompra(this.msgError);
                        }
                    })
            },//traerCliente
            
            guardar(){
                let header = {headers:{"token" : this.$store.state.token}};
                const me = this;
                axios.post('persona',{
                tipoPersona:'cliente',  
                tipoDocumento:this.clienteAlmacenar.tipoDocumento,
                numDocumento:this.cliente.numDocumento,
                nombre:this.clienteAlmacenar.nombre,
                direccion:this.clienteAlmacenar.direccion,
                ciudad:this.clienteAlmacenar.ciudad,
                telefono:this.clienteAlmacenar.telefono,
                email:this.clienteAlmacenar.email,
                },
                header)
                    .then((response)=>{
                    console.log(response);
                    me.formularioCliente=0
                    this.msgError = response.data.msg;
                    this.msjAlertaBien(this.msgError);
                    this.reescribir();
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

            reescribir(){
                this.cliente.tipoDocumento=this.clienteAlmacenar.tipoDocumento;
                this.cliente.nombre =this.clienteAlmacenar.nombre;
                this.cliente.direccion= this.clienteAlmacenar.direccion;
                this.cliente.ciudad  =this.clienteAlmacenar.ciudad;
                this.cliente.telefono =this.clienteAlmacenar.telefono;
                this.cliente.email =this.clienteAlmacenar.email;
            },//reescribir

            //traer articulos activos
            traerArticulosActivos(){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get("articulo/activos",header)
                    .then(response =>{   
                    console.log(response);  
                    this.articulosTraidos = response.data.articulo
                    this.meterArticulos(this.articulosTraidos);
                    })
                    .catch((error) =>{
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
            },//traerArticulosActivos

            //alistar articulos para mostrar en la venta
            meterArticulos(articulosTraidos){
                let pepe=[];
                articulosTraidos.map(function(x){
                    pepe.push({
                        _id:x._id,
                        categoria:x.categoria.nombre,
                        marca:x.marca.nombre,
                        referencia:x.referencia,
                        cantidad:x.stock,
                        precio:x.precio,
                        costo:x.costo,
                    })
                })
                this.articulosMostrados=pepe;
                console.log(this.articulosMostrados);
            },//meterArticulos

            //meter el articulo en la venta
            facturar(item){
                this.editedIndex=this.articulosMostrados.indexOf(item);
                this.facturaArticulos.push(item);
                this.articulosMostrados.splice(this.editedIndex,1);
                console.log(this.facturaArticulos);
                console.log(this.editedIndex);
            },//facturar

            //quita el articulo de la venta
            desfacturar(item){
                this.editedIndex=this.facturaArticulos.indexOf(item)
                this.articulosMostrados.push(item)
                this.facturaArticulos.splice(this.editedIndex,1)
                console.log(this.facturaArticulos);
                console.log(this.editedIndex);
            },//desfacturar


        },//methods

         computed:{
      
            totalVendido(){
                return this.facturaArticulos.reduce((suma,articulo)=>{
                    return suma + (parseInt(articulo.cantidad)*articulo.precio)
                },0)
            },

            totalCosto(){
                return this.facturaArticulos.reduce((suma,articulo)=>{
                    return suma + (parseInt(articulo.cantidad)*parseFloat(articulo.costo))
                },0)
            },
            
         }

    }//export defaul
</script>
<style scoped>
    .texto{
        font-family: 'calibri';
        color: #00000;
        font-size: 20px;
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
    .formaPagocss{
        font-family: 'calibri';
        color: #00000;
        font-size: 20px;
        text-align:left;
        position:relative;
        top:-480px; 
        left: 50%;
        margin-top:20px;
    
    }
    .FormaPagosccsTexto{
        font-family: 'calibri';
        color: #72128E;
        font-size: 20px;
        height:35px;
        width:200px;
        margin-top:-10px;
        margin-left:-50px
    }
    .comentarioCss{
        font-family: 'calibri';
        color: #72128E !important;
        font-size: 20px;
    }
</style>

<style>
  .ancho-tabla table{
    table-layout: fixed;
  }
</style>