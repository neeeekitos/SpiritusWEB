package serialization;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.mycompany.spiritus.metier.model.Medium;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class GetMediumsSerialization extends Serialization {

    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {

        List<Object[]> mediumList = (List<Object[]>) request.getAttribute("mediumList");

        JsonObject container = new JsonObject();

        if (mediumList != null) {
            for ( Object[] value:mediumList) {

                JsonObject mediumJson = new JsonObject();
                Medium medium = (Medium) value[0];
                mediumJson.addProperty("denomination", (String) medium.getDenomination());
                mediumJson.addProperty("description", (String) medium.getPresentation());
                mediumJson.addProperty("nbConsultations", (Long) value[1]);
                container.add(medium.getId().toString(), mediumJson);

            }
        }

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        gson.toJson(container, out);
        out.close();
    }

}
