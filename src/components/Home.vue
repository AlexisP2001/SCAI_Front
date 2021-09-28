<template>
  <!--<div v-if="this.$store.state.token != ''" >-->
  <div>
    <v-app>
        <v-row>
            <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
                <v-col >
                    <v-btn class="botonesArriba" icon color="#72128E" :to="{path:'/facturacion'}" >
                        <p><v-icon size="90"> mdi-cash-register</v-icon><br><br><br>-Facturación</p>           
                    </v-btn>
                </v-col >
            </template>

            <template v-if="this.$store.state.rol =='administrador' || this.$store.state.rol =='vendedor'">
                <v-col >
                    <v-btn class="botonesArriba"  icon color="#72128E" :to="{path:'/separadas'}">
                        <p> <v-icon size="90"> mdi-cash</v-icon> <br><br><br>prendas separadas</p>           
                    </v-btn>
                </v-col >
            </template>

            <template v-if="this.$store.state.rol =='administrador'">
                <v-col >
                    <v-btn class="botonesArriba"  icon color="#72128E" :to="{path:'/salidas'}">
                        <p> <v-icon size="90">mdi-dolly</v-icon> <br><br><br>- salidas y entradas</p>           
                    </v-btn>
                </v-col >
            </template>

        </v-row>
        <v-row>
            <template v-if="this.$store.state.rol =='administrador'">
                <v-col >
                    <v-btn class="botones"  icon color="#72128E" :to="{path:'/articulos'}">
                        <p>   <v-icon size="90"> mdi-tshirt-crew-outline</v-icon><br><br><br>-Articulos </p>           
                    </v-btn>
                </v-col >
            </template>

            <template v-if="this.$store.state.rol =='administrador'">
                <v-col >
                    <v-btn class="botones"  icon color="#72128E"   :to="{path:'/categorias'}">
                        <p><v-icon size="80"> mdi-package-variant</v-icon><br><br><br>Categorías</p>
                    </v-btn>
                </v-col >
            </template>

            <template v-if="this.$store.state.rol =='administrador'">
                <v-col >
                    <v-btn class="botones" icon color="#72128E" :to="{path:'/marcas'}">
                        <p><v-icon size="90">mdi-label-outline</v-icon><br><br><br>Marcas</p>           
                    </v-btn>
                </v-col >
            </template>
        </v-row>
        <v-row>
            <template v-if="this.$store.state.rol =='administrador'">
                <v-col >
                    <v-btn class="botones"  icon color="#72128E" :to="{path:'/clientes'}">
                        <p><v-icon size="90">mdi-account-search-outline</v-icon> <br><br><br>Clientes </p>           
                    </v-btn>
                </v-col >
            </template >
            <template v-if="this.$store.state.rol =='administrador'">
                <v-col >
                    <v-btn class="botones"  icon color="#72128E" :to="{path:'/proveedores'}">
                        <p>  <v-icon size="80">mdi-clipboard-account-outline</v-icon><br><br><br>Proveedores  </p>           
                    </v-btn>
                </v-col >
            </template >
            <template v-if="this.$store.state.rol =='administrador'">
                <v-col >
                    <v-btn class="botones"  icon color="#72128E" :to="{path:'/usuarios'}">
                        <p><v-icon size="90">mdi-account-multiple-outline</v-icon><br><br><br>Usuarios</p>           
                    </v-btn>
                </v-col >
            </template>
        </v-row>
        <v-row>
            <template v-if="this.$store.state.rol =='administrador'">
                <v-col >
                    <v-btn class="botones"  icon color="#72128E" :to="{path:'/ventas'}">
                        <p>    <v-icon size="90">mdi-archive-outline</v-icon> <br><br><br>- info Ventas</p>           
                    </v-btn>
                </v-col >
            </template >
            <template v-if="this.$store.state.rol =='administrador'">
                <v-col >
                    <v-btn class="botones"  icon color="#72128E" :to="{path:'/compras'}">
                        <p>  <v-icon size="90">mdi-cart-outline</v-icon><br><br><br>-info Compras</p>           
                    </v-btn>
                </v-col >
            </template >
            <template v-if="this.$store.state.rol =='administrador'">
                <v-col >
                    <v-btn class="botones"  icon color="#72128E" :to="{path:'/configuraciones'}">
                        <p>  <v-icon size="90">mdi-wrench</v-icon><br><br><br>-Configuraciones</p>           
                    </v-btn>
                </v-col >
            </template >
        </v-row>    
    </v-app> 
    </div>
</template>

<style scoped>
    .botonesArriba{
        width:160px;
        height:160px;
        margin-top:30px
    }
    .botones{
        width:160px;
        height:160px;
        margin-top:30px;

    }
    .botonesArriba:hover{
        transition:all .3s;
        border: 5px solid #72128E;
    }
    .botones:hover{
        transition:all .3s;
        border: 5px solid #72128E;
    }
    
    
</style>