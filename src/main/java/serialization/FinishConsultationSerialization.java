package serialization;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Serializable;

import static javax.servlet.http.HttpServletResponse.SC_OK;

public class FinishConsultationSerialization extends Serialization {
    @Override
    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int status = (int) request.getAttribute("status");
        response.setStatus(status);
    }
}
