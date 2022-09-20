package main_project.udongs.locationservice.geoip;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class GeoIP {
    private String ipAddress;

    private String country;
    private String state;
    private String city;

    private String latitude;
    private String longitude;
}