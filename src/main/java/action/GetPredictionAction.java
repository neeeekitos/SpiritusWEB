package action;

import com.mycompany.spiritus.metier.model.Client;
import com.mycompany.spiritus.metier.service.PlanningService;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public class GetPredictionAction extends Action{
    @Override
    public void execute(HttpServletRequest request) throws ServletException, IOException {
        
        PlanningService planningService = new PlanningService();
        
        int love = Integer.parseInt(request.getParameter("love"));
        int health = Integer.parseInt(request.getParameter("health"));
        int job = Integer.parseInt(request.getParameter("job"));
        
        Client client = planningService.getClient(Long.parseLong(request.getParameter("clientId")));
        List<String> predictions = planningService.getPrediction(client, love, health, job);
        
        request.setAttribute("predictions", predictions);
    }
}
