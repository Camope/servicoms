# Comisiones de Servicio
## Descripción
La gestión del anuncio y solicitud de Comisiones de Servicio en la Guardia Civil actulamente se gestiona vía correo electrónico.
La aplicación Comisiones de Servicios permitirá que una  Unidad superior oferte Comisiones de Servicio (CS) y reciba las solicitudes de interesados para poder gestionarlas. Los usuarios podrán acceder para consultar y solicitar las CS.
Funcionalidad:
Personal con perfil de administrador sería la persona que en la aplicación da de alta y publica las CS y podrá consultar las solicitudes de las CS publicadas para gestionar la adjudicación.
Personal con perfil usuario podrá consultar las Comisiones de Servicio  ofertadas y con un formulario estándar podría solicitar la de interés (una o muchas).
Las CS  podrán tener ninguna, una o muchas solicitudes.
Una solicitud es una entidad con las propiedades: id, fecha de solicitud, idComisión e idUsuario.

## Diagrama de clases de diseño

![Diagrama de Diseño MVP](https://git.institutomilitar.com/PedroggDIM/comisiones/-/wikis/uploads/0a07745b719db2ed16094117dfadde98/Diagrama_de_clases.png)


**Cumplimiento de requisitos**
1. **Herencia**: En Comisión de Servicio y sus subtipos.
2. **Relación One-To-Many**: Entidades Comisión de Servicio y Solicitud
3. **Método personalizado**: Eventos con resultado de empate entre dos fechas.
4. **Listado**: Se mostrarán las Comisiones de Servicio y sus Solicitudes
5. **CRUD**: De las Comisiones de Servicio publicadas.
6. **URLs** del proyecto:
   1. Repositorio proyecto: https://git.institutomilitar.com/-/ide/project/PedroggDIM/comisiones
7. **Despliegue** en Internet:
   1. API: 
   1. Web:  

## Interfaz de usuario

Figura 1:  
![Figura 1]

Figura 2:  
![Figura 2]
