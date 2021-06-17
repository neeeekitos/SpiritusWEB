package serialization;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.mycompany.spiritus.metier.model.Astrologue;
import com.mycompany.spiritus.metier.model.Cartomancien;
import com.mycompany.spiritus.metier.model.Medium;
import com.mycompany.spiritus.metier.model.Spirite;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class GetMediumsProfileSerialization extends Serialization {

    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Medium medium = (Medium) request.getAttribute("medium");

        JsonObject container = new JsonObject();

        response.setStatus(HttpServletResponse.SC_NOT_FOUND);

        if (medium != null) {

            response.setStatus(HttpServletResponse.SC_OK);

            JsonObject mediumJson = new JsonObject();
            mediumJson.addProperty("id", medium.getId());
            mediumJson.addProperty("denomination", medium.getDenomination());
            mediumJson.addProperty("gender", medium.getGender().toString());
            mediumJson.addProperty("presentation", medium.getPresentation());
            mediumJson.addProperty("mediumType", medium.getClass().getName());

            if (medium instanceof Spirite) {
                mediumJson.addProperty("support", ((Spirite) medium).getSupport());
            } else if (medium instanceof Astrologue) {
                mediumJson.addProperty("formation", ((Astrologue) medium).getFormation());
                mediumJson.addProperty("promotion", ((Astrologue) medium).getPromotion());
            }
            container.add("medium", mediumJson);

        }

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        gson.toJson(container, out);
        out.close();
    }

}
