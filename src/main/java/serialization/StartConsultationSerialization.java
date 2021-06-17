package serialization;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class StartConsultationSerialization extends Serialization {
    @Override
    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int status = (int) request.getAttribute("status");
        response.setStatus(status);
    }
}
