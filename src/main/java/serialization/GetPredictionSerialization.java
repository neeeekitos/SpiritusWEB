package serialization;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class GetPredictionSerialization extends Serialization {

    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {

        List<String> prediction = (List<String>) request.getAttribute("predictions");
        int status = (int) request.getAttribute("status");
        JsonObject container = new JsonObject();

        if (prediction != null) {
            JsonObject predictionJson = new JsonObject();
            predictionJson.addProperty("love", prediction.get(0));
            predictionJson.addProperty("health", prediction.get(1));
            predictionJson.addProperty("job", prediction.get(2));
           
            container.add("predictions", predictionJson);
        }
        response.setStatus(status);
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        gson.toJson(container, out);
        out.close();
    }

}
