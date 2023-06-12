package es.interior.serviComsApi.repositorios;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import es.interior.serviComsApi.entidades.UsuarioApi;

@RepositoryRestResource(path = "usuarios", collectionResourceRel = "usuarios")
public interface UsuarioRepositorio extends JpaRepository<UsuarioApi, Long> {

	Optional<UsuarioApi> findByTip(String tip);
	
}