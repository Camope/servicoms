package es.interior.serviComsApi.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import es.interior.serviComsApi.entidades.SolicitudApi;

public interface SolicitudRepositorio extends JpaRepository<SolicitudApi, Long> {

}