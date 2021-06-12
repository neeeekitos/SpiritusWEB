package serialization;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class DisconnectSerialization extends Serialization {

    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int status = (int) request.getAttribute("status");
        response.setStatus(status); // 200 OK

        PrintWriter out = response.getWriter();
        out.write("Vous êtes déconnecté");
        out.close();
    }

}
