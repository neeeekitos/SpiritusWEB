package serialization;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.mycompany.spiritus.metier.model.Consultation;

import com.google.gson.JsonArray;
import sun.tools.jconsole.JConsole;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class ClientHomePageInfoSerialization extends Serialization{

    @Override
    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {
        JsonObject container = new JsonObject();

        if ( (Boolean) request.getAttribute("success")) { // success
            Long clientId = (Long)request.getAttribute("id");
            String zodiacSign = (String)request.getAttribute("zodiacSign");
            String chineeseAstralSign = (String)request.getAttribute("chineeseAstralSign");
            String luckyColor = (String)request.getAttribute("luckyColor");
            String totemAnimal = (String)request.getAttribute("totemAnimal");
            String firstName = (String)request.getAttribute("firstName");
            String lastName = (String)request.getAttribute("lastName");

            List<Consultation> consHistory = (List<Consultation>)request.getAttribute("consultationList");

            JsonArray jsonArray = new JsonArray();
            for (Consultation cons : consHistory) {
                JsonObject consultationObject = new JsonObject();
                consultationObject.addProperty("id", cons.getId());
                consultationObject.addProperty("advisor", cons.getEmployee().getLastName());
                consultationObject.addProperty("denomination", cons.getClass().getName());
                consultationObject.addProperty("status", cons.getStatus().name());
                jsonArray.add(consultationObject);
            }

            container.addProperty("success", true);
            container.addProperty("clientId", clientId);
            container.addProperty("zodiacSign", zodiacSign);
            container.addProperty("chineeseAstralSign", chineeseAstralSign);
            container.addProperty("luckyColor", luckyColor);
            container.addProperty("totemAnimal", totemAnimal);
            container.addProperty("firstName", firstName);
            container.addProperty("lastName", lastName);

            container.add("consultationsHistory", jsonArray);
        } else {                                            // failed
            container.addProperty("success", false);
            container.addProperty("reason", "unknown reason");
        }

        PrintWriter out = response.getWriter();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        gson.toJson(container, out);
        out.close();

    }

}
