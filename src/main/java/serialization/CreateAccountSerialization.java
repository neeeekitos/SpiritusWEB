package serialization;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class CreateAccountSerialization extends Serialization {

    @Override
    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {

        JsonObject container = new JsonObject();

        container.addProperty("success", (Boolean) request.getAttribute("success"));
        container.addProperty("reason", (String) request.getAttribute("reason"));

        PrintWriter out = response.getWriter();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        gson.toJson(container, out);
        out.close();

    }
}
