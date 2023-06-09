# Aplicación ServiComs
## Descripción
Actualmente en la Guardia Civil el anuncio y la solicitud de Comisiones de Servicio se gestiona en la mayoría de los casos vía correo electrónico.  

La aplicación ServiComs permitirá que una  Unidad superior oferte Comisiones de Servicio y reciba las solicitudes de interesados para poder gestionarlas. Los usuarios podrán acceder para consultar y solicitar las Comisiones.  

Funcionalidad:  

Un usuario admin podrá dar de alta y publicar las CS y podrá consultar las solicitudes de las CS publicadas para gestionar la adjudicación.  

Un usuario user podrá consultar las Comisiones de Servicio ofertadas y con un formulario estándar podría solicitar la de interés (una o muchas).  

Las CS podrán tener ninguna, una o muchas solicitudes.  


## Diagrama de clases de diseño

![Diagrama de Diseño MVP](https://git.institutomilitar.com/PedroggDIM/comisiones/-/wikis/imagenes/diagrama_clases_readme.png)


**Cumplimiento de requisitos**
1. **Herencia**: En Comisión de Servicio y sus subtipos.
2. **Relación One-To-Many**: Entidades Comisión de Servicio y Solicitud
3. **Método personalizado**: Calcular la duración media de las Comisiones de Servicio de Viogen.
4. **Listado**: Se mostrarán las Comisiones de Servicio y sus Solicitudes
5. **CRUD**: De las Comisiones de Servicio publicadas.
6. **URLs** del proyecto:
   1. Repositorio proyecto: https://git.institutomilitar.com/PedroggDIM/comisiones
   2. Librería: https://github.com/Camope/servicomsLib.git
7. **Despliegue** en Internet:
   1. API: https://servicomsapi-camorpe.b4a.run/ ([API Docs](https://documenter.getpostman.com/view/25303525/2s93si2AR9))
   2. Web: https://servicoms.netlify.app [![Netlify Status](https://api.netlify.com/api/v1/badges/319f274a-2f89-422c-bc12-4865e70526fb/deploy-status)](https://app.netlify.com/sites/servicoms/deploys)


