package serialization;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.mycompany.spiritus.metier.model.Client;
import com.mycompany.spiritus.metier.model.Employee;
import com.mycompany.spiritus.metier.model.Person;
import org.apache.http.HttpStatus;

import javax.json.Json;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Serializable;

import static javax.servlet.http.HttpServletResponse.*;

public class AutheticateSerialization extends Serialization {


    @Override
    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {

        int status = (int) request.getAttribute("status");

        if (status == SC_OK) {
            Person person = (Person) request.getAttribute("person");

            JsonObject personJson = new JsonObject();
            personJson.addProperty("id", person.getId());
            personJson.addProperty("nom", person.getLastName());
            personJson.addProperty("prenom", person.getFirstName());
            personJson.addProperty("mail", person.getMail());

            if (person instanceof Client) personJson.addProperty("user", "client");
            else if (person instanceof Employee) personJson.addProperty("user", "employee");

            response.setStatus(status); // 200 OK

            PrintWriter out = response.getWriter();
            Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
            gson.toJson(personJson, out);
            out.close();
        }
        else if (status == SC_FORBIDDEN)
            response.sendError(status, "User has been already authenticated"); // 403 ERROR
        else
            response.sendError(status, "Incorrect credentials"); // 401 ERROR
    }
}
