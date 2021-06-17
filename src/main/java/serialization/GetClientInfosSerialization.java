package serialization;

import com.google.gson.JsonObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class GetClientInfosSerialization extends Serialization{

    @Override
    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {

        JsonObject container = new JsonObject();

        int status = (int)request.getAttribute("status");
        response.setStatus(status);

        if (status == HttpServletResponse.SC_OK) {
            Long id = (Long)request.getAttribute("id");
            String lastName = (String)request.getAttribute("lastName");
            String firstName = (String)request.getAttribute("firstName");
            String phone = (String)request.getAttribute("phone");
            String mail = (String)request.getAttribute("mail");
            String address = (String)request.getAttribute("address");
            String totemAnimal = (String)request.getAttribute("totemAnimal");
            String zodiacSign = (String)request.getAttribute("zodiacSign");
            String chineeseAstralSign = (String)request.getAttribute("chineeseAstralSign");
            String color = (String)request.getAttribute("color");
            String birthDate = (String)request.getAttribute("birthDate");

            container.addProperty("id", id);
            container.addProperty("lastName", lastName);
            container.addProperty("firstName", firstName);
            container.addProperty("phone", phone);
            container.addProperty("mail", mail);
            container.addProperty("address", address);
            container.addProperty("totemAnimal", totemAnimal);
            container.addProperty("zodiacSign", zodiacSign);
            container.addProperty("chineeseAstralSign", chineeseAstralSign);
            container.addProperty("color", color);
            container.addProperty("birthDate", birthDate);

        } else {
            container.addProperty("message", (String)request.getAttribute("message"));
        }

    }
}
