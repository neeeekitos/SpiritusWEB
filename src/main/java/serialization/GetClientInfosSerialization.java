package serialization;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

public class GetClientInfosSerialization extends Serialization {

    @Override
    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {

        JsonObject container = new JsonObject();

        int status = (int) request.getAttribute("status");
        response.setStatus(status);

        if (status == HttpServletResponse.SC_OK) {
            Long id = (Long) request.getAttribute("id");
            String lastName = (String) request.getAttribute("lastName");
            String firstName = (String) request.getAttribute("firstName");
            String phone = (String) request.getAttribute("phone");
            String mail = (String) request.getAttribute("mail");
            String address = (String) request.getAttribute("address");
            String totemAnimal = (String) request.getAttribute("totemAnimal");
            String zodiacSign = (String) request.getAttribute("zodiacSign");
            String chineeseAstralSign = (String) request.getAttribute("chineeseAstralSign");
            String color = (String) request.getAttribute("color");
            Date birthDate = (Date) request.getAttribute("birthDate");
            String formattedDate = "";
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            formattedDate = sdf.format(birthDate);
            
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
            
            container.addProperty("birthDate", formattedDate);

        } else {
            container.addProperty("message", (String) request.getAttribute("message"));
        }

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        gson.toJson(container, out);
        out.close();

    }
}
