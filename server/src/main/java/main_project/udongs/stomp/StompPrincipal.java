package main_project.udongs.stomp;

import java.security.Principal;

public class StompPrincipal implements Principal {
    String name;

    StompPrincipal(String name) { this.name = name; }

    @Override
    public String getName() { return name;}
}
