package main_project.udongs.geoip;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CityResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;

@Service
public class GeoIPService {
    private DatabaseReader dbReader;

    public GeoIPService() throws IOException {
        File database = new File("src/main/java/main_project/udongs/geoip/GeoLite2-City_20220916/GeoLite2-City.mmdb");
        dbReader = new DatabaseReader.Builder(database).build();
    }

    @Transactional
    public GeoIP getLocation(String ip)
            throws IOException, GeoIp2Exception {
        InetAddress ipAddress = InetAddress.getByName(ip);
        CityResponse response = dbReader.city(ipAddress);

        String countryName = response.getCountry().getName();
        String state = response.getLeastSpecificSubdivision().getName();
        String cityName = response.getCity().getName();
        String latitude =
                response.getLocation().getLatitude().toString();
        String longitude =
                response.getLocation().getLongitude().toString();
        return new GeoIP(ip, countryName, state, cityName, latitude, longitude);
    }
}
