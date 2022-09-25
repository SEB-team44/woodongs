package main_project.udongs;

import main_project.udongs.oauth2.config.AppProperties;
import main_project.udongs.oauth2.config.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({CorsProperties.class, AppProperties.class})

public class UdongsApplication {

	public static void main(String[] args) {
		SpringApplication.run(UdongsApplication.class, args);
	}

}
