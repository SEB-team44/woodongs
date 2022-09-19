/*
package main_project.udongs.geoip;

import com.maxmind.db.Reader;
import com.maxmind.geoip2.DatabaseReader;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;
import java.io.InputStream;

@Configuration
@AllArgsConstructor
@Slf4j
public class GeoLocationConfig {

    private static DatabaseReader reader = null;
    private final ResourceLoader resourceLoader;

    @Bean
    public DatabaseReader databaseReader() {

        try {
            log.info("GeoLocationConfig: loading db");

            Resource resource = resourceLoader.getResource
                    ("main_project/udongs/geoip/GeoLite2-City_20220916/GeoLite2-City.mmdb");

            InputStream dbAsStream = resource.getInputStream();

            log.info("GeoLocationConfig: db loading fin");

            return reader = new DatabaseReader
                    .Builder(dbAsStream)
                    .fileMode(Reader.FileMode.MEMORY)
                    .build();
        } catch (IOException | NullPointerException e) {
            log.error("geolocationERROR",e);
            return null;
        }
    }
}*/
