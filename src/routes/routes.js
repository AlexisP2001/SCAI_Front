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
    
]