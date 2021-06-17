package serialization;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
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

public class GetAllMediumsSerialization extends Serialization {

    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {

        List<Medium> mediumList = (List<Medium>) request.getAttribute("mediumList");

        JsonObject container = new JsonObject();
        container.addProperty("nbMediums", mediumList.size());

        JsonArray mediumListJson = new JsonArray();
        if (mediumList != null) {
            for (Medium medium : mediumList) {

                JsonObject mediumJson = new JsonObject();
                mediumJson.addProperty("id", medium.getId());
                mediumJson.addProperty("denomination", medium.getDenomination());
                mediumJson.addProperty("gender", medium.getGender().toString());
                mediumJson.addProperty("gender", medium.getPresentation());
                mediumJson.addProperty("mediumType", medium.getClass().getName());

                if (medium instanceof Spirite) {
                    mediumJson.addProperty("mediumType", "Spirite");
                    mediumJson.addProperty("support", ((Spirite) medium).getSupport());
                } else if (medium instanceof Astrologue) {
                    mediumJson.addProperty("mediumType", "Astrologue");
                    mediumJson.addProperty("formation", ((Astrologue) medium).getFormation());
                    mediumJson.addProperty("promotion", ((Astrologue) medium).getPromotion());
                } else {
                    mediumJson.addProperty("mediumType", "Catomancien");
                }
                mediumListJson.add(mediumJson);
            }
            container.add("mediumsList", mediumListJson);
        }

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        gson.toJson(container, out);
        out.close();
    }

}
