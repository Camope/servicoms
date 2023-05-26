package es.interior.serviComsApi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class ServiComsApiApplication {

	public static final Logger log = LoggerFactory.getLogger(ServiComsApiApplication.class);
	
	public static void main(String[] args) {
		SpringApplication.run(ServiComsApiApplication.class, args);
	}

}
