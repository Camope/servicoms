package es.interior.serviComsApi.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import es.interior.serviComsApi.entidades.SolicitudApi;

@RepositoryRestResource(path = "solicitudes", collectionResourceRel = "solicitudes")
public interface SolicitudRepositorio extends JpaRepository<SolicitudApi, Long> {

}