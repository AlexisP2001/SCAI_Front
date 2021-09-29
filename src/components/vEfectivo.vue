<template>
    <v-app>
        <v-container>
        <!-- fechas -->
        <template>
            <v-card style="margin-top:20px;box-shadow: 0 0 20px #A068B8;" >
                <v-row style="margin-left:10px">
                    <v-row>
                        <v-col  cols="5" sm="6" md="3" >
                              <v-menu ref="menu"  v-model="calendarioInicio" :close-on-content-click="false"  transition="scale-transition" offset-y  min-width="auto" >
                                  <template v-slot:activator="{ on, attrs }">
                                      <v-text-field v-model="fechaInicio" label="Fecha Inicial" prepend-icon="mdi-calendar"  readonly v-bind="attrs" v-on="on" ></v-text-field>
                                  </template>
                                  
                                  <v-date-picker v-model="fechaInicio"  no-title scrollable  >
                                      <v-spacer></v-spacer>
                                      <v-btn text  color="primary"  @click="menu = false" >  Cancel </v-btn>
                                      <v-btn text color="primary" @click="$refs.menu.save(date)"  > OK </v-btn>
                                  </v-date-picker>
                              </v-menu>
                        </v-col>
                        <v-col  cols="5" sm="6" md="3" >
                              <v-menu ref="menu"  v-model="calendarioFinal" :close-on-content-click="false" :return-value.sync="date"  transition="scale-transition" offset-y  min-width="auto" >
                                  <template v-slot:activator="{ on, attrs }">
                                      <v-text-field v-model="fechaFinal" label="Fecha Final" prepend-icon="mdi-calendar"  readonly v-bind="attrs" v-on="on" ></v-text-field>
                                  </template>
                                  
                                  <v-date-picker v-model="fechaFinal"  no-title scrollable  >
                                      <v-spacer></v-spacer>
                                      <v-btn text  color="primary"  @click="menu = false" >  Cancel </v-btn>
                                      <v-btn text color="primary" @click="$refs.menu.save(date)"  > OK </v-btn>
                                  </v-date-picker>
                              </v-menu>
                        </v-col>
                         <v-col cols="3">
                            <v-autocomplete
                                  v-model="subTipoFactura"
                                  :items="listaTipoFactura"
                                  filled
                                  dense
                                  deletable-chips
                                  chips
                                  label=""
                                  small-chips
                                  style="margin-top:8px"
                            ></v-autocomplete>
                          </v-col>
            <!-- boton busqueda -->
            <v-btn style="margin-right:10px;  margin-top:20px"   icon color="#72128E"  @click="obtenerEfectivos()"><v-icon size="40">mdi-card-search-outline</v-icon> </v-btn>
              <!--boton de excel-->
            <v-btn style="margin-right:10px; margin-left:20px;  margin-top:20px"   icon color="#72128E"  @click="exportarExcel()">
              <download-excel>
              <!-- <download-excel  :data="articulosExport"> -->
                <v-icon size="40">mdi-file-excel-outline</v-icon>
              </download-excel> 
            </v-btn>
            <!--boton para traer todo-->
            <v-btn style="margin-right:10px; margin-left:20px;  margin-top:20px"  class="mb-2 purple darken-3 white--text"   @click="obtenerarticulos()">Todos</v-btn>
        </v-row>  
        </v-row>
        </v-card> 
      </template>
    <template>
        <!--tabla de categorias-->
        <v-data-table style="margin-top:50px"  class="elevation-15 "  :headers="columnas" :items="efectivos"  :search="search">
          <template v-slot:top>
            <v-toolbar  flat>
              <v-toolbar-title>Efectivos</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:[`item.total`]="{ item }">
            {{parseInt(item.totalPrecio) - parseInt(item.descuento)}}
          </template>
          <!--ver documento-->
          <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2"  @click="ver(2,item)"  >mdi-file-find</v-icon>
              <v-icon small class="mr-2"  @click="imprimir(item)"  >mdi-printer</v-icon>
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
      
      calendarioInicio: false,
      calendarioFinal: false,
    
      fechaInicio: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      fechaFinal: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      
      listaTipoFactura: ['abono', 'venta',''],
      subTipoFactura:'',
      
      search: '',


      columnas: [
        { text: 'Fecha', value: 'createdAt'  ,class:'purple darken-3 white--text'},
        { text: 'Factura', value: 'subTipoFactura'  ,class:'purple darken-3 white--text'},
        { text: 'Tipo', value: 'tipoFactura'  ,class:'purple darken-3 white--text'},
        { text: 'Cliente', value: 'persona'  ,class:'purple darken-3 white--text'},
        { text: 'Subtotal', value: 'totalPrecio'  ,class:'purple darken-3 white--text'},
        { text: 'Descuento', value: 'descuento'  ,class:'purple darken-3 white--text'},
        { text: 'Total', value: 'total'  ,class:'purple darken-3 white--text'},
        { text: 'Opciones', value: 'actions' , class:'purple darken-3 white--text',width:'10%',sortable: false }
      ],
      ventas:[],
      efectivos:[],
    }),//data
    created(){
      this.obtenerEfectivos();
      
    },
    methods: {
      //msg de alerta
      msjError:function(tata){
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: tata,
          showConfirmButton: false,
          timer: 3000})
      },
      msjExito:function(tata){
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: tata,
          showConfirmButton: false,
          timer: 2000})
      },
        // obtenerAbonos
      obtenerEfectivos(){
        let header = {headers:{"token" : this.$store.state.token}};
        axios.get(`movimiento/efectivo?subTipoFactura=${this.subTipoFactura}&fechaInicial=${this.fechaInicio}&fechaFinal=${this.fechaFinal}`,header)
          .then(response =>{
            console.log(response);
            let ventas = response.data.movimiento
            this.limpiarFechas(ventas)
            if(this.efectivos.length==0){
              this.msjAlertaBien('No hay debitos');
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
      },
       limpiarFechas(efectivos){
        let arrayTemporal = [];
        efectivos.map(function(x){
          var fecha = x.createdAt.split("T");
          var fechaLimpia = fecha[0]
          arrayTemporal.push({
            _id:x._id,
            createdAt:fechaLimpia,
            tipoFactura:x.tipoFactura,
            persona:x.persona,
            saldoAnterior:x.saldoAnterior,
            abonoEfectivo:x.abonoEfectivo,
            numFacturaVenta:x.numFacturaVenta,
            subTipoFactura:x.subTipoFactura,
            totalPrecio:x.totalPrecio,
            descuento:x.descuento,
            total:x.total,
            abonoCredito:x.abonoCredito,
          })
        })

        this.efectivos = arrayTemporal;
      },
      imprimir(item){
        console.log(item);
        this.msgAlerta("imprimiendo")
      }

    },//methods
  }
</script>