/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import action.*;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mycompany.spiritus.dao.JpaUtil;

import action.AutheticatePersonAction;
import action.GetEmployeeHomePageInfosAction;

import serialization.*;

/**
 *
 * @author yolan
 */

@WebServlet(name = "ActionServlet", urlPatterns = {"/ActionServlet"})
public class ActionServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

/*
        HttpSession session = request.getSession(true);
*/
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");

        response.setContentType("application/json;charset=UTF-8");

        String todo = request.getParameter("todo");

        Action action = null;
        Serialization serialization = null;

        System.out.println("todo : " + todo);

        if (todo != null) {
            switch (todo) {
                    case "authenticate":
                    action = new AutheticatePersonAction();
                    serialization = new AutheticateSerialization();
                    break;
                case "disconnect":
                    action = new DisconnectAction();
                    System.out.println("disconnecting...");
                    serialization = new DisconnectSerialization();
                    break;
                case "createAccount":
                    action = new CreateAccountAction();
                    serialization = new CreateAccountSerialization();
                    break;
                case "getClientHomePageInfos":
                    System.out.println("--- INFO ----- get client home page infos");
                    action = new GetClientHomePageInfosAction();
                    serialization = new ClientHomePageInfoSerialization();
                    break;
                case "getEmployeeHomePageInfos":
                    action = new GetEmployeeHomePageInfosAction();
                    serialization = new EmployeeSerialization();
                    break;

                case "getPrediction":
                    action = new GetPredictionAction();
                    serialization = new GetPredictionSerialization();
                    break;
                case "getTopMediums":
                    action = new GetTopXMediumsAction();
                    serialization = new GetMediumsSerialization();
                    break;
                case "requestConsultation" :
                    action = new RequestConsultationAction();
                    serialization = new RequestConsultationSerialization();
                    break;
                case "getMediumProfile" :
                    action = new GetMediumProfileAction();
                    serialization = new GetMediumsProfileSerialization();
                    break;
                case "getAllMediums" :
                    action = new GetAllMediumsAction();
                    serialization = new GetAllMediumsSerialization();
                    break;
                case "getClientInfos":
                    action = new GetClientInfosAction();
                    serialization = new GetClientInfosSerialization();
                    break;
                case "startConsultation" :
                    action = new StartConsultationAction();
                    serialization = new StartConsultationSerialization();
                    break;
                case "finishConsultation" :
                    action = new FinishConsultationAction();
                    serialization = new FinishConsultationSerialization();
                    break;
                case "GetEmployeeMetrics" :
                    action = new GetEmployeeMetricsAction();
                    serialization = new GetMetricsSerialization();
                    break;
                case "updateClientInfos" :
                    action = new UpdateClientInfosAction();
                    serialization = new UpdateClientInfosSerialization();
                    break;
                default:
                    break;
            }
        }

        if (action != null) {
            action.execute(request);
            serialization.serialize(request, response);
            System.out.println("yooooo");
        }
        else {
            System.out.println("error ");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Erreur dans les paramètres de la requête");
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    @Override
    public void init() throws ServletException {
        super.init();
        JpaUtil.init();
    }

    @Override
    public void destroy() {
        JpaUtil.destroy();
        super.destroy();
    }

}
