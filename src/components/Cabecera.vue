<template>
  <div v-if="this.$store.state.token != ''" >
  
   <v-navigation-drawer app
        permanent
        expand
        color="#8732A0"
      >
        <v-list>
          
          
              <!-- <v-icon size="100" class="white--text">mdi-account-circle</v-icon> -->
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class=" white--text text-h6 text-sm-left">
                {{this.$store.state.nombreUser}}
              </v-list-item-title>
              <v-list-item-subtitle class=" white--text text-sm-left">{{this.$store.state.rol}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
      <v-list>
      
        <!--home-->
        <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
          <v-list-item :to="{path:'/home'}">
          <v-list-item-action>
            <v-icon class="white--text">mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class=" white--text text-sm-left" >Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        </template>
        
        <!--facturacion-->
        <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
          <v-list-item :to="{path:'/facturacion'}">
          <v-list-item-action>
            <v-icon class="white--text">mdi-cash-register</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class=" white--text text-sm-left" >Facturacion</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        </template>

        <!--articulos-->
        <template v-if="this.$store.state.rol =='administrador'">
          <v-list-item :to="{path:'/articulos'}">
          <v-list-item-action>
            <v-icon class="white--text">mdi-tshirt-crew-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class=" white--text text-sm-left" >Articulos</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        </template>

        <!--ventas-->
        <template v-if="this.$store.state.rol =='administrador'">
          <v-list-group class="white--text" v-for="item in items2"  :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action  >
            <template  v-slot:activator>
              <v-list-item-content class="white--text text-sm-left">
                <v-list-item-title v-text="item.title" ></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="child in item.items" :key="child.title" :to="child.ruta">
              <v-list-item-content class="white--text" >           
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item-content>           
            </v-list-item>
          </v-list-group>
        </template>
        
        <!--categorias-->
        <template v-if="this.$store.state.rol =='administrador'">
          <v-list-item :to="{path:'/categorias'}">
          <v-list-item-action>
            <v-icon class="white--text">mdi-package-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class=" white--text text-sm-left" >Categorías</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        </template>
        
        <!--marcas-->
        <template v-if="this.$store.state.rol =='administrador'">
          <v-list-item :to="{path:'/marcas'}">
          <v-list-item-action>
            <v-icon class="white--text">mdi-label-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class=" white--text text-sm-left" >Marcas</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        </template>
        
        <!--clientes-->
        <template v-if="this.$store.state.rol =='administrador'">
          <v-list-item :to="{path:'/clientes'}">
          <v-list-item-action>
            <v-icon class="white--text">mdi-account-search-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class=" white--text text-sm-left" >Clientes</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        </template>
        
        <!--proveedores-->
        <template v-if="this.$store.state.rol =='administrador'">
          <v-list-item :to="{path:'/proveedores'}">
          <v-list-item-action>
            <v-icon class="white--text">mdi-clipboard-account-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class=" white--text text-sm-left" >Proveedores</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        </template>
        
        <!--usuarios-->
        <template v-if="this.$store.state.rol =='administrador'">
          <v-list-item :to="{path:'/usuarios'}">
          <v-list-item-action>
            <v-icon class="white--text">mdi-account-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class=" white--text text-sm-left" >Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        </template>


        <!--configuracion-->
        <template v-if="this.$store.state.rol =='administrador'">
          <v-list-item :to="{path:'/configuraciones'}">
          <v-list-item-action>
            <v-icon class="white--text">mdi-wrench</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class=" white--text text-sm-left" >Configuracion</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        </template>

        <!--salir-->
        <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
          <v-list-item :to="{path:'/'}">
          <v-list-item-action>
            <v-icon class="white--text">mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="cerrarSesion()" class="white--text text-sm-left" >Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        </template>


      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
 export default {
   name: 'App',
    data(){
      return {
        items2: [
          { action : 'mdi-archive-outline',
            title: 'Ventas',
            items: [ { title: 'Debitos' ,ruta:{path:'/debitos'}}, 
                     { title: 'Abonos',ruta:{path:'/abonos'} },
                     { title: 'Creditos',ruta:{path:'/creditos'} },
                     { title: 'Efectivos',ruta:{path:'/efectivos'} },
                     ],
          }
        ],
        token:'',
        drawer:'',
      }//return
    },//data
    methods:{
      //Deja la bariable golbal token igual a nada y oculta el menu
      cerrarSesion(){
        this.$router.push("/");
        this.$store.dispatch("setToken", this.token);
        console.log('token',this.$store.state.token);
      }
    }//methods
  };//export
</script>