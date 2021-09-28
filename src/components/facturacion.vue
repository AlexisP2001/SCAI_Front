<template>
    <div>
        <v-btn class="botonFactura"    @click="crearFactura()">
            <v-icon >mdi-clipboard-account-outline</v-icon> Generar facutra
        </v-btn>

        <!--TIPO DE FACTURA Y COMENTARIO-->
        <v-card style="margin-top:70px; margin-left:30px; width:95%; box-shadow: 0 0 20px #A068B8; ">
            <v-row>
                <v-col>
                    <v-checkbox style="margin-left:10px;" v-model="guardarDatos"  :label="`No guardar cliente ${guardarDatos}`"></v-checkbox>

                    <div style="font-family: 'calibri';  color: #00000;  font-size: 20px; text-align:left;  margin-left:30px; margin-top:10px;">
                        <div class="form-group row">
                            <label  class="texto">Tipo de factura:</label>

                            <!--TIPO DE FACTURA-->
                            <v-radio-group   v-model="tipoFactura" style="margin-top:1px"  >
                                <v-radio style="margin-left:15px; " label="Debito" color="#72128E"  value="debito"></v-radio> 
                                <v-radio style="margin-left:15px; " label="Abono sobre abono" color="#72128E"   value="abonoAbono"></v-radio>
                                <v-radio style="margin-left:15px; " label="Credito" color="#72128E"   value="credito"></v-radio>
                                <v-radio style="margin-left:15px; " label="Efectivo" color="#72128E"   value="efectivo"></v-radio>
                            </v-radio-group>

                            <!--SUBTIPO DE FACTURA DEBITO  Y ABONO SOBRE ABONO-->
                            <v-radio-group v-if="tipoFactura!='credito' && tipoFactura!='efectivo' " :value="subTipoFactura=''">  </v-radio-group> 
                                               
                            <!--SUBTIPO DE FACTURA CREDITO-->
                            <v-radio-group v-model="subTipoFactura" v-if="tipoFactura=='credito'" > 
                                <v-radio style="margin-left:15px; margin-top:-15px; " label="Venta" color="#72128E" value="venta"></v-radio>
                                <v-radio style="margin-left:15px; " label="Abono" color="#72128E" value="abono"></v-radio>
                            </v-radio-group> 
                            
                            <!--SUBTIPO DE FACTURA PARA EFECTIVO-->
                            <v-radio-group v-model="subTipoFactura" v-if="tipoFactura=='efectivo'" > 
                                <v-radio style="margin-left:15px; margin-top:-15px; " label="Venta" color="#72128E" value="venta"></v-radio>
                                <v-radio style="margin-left:15px; " label="Abono" color="#72128E" value="abono"></v-radio>
                            </v-radio-group> 
                            
                        </div>
                    </div>
                </v-col>

                <!--COMENTARIO-->
                <v-col>
                    <div class="form-group row comentario">
                            <v-textarea v-model="comentario"  color="#72128E"   outlined  :counter=200 label="Descripcion"></v-textarea>
                    </div>
                        {{tipoFactura}}  {{subTipoFactura}}
                </v-col>
            </v-row>
        </v-card>

        <!-- DATOS DEL CLIENTE -->
        <v-card style="margin-top:20px; margin-left:30px; width:95%;box-shadow: 0 0 20px #A068B8; ">
            <v-row>
                <v-col>
                    <div class="form-group row texto" style="margin-top:10px;margin-left:0px">
                        <label  class="col-sm-4 col-form-label">No. factura:</label>
                        <label  class="col-sm-2 col-form-label">{{numFactura}}</label>
                    </div>
                    <div class="form-group row texto" >
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px" >Numero documento:</label>
                        <input type="text" class="form-control mb-3 textoInput" v-model="cliente._id"  placeholder="">
                        <v-btn class="botones" style="margin-top:10px; "  icon color="#72128E" @click="traerCliente()"><v-icon>mdi-account-search-outline</v-icon>  </v-btn>
                    </div>
                    <div class="form-group row texto">
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px">Tipo documento:</label>
                        <input type="text" class="form-control mb-3 textoInput" v-model="cliente.tipoDocumento"  placeholder="">
                    </div>
                    <div class="form-group row texto">
                        <label  class="col-sm-4 col-form-label" style="margin-left:10px">Nombre:</label>
                        <input type="text" class="form-control mb-3 textoInput" v-model="cliente.nombre"  placeholder="">
                        
                    </div>
                </v-col>

                <v-col>
                    <div class="form-group row texto" style="margin-top:10px">
                        <label  class="col-sm-3 col-form-label" style="height:45px;"></label>
                    </div>
                    <div class="form-group row texto" style="margin-top:10px">
                        <label  class="col-sm-3 col-form-label">Direccion:</label>
                        <input type="text" class="form-control mb-3 textoInput" v-model="cliente.direccion"  placeholder="">
                    </div>
                    <div class="form-group row texto">
                        <label  class="col-sm-3 col-form-label">Ciudad:</label>
                        <input type="text" class="form-control mb-3 textoInput" v-model="cliente.ciudad"  placeholder="">
                    </div>
                    <div class="form-group row texto">
                        <label  class="col-sm-3 col-form-label">Telefono:</label>
                        <input type="text" class="form-control mb-4 textoInput" v-model="cliente.telefono"  placeholder="">
                        
                    </div>
                    <div class="form-group row texto">
                        <label  class="col-sm-3 col-form-label">Email:</label>
                        <input type="text" class="form-control mb-4 textoInput" v-model="cliente.email"  placeholder="">
                    </div>
                </v-col>
            </v-row>
        </v-card>

        <!--DATOS CONDICIONALES-->
        <v-card style="margin-top:40px; margin-left:30px; width:95%; box-shadow: 0 0 20px #A068B8;padding:15px ">
            <v-row>
                <v-col>

                    <!--DEBITO-->
                    <template  v-if="tipoFactura=='debito'">
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Saldo anterior:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="saldoAnterior"  placeholder="$">
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Abono:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="abonoEfectivo"  placeholder="$">
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Saldo actual:</label>
                            <label  class="col-sm-4 col-form-label">{{saldoAnterior-abonoEfectivo}}</label>
                        </div>
                    </template >

                    <!--ABONO SOBRE ABONO-->
                    <template  v-if="tipoFactura=='abonoAbono'">
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Saldo anterior:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="saldoAnterior"  placeholder="$">
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Abono:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="abonoEfectivo"  placeholder="$">
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Abono credito:</label>
                            <input type="number" min=0 class="form-control mb-3 textoInput" v-model="abonoCredito"  placeholder="$">
                        </div>
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Saldo actual:</label>
                            <label  class="col-sm-4 col-form-label">{{saldoAnterior-abonoEfectivo-abonoCredito}}</label>
                        </div>
                    </template >


                    <!--CREDITO Y EFECTIVO-->
                    <template  v-if="tipoFactura=='credito' || tipoFactura=='efectivo'">
                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Sub total:</label>
                            <label  class="col-sm-4 col-form-label">{{totalVendido}}</label>
                        </div>

                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Descuento:</label>
                            <input type="number" class="form-control mb-3 textoInput" v-model="descuento"  placeholder="$">
                        </div>

                        <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                            <label  class="col-sm-4 col-form-label">Total:</label>
                            <label  class="col-sm-4 col-form-label">{{totalVendido-descuento}}</label> 
                        </div>
                    </template >

                </v-col>
   
                <v-col>
                    <!--CREDITO VENTA-->
                    <template v-if="tipoFactura=='credito' && subTipoFactura=='venta' ">
                        <div  class="form-group row texto" style="margin-top:2px;margin-left:10px; margin-bottom:10px">
                            <label  class="col-sm-4 col-form-label" >paga con credito:</label>
                            <input type="number" class="form-control mb-3 textoInput" v-model="abonoCredito"  placeholder="$">
                        </div>
                        <div  class="form-group row texto" style="margin-top:2px;margin-left:10px; margin-bottom:10px">
                            <label  class="col-sm-4 col-form-label" >paga con efectivo:</label>
                            <label type="number"  class="col-sm-3 col-form-label">{{totalVendido-descuento-abonoCredito}}</label>
                        </div>
                    </template>
                    
                    
                    <!--CREDITO ABONO-->
                    <template v-if="tipoFactura=='credito' && subTipoFactura=='abono' ">
                        <div  class="form-group row texto" style="margin-top:2px;margin-left:10px; margin-bottom:10px">
                            <label  class="col-sm-4 col-form-label" >paga con credito:</label>
                            <input type="number" class="form-control mb-3 textoInput" v-model="abonoCredito"  placeholder="$">
                        </div>
                        <div  class="form-group row texto" style="margin-top:2px;margin-left:10px; margin-bottom:10px">
                            <label  class="col-sm-4 col-form-label" >paga con efectivo:</label>
                            <input type="number" class="form-control mb-3 textoInput" v-model="abonoEfectivo"  placeholder="$">
                        </div>
                        <div  class="form-group row texto" style="margin-top:2px;margin-left:10px; margin-bottom:10px">
                            <label  class="col-sm-4 col-form-label" >Total abono:</label>
                            <label  class="col-sm-4 col-form-label" >{{parseInt(abonoCredito)+parseInt(abonoEfectivo)}}</label>
                        </div>
                        <div  class="form-group row texto" style="margin-top:2px;margin-left:10px; margin-bottom:10px">
                            <label  class="col-sm-4 col-form-label" >Saldo pendiente:</label>
                            <label  class="col-sm-4 col-form-label" >{{totalVendido-descuento-parseInt(abonoCredito)+parseInt(abonoEfectivo)}}</label>
                        </div>
                    </template>

                    <!--EFECTIVO ABONO-->
                    <template v-if="tipoFactura=='efectivo' && subTipoFactura=='abono' ">
                        <div  class="form-group row texto" style="margin-top:2px;margin-left:10px; margin-bottom:10px">
                            <label  class="col-sm-4 col-form-label" >Abono:</label>
                            <input type="number" class="form-control mb-3 textoInput" v-model="abonoEfectivo"  placeholder="$">
                        </div>
                        <div  class="form-group row texto" style="margin-top:2px;margin-left:10px; margin-bottom:10px">
                            <label  class="col-sm-4 col-form-label" >Saldo:</label>
                            <label type="number"  class="col-sm-3 col-form-label">{{totalVendido-descuento-abonoEfectivo}}</label>
                        </div>
                    </template>

                </v-col>
            </v-row>
        </v-card>

        <!--TABLAS CON ARTICULOS-->
        
        <!--abono abono-->
        <template v-if="tipoFactura !='' && tipoFactura=='abonoAbono' && (saldoAnterior-abonoEfectivo-abonoCredito)==0">
            <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                <label   class="col-sm-4 col-form-label">articulos abono abono</label>
                <v-row>
                    <v-col>
                        <!--tabla con articulo activos-->
                            <v-data-table  class=" elevation-15 ancho-tabla" :headers="mostrarArticulosAbonoAbono" :items="articulosMostradosVenta" :search="search">
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
                        <!--tabla con articulo facturados-->
                        <v-data-table class=" elevation-15 ancho-tabla" :headers="facturaArticulosAbonoAbono" :items="facturaArticulos"   >
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
        </template>
        
        <!--credito y venta-->
        <template v-if="tipoFactura !='' &&  tipoFactura!='abonoAbono' && tipoFactura!='debito'">
            <div class="form-group row texto" style="margin-top:2px;margin-left:10px">
                <label  class="col-sm-4 col-form-label">articulos credito venta</label>
                <v-row>
                    <v-col>
                        <!--tabla con articulo activos-->
                            <v-data-table  class=" elevation-15 ancho-tabla" :headers="articulosMostradosVentaTitle" :items="articulosMostradosVenta" :search="search">
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
                        <!--tabla con articulo facturados-->
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
        </template>
        

    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from "sweetalert2"
    export default {
        data:()=>({
            mensajeAlerta:'',
            //datos a enviar
            guardarDatos:false,
            tipoFactura:'',
            subTipoFactura:'',
            comentario:'',
            numFactura:0,
            cliente:{
                _id:'',
                tipoDocumento:'',
                nombre:'',
                direccion:'',
                ciudad:'',
                telefono:'',
                email:''
            },
            saldoAnterior:0,
            abonoEfectivo:0,
            abonoCredito:0,
            descuento:0,

            search:'',
            articulosTraidos:[],//articulos activos del servidor
            facturaArticulos:[],//articulos en la factura
            articulosMostradosVenta:[],//articulos mostrados para la venta
            
            //mostrar articulos todos los campos
            articulosMostradosVentaTitle:[
                { text: 'Referencia', value: 'referencia' , class:'purple darken-3 white--text'},
                { text: 'Categoria', value: 'categoria' , class:'purple darken-3 white--text'},
                { text: 'Marca', value: 'marca' , class:'purple darken-3 white--text'},
                { text: 'Cantidad', value: 'cantidad' , class:'purple darken-3 white--text'},
                { text: 'Precio', value: 'precio' , class:'purple darken-3 white--text'},
                { text: 'Agregar', value: 'actions' , class:'purple darken-3 white--text'},
            ],


            //articulos vendidos
            facturaArticulosTitle:[
                { text: 'Referencia', value: 'referencia',class:'grey darken-4 white--text' },
                { text: 'Categoria', value: 'categoria',class:'grey darken-4 white--text' },
                { text: 'Cantidad', value: 'cantidad',class:'grey darken-4 white--text' },
                { text: 'Precio uni.', value: 'precio',class:'grey darken-4 white--text' },
                {text:'Sub total',value:'subtotal',class:'grey darken-4 white--text',sortable: false},
                {text:'Eliminar',value:'actions',class:'grey darken-4 white--text',sortable: false}
            ],
            
            //articulos abono abono
            mostrarArticulosAbonoAbono:[
                { text: 'Referencia', value: 'referencia' , class:'purple darken-3 white--text'},
                { text: 'Categoria', value: 'categoria' , class:'purple darken-3 white--text'},
                { text: 'Marca', value: 'marca' , class:'purple darken-3 white--text'},
                { text: 'Cantidad', value: 'cantidad',class:'purple darken-3 white--text' },
                { text: 'Agregar', value: 'actions' , class:'purple darken-3 white--text'},
            ],
            facturaArticulosAbonoAbono:[
                { text: 'Referencia', value: 'referencia',class:'grey darken-4 white--text' },
                { text: 'Categoria', value: 'categoria',class:'grey darken-4 white--text' },
                { text: 'Marca', value: 'marca' , class:'grey darken-4 white--text'},
                { text: 'Cantidad', value: 'cantidad',class:'grey darken-4 white--text' },
                {text:'Eliminar',value:'actions',class:'grey darken-4 white--text',sortable: false}
            ],


        }),//data
        
        created(){
            this.traerNumFactura();
            this.traerArticulosActivos();
        },
        methods:{
            //msg de alerta erronea
            msjErrores : function(msg){
                Swal.fire({
                    position:'top',
                    icon:'error',
                    title:msg,
                    showConfirmButton:false,
                    timer:1000
                })
            },//msjErrores
            
            //msg de alerta exitoso
            msjExitoso : function(msg){
                Swal.fire({
                    position:'top',
                    icon:'success',
                    title:msg,
                    showConfirmButton:false,
                    timer:1000
                })
            },//msjExitoso

            //buscar y traer el cliente
            traerCliente(){
                if(this.cliente._id.trim()===''){return this.msjErrores('Numero de documento obligatorio')}

                let header = {headers:{"token" : this.$store.state.token}};
                console.log('antas envio',this.cliente._id);

                axios.get(`persona/buscando?numDocumento=${this.cliente._id}`,header,)
                    .then(response=>{
                         console.log(response);
                        if(response.data.persona==false){
                            this.agregarCliente();
                        }else{
                            this.cliente=response.data.persona;
                        }
                    })
                    .catch(error=>{
                        console.log(error.response);
                        if(!error.response.data.msg){
                        this.msgError = error.response.data.errors[0].msg;
                        this.msjErrores(this.msgError);
                        }else{
                        this.msgError =error.response.data.msg;
                        this.msjErrores(this.msgError);
                        }
                    })
            },//traerCliente

            //preguntar si desea agregar cliente 
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
                        //this.formularioCliente=1;
                        this.guardarDatos=false
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            },//agregarCliente

            //traer numero de factura
            traerNumFactura(){
                let header = {headers:{"token" : this.$store.state.token}};
                axios.get('generalData/venta',header,)
                    .then(response=>{
                        console.log(response);
                        this.numFactura=response.data.numFacturaVenta
                    })
                    .catch(error=>{
                        console.log(error.response);
                        if(!error.response.data.msg){
                        this.msgError = error.response.data.errors[0].msg;
                        this.msjErrores(this.msgError);
                        }else{
                        this.msgError =error.response.data.msg;
                        this.msjErrores(this.msgError);
                        }
                    })
            },//traerNumFactura

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
                            this.msjErrores(this.msgError);
                        }else{
                            this.msgError = error.response.data.msg;
                            console.log(error.response.data.msg);
                            this.msgError =error.response.data.msg;
                            this.msjErrores(this.msgError);
                        }
                    })
            },//trearArticulosActivos

            //alistar los articulos para mostrar en la venta
            meterArticulos(articulosTraidos){
                let pepe=[];
                articulosTraidos.map(function(x){
                    pepe.push({
                        _id:x._id,
                        categoria:x.categoria.nombre,
                        marca:x.marca.nombre,
                        referencia:x.referencia,
                        cantidad:x.cantDisponibles,
                        precio:x.precio,
                        costo:x.costo,
                    })
                })
                this.articulosMostradosVenta=pepe;
                console.log(this.articulosMostradosVenta);
            },//meterArticulos

            //meter el articulo en la venta
            facturar(item){
                this.editedIndex=this.articulosMostradosVenta.indexOf(item);
                this.facturaArticulos.push(item);
                this.articulosMostradosVenta.splice(this.editedIndex,1);
                console.log(this.facturaArticulos);
                console.log(this.editedIndex);
            },//facturar

            //quita el articulo de la venta
            desfacturar(item){
                this.editedIndex=this.facturaArticulos.indexOf(item)
                this.articulosMostradosVenta.push(item)
                this.facturaArticulos.splice(this.editedIndex,1)
                console.log(this.facturaArticulos);
                console.log(this.editedIndex);
            },//desfacturar



            //crear la factura
            crearFactura(){
                //validar id cliente
                if(!this.guardarDatos){
                    if(this.cliente._id.trim()===''){return this.msjErrores('Numero de documento obligatorio')}
                }
                
                //validar comentario
                if(this.comentario.length>200){
                    return this.msjErrores('Comentario mayor a 200 carácteres')
                }
                //validar tipo factura
                if(this.tipoFactura===""){return this.msjErrores('Tipo de factura obligatorio')}
                
                //validar subtipo factura
                if(this.tipoFactura!='debito' && this.tipoFactura!='abonoAbono' && this.subTipoFactura==''){
                    return this.msjErrores('SubTipo de factura obligatorio')
                }
                
                //validar factura debito
                if(this.tipoFactura=='debito' && (this.abonoEfectivo==0 || this.saldoAnterior==0)){
                    return this.msjErrores('Saldo anterior y Abono obligatorio')
                }

                //validar factura abono sobre abono
                if(this.tipoFactura=='abonoAbono' && this.saldoAnterior==0){
                    return this.msjErrores('Saldo anterior obligatorio')
                }

                console.log(this.facturaArticulos.length);

                if((this.tipoFactura=="efectivo" || this.tipoFactura=='credito') && this.facturaArticulos.length===0){
                    return this.msjErrores('Artuculos obligatorios')
                }

                

                // let header = {headers:{"token":this.$store.state.token}};
                // axios.post('movimientos',{

            //             usuario:this.$store.state.id
            //             numFacturaVenta:this.numFactura,
            //             tipoFactura:this.tipoFactura
            //             subTipoFactura:this.subTipoFactura,
            //             comentario:this.comentario,

            //             guardarDatos:this.guardarDatos,


            //             persona:this.cliente
            
            
            //             tipoDocumento:this.cliente.tipoDocumento,
            //             nombre:this.cliente.nombre,
            //             direccion:this.cliente.direccion,
            //             ciudad:this.cliente.ciudad,
            //             telefono:this.cliente.telefono,
            //             email:this.cliente.email,

            //             saldoAnterior:this.saldoAnterior
            //             abonoEfectivo:this.abonoEfectivo
            //             abonoCredito:this.abonoCredito
            //             descuento:this.descuento
                        
            //             totalPrecio:this.totalVendido
            //             totalCosto:this.totalCosto
            //             articulos : facturaArticulos

            //         },header)
            //             .then((response)=>{
            //                 console.log(response);
            //                 me.traerNumFactura();
            //                 me.limpiarTodo();
            //             .catch((error)=>{
            //                 console.log(error.response);
            //                 if(!error.response.data.msg){
            //                     console.log(error.response);
            //                     this.msgError = error.response.data.errors[0].msg
            //                     this.msjErrores(this.msgError);
            //                 }else{
            //                     this.msgError = error.response.data.msg
            //                     console.log(error.response.data.msg);
            //                     this.msjErrores(this.msgError);
            //                 }
            //             })

                this.msjExitoso('estoy facturando')
            },//crearFactura



        },//methods

        computed:{
            totalVendido(){
                return this.facturaArticulos.reduce((suma,articulo)=>{
                    return suma + (parseInt(articulo.cantidad)*parseInt(articulo.precio))
                },0)
            },
            totalCosto(){
                return this.facturaArticulos.reduce((suma,articulo)=>{
                    return suma + (parseInt(articulo.cantidad)*parseInt(articulo.costo))
                },0)
            }
        }
    }//export default
</script>


<style scoped>
    .botonFactura{
        position:fixed;
        width:250px;
        height:120px;
        line-height:55px;
        bottom:90%;
        right:30px;
        background:#8732A0;
        color:#701FD7;
        border-radius:50px;
        text-align:center;
        font-size:15px;
        box-shadow: 0px 1px 10px rgba(69,67,192,3);
        z-index:100;
    }
    .botonFactura:hover{
        text-decoration:none;
        color:#fff;
        background:#701FD7;
    }
    .comentario{
        font-family: 'calibri'; 
        color: #00000;
        font-size: 200px; 
        text-align:left; 
        margin-left:0px; 
        margin-top:10px; 
        width:80%;
    }
    .texto{
        font-family: 'calibri';
        color: #00000;
        font-size: 20px;
        text-align:left;
    }
    .textoInput{
        font-family: 'calibri';
        color: #72128E;
        font-size: 20px;
        border: 3px solid #72128E;
        border-radius: 5px;
        height:35px;
        margin-top:12px    
    }
</style>