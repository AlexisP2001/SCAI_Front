<template>
  <div v-if="this.$store.state.token != ''">
   <v-navigation-drawer app
        permanent
        expand-on-hover
        color="#8732A0"
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class=" white--text text-h6 text-sm-left">
                Sandra Adams
              </v-list-item-title>
              <v-list-item-subtitle class=" white--text text-sm-left">sandra_a88@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
      <v-list>
        <v-list-item :to="{path:'/home'}">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class=" white--text text-sm-left" >Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>   
        <!--Almacen:articulos and categorias-->
        <template v-if="this.$store.state.rol =='administrador'">
            <v-list-group class=" white--text text-sm-left" v-for="item in items"  :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action  >
              <template class=" white--text text-sm-left" v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title class=" white--text text-sm-left" v-text="item.title" ></v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item class=" white--text text-sm-left" v-for="child in item.items" :key="child.title" :to="child.ruta">
                <v-list-item-content >           
                  <v-list-item-title class=" white--text text-md-center" v-text="child.title"></v-list-item-title>
                </v-list-item-content>           
              </v-list-item>
            </v-list-group>
        </template>
        <!--compras:compras and proveedores-->
        <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
          <v-list-group class=" white--text text-sm-left" v-for="item in items2"  :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action  >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class=" white--text text-sm-left" v-text="item.title" ></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item class=" white--text text-sm-left" v-for="child in item.items" :key="child.title" :to="child.ruta">
              <v-list-item-content >           
                <v-list-item-title class=" white--text text-md-center" v-text="child.title"></v-list-item-title>
              </v-list-item-content>           
            </v-list-item>
          </v-list-group>
        </template>
        <!--ventas:ventas and clientes-->
        <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
          <v-list-group  v-for="item in items3"  :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action  >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class=" white--text text-sm-left" v-text="item.title" ></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item class=" white--text text-sm-left" v-for="child in item.items" :key="child.title" :to="child.ruta">
              <v-list-item-content >           
                <v-list-item-title class=" white--text text-md-center" v-text="child.title"></v-list-item-title>
              </v-list-item-content>           
            </v-list-item>
          </v-list-group>
        </template>
        <!--consultas:consultar compras and consultar ventas-->
        <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
          <v-list-item :to="{path:'/facturacion'}">
          <v-list-item-action>
            <v-icon>mdi-cash-register</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class=" white--text text-sm-left" >Facturacion</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        </template>
        <!--acceso:usuarios-->
        <template v-if="this.$store.state.rol =='administrador'">
          <v-list-item :to="{path:'/configuraciones'}">
          <v-list-item-action>
            <v-icon>mdi-wrench</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class=" white--text text-sm-left" >Configuracion</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        </template>
        <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
          <v-list-item :to="{path:'/'}">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
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
        items: [
          {action: 'mdi-sitemap',
          title: 'Almacen',
          items: [
            {title: 'Categorías',ruta: {path:'/categorias'}}, 
            {title:'Articulos',ruta:{path:'/articulos'}},
          ],
          //active:true
          }
        ],
        items2: [
          { action: 'mdi-shopping',
            title: 'Compras',
            items: [ { title: 'Compras' ,ruta:{path:'/compras'}}, { title: 'Proveedores',ruta:{path:'/proveedores'} }],
          }
        ],
        items3: [
          { action: 'mdi-cart',
            title: 'Ventas',
            items: [{ title: 'Ventas' ,ruta:{path:'/ventas'}}, { title: 'Clientes' ,ruta:{path:'/clientes'}}]  
          }
        ],
        items4: [
          { action: 'mdi-chart-line',
            title: 'Consultas',
            items: [{ title: 'Consultar compras',ruta:{path:'/consultarCompras'} }, { title: 'Consultar ventas',ruta: {path:'/consultarVentas'}} ],
          }
        ],
        items5: [
          { action: 'mdi-account-multiple',
            title:  'Acceso',
            items: [{ title: 'Usuarios',ruta:{path:'/usuarios'} } ]
          }
        ],
      }//return
    },//data
    methods:{
      //Deja la bariable golbal token igual a nada y oculta el menu
      cerrarSesion(){
        this.$router.push("/");
        this.$store.dispatch("setToken", this.token);
      }
    }//methods
  };//export
</script>

