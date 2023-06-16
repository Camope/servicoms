package es.interior.serviComsApi.repositorios;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import es.interior.serviComsApi.entidades.ComisionApi;
import jakarta.transaction.Transactional;

@RepositoryRestResource(path = "comisiones", collectionResourceRel = "comisiones")
public interface ComisionRepositorio extends JpaRepository<ComisionApi, Long> {

	@Transactional
	@Modifying
	@Query(value = "UPDATE COMISIONES SET PUESTO=?1, LOCALIDAD=?2, ESPECIALIDAD=?3, EMPLEO=?4, FECHA_LIMITE=?5, " + 
					"DURACION=?6, DETALLES=?7, TIPO_COMISION=?8, PERFIL=?9, RIESGO=?10 WHERE ID=?11",
			nativeQuery = true)
	int update(String puesto, String localidad, String especialidad, String empleo, OffsetDateTime fechaLimite,
			Integer duracion, String detalles, Character tipoComision, String perfil, String riesgo, Long id);
	
	@Query(value = "SELECT * FROM comisiones WHERE tipo_comision=?1", nativeQuery = true)
	List<ComisionApi> findByTipoComision(Character tipoComision);

}
