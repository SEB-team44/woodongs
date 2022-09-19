package main_project.udongs.geoip;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class GeoIPController {

    private GeoIPService geoIPService;

    public GeoIPController() throws IOException {
        geoIPService = new GeoIPService();
    }

    @PostMapping("/geoip")
    public GeoIP getLocation(
            @RequestParam(value="ipAddress", required=true) String ipAddress
    ) throws Exception {
        GeoIPService locationService = new GeoIPService();

        return locationService.getLocation(ipAddress);
    }

}
