package es.interior.serviComsApi.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import es.interior.serviComsApi.entidades.ComisionApi;

public interface ComisionRepositorio extends JpaRepository<ComisionApi, Long> {

}