package es.interior.serviComsApi.repositorios;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import es.interior.serviComsApi.entidades.UsuarioApi;

public interface UsuarioRepositorio extends JpaRepository<UsuarioApi, Long> {

	Optional<UsuarioApi> findByTip(String tip);
	
}