package serialization;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mycompany.spiritus.metier.model.Consultation;
import com.mycompany.spiritus.metier.model.Employee;
import com.mycompany.spiritus.metier.model.Medium;
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

public class GetMetricsSerialization extends Serialization {

    @Override
    public void serialize(HttpServletRequest request, HttpServletResponse response) throws IOException {

        int status = (int) request.getAttribute("status");

        if (status == SC_OK) {

            final JsonObject container = new JsonObject(); // Objet JSON " conteneur "

            HashMap<Employee, Long> employeeList = (HashMap<Employee, Long>) request.getAttribute("topEmployee"); // recuperation de l'attribut
            
            //tri HashMap
            ValueComparator comparateur = new ValueComparator(employeeList);
            TreeMap<Employee, Long> mapTriee = new TreeMap<Employee, Long>(comparateur);
            mapTriee.putAll(employeeList);

            JsonArray topEmployee = new JsonArray();

            for (Integer i = 0; i < mapTriee.size(); i++) {
                JsonObject employee = new JsonObject(); // Objet consult
                Employee objEmployee = (Employee) mapTriee.keySet().toArray()[i];
                employee.addProperty("nom", objEmployee.getFirstName() + objEmployee.getLastName());
                employee.addProperty("nombreConsult", employeeList.get(objEmployee).toString());
                topEmployee.add(employee);
            }
            container.add("topEmployee", topEmployee);

            JsonArray topMediums = new JsonArray();
            List<Object[]> topMediumsList =(List<Object[]>) request.getAttribute("topMediums");
            
            if (topMediumsList != null){
                
                for (Object[] result : topMediumsList) {
                    JsonObject mediumObject = new JsonObject(); // Objet consult
                    Medium medium = (Medium) result[0];
                    Long nombre = (Long) result[1];
                    mediumObject.addProperty("medium",medium.getDenomination());
                    mediumObject.addProperty("nombre",nombre.toString());
                    topMediums.add(mediumObject);
                }
                container.add("topMediums", topMediums);
            }
          
                    
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
