import login from '../components/login.vue';
import home from '../components/Home.vue';
import categorias from '../components/categorias.vue';
import marcas from '../components/marcas.vue';
import proveedores from '../components/proveedores.vue';
import clientes from '../components/clientes.vue';
import usuarios from '../components/usuarios.vue';
import articulos from '../components/articulos.vue';
import compras from '../components/compras.vue';
import facturacion from '../components/facturacion.vue';
import configuracion from '../components/configuracion.vue';
import separadas from '../components/separadas.vue';
import vAbono from '../components/vAbono.vue'
import vCredito from '../components/vCredito.vue'
import vDebito from '../components/vDebito.vue'
import vEfectivo from '../components/vEfectivo.vue'

export const routes = [    
    {path:'/',component: login},
    {path:'/home',component: home},
    {path:'/categorias',component: categorias},
    {path:'/marcas',component: marcas},
    {path:'/proveedores',component: proveedores},
    {path:'/clientes',component: clientes},
    {path:'/usuarios',component: usuarios},
    {path:'/articulos',component: articulos},
    {path:'/compras',component: compras},
    {path:'/facturacion',component: facturacion},
    {path:'/configuraciones',component: configuracion},
    {path:'/separadas',component: separadas},
    {path:'/abonos', component:vAbono},
    {path:'/creditos', component:vCredito},
    {path:'/debitos', component:vDebito},
    {path:'/efectivos', component:vEfectivo},
    
]