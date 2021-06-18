package serialization;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mycompany.spiritus.metier.model.Client;
import com.mycompany.spiritus.metier.model.Consultation;
import com.mycompany.spiritus.metier.model.Employee;
import com.mycompany.spiritus.metier.model.Person;
import org.apache.http.HttpStatus;

import javax.json.Json;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.TreeMap;
import java.util.Vector;

import static javax.servlet.http.HttpServletResponse.*;

public class EmployeeSerialization extends Serialization {

    @Override
    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {

        int status = (int) request.getAttribute("status");

        if (status == SC_OK) {

            final JsonObject container = new JsonObject(); // Objet JSON " conteneur "

            JsonObject personJson = new JsonObject(); // Objet InfosEmployee
            JsonObject inProgressConsultationData = new JsonObject();
            Person person = (Person) request.getAttribute("person"); // recuperation de l'attribut
            Employee emp = (Employee) person;
            personJson.addProperty("id", emp.getId());
            personJson.addProperty("mail", emp.getMail());
            personJson.addProperty("firstName", emp.getFirstName());
            personJson.addProperty("lastName", emp.getLastName());
            personJson.addProperty("available", emp.isAvailable());
            container.add("Employee", personJson);

            JsonObject pendingConsult = new JsonObject(); // Objet pendingConsult
            Consultation consultationPending = (Consultation) request.getAttribute("pendingConsultation"); // recuperation de l'attribut
            boolean isPending = false;
            if (consultationPending != null) {
                pendingConsult.addProperty("status", consultationPending.getStatus().toString());
                pendingConsult.addProperty("date", consultationPending.getDate().toString());
                pendingConsult.addProperty("medium_ID", consultationPending.getMedium().getId());
                pendingConsult.addProperty("medium_nom", consultationPending.getMedium().getDenomination());
                pendingConsult.addProperty("client_ID", consultationPending.getClient().getId());
                pendingConsult.addProperty("client_nom", consultationPending.getClient().getFirstName() + consultationPending.getClient().getLastName());
                isPending = true;
            }

            Consultation inProgressConsultation = (Consultation) request.getAttribute("inProgressConsultation");
            if (inProgressConsultation != null) {
                inProgressConsultationData.addProperty("status", inProgressConsultation.getStatus().toString());
                inProgressConsultationData.addProperty("date", inProgressConsultation.getDate().toString());
                inProgressConsultationData.addProperty("mediumId", inProgressConsultation.getMedium().getId());
                inProgressConsultationData.addProperty("medium_nom", inProgressConsultation.getMedium().getDenomination());
                inProgressConsultationData.addProperty("clientId", inProgressConsultation.getClient().getId());
                Client client = inProgressConsultation.getClient();
                inProgressConsultationData.addProperty("client_nom", client.getFirstName() + inProgressConsultation.getClient().getLastName());
                inProgressConsultationData.addProperty("clientZodiac", client.getZodiacSign());
                inProgressConsultationData.addProperty("clientChineeseAstral", client.getChineseAstroSign());
                inProgressConsultationData.addProperty("clientColor", client.getColor());
                inProgressConsultationData.addProperty("clientTotem", client.getTotemAnimal());
            }

            pendingConsult.addProperty("isPending", isPending);
            container.add("pendingOrInProgressConsultation", pendingConsult);
            container.add("inProgressConsultation", inProgressConsultationData);

            JsonObject histoConsult = new JsonObject(); // Objet histoConsult
            List<Consultation> consultations = (List<Consultation>) request.getAttribute("historiqueConsultation"); // recuperation de l'attribut
            JsonArray HistoriqueArray = new JsonArray();
            if (consultations != null) {
                for (Consultation c : consultations) {
                    String formattedDate = "";
                    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
                    formattedDate = sdf.format(c.getDate());
                    JsonObject consultationObject = new JsonObject();
                    consultationObject.addProperty("status", c.getStatus().toString());
                    consultationObject.addProperty("date", c.getDate().toString());
                    consultationObject.addProperty("comment", c.getComment());
                    consultationObject.addProperty("medium_ID", c.getMedium().getId());
                    consultationObject.addProperty("medium_nom", c.getMedium().getDenomination());
                    consultationObject.addProperty("client_ID", c.getClient().getId());
                    consultationObject.addProperty("client_nom", c.getClient().getFirstName() + c.getClient().getLastName());
                    HistoriqueArray.add(consultationObject);
                }
                container.add("Historique", HistoriqueArray);
            }

            HashMap<Employee, Long> employeeList = (HashMap<Employee, Long>) request.getAttribute("topEmployee"); // recuperation de l'attribut
            //tri HashMap
            ValueComparator comparateur = new ValueComparator(employeeList);
            TreeMap<Employee, Long> mapTriee = new TreeMap<Employee, Long>(comparateur);
            mapTriee.putAll(employeeList);

            JsonArray topEmployee = new JsonArray();

            Integer limite = mapTriee.size();
            if (limite >= 5) {
                limite = 5;
            }
            
            for (Integer i = 0; i < limite; i++) {
                JsonObject employee = new JsonObject(); // Objet consult
                Employee objEmployee = (Employee) mapTriee.keySet().toArray()[i];
                employee.addProperty("nom", objEmployee.getFirstName() + objEmployee.getLastName());
                employee.addProperty("nombreConsult", employeeList.get(objEmployee).toString());
                topEmployee.add(employee);
            }
            container.add("topEmployee", topEmployee);

            response.setStatus(status); // 200 OK

            PrintWriter out = response.getWriter();
            Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
            gson.toJson(container, out);
            out.close();
        } else if (status == SC_FORBIDDEN) {
            response.sendError(status, "You have to be connected"); // 403 ERROR
        } else {
            response.sendError(status, "Unauthorized access"); // 401 ERROR
        }
    }
}
